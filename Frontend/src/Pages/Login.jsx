import React, { useState } from 'react'

function Login() {

    const [userdetails, set_userdetails] = useState({ email: "", password: "" })
    const [error, set_error] = useState("")
    const [flag, set_flag] = useState(false);
    function HandleChange(e, name) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        console.log(e.target.value);
        if (name === "email") {
            if (emailRegex.test(e.target.value)) {
                set_error("")
                set_userdetails({...userdetails,email:e.target.value})
                set_flag(true)
            }
            else {
                set_error(name)
                set_userdetails({ ...userdetails, email: "" })
                set_flag(false)
            }
        }
        if (name === "password") {

            if (e.target.value.length >=8 && name === "password") {
                set_userdetails({...userdetails,password:e.target.value})
                set_error("")
                set_flag(true)
            }
            else {
                set_error(name)
                set_userdetails({ ...userdetails, password: "" })
                set_flag(false)
            }
        }
    }
    
    
    async function HandleSubmit(e) {
        e.preventDefault();
        console.log(userdetails)
        // console.log(flag);

        // if (!flag) {
        //     e.preventDefault()
        // }
        // try{
            let res=await fetch("http://localhost:5002/",{
                method:'POST',
                headers:{
                    "Content-Type":"applicatsion/json",
                },
                "body":JSON.stringify(userdetails)
            })
            console.log(userdetails)
            if(!res.ok){
                console.log("no data retrived");
            }

            let data_user=await res.json();
            console.log(data_user);
            if(!data_user.message){
                alert("login successful");                                
            }
            else{
                alert(data_user.message);
            }
        // }
        // // catch(err){
        // //     console.error(err);
        // // }


    }


    return (
        <div className="flex flex-col  ">
            <p className="text-2xl pt-3 pb-3 font-semibold text-white w-full text-center  px-5 bg-blue-600 ">Login</p>

            <form action='/login' method='POST' className='mt-4' onSubmit={(e)=>HandleSubmit(e)}>
                <div className="flex flex-col mx-5 mt-5 gap-2 text-xl">
                    <label htmlFor="email" className="text-xl font-semibold ">Email</label>
                    <input type="text" id='email' placeholder="Enter your email" required className='rounded-xl px-3 text-lg py-2   shadow-inner' onChange={(e) => { HandleChange(e, "email") }} />
                    {error && error === "email" ? <p>invalid email</p> : <></>}
                </div>
                <div className="flex flex-col mx-5 mt-5 gap-2 ">
                    <label htmlFor="password" className="text-xl font-semibold ">Password</label>
                    <input type="password" id="password" placeholder="Enter your password" required className='rounded-xl px-3 text-lg py-2   shadow-inner' onChange={(e) => { HandleChange(e, "password") }} />
                    {error && error === "password" ? <p>Length should be greater than 8</p> : <></>}
                </div>
                <button type="submit" className='m-auto flex mt-8 bg-blue-600 px-4 py-1 text-xl font-medium rounded-lg text-white'>Submit</button>
            </form>
        </div>
    )
}

export default Login