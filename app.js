const express = require('express');
const app = express();
const PORT = 3000 || process.env.PORT;

// requiring the blockchain functionalities
const funcRouter = require('./src/functionalities/blockFunctions');
app.use('/chain', funcRouter);

app.listen(PORT, async () => {
    console.log(`app is running on ${PORT}`);
});