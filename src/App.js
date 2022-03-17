import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";

const URL = 'http://localhost/Ostoslista-PHP/';



function App() {

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
    <div> 
    <h1>Here's some data hopefully:</h1> 
    <p>{data}</p>
    </div>
    
  );
}

export default App;
