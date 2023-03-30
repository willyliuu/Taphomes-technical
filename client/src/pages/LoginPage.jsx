import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function LoginPage() {
    const navigate = useNavigate();
    const [inputUser, setInputUser] = useState({
        email: "",
        password: "",
    });
    const handleLoginInput = (e) => {
        setInputUser({
            ...inputUser,
            [e.target.name]: e.target.value,
        });
    };

    const handleLoginForm = async (e) => {
        try {
            e.preventDefault();
            const { data } = await axios({
                method: "POST",
                url: `http://localhost:3000/api/login`,
                data: inputUser,
            });
            localStorage.setItem("access_token", data.access_token);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="bg-white h-screen w-screen flex justify-center items-center">
            <div className="px-6 py-3 rounded border w-80">
                <div className="flex flex-col items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <h2 className="text-2xl font-bold">Login</h2>
                </div>
                <form onSubmit={handleLoginForm} action="#" method="POST">
                    <div className="flex flex-col my-2">
                        <label className="text-xs text-gray-400">Email</label>

                        <input onChange={handleLoginInput} name="email" className="border rounded px-3 py-1 mt-2" type="email" />
                    </div>
                    <div className="flex flex-col my-2">
                        <label className="text-xs text-gray-400">Password</label>
                        <input onChange={handleLoginInput} name="password" className="border rounded px-3 py-1 mt-2" type="password" />
                    </div>
                    <div className="flex flex-col items-center justify-center my-3">
                        <button type="submit" className="my-3 py-1 w-full rounded bg-blue-600 text-white hover:bg-blue-700 hover:text-gray-300">
                            Sign In
                        </button>
                    </div>
                    <div>
                        Don't have an account?{" "}
                        <span className="text-red-500 cursor-pointer" onClick={() => navigate("/register")}>
                            Sign Up
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
