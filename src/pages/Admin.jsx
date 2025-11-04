import { useReducer } from 'react'
// const initialState = { count: 0 };

// function reducer(state, action) {
//     switch (action.type) {
//         case 'increment':
//             return { count: state.count + 1 };
//         case 'decrement':
//             return { count: state.count - 1 };
//         case "reset":
//             return {count:state.count =0 }
//         default:
//             return state;
//     }
// }



// Foydalanish:

const initialState = {
    name: "",
    age: "",
    email: "",
}


function reducer(state, action){
    switch (action.type) {
        case "CHANGE_INPUT":
    return {
        ...state,
        [action.field]: action.value,
    }
        case "RESET":
    return initialState;
    default:
    return state;
}
}




function Admin() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <>
            <button onClick={() => dispatch({ type: 'increment' })}>+</button>
            <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
            <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
            <p>{state.count}</p>

        </>
    )
}

export default Admin
