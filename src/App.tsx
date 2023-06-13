import './App.css';
import { Provider } from 'react-redux/es/exports'
import { store } from './store/store.ts'
import SignUpView from './widgets/SignUp.tsx';
import React from 'react';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <SignUpView />
      </div>
    </Provider>

  );
}

export default App;
