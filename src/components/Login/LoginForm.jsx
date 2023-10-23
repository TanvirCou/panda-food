import { faAt, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { resetPassword, signInWithEmailAndPass } from '../LoginManager/LoginManager';
import { useUserState } from '../ContextProvider/ContextProvider';

const LoginForm = () => {
    // eslint-disable-next-line no-unused-vars
    const [loggedInUser, setLoggedInUser] = useUserState();
    const [user, setUser] = useState({
        isSignedIn: false,
        email: '',
        password: '',
        error: '',
        success: false
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleBlur = (e) => {
        let formValid = true;
        const newError = { ...errors };

        if (e.target.name === 'email') {
            formValid = /^\S+@\S+\.\S+$/.test(e.target.value);

            if (!formValid) {
                newError[e.target.name] = 'Email is not valid';
                setErrors(newError);
            } else {
                newError[e.target.name] = '';
                setErrors(newError);
            }
        }

        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 7;
            const passwordHasNumber = /\d{1}/.test(e.target.value);

            formValid = isPasswordValid && passwordHasNumber;

            if (!formValid) {
                newError[e.target.name] = 'Password should be bigger than 7 words and include a number';
                setErrors(newError);
            } else {
                newError[e.target.name] = '';
                setErrors(newError);
            }
        }

        if (formValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user.email && user.password) {
            await signInWithEmailAndPass(user.email, user.password)
                .then(res => {
                    if (!res.email && !res.success) {
                        res.error = '**Email or password is incorrect**';
                        res.success = false;
                        setUser(res);
                        setLoggedInUser(res);
                    }
                    if (res.email && !res.emailVerified) {
                        res.error = '**A verification message was sent to your email.You can verify your email from there**';
                        res.success = false;
                        alert("Check your email for verification");
                        setUser(res);
                        setLoggedInUser(res);
                    }
                    if (res.emailVerified && res.email && res.success) {
                        res.success = true;
                        setUser(res);
                        setLoggedInUser(res);
                        localStorage.setItem('email', res.email);
                        navigate('/');
                    }
                })
        }

    };

    const handleResetPassword = () => {
        resetPassword(user.email);
        alert('Check your email for setting new password');
    };


    return (
        <form action="" onSubmit={handleSubmit} className='p-6 mt-8'>
            <div className='mx-5 flex justify-end items-center'>
                <input type="email" name="email" placeholder='Enter email' onBlur={handleBlur} required className='w-full h-10 shadow-md rounded-md placeholder:text-gray-400 placeholder:pl-1 placeholder:font-medium focus:border-emerald-400 focus:outline-emerald-600 focus:px-2 p-2' />
                <span className="absolute p-2"><FontAwesomeIcon icon={faAt} /></span>
            </div>
            {errors.email.length > 0 && <p className='bg-red-400 font-semibold mx-5 mt-2 py-1 rounded-md text-center'>{errors.email}</p>}

            <div className='mx-5 mt-5 flex justify-end items-center'>
                <input type="password" name="password" placeholder='Enter password' onBlur={handleBlur} required className='w-full h-10 shadow-md rounded-md placeholder:text-gray-400 placeholder:pl-1 placeholder:font-medium focus:outline-emerald-600 focus:px-2 p-2' />
                <span className="absolute p-2"><FontAwesomeIcon icon={faLock} /></span>
            </div>
            {errors.password.length > 0 && <p className="bg-red-400 font-semibold mx-5 mt-2 py-1 rounded-md text-center">{errors.password}</p>}

            <div className='ml-6 mt-2 mb-4'>
                <p onClick={handleResetPassword} className='text-sm cursor-pointer text-red-600 font-semibold'>Forgot Password?</p>
            </div>

            <div className='my-2 mx-5'>
                <button type='submit' className='w-full h-12 shadow-md rounded-md bg-emerald-400 hover:bg-emerald-500'>
                    <span className='text-gray-700 font-semibold'>SUBMIT NOW</span>
                </button>
            </div>

            {user.error.length > 0 && <p className='bg-red-400 font-semibold mx-5 mt-2 py-2 rounded-md text-center'>{user.error}</p>}

            <div className='text-center text-gray-600 font-medium mt-2'>
                Don&apos;t have an account? <Link to="/signup" className='text-blue-600'>SignUp</Link> instead.
            </div>
        </form>
    );
};

export default LoginForm;