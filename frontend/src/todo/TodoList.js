import { useContext } from 'react';
import {StateContext} from "../contexts";
import { useResource } from 'react-request-hook';

import Todo from './Todo';

export default function TodoList () {
  const {state, dispatch} = useContext(StateContext);
  const {todos} = state; 

  return (
    // <div>
    //     {todos.map((t) =>
    //     <> 
    //       <Todo {...t} key={t.id} /> 
    //     </>
    //     )}
    // </div> 
    <div>
	    {todos.length === 0 && <h2>No todos found.</h2>}
	    {todos.length > 0 && todos.map((t, i) => <Todo {...t} key={t._id} />)}
    </div>

  );
}