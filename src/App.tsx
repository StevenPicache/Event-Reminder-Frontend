import './App.css';
import { Provider } from 'react-redux/es/exports'
import { store } from './store/store'
import SignInView from './widgets/SignIn';
import React from 'react';

function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <SignInView />
      </div>
    </Provider>

  );
}

export default App;
