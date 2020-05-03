import * as actionTypes from "./actions";

const initialState = {
  savedTransactions: [],
  unreadSaved: 0,
  notifications: [],
  chartEnabled: true
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_TRANSACTION:
      return {
        ...state,
        unreadSaved: state.unreadSaved + 1,
        savedTransactions: [action.transaction, ...state.savedTransactions]
      };
    case actionTypes.REMOVE_TRANSACTION:
      let savedTransactionArr = [...state.savedTransactions];
      savedTransactionArr.splice(action.transactionId, 1);
      return {
        ...state,
        savedTransactions: savedTransactionArr
      };
    case actionTypes.RESET_UNREAD_SAVED:
      return {
        ...state,
        unreadSaved: 0
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
    case actionTypes.TOGGLE_CHART:
      return {
        ...state,
        chartEnabled: !state.chartEnabled
      };
    default:
      return state;
  }
};

export default reducer;
