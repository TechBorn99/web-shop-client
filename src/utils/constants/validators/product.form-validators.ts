const pointNumberPattern = '^(-?)(0|([1-9][0-9]*))(\\.[0-9]+)?$';
const nanMessage = 'Not a valid number!';
const minPriceValueMessage = 'Invalid price value!';
const minPriceValue = 0;

export const ProductFilterValidators = {
  price: [
    {
      pattern: pointNumberPattern,
      message: nanMessage,
    },
    {
      minValue: minPriceValue,
      message: minPriceValueMessage,
    },
  ],
};

export const ProductSortersValidators = {};
