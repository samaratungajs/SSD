import React from "react";

const ProfileModal = props => {
  return (
    <div className="popup-box">
      <div className="box">
        <div className="card text-center">
  <div className="card-header">
    <div className="d-flex"> <button onClick={props.handleClose} className="btn btn-primary btn-sm">Close</button></div>
  </div>
  <div className="card-body">
    <h5 className="card-title">{props.item.firstName + " " + props.item.lastName}</h5>
    <p className="card-text">Email : {props.item.email}</p>
    <p className="card-text">Phone Number : {props.item.mobile}</p>
    <p className="card-text">Account Type : {props.item.accountType}</p>
  </div>
  <div className="card-footer text-muted">
    <strong>
    {props.item.id}
    </strong>    
  </div>
</div>
      </div>
    </div>
  );
};

export default ProfileModal;
