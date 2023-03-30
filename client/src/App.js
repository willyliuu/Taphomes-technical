import { RouterProvider } from "react-router";
import "./App.css";
import router from "./router";
import { Provider } from "react-redux";
import { store } from "./store";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { usersApi } from "./features/apiSlice";

function App() {
    return (
        <Provider store={store}>
            <ApiProvider api={usersApi}>
                <div className="App">
                    <RouterProvider router={router} />
                </div>
            </ApiProvider>
        </Provider>
    );
}

export default App;
