import React from "react";
import { NavLink, Navigate, Outlet } from "react-router-dom";
import { FaUserLarge, FaServicestack } from "react-icons/fa6";
import { IoMdContacts, IoMdHome  } from "react-icons/io";
import { useAuth } from "../../store/auth";

const AdminLayout = () => {

  const { user, isLoading } = useAuth();

  if(isLoading) {
    return <h1>Loading ....</h1>
  };

  if(!user.isAdmin) {
    return <Navigate to="/"/>
  }
  else {
    
  }

  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <NavLink to="/admin/users"><FaUserLarge /> Users</NavLink>
            </li>
            <li>
              <NavLink to="/admin/contacts"><IoMdContacts /> Contact</NavLink>
            </li>
            <li>
              <NavLink to="/admin/services"><FaServicestack/> Services</NavLink>
            </li>
            <li>
              <NavLink to="/admin"><IoMdContacts/> Home</NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <div className="admin-h1">
        <h1>ADMIN PAGE</h1>
      </div>
      <Outlet/>
    </>
  );
};

export default AdminLayout;
