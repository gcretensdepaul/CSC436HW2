import {useState, useContext} from 'react';
import {ThemeContext, StateContext} from '../contexts';
import { useResource } from 'react-request-hook';


export default function Todo ({ title, description, author, dateCreated, complete, dateCompleted, id }) {
    //const [complete, setComplete] = useState(false);
    //const [dateCompleted, setDateCompleted] = useState("");
    const{secondaryColor} = useContext(ThemeContext);
    // const {state, dispatch} = useContext(StateContext);
    // const {id} = state;
    const {state, dispatch} = useContext(StateContext);
    // const [complete, setComplete] = useState(complete);
    // const [dateCompleted, setDateCompleted] = useState(state);
    const [todo, patchTodo ] = useResource(({id, complete, dateCompleted}) => ({
        url: `/todos/${id}`,
        method: 'patch',
        data: {complete, dateCompleted}
      }));
    const [todoo, deleteTodo] = useResource((id) => ({
    url: `/todos/${id}`,
    method: 'delete',

    }));


    //Event handler triggered when the completed checkbox is clicked.
    //Sets the dateCompleted if the box is checked, otherwise clears the field if unchecked.
    const handleCheckbox = (event) => {
        //let dateCpl
        if(event.target.checked) {
            //setDateCompleted(Date(Date.now()).toString());
            dateCompleted = Date(Date.now()).toString();
        }
        else
        {
            //setDateCompleted("");
            dateCompleted = "";
        }
        complete = !complete;
        //setComplete(!complete);
        patchTodo({id, complete, dateCompleted});
        dispatch({
            type: "TOGGLE_TODO",  
            id: id,
            complete: complete,
            dateCompleted: dateCompleted
        });

    };

    return (
        <div>
            <h3 style={{color: secondaryColor}}>Todo: {title}</h3>
            <div>Desc: {description}</div>
            <div><i>By: <b>{author}</b></i></div>
            <div>Created: {dateCreated}</div>
            <div>Completed: <input type="checkbox" id="complete-checkbox" onChange={handleCheckbox} checked={complete}></input>{complete} ({complete ? "Yes"  : "No"})</div>
            <div>Date Completed: {dateCompleted}</div>     
            <div>id: {id}</div>      
                <button key={"button"+id } onClick={e => {
                e.preventDefault();
                deleteTodo(id);
                dispatch({
                    type: "DELETE_TODO",  
                    id: id
                });
                }}>
                Delete
            </button>
            <br />
            <br />
            <br />
        </div>

    )
}