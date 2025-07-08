export const formatSubZeroNumber = (num) => {
  if (num >= 1) return `$${num.toFixed(2)}`;
  
  const str = num.toString();
  const parts = str.split('.');
  if (parts.length < 2) return `$${str}`;
  
  const decimals = parts[1];
  let zeroCount = 0;
  
  for (let i = 0; i < decimals.length; i++) {
    if (decimals[i] === '0') {
      zeroCount++;
    } else {
      break;
    }
  }
  
  if (zeroCount >= 3) {
    const significantDigits = decimals.substring(zeroCount, zeroCount + 3);
    return (
      <span className="font-mono">
        $0.0<sub className="text-xs text-gray-400">{zeroCount}</sub>
        {significantDigits}
      </span>
    );
  }
  
  return `$${num.toFixed(6)}`;
};

export const formatPrice = (price) => {
  if (price < 0.001) {
    return formatSubZeroNumber(price);
  }
  
  if (price >= 1000000) {
    return `$${(price / 1000000).toFixed(2)}M`;
  }
  
  if (price >= 1000) {
    return `$${price.toLocaleString()}`;
  }
  
  return `$${price.toFixed(2)}`;
};