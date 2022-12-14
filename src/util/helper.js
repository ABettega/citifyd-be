/* eslint-disable no-restricted-globals */
const transactionCalculator = ({ productValue, storeFee }) => {
  let valueCalculating = productValue;

  const valuePayGateway = Math.round(valueCalculating * 0.01);
  valueCalculating -= valuePayGateway;

  const valueMarketplace = Math.round(productValue * ((storeFee - 1) / 100));
  valueCalculating -= valueMarketplace;

  const valueStore = valueCalculating;

  return {
    valueFull: productValue,
    valueStore,
    valueMarketplace,
    valuePayGateway,
  };
};

const checkForInvalidInteger = (parameter) => isNaN(parameter)
    || parameter % 1 > 0
    || typeof (parameter) !== 'number';

module.exports = {
  transactionCalculator,
  checkForInvalidInteger,
};
