// appState.js
const appState = {
  balances: {
    ETB: 1000,
    USD: 200,
    EUR: 100
  },
  transactionHistory: [],
  preferences: {
    primaryCurrency: "ETB"
  },
  historyStack: [],
  futureStack: []
};

module.exports = { appState };