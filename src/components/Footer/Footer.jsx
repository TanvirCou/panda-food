
const Footer = () => {

    return (
        <div className='py-6'>
            <hr className='border border-gray-300'/>
            <p className="text-center text-md font-semibold text-gray-500">&#169; {new Date().getFullYear()}, NoOne</p>
        </div>
    );
};

export default Footer;