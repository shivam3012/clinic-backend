const Web3 = require("web3");
const config = require("../config/config");
const web3 = new Web3(new Web3.providers.HttpProvider(config.ETH_HTTP));

module.exports = {

  signData: async (req, res, next) => {
    try {
      let ADDRESS;
      let chainId = req.body.chainId;
      let account = req.body.account;
      let count = req.body.count;
      if (chainId && account && count) {
        if (config.CHAIN_ID.indexOf(chainId), chainId == -1) {
          res.status(500).json(`Invalid Chain id`);
        }

        if (config.WHITELIST.includes(account) == false) {
          return res.status(500).json(`Invalid data`);
        }

        //2 hours added
        const deadline = Date.now() + (2 * 60 * 60 * 1000);

        let encodeData = web3.eth.abi.encodeParameters(["address", "address", "uint256", "uint256"], [
          ADDRESS,
          account,
          count
        ]);

        let hash = web3.utils.keccak256(encodeData);

        let signedData = web3.eth.accounts.sign(hash, config.PRIVATE_KEY);

        // console.log(encodeData);

        // 
        // let recover = web3.eth.accounts.recover(encodeData, signedData.v, signedData.r, signedData.s)
        // console.log(recover)

        // signedData["hash"] = hash;
        signedData["deadline"] = deadline;

        // console.log(signedData);
        res.status(200).json(signedData);
      } else {
        res.status(500).json(`Invalid input data`);
      }
    } catch (e) {
      console.log(e)
      res.status(500).json(`Oops! Something went wrong`);
    }
  },

}
