/* eslint-disable react/prop-types */

import { useEffect, useRef, useState } from "react";
import { useCartState, useDispatch } from "../ContextProvider/ContextProvider";

const Card = ({ foodItem, options }) => {
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState('');

    let dispatch = useDispatch();
    let cartData = useCartState();

    const priceRef = useRef();

    const priceOptions = Object.keys(options[0]);

    const handleAddToCart = async () => {
        let food = [];
        for (const item of cartData) {
            if (item.id === foodItem._id) {
                food = item;
                break;
            }
        }
        if (food !== []) {
            if (food.size === size) {
                await dispatch({
                    type: "Update",
                    id: foodItem._id,
                    price: finalPrice,
                    quantity: quantity,
                });
                return;
            } else if (food.size !== size) {
                await dispatch({
                    type: "Add",
                    id: foodItem._id,
                    name: foodItem.name,
                    price: finalPrice,
                    img: foodItem.img,
                    quantity: quantity,
                    size: size,
                });
                return;
            }
            return;
        }
        await dispatch({
            type: "Add",
            id: foodItem._id,
            name: foodItem.name,
            price: finalPrice,
            img: foodItem.img,
            quantity: quantity,
            size: size,
        });
    }

    let finalPrice = quantity * parseInt(options[0][size]);

    useEffect(() => {
        setSize(priceRef.current.value);
    }, []);

    return (
        <div className='shadow-md rounded-md justify-center my-3 p-2 border border-emerald-400 bg-white' data-aos="fade-right" data-aos-duration="2000">
            <img src={foodItem.img} alt="" className=' object-cover w-full h-52 sm:flex-shrink-0' />
            <h5 className='font-semibold pt-2'>{foodItem.name}</h5>
            <p className='text-sm text-gray-500 '>{foodItem.description}</p>
            <div className='flex pt-3 justify-center'>
                <select onChange={(e) => setQuantity(e.target.value)} className='bg-emerald-400 border-none w-100 rounded-md h-7 mr-3'>
                    {Array.from(Array(6), (e, i) => {
                        return (
                            <option value={i + 1} key={i + 1}>{i + 1}</option>
                        )
                    })}
                </select>
                <select ref={priceRef} onChange={(e) => setSize(e.target.value)} className='bg-emerald-400 border-none w-100 rounded-md h-7'>
                    {priceOptions.map(option => {
                        return (
                            <option value={option} key={option}>{option}</option>
                        )
                    })}
                </select>
                <div className='ml-4 font-semibold '>
                    <p>${finalPrice}</p>
                </div>
            </div>
            <hr className='mt-2 border border-gray-200' />
            <div className='w-full flex mt-2 justify-center '>
                <button onClick={handleAddToCart} className='w-fit bg-emerald-400 border-none rounded-md py-1 px-3 font-semibold text-md '>Add to cart</button>
            </div>
        </div>
    );
};

export default Card;