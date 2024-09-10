require("dotenv").config();

const Web3 = require("web3");
const web3 = new Web3(process.env.INFURA_URL);

async function getBalance(wallet) {
  try {
    const balance = await web3.eth.getBalance(wallet);
    const format = web3.utils.fromWei(balance);
    console.log(format);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

async function transfer(to, value) {

  const nonce = await web3.eth.getTransactionCount(process.env.WALLET_ADDRESS, "latest");
  console.log('nonce', nonce);

  const transaction = {
    to,
    value,
    gas: 21000,
    nonce
  };

  const signedTx = await web3.eth.accounts.signTransaction(transaction, process.env.PRIVATE_KEY);
  const tx = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  console.log(tx.transactionHash);
  
}

// getBalance("0xb267E52De81043E1b14691bC1f2EEF8C059DAba5");
// getBalance("0x7f1b7d55897707aaf3ec92bba52a2e4566b8f79a")
// getBalance("0x8bb8fd043097a6e4acb57a9394a17dc5958fa1ac")

transfer("contadestino", web3.utils.toWei("0.01", "ether"));