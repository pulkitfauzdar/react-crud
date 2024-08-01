import React from 'react';
import "./Register.css"
import RegisterForm from '../shared/registerForm/RegisterForm';

const Register = () => {
    return (
        <div>
            <div className='RegisterDiv'>Register Here: </div>
            <RegisterForm btnType = "Register"/>
        </div>
    );
}

export default Register;
