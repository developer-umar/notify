import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, resetLoginState } from '../redux/authSlice.js';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth.login);
    const navigate = useNavigate();

    useEffect(()=>{

        return()=>{
            dispatch(resetLoginState())
            
        }

    },[dispatch])





    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => (

            { ...prev, [name]: value }
        ))


    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await dispatch(loginUser(formData)).unwrap()
            navigate('/', { replace: true });



        } catch (error) {
            console.log(error)

        }

    }

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-xl font-semibold mb-4">
                Login
            </h1>

            {error && (
                <p className="text-red-500 mb-3">
                    {error}
                </p>
            )}

            <form onSubmit={handleSubmit}>

                <input
                    name='email'
                    type='email'
                    placeholder='Enter email'
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border p-2 mb-3 rounded"

                />

                <input
                    name='password'
                    type='password'
                    placeholder='Enter password'
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border p-2 mb-3 rounded"


                />

                <button
                    type='submit'
                    disabled={loading}
                    className="w-full bg-black text-white py-2 rounded"
                >

                    {loading ? "logging In .." : "Login "}


                </button>


            </form>

            <p className="mt-3 text-center">
                Don't have an account?{" "}
                <button
                    type="button"
                    onClick={() => navigate("/register")}
                    className="underline"
                >
                    Register
                </button>
            </p>




        </div>
    )
}

export default Login
