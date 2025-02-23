import React, { useEffect, useState } from 'react';
import { useAuth } from '../store/auth';
import { Link } from 'react-router-dom';

const AdminUsers = () => {
  const [users, setUsers] = useState([])
  const {authorizationToken} = useAuth();

  const getAllUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/users',{
        method: 'GET',
        headers: {
          Authorization: authorizationToken
        }
      }
      )

      const data = await response.json();
      console.log("users", data)
      setUsers(data)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=> {
    getAllUsers();
  },[])


  // Delete user function 
  const deleteUser = async (id) => {
   try {
    const response = await fetch(`http://localhost:5000/api/admin/users/delete/${id}`,{
      method: 'DELETE',
      headers: {
        Authorization: authorizationToken
      }
    }
    )
    const data = await response.json();
      console.log("user after delete", data)

      if(response.ok) {
        getAllUsers();
      }

   } catch (error) {
    console.log(error)
   }

  }


  return (
    <>
    <div className="table-container">
      <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Update</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
        {users.map((curUser,index) => (
    
            <tr key={index}>
                <td>{curUser.username}</td>
                <td>{curUser.email}</td>
                <td>{curUser.phone}</td>
                <td> <Link className='updatebtn' to={`/admin/update/${curUser._id}/edit`}> Update </Link></td>
                <td><button onClick={() => deleteUser(curUser._id)}>Delete</button></td>
            </tr>
            ))}
        </tbody>
    </table>
    </div>
    </>
  )
}

export default AdminUsers
