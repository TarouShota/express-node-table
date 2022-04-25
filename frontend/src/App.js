import logo from './logo.svg';
import './index.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'

function App() {

  useEffect(() => {
    fetchItems();
  }, []);

  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    fetch("/api/tweets").then(async response => {
      let data = await response.json()
      console.log(data);
      setItems(data);
    })

    // setItems(data);
  };
  if (items.length != 0) {
    console.log(items.employees['employee'][0]);
  }



  return (
    <section>
      {items.length !== 0 && <h2>{Object.values(items.employees['employee'][0])}</h2>
      }

    </section >
  );

}

export default App;
