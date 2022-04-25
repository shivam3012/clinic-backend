require("dotenv").config();
const requestIP = require("request-ip");

const tracker_ip1 = [
  "103.21.244.0/22",
  "103.22.200.0/22",
  "103.31.4.0/22",
  "104.16.0.0/13",
  "104.24.0.0/14",
  "108.162.192.0/18",
  "131.0.72.0/22",
  "141.101.64.0/18",
  "162.158.0.0/15",
  "172.64.0.0/13",
  "173.245.48.0/20",
  "188.114.96.0/20",
  "190.93.240.0/20",
  "197.234.240.0/22",
  "198.41.128.0/17"]
const tracker_ip2 = process.env.TRACKER_IP2;
const tracker_ip3 = process.env.TRACKER_IP3;

const service_auth = (req, res, next) => {
  let request_ip = requestIP.getClientIp(req);

  if (
    tracker_ip1.includes(request_ip)
  ) {
    next();
  } else
    return res.status(400).json({
      status: "failed",
      data: "you are not supposed to call this api endpoint",
    });
};

module.exports = service_auth;
