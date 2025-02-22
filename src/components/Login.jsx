import { useContext } from 'react';
import google from '../assets/google-removebg-preview.png';
import { authContext } from '../provider/AuthContext';
import { useNavigate } from 'react-router-dom';
const Login = () => {

    const {googleLogin} = useContext(authContext);
    const navigate = useNavigate()

    const handleLogin = () => {
        googleLogin()
        .then(result => {
            console.log(result.user);
            navigate("/dashboard/myTask")
        })
    }


    return (
        <>
            <div className="flex flex-col justify-center items-center mt-20">
                <h2 className="text-4xl font-semibold">Welcome to Task Hub!🚀 </h2>
                <p className="max-w-xl text-center text-gray-600 text-lg py-4">Log in to take control of your tasks, boost productivity, and turn your goals into accomplishments. Let’s get things done! </p>
                <button onClick={handleLogin} className="btn py-6 text-xl">Login with google <img className='w-8 h-8' src={google} alt="" /></button>
                
            </div>
        </>
    );
};

export default Login;