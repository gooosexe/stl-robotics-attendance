import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login'

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);
  return (
    <Login />
  );
}

export default App;


