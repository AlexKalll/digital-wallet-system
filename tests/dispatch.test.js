const { dispatchAction } = require("../dispatch");
const { appState } = require("../appState");
const { logTransaction } = require("../logger");

describe("dispatchAction", () => {
  it("updates state and logs when logger is provided", () => {
    const loggerMock = logTransaction("DEPOSIT")("ETB")(200)("Bonus");
    const event = {
      type: "DEPOSIT",
      payload: { currency: "ETB", amount: 200, description: "Bonus" }
    };

    const newState = dispatchAction(appState, event, loggerMock);
    console.log("Old Balance:", appState.balances.ETB)
    console.log("New Balance:", newState.balances.ETB)
    console.log("Old Transaction History:", appState.transactionHistory)
    console.log("Later Transaction History:", newState.transactionHistory)

    expect(newState.balances.ETB).toBe(1200);
    // expect(loggerMock).toHaveBeenCalled();
expect(newState.transactionHistory).toHaveLength(1);
  });
});