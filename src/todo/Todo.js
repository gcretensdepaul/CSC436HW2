import {useState} from 'react';

export default function Todo ({ title, description, author, dateCreated }) {
    const [complete, setComplete] = useState(false);
    const [dateCompleted, setDateCompleted] = useState("");

    //Event handler triggered when the completed checkbox is clicked.
    //Sets the dateCompleted if the box is checked, otherwise clears the field if unchecked.
    const handleCheckbox = (event) => {
        if(event.target.checked) {
            setDateCompleted(Date(Date.now()).toString());
        }
        else
        {
            setDateCompleted("");
        }
        setComplete(!complete);
    };

    return (
         <div>
            <h3>Todo: {title}</h3>
            <div>Desc: {description}</div>
            <div><i>By: <b>{author}</b></i></div>
            <div>Created: {dateCreated}</div>
            <div>Completed: <input type="checkbox" id="complete-checkbox" onChange={handleCheckbox}></input>{complete} ({complete ? "Yes"  : "No"})</div>
            <div>Date Completed: {dateCompleted}</div>
            <br />       
        </div>
    )
}