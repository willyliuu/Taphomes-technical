import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDeleteUserMutation, useGetAllUsersQuery } from "../features/apiSlice";
import axios from "axios";

function HomePage() {
    const navigate = useNavigate();
    const { data, isLoading: fetchAllUsersLoading } = useGetAllUsersQuery();
    const [deleteUser] = useDeleteUserMutation();
    const [currentUser, setCurrentUser] = useState();
    const [fetchCurrentUserLoading, setFetchCurrentUserLoading] = useState(true);
    const handleLogout = () => {
        localStorage.removeItem("access_token");
        navigate("/login");
    };

    const handleDeleteUser = (id) => {
        deleteUser({ id: id });
    };

    useEffect(() => {
        (async () => {
            const { data } = await axios({
                method: "GET",
                url: "http://localhost:3000/api/users/current",
                headers: {
                    access_token: localStorage.getItem("access_token"),
                },
            });
            await setCurrentUser(data);
            setFetchCurrentUserLoading(false);
        })();
    }, []);

    if (fetchAllUsersLoading && fetchCurrentUserLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-white p-8 rounded-md w-full">
            <div className=" flex items-center justify-between pb-6">
                <div>
                    <h2 className="text-gray-600 font-semibold">List Of Users</h2>
                </div>
                <div className="flex items-center justify-between">
                    <div className="lg:ml-40 ml-10 space-x-8">
                        <button onClick={handleLogout} className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                            Log Out
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Created at</th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Updated at</th>
                                    {currentUser?.role === "admin" ? <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th> : null}
                                </tr>
                            </thead>
                            <tbody>
                                {data &&
                                    data?.map((el, i) => {
                                        return (
                                            <tr key={`table row ${i}`}>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <div className="flex items-center">
                                                        <p className="text-gray-900 whitespace-no-wrap text-left">{el.firstName + " " + el.lastName}</p>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap text-left">{el.role}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap text-left">{new Date(el.createdAt).toISOString().split("T")[0]}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap text-left">{new Date(el.updatedAt).toISOString().split("T")[0]}</p>
                                                </td>

                                                {currentUser?.role === "admin" ? (
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <div className="cursor-pointer relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight" onClick={() => handleDeleteUser(el.id)}>
                                                            <span aria-hidden className="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
                                                            <span className="relative">Delete</span>
                                                        </div>
                                                    </td>
                                                ) : null}
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
