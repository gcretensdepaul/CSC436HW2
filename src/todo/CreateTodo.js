// Create a new Todo item and append it to the todos list.
// Todo has the following props:
// title
// description
// author
// dateCreated
// complete
// dateCompleted

import{useState, useContext} from 'react'; 
import {StateContext} from "../contexts";
import { v4 as uuidv4 } from "uuid";

export default function CreateTodo () {
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const {state, dispatch} = useContext(StateContext);
    const {user} = state;

    return (
         <form onSubmit={e => {
            e.preventDefault();
            dispatch({
                type: "CREATE_TODO", 
                title, 
                description, 
                author: user, 
                dateCreated: Date(Date.now()).toString(), 
                complete: false, 
                dateCompleted: "", 
                id: uuidv4()
                });
            }}>
            <div>Author: <b>{user}</b></div>
            <div>
                <label htmlFor="create-title">Title:</label>
                <input type="text" name="create-title" id="create-title" value={title} onChange={(event) => setTitle(event.target.value)} />
            </div>
            <div>
                <label htmlFor="create-description">Description:</label><br />
                <textarea name="create-description" id="create-description" value={description} onChange={(event) => setDescription(event.target.value)} />
            </div>
            
            <input type="submit" value="Create" disabled={title.length === 0} />
        </form>
    )
}
