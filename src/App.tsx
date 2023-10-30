import './App.css';
import { Provider } from 'react-redux/es/exports'
import { store } from './store/store'
import React from 'react';
import MainPage from './view/MainPage';
export default function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <MainPage />

      </div>
    </Provider>
  );
}

