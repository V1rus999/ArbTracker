const valrApi = require(`./valrApi`)

const startingZar = 100000;

async function main() {
  const btcZarOrderbook = await valrApi.getOrderbookForPair(valrApi.pairs.BTCZAR);
  const ethBtcOrderbook = await valrApi.getOrderbookForPair(valrApi.pairs.ETHBTC);
  const ethZarOrderbook = await valrApi.getOrderbookForPair(valrApi.pairs.ETHZAR);

  const btcZarFirstAskPrice = btcZarOrderbook.Asks[0].price;
  const ethBtcFirstAskPrice = ethBtcOrderbook.Asks[0].price;
  const ethZarFirstBidPrice = ethZarOrderbook.Bids[0].price;
  buyBtcFirstScenario(
    btcZarFirstAskPrice,
    ethBtcFirstAskPrice,
    ethZarFirstBidPrice
  );

  console.log("===========================");
  console.log("===========================");
  console.log("===========================");
  console.log("===========================");
  console.log("===========================");

  const ethZarFirstAskPrice = ethZarOrderbook.Asks[0].price;
  const ethBtcFirstBidPrice = ethBtcOrderbook.Bids[0].price;
  const btcZarFirstBidPrice = btcZarOrderbook.Bids[0].price;
  buyEthFirstScenario(
    ethZarFirstAskPrice,
    ethBtcFirstBidPrice,
    btcZarFirstBidPrice
  );
}

function buyBtcFirstScenario(
  btcZarFirstAskPrice,
  ethBtcFirstAskPrice,
  ethZarFirstBidPrice
) {
  console.log("buyBtcFistScenario Scenario");
  console.log(`Starting with R${startingZar}`);

  console.log(`Buy BTC with ZAR at ${btcZarFirstAskPrice}`);
  const btc = startingZar / btcZarFirstAskPrice;
  console.log(`Now have BTC ${btc}`);

  console.log("Buy ETH with BTC");
  const eth = btc / ethBtcFirstAskPrice;
  console.log(`Now have ETH ${eth}`);

  console.log(`Buy ZAR with ETH at ${ethZarFirstBidPrice}`);
  const endZar = ethZarFirstBidPrice * eth;
  console.log(`Now have ZAR ${endZar}`);
  console.log(`Arb is ${1 - startingZar / endZar}`);
}

function buyEthFirstScenario(
  ethZarFirstAskPrice,
  ethBtcFirstBidPrice,
  btcZarFirstBidPrice
) {
  console.log("buyEthFirstScenario Scenario");
  console.log(`Starting with R${startingZar}`);

  console.log(`Buy ETH with ZAR at ${ethZarFirstAskPrice}`);
  const eth = startingZar / ethZarFirstAskPrice;
  console.log(`Now have ETH ${eth}`);

  console.log("Buy BTC with ETH");
  const btc = eth * ethBtcFirstBidPrice;
  console.log(`Now have BTC ${btc}`);

  console.log(`Buy ZAR with BTC at ${btcZarFirstBidPrice}`);
  const endZar = btcZarFirstBidPrice * btc;
  console.log(`Now have ZAR ${endZar}`);
  console.log(`Arb is ${1 - startingZar / endZar}`);
}

main().then();
