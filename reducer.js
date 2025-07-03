function stateReducer(state, event) {
  switch (event.type) {
    case "DEPOSIT": {
      const { currency, amount, description = "" } = event.payload;
      const oldBalance = state.balances[currency] || 0;

      const newState = structuredClone(state);

      newState.balances[currency] = oldBalance + amount;

      const transactionRecord = {
        type: "DEPOSIT",
        currency,
        amount,
        description,
        timestamp: Date.now()
      };

      newState.transactionHistory.push(transactionRecord);
      newState.historyStack.push(structuredClone(state)); // deep snapshot
      newState.futureStack = [];

      return newState;
    }

    case "WITHDRAW": {
      const { currency, amount, description = "" } = event.payload;
      const currentBalance = state.balances[currency] || 0;

      if (amount > currentBalance) {
        console.warn("Insufficient funds");
        return state;
      }

      const newState = structuredClone(state);
      newState.balances[currency] = currentBalance - amount;

      const transactionRecord = {
        type: "WITHDRAW",
        currency,
        amount,
        description,
        timestamp: Date.now()
      };

      newState.transactionHistory.push(transactionRecord);
      newState.historyStack.push(structuredClone(state));
      newState.futureStack = [];

      return newState;
    }

    case "CONVERT_CURRENCY": {
      const { fromCurrency, toCurrency, amount, rate, description = "" } = event.payload;
      const fromBalance = state.balances[fromCurrency] || 0;

      if (amount > fromBalance) {
        console.warn("Insufficient funds for conversion");
        return state;
      }

      const convertedAmount = amount * rate;

      const newState = structuredClone(state);
      newState.balances[fromCurrency] -= amount;
      newState.balances[toCurrency] = (newState.balances[toCurrency] || 0) + convertedAmount;

      const transactionRecord = {
        type: "CONVERT_CURRENCY",
        fromCurrency,
        toCurrency,
        amount,
        convertedAmount,
        rate,
        description,
        timestamp: Date.now()
      };

      newState.transactionHistory.push(transactionRecord);
      newState.historyStack.push(structuredClone(state));
      newState.futureStack = [];

      return newState;
    }

    default:
      return state;
  }
}

module.exports = { stateReducer };