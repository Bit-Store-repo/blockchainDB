const { GENESIS_BLOCK } = require("./config");
const gen_hash = require('./hash');

class Block {
    constructor({ data, prev_hash, hash, time_stamp, nonce, key }) {
        this.data = data;
        this.prev_hash = prev_hash;
        this.time_stamp = time_stamp;
        this.hash = hash;
        this.nonce = nonce;
        this.key = key;
    }

    static genesis = () => {
        return new this(GENESIS_BLOCK);
    }

    static mine = ({ last_block, data, key }) => {
        const time_stamp = Date.now();
        const prev_hash = last_block.hash;
        let nonce = 0;
        let hash;
        // computation logic
        while (true) {
            hash = gen_hash(prev_hash, data, time_stamp, nonce, key);
            if (hash.substring(0, 3) === '0'.repeat(3)) {
                break
            }
            else {
                nonce += 1;
            }
        }

        return new this({
            data, time_stamp, prev_hash, nonce, hash, key
        });
    };
}

module.exports = Block;