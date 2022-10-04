
import './App.css';
import {useState} from 'react';
import UserBar from './user/UserBar';
import TodoList from './todo/TodoList';
import CreateTodo from './todo/CreateTodo';
import { v4 as uuidv4 } from "uuid";

function App() {

  //Initial Todo upon app load.  Could be blank, and set the const[todos, ...] to an empty string.  For illustrative purposes.
  const initialTodo = [
    {
      title: "My First Task",
      description: "My first task is to create another task! This one doesn't count :)",
      author: "Default",
      dateCreated: Date(Date.now()).toString(),
      complete: false,
      dateCompleted:"",
      id: uuidv4()
    }
  ];
  const [user, setUser] = useState('');
  const [todos, setTodos] = useState(initialTodo);
  
  return (
    <div>
      <UserBar user={user} setUser={setUser}/>
      <TodoList todos={todos} />
      {user && <CreateTodo user={user} todos={todos} setTodos={setTodos} />} 
    </div>
  );
}

export default App;
