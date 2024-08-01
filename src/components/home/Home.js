import React, { useState, useEffect } from 'react';
import "./Home.css"
import Modal from "../shared/Modal/Modal";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const [tableData, setTableData] = useState([]);
    const [open, setOpen] = useState(false);
    const [userToBeEdited, setUserToBeEdited] = useState({});
    const [indexToBeEdited, setIndexToBeEdited] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getTableData();
    }, []);

    const getTableData = () => {
        const usersData = JSON.parse(localStorage.getItem("user_data"));
        setTableData(usersData);
    }
    const handleEdit = (item, index) => {
        setOpen(true);
        setUserToBeEdited(item);
        setIndexToBeEdited(index);
    }

    const handleDelete = (item, indexToBeDeleted) => {
        const isConfirmed = window.confirm(`Are you sure you want to delete ${item?.userName}'s data?`);
        if (isConfirmed) {
            const userData = JSON.parse(localStorage.getItem("user_data"));
            const newUserData = userData?.filter((_, index) => index != indexToBeDeleted)
            localStorage.setItem("user_data", JSON.stringify(newUserData));
            getTableData();
            toast.success(`User ${item?.userName} deleted Successfully`);
        } else {
            toast.error("Deletion canceled.");
        }
    };

    const logoutHandeler = () => {
        toast.success("Logout Successfully!!");
        navigate("/login");
    }



    return (

        <div className='table-wrapper'>
            <Modal open={open} setOpen={setOpen} userToBeEdited={userToBeEdited} indexToBeEdited={indexToBeEdited} getTableData={getTableData} />
            <div className='heading-container'>
                <div style={{ width: "70px" }}></div>  <h1>Home</h1>
                <button className='logout-btn' onClick={logoutHandeler}>LogOut</button>
            </div>
            <table border={1}>
                <tr>
                    <td className='serial'>S.no</td>
                    <td>Name</td>
                    <td>Phone</td>
                    <td className='action'>Action</td>
                </tr>

                {
                    tableData?.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item?.userName}</td>
                            <td>{item?.phone}</td>
                            <td className='button-container'>
                                <button className='edit-btn' onClick={() => handleEdit(item, index)}>Edit</button>
                                <button className='delete-btn' onClick={() => handleDelete(item, index)}>Delete</button>
                            </td>
                        </tr>
                    ))
                }

            </table>
        </div>
    );
}

export default Home;
