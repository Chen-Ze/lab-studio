import 'reflect-metadata';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './app/app';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { Provider as InversifyProvider } from 'inversify-react';

import {
  EXPERIMENTS_FEATURE_KEY,
  experimentsReducer,
} from './app/experiments.slice';
import { experimentRendererContainer } from '@lab-studio/front/experiments/container';

const store = configureStore({
  reducer: { [EXPERIMENTS_FEATURE_KEY]: experimentsReducer },
  // Additional middleware can be passed to this array
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env['NODE_ENV'] !== 'production',
  // Optional Redux store enhancers
  enhancers: [],
});

ReactDOM.render(
  <Provider store={store}>
    <InversifyProvider container={() => experimentRendererContainer}>
      <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StrictMode>
    </InversifyProvider>
  </Provider>,
  document.getElementById('root')
);
