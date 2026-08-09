import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, resetRegisterState } from "../redux/authSlice.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth.register);

    //  clena u function jab regsiter page unmount menas page hatoge regsietr page se to fir ye chalega
    useEffect(() => {
        return () => {
            dispatch(resetRegisterState());

        }

    }, [dispatch])



    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        avatar: null
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        const data = new FormData();

        data.append("username", formData.username);
        data.append("email", formData.email);
        data.append("password", formData.password);
        data.append("avatar", formData.avatar);
        try {
            await dispatch(registerUser(data)).unwrap();
            navigate("/login", { replace: true })   // browser history me add nhi karta  hai smjhe 


        } catch (error) {
            console.log(error)
        }


    };

    return (
        <div className="max-w-md mx-auto p-4">

            <h1 className="text-xl font-semibold mb-4">
                Register
            </h1>

            {
                error && (
                    <p className="text-red-500 mb-3">
                        {error}

                    </p>
                )
            }

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="username"
                    placeholder="Enter Username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full border p-2 mb-3 rounded"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border p-2 mb-3 rounded"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border p-2 mb-3 rounded"
                />

                <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={handleChange}
                    className="w-full border p-2 mb-3 rounded"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black text-white py-2 rounded"
                >
                    {loading ? "Registering.." : "Register"}
                </button>


            </form>
            <p className="mt-3 text-center">
                Already have an account?{" "}
                <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="underline"
                >
                    Login
                </button>
            </p>


        </div>
    );
}

export default Register;