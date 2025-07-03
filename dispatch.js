const { stateReducer } = require("./reducer");
const { appState } = require("./coreState");
const {logTransaction} = require("./logger")

function dispatchAction(event) {
  const newState = stateReducer(appState, event);

  // handling logging utility
  if (event.type == "DEPOSIT" || event.type == "WITHDRAW" ){
  logTransaction(event.type)(event.payload.currency)(event.payload.amount)(event.payload.description)();
  }
  else{
    logTransaction(event.type)(event.payload.fromCurrency)(event.payload.amount) (`to — ${event.payload.toCurrency}`)();
  }

  return newState;
}

module.exports = { dispatchAction };