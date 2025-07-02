const { stateReducer } = require("../reducer");
const { appState } = require("../coreState");

describe("stateReducer", () => {
  it("handles DEPOSIT action immutably", () => {
    const event = {
      type: "DEPOSIT",
      payload: { currency: "USD", amount: 100 }
    };

    const newState = stateReducer(appState, event);

    expect(newState.balances.USD).toBe(300);
    expect(newState).not.toBe(appState);
    expect(newState.transactionHistory).toHaveLength(1);
  });

  it("prevents overdraft on WITHDRAW", () => {
    const event = {
      type: "WITHDRAW",
      payload: { currency: "USD", amount: 9999 }
    };

    const newState = stateReducer(appState, event);

    expect(newState).toEqual(appState);
  });

  it("handles CONVERT_CURRENCY properly", () => {
    const event = {
      type: "CONVERT_CURRENCY",
      payload: {
        fromCurrency: "ETB",
        toCurrency: "USD",
        amount: 100,
        rate: 0.02
      }
    };

    const newState = stateReducer(appState, event);

    expect(newState.balances.ETB).toBe(900);
    expect(newState.balances.USD).toBe(202);
  });
});