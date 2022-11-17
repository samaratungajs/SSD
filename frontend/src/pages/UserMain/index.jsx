import React, { useEffect, useState } from "react";
import NavbarStd from "../../components/Navbars/NavbarStd";
import { deleteNote, getNotes } from "../../api/api";
import { unsuccess } from "../../components/AlerBox";
import Modal from "../../components/FormModal";
import Swal from "sweetalert2";
import jwt_decode from "jwt-decode";
import FormModalFile from "../../components/FormModalFile";
import FormModal from "../../components/FormModal";

const UserMain = () => {
  const token = localStorage.getItem("token");
  let user = ""
   token ? user = jwt_decode(token):user=null;

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenFile, setIsOpenFile] = useState(false);
  const [items, setItems] = useState([]);
  const [isInsert, setIsInsert] = useState(false);

  const togglePopup = (item) => {
    setIsOpen(!isOpen);
  }
  const togglePopupFile = (item) => {
    setIsOpenFile(!isOpenFile);
  }
  
  useEffect(() => {
    
  }, []);

 

  return (
    <div>
      <NavbarStd />
      <div className="container">
        <h3 className="mt-2">
          <center>
            <strong>{user.accountType.charAt(0).toUpperCase() + user.accountType.slice(1)}'s Dashboard</strong>
          </center>
        </h3>
        {isOpen && <FormModal items={items} status={isInsert} changeIsInsert={setIsInsert} handleClose={togglePopup}
    />}
    {isOpenFile && <FormModalFile status={isInsert} changeIsInsert={setIsInsert} handleClose={togglePopupFile}
    />}
        <button onClick={()=>{togglePopup(); setIsInsert(true)}} className="btn btn-success">Add Message</button>

        <div className="mt-4">
        {user.accountType === "manager" && <button onClick={()=>{togglePopupFile(); setIsInsert(true)}} className="btn btn-success">Add File</button>}
        </div>
      </div>
    </div>
  );
};

export default UserMain;
