import { createStore, applyMiddleware, compose } from "redux"; 
//import { configureStore } from '@reduxjs/toolkit'
import {thunk} from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {}; 
const middleware = [thunk];

let store;
try {
  store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware))
  );
//   const store2 = configureStore({
//       reducer: reducer,
//       preloadedState: initialState,
//       middleware: (getDefaultMiddleware) => getDefaultMiddleware,
//     });
} catch (error) {
  store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware))
  );
}

export default store; //store.dispatch(setCurrentUser(user)); 