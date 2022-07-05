export const currencyFormat = (price) => {
  return price.toLocaleString("en-NG", {
    style: "currency",
    currency: "NGN",
  });
};

export const fullName = (firstName, lastName) => {
  return `${firstName} ${lastName}`;
};
