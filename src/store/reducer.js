import * as actionTypes from "./actions";

const initialState = {
  savedTransactions: [],
  notifications: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_TRANSACTION:
      return {
        ...state,
        savedTransactions: [action.transaction, ...state.savedTransactions]
      };
    case actionTypes.REMOVE_TRANSACTION:
      let savedTransactionArr = [...state.savedTransactions];
      savedTransactionArr.splice(action.transactionId, 1);
      return {
        ...state,
        savedTransactions: savedTransactionArr
      };
    case actionTypes.CLEAR_TRANSACTIONS:
      return {
        ...state,
        savedTransactions: []
      };
    case actionTypes.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [action.notification, ...state.notifications]
      };
    case actionTypes.CLEAR_NOTIFICATIONS:
      return {
        ...state,
        notifications: []
      };
    default:
      return state;
  }
};

export default reducer;
