const { logTransaction } = require("../logger");

describe("logTransaction", () => {
  it("returns a curried logger function", () => {
    const log = logTransaction("DEPOSIT")("USD")(100)("Savings");

    expect(typeof log).toBe("function");
  });
});