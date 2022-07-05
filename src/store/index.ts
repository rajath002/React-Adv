import {
  compose,
  createStore,
  applyMiddleware,
  combineReducers,
  Dispatch,
  AnyAction,
} from "redux";
import thunk from "redux-thunk";
import { IStore } from "../interface";
import { composeWithDevTools } from "redux-devtools-extension";

const initialState: IStore.Store = {
  posts: [],
};

const postsReducer = function (
  state = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case "GET_POSTS":
      return {
        ...state,
        posts: action.payload,
      };
    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };
    default:
      return state;
  }
};

const enhancers = [];
const isDevelopment = process.env.NODE_ENV === "development";
// if (isDevelopment && typeof window !== "undefined" && window.devtools {
//     const devToolsExtension = window.devtoo;
//     if (typeof devToolsExtension === "function") {
//         enhancers.push(devToolsExtension());
//     }
// }
if (isDevelopment) enhancers.push(composeWithDevTools());

// Combine reducers into one root reducer
const rootReducer = combineReducers({
  posts: postsReducer,
});

// add middleware to store
const middleware: any = [thunk];

// create store
let store = createStore(
  rootReducer,
  compose(applyMiddleware<Dispatch<AnyAction>, IStore.Store>(...middleware))
);

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
