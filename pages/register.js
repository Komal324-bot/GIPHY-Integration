import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import {auth} from "../Firebase/firebase"
import {
    createUserWithEmailAndPassword,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";

const Provider = new GoogleAuthProvider();

const RegisterForm = () => {
    const [username, setUsername]= useState(null);
    const [email, setEmail]=useState(null);
    const [password, setPassword]= useState(null);

    const singupHandler= async ()=>{
        if (!email || !password || !username) return;
        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            await updateProfile(auth.currentUser, {
                displayName: username,
            });
            console.log(user);
        } catch (error) {
            console.log("error",error)
        }
    }

    const signInWithGoogle = async () => {
        const user = await signInWithPopup(auth, Provider);
        console.log(user);
    };
    return (
        <main className="flex lg:h-[100vh]">
            <div className="w-full lg:w-[60%] p-8 md:p-14 flex items-center justify-center lg:justify-start">
                <div className="p-8 w-[600px]">
                    <h1 className="text-6xl font-semibold">Sign Up</h1>
                    <p className="mt-6 ml-1">
                        Already have an account ?{" "}
                        <span className="underline hover:text-blue-400 cursor-pointer">
                            Login
                        </span>
                    </p>

                    <div className="bg-black/[0.05] text-white w-full py-4 mt-10 rounded-full transition-transform hover:bg-black/[0.8] active:scale-90 flex justify-center items-center gap-4 cursor-pointer group">
                        <FcGoogle size={22} />
                        <span className="font-medium text-black group-hover:text-white"  onClick={signInWithGoogle}>
                            Login with Google
                        </span>
                    </div>
                    <form onSubmit={(e)=>e.preventDefault()}>
                            <div className="mt-10 pl-1 flex flex-col">
                        <label>Name</label>
                        <input
                            type="text"
                            className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                            required
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mt-10 pl-1 flex flex-col">
                        <label>Email</label>
                        <input
                            type="email"
                            className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mt-10 pl-1 flex flex-col">
                        <label>Password</label>
                        <input
                            type="password"
                            className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="bg-black text-white w-44 py-4 mt-10 rounded-full transition-transform hover:bg-black/[0.8] active:scale-90"
                    onClick={singupHandler}>
                        Sign Up
                    </button>
            </form>
                    
                </div>
            </div>
            <div
                className="w-[40%] bg-slate-400 bg-cover bg-right-top hidden lg:block"
                style={{
                    backgroundImage: "url('/login-banner.jpg')",
                }}
            ></div>
        </main>
    );
};

export default RegisterForm;
