
import './App.css';
import {useState, useEffect, useReducer} from 'react';
import UserBar from './user/UserBar';
import TodoList from './todo/TodoList';
import CreateTodo from './todo/CreateTodo';
import { v4 as uuidv4 } from "uuid";
import Header from "./Header";
import {ThemeContext, StateContext }from "./contexts";
import ChangeTheme from "./ChangeTheme";
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

  const[state, dispatch] = useReducer(appReducer, {
    user: "",
    todos: initialTodo,
  });

  useEffect(() => {
    if (state.user) {
      document.title = `${state.user}'s ToDo List`;
    }
    else {
      document.title = "A ToDo List App";
    }
  }, [state.user]);

  const[theme, setTheme] = useState({
    primaryColor : "deepskyblue", 
    secondaryColor: "coral"
  });
  
  return (
    <div>
      <StateContext.Provider value={{state, dispatch}}>
        <ThemeContext.Provider value={theme}>
          <Header title="ToDo List App"></Header>
          <ChangeTheme theme={theme} setTheme={setTheme} /> 
          <UserBar />
          
          <TodoList />
          {state.user && <CreateTodo user={state.user} todos={state.todos} dispatch={dispatch} />} 
        </ThemeContext.Provider>
      </StateContext.Provider>
    </div>
  );
}

export default App;
