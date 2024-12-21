import { useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [isSignup, setIsSignup] = useState(false);

    const signupHandler = async(e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:3000/api/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, email, password})
        })

        const data = await response.json();

        if(data.success){
            toast.success(data.message);
            setIsSignup(true);
        }
        else{
            toast.error(data.message);
        }
    }

    return(
        <div className="flex justify-center items-center h-screen bg-[#2E86AB] nunito-lol">
            <div className="bg-[#FAFAFF] w-full max-w-md p-8 rounded-lg">
                <form className="text-[#212738]" onSubmit={signupHandler}>
                    <h2 className="text-4xl mb-4 ml-32 varela-round-regular">SIGN-UP</h2>

                    <label className="block mb-2 mt-9">Name</label>
                    <input type='text' className="w-full px-3 py-2 mb-4 bg-[#A9EDFF] border-2 border-[#14BDEB] rounded-lg focus:outline-none focus:border-blue-500 text-[#084B5E] placeholder-[#084B5E] opacity-65" onChange={(e) => setName(e.target.value)} placeholder="Jack Sperrow"></input>

                    <label className="block mb-2">Email</label>
                    <input type='email' className="w-full px-3 py-2 mb-4 bg-[#A9EDFF] border-2 border-[#14BDEB] rounded-lg focus:outline-none focus:border-blue-500 text-[#084B5E] placeholder-[#084B5E] opacity-65" onChange={(e) => setEmail(e.target.value)} placeholder="jack@abc.com"></input>

                    <label className="block mb-2">Password</label>
                    <input type='password' className="w-full px-3 py-2 mb-4 bg-[#A9EDFF] border-2 border-[#14BDEB] rounded-lg focus:outline-none focus:border-blue-500 text-[#084B5E] placeholder-[#084B5E] opacity-65" onChange={(e) => setPassword(e.target.value)} placeholder="**********"></input>

                    <button type="submit" className="w-full mt-7 mb-5 py-2 px-4 bg-[#2E86AB] text-white rounded-lg focus:outline-none font-bold">Signup</button>
                    {
                        isSignup ? <Navigate to='/login' /> : <></>
                    }
                </form>
                <p className='text-[#525252] ml-24'>Already have an account? <span className=' text-[#468CF7] hover:cursor-pointer'><NavLink to='/login'>Login</NavLink></span></p>
            </div>
        </div>
    );
}

export default Signup;