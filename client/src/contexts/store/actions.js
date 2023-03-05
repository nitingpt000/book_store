import RestStatus from "http-status-codes";
import { apiUrl, HTTP_METHODS } from "../../helpers/constants";

const actionDescriptors = {
  fetchStore: "fetch_store",
  fetchStoreSuccessful: "fetch_store_successful",
  fetchStoreFailed: "fetch_store_failed",
  resetMessage: "reset_message",
  setMessage: "set_message",
  addItemToCart: "add_item_to_cart",
  addItemToCartSuccessful: "add_item_to_cart_successful",
  addItemToCartFailed: "add_item_to_cart_failed",
  fetchCartItems: "fetch_cart_items",
  fetchCartItemsSuccessful: "fetch_cart_items_successful",
  fetchCartItemsFailed: "fetch_cart_items_failed",
  deleteCartItem: "delete_cart_item",
  deleteCartItemSuccesful: "delete_cart_item_successful",
  deleteCartItemFailed: "delete_cart_item_failed",
};

const actions = {
  resetMessage: (dispatch) => {
    dispatch({ type: actionDescriptors.resetMessage });
  },

  setMessage: (dispatch, message, success = false) => {
    dispatch({ type: actionDescriptors.setMessage, message, success });
  },

  fetchCartItems: (dispatch, cartList) => {
    dispatch({ type: actionDescriptors.fetchCartItems });
    try {
      dispatch({
        type: actionDescriptors.fetchCartItemsSuccessful,
        payload: cartList,
      });
    } catch (err) {
      dispatch({
        type: actionDescriptors.fetchCartItemsFailed,
        error: undefined,
      });
    }
  },

  addItemToCart: (dispatch, cartList) => {
    dispatch({ type: actionDescriptors.addItemToCart });
    try {
      window.localStorage.setItem("cartList", JSON.stringify(cartList));
      dispatch({
        type: actionDescriptors.addItemToCartSuccessful,
        payload: cartList,
      });
    } catch (err) {
      dispatch({
        type: actionDescriptors.addItemToCartFailed,
        error: undefined,
      });
    }
  },

  deleteCartItem: (dispatch, cartList) => {
    dispatch({ type: actionDescriptors.deleteCartItem });
    try {
      dispatch({
        type: actionDescriptors.deleteCartItemSuccesful,
        payload: cartList,
      });
    } catch (err) {
      dispatch({
        type: actionDescriptors.deleteCartItemFailed,
        error: undefined,
      });
    }
  },

  fetchStore: async (
    dispatch,
    categoryIds,
    subCategoryIds,
    products,
    manufacturers,
    minQty,
    maxQty,
    minPrice,
    maxPrice
  ) => {
    dispatch({ type: actionDescriptors.fetchStore });


        try {
      const response = await fetch(
        `${apiUrl}/book`,
        {
          method: HTTP_METHODS.GET,
        }
      );

      const body = await response.json();

      if (response.status === RestStatus.OK) {
        dispatch({
          type: actionDescriptors.fetchStoreSuccessful,
          payload: body.data,
        });
        return;
      } else if(response.status === RestStatus.INTERNAL_SERVER_ERROR) {
        dispatch({
          type: actionDescriptors.fetchStoreFailed,
          error: "Error while fetching books ",
        });
      }

      dispatch({
        type: actionDescriptors.fetchStoreFailed,
        error: body.error,
      });
    } catch (err) {
      dispatch({
        type: actionDescriptors.fetchStoreFailed,
        error: "Error while fetching books",
      });
    }
  },
};

export { actionDescriptors, actions };
