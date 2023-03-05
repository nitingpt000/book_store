import React, { createContext, useContext, useReducer } from "react";
import reducer from "./reducer";

const StoreStateContext = createContext();
const StoreDispatchContext = createContext();

const StoreProvider = ({ children }) => {
  const initialState = {
    marketplaceList: [],
    isMarketplaceLoading: false,
    isTopSellingProductsLoading: false,
    topSellingProducts: [],
    error: undefined,
    success: false,
    message: null,
    cartList: [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreStateContext.Provider value={state}>
      <StoreDispatchContext.Provider value={dispatch}>
        {children}
      </StoreDispatchContext.Provider>
    </StoreStateContext.Provider>
  );
};

const useStoreState = () => {
  const context = useContext(StoreStateContext);
  if (context === undefined) {
    throw new Error(
      `'useStoreState' must be used within a StoreProvider`
    );
  }
  return context;
};

const useStoreDispatch = () => {
  const context = useContext(StoreDispatchContext);
  if (context === undefined) {
    throw new Error(
      `'useStoreDispatch' must be used within a StoreProvider`
    );
  }
  return context;
};

const useStoreUnit = () => {
  return [useStoreState(), useStoreDispatch()];
};

export {
  useStoreDispatch,
  useStoreState,
  useStoreUnit,
  StoreProvider,
};
