
import './App.css';
import {useState, useReducer} from 'react';
import UserBar from './user/UserBar';
import TodoList from './todo/TodoList';
import CreateTodo from './todo/CreateTodo';
import { v4 as uuidv4 } from "uuid";
import appReducer from './Reducers';

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

  // const [user, setUser] = useState('');
  //const [todos, setTodos] = useState(initialTodo);



  // const[user, dispatchUser] = useReducer(userReducer, "");
  // const[todos, dispatchTodos] = useReducer(todoReducer, initialTodo)

  const[state, dispatch] = useReducer(appReducer, {
    user: "",
    todos: initialTodo,
  });

  
  return (
    <div>
      <UserBar user={state.user} dispatch={dispatch}/>
      <TodoList todos={state.todos} />
      {state.user && <CreateTodo user={state.user} todos={state.todos} dispatch={dispatch} />} 
    </div>
  );
}

export default App;
