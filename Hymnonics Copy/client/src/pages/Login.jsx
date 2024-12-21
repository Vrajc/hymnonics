import { useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = ({setIsLoggedIn, setUser, isLoggedIn, setToken}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const LoginHandler = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        
        const data = await response.json();

        if(data.success){
            toast.success(data.message);
            setIsLoggedIn(true);
            setToken(data.token);
            setUser(data.user);
        }
        else{
            toast.error(data.message);
        }
    };

    return(
        <div className="flex justify-center items-center h-screen bg-[#2E86AB] nunito-lol">
            <div className="bg-[#FAFAFF] w-full max-w-md p-8 rounded-lg">
                <form onSubmit={LoginHandler} className="text-[#212738]">
                    <h2 className="text-4xl mb-4 ml-32 varela-round-regular">LOGIN</h2>

                    <label className="block mb-2 mt-9">Email</label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 mb-4 bg-[#A9EDFF] border-2 border-[#14BDEB] rounded-lg focus:outline-none focus:border-blue-500 text-[#084B5E] placeholder-[#084B5E] opacity-65"  placeholder="abc@gmail.com"></input>

                    <label className="block mb-2">Password</label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 mb-4 bg-[#A9EDFF] border-2 border-[#14BDEB] rounded-lg focus:outline-none focus:border-blue-500 text-[#084B5E] placeholder-[#084B5E] opacity-65" placeholder="***********"></input>

                    <button type="submit" className="w-full mt-7 mb-5 py-2 px-4 bg-[#2E86AB] text-white rounded-lg focus:outline-none font-bold">Login</button>

                    {isLoggedIn ? <Navigate to='/' /> : <></>}
                </form>
                <p className='text-[#525252] ml-24'>Don’t have account? <span className=' text-[#468CF7] hover:cursor-pointer'><NavLink to='/signup'>Signup</NavLink></span></p>
            </div>
        </div>
    );
}

export default Login; 