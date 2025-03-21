
const config = require('../config.json');

const initializeGlobals = () => {
    global.owner = config.botSettings.ownerNumber ? [config.botSettings.ownerNumber] : [];
    global.prefix = config.botSettings.prefix || '+';
    global.botName = config.botSettings.botName || 'Spectra';
    global.commands = new Map();
    global.events = new Map();
    global.cc = {};
    global.adminList = config.adminOnly.adminNumbers || [];
    global.whiteList = config.whiteListMode.allowedNumbers || [];
};

module.exports = { initializeGlobals, config };

