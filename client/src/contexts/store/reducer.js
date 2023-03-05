import { actionDescriptors } from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case actionDescriptors.resetMessage:
      return {
        ...state,
        success: false,
        message: null,
      };
    case actionDescriptors.setMessage:
      return {
        ...state,
        success: action.success,
        message: action.message,
      };
    case actionDescriptors.fetchStore:
      return {
        ...state,
        isStoreLoading: true,
      };
    case actionDescriptors.fetchStoreSuccessful:
      return {
        ...state,
        storeList: action.payload,
        isStoreLoading: false,
      };
    case actionDescriptors.fetchStoreFailed:
      return {
        ...state,
        error: action.error,
        isStoreLoading: false,
      };
    case actionDescriptors.fetchCartItems:
      return {
        ...state,
      };
    case actionDescriptors.fetchCartItemsSuccessful:
      return {
        ...state,
        cartList: action.payload,
      };
    case actionDescriptors.fetchCartItemsFailed:
      return {
        ...state,
        error: action.error,
      };
    case actionDescriptors.addItemToCart:
      return {
        ...state,
      };
    case actionDescriptors.addItemToCartSuccessful:
      return {
        ...state,
        cartList: action.payload,
      };
    case actionDescriptors.addItemToCartFailed:
      return {
        ...state,
        error: action.error,
      };
    case actionDescriptors.deleteCartItem:
      return {
        ...state,
      };
    case actionDescriptors.deleteCartItemSuccesful:
      return {
        ...state,
        cartList: action.payload,
      };
    case actionDescriptors.deleteCartItemFailed:
      return {
        ...state,
        error: action.error,
      };
  
    default:
      throw new Error(`Unhandled action: '${action.type}'`);
  }
};

export default reducer;
