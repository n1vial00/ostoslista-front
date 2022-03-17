import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";

const URL = 'http://localhost/Ostoslista-PHP/';



function App() {

  function addData(e) {
    e.preventDefault();
    axios.post(URL + "inc/addData.php",)
    
  }

  const [data, setData] = useState("");
  useEffect(() => {
    axios.get(URL)
      .then((response) => {
        let newData = "";
        response.data.forEach(e => {
          newData += e.description + " " + e.amount + " ";
        });
        setData(newData);
      }).catch(error => {
        alert(error);
      });
  });

  return (
    <div className='app'> 

    <form onSubmit={addData}>
      
      <div>
        <input type="text" />
        <input type="text" />
      </div>
      
      <div><button>kek</button></div>
    </form>

    <h1>Here's some data hopefully:</h1> 
    <p>{data}</p>
    
    </div>
    
  );
}

export default App;
