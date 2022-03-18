import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";

const URL = 'http://localhost/Ostoslista-PHP/';



function App() {
  const [list, setList] = useState([])
  const [desc, setDesc] = useState("")
  const [newAmount, setNewAmount] = useState(1)

  useEffect(() => {
    axios.get(URL)
      .then((response) => {
        setList(response.data)
      }).catch(error => {
        alert(error);
      });
  },[]);

  function addData(e) {
    e.preventDefault();
    const json = JSON.stringify({description:desc, amount:newAmount});
    axios.post(URL + "inc/addData.php",json,{
      headers: {
        'Content-Type' : 'application/json'
      }
    })
      .then((response) => {
      setList(list => [...list,response.data]);
      setDesc("");
      setNewAmount(1);
    }).catch(error => {
      alert(error.response ? error.response.data.error : error);
  });
  }

  function delet(id) {
    const json = JSON.stringify({id:id})
    axios.post(URL + "inc/delete.php",json, {
      headers: {
        'Content-Type' : 'application/json'
      }
    }).then((response) => {
        const newList = list.filter((item) => item.id !== id);
        setList(newList);
    }).catch(error => {
        alert(error.response ? error.response.data.error : error);
    });
  }


  return (
    <div className='app'> 
      <h1>Shopping list</h1>
      <form onSubmit={addData}>
        <p>Add new item</p>
        <div>
          <input value={desc} onChange={e => setDesc(e.target.value)}/>
          <input type="number" value={newAmount} onChange={e => setNewAmount(e.target.value)} />
        </div>
        
        <div><button>Submit</button></div>
      </form>

      <div> 
        <ul>{list?.map(e => (
          <li key={e.id}>{e.description} <span className='amount'> {e.amount} </span> <a href="#" onClick={() => delet(e.id)}>Delete</a> </li>
        ))}
        </ul>
      </div>
    </div>
    
  );
}

export default App;
