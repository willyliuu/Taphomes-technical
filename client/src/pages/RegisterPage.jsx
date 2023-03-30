import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAddUserMutation } from "../features/apiSlice";

function RegisterPage() {
    const navigate = useNavigate();
    const [addUser] = useAddUserMutation();
    const [registerInput, setRegisterInput] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const handleRegisterInput = (e) => {
        setRegisterInput({
            ...registerInput,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegisterForm = (e) => {
        try {
            e.preventDefault();
            console.log(registerInput);
            addUser(registerInput);
            navigate("/login");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <div className="bg-white h-screen w-screen flex justify-center items-center">
                <div className="px-6 py-3 rounded border w-80">
                    <div className="flex flex-col items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <h2 className="text-2xl font-bold">Register</h2>
                    </div>
                    <form onSubmit={handleRegisterForm} action="#" method="POST">
                        <div className="flex flex-col my-2">
                            <label className="text-xs text-gray-400">First Name</label>

                            <input onChange={handleRegisterInput} name="firstName" className="border rounded px-3 py-1 mt-2" type="text" />
                        </div>
                        <div className="flex flex-col my-2">
                            <label className="text-xs text-gray-400">Last Name</label>

                            <input onChange={handleRegisterInput} name="lastName" className="border rounded px-3 py-1 mt-2" type="text" />
                        </div>
                        <div className="flex flex-col my-2">
                            <label className="text-xs text-gray-400">Email</label>

                            <input onChange={handleRegisterInput} name="email" className="border rounded px-3 py-1 mt-2" type="email" />
                        </div>
                        <div className="flex flex-col my-2">
                            <label className="text-xs text-gray-400">Password</label>
                            <input onChange={handleRegisterInput} name="password" className="border rounded px-3 py-1 mt-2" type="password" />
                        </div>
                        <div className="flex flex-col items-center justify-center my-3">
                            <button type="submit" className="my-3 py-1 w-full rounded bg-blue-600 text-white hover:bg-blue-700 hover:text-gray-300">
                                Sign Up
                            </button>
                        </div>
                        <div>
                            Already have an account?{" "}
                            <span className="text-red-500 cursor-pointer" onClick={() => navigate("/login")}>
                                Sign In
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
