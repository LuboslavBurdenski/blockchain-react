const SHA256 = require("crypto-js/sha256");
class CryptoBlock {
    constructor(timestamp, data, precedingHash = " ") {
        this.blockIndex = 0;
        this.timestamp = timestamp;
        this.data = data;
        this.precedingHash = precedingHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(blockIndex) {
        return SHA256(blockIndex + this.precedingHash + this.timestamp + JSON.stringify(this.data) + this.nonce)
            .toString();
    }

    proofOfWork(difficulty, blockIndex) {
        this.blockIndex = blockIndex;
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        return this.nonce;
    }
}

class CryptoBlockchain {
    constructor() {
        this.blockchain = [this.startGenesisBlock()];
        this.difficulty = 4;
    }
    startGenesisBlock() {
        return new CryptoBlock(new Date(), 0, "0", "0");
    }
    obtainLatestBlock() {
        return this.blockchain[this.blockchain.length - 1];
    }
    addNewBlock(newBlock) {
        if (!newBlock.data.quantity) newBlock.data.quantity = 0;
        newBlock.precedingHash = this.obtainLatestBlock().hash;
        newBlock.proofOfWork(this.difficulty, this.blockchain.length);
        this.blockchain.push(newBlock);
    }
    checkChainValidity() {
        for (let i = 1; i < this.blockchain.length; i++) {
            const currentBlock = this.blockchain[i];
            const precedingBlock = this.blockchain[i - 1];
            const checkCurrentHash = currentBlock.calculateHash();
            if (currentBlock.hash !== checkCurrentHash) { return [i, checkCurrentHash] }
            if (currentBlock.precedingHash !== precedingBlock.hash) { return [i, precedingBlock.hash] }
        }
        return true;
    }
    mine(blockToMine, index) {
        let newBlock = new CryptoBlock(new Date(), {
            sender: blockToMine.data.sender,
            recipient: blockToMine.data.recipient,
            quantity: blockToMine.data.quantity
        });

        newBlock.precedingHash = this.blockchain[index - 1].hash;
        newBlock.proofOfWork(this.difficulty, index);
        this.blockchain[index] = newBlock;

        return newBlock;
    }

}
let demoCoin = new CryptoBlockchain();

module.exports = {
    demoCoin,
    CryptoBlock
};