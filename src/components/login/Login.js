import React, { useState } from 'react';
import "./Login.css"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev, [name]: value
        }))
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (formData.email === "") {
            toast.warn("Please enter Email..!!")
            return;
        }
        if (formData.password === "") {
            toast.warn("Please enter Password..!!")
            return;
        }

        const existingUser = JSON.parse(localStorage.getItem("user_data"));
        const user = existingUser.find(user => user.email === formData.email && user.password === formData.password);
        if (user) {
            toast.success("Login Successfully!!");
            navigate("/home")
        } else {
            toast.error("Invalid username or password");
        }
    }


    return (

        <div>
            <div className='LoginDiv'>Login Here:</div>
            <div class="form-container">
                <form onSubmit={handleFormSubmit} class="form">

                    <div class="form-group">
                        <label htmlFor="email" class="form-label">Email:</label>
                        <input
                            type='text'
                            id='email'
                            name='email'
                            value={formData?.email}
                            onChange={handleInputChange}
                            class="form-input"
                        />
                    </div>
                    <div class="form-group">
                        <label htmlFor="password" class="form-label">Password</label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            value={formData?.password}
                            onChange={handleInputChange}
                            class="form-input"
                        />
                    </div>
                    <div class="form-group">
                        <button type='submit' class="form-button">Login</button>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default Login;
