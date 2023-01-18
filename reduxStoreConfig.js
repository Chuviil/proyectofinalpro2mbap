import { persistReducer, persistStore } from "redux-persist";
import { createStore } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

function seenReducer(state = false, action) {
  switch (action.type) {
    case "SEEN":
      return { state: true };
    case "UNSEEN":
      return { state: false };
    default:
      return state;
  }
}

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, seenReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
