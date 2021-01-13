const valrApi = require(`./valrApi`);

async function main() {
  const orderBook = await valrApi.getOrderbookForPair(valrApi.pairs.BTCZAR);
  const asks = orderBook.Asks;

  const initialValue = 100000;
  fillOrder(asks, initialValue);
}

function fillOrder(asks, initialValue) {
  const orders = [];
  var valueLeft = initialValue;
  for (const ask of asks) {
    const price = parseFloat(ask.price);
    const quantity = parseFloat(ask.quantity);
    var quantityTaken = 0;

    const bucketValue = price * quantity;
    // console.log(`Price ${price} Quantity ${quantity} Bucketvalue ${bucketValue}`)
    if (bucketValue <= valueLeft) {
      valueLeft -= bucketValue;
      quantityTaken = quantity;
    } else {
      quantityTaken = valueLeft / ask.price;
      valueLeft = 0;
    }

    orders.push({
      quantity: quantityTaken,
      price: price,
    });

    if (valueLeft == 0) {
      break;
    }
  }

  const quantityBought = orders.reduce(
    (prevValue, { quantity }) => prevValue + quantity,
    0
  );

  console.log(orders);

  console.log(
    `You will buy ${quantityBought} BTC at an average price of ${
      initialValue / quantityBought
    }`
  );
}

main().then();
