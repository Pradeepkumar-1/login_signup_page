import React from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'

export default function Template() {
    const navigate=useNavigate();
    const location=useLocation()
  return (
    <div className=" w-[400px] bg-gradient-to-t from-blue-200 to-blue-100 border-2 border-gray-400 rounded m-auto mt-14 pb-4">
        <div className=" w-full"> <Outlet /></div>
        {location.pathname==='/'?<p className="text-base text-blue-800 m-auto flex justify-center gap-2 mt-2">Don't Have a account? <span className="font-semibold  "><Link to="/signup">SignUp</Link></span> </p>:<p className="text-lg text-blue-800 m-auto flex justify-center gap-2 mt-2">Already Have a account? <span className="font-semibold"><Link to="/">Login</Link></span> </p>}     
    </div>
  )
}
