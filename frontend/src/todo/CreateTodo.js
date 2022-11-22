// Create a new Todo item and append it to the todos list.
// Todo has the following props:
// title
// description
// author
// dateCreated
// complete
// dateCompleted

import{useState, useContext, useEffect} from 'react'; 
import {StateContext} from "../contexts";
import { v4 as uuidv4 } from "uuid";
import { useResource } from 'react-request-hook';


export default function CreateTodo () {
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const {state, dispatch} = useContext(StateContext);
    const {user} = state;


    // const [ todo, createTodo ] = useResource(({title, description, author, dateCreated, complete, dateCompleted, id}) => ({
    //     url: '/todos',
    //     method: 'post',
    //     data: {title, description, author, dateCreated, complete, dateCompleted, id}
    // }));

    const [todo , createTodo ] = useResource(({ title, description, dateCreated, complete}) => ({
        url: '/post',
        method: 'post',
        headers: {"Authorization": `${state.user.access_token}`},
        data: { title, description, dateCreated, complete}
    }))
        
    
    useEffect(() => {
        if (todo.isLoading === false && todo.data) {
            dispatch({
                type: "CREATE_TODO",
                title: todo.data.title,
                description: todo.data.description,
                id: todo.data._id,
                author: user.username,
                dateCreated: todo.data.dateCreated,
                complete: todo.data.complete,
                dateCompleted: todo.data.dateCompleted,
            });
        }
    }, [todo]);
    


    return (
         <form onSubmit={e => {
            e.preventDefault();
            let new_id = uuidv4();
            // createTodo({ title, description, author: user});
            createTodo({
                title, 
                description, 
                author: user, 
                dateCreated: Date(Date.now()).toString(), 
                complete: false, 
                dateCompleted: "", 
            });
            // dispatch({
            //     type: "CREATE_TODO", 
            //     title, 
            //     description, 
            //     author: user, 
            //     dateCreated: Date(Date.now()).toString(), 
            //     complete: false, 
            //     dateCompleted: "", 
            //     id: new_id
            // });
            }}>
            <h3>Create a New ToDo</h3>
            <div>Author: <b>{user.username}</b></div>
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
