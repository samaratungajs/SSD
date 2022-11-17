import React, { useState } from 'react'
import NavbarAdmin from '../../components/Navbars/NavbarAdmin'
import Users from './Users'
import './styles.css'
import AddUser from './AddUser'
const AdminMain = () => {
  const [isHome, setIsHome] = useState(true)
  const [isAddUser, setisAddUser] = useState(false)

  const onAddUserRoute = () => {
    setIsHome(false);
    setisAddUser(true);
  }
  const onHomeRoute = () => {
    setIsHome(true);
    setisAddUser(false);
  }
  return (
    <div>
    <div className="admin-header"> Admin Panel</div>
    <NavbarAdmin onAddUserRoute = {onAddUserRoute} onHomeRoute={onHomeRoute}/>
    {isHome && <AddUser/>}
    {isAddUser && <AddUser/>}

      </div>
  )
}

export default AdminMain