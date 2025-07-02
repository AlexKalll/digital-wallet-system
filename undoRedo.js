//undo to previous state if it exists
const undoAction = (state) => () => {
  const { historyStack, futureStack } = state;

  if (historyStack.length === 0) {
    console.warn("Nothing to undo.");
    return state;
  }

  const previousState = historyStack[historyStack.length - 1];
  const newHistory = historyStack.slice(0, historyStack.length - 1);

  return {
    ...previousState,
    historyStack: newHistory,
    futureStack: [...futureStack, state]
  };
};

// redo most recently undone state if available
const redoAction = (state) => () => {
  const { historyStack, futureStack } = state;

  if (futureStack.length === 0) {
    console.warn("Nothing to redo.");
    return state;
  }

  const nextState = futureStack[futureStack.length - 1];
  const newFuture = futureStack.slice(0, futureStack.length - 1);

  return {
    ...nextState,
    historyStack: [...historyStack, state],
    futureStack: newFuture
  };
};

module.exports = { undoAction, redoAction };