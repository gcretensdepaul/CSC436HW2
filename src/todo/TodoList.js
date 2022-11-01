import { useContext } from 'react';
import {StateContext} from "../contexts";

import Todo from './Todo';

export default function TodoList () {
  const {state} = useContext(StateContext);
  const {todos} = state; 
  return (
    <div>
        {todos.map((t) => <Todo {...t} key={t.id} />)}
    </div> 
  );
}