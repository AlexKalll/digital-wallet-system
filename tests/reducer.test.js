const { stateReducer } = require("../reducer");
const { appState } = require("../coreState");

describe("stateReducer", () => {
  it("handles DEPOSIT action with immutable state", () => {
    const event = {
      type: "DEPOSIT",
      payload: { currency: "USD", amount: 100, description: "Savings" }
    };

    const newState = stateReducer(appState, event);

    expect(newState.balances.USD).toBe(300);
    expect(newState).not.toBe(appState);
    expect(newState.transactionHistory).toHaveLength(1);
  });

  it("prevents WITHDRAWAL if the amount is greater than the balance", () => {
    const event = {
      type: "WITHDRAW",
      payload: { currency: "ETB", amount: 10000 }
    };

    const newState = stateReducer(appState, event);
    expect(newState).toEqual(appState);
  });

  it("handles WITHDRAW action with immutable state", () => {
    const event = {
      type: "WITHDRAW",
      payload: { currency: "ETB", amount: 100, description: "Bill payment" }
    };

    const newState = stateReducer(appState, event);

    expect(newState.balances.ETB).toBe(900);
    expect(newState.transactionHistory).toHaveLength(1);
  });

  it("handles CONVERT_CURRENCY properly", () => {
    const event = {
      type: "CONVERT_CURRENCY",
      payload: {
        fromCurrency: "ETB",
        toCurrency: "USD",
        amount: 150,
        rate: 0.006
      }
    };

    const newState = stateReducer(appState, event);
    // console.log(appState)
    // console.log(newState)

    expect(newState.balances.ETB).toBe(850);
    expect(newState.balances.USD).toBe(200.9);
    expect(newState.transactionHistory).toHaveLength(1);
  });
});