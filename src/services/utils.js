const kebabify = text => text.toLowerCase().split(' ').join('-');

const formatCurrency = usd => {
  let currency = "$ ";
  const m = usd % 1e6;
  const t = usd % 1e3;
  if (m !== usd) return currency += `${usd / 1e6} M`;
  if (t !== usd) return currency += `${usd / 1e3} K`;
  return currency += usd;
}

export default { kebabify, formatCurrency }