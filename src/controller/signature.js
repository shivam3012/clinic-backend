const Web3 = require("web3");
const config = require("../config/config");
const web3 = new Web3(new Web3.providers.HttpProvider(config.ETH_HTTP));

module.exports = {

  signData: async (req, res, next) => {
    try {
      let chainId = req.body.chainId;
      let account = req.body.account.toLowerCase();
      let count = req.body.count;
      if (chainId && account && count) {
        if (config.CHAIN_ID.indexOf(chainId), chainId == -1) {
          res.status(400).json(`Invalid Chain id`);
        }
        let whitelistArray = config.WHITELIST.map(el => el.toLowerCase());
        if (whitelistArray.includes(account) == false) {
          return res.status(400).json(`Not whitelisted`);
        }

        //2 hours added
        const deadline = Date.now() + (2 * 60 * 60 * 1000);

        let encodeData = web3.eth.abi.encodeParameters(["address", "address", "uint256", "uint256"], [
          config.NFT_ADDRESS,
          account,
          count,
          deadline
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
        res.status(400).json(`Invalid input data`);
      }
    } catch (e) {
      console.log(e)
      res.status(500).json(`Oops! Something went wrong`);
    }
  },

}
