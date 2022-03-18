import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";

const URL = 'http://localhost/Ostoslista-PHP/';



function App() {
  const [list, setList] = useState([])
  const [desc, setDesc] = useState("")
  const [newAmount, setNewAmount] = useState(1)

  function addData(e) {
    e.preventDefault();
    const json = JSON.stringify({description:desc});
    axios.post(URL + "inc/addData.php",json,{
      headers: {
        'Content-Type' : 'application/json'
      }
    })
      .then((response) => {
      setList(list => [...list,response.data]);
      setDesc("");
      setNewAmount(1);
    }).catch (error => {
      alert(error.response.data.error)
    });
  }

  useEffect(() => {
    axios.get(URL)
      .then((response) => {
        setList(response.data)
      }).catch(error => {
        alert(error);
      });
  });

  return (
    <div className='app'> 

    <form onSubmit={addData}>
      
      <div>
        <input value={desc} onChange={e => setDesc(e.target.value)}/>
        <input type="number" value={newAmount} onChange={e => setNewAmount(e.target.value)} />
      </div>
      
      <div><button>Submit</button></div>
    </form>

    <h1>Here's some data hopefully:</h1> 
    <ul>{list?.map(e => (
      <li key={e.id}>{e.description} {e.amount}</li>
    ))}
    </ul>
    
    </div>
    
  );
}

export default App;
