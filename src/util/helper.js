const transactionCalculator = ({ productValue, storeFee }) => {
  let valueCalculating = productValue;

  const valuePayGateway = Math.round(valueCalculating * 0.01);
  valueCalculating -= valuePayGateway;

  const valueMarketplace = Math.round(productValue * ((storeFee - 1) / 100));
  valueCalculating -= valueMarketplace;

  const valueStore = valueCalculating;
  console.log({ productValue, valueCalculating, valuePayGateway, valueMarketplace, valueStore })

  return {
    valueFull: productValue,
    valueStore,
    valueMarketplace,
    valuePayGateway,
  };
};

module.exports = {
  transactionCalculator,
};
