
# 💼 Digital Wallet System
A modular and immutable wallet system built using **functional programming principles**. This project enables safe and predictable currency transactions like deposits, withdrawals, conversions, and transfers — all powered by pure functions, state history management, and curried utilities.

---

## 📦 Features

- ✅ **Single Source of Truth** — Centralized `coreState.js` holding balances, transaction logs, user preferences, and undo/redo history
- ✅ **Pure Reducer Function** — Stateless `stateReducer()` for handling wallet events immutably
- ✅ **Dispatch System** — Clean `dispatchAction()` pipeline with optional logging
- ✅ **Curried Transaction Logger** — Pure functional logger to trace actions
- ✅ **Undo/Redo Functionality** — State time-travel using functional stacks
- ✅ **Comprehensive Test Suite** — Coverage for reducer, dispatch, logger, and history logic

---

### 🧠 Core Concepts

| Concept                 | Description |
|-------------------------|-------------|
| **Immutability**        | All updates return new state objects; no direct mutation |
| **Pure Functions**      | No side effects; same input → always same output |
| **Function Composition, HOFs**| Action flows are modular and testable |
| **Currying**            | Logger and utilities are built with partial application |
| **State History**       | Full undo/redo support via stacks |

---

### 📁 Project Structure

```
wallet/
├── coreState.js          // Initial application state object.
├── reducer.js           // stateReducer() with Pure reducer with DEPOSIT, WITHDRAW, CONVERT
├── dispatch.js          // dispatchAction() method to call the stateReducer and Logging action.
├── logger.js            // logTransaction() curried function
├── undoRedo.js          // undoAction() and redoAction()
├── tests/
│   ├── reducer.test.js
│   ├── dispatch.test.js
│   ├── logger.test.js
│   └── undoRedo.test.js
└── README.md           
```

---

### 🚀 Getting Started

#### 1. Clone the repo

```bash
git clone https://github.com/AlexKalll/digital-wallet-system.git
cd digital-wallet-system
```

#### 2. Install dependencies

```bash
npm install --save-dev jest # for testing
```
#### 3. Setup the Node environment for js

```bash
npm init -y
```

#### 4. Run tests

```bash
npm test 
# or
npx jest
```
- To test a specific file, run like `npm test -- test/reducer.test.js`
---

#### 🔍 Examples

##### Deposit ETB 200

```js
const event = {
  type: "DEPOSIT",
  payload: { currency: "ETB", amount: 2000, description: "Salary" }
};
const updatedState = dispatchAction(event);
```

##### Undo Last Action

```js
const previousState = undoAction(updatedState)();
```

##### Redo Last Undone Action

```js
const redoState = redoAction(previousState)();
```

---

### 🧪 Tests Included

| Test File             | Coverage                                    |
|-----------------------|---------------------------------------------|
| `reducer.test.js`     | Immutability and logic per action type      |
| `dispatch.test.js`    | State update and optional logger execution  |
| `logger.test.js`      | Curried logger returns final callable       |
| `undoRedo.test.js`    | History traversal for undo/redo             |

---

### 📘 Educational Value

This project is inspired by mentorship standards for clean code and functional architecture. It applies:
- Theoretical FP principles (purity, determinism, immutability)
- Real-world application design (wallet logic, currency handling)
- Testing-first approach for reliability
- Modular architecture for maintainability
- Currying for composability

---