import React from "react";

const FormAlert = ({ message }) => {

    return (
      <div className="alert alert-danger" role="alert">
        {message}
      </div>
    );

};

export default FormAlert;
