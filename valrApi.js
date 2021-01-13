const axios = require("axios").default;

module.exports.pairs = {
  BTCZAR: "BTCZAR",
  ETHBTC: "ETHBTC",
  ETHZAR: "ETHZAR",
};

module.exports.getOrderbookForPair = async (pair) => {
  try {
    const response = await axios.get(
      `https://api.valr.com/v1/public/${pair}/orderbook`
    );
    return response.data;
  } catch (error) {
    console.error("getZarBtcPrice");
    console.error(error);
    return null;
  }
};
