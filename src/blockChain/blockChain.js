const Block = require('./block.js');
const gen_hash = require('./hash.js');

// persistant data
const storage = require('node-persist');

class BlockChain {
    constructor() {
        this.chain = [Block.genesis()];
    }

    addBlock = async ({ data, key }) => {
        const newBlock = Block.mine({ last_block: this.chain[this.chain.length - 1], data, key });
        this.chain.push(newBlock);
        await storage.init();
        await storage.setItem('data', this.chain);
    };

    static isValid = (chain) => {
        // to check if it starts with genesis block
        if (JSON.stringify(chain[0]) != JSON.stringify(Block.genesis())) {
            return false;
        }
        // to check if the blocks are invalid
        for (let i = 1; i < chain.length; i++) {
            if (chain[i].prev_hash !== chain[i - 1].hash) {
                return false
            }
            let tempHash = gen_hash(chain[i].prev_hash, chain[i].data, chain[i].time_stamp, chain[i].nonce, chain[i].key);
            if (tempHash !== chain[i].hash) {
                return false
            }
        }
        return true;
    };

    replaceChain = async (newChain) => {
        if (newChain.length <= this.chain.length) {
            console.log('the incoming chain must be longer');
            return;
        };
        if (BlockChain.isValid(newChain)) {
            this.chain = newChain;
            console.log('replace successful');
            await storage.init();
            await storage.setItem('data', newChain);
            return;
        }
        else {
            console.log('the incoming chain is invalid');
            return;
        }
    };
}

module.exports = BlockChain;