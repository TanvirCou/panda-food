/* eslint-disable react/jsx-key */
import { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import spinner from '../../assets/images/spinner.gif';

const MyOrder = () => {
    const [myOrder, setMyOrder] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch('https://panda-food.onrender.com/order/myOrderData', {
            method: 'POST',
            body: JSON.stringify({
                email: localStorage.getItem('email'),
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(res => res.json())
            .then(data => {
                setMyOrder(data);
                setLoading(true);
            })
    }, []);


    return (
        <div className='bg-gray-100 pt-20'>
            <div>
                <Navbar />
            </div>
            <div className=''>
                {!loading && <div className='h-screen'>
                        <img src={spinner} alt="" className='w-20 pt-48 mx-auto'/>
                    </div>
                }
                 {loading && Array(myOrder).map(data => {
                    return (
                        data.orderDetails ? data.orderDetails.order.slice(0).reverse().map(singleOrder => {
                            return (
                                singleOrder.map((arrayData, index) => {
                                    return (
                                        <div key={index}>
                                            {arrayData.orderTime ?
                                                <div className=''>
                                                    <p className='pb-2 text-xl font-bold mx-7 max-md:text-center'>{arrayData.orderTime}</p>
                                                    <hr className=' border border-emerald-400' />
                                                </div>
                                                :
                                                <div className='flex max-md:justify-center my-2 mx-4' data-aos="fade-left" data-aos-duration="2000">
                                                    <div className='flex shadow-md rounded-md w-96 m-3 p-2 border border-emerald-400 bg-white'>
                                                        <div>
                                                            <img src={arrayData.img} alt="" className='object-cover w-48 h-44 rounded-md sm:flex-shrink-0' />
                                                        </div>
                                                        <div className='px-3 leading-8 pt-1'>
                                                            <p className='font-bold text-lg'>{arrayData.name}</p>
                                                            <p className='text-sm font-semibold text-gray-600 '>Size: {arrayData.size}</p>
                                                            <p className='text-sm font-semibold text-gray-600 '>Quantity: {arrayData.quantity}</p>
                                                            <p className='text-sm font-semibold text-gray-600 '>Price: {arrayData.price}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    )
                                })
                            )
                        })
                            : <p className='h-screen text-xl font-semibold text-center pt-4'>There was no order</p>
                    )
                })
                }
            </div>
            <div>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default MyOrder;