const transactionCalculator = ({ productValue, storeFee }) => {
  let valueCalculating = productValue;

  const valuePayGateway = valueCalculating * 0.01;
  valueCalculating -= valuePayGateway;

  const valueMarketplace = valueCalculating * ((storeFee - 1) / 100);
  valueCalculating -= valueMarketplace;

  const valueStore = valueCalculating;

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
