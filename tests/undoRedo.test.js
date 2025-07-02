const { undoAction, redoAction } = require("../undoRedo");

describe("undoAction", () => {
  it("reverts to the previous state", () => {
    const currentState = {
      balances: { ETB: 1200 },
      transactionHistory: [],
      preferences: { primaryCurrency: "ETB" },
      historyStack: [
        {
          balances: { ETB: 1000 },
          transactionHistory: [],
          preferences: { primaryCurrency: "ETB" },
          historyStack: [],
          futureStack: []
        }
      ],
      futureStack: []
    };

    const undone = undoAction(currentState)();

    expect(undone.balances.ETB).toBe(1000);
    expect(undone.futureStack).toHaveLength(1);
  });
});

describe("redoAction", () => {
  it("reapplies the last undone state", () => {
    const currentState = {
      balances: { ETB: 1000 },
      transactionHistory: [],
      preferences: { primaryCurrency: "ETB" },
      historyStack: [],
      futureStack: [
        {
          balances: { ETB: 1200 },
          transactionHistory: [],
          preferences: { primaryCurrency: "ETB" },
          historyStack: [],
          futureStack: []
        }
      ]
    };

    const redone = redoAction(currentState)();

    expect(redone.balances.ETB).toBe(1200);
    expect(redone.historyStack).toHaveLength(1);
  });
});