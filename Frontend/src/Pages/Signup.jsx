import React, { useEffect, useState } from 'react'

function Signup() {
    const [userdetails, set_userdetails] = useState({ email: "", password: "", username: "" })
    const [error, set_error] = useState("")
    const [flag, set_flag] = useState(false);

    // useEffect(()=>{
    //     try{
    //         fetch('http://localhost:5002/signup')
    //     }
    // },[])


    function HandleChange(e, name) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        console.log(e.target.value);
        if (name === "email") {
            if (emailRegex.test(e.target.value)) {
                set_error("")
                set_userdetails({ ...userdetails, email: e.target.value })
                set_flag(true)
            }
            else {
                set_error(name)
                set_userdetails({ ...userdetails, email: "" })
                set_flag(false)
            }
        }
        if (name === "password") {

            if (e.target.value.length >= 8 && name === "password") {
                set_userdetails({ ...userdetails, password: e.target.value })
                set_error("")
                set_flag(true)
            }
            else {
                set_error(name)
                set_userdetails({ ...userdetails, password: "" })
                set_flag(false)
            }
        }
        if (name === "repassword") {

            if (e.target.value === userdetails.password && name === "repassword") {

                set_error("")
                set_flag(true)
            }
            else {
                console.log(e.target.value, userdetails.password)
                set_error(name)
                set_flag(false)
                // set_userdetails({ ...userdetails, repassword: "" })
            }
        }

        if (name === "username") {

            if (e.target.value.length >= 8 && name === "username") {
                set_userdetails({ ...userdetails, username: e.target.value })
                set_error("")
                set_flag(true)
            }
            else {
                set_error(name)
                set_userdetails({ ...userdetails, username: "" })
                set_flag(false)
            }
        }

    }
    const [Message,setMessage]=useState();
    async function HandleSubmit(e) {
        // e.preventDefault();
        // console.log(userdetails)
        // console.log(flag);

        // if (!flag) {
        //     e.preventDefault()
        // }
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5002/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userdetails)
            });

            const data = await response.json();
            setMessage(data.message);
            // console.log(Message);

            if (response.ok) {
                alert("Signup successful!");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    


    return (
        <div className="flex flex-col  ">
            <p className="text-2xl pt-3  pb-3 font-semibold text-white w-full text-center  px-5 bg-blue-600">Signup</p>

            <form action='/login' method='POST' className='' onSubmit={(e) => HandleSubmit(e)}>
                <div className="flex flex-col mx-5 mt-4 gap-2 text-xl  ">
                    <label htmlFor="username" className="text-xl font-semibold ">UserName</label>
                    <input type="text" id='username' required placeholder="Enter your username" className='rounded-xl px-3 text-lg py-2   shadow-inner' onChange={(e) => { HandleChange(e, "username") }} />
                    {error && error === "username" ? <p>username lenght greater than 8</p> : <></>}
                </div>
                <div className="flex flex-col mx-5 mt-2 gap-2 text-xl">
                    <label htmlFor="email" className="text-xl font-semibold ">Email</label>
                    <input type="email" id='email' required placeholder="Enter your email" className='rounded-xl px-3 text-lg py-2   shadow-inner' onChange={(e) => { HandleChange(e, "email") }} />
                    {error && error === "email" ? <p>invalid email</p> : <></>}
                </div>
                <div className="flex flex-col mx-5 mt-2 gap-2 text-xl">
                    <label htmlFor="password" className="text-xl font-semibold ">Password</label>
                    <input type="password" id='password' required placeholder="Enter your password" className='rounded-xl px-3 text-lg py-2   shadow-inner' onChange={(e) => { HandleChange(e, "password") }} />
                    {error && error === "password" ? <p>password lenght greater than 8</p> : <></>}
                </div>
                <div className="flex flex-col mx-5 mt-2 gap-2 ">
                    <label htmlFor="re-password" className="text-xl font-semibold ">Confirm Password</label>
                    <input type="password" id="re-password" required placeholder="confirm password" className='rounded-xl px-3 text-lg py-2   shadow-inner' onChange={(e) => { HandleChange(e, "repassword") }} />
                    {error && error === "repassword" ? <p>password does not match</p> : <></>}
                </div>
                <button type="submit" className='m-auto flex mt-8 bg-blue-600 px-4 py-1 text-xl font-medium rounded-lg text-white'>Submit</button>
            </form>
        </div>
    )
}

export default Signup