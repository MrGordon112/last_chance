import React,{useContext, useState} from 'react'
import AuthContext from  '../context/AuthContext'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'


const SignUpPage=()=>{
    let history=useNavigate()
    let {name, }= useContext(AuthContext)
     const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    });


 const signUp=async()=> {
        let response= axios.post('/first_app/register/',formData)
        .then((response)=>{
            if(!response.ok){
                throw new Error('not added')
            }
        }
        ).catch((e)=>{console.log(e)});
        history('/login')

    }

    return (
        <div >
            <h1>Sign Up</h1>
            <form onSubmit={signUp}>

                    <input
                        className='form-control'
                        type='text'
                        placeholder='Username*'
                        name='last_name'
                        value={formData.last_name}
                        onChange={(event) => setFormData({...formData, username: event.target.value})}
                        required
                    />
                    <input
                        className='form-control'
                        type='email'
                        placeholder='Email*'
                        name='email'
                        value={formData.email}
                        onChange={(event) => setFormData({...formData, email: event.target.value})}
                        required
                    />
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Password*'
                        name='password'
                        value={formData.password}
                        onChange={(event) => setFormData({...formData, password: event.target.value})}
                        minLength='6'
                        required
                    />
                        <input
                            className='form-control'
                            type='password'
                            placeholder='Confirm Password*'
                            name='password2'
                            value={formData.re_password}
                            onChange={(event) => setFormData({...formData, password2: event.target.value})}
                            minLength='6'
                            required
                        />
                <input type='submit' text="send" />
            </form>

        </div>
    );
};



export default SignUpPage
