// undo to previous state if it exists
const undoAction = (state) => () => {
  const { historyStack, futureStack } = state;

  if (historyStack.length === 0) {
    console.warn("Nothing to undo.");
    return state;
  }

  const previousState = structuredClone(historyStack[historyStack.length - 1]);
  const newHistory = structuredClone(historyStack.slice(0, historyStack.length - 1));
  const newFuture = structuredClone([...futureStack, structuredClone(state)]);

  return {
    ...previousState,
    historyStack: newHistory,
    futureStack: newFuture
  };
};

// redo most recently undone state if available
const redoAction = (state) => () => {
  const { historyStack, futureStack } = state;

  if (futureStack.length === 0) {
    console.warn("Nothing to redo.");
    return state;
  }

  const nextState = structuredClone(futureStack[futureStack.length - 1]);
  const newFuture = structuredClone(futureStack.slice(0, futureStack.length - 1));
  const newHistory = structuredClone([...historyStack, structuredClone(state)]);

  return {
    ...nextState,
    historyStack: newHistory,
    futureStack: newFuture
  };
};

module.exports = { undoAction, redoAction };