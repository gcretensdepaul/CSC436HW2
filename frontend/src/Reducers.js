function userReducer(state, action) {
    switch(action.type) {
        case "LOGIN":
        case "REGISTER":
            return action.username;
        case "LOGOUT":
            return "";
        default:
            return state;
    }
}

function todoReducer(state, action) {
    switch(action.type) {
        case "CREATE_TODO":
            const newTodo = {
                title: action.title, 
                description: action.description, 
                author: action.author,
                dateCreated: action.dateCreated,
                complete: action.complete,
                dateCompleted: action.dateCompleted,
                id: action.id,
            };
            return[...state, newTodo];
        case "FETCH_TODOS":
            return action.todos;
        case "DELETE_TODO":
            return state.filter(x => { return x.id !== action.id;})
        case "TOGGLE_TODO":
            var objIndex = state.findIndex((obj => obj.id === action.id));
            state[objIndex].complete = action.complete;
            state[objIndex].dateCompleted = action.dateCompleted;
            return state
        default:
            return state
    }
}

export default function appReducer(state, action){
    return {
        user: userReducer(state.user, action),
        todos: todoReducer(state.todos, action)
    }
}