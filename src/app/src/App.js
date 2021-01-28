import React , {useState, useRef, useEffect} from "react";
import './App.css';
import axios from "axios";
import ReactDOM from "react-dom";

export function App() {
  const [todo,setTodos] = useState("")
  const [todosList,setAllTodo] = useState([])

  async function getTodos() {
    await axios.get('http://localhost:8000/todos/').then((response) => {
      console.log(response.data.result)
      setAllTodo(response.data.result)
    }).catch((e) => {
      console.log(e)
    })
  }

  useEffect(() => {
    getTodos()
  }, [])

    
  const handleSubmit = (e) => {
    e.preventDefault()
    const todos = {
      todo:todo
    }
    axios.post('http://localhost:8000/todos/',todos).then((response) => {
      console.log(response)
      getTodos()
    }).catch((e) => {
      console.log(e)
    })
  }
  return (
    <div className="App">
      <div>
        <h1>List of TODOs</h1>
        <li>Learn Docker</li>
        <li>Learn React</li>
        {todosList.map((t) => {
          return(
            <li>{t}</li>
          )
        })}
      </div>
      <div>
        <h1>Create a ToDo</h1>
        <form>
          <div>
            <label for="todo">ToDo: </label>
            <input type="text" onChange={(e) => setTodos(e.target.value)} />
          </div>
          <div style={{"marginTop": "5px"}}>
            <button onClick={handleSubmit}>Add ToDo!</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
