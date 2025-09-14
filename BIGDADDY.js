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
} = require('baileys-x'); // Updated to baileys-x
const { Boom } = require('@hapi/boom');
const pino = require('pino');
const TelegramBot = require('node-telegram-bot-api');
const NodeCache = require('node-cache');
const FileType = require('file-type');
const yargs = require('yargs/yargs')
const https = require('https');
const { parsePhoneNumber } = require('libphonenumber-js');
const PhoneNumber = require('awesome-phonenumber');
const BigDaddyHandler = require("./Backend.js");
const axios = require('axios');
const _ = require('lodash');

// Import token from external file with error handling
let telegramToken, prefixFromToken;
try {
    const tokenConfig = require('./token.js');
    telegramToken = tokenConfig.telegramToken;
    prefixFromToken = tokenConfig.prefix; // No default prefix
    if (!telegramToken || telegramToken === 'YOUR_TELEGRAM_BOT_TOKEN_HERE') {
        throw new Error('Invalid or placeholder token in token.js');
    }
    if (typeof prefixFromToken !== 'string') {
        console.warn('Invalid prefix configuration in token.js: prefix must be a string. Treating as empty prefix.');
        prefixFromToken = ''; // Treat invalid prefix as empty
    }
} catch (error) {
    console.error('Error loading token.js file:', error.message);
    console.log('Please create a token.js file with the following content:');
    console.log('module.exports = {');
    console.log('    telegramToken: \'7867524120:AAFH36k_cRPyBHBEZc0UbVi2RSe6DoGxnvQ\',');
    console.log('    prefix: \'\'');
    console.log('};');
    process.exit(1);
}

// ==================== Configuration ====================
const config = {
    telegramToken: telegramToken,
    prefix: prefixFromToken, // Use prefix from token.js
    ownerId: '6300694007',
    sessionDir: path.join(__dirname, 'phistar_sessions'),
    mediaDir: path.join(__dirname, 'phistar-media'),
    logDir: path.join(__dirname, 'logs'),
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

// ==================== CHATBOT CONFIG ====================
const CHATBOT_CONFIG_PATH = './database/chatbot_config.json'

// Helper functions for chatbot config
const readChatbotConfig = () => {
  try {
    if (fs.existsSync(CHATBOT_CONFIG_PATH)) {
      const data = fs.readFileSync(CHATBOT_CONFIG_PATH, 'utf8')
      return JSON.parse(data)
    }
    return {}
  } catch (error) {
    console.error('Error reading chatbot config:', error)
    return {}
  }
}

const writeChatbotConfig = (data) => {
  try {
    fs.writeFileSync(CHATBOT_CONFIG_PATH, JSON.stringify(data, null, 2))
    return true
  } catch (error) {
    console.error('Error writing chatbot config:', error)
    return false
  }
}

// Initialize chatbot config for a specific WhatsApp number
const initChatbotConfig = (phoneNumber) => {
  const config = readChatbotConfig()
  if (!config[phoneNumber]) {
    config[phoneNumber] = {
      dm: false,
      group: false,
      enabled: false
    }
    writeChatbotConfig(config)
  }
  return config[phoneNumber]
}

// Get chatbot config for a specific WhatsApp number
const getChatbotConfig = (phoneNumber) => {
  const config = readChatbotConfig()
  return config[phoneNumber] || initChatbotConfig(phoneNumber)
}

// Update chatbot config for a specific WhatsApp number
const updateChatbotConfig = (phoneNumber, newConfig) => {
  const config = readChatbotConfig()
  config[phoneNumber] = { ...config[phoneNumber], ...newConfig }
  return writeChatbotConfig(config)
}

// Chatbot API function
async function getChatGPTResponse(prompt) {
  try {
    const response = await axios.get(
      `https://api.giftedtech.co.ke/api/ai/gpt4?apikey=gifted&q=${encodeURIComponent(prompt)}`,
      { timeout: 30000 } // 30 second timeout
    )

    if (response.data && response.data.success) {
      return response.data.result
    } else {
      throw new Error('API returned unsuccessful response')
    }
  } catch (error) {
    console.error("ChatGPT API Error:", error)
    throw new Error('Failed to get response from AI service')
  }
}

// Chatbot message handler
async function handleChatbotMessage(PhistarBotInc, m, phoneNumber) {
  try {
    // Check if chatbot is enabled for this WhatsApp number
    const chatbotConfig = getChatbotConfig(phoneNumber)
    if (!chatbotConfig.enabled) return

    // Check if message is from a group
    const isGroup = m.key.remoteJid.endsWith('@g.us')
    
    // Determine if we should respond based on settings
    if (isGroup && !chatbotConfig.group) return
    if (!isGroup && !chatbotConfig.dm) return

    // Ignore messages from the bot itself
    if (m.key.fromMe) return

    // Ignore commands (messages starting with prefix) - FIXED
    const prefix = config.prefix
    // Only check for commands if prefix is not empty
    if (prefix && m.body && m.body.startsWith(prefix)) return

    // Only respond to text messages
    if (!m.body || typeof m.body !== 'string') return

    // Rate limiting - don't respond too frequently
    const now = Date.now()
    const lastResponse = mediaRateLimit.get(`${phoneNumber}:chatbot`) || 0
    if (now - lastResponse < 2000) { // 2 second cooldown
      console.log(`Rate limiting chatbot response for ${phoneNumber}`)
      return
    }
    mediaRateLimit.set(`${phoneNumber}:chatbot`, now)

    // Show typing indicator
    await PhistarBotInc.sendPresenceUpdate('composing', m.key.remoteJid)

    // Get response from ChatGPT API
    const response = await getChatGPTResponse(m.body)

    // Send the response
    await PhistarBotInc.sendMessage(m.key.remoteJid, { text: response }, { quoted: m })

    // Stop typing indicator
    await PhistarBotInc.sendPresenceUpdate('paused', m.key.remoteJid)

  } catch (error) {
    console.error(`Chatbot error for ${phoneNumber}:`, error)
    // Don't send error messages to users to avoid spam
  }
}
//database
var low
try {
low = require('lowdb')
} catch (e) {
low = require('./lib/lowdb')}
const { Low, JSONFile } = low
const mongoDB = require('./lib/mongoDB')
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.db = new Low(
/https?:\/\//.test(opts['db'] || '') ?
new cloudDBAdapter(opts['db']) : /mongodb/.test(opts['db']) ?
new mongoDB(opts['db']) :
new JSONFile(`./src/database.json`)
)
global.DATABASE = global.db // Backwards Compatibility
global.loadDatabase = async function loadDatabase() {
if (global.db.READ) return new Promise((resolve) => setInterval(function () { (!global.db.READ ? (clearInterval(this), resolve(global.db.data == null ? global.loadDatabase() : global.db.data)) : null) }, 1 * 1000))
if (global.db.data !== null) return
global.db.READ = true
await global.db.read()
global.db.READ = false
global.db.data = {
users: {},
chats: {},
game: {},
database: {},
settings: {},
setting: {},
others: {},
sticker: {},
...(global.db.data || {})}
  global.db.chain = _.chain(global.db.data)}
loadDatabase()

//update function
// Function to download file from GitHub
async function downloadFileFromGitHub(githubUrl, filePath) {
    return new Promise((resolve, reject) => {
        // Convert GitHub URL to raw content URL
        const rawUrl = githubUrl.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
        
        const file = fs.createWriteStream(filePath);
        https.get(rawUrl, (response) => {
            if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    resolve(true);
                });
            } else {
                file.close();
                fs.unlink(filePath, () => {}); // Delete incomplete file
                reject(new Error(`Failed to download file. Status code: ${response.statusCode}`));
            }
        }).on('error', (err) => {
            file.close();
            fs.unlink(filePath, () => {}); // Delete incomplete file
            reject(err);
        });
    });
}

// Function to update a file
async function updateFile(fileName, githubUrl, chatId) {
    try {
        const filePath = path.join(__dirname, fileName);
        const backupPath = path.join(__dirname, `${fileName}.backup`);
        
        // Create backup
        if (fs.existsSync(filePath)) {
            fs.copyFileSync(filePath, backupPath);
            bot.sendMessage(chatId, `📦 Created backup: ${fileName}.backup`);
        }
        
        // Download new version
        bot.sendMessage(chatId, `⬇️ Downloading ${fileName} from GitHub...`);
        await downloadFileFromGitHub(githubUrl, filePath);
        
        // Verify the file was downloaded
        if (fs.existsSync(filePath) && fs.statSync(filePath).size > 0) {
            bot.sendMessage(chatId, `✅ Successfully updated ${fileName}!`);
            
            // If updating the main file, schedule restart
            if (fileName === 'BIGDADDY.js') {
                bot.sendMessage(chatId, '🔄 The bot will restart in 5 seconds to apply changes...');
                setTimeout(() => {
                    process.exit(0); // Restart via PM2
                }, 5000);
            }
        } else {
            throw new Error('Downloaded file is empty or missing');
        }
        
    } catch (error) {
        console.error('Update error:', error);
        bot.sendMessage(chatId, `❌ Failed to update ${fileName}: ${error.message}`);
        
        // Restore from backup if update failed
        const filePath = path.join(__dirname, fileName);
        const backupPath = path.join(__dirname, `${fileName}.backup`);
        
        if (fs.existsSync(backupPath)) {
            fs.copyFileSync(backupPath, filePath);
            bot.sendMessage(chatId, `↩️ Restored from backup due to update failure`);
        }
    }
}
// ==================== RUNTIME DATABASE ====================
const RUNTIME_DB_PATH = './database/runtime_db.json';

// Helper functions for runtime database
const readRuntimeDB = () => {
  try {
    if (fs.existsSync(RUNTIME_DB_PATH)) {
      const data = fs.readFileSync(RUNTIME_DB_PATH, 'utf8');
      return JSON.parse(data);
    }
    return { welcomeMessages: {}, connectionTimes: {} };
  } catch (error) {
    console.error('Error reading runtime DB:', error);
    return { welcomeMessages: {}, connectionTimes: {} };
  }
};

const writeRuntimeDB = (data) => {
  try {
    fs.writeFileSync(RUNTIME_DB_PATH, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing runtime DB:', error);
    return false;
  }
};

// Record connection time for a user
const recordConnectionTime = (phoneNumber) => {
  const db = readRuntimeDB();
  db.connectionTimes[phoneNumber] = Date.now();
  writeRuntimeDB(db);
};

// Remove connection time when user disconnects
const removeConnectionTime = (phoneNumber) => {
  const db = readRuntimeDB();
  if (db.connectionTimes[phoneNumber]) {
    delete db.connectionTimes[phoneNumber];
  }
  if (db.welcomeMessages[phoneNumber]) {
    delete db.welcomeMessages[phoneNumber];
  }
  writeRuntimeDB(db);
};

// Check if welcome message was already sent
const hasWelcomeMessageBeenSent = (phoneNumber) => {
  const db = readRuntimeDB();
  return db.welcomeMessages[phoneNumber] || false;
};

// Mark welcome message as sent
const markWelcomeMessageSent = (phoneNumber) => {
  const db = readRuntimeDB();
  db.welcomeMessages[phoneNumber] = true;
  writeRuntimeDB(db);
};

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
const activePhistarBots = new Map();
const commandCache = new NodeCache({ stdTTL: 600, checkperiod: 120 });
const reconnectAttempts = new Map();
const mediaRateLimit = new Map();
let isFirstLog = true;

if (!fs.existsSync(config.sessionDir)) fs.mkdirSync(config.sessionDir, { recursive: true, mode: 0o700 });
if (!fs.existsSync(config.mediaDir)) fs.mkdirSync(config.mediaDir, { recursive: true, mode: 0o700 });
if (!fs.existsSync(config.logDir)) fs.mkdirSync(config.logDir, { recursive: true, mode: 0o700 });

async function PhistarBotIncStart(phoneNumber, telegramChatId = null, fixedPairCode = "BIGDADDY") {
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

    if (activePhistarBots.has(phoneNumber)) {
        const existingConn = activePhistarBots.get(phoneNumber).PhistarBotInc;
        if (existingConn && existingConn.user && existingConn.ws.isOpen) {
            if (telegramChatId) {
                bot.sendMessage(telegramChatId, `⚠️ ${phoneNumber} is already connected to Big Daddy V1mini use /delpair to disconnect!`);
            }
            return existingConn;
        } else {
            activePhistarBots.delete(phoneNumber);
        }
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

    PhistarBotInc.autostatusview = true;

    activePhistarBots.set(phoneNumber, { 
        PhistarBotInc, 
        telegramChatId,
        isNewConnection: true 
    });
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
        const botData = activePhistarBots.get(phoneNumber);

        if (connection === 'open') {
    try {
        await saveCreds();
        reconnectAttempts.set(phoneNumber, 0);
        
        // Record connection time (this will overwrite any previous time)
        recordConnectionTime(phoneNumber);
        
        if (telegramChatId && botData.isNewConnection) {
            bot.sendMessage(telegramChatId, `
╭⭑━━━➤ PHISTAR BOT INC
┣ ◁️ Connected successfully to
┣ ◁️ ${phoneNumber} 
┣ ◁️ Mode: ${PhistarBotInc.public ? 'public' : 'self'}
┣ ◁️ Autostatusview: ${PhistarBotInc.autostatusview ? 'on' : 'off'}
╰━━━━━━━━━━━━━━━━━━━╯
            `);
            botData.isNewConnection = false;
            activePhistarBots.set(phoneNumber, botData);
        }
        
        // Send welcome message to WhatsApp user if it's a new connection
        // or if the user was previously disconnected (no welcome message sent record)
        if (!hasWelcomeMessageBeenSent(phoneNumber)) {
            try {
                const welcomeImage = 'https://i.postimg.cc/Kj5cMYwB/IMG-20250830-WA0005.jpg';
                const welcomeMessage = `*Hey owner 🥺*\n\nNeed help type ${config.prefix}menu\nor \n${config.prefix}mainmenu\n\n*Note:* Autostatusview is set to ${PhistarBotInc.autostatusview ? 'true' : 'false'} meaning I will ${PhistarBotInc.autostatusview ? '' : 'not'} be viewing statuses on your WhatsApp.\n\nTo turn it ${PhistarBotInc.autostatusview ? 'off' : 'on'} use:\n*${config.prefix}autostatusview ${PhistarBotInc.autostatusview ? 'off' : 'on'}*\n
> *BIG DADDY V3 SUCCESSFULLY CONNECTED*`;
                
                await PhistarBotInc.sendMessage(`${phoneNumber}@s.whatsapp.net`, {
                    image: { url: welcomeImage },
                    caption: welcomeMessage,
                });
                
                // Mark welcome message as sent
                markWelcomeMessageSent(phoneNumber);
                
            } catch (welcomeError) {
                console.error('Error sending welcome message:', welcomeError);
            }
        }
        
    } catch (err) {
        console.error(`Error in connection open for ${phoneNumber}:`, err);
    }
} else if (connection === 'close') {
    const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
    console.log(`Disconnected from ${phoneNumber} with reason: ${reason} (${DisconnectReason[reason] || 'Unknown'})`);

    // Remove connection time when user disconnects
    removeConnectionTime(phoneNumber);

    if ([
        DisconnectReason.connectionClosed,
                DisconnectReason.connectionLost,
                DisconnectReason.connectionReplaced,
                DisconnectReason.restartRequired,
                DisconnectReason.timedOut
            ].includes(reason)) {
                const attempts = (reconnectAttempts.get(phoneNumber) || 0) + 1;
                reconnectAttempts.set(phoneNumber, attempts);
                if (attempts <= config.maxReconnectAttempts) {
                    const delay = backoffDelay(attempts);
                    console.log(`Reconnecting ${phoneNumber} attempt ${attempts} after ${delay}ms`);
                    setTimeout(() => PhistarBotIncStart(phoneNumber, telegramChatId, fixedPairCode), delay);
                } else {
                    console.error(`Max reconnect attempts reached for ${phoneNumber}`);
                    activePhistarBots.delete(phoneNumber);
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
                activePhistarBots.delete(phoneNumber);
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
                bot.sendMessage(telegramChatId, `Pairing code for ${phoneNumber} is\n${formattedCode}`);
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
        // Ensure connection is open before processing messages
        if (!PhistarBotInc.ws.isOpen) {
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

        // Autostatusview for status@broadcast - KEEP REACTING BUT PREVENT POSTING
        if (mek.key.remoteJid === 'status@broadcast') {
            if (!PhistarBotInc.autostatusview) {
                console.log(`Autostatusview is off for ${phoneNumber}, skipping status ${messageKey}`);
                return;
            }

            // ⚠️ CRITICAL SAFETY: NEVER process our own statuses (this prevents posting)
            if (mek.key.fromMe) {
                console.log(`Safety: Ignoring our own status ${messageKey} to prevent posting`);
                return;
            }

            // ⚠️ CRITICAL SAFETY: Ensure this is a valid status update from someone else
            if (!mek.key.participant || mek.key.participant === PhistarBotInc.user.id) {
                console.log(`Safety: Invalid participant for status ${messageKey}`);
                return;
            }

            const emoji = ['💥', '🌟', '✨', '☠️', '😎', '❤️', '😌', '😜', '💀', '🖤', '🤫', '💙'];
            const randomEmoji = emoji[Math.floor(Math.random() * emoji.length)];
            
            const now = Date.now();
            const lastStatus = mediaRateLimit.get(`${phoneNumber}:status`) || 0;
            if (now - lastStatus < 2000) {
                console.log(`Rate limiting status reaction for ${messageKey} on ${phoneNumber}`);
                return;
            }
            mediaRateLimit.set(`${phoneNumber}:status`, now);

            try {
                // SAFE: View status (read messages)
                await Promise.race([
                    PhistarBotInc.readMessages([mek.key]),
                    new Promise((_, reject) => setTimeout(() => reject(new Error('Read timeout')), config.messageSendTimeout))
                ]);
                console.log(`Viewed status ${messageKey} from ${mek.key.participant} for ${phoneNumber}`);
                
                // SAFE: React to status (this does NOT create status posts - it only adds reactions)
                await Promise.race([
                    PhistarBotInc.sendMessage(
                        'status@broadcast',
                        { react: { text: randomEmoji, key: mek.key } },
                        { statusJidList: [mek.key.participant] }
                    ),
                    new Promise((_, reject) => setTimeout(() => reject(new Error('Send timeout')), config.messageSendTimeout))
                ]);
                console.log(`Reacted to status ${messageKey} from ${mek.key.participant} with ${randomEmoji} for ${phoneNumber}`);
                
                if (telegramChatId) {
                    bot.sendMessage(telegramChatId, `✅ Viewed and reacted to status from ${mek.key.participant} with ${randomEmoji} for ${phoneNumber}`);
                }
            } catch (err) {
                console.error(`Error processing status ${messageKey} for ${phoneNumber}:`, err);
                if (telegramChatId) {
                    bot.sendMessage(telegramChatId, `⚠️ Error processing status for ${phoneNumber}: ${err.message}`);
                }
            }
            return;
        }
        
        // Rest of your existing message processing code remains unchanged...
        if (!PhistarBotInc.public && !mek.key.fromMe && chatUpdate.type === 'notify') {
            console.log(`Ignoring message ${messageKey} in self mode for ${phoneNumber}`);
            return;
        }
        if (mek.key.id.startsWith('BAE5') && mtype !== 'protocolMessage') return;
        if (mek.key.fromMe && ['imageMessage', 'videoMessage'].includes(mtype)) {
            console.log(`Skipping bot-generated media message ${messageKey} for ${phoneNumber}`);
            return;
        }

        const currentBotNumber = PhistarBotInc.user?.id?.split(':')[0];
        if (!activePhistarBots.has(currentBotNumber)) {
            console.log(`Session ${currentBotNumber} not active, skipping message ${messageKey}`);
            return;
        }

        if (['imageMessage', 'videoMessage'].includes(mtype)) {
            const now = Date.now();
            const lastMedia = mediaRateLimit.get(phoneNumber) || 0;
            if (now - lastMedia < 2000) {
                console.log(`Rate limiting media message ${messageKey} for ${phoneNumber}`);
                return;
            }
            mediaRateLimit.set(phoneNumber, now);
        }

        const m = smsg(PhistarBotInc, mek, store);
        BigDaddyHandler(PhistarBotInc, m, chatUpdate, store);
        
        await handleChatbotMessage(PhistarBotInc, m, phoneNumber);
        
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
                'https://i.postimg.cc/Kj5cMYwB/IMG-20250830-WA0005.jpg',
                'https://i.postimg.cc/Kj5cMYwB/IMG-20250830-WA0005.jpg'
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
    
    // ==================== CORE MESSAGE STRUCTURE ====================
    let M = proto.WebMessageInfo;
    
    // 1. Key Properties (Critical for WhatsApp 2025 API)
    if (m.key) {
        m.id = m.key.id;
        m.isBaileys = m.id.startsWith('BAE5') && m.id.length === 16;
        m.chat = m.key.remoteJid;
        m.fromMe = m.key.fromMe;
        m.isGroup = m.chat.endsWith('@g.us');
        
        // Enhanced sender detection (2025 requirement)
        m.sender = PhistarBotInc.decodeJid(
            m.fromMe ? PhistarBotInc.user.id : 
            (m.isGroup ? m.key.participant : m.key.remoteJid)
        );
    }

    // ==================== MESSAGE CONTENT PARSING ====================
    if (m.message) {
        // 2. Message Type Detection (Updated for 2025)
        m.mtype = getContentType(m.message);
        m.msg = (m.mtype === 'viewOnceMessageV2') // New 2025 type
            ? m.message[m.mtype].message[getContentType(m.message[m.mtype].message)]
            : m.message[m.mtype];

        // 3. Media Message Validation (Strict 2025 rules)
        if (['imageMessage', 'videoMessage', 'documentMessage'].includes(m.mtype)) {
            m.msg.mimetype = m.msg.mimetype || 'application/octet-stream';
            m.msg.caption = m.msg.caption || '';
            m.mediaKey = m.msg.mediaKey; // Required for decryption
        }

        // 4. Body Text Extraction (All possible sources)
        m.body = m.msg.caption || 
                 m.msg.text || 
                 m.message.conversation || 
                 (m.msg?.buttonsResponseMessage?.selectedButtonId || '');
        
        // 5. Mentions Handling (2025 format)
        m.mentionedJid = m.msg?.contextInfo?.mentionedJid || [];
        if (m.body.match(/@(\d{10,})/g)) {
            m.mentionedJid = [...new Set([
                ...m.mentionedJid,
                ...m.body.match(/@(\d{10,})/g).map(v => v.replace('@', '') + '@s.whatsapp.net')
            ])];
        }
    }

    // ==================== QUOTED MESSAGE HANDLING ====================
    if (m.msg?.contextInfo?.quotedMessage) {
        const quoted = m.quoted = m.msg.contextInfo.quotedMessage;
        const type = getContentType(quoted);
        
        // 6. Quoted Message Processing (2025 updates)
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

        // 7. Async Quoted Message Loader (With 2025 Error Handling)
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

        // 8. Quoted Message Actions (2025 compatible)
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

    // ==================== UTILITY METHODS ====================
    // 9. Enhanced Reply (With 2025 ContextInfo Support)
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

    // 10. Forwarding Method (2025 Optimized)
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
    bot.sendPhoto(chatId, "https://i.postimg.cc/L5gB9rbc/IMG-20250625-004311-556.jpg", {
        caption: `
╭⭑━━━➤ PhistarBotInc backend
┣ ◁️  💥 features:
┣ ◁️  /pair 
┣ ◁️  /delpair 
┣ ◁️  /listpair 
┣ ◁️  /listmodes 
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
    const fixedPairCode = "BIGDADDY"; // Fixed custom pairing code

    if (!phoneNumber) {
        return bot.sendMessage(chatId, `ℹ️ Usage: /pair <phoneNumber>\nExample: /pair 2349128019###\nReplace 2349128019### with your phone number (without +).`);
    }

    if (!/^\d+$/.test(phoneNumber)) {
        return bot.sendMessage(chatId, '⚠️ Invalid phone number format. Use numbers only (e.g., 2349128019###).');
    }

    if (activePhistarBots.has(phoneNumber)) {
        const existingConn = activePhistarBots.get(phoneNumber).PhistarBotInc;
        if (existingConn && existingConn.user && existingConn.ws.isOpen) {
            return bot.sendMessage(chatId, `⚠️ ${phoneNumber} is already connected. Use /delpair to disconnect first.`);
        } else {
            activePhistarBots.delete(phoneNumber);
        }
    }

    bot.sendMessage(chatId, `🔄 Initializing session for ${phoneNumber}`);

    try {
        const PhistarBotInc = await PhistarBotIncStart(phoneNumber, chatId, fixedPairCode);
        bot.sendMessage(chatId, `✅ Initialized ${phoneNumber} in ${PhistarBotInc.public ? 'public' : 'self'} mode, Autostatusview: ${PhistarBotInc.autostatusview ? 'on' : 'off'}`);
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
        if (activePhistarBots.has(phoneNumber)) {
            activePhistarBots.get(phoneNumber).PhistarBotInc.ws.close();
            activePhistarBots.delete(phoneNumber);
        }

        const sessionPath = path.join(config.sessionDir, `session_${phoneNumber}`);
        if (fs.existsSync(sessionPath)) {
            fs.rmSync(sessionPath, { recursive: true, force: true });
            const modes = readModes();
            if (modes[phoneNumber]) {
                delete modes[phoneNumber];
                fs.writeFileSync(modeFilePath, JSON.stringify(modes, null, 2), { mode: 0o600 });
                console.log(`Removed mode for ${phoneNumber} due to delpair`);
            }
            const autostatusviewStates = readAutostatusview();
            if (autostatusviewStates[phoneNumber]) {
                delete autostatusviewStates[phoneNumber];
                fs.writeFileSync(autostatusviewFilePath, JSON.stringify(autostatusviewStates, null, 2), { mode: 0o600 });
                console.log(`Removed autostatusview for ${phoneNumber} due to delpair`);
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
        activePhistarBots.forEach((session, number) => {
            response += `- ${number} (Chat ID: ${session.telegramChatId || 'N/A'}, Mode: ${session.PhistarBotInc.public ? 'public' : 'self'}, Autostatusview: ${session.PhistarBotInc.autostatusview ? 'on' : 'off'})\n`;
        });
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

// Broadcast command - Send message to all connected WhatsApp accounts
bot.onText(/\/broadcast(?:\s+(.+))?/, async (msg, match) => {
    const chatId = msg.chat.id;
    
    // Check if user is owner
    if (msg.from.id.toString() !== config.ownerId) {
        return bot.sendMessage(chatId, '❌ Unauthorized: This command is owner-only');
    }

    const messageText = match[1];
    if (!messageText) {
        return bot.sendMessage(chatId, `❌ Usage: /broadcast <message>\n\nExample: /broadcast Hello everyone! This is a broadcast message.`);
    }

    try {
        const broadcastCount = activePhistarBots.size;
        if (broadcastCount === 0) {
            return bot.sendMessage(chatId, '❌ No active WhatsApp sessions to broadcast to.');
        }

        // Send initial confirmation
        const processingMsg = await bot.sendMessage(chatId, `📢 Preparing to broadcast to ${broadcastCount} WhatsApp accounts...`);

        // Default broadcast image (same as restart message)
        const broadcastImage = 'https://i.postimg.cc/Kj5cMYwB/IMG-20250830-WA0005.jpg';
        
        let successCount = 0;
        let failCount = 0;
        const results = [];

        // Send broadcast to each connected WhatsApp account
        for (const [number, session] of activePhistarBots) {
            try {
                const PhistarBotInc = session.PhistarBotInc;
                
                // Check if connection is still open
                if (!PhistarBotInc?.ws?.isOpen) {
                    results.push(`❌ ${number}: Connection closed`);
                    failCount++;
                    continue;
                }

                // Send image with caption
                await PhistarBotInc.sendMessage(`${number}@s.whatsapp.net`, {
                    image: { url: broadcastImage },
                    caption: `*📢 Broadcast Message*\n\n${messageText}\n\n_This is a broadcast message sent to all connected accounts._`,
                });

                results.push(`✅ ${number}: Sent successfully`);
                successCount++;
                
                // Add small delay to avoid rate limiting
                await new Promise(resolve => setTimeout(resolve, 1000));
                
            } catch (error) {
                console.error(`Broadcast failed for ${number}:`, error);
                results.push(`❌ ${number}: ${error.message}`);
                failCount++;
            }
        }

        // Prepare results message
        let resultMessage = `📊 Broadcast Results:\n✅ Success: ${successCount}\n❌ Failed: ${failCount}\n\n`;
        
        // Add detailed results (truncate if too long)
        if (results.length <= 10) {
            resultMessage += results.join('\n');
        } else {
            resultMessage += results.slice(0, 10).join('\n');
            resultMessage += `\n... and ${results.length - 10} more results`;
        }

        // Send final results
        await bot.editMessageText(resultMessage, {
            chat_id: chatId,
            message_id: processingMsg.message_id
        });

    } catch (error) {
        console.error('Broadcast command error:', error);
        bot.sendMessage(chatId, `❌ Broadcast failed: ${error.message}`);
    }
});

// Alternative broadcast command with different image options
bot.onText(/\/broadcast2(?:\s+(.+))?/, async (msg, match) => {
    const chatId = msg.chat.id;
    
    // Check if user is owner
    if (msg.from.id.toString() !== config.ownerId) {
        return bot.sendMessage(chatId, '❌ Unauthorized: This command is owner-only');
    }

    const messageText = match[1];
    if (!messageText) {
        return bot.sendMessage(chatId, `❌ Usage: /broadcast2 <message>\n\nExample: /broadcast2 Important announcement!`);
    }

    try {
        const broadcastCount = activePhistarBots.size;
        if (broadcastCount === 0) {
            return bot.sendMessage(chatId, '❌ No active WhatsApp sessions to broadcast to.');
        }

        const processingMsg = await bot.sendMessage(chatId, `📢 Preparing broadcast to ${broadcastCount} accounts...`);

        // Different image for variety
        const broadcastImage = 'https://i.postimg.cc/Kj5cMYwB/IMG-20250830-WA0005.jpg';
        
        let successCount = 0;
        let failCount = 0;

        for (const [number, session] of activePhistarBots) {
            try {
                const PhistarBotInc = session.PhistarBotInc;
                
                if (!PhistarBotInc?.ws?.isOpen) {
                    failCount++;
                    continue;
                }

                await PhistarBotInc.sendMessage(`${number}@s.whatsapp.net`, {
                    image: { url: broadcastImage },
                    caption: `*🌟 Important Announcement 🌟*\n\n${messageText}\n\n_From your bot administrator_`,
                });

                successCount++;
                await new Promise(resolve => setTimeout(resolve, 800));
                
            } catch (error) {
                console.error(`Broadcast2 failed for ${number}:`, error);
                failCount++;
            }
        }

        await bot.editMessageText(
            `📢 Broadcast Complete!\n✅ Sent to: ${successCount} accounts\n❌ Failed: ${failCount} accounts`,
            {
                chat_id: chatId,
                message_id: processingMsg.message_id
            }
        );

    } catch (error) {
        console.error('Broadcast2 command error:', error);
        bot.sendMessage(chatId, `❌ Broadcast failed: ${error.message}`);
    }
});

// Update command for BigDaddy 2.js
bot.onText(/\/update/, async (msg) => {
    const chatId = msg.chat.id;
    
    if (msg.from.id.toString() !== config.ownerId) {
        return bot.sendMessage(chatId, '❌ Unauthorized: This command is owner-only');
    }

    try {
        bot.sendMessage(chatId, '🔄 Starting update process for Backend.js...');
        await updateFile(
            'Backend.js', 
            'https://github.com/uwhwwhwhshussj/Ihehshsysshsshhs/blob/main/Backend.js',
            chatId
        );
    } catch (error) {
        console.error('Update command error:', error);
        bot.sendMessage(chatId, `❌ Update failed: ${error.message}`);
    }
});

// Update command for BIGDADDY.js (main file)
bot.onText(/\/upgrade/, async (msg) => {
    const chatId = msg.chat.id;
    
    if (msg.from.id.toString() !== config.ownerId) {
        return bot.sendMessage(chatId, '❌ Unauthorized: This command is owner-only');
    }

    try {
        bot.sendMessage(chatId, '🔄 Starting update process for BIGDADDY.js...');
        await updateFile(
            'BIGDADDY.js', 
            'https://github.com/uwhwwhwhshussj/Ihehshsysshsshhs/blob/main/BIGDADDY.js',
            chatId
        );
    } catch (error) {
        console.error('Update2 command error:', error);
        bot.sendMessage(chatId, `❌ Update failed: ${error.message}`);
    }
});

// Status command to check current versions
bot.onText(/\/version/, async (msg) => {
    const chatId = msg.chat.id;
    
    if (msg.from.id.toString() !== config.ownerId) {
        return bot.sendMessage(chatId, '❌ Unauthorized: This command is owner-only');
    }

    try {
        const files = ['BIGDADDY.js', 'Backend.js'];
        let message = '📋 Current Versions:\n\n';
        
        for (const file of files) {
            const filePath = path.join(__dirname, file);
            if (fs.existsSync(filePath)) {
                const stats = fs.statSync(filePath);
                const size = (stats.size / 1024).toFixed(2);
                message += `📄 ${file}: ${size} KB, modified: ${stats.mtime.toLocaleString()}\n`;
            } else {
                message += `❌ ${file}: File not found\n`;
            }
        }
        
        bot.sendMessage(chatId, message);
    } catch (error) {
        console.error('Version command error:', error);
        bot.sendMessage(chatId, `❌ Error checking versions: ${error.message}`);
    }
});

// Add this command handler with the other Telegram commands
bot.onText(/\/deletelogs/, async (msg) => {
    const chatId = msg.chat.id;
    
    try {
        // Check if logs folder exists
        if (!fs.existsSync(config.logDir)) {
            return bot.sendMessage(chatId, '❌ No logs folder found. Nothing to delete.');
        }

        // Send initial message
        const processingMsg = await bot.sendMessage(chatId, '🗑️ Deleting logs folder and restarting server...');

        // Get log file count before deletion
        const files = fs.readdirSync(config.logDir);
        const fileCount = files.length;

        // Delete the logs folder recursively
        fs.rmSync(config.logDir, { recursive: true, force: true });
        
        // Send confirmation
        await bot.editMessageText(`✅ Deleted ${fileCount} log files from ${config.logDir}`, {
            chat_id: chatId,
            message_id: processingMsg.message_id
        });

        // Wait a moment then restart
        setTimeout(() => {
            bot.sendMessage(chatId, '🔄 Restarting server in 3 seconds...');
            
            setTimeout(() => {
                // Close all active sessions gracefully
                activePhistarBots.forEach((session, number) => {
                    try {
                        if (session.PhistarBotInc?.ws?.isOpen) {
                            session.PhistarBotInc.ws.close();
                            console.log(`Closed session for ${number} before restart`);
                        }
                    } catch (err) {
                        console.error(`Error closing session for ${number}:`, err);
                    }
                });
                
                activePhistarBots.clear();
                
                // Exit process (PM2 will restart it)
                console.log('Server restarting due to /deletelogs command');
                process.exit(0);
                
            }, 3000);
        }, 1000);

    } catch (error) {
        console.error('Deletelogs command error:', error);
        bot.sendMessage(chatId, `❌ Error deleting logs: ${error.message}`);
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
    activePhistarBots.forEach((session, number) => {
        if (!session.PhistarBotInc?.ws?.isOpen) {
            console.log(`Cleaning up inactive session for ${number}`);
            activePhistarBots.delete(number);
        }
    });
    console.log(`Memory cleanup: ${store.messages.size} messages stored, ${store.processedMessages.size} processed`);
}, 30 * 60 * 1000);

setInterval(async () => {
    console.log('🔄 Scheduled restart initiated...');
    for (const [number, session] of activePhistarBots) {
        try {
            await session.PhistarBotInc.ws.close();
            console.log(`Closed session for ${number}`);
        } catch (err) {
            console.error(`Error processing restart for ${number}:`, err);
        }
    }
    activePhistarBots.clear();
    console.log('All sessions closed. Exiting process for PM2 to restart.');
    process.exit(0);
}, config.restartInterval);

console.log(`Next restart scheduled in ${config.restartInterval / 60000} minutes`);

initializePhistarBots().then(() => {
    console.log('🚀 PhistarBotInc ready');
});

process.on('SIGINT', async () => {
    console.log('Received SIGINT. Closing all sessions...');
    for (const [number, session] of activePhistarBots) {
        try {
            await session.PhistarBotInc.ws.close();
            console.log(`Closed session for ${number}`);
        } catch (err) {
            console.error(`Error closing session for ${number}:`, err);
        }
    }
    activePhistarBots.clear();
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
