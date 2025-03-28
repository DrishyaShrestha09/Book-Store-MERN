import React, { useState } from 'react'
import { useForm } from "react-hook-form";

import axios from "axios"
import getBaseUrl from '../utils/baseURL';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const navigate = useNavigate()

    const [message, setMessage] = useState("")

    const onSubmit = async (data) => {
        console.log(data)
        try {
          const response = await axios.post(`${getBaseUrl()}/api/auth/admin`, data, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          const auth = response.data;
          console.log(auth)
          if(auth.token) {
            localStorage.setItem('token', auth.token);
            setTimeout(() => {
                localStorage.removeItem('token')
                alert("Token has been expired, Please Login again");
                navigate("/")
            }, 3600 * 1000)
          }

          alert("Admin login successfull!")
          navigate("/dashboard")

        } catch (error) {
          setMessage("Please provide valid email and password")
          console.error(error)
        }
      }

  return (
    <div>
      <h1 className='h-screen flex justify-center items-center'>
        <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <h2 className='text-xl font-semibold mb-4'>Admin Login Dashboard</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="username">Username</label>
                    <input 
                    {...register("username", { required: true })}
                    type="text" name='username' placeholder='User Name' className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow' />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">Password</label>
                    <input 
                    {...register("password", { required: true })}
                    type="password" name='password' placeholder='Password' className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow' />
                </div>
                {
                  message && <p className='text-red-700 text-xs italic mb-3'>{message}</p>
                }
                <div>
                    <button className='bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none'>Login</button>
                </div>
            </form>
            
            <p className='mt-5 text-center text-gray-500 text-xs'>@2025 Book Store. All rights reserved.</p>
        </div>
      </h1>
    </div>
  )
}

export default AdminLogin
