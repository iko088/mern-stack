import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify'

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const { authorizationToken } = useAuth();

  const getAllUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/contacts", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      const data = await response.json();
      console.log("users", data);
      setContacts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
     const response = await fetch(`http://localhost:5000/api/admin/contacts/delete/${id}`,{
       method: 'DELETE',
       headers: {
         Authorization: authorizationToken
       }
     }
     )
     const data = await response.json();
       console.log("contact is deleted", data)
 
       if(response.ok) {
         getAllUsers();
         toast.success("Contact Deleted Successfully")
       }
 
    } catch (error) {
      console.log(error)
     
    }
 
   }
 

  return <>
  <div className="table-container">
      <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Update</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
        {contacts.map((curUser,index) => (
    
            <tr key={index}>
                <td>{curUser.username}</td>
                <td>{curUser.email}</td>
                <td>{curUser.message}</td>
                <td> 
                  {/* <Link className='updatebtn' to={`/admin/update/${curUser._id}/edit`}> Update </Link> */}
                  Update
                  </td>
                <td><button onClick={() => deleteUser(curUser._id)}>Delete</button></td>
            </tr>
            ))}
        </tbody>
    </table>
    </div></>;
};

export default AdminContacts;
