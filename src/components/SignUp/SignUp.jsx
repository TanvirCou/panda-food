import signupImage from '../../assets/images/signup.svg'
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import SignUpForm from './SignUpForm';

const SignUp = () => {
    return (
        <div className='bg-gray-100 pt-20'>
            <Navbar></Navbar>
            <div className='px-12 py-6 h-screen'>
                <p className='text-2xl font-bold lg:text-left xl:ml-20 lg:ml-12 md:text-center sm:text-center min-[320px]:text-center' data-aos="fade-right" data-aos-duration="2000">Create an account</p>
                <div className='flex'>
                    <div className='lg:w-1/2 lg:block md:hidden sm:hidden min-[320px]:hidden' data-aos="fade-right" data-aos-duration="2000">
                        <img src={signupImage} alt="" className='w-2/3 pt-16 pl-8' />
                    </div>
                    <div className='lg:w-1/2 md:w-full sm:w-full min-[320px]:w-full' data-aos="fade-left" data-aos-duration="2000">
                        <SignUpForm></SignUpForm>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default SignUp;