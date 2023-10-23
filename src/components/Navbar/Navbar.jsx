import { useState } from 'react';
import { useCartState, useUserState } from '../ContextProvider/ContextProvider';
import { Link, useNavigate } from 'react-router-dom';
import { logOut } from '../LoginManager/LoginManager';
import CartModal from '../MyCart/CartModal';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const cartState = useCartState();
    const [loggedInUser, setLoggedInUser] = useUserState();
    const navigate = useNavigate();

    const handleLogout = () => {
        logOut();
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        setLoggedInUser(!loggedInUser.success);
        navigate('/login');
    }

    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }


    return (
        <nav className='shadow-md w-full top-0 left-0 z-10 fixed'>
            <div className='md:flex items-center justify-between bg-emerald-400 py-4 md:pl-12 md:pr-12 px-7'>
                <div className='font-bold text-3xl text-white cursor-pointer items-center italic font-[Poppins] '>
                    <Link to='/'>PandaFood</Link>
                </div>

                <div onClick={() => setOpen(!open)} className='text-3xl right-6 top-5 absolute cursor-pointer md:hidden'>
                    <ion-icon name={open ? 'close' : 'menu'}></ion-icon>
                </div>

                <ul className={`md:flex md:items-center md:justify-between md:pb-0 pb-4 absolute md:static bg-emerald-400 md:z-auto z-[-1] left-0 w-full md:pl-0 pl-12 transition-all duration-500 ease-in ${open ? 'top-12 ' : 'top-[-490px]'}`}>
                    <div className='md:flex items-center'>
                        <li type="button" className='md:ml-8 text-lg font-semibold md:my-0 my-7'>
                            <Link to='/' className='text-white hover:text-gray-200 duration-500'>Home</Link>
                        </li>
                        {(localStorage.getItem('token') || loggedInUser.success) ?
                            <li type="button" className='md:ml-4 text-lg font-semibold md:my-0 my-7'>
                                <Link to='/myOrder' className='text-white hover:text-gray-200 duration-500'>My orders</Link>
                            </li> : ""
                        }
                    </div>
                    {
                        (localStorage.getItem('token') || loggedInUser.success) ?
                            <div className='md:flex items-center'>
                                <li type="button" className='md:ml-8 text-md font-semibold cursor-pointer md:my-0 my-7 bg-white p-2 w-fit rounded'>
                                    <p onClick={openModal} className='text-emerald-400 hover:text-gray-400 duration-500'>My cart</p>
                                    <p className="absolute md:top-1.5 top-[130px] bg-red-600 text-white py-0.25 px-[8px] md:ml-10 max-md:left-0 max-md:ml-24 rounded-xl">{cartState.length}</p>
                                    <CartModal modalIsOpen={modalIsOpen} closeModal={closeModal}></CartModal>
                                </li>
                                <li type="button" onClick={handleLogout} className='md:ml-4 text-md font-semibold md:my-0 my-7 bg-white p-2 w-fit rounded'>
                                    <Link to='/login' className='text-red-600 hover:text-gray-400 duration-500'>Logout</Link>
                                </li>
                            </div>
                            :
                            <div className='md:flex items-center'>
                                <li type="button" className='md:ml-8 text-md font-semibold md:my-0 my-7 bg-white p-2 w-fit rounded'>
                                    <Link to='/login' className='text-emerald-400 hover:text-gray-400 duration-500'>Login</Link>
                                </li>
                                <li type="button" className='md:ml-4 text-md font-semibold md:my-0 my-7 bg-white p-2 w-fit rounded'>
                                    <Link to='/signUp' className='text-emerald-400 hover:text-gray-400 duration-500'>SignUp</Link>
                                </li>
                            </div>
                    }

                </ul>

            </div>

        </nav>
    );
};

export default Navbar;