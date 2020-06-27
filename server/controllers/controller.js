const plaid = require("plaid");
const moment = require("moment");

var PLAID_CLIENT_ID = "5e8286161a2865001293464b";
var PLAID_SECRET = "b6a7ae213b57b80ec7b50021ca744e";
var PLAID_PUBLIC_KEY = "7d8003fa1ced62bf10e92c084a7ac6";
var PLAID_ENV = "sandbox";

var ACCESS_TOKEN = null;
var PUBLIC_TOKEN = null;
var ITEM_ID = null;

// Initialize the Plaid client
var client = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  plaid.environments[PLAID_ENV],
  { version: "2019-05-29", clientApp: "Plaid Quickstart" }
);

const receivePublicToken = (req, res) => {
  // First, receive the public token and set it to a variable
  let PUBLIC_TOKEN = req.body.public_token;
  // Second, exchange the public token for an access token
  client.exchangePublicToken(PUBLIC_TOKEN, function (error, tokenResponse) {
    ACCESS_TOKEN = tokenResponse.access_token;
    ITEM_ID = tokenResponse.item_id;
    res.json({
      access_token: ACCESS_TOKEN,
      item_id: ITEM_ID,
    });
    console.log("access token below");
    console.log(ACCESS_TOKEN);
  });
};

const getTransactions = (req, res) => {
  // Pull transactions for the last 30 days
  let startDate = moment().subtract(30, "days").format("YYYY-MM-DD");
  let endDate = moment().format("YYYY-MM-DD");
  console.log("made it past variables");
  client.getTransactions(
    ACCESS_TOKEN,
    startDate,
    endDate,
    {
      count: 250,
      offset: 0,
    },
    function (error, transactionsResponse) {
      res.json({ transactions: transactionsResponse });
      // TRANSACTIONS LOGGED BELOW!
      // They will show up in the terminal that you are running nodemon in.
      console.log(transactionsResponse);
    }
  );
};

module.exports = {
  receivePublicToken,
  getTransactions,
};
