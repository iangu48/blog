import React from 'react';
import Application from "./components/Application";
import UserProvider from "./providers/UserProvider";
import './App.css';


function App() {
  return (
    <div className="App">
      <UserProvider>
        <Application />
      </UserProvider>
    </div>
  );
}

export default App;
