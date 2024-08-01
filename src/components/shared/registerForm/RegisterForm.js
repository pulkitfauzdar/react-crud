import React, { useEffect, useState } from 'react';
import "./RegisterForm.css"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const RegisterForm = ({ userToBeEdited, btnType, setOpen, indexToBeEdited, getTableData }) => {
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        phone: "",
        city: "",
        password: "",
    })
    const navigate = useNavigate();

    useEffect(() => {
        if (btnType === "Edit") {
            setFormData(userToBeEdited);
        }
    }, [btnType])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev, [name]: value
        }))
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (formData.userName === "") {
            toast.warn("Please enter Username..!!");
            return;
        }
        if (formData.email === "") {
            toast.warn("Please enter Email..!!");
            return;
        }
        if (formData.phone === "") {
            toast.warn("Please enter Phone..!!");
            return;
        }
        if (formData.city === "") {
            toast.warn("Please enter City..!!");
            return;
        }
        if (formData.password === "") {
            toast.warn("Please enter Password..!!");
            return;
        }

        const userData = JSON.parse(localStorage.getItem("user_data")) || [];

        if (btnType === "Edit") {
            if (indexToBeEdited >= 0 && indexToBeEdited < userData.length) {
                userData[indexToBeEdited] = formData;
                localStorage.setItem("user_data", JSON.stringify(userData));
                toast.success("User Details Updated successfully!!");
                setOpen(false);
                getTableData();
            } else {
                toast.error("User not found to edit.");
            }
        } else {
            userData.push(formData);
            localStorage.setItem("user_data", JSON.stringify(userData));
            toast.success("User Registered Successfully!!");
            navigate("/login");
        }
    };



    return (
        <div class="form-container">
            <form onSubmit={handleFormSubmit} class="form">
                <div class="form-group">
                    <label htmlFor="userName" class="form-label">Username:</label>
                    <input
                        type='text'
                        id='userName'
                        name='userName'
                        value={formData?.userName}
                        onChange={handleInputChange}
                        class="form-input"
                    />
                </div>
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
                    <label htmlFor="phone" class="form-label">Phone</label>
                    <input
                        type='text'
                        id='phone'
                        name='phone'
                        value={formData?.phone}
                        onChange={handleInputChange}
                        class="form-input"
                    />
                </div>
                <div class="form-group">
                    <label htmlFor="city" class="form-label">City</label>
                    <input
                        type='text'
                        id='city'
                        name='city'
                        value={formData?.city}
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
                    <button type='submit' class="form-button">{btnType}</button>
                </div>
            </form>
        </div>

    );
}

export default RegisterForm;
