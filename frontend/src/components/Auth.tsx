import { SignupInput } from "@piyush_sharma/medium-common";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config";
import axios from "axios";

export const Auth = ({type}:{type:"signup"|"signin"}) =>{

    const [postInputs,setPostsInputs] = useState<SignupInput>({
        name:"",
        username:"",
        password:"",
    })

    const navigate = useNavigate();

    async function sendRequest(){
        try{
            const response =  await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"?"signup":"signin"}`,postInputs);
            const jwt = response.data;
            console.log(jwt);
            localStorage.setItem('token',jwt)
            navigate("/blogs");
        }catch(error){
            //alert the user here that request failed
            console.log(error);
            alert('Error while signing up');
        }
    }

    return <div className="h-screen flex flex-col justify-center">
        <div className="flex justify-center">
           <div>
           <div className="px-10">
           <div className="text-3xl font-extrabold">
            Create an account
           </div>
           <div className="text-slate-600">
            {type==="signin" ? "Dont have an account?" : "All ready have an account?"}
            <Link className="ml-2 underline" to={type==="signin" ? "/signup":"/signin" }> {type==="signin" ? "Sign up":"Sign in" }</Link>
           </div>
            </div>
            <div className="mt-2">
           { type=="signup"?<LabelledInput label="Name" placeholder="harkirat singh ..." onChange={(e)=>{
                setPostsInputs({
                    ...postInputs,
                    name:e.target.value
                })
            }
            } /> : null}
            <LabelledInput label="UserName" placeholder="harkiratSingh@gmail.com" onChange={(e)=>{
                setPostsInputs({
                    ...postInputs,
                    username:e.target.value
                })
            }
            } />
             <LabelledInput label="Password" type={"password"} placeholder="123456" onChange={(e)=>{
                setPostsInputs({
                    ...postInputs,
                    password:e.target.value
                })
            }
            } />
            <button onClick={sendRequest} type="button" className="mt-5 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type==="signup" ?"sign up" : "sign in"}</button>
            </div>
           </div>
        </div>
    </div>
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput ({label,placeholder,onChange,type}:LabelledInputType){
    return <div className="py-2">
            <label  className="block mb-2 text-sm text-black font-semibold">{label}</label>
            <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />
        </div>
}