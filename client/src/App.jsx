import React from 'react';
import logo from './logo.svg';
import './App.css';
import AuthenticateUser from './AuthenticateUser'

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  console.log(data); 
  
  return (
    <>
    <AuthenticateUser />
    </>
  );
}

export default App;


