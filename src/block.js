const { GENESIS_BLOCK } = require("./config");

class Block {
    constructor({ data, prev_hash, hash, time_stamp }) {
        this.data = data;
        this.prev_hash = prev_hash;
        this.time_stamp = time_stamp;
        this.hash = hash;
    }

    static genesis = () => {
        return new this(GENESIS_BLOCK);
    }

    static mine = ({ last_block, data }) => {
        const time_stamp = Date.now();
        const prev_hash = last_block.hash;
        let { difficulty } = last_block;
        let nonce = 0;

        let hash;

        // computation logic
        while (true) {
            // difficulty = Block.adjustRate({ originalBlock: last_block, time_stamp: time_stamp });
            hash = gen_hash(prev_hash, data, time_stamp, nonce, difficulty);
            if (hash.substring(0, difficulty) === '0'.repeat(difficulty)) {
                break
            }
            else {
                nonce += 1;
            }
        }

        return new this({
            data, time_stamp, prev_hash, difficulty, nonce, hash
        });
    };
}