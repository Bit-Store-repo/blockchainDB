const { GENESIS_BLOCK } = require("./config");
const gen_hash = require('./hash');

class Block {
    constructor({ data, prev_hash, hash, time_stamp, nonce }) {
        this.data = data;
        this.prev_hash = prev_hash;
        this.time_stamp = time_stamp;
        this.hash = hash;
        this.nonce = nonce;
    }

    static genesis = () => {
        return new this(GENESIS_BLOCK);
    }

    static mine = ({ last_block, data }) => {
        const time_stamp = Date.now();
        const prev_hash = last_block.hash;
        const nonce = 0;
        // computation logic
        while (true) {
            const hash = gen_hash(prev_hash, data, time_stamp, nonce);
            if (hash.substring(0, 3) === '0'.repeat(3)) {
                break
            }
            else {
                nonce += 1;
            }
        }

        return new this({
            data, time_stamp, prev_hash, nonce, hash
        });
    };
}