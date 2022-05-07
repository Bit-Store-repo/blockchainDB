const BlockChain = require('../blockChain/blockChain');
const blockChain = new BlockChain();

const express = require('express');
const router = express();

// persistant data
const storage = require('node-persist');

const callOnStart = async () => {
    await storage.init();
    const resData = await storage.getItem('data');
    if (typeof resData === 'undefined') {
        console.log('starting first time');
    }
    else {
        blockChain.replaceChain(resData);
        console.log('copying data');
    }
}

callOnStart();

const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
    try {
        res.status(200).json(blockChain.chain);
    }
    catch (error) {
        console.log(error);
        res.status(403).json({ message: "server error" });
    }
});

router.get('/:key', (req, res) => {
    try {
        const chain = blockChain.chain;
        for (let i = chain.length; i > 1; i--) {
            if (chain[i - 1].key == req.params.key) {
                res.status(200).json(chain[i - 1]);
                return;
            }
        }
        res.status(403).json({ message: "not found" });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(403).json({ message: "server error" });
    }
});



router.post('/add', (req, res) => {
    try {
        blockChain.addBlock({ data: req.body.data, key: req.body.key });
        res.status(200).json(blockChain.chain);
    }
    catch (error) {
        console.log(error);
        res.status(403).json({ message: "server error" });
    }
});

module.exports = router;