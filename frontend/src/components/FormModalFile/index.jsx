import React, { useState } from "react";
import { useEffect } from "react";
import { addFile } from "../../api/api";
import { success } from "../AlerBox";
import FormAlert from '../Alert/FormAlert'
import LoadingButton from '../Button/LoadingButton'
import jwt_decode from "jwt-decode";

import "./styles.css";
import axios from "axios";

const FormModalFile = props => {
  const [data, setData] = useState({username:"", photo:""});
  const [error, setError] = useState("");
  const [loading, setloading] = useState(false);

  const token = localStorage.getItem("token");
  let user='';
   token ? user = jwt_decode(token):user=null;

  useEffect(() => {
    props.items && setData(props.items);
  }, [props.items])

  const handleChange = (e) => {
    setError('');
    setData({username:user.username, photo:e.target.files[0]});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    setloading(true)
    console.log(data);
    const formData = new FormData();
    formData.append('photo', data.photo);
    formData.append('username', data.username);

    console.log('data', data.photo)
    try {
      let res;
      res = await addFile(formData)
      await success(res.data.message)
      setloading(false)

      window.location = "/";

    } catch (error) {
         setloading(false)
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>
          x
        </span>
        <form className="Auth-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content form-group">
            <h3 className="Auth-form-title">{props.status ? 'Add File': 'Update Note'}</h3>
            <div className="form-group mt-3">
              <label>Title</label>
              <input
                type="file"
                name="photo"
                accept=".png, .jpg, .jpeg"
                onChange={handleChange}
                className="form-control mt-1"
                required
                placeholder="Enter File"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              {error && <FormAlert message={error}/>}
              {!loading ?<button type="submit" className="btn btn-danger">
                {props.status ? 'Add':'Update'}
              </button>:
              <LoadingButton/>}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormModalFile;
