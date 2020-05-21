import { createStore, applyMiddleware,compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
// import { createLogger } from 'redux-logger'
import rootReducer from './reducers/RootReducer'

// const loggerMiddleware = createLogger();

// For use dev tools
const composeEnhancers =
typeof window === 'object' &&
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
  }) : compose;

const enhancer = composeEnhancers(
applyMiddleware(thunkMiddleware)
);

export default function configureStore(preloadedState) {
  return createStore(rootReducer, enhancer);
}