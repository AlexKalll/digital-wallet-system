const logTransaction = (type) => {
  return (currency) => {
    return (amount) => {
      return (description = "") => {
        return () => {
          const timestamp = new Date().toISOString();
          console.log(`[${timestamp}] ${type}: ${amount} ${currency} — ${description}`);
        };
      };
    };
  };
};

module.exports = { logTransaction };