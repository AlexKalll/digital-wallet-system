function stateReducer(state, event) {
  switch (event.type) {
    case "DEPOSIT": {
      const { currency, amount, description = "" } = event.payload;
      const oldBalance = state.balances[currency] || 0;

      const newBalances = {
        ...state.balances,
        [currency]: oldBalance + amount
      };

      const transactionRecord = {
        type: "DEPOSIT",
        currency,
        amount,
        description,
        timestamp: Date.now()
      };

      return {
        ...state,
        balances: newBalances,
        transactionHistory: [...state.transactionHistory, transactionRecord],
        historyStack: [...state.historyStack, state],
        futureStack: []
      };
    }

    case "WITHDRAW": {
      const { currency, amount, description = "" } = event.payload;
      const currentBalance = state.balances[currency] || 0;

      if (amount > currentBalance) {
        console.warn("Insufficient funds");
        return state;
      }

      const newBalances = {
        ...state.balances,
        [currency]: currentBalance - amount
      };

      const transactionRecord = {
        type: "WITHDRAW",
        currency,
        amount,
        description,
        timestamp: Date.now()
      };

      return {
        ...state,
        balances: newBalances,
        transactionHistory: [...state.transactionHistory, transactionRecord],
        historyStack: [...state.historyStack, state],
        futureStack: []
      };
    }

    case "CONVERT_CURRENCY": {
      const { fromCurrency, toCurrency, amount, rate, description = "" } = event.payload;
      const fromBalance = state.balances[fromCurrency] || 0;

      if (amount > fromBalance) {
        console.warn("Insufficient funds for conversion");
        return state;
      }

      const convertedAmount = amount * rate;

      const newBalances = {
        ...state.balances,
        [fromCurrency]: fromBalance - amount,
        [toCurrency]: (state.balances[toCurrency] || 0) + convertedAmount
      };

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

      return {
        ...state,
        balances: newBalances,
        transactionHistory: [...state.transactionHistory, transactionRecord],
        historyStack: [...state.historyStack, state],
        futureStack: []
      };
    }

    case "TRANSFER_FUNDS": {
      const { fromCurrency, toCurrency, amount, rate, description = "" } = event.payload;
      const fromBalance = state.balances[fromCurrency] || 0;

      if (amount > fromBalance) {
        console.warn("Insufficient funds for transfer");
        return state;
      }

      const convertedAmount = amount * rate;

      const newBalances = {
        ...state.balances,
        [fromCurrency]: fromBalance - amount,
        [toCurrency]: (state.balances[toCurrency] || 0) + convertedAmount
      };

      const transactionRecord = {
        type: "TRANSFER_FUNDS",
        fromCurrency,
        toCurrency,
        amount,
        convertedAmount,
        rate,
        description,
        timestamp: Date.now()
      };

      return {
        ...state,
        balances: newBalances,
        transactionHistory: [...state.transactionHistory, transactionRecord],
        historyStack: [...state.historyStack, state],
        futureStack: []
      };
    }

    default:
      return state;
  }
}

module.exports = { stateReducer };