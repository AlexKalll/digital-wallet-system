const logTransaction = (type) => (currency) => (amount) => (description = "") => () => {
  const timestamp = new Date().toISOString();

  console.log(`[${timestamp}] ${type}: ${amount} ${currency} — ${description}`);
  
  return logTransaction;
};

module.exports = { logTransaction };