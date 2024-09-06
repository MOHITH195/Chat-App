import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import {styled} from "styled-components"
import {toast,ToastContainer} from 'react-toastify'
import  "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { registerRoute } from '../utils/APIRoutes';
function Register() {
  const navigate = useNavigate()
    const [values,setValues] = useState({
        username : "",
        email: "",
        password : "",
        confirmPassword : "",
        
    })
    const options = {
        position : 'bottom-right',
        autoClose : 5000,
        theme: 'dark'
        
    }

    const validation = ()=>{
        const {password,confirmPassword,email,username} = values
        if(password!==confirmPassword){
            toast.error("password and confirm password doesn't match",options)
            return false;
        } else if (email === "") {
          toast.error("Email is required.", options);
          return false;
        
        } else if (username.length < 3) {
          toast.error(
            "Username has to be greater than 3 characters.",
            options
          );
          return false;
        } else if (password.length < 8) {
          toast.error(
            "Password should be equal or greater than 8 characters.",
            options
          );
          return false;
        }
    
        return true;

        }
        
        
    


    const handleSubmit = async(e)=>{
        e.preventDefault();
        if (validation()) {
          console.log("in validation",registerRoute);
            const { email, username, password } = values;
            const { data } = await axios.post(registerRoute, {
              username,
              email,
              password,
            });
            if (data.status === false) {
              toast.error(data.msg, options);
            }
            if (data.status === true) {
              localStorage.setItem(
                "chat-app-user",
                JSON.stringify(data.user)
                );

                navigate("/login")
            }
          }
      
           
          
    }

    const handleChange = async(e)=>{
        setValues({...values,[e.target.name]: e.target.value})
        console.log(values);
    }

    useEffect(()=>{
      if(localStorage.getItem("chat-app-user")){
        navigate("/")
      }
    },[])
  return (
   <>
    <FormContainer>
        <form action='' onSubmit={(e)=>handleSubmit(e)}>
            <input name='username' placeholder='User Name' type='text' onChange={(e)=>handleChange(e)}/>
            <input name='email' placeholder='Email' type='email' onChange={(e)=>handleChange(e)}/>
            <input name='password' placeholder='Password' type='password' onChange={(e)=>handleChange(e)}/>
            <input name='confirmPassword' placeholder='Confirm Password' type='password' onChange={(e)=>handleChange(e)}/>
            <button type='submit' >Create User</button>
            <span>Already have an Account ? <Link to="/login">login</Link></span>
        </form>
    </FormContainer>
    <ToastContainer/>
    </>
  )
}


const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #997af0;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition : 0.5s ease-in-out;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Register