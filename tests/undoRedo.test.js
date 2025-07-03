const { undoAction, redoAction } = require("../undoRedo");
const { stateReducer } = require("../reducer");
const { appState } = require("../coreState");

const event = {
      type: "WITHDRAW",
      payload: { currency: "ETB", amount: 100, description: "Bill payment" }
    };

const newState = stateReducer(appState, event);
const undone = undoAction(newState)();

describe("undoAction", () => {
  it("reverts to the previous state", () => {
    
    const undone = undoAction(newState)();

    expect(undone.balances.ETB).toBe(1000);
    console.log(`Old: ${appState.balances.ETB}`)
    console.log(`New: ${undone.balances.ETB}`)
  });
});

describe("redoAction", () => {
  it("reapplies the last undone state", () => {
    
    const redone = redoAction(undone)();
    // console.log(undone)
    // console.log(appState)
    // console.log(redone)

    expect(redone.balances.ETB).toBe(900);
  });
});