const Web3 = require("web3");
const config = require("../config/config");

module.exports = {

  signData: async (req, res, next) => {
    try {
      let ABI, ADDRESS, WEB3;
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

        const deadline = Date.now() + (1000 * 60 * 10);

        let encodeData = web3_eth.eth.abi.encodeParameters(["address", "address", "uint256"], [
          ADDRESS,
          account,
          count
        ]);

        let hash = web3_eth.utils.keccak256(encodeData);

        let signedData = web3_eth.eth.accounts.sign(hash, config.PRIVATE_KEY);

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
