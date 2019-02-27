const path = require("path");
const cjson = require("cjson");
const TX = require("ethereumjs-tx");
const Web3 = require("web3");
const provider = "https://ropsten.infura.io/v3/5cfea0d474d94d178f030574a25eee02";
const web3 = new Web3(provider);
const contractAddress = "0x7d7b727646d3092b923cbbde68472b6e76b8b909";
const abi = cjson.load(path.resolve(__dirname, "../../abi.json"));
const contract = new web3.eth.Contract(abi, contractAddress);
const etherscanlink = 'https://ropsten.etherscan.io/tx/';
const privateKey = new Buffer("1575FB785EFF345526CF61FEA35CFE55C866207501E423F0E025526DED1C6BAA","hex");

exports.checkBalance = async function (req, res){
    let address = req.params.address;
    console.log("I am in tokenFunc", address);

    if(address) {
        const balance = await contract.methods.balanceOf(address).call();
        console.log("I am checking balance");
        return res.send({"Your Token Balance is " : balance});
    }
    return res.send("Nothing");
}

exports.transfer = async function (req, res) {
    let to = req.body.to;
    let tokens = Number(req.body.tokens);
    console.log("In tranfer function");

    if(to && tokens>0){
        console.log("Tranferring");
        const rawtx = contract.methods.transfer(to, tokens);
        return res.send(await sendSignTransaction(rawtx));
    }
    else {
        return res.send("Wallet address or no. of tokens missing");
    }
}

async function sendSignTransaction(rawTx){
    if(rawTx){
        console.log("rawtx",rawTx);
        const txCount = await web3.eth.getTransactionCount('0xeB68FD34FE20C785b98848D7e78fB2Fb4bC747a5', 'pending');
        const txABI = await rawTx.encodeABI();
        console.log("txCount",txCount)

        // const gas = await rawTx.estimateGas();
        // console.log("txCount",gas)

        let gasPrice = await web3.eth.getGasPrice();
        gasPrice = Number(gasPrice);

        gasPrice =gasPrice * 2;
        // const gasLimit = gas * 20;
        console.log("txABI",txABI);
        // console.log("gas", gas ,":", "gasPrice" , gasPrice);

        const txData = {
            nonce : web3.utils.toHex(txCount),
            gasLimit : web3.utils.toHex(2100000),
            gasPrice : web3.utils.toHex(gasPrice),
            to : contractAddress,
            data : txABI,
        }
        console.log("txdata",txData);
        const tx = new TX(txData);
        tx.sign(privateKey);
        console.log("tx", tx);
        return new Promise((resolve, reject) => {
            web3.eth.sendSignedTransaction('0x'+ tx.serialize().toString('hex'))
                .once('transactionHash', (hash) => {
                const result = {
                    'status' : 'sent',
                    'url' : etherscanlink + hash,
                    'message' : "click the below URL to verify status of transaction"
                    }
                    console.log("result", result);
                    resolve(result);
                })
        .then(out => {
            console.log(out);
        })
        .catch(err => {reject(err);});
    })
    }
    else {
     return console.error();
    }
} 