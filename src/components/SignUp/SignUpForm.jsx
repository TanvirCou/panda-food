import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faAt, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPass, initializeLoginFramework } from "../LoginManager/LoginManager";

initializeLoginFramework();

const SignUpForm = () => {

    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agree: false,
        error: '',
        success: false
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [pass, setPass] = useState('');

    // eslint-disable-next-line no-unused-vars
    const [agree, setAgree] = useState(false);

    const navigate = useNavigate();

    let pass1, pass2;

    const handleBlur = (e) => {
        let formValid = true;
        const newError = { ...errors };

        if (e.target.name === 'name') {
            formValid = e.target.value.length > 2;

            if (!formValid) {
                newError[e.target.name] = 'Name is not valid';
                setErrors(newError);
            } else {
                newError[e.target.name] = '';
                setErrors(newError);
            }
        }

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

            pass1 = e.target.value;

            if (!formValid) {
                newError[e.target.name] = 'Password is not valid';
                setErrors(newError);
            } else {
                newError[e.target.name] = '';
                setErrors(newError);
            }
            setPass(pass1);
        }

        if (e.target.name === 'confirmPassword') {
            pass2 = e.target.value;

            if (pass !== pass2) {
                newError[e.target.name] = 'Password is not matched';
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


    const handleSubmit = (e) => {
        e.preventDefault();
        if (user.name && user.email && user.password) {
            createUserWithEmailAndPass(user.name, user.email, user.password)
                .then(res => {
                    if (res.success) {
                        setUser(res);
                        alert("Check your email for verification");
                        navigate('/login');
                    }
                    if (!res.success) {
                        res.error = '**This email is already used**'
                        setUser(res);
                    }
                })
        }
        e.preventDefault();
    };

    return (
        <form action="" className='py-6 md:px-6 px-2' onSubmit={(e) => handleSubmit(e)} >
            <div className='md:mx-5 lg:mt-5 mt-3 flex justify-end items-center'>
                <input type="text" name="name" placeholder='Enter name' onBlur={handleBlur} required className='w-full h-10 shadow-md rounded-md  placeholder:text-gray-400 placeholder:pl-1 placeholder:font-medium focus:outline-emerald-600 focus:px-2 p-2' />
                <span className="absolute p-2"><FontAwesomeIcon icon={faUser} /></span>
            </div>
            {errors.name.length > 0 && <p className="bg-red-400 font-semibold mx-5 mt-2 py-1 rounded-md text-center">{errors.name}</p>}

            <div className='md:mx-5 mt-5 flex justify-end items-center'>
                <input type="email" name="email" placeholder='Enter email' onBlur={handleBlur} required className='w-full h-10 shadow-md rounded-md placeholder:text-gray-400 placeholder:pl-1 placeholder:font-medium focus:outline-emerald-400 focus:px-2 p-2' />
                <span className="absolute p-2"><FontAwesomeIcon icon={faAt} /></span>
            </div>
            {errors.email.length > 0 && <p className="bg-red-400 font-semibold mx-5 mt-2 py-1 rounded-md text-center">{errors.email}</p>}

            <div className='md:mx-5 mt-5 flex justify-end items-center'>
                <input type="password" name="password" placeholder='Enter password' onBlur={handleBlur} required className='w-full h-10 shadow-md rounded-md placeholder:text-gray-400 placeholder:pl-1 placeholder:font-medium focus:outline-emerald-600 focus:px-2 p-2' />
                <span className="absolute p-2"><FontAwesomeIcon icon={faLock} /></span>
            </div>
            {errors.password.length > 0 && <p className="bg-red-400 font-semibold mx-5 mt-2 py-1 rounded-md text-center">{errors.password}</p>}

            <div className='md:mx-5 mt-5 flex justify-end items-center'>
                <input type="password" name="confirmPassword" placeholder='Confirm password' onBlur={handleBlur} required className='w-full h-10 shadow-md rounded-md placeholder:text-gray-400 placeholder:pl-1 placeholder:font-medium focus:outline-emerald-600 focus:px-2 p-2' />
                <span className="absolute p-2"><FontAwesomeIcon icon={faLock} /></span>
            </div>
            {errors.confirmPassword.length > 0 && <p className="bg-red-400 font-semibold mx-5 mt-2 py-1 rounded-md text-center">{errors.confirmPassword}</p>}

            <div className='mt-5 md:ml-5'>
                <input type="checkbox" onChange={(e) => setAgree(e.target.checked)} required name="agree" id="" />
                <span className='text-gray-600 pl-2 font-medium'>I agree to the Terms &amp; Conditions</span>
            </div>

            <div className='my-2 md:mx-5'>
                <button type='submit' className='w-full h-12 shadow-md rounded-md bg-emerald-400 hover:bg-emerald-500'>
                    <span className='text-gray-700 font-semibold'>SUBMIT NOW</span>
                </button>
            </div>

            {user.error.length > 0 && <p className='bg-red-400 font-semibold mx-5 mt-2 py-2 rounded-md text-center'>{user.error}</p>}

            <div className='text-center text-gray-600 font-medium mt-2'>
                Already have an account? <Link to="/login" className='text-blue-600'>Login</Link> instead.
            </div>
        </form>
    );
};

export default SignUpForm;