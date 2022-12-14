
import './App.css';
import React, {useState, useEffect, useReducer} from 'react';
import UserBar from './user/UserBar';
import TodoList from './todo/TodoList';
import CreateTodo from './todo/CreateTodo';
import { v4 as uuidv4 } from "uuid";
import Header from "./Header";
import {ThemeContext, StateContext }from "./contexts";
import ChangeTheme from "./ChangeTheme";
import appReducer from './Reducers';
import { useResource } from 'react-request-hook';

function App() {

  //Initial Todo upon app load.  Could be blank, and set the const[todos, ...] to an empty string.  For illustrative purposes.
  // const initialTodo = [
  //   {
  //     title: "My First Task",
  //     description: "My first task is to create another task! This one doesn't count :)",
  //     author: "Default",
  //     dateCreated: Date(Date.now()).toString(),
  //     complete: false,
  //     dateCompleted:"",
  //     id: uuidv4()
  //   }
  // ];

  const[state, dispatch] = useReducer(appReducer, {
    user: "",
    todos: [],
  });

  useEffect(() => {
    if (state.user) {
      document.title = `${state.user.username}'s ToDo List`;
    }
    else {
      document.title = "A ToDo List App";
    }
  }, [state.user]);

  const[theme, setTheme] = useState({
    primaryColor : "deepskyblue", 
    secondaryColor: "coral"
  });

  // useEffect(() => {
  //   fetch("/api/themes")
  //   .then((result) => result.json())
  //   .then((themes) => setTheme(themes));
  // }, []);

  // useEffect(() => {
  //   fetch("/api/todos")
  //   .then((result) => result.json())
  //   .then((todos) => dispatch({ type: "FETCH_TODOS", todos}));
  // }, []);

  // const [ todos, getTodos ] = useResource(() => ({
  //   url: '/todos',
  //   method: 'get'
  // }));

  const [todos, getTodos] = useResource(() => ({
    url: "/post",
    method: "get",
    headers: { Authorization: `${state?.user?.access_token}` },
  }));
    

  //useEffect(getTodos, [])
  useEffect(() => {
    if(state?.user?.access_token){
      getTodos();
    }
    
  }, [state?.user?.access_token]);
  

  // useEffect(() => {
  //   if (todos && todos.data) {
  //     dispatch({ type: 'FETCH_TODOS', todos: todos.data })
  //   }
  // }, [todos])
  useEffect(() => {
    if (todos && todos.isLoading === false && todos.data) {
      dispatch({ type: "FETCH_TODOS", todos: todos.data.todos.reverse() });
    }
    }, [todos]);
    

  return (
    <div>
      <StateContext.Provider value={{state, dispatch}}>
        <ThemeContext.Provider value={theme}>
          <Header title="ToDo List App"></Header>
          <ChangeTheme theme={theme} setTheme={setTheme} /> 
          <React.Suspense fallback = {"Loading..."}>
            <UserBar />
          </React.Suspense>
          <TodoList />
          {state.user && <CreateTodo user={state.user} todos={state.todos} dispatch={dispatch} />} 
        </ThemeContext.Provider>
      </StateContext.Provider>
    </div>
  );
}

export default App;
