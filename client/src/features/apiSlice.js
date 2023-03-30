import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
    reducerPath: "usersApi",
    baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:3000/api/` }),
    tagTypes: ["Users"],
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => ({
                url: "users",
                method: "GET",
                headers: {
                    access_token: localStorage.getItem("access_token"),
                },
            }),
            providesTags: ["Users"],
        }),
        getCurrentUser: builder.query({
            query: () => ({
                url: "users/current",
                method: "GET",
                headers: {
                    access_token: localStorage.getItem("access_token"),
                },
            }),
        }),
        getUserById: builder.query({
            query: (id) => ({
                url: `users/${id}`,
                method: "GET",
                headers: {
                    access_token: localStorage.getItem("access_token"),
                },
            }),
            providesTags: ["Users"],
        }),
        addUser: builder.mutation({
            query: (user) => ({
                url: "users",
                method: "POST",
                body: user,
            }),
            invalidatesTags: ["Users"],
        }),
        deleteUser: builder.mutation({
            query: ({ id }) => ({
                url: `users/${id}`,
                method: "DELETE",
                headers: {
                    access_token: localStorage.getItem("access_token"),
                },
            }),
            invalidatesTags: ["Users"],
        }),
    }),
});

export const { useGetAllUsersQuery, useGetCurrentUserQuery, useGetUserByIdQuery, useAddUserMutation, useDeleteUserMutation } = usersApi;
