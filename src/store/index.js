import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {createLogger} from 'redux-logger';
import reducer from '../reducers';
const logger=createLogger();
export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  return {
    ...createStore(reducer, initialState, applyMiddleware(logger,sagaMiddleware)),
    runSaga: sagaMiddleware.run
  }
}
