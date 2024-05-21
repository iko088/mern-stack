import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

const AdminUpdate = () => {
    const [data, setData] = useState({
        username: "",
        email: "",
        phone: ""
    });

    const params = useParams();
    const { authorizationToken } = useAuth();

    // Get single user data
    const getSingleUserData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/users/${params.id}`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken
                }
            });
            const userData = await response.json();
            console.log("Single user data from admin update page ", userData);
            setData(userData);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getSingleUserData();
    }, []);

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setData({
            ...data,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/api/admin/users/update/${params.id}`, {
                method: "PATCH",
                headers: {
                    Authorization: authorizationToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });

            // Check if the update was successful
            if (response.ok) {
                toast.success("User updated successfully!");
                // Redirect to admin/users page after successful update
                // You can use react-router-dom's history or navigate method here
            } else {
              toast.error("Update failed. Check the response for more details.");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="registration-form">
                <h1 className="main-heading mb-3">Update User</h1>
                <br />
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input
                            type="username"
                            name="username"
                            value={data.username}
                            onChange={handleInput}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={handleInput}
                        />
                    </div>
                    <div>
                        <label htmlFor="phone">Phone</label>
                        <input
                            type="phone"
                            name="phone"
                            value={data.phone}
                            onChange={handleInput}
                        />
                    </div>
                    <br />
                    <button type="submit" className="btn btn-submit">
                        Update
                    </button>
                </form>
            </div>
        </>
    );
};

export default AdminUpdate;
