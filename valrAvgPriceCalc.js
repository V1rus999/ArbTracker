const valrApi = require(`./valrApi`);

async function main() {
  const orderBook = await valrApi.getOrderbookForPair(valrApi.pairs.BTCZAR);
  const asks = orderBook.Asks;

  const initialValue = 100000;
  const buyResult = fillOrder(asks, initialValue);
  console.log(
    `You will buy ${buyResult.quantityBought} BTC at an average price of ${buyResult.averagePrice}`
  );
}

function fillOrder(allOrders, initialValue) {
  const orders = [];
  var valueLeft = initialValue;
  for (const order of allOrders) {
    const price = parseFloat(order.price);
    const quantity = parseFloat(order.quantity);
    var quantityTaken = 0;

    const bucketValue = price * quantity;
    // console.log(`Price ${price} Quantity ${quantity} Bucketvalue ${bucketValue}`)
    if (bucketValue <= valueLeft) {
      valueLeft -= bucketValue;
      quantityTaken = quantity;
    } else {
      quantityTaken = valueLeft / order.price;
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

  //   console.log(orders);

  return {
    quantityBought: quantityBought,
    averagePrice: initialValue / quantityBought,
  };
}

main().then();
