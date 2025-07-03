const { appState } = require("../coreState");
const { dispatchAction } = require("../dispatch");

describe("dispatchAction", () => {
  it("updates state and logs when logger is provided", () => {
    const events = [{
      type: "DEPOSIT",
      payload: { currency: "ETB", amount: 200, description: "Bonus" }
    }, {
      type: "WITHDRAW",
      payload: { currency: "ETB", amount: 100, description: "Bill payment" }
    }, {
      type: "CONVERT_CURRENCY",
      payload: {
        fromCurrency: "ETB",
        toCurrency: "USD",
        amount: 150,
        rate: 0.006
      }
    }];

    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      const newState = dispatchAction(event);

      expect(newState.transactionHistory).toHaveLength(1);
      // console.log(`Old State length is: ${appState.transactionHistory.length}`)
    }
  });
});