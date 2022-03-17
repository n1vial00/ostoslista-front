import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";

const URL = 'http://localhost/Ostoslista-PHP/';



function App() {

  function addData(e) {
    e.preventDefault();
    

  }

  const [data, setData] = useState("");
  useEffect(() => {
    axios.get(URL)
      .then((response) => {
        setData(response.data[0].description);
      }).catch(error => {
        alert(error);
      });
  });

  return (
    <div className='app'> 
    <h1>Here's some data hopefully:</h1> 
    <p>{data}</p>
    

    <form onSubmit={addData}>
      
      <div>
        <input type="text" />
        <input type="text" />
        <input type="text" />
      </div>
      
      <div><button>kek</button></div>
    </form>

    </div>
    
  );
}

export default App;
