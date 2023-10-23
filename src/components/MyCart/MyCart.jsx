import { useCartState, useDispatch } from '../ContextProvider/ContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const MyCart = () => {
    const cartState = useCartState();
    const dispatch = useDispatch();

    if (cartState.length === 0) {
        return (
            <div className='text-center text-2xl font-bold py-40 text-emerald-400'>The cart is empty</div>
        )
    }

    let totalPrice = cartState.reduce((total, foodItem) => total + foodItem.price, 0);

    const handleCheckOut = async () => {
        await fetch('https://panda-food.onrender.com/order/orderdata', {
            method: 'POST',
            body: JSON.stringify({
                orderData: cartState,
                email: localStorage.getItem('email'),
                orderTime: new Date().toLocaleString(),
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    dispatch({ type: 'Drop' });
                    alert('Your order successfully confirmed');
                }
            })
    };

    return (
        <div>
            <div>
                <div className='md:flex md:justify-center mt-10 overflow-auto w-auto'>
                    <table className="md:w-4/5 w-full border justify-between table-auto">
                        <thead>
                            <tr className='text-xl bg-emerald-400 text-left border border-gray-300'>
                                <th className='py-1 pl-2'>#</th>
                                <th className='max-md:px-3'>Name</th>
                                <th className='max-md:px-3'>Quantity</th>
                                <th className='max-md:px-3'>Options</th>
                                <th className='max-md:px-3'>Amount</th>
                                <th className='max-md:px-3'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='pt-4'>
                            {
                                cartState.map((foodItem, index) => (
                                    <tr key={index} className='bg-emerald-200 border-y-4 border-white '>
                                        <td className='py-1 pl-2'>{index + 1}</td>
                                        <td className='max-md:px-4 md:pl-1 max-md:whitespace-nowrap'>{foodItem.name}</td>
                                        <td className='max-md:px-4 md:pl-1'>{foodItem.quantity}</td>
                                        <td className='max-md:px-4 md:pl-1'>{foodItem.size}</td>
                                        <td className='max-md:px-4 md:pl-1'>{foodItem.price}</td>
                                        <td className='max-md:px-4 md:pl-1'><button onClick={() => { dispatch({ type: "Delete", index: index }) }}><FontAwesomeIcon icon={faTrash} /></button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='font-bold text-2xl xl:mx-[105px] lg:mx-[85px] md:mx-[65px] max-md:text-center pt-4'>
                <p>Total price: ${totalPrice}</p>
            </div>
            <div className='max-md:text-center'>
                <button onClick={handleCheckOut} className='w-fit bg-emerald-400 border-none rounded-md py-1 px-3 font-semibold text-md xl:mx-[105px] lg:mx-[85px] md:mx-[65px] mt-4'>Checkout</button>
            </div>
        </div>
    );
};

export default MyCart;