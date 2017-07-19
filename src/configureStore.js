import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, autoRehydrate } from 'redux-persist-immutable';
import rootReducer from './reducers';
import rootSaga from './sagas';

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(sagaMiddleware),
      autoRehydrate(),
      window.devToolsExtension ? window.devToolsExtension() : f => f,
    ),
  );

  sagaMiddleware.run(rootSaga);
  persistStore(store);

  return store;
};

export default configureStore;
