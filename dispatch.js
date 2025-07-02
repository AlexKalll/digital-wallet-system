const { stateReducer } = require("./reducer");

function dispatchAction(state, event, loggerFn) {
  const newState = stateReducer(state, event);

  // Optionally run the curried logger
  if (typeof loggerFn === "function") {
    loggerFn(); // Executes the final curried logging call
  }

  return newState;
}

module.exports = { dispatchAction };