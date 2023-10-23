/* eslint-disable no-duplicate-case */
/* eslint-disable no-case-declarations */
import { createContext, useContext, useReducer, useState } from 'react';

const CartStateContext = createContext();
const DispatchContext = createContext();
const UserContext = createContext(); 

const reducer = (state, action) => {
    switch(action.type) {
        case "Add":
            return [...state, {id: action.id, name: action.name, img: action.img, quantity: action.quantity, size: action.size, price: action.price}];
        case "Delete":
            // eslint-disable-next-line no-case-declarations
            const newArr = [...state];
            newArr.splice(action.index, 1);
            return newArr;
        case "Update":
            let arr = [...state];
            arr.find((food, index) => {
                if(food.id === action.id){
                    arr[index] = {...food, quantity: parseInt(action.quantity) + parseInt(food.quantity), price: parseInt(action.price) + food.price};
                }
            })
            return arr;
            case 'Drop':
                const emptyArray = [];
                return emptyArray;
        default: 
            console.log('There is an error');
    }
}


// eslint-disable-next-line react/prop-types
export const CartProvider = ({children}) => {
    const [loggedInUser, setLoggedInUser] = useState({});
    const [state, dispatch] = useReducer(reducer, []);

    return (
        <DispatchContext.Provider value={dispatch}>
                <CartStateContext.Provider value={state}>
                <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
                    {children}
                </UserContext.Provider>     
                    
                </CartStateContext.Provider>
            </DispatchContext.Provider>
        
            
    );
};

export const useCartState = () => useContext(CartStateContext);
export const useDispatch = () => useContext(DispatchContext);
export const useUserState = () => useContext(UserContext);