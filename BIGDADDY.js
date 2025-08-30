/* PhistarBotInc - Complete WhatsApp Bot with Telegram Integration */
const fs = require('fs');
const path = require('path');
const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    makeCacheableSignalKeyStore,
    fetchLatestBaileysVersion,
    Browsers,
    downloadContentFromMessage,
    getContentType,
    jidDecode,
    proto
} = require('@adiwajshing/baileys'); // Updated to baileys-x
const { Boom } = require('@hapi/boom');
const pino = require('pino');
const TelegramBot = require('node-telegram-bot-api');
const NodeCache = require('node-cache');
const FileType = require('file-type');
const { parsePhoneNumber } = require('libphonenumber-js');
const PhoneNumber = require('awesome-phonenumber');
const BigDaddyHandler = require("./BigDaddy 2.js");
const axios = require('axios');

// ==================== Configuration ====================
const config = {
    telegramToken: '7867524120:AAFH36k_cRPyBHBEZc0UbVi2RSe6DoGxnvQ',
    ownerId: '6300694007',
    sessionDir: path.join(__dirname, 'phistar_sessions'),
    mediaDir: path.join(__dirname, 'phistar-media'),
    logDir: path.join(__dirname, 'logs'),
    prefix: '!',
    maxFileSize: 100 * 1024 * 1024, // 100MB
    reconnectDelay: 5000,
    maxReconnectAttempts: 5,
    browser: Browsers.windows('Firefox'),
    telegramGroupLink: 'https://t.me/+T-sqneV6fZ1mOWQ0',
    telegramGroupId: '-1002444985830',
    youtubeChannel: 'https://youtube.com/@phistar',
    telegramChannel: '@phistar',
    restartInterval: 30 * 60 * 1000, // 30 minutes in milliseconds
    messageSendTimeout: 10000 // 10 seconds timeout for sendMessage
};

// ==================== Enhanced Account Manager ====================
class AccountManager {
    constructor() {
        this.accounts = new Map(); // phoneNumber -> { botInstance, telegramChatId, accountId, botNumber, isNewConnection }
        this.accountIds = new Map(); // accountId -> phoneNumber
        this.commandCache = new NodeCache({ stdTTL: 600, checkperiod: 120 });
        this.reconnectAttempts = new Map();
        this.mediaRateLimit = new Map();
    }

    addAccount(phoneNumber, accountData) {
        this.accounts.set(phoneNumber, accountData);
        if (accountData.accountId) {
            this.accountIds.set(accountData.accountId, phoneNumber);
        }
    }

    getAccountByNumber(phoneNumber) {
        return this.accounts.get(phoneNumber);
    }

    getAccountById(accountId) {
        const phoneNumber = this.accountIds.get(accountId);
        return phoneNumber ? this.accounts.get(phoneNumber) : null;
    }

    removeAccount(phoneNumber) {
        const account = this.accounts.get(phoneNumber);
        if (account && account.accountId) {
            this.accountIds.delete(account.accountId);
        }
        this.accounts.delete(phoneNumber);
    }

    getAllAccounts() {
        return Array.from(this.accounts.values());
    }

    getBotNumber(accountId) {
        const account = this.getAccountById(accountId);
        return account ? account.botNumber : null;
    }
}

const accountManager = new AccountManager();

// ==================== Mode Persistence Functions ====================
const modeFilePath = path.join(config.sessionDir, 'modes.json');
const autostatusviewFilePath = path.join(config.sessionDir, 'autostatusview.json');

function readModes() {
    try {
        if (fs.existsSync(modeFilePath)) {
            const data = fs.readFileSync(modeFilePath, 'utf8');
            console.log('Successfully read modes.json:', data);
            return JSON.parse(data);
        }
        console.log('modes.json not found, returning empty object');
        return {};
    } catch (err) {
        console.error('Error reading modes.json:', err.message);
        return {};
    }
}

function writeMode(phoneNumber, mode) {
    try {
        const modes = readModes();
        modes[phoneNumber] = mode;
        fs.writeFileSync(modeFilePath, JSON.stringify(modes, null, 2), { mode: 0o600 });
        console.log(`Mode updated for ${phoneNumber}: ${mode}`);
    } catch (err) {
        console.error('Error writing to modes.json:', err.message);
    }
}

function readAutostatusview() {
    try {
        if (fs.existsSync(autostatusviewFilePath)) {
            const data = fs.readFileSync(autostatusviewFilePath, 'utf8');
            console.log('Successfully read autostatusview.json:', data);
            return JSON.parse(data);
        }
        console.log('autostatusview.json not found, returning empty object');
        return {};
    } catch (err) {
        console.error('Error reading autostatusview.json:', err.message);
        return {};
    }
}

function writeAutostatusview(phoneNumber, state) {
    try {
        const states = readAutostatusview();
        states[phoneNumber] = state;
        fs.writeFileSync(autostatusviewFilePath, JSON.stringify(states, null, 2), { mode: 0o600 });
        console.log(`Autostatusview updated for ${phoneNumber}: ${state}`);
    } catch (err) {
        console.error('Error writing to autostatusview.json:', err.message);
    }
}

// ==================== Store Implementation ====================
const store = {
    messages: new Map(),
    contacts: new Map(),
    groupMetadata: new Map(),
    processedMessages: new Set(),
    
    loadMessage: async (jid, id) => {
        return store.messages.get(`${jid}:${id}`) || null;
    },
    
    bind: (ev) => {
        ev.on('messages.upsert', ({ messages }) => {
            messages.forEach(msg => {
                const key = `${msg.key.remoteJid}:${msg.key.id}`;
                store.messages.set(key, msg);
                setTimeout(() => {
                    store.messages.delete(key);
                    store.processedMessages.delete(key);
                }, 60 * 60 * 1000);
            });
        });
    }
};

// ==================== Main Bot Implementation ====================
const bot = new TelegramBot(config.telegramToken, { polling: true });
let isFirstLog = true;

if (!fs.existsSync(config.sessionDir)) fs.mkdirSync(config.sessionDir, { recursive: true, mode: 0o700 });
if (!fs.existsSync(config.mediaDir)) fs.mkdirSync(config.mediaDir, { recursive: true, mode: 0o700 });
if (!fs.existsSync(config.logDir)) fs.mkdirSync(config.logDir, { recursive: true, mode: 0o700 });

async function PhistarBotIncStart(phoneNumber, telegramChatId = null, fixedPairCode = "PHIS2025") {
    try {
        const { version, isLatest } = await fetchLatestBaileysVersion();
        if (isFirstLog) {
            console.log(`Using Baileys version: ${version} (Latest: ${isLatest})`);
            isFirstLog = false;
        }
    } catch (e) {
        console.log('Could not fetch latest Baileys version', e);
    }

    const sessionPath = path.join(config.sessionDir, `session_${phoneNumber}`);
    if (!fs.existsSync(sessionPath)) {
        fs.mkdirSync(sessionPath, { recursive: true, mode: 0o700 });
    }

    // Check if account already exists and is connected
    const existingAccount = accountManager.getAccountByNumber(phoneNumber);
    if (existingAccount && existingAccount.botInstance && existingAccount.botInstance.ws.isOpen) {
        if (telegramChatId) {
            bot.sendMessage(telegramChatId, `⚠️ ${phoneNumber} is already connected to Big Daddy V1mini use /delpair to disconnect!`);
        }
        return existingAccount.botInstance;
    } else if (existingAccount) {
        accountManager.removeAccount(phoneNumber);
    }

    const { state, saveCreds } = await useMultiFileAuthState(sessionPath);
    const msgRetryCounterCache = new NodeCache({ stdTTL: 600, checkperiod: 120 });
    const logger = pino({ level: 'debug' }, pino.destination(path.join(config.logDir, `bot_${phoneNumber}.log`)));
    
    const PhistarBotInc = makeWASocket({
        logger,
        printQRInTerminal: false,
        browser: config.browser,
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
        },
        markOnlineOnConnect: true,
        generateHighQualityLinkPreview: true,
        msgRetryCounterCache,
        defaultQueryTimeoutMs: undefined,
        getMessage: async (key) => {
            return store.loadMessage(key.remoteJid, key.id);
        }
    });

    // Add account to manager with all identification info
    const accountData = {
        botInstance: PhistarBotInc,
        telegramChatId,
        isNewConnection: true,
        phoneNumber: phoneNumber,
        accountId: null, // Will be set when connection opens
        botNumber: null  // Will be set when connection opens
    };
    accountManager.addAccount(phoneNumber, accountData);

    PhistarBotInc.autostatusview = true;

    store.bind(PhistarBotInc.ev);

    const modes = readModes();
    PhistarBotInc.public = modes[phoneNumber] === 'public' ? true : modes[phoneNumber] === 'self' ? false : true;
    console.log(`Restored mode for ${phoneNumber}: ${PhistarBotInc.public ? 'public' : 'self'}`);

    const autostatusviewStates = readAutostatusview();
    PhistarBotInc.autostatusview = autostatusviewStates[phoneNumber] === 'on' ? true : autostatusviewStates[phoneNumber] === 'off' ? false : true;
    console.log(`Restored autostatusview for ${phoneNumber}: ${PhistarBotInc.autostatusview ? 'on' : 'off'}`);

    const backoffDelay = (attempt) => Math.min(1000 * Math.pow(2, attempt), 60000);
    PhistarBotInc.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;
        const account = accountManager.getAccountByNumber(phoneNumber);

        if (connection === 'open') {
            try {
                await saveCreds();
                accountManager.reconnectAttempts.set(phoneNumber, 0);
                
                // Set the account ID and bot number once connection is open
                if (PhistarBotInc.user?.id) {
                    account.accountId = PhistarBotInc.user.id;
                    account.botNumber = PhistarBotInc.user.id.split(':')[0]; // Store the raw number
                    accountManager.accountIds.set(PhistarBotInc.user.id, phoneNumber);
                }

                if (telegramChatId && account.isNewConnection) {
                    bot.sendMessage(telegramChatId, `
╭⭑━━━➤ PHISTAR BOT INC
┣ ◁️ Connected successfully to
┣ ◁️ ${account.botNumber} 
┣ ◁️ Mode: ${PhistarBotInc.public ? 'public' : 'self'}
┣ ◁️ Autostatusview: ${PhistarBotInc.autostatusview ? 'on' : 'off'}
┣ ◁️ Account ID: ${account.accountId}
╰━━━━━━━━━━━━━━━━━━━╯
                    `);
                    account.isNewConnection = false;
                    accountManager.addAccount(phoneNumber, account);
                }
            } catch (err) {
                console.error(`Error in connection open for ${phoneNumber}:`, err);
            }
        } else if (connection === 'close') {
            const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
            console.log(`Disconnected from ${phoneNumber} with reason: ${reason} (${DisconnectReason[reason] || 'Unknown'})`);

            if ([
                DisconnectReason.connectionClosed,
                DisconnectReason.connectionLost,
                DisconnectReason.connectionReplaced,
                DisconnectReason.restartRequired,
                DisconnectReason.timedOut
            ].includes(reason)) {
                const attempts = (accountManager.reconnectAttempts.get(phoneNumber) || 0) + 1;
                accountManager.reconnectAttempts.set(phoneNumber, attempts);
                if (attempts <= config.maxReconnectAttempts) {
                    const delay = backoffDelay(attempts);
                    console.log(`Reconnecting ${phoneNumber} attempt ${attempts} after ${delay}ms`);
                    setTimeout(() => PhistarBotIncStart(phoneNumber, telegramChatId, fixedPairCode), delay);
                } else {
                    console.error(`Max reconnect attempts reached for ${phoneNumber}`);
                    accountManager.removeAccount(phoneNumber);
                    if (telegramChatId) {
                        bot.sendMessage(telegramChatId, `❌ Max reconnect attempts reached for ${phoneNumber}. Please re-pair.`);
                    }
                }
            } else if (reason === DisconnectReason.loggedOut || reason === DisconnectReason.badSession) {
                if (fs.existsSync(sessionPath)) {
                    fs.rmSync(sessionPath, { recursive: true });
                }
                const modes = readModes();
                if (modes[phoneNumber]) {
                    delete modes[phoneNumber];
                    fs.writeFileSync(modeFilePath, JSON.stringify(modes, null, 2), { mode: 0o600 });
                    console.log(`Removed mode for ${phoneNumber} due to logout`);
                }
                const autostatusviewStates = readAutostatusview();
                if (autostatusviewStates[phoneNumber]) {
                    delete autostatusviewStates[phoneNumber];
                    fs.writeFileSync(autostatusviewFilePath, JSON.stringify(autostatusviewStates, null, 2), { mode: 0o600 });
                    console.log(`Removed autostatusview for ${phoneNumber} due to logout`);
                }
                if (telegramChatId) {
                    bot.sendMessage(telegramChatId, `⚠️ Session for ${phoneNumber} was removed (reason: ${DisconnectReason[reason]})`);
                }
                accountManager.removeAccount(phoneNumber);
            } else {
                console.warn(`Unhandled disconnect reason for ${phoneNumber}: ${reason}. Attempting cautious reconnect.`);
                setTimeout(() => PhistarBotIncStart(phoneNumber, telegramChatId, fixedPairCode), config.reconnectDelay * 2);
            }
        }
    });

    if (!PhistarBotInc.authState.creds.registered && telegramChatId) {
        const pairingTimeout = setTimeout(async () => {
            try {
                const code = await PhistarBotInc.requestPairingCode(phoneNumber, fixedPairCode);
                const formattedCode = code?.match(/.{1,4}/g)?.join("-") || code;
                bot.sendMessage(telegramChatId, `Pairing code for ${phoneNumber} (using PHIS2025):\n${formattedCode}`);
            } catch (err) {
                console.error('Pairing error:', err);
                bot.sendMessage(telegramChatId, `❌ Failed to generate pairing code: ${err.message}`);
            }
        }, 3000);

        PhistarBotInc.ev.on('connection.update', (update) => {
            if (update.connection === 'open') {
                clearTimeout(pairingTimeout);
            }
        });
    }

    PhistarBotInc.ev.on('messages.upsert', async (chatUpdate) => {
        try {
            const account = accountManager.getAccountByNumber(phoneNumber);
            if (!account || !account.botInstance?.ws?.isOpen) {
                console.log(`Skipping message processing for ${phoneNumber}: Connection is not open`);
                return;
            }

            const mek = chatUpdate.messages[0];
            if (!mek.message) return;

            const messageKey = `${mek.key.remoteJid}:${mek.key.id}`;
            if (store.processedMessages.has(messageKey)) {
                console.log(`Skipping duplicate message ${messageKey} for ${phoneNumber}`);
                return;
            }
            store.processedMessages.add(messageKey);

            mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage')
                ? mek.message.ephemeralMessage.message
                : mek.message;

            const mtype = getContentType(mek.message);
            console.log(`Processing message ${messageKey} for ${phoneNumber}, type: ${mtype}, fromMe: ${mek.key.fromMe}, remoteJid: ${mek.key.remoteJid}`);

            // Get the bot's number directly from account data
            const botNumber = account.botNumber;
            
            // Autostatusview for status@broadcast
            if (mek.key.remoteJid === 'status@broadcast') {
                if (!PhistarBotInc.autostatusview) {
                    console.log(`Autostatusview is off for ${botNumber}, skipping status ${messageKey}`);
                    return;
                }

                const emoji = ['💥', '🌟', '✨', '☠️', '😎', '❤️', '😌', '😜', '💀', '🖤', '🤫', '💙'];
                const randomEmoji = emoji[Math.floor(Math.random() * emoji.length)];
                
                const now = Date.now();
                const lastStatus = accountManager.mediaRateLimit.get(`${phoneNumber}:status`) || 0;
                if (now - lastStatus < 2000) {
                    console.log(`Rate limiting status reaction for ${messageKey} on ${botNumber}`);
                    return;
                }
                accountManager.mediaRateLimit.set(`${phoneNumber}:status`, now);

                try {
                    await Promise.race([
                        PhistarBotInc.readMessages([mek.key]),
                        new Promise((_, reject) => setTimeout(() => reject(new Error('Read timeout')), config.messageSendTimeout))
                    ]);
                    console.log(`Viewed status ${messageKey} from ${mek.key.participant} for ${botNumber}`);
                    
                    await Promise.race([
                        PhistarBotInc.sendMessage(
                            'status@broadcast',
                            { react: { text: randomEmoji, key: mek.key } },
                            { statusJidList: [mek.key.participant] }
                        ),
                        new Promise((_, reject) => setTimeout(() => reject(new Error('Send timeout')), config.messageSendTimeout))
                    ]);
                    console.log(`Reacted to status ${messageKey} from ${mek.key.participant} with ${randomEmoji} for ${botNumber}`);
                    
                    if (telegramChatId) {
                        bot.sendMessage(telegramChatId, `✅ Viewed and reacted to status from ${mek.key.participant} with ${randomEmoji} for ${botNumber}`);
                    }
                } catch (err) {
                    console.error(`Error processing status ${messageKey} for ${botNumber}:`, err);
                    if (telegramChatId) {
                        bot.sendMessage(telegramChatId, `⚠️ Error processing status for ${botNumber}: ${err.message}`);
                    }
                }
                return;
            }

            if (!PhistarBotInc.public && !mek.key.fromMe && chatUpdate.type === 'notify') {
                console.log(`Ignoring message ${messageKey} in self mode for ${botNumber}`);
                return;
            }
            if (mek.key.id.startsWith('BAE5') && mtype !== 'protocolMessage') return;
            if (mek.key.fromMe && ['imageMessage', 'videoMessage'].includes(mtype)) {
                console.log(`Skipping bot-generated media message ${messageKey} for ${botNumber}`);
                return;
            }

            if (['imageMessage', 'videoMessage'].includes(mtype)) {
                const now = Date.now();
                const lastMedia = accountManager.mediaRateLimit.get(phoneNumber) || 0;
                if (now - lastMedia < 2000) {
                    console.log(`Rate limiting media message ${messageKey} for ${botNumber}`);
                    return;
                }
                accountManager.mediaRateLimit.set(phoneNumber, now);
            }

            const m = smsg(PhistarBotInc, mek, store);
            BigDaddyHandler(PhistarBotInc, m, chatUpdate, store);
        } catch (err) {
            console.error(`Message processing error for ${phoneNumber}:`, err);
            if (telegramChatId) {
                bot.sendMessage(telegramChatId, `⚠️ Message processing error for ${phoneNumber}: ${err.message}`);
            }
        }
    });

    PhistarBotInc.ev.on('creds.update', async () => {
        try {
            await saveCreds();
        } catch (err) {
            console.error(`Failed to save credentials for ${phoneNumber}:`, err);
            if (telegramChatId) {
                bot.sendMessage(telegramChatId, `⚠️ Error saving session for ${phoneNumber}. Please monitor.`);
            }
        }
    });

    // Add direct access to bot number in the instance
    PhistarBotInc.getBotNumber = () => {
        return accountManager.getAccountByNumber(phoneNumber)?.botNumber || null;
    };

    PhistarBotInc.decodeJid = (jid = '') => {
        if (!jid) return jid;
        const decoded = jidDecode(jid);
        if (decoded?.user && decoded?.server) {
            return `${decoded.user}@${decoded.server === 'lid' ? 's.whatsapp.net' : decoded.server}`;
        }
        return jid;
    };
  
    PhistarBotInc.getName = (jid, withoutContact = false) => {
        const id = PhistarBotInc.decodeJid(jid);
        withoutContact = PhistarBotInc.withoutContact || withoutContact;
        let v;
        
        if (id.endsWith("@g.us")) {
            return new Promise(async (resolve) => {
                v = store.contacts.get(id) || {};
                if (!(v.name || v.subject)) {
                    v = await PhistarBotInc.groupMetadata(id) || {};
                }
                const number = id.replace('@s.whatsapp.net', '').replace(/\D/g, '');
                try {
                    const formatted = number ? parsePhoneNumber('+' + number).formatInternational() : 'Unknown';
                    resolve(v.name || v.subject || formatted);
                } catch {
                    resolve(v.name || v.subject || '+' + number);
                }
            });
        } else {
            v = id === '0@s.whatsapp.net' ? {
                id,
                name: 'WhatsApp'
            } : id === PhistarBotInc.decodeJid(PhistarBotInc.user.id) ?
                PhistarBotInc.user :
                (store.contacts.get(id) || {});
            
            const number = jid.replace('@s.whatsapp.net', '').replace(/\D/g, '');
            try {
                const formatted = number ? parsePhoneNumber('+' + number).formatInternational() : 'Unknown';
                return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || formatted;
            } catch {
                return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || '+' + number;
            }
        }
    };

    PhistarBotInc.serializeM = (m) => smsg(PhistarBotInc, m, store);

    PhistarBotInc.sendText = async (jid, text, quoted = '', options) => {
        try {
            const start = Date.now();
            const result = await Promise.race([
                PhistarBotInc.sendMessage(jid, { text: text, ...options }, { quoted }),
                new Promise((_, reject) => setTimeout(() => reject(new Error('Send text timeout')), config.messageSendTimeout))
            ]);
            console.log(`Sent text to ${jid} for ${phoneNumber} in ${Date.now() - start}ms`);
            return result;
        } catch (err) {
            console.error(`Error sending text to ${jid} for ${phoneNumber}:`, err);
            throw err;
        }
    };

    PhistarBotInc.sendRestartMessage = async (phoneNumber) => {
        try {
            const images = [
                'https://files.catbox.moe/h73jac.jpg',
                'https://files.catbox.moe/h73jac.jpg'
            ];
            const imageUrl = images[Math.floor(Math.random() * images.length)];
            const caption = `*Dear Owner*,\nYour Bot is scheduled for a quick refresh in 5 seconds to ensure smooth performance.\n*Please note: All commands and group features will be re-enabled post-restart*.\nI'll be back online in *approximately within 10 seconds!*\n> Thank you for your patience!\n😊`;

            const start = Date.now();
            await Promise.race([
                PhistarBotInc.sendMessage(`${phoneNumber}@s.whatsapp.net`, {
                    image: { url: imageUrl },
                    caption: caption,
                }),
                new Promise((_, reject) => setTimeout(() => reject(new Error('Send restart message timeout')), config.messageSendTimeout))
            ]);
            console.log(`Sent restart message to ${phoneNumber} in ${Date.now() - start}ms`);
        } catch (error) {
            console.error(`Error sending restart message to ${phoneNumber}:`, error);
        }
    };

    PhistarBotInc.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
        try {
            const quoted = message.msg ? message.msg : message;
            const mime = (message.msg || message).mimetype || '';
            const messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0];
            const stream = await downloadContentFromMessage(quoted, messageType);
            
            let buffer = Buffer.from([]);
            for await(const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk]);
            }
            
            if (buffer.length > config.maxFileSize) {
                throw new Error(`Media size exceeds ${config.maxFileSize} bytes limit`);
            }

            const type = await FileType.fromBuffer(buffer);
            if (!fs.existsSync(config.mediaDir)) {
                fs.mkdirSync(config.mediaDir, { recursive: true });
            }
            
            const trueFileName = attachExtension 
                ? path.join(config.mediaDir, `${filename}.${type.ext}`) 
                : path.join(config.mediaDir, filename);
                
            await fs.writeFileSync(trueFileName, buffer);
            return trueFileName;
        } catch (error) {
            console.error('Media download error:', error);
            throw error;
        }
    };

    PhistarBotInc.getFile = async (PATH, save) => {
        try {
            let data = await getBuffer(PATH);
            if (data.length > config.maxFileSize) {
                throw new Error(`File size exceeds ${config.maxFileSize} bytes limit`);
            }
            
            const type = await FileType.fromBuffer(data) || {
                mime: 'application/octet-stream',
                ext: '.bin'
            };
            
            const filename = path.join(__dirname, 'temp', `${Date.now()}.${type.ext}`);
            if (save) {
                if (!fs.existsSync(path.dirname(filename))) {
                    fs.mkdirSync(path.dirname(filename), { recursive: true });
                }
                await fs.promises.writeFile(filename, data);
            }
            
            return {
                filename,
                size: data.length,
                ...type,
                data
            };
        } catch (error) {
            console.error('File processing error:', error);
            throw error;
        }
    };
    
    PhistarBotInc.sendFile = async (jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) => {
        try {
            const type = await PhistarBotInc.getFile(path, true);
            let { data: file } = type;
            
            const opt = { filename };
            if (quoted) opt.quoted = quoted;
            if (!type) options.asDocument = true;

            let mtype = '';
            let mimetype = type.mime;
            let convert;

            if (/webp/.test(type.mime) || (/image/.test(type.mime) && options.asSticker)) {
                mtype = 'sticker';
            } else if (/image/.test(type.mime) || (/webp/.test(type.mime) && options.asImage)) {
                mtype = 'image';
            } else if (/video/.test(type.mime)) {
                mtype = 'video';
            } else if (/audio/.test(type.mime)) {
                convert = await (ptt ? toPTT : toAudio)(file, type.ext);
                file = convert.data;
                mtype = 'audio';
                mimetype = 'audio/ogg; codecs=opus';
            } else {
                mtype = 'document';
            }

            if (options.asDocument) mtype = 'document';

            const cleanOptions = { ...options };
            ['asSticker', 'asLocation', 'asVideo', 'asDocument', 'asImage'].forEach(prop => delete cleanOptions[prop]);

            const message = { 
                ...cleanOptions, 
                caption, 
                ptt, 
                [mtype]: { url: type.filename }, 
                mimetype 
            };

            try {
                const start = Date.now();
                const sentMsg = await Promise.race([
                    PhistarBotInc.sendMessage(jid, message, { ...opt, ...cleanOptions }),
                    new Promise((_, reject) => setTimeout(() => reject(new Error('Send file timeout')), config.messageSendTimeout))
                ]);
                console.log(`Sent ${mtype} to ${jid} for ${phoneNumber} in ${Date.now() - start}ms`);
                return sentMsg;
            } catch (e) {
                console.error(`Send file error to ${jid} for ${phoneNumber}:`, e);
                return await PhistarBotInc.sendMessage(jid, { ...message, [mtype]: file }, { ...opt, ...cleanOptions });
            }
        } catch (error) {
            console.error(`File send error for ${phoneNumber}:`, error);
            throw error;
        }
    };

    PhistarBotInc.sendTextWithMentions = async (jid, text, quoted, options = {}) => {
        try {
            const start = Date.now();
            const result = await Promise.race([
                PhistarBotInc.sendMessage(jid, { 
                    text: text, 
                    mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'), 
                    ...options 
                }, { quoted }),
                new Promise((_, reject) => setTimeout(() => reject(new Error('Send text with mentions timeout')), config.messageSendTimeout))
            ]);
            console.log(`Sent text with mentions to ${jid} for ${phoneNumber} in ${Date.now() - start}ms`);
            return result;
        } catch (err) {
            console.error(`Error sending text with mentions to ${jid} for ${phoneNumber}:`, err);
            throw err;
        }
    };

    PhistarBotInc.downloadMediaMessage = async (message) => {
        try {
            const mime = (message.msg || message).mimetype || '';
            const messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0];
            const stream = await downloadContentFromMessage(message, messageType);
            
            let buffer = Buffer.from([]);
            for await(const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk]);
            }
            if (buffer.length > config.maxFileSize) {
                throw new Error(`Media size exceeds ${config.maxFileSize} bytes limit`);
            }
            return buffer;
        } catch (error) {
            console.error('Media download error:', error);
            throw error;
        }
    };

    return PhistarBotInc;
}

async function getBuffer(url) {
    try {
        if (Buffer.isBuffer(url)) return url;
        if (/^data:/.test(url)) {
            return Buffer.from(url.split(',')[1], 'base64');
        }
        if (fs.existsSync(url)) {
            return fs.readFileSync(url);
        }
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        return Buffer.from(response.data);
    } catch (error) {
        console.error('Error fetching buffer:', error);
        throw error;
    }
}

async function toPTT(buffer, ext) {
    return { data: buffer, ext };
}

async function toAudio(buffer, ext) {
    return { data: buffer, ext };
}

function smsg(PhistarBotInc, m, store) {
    if (!m) return m;
    
    let M = proto.WebMessageInfo;
    
    if (m.key) {
        m.id = m.key.id;
        m.isBaileys = m.id.startsWith('BAE5') && m.id.length === 16;
        m.chat = m.key.remoteJid;
        m.fromMe = m.key.fromMe;
        m.isGroup = m.chat.endsWith('@g.us');
        m.sender = PhistarBotInc.decodeJid(
            m.fromMe ? PhistarBotInc.user.id : 
            (m.isGroup ? m.key.participant : m.key.remoteJid)
        );
    }

    if (m.message) {
        m.mtype = getContentType(m.message);
        m.msg = (m.mtype === 'viewOnceMessageV2')
            ? m.message[m.mtype].message[getContentType(m.message[m.mtype].message)]
            : m.message[m.mtype];

        if (['imageMessage', 'videoMessage', 'documentMessage'].includes(m.mtype)) {
            m.msg.mimetype = m.msg.mimetype || 'application/octet-stream';
            m.msg.caption = m.msg.caption || '';
            m.mediaKey = m.msg.mediaKey;
        }

        m.body = m.msg.caption || 
                 m.msg.text || 
                 m.message.conversation || 
                 (m.msg?.buttonsResponseMessage?.selectedButtonId || '');
        
        m.mentionedJid = m.msg?.contextInfo?.mentionedJid || [];
        if (m.body.match(/@(\d{10,})/g)) {
            m.mentionedJid = [...new Set([
                ...m.mentionedJid,
                ...m.body.match(/@(\d{10,})/g).map(v => v.replace('@', '') + '@s.whatsapp.net')
            ])];
        }
    }

    if (m.msg?.contextInfo?.quotedMessage) {
        const quoted = m.quoted = m.msg.contextInfo.quotedMessage;
        const type = getContentType(quoted);
        
        m.quoted = {
            ...(quoted[type] || {}),
            mtype: type,
            id: m.msg.contextInfo.stanzaId,
            chat: m.msg.contextInfo.remoteJid || m.chat,
            sender: PhistarBotInc.decodeJid(m.msg.contextInfo.participant),
            fromMe: m.msg.contextInfo.participant === PhistarBotInc.decodeJid(PhistarBotInc.user.id),
            text: quoted[type]?.caption || 
                  quoted[type]?.text || 
                  (typeof quoted[type] === 'string' ? quoted[type] : '')
        };

        m.getQuotedObj = async () => {
            if (!m.quoted.id) return null;
            try {
                const q = await store.loadMessage(m.chat, m.quoted.id);
                return smsg(PhistarBotInc, q, store);
            } catch (err) {
                console.error('Quoted message load failed:', err);
                return null;
            }
        };

        m.quoted.delete = () => PhistarBotInc.sendMessage(m.quoted.chat, { 
            delete: { 
                id: m.quoted.id, 
                participant: m.quoted.sender,
                remoteJid: m.quoted.chat,
                fromMe: m.quoted.fromMe
            } 
        });

        m.quoted.download = () => PhistarBotInc.downloadMediaMessage(m.quoted);
    }

    m.reply = async (content, options = {}) => {
        try {
            const baseContent = typeof content === 'string' 
                ? { text: content }
                : content;
            
            return await PhistarBotInc.sendMessage(m.chat, {
                ...baseContent,
                contextInfo: {
                    ...(baseContent.contextInfo || {}),
                    mentionedJid: [...new Set([
                        ...(baseContent.contextInfo?.mentionedJid || []),
                        m.sender
                    ])],
                    forwardingScore: Math.min(options.forwardingScore || 2, 127),
                    isForwarded: options.isForwarded || false
                }
            }, { quoted: m });
        } catch (err) {
            console.error('Reply failed:', err);
            throw err;
        }
    };

    m.forward = async (jid, forceForward = false) => {
        return PhistarBotInc.sendMessage(jid, {
            forward: {
                key: m.key,
                message: m.message
            }
        }, {
            forceForward,
            contextInfo: {
                forwardingScore: forceForward ? 2 : 0
            }
        });
    };

    return m;
}

// ==================== Telegram Commands ====================
bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    bot.sendPhoto(chatId, "https://files.catbox.moe/p0gguf.jpg", {
        caption: `
╭⭑━━━➤ ʙɪɢ ᴅᴀᴅᴅʏ ᴠ1 ᴍɪɴɪ
┣ ◁️  💥 ᴄᴏᴍᴍᴀɴᴅꜱ:
┣ ◁️  /pair <ᴘᴀɪʀ ɴᴜᴍʙᴇʀ ᴛᴏ ʙᴏᴛ>
┣ ◁️  /delpair <ᴅᴇʟᴇᴛᴇ ᴘᴀɪʀᴇᴅ ɴᴜᴍʙᴇʀ>
┣ ◁️  /listpair <ɴᴏᴛ ᴀᴜᴛʜᴏʀɪᴢᴇᴅ>
┣ ◁️  /listmodes <ɴᴏᴛ ᴀᴜᴛʜᴏʀɪᴢᴇᴅ>
╰━━━━━━━━━━━━━━━━━━━╯
`,
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "📢 Channel", url: `https://t.me/${config.telegramChannel.replace('@', '')}` },
                    { text: "👥 Group", url: config.telegramGroupLink }
                ],
                [
                    { text: "🎥 YouTube", url: config.youtubeChannel }
                ]
            ],
        },
    });
});

bot.onText(/\/pair(?:\s+(\d+))?/, async (msg, match) => {
    const phoneNumber = match[1];
    const chatId = msg.chat.id;
    const fixedPairCode = "PHIS2025";

    if (!phoneNumber) {
        return bot.sendMessage(chatId, `ℹ️ Usage: /pair <phoneNumber>\nExample: /pair 2349128019###\nReplace 2349128019### with your phone number (without +). The pairing code will use PHIS2025.`);
    }

    if (!/^\d+$/.test(phoneNumber)) {
        return bot.sendMessage(chatId, '⚠️ Invalid phone number format. Use numbers only (e.g., 2349128019###).');
    }

    const existingAccount = accountManager.getAccountByNumber(phoneNumber);
    if (existingAccount && existingAccount.botInstance?.ws?.isOpen) {
        return bot.sendMessage(chatId, `⚠️ ${phoneNumber} is already connected. Use /delpair to disconnect first.`);
    } else if (existingAccount) {
        accountManager.removeAccount(phoneNumber);
    }

    bot.sendMessage(chatId, `🔄 Initializing session for ${phoneNumber} with pairing code PHIS2025...`);

    try {
        const PhistarBotInc = await PhistarBotIncStart(phoneNumber, chatId, fixedPairCode);
        const botNumber = PhistarBotInc.getBotNumber();
        bot.sendMessage(chatId, `✅ Initialized ${botNumber} in ${PhistarBotInc.public ? 'public' : 'self'} mode, Autostatusview: ${PhistarBotInc.autostatusview ? 'on' : 'off'}`);
    } catch (err) {
        console.error('Pair command error:', err);
        bot.sendMessage(chatId, `❌ Failed to create session: ${err.message}`);
    }
});

bot.onText(/\/delpair(?:\s+(\d+))?/, async (msg, match) => {
    const phoneNumber = match[1];
    const chatId = msg.chat.id;

    if (!phoneNumber) {
        return bot.sendMessage(chatId, `ℹ️ To disconnect a WhatsApp account, use:\n\n/delpair 2349128019###\n\nReplace 2349128019### with your full phone number (without +).`);
    }

    if (!/^\d+$/.test(phoneNumber)) {
        return bot.sendMessage(chatId, '⚠️ Invalid phone number format. Use numbers only like 2349128019###');
    }

    try {
        const account = accountManager.getAccountByNumber(phoneNumber);
        if (account && account.botInstance) {
            account.botInstance.ws.close();
            accountManager.removeAccount(phoneNumber);
        }

        const sessionPath = path.join(config.sessionDir, `session_${phoneNumber}`);
        if (fs.existsSync(sessionPath)) {
            fs.rmSync(sessionPath, { recursive: true, force: true });
            const modes = readModes();
            if (modes[phoneNumber]) {
                delete modes[phoneNumber];
                fs.writeFileSync(modeFilePath, JSON.stringify(modes, null, 2), { mode: 0o600 });
            }
            const autostatusviewStates = readAutostatusview();
            if (autostatusviewStates[phoneNumber]) {
                delete autostatusviewStates[phoneNumber];
                fs.writeFileSync(autostatusviewFilePath, JSON.stringify(autostatusviewStates, null, 2), { mode: 0o600 });
            }
            bot.sendMessage(chatId, `✅ Deleted PhistarBotInc session for ${phoneNumber}`);
        } else {
            bot.sendMessage(chatId, `⚠️ No session found for ${phoneNumber}`);
        }
    } catch (err) {
        console.error('Delpair command error:', err);
        bot.sendMessage(chatId, `❌ Failed to delete session: ${err.message}`);
    }
});

bot.onText(/\/listpair/, async (msg) => {
    const chatId = msg.chat.id;
    
    if (msg.from.id.toString() !== config.ownerId) {
        return bot.sendMessage(chatId, '❌ Unauthorized: This command is owner-only');
    }

    try {
        let response = '📱 Active PhistarBotInc Sessions:\n';
        const accounts = accountManager.getAllAccounts();
        
        for (const account of accounts) {
            const botNumber = account.botNumber || account.phoneNumber;
            response += `- ${botNumber} (Account ID: ${account.accountId || 'N/A'}, Mode: ${account.botInstance?.public ? 'public' : 'self'}, Autostatusview: ${account.botInstance?.autostatusview ? 'on' : 'off'})\n`;
        }
        
        bot.sendMessage(chatId, response || 'No active sessions');
    } catch (err) {
        console.error('Listpair command error:', err);
        bot.sendMessage(chatId, '❌ Failed to list sessions');
    }
});

bot.onText(/\/listmodes/, async (msg) => {
    const chatId = msg.chat.id;
    
    if (msg.from.id.toString() !== config.ownerId) {
        return bot.sendMessage(chatId, '❌ Unauthorized: This command is owner-only');
    }

    try {
        const modes = readModes();
        const autostatusviewStates = readAutostatusview();
        let response = '📊 PhistarBotInc Mode and Autostatusview Status:\n';
        for (const number of Object.keys(modes)) {
            response += `- ${number}: Mode: ${modes[number]}, Autostatusview: ${autostatusviewStates[number] || 'on'}\n`;
        }
        bot.sendMessage(chatId, response || 'No mode settings found');
    } catch (err) {
        console.error('Listmodes command error:', err);
        bot.sendMessage(chatId, '❌ Failed to list modes');
    }
});

async function initializePhistarBots() {
    try {
        if (!fs.existsSync(config.sessionDir)) {
            fs.mkdirSync(config.sessionDir, { recursive: true, mode: 0o700 });
            console.log('Session directory created');
            return;
        }

        const sessions = fs.readdirSync(config.sessionDir)
            .filter(dir => dir.startsWith('session_'))
            .map(dir => dir.replace('session_', ''));
        
        if (sessions.length === 0) {
            console.log('No existing sessions found');
            return;
        }

        console.log(`Found ${sessions.length} session(s) to initialize`);
        
        for (const number of sessions) {
            try {
                const sessionPath = path.join(config.sessionDir, `session_${number}`);
                const credsFile = path.join(sessionPath, 'creds.json');
                if (!fs.existsSync(credsFile)) {
                    console.warn(`No credentials found for ${number}. Skipping.`);
                    continue;
                }
                await PhistarBotIncStart(number);
                console.log(`✅ Auto-connected to ${number}`);
                await new Promise(resolve => setTimeout(resolve, 2000));
            } catch (err) {
                console.error(`Failed to initialize session for ${number}:`, err);
            }
        }
        
    } catch (error) {
        console.error('Initialization error:', error.message);
    }
}

setInterval(() => {
    accountManager.getAllAccounts().forEach(account => {
        if (!account.botInstance?.ws?.isOpen) {
            console.log(`Cleaning up inactive session for ${account.phoneNumber}`);
            accountManager.removeAccount(account.phoneNumber);
        }
    });
    console.log(`Memory cleanup: ${store.messages.size} messages stored, ${store.processedMessages.size} processed`);
}, 30 * 60 * 1000);

setInterval(async () => {
    console.log('🔄 Scheduled restart initiated...');
    accountManager.getAllAccounts().forEach(account => {
        try {
            account.botInstance.ws.close();
            console.log(`Closed session for ${account.phoneNumber}`);
        } catch (err) {
            console.error(`Error processing restart for ${account.phoneNumber}:`, err);
        }
    });
    accountManager.accounts.clear();
    accountManager.accountIds.clear();
    console.log('All sessions closed. Exiting process for PM2 to restart.');
    process.exit(0);
}, config.restartInterval);

console.log(`Next restart scheduled in ${config.restartInterval / 60000} minutes`);

initializePhistarBots().then(() => {
    console.log('🚀 PhistarBotInc ready');
});

process.on('SIGINT', async () => {
    console.log('Received SIGINT. Closing all sessions...');
    accountManager.getAllAccounts().forEach(account => {
        try {
            account.botInstance.ws.close();
            console.log(`Closed session for ${account.phoneNumber}`);
        } catch (err) {
            console.error(`Error closing session for ${account.phoneNumber}:`, err);
        }
    });
    accountManager.accounts.clear();
    accountManager.accountIds.clear();
    console.log('All sessions closed. Exiting process.');
    process.exit(0);
});

const file = require.resolve(__filename);
fs.watchFile(file, { interval: 1000 }, () => {
    fs.unwatchFile(file);
    console.log('🔄 Reloading due to file change...');
    delete require.cache[file];
    require(file);
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled rejection:', err.message);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught exception:', err.message);
    process.exit(1);
});

// Export persistence functions for BigDaddyHandler.js
module.exports = { readModes, writeMode, readAutostatusview, writeAutostatusview };