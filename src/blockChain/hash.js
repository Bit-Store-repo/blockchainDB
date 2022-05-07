const crypto = require('crypto');
const hash = (...inp) => {
    const hash_function = crypto.createHash('sha256');
    hash_function.update(inp.sort().join(' '));
    return hash_function.digest('hex');
};

module.exports = hash;