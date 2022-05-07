const bcrypt = require('bcrypt');
const saltRounds = 10;

const hash = (...inp) => {
    const text = inp.sort().join(' ');
    bcrypt.hash(text, saltRounds, function (err, hash) {
        if (err) {
            console.log(err);
        }
        else {
            return hash;
        }
    });
};

module.exports = hash;