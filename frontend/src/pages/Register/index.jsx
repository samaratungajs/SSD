import React, { useState } from "react";
import LoadingButton from "../../components/Button/LoadingButton";
import { registerUser } from "../../api/api";
import './styles.css'
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {success} from "../../components/AlerBox";
import FormAlert from "../../components/Alert/FormAlert";

const Register = () => {

  const formSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(4, "Password length should be at least 4 characters")
      .max(12, "Password cannot exceed more than 12 characters"),
    confirmPwd: Yup.string()
      .required("Confirm Password is required")
      .min(4, "Password length should be at least 4 characters")
      .max(12, "Password cannot exceed more than 12 characters")
      .oneOf([Yup.ref("password")], "Passwords do not match")
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onTouched",
    resolver: yupResolver(formSchema)
  });


  const [error, setError] = useState("");
  const [loading, setloading] = useState(false);

  const onSubmit = async (data) => {
    setError('')
    setloading(true)
    try{
      await registerUser(data);
      success("Successfully Registered");
      setloading(false);
      localStorage.removeItem('token');
      window.location = "/login";
    }catch(error){
      setloading(false)
          if (
            error.response &&
            error.response.status >= 400 &&
            error.response.status <= 500
          ) {
            setError(error.response.data.message);
          }
    }
  }
  

  return (
    <div>
      <div className="Reg-form-container">
        <form className="Reg-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="Reg-form-content ">
            <h3 className="Reg-form-title">Student Information</h3>
            <div className="form-group mt-3">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                className="form-control mt-1"
                placeholder="Steve"
                {...register("firstName", { required: true, maxLength: 10 })}
              />
              {errors.firstName && <p style={{color:"red"}}>Please enter First Name with 10 characters</p>}
            </div>
            
            <div className="form-group mt-3">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                className="form-control mt-1"
                required
                placeholder="John"
                {...register("lastName", { required: true, maxLength: 10 })}
              />
              {errors.lastName && <p style={{color:"red"}}>Please enter Last Name with 10 characters</p>}

            </div>
            <div className="form-group mt-3">
              <label className="al">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                className="form-control mt-1"
                required
                defaultValue={"2000-05-12"}
                {...register("dateOfBirth", {required:true})}
              />
              {errors.dateOfBirth && <p style={{color:"red"}}>Please enter valid birthday</p>}

            </div>
            <div className="form-group mt-3">
              <label className="al">Mobile</label>
              <input
                type="text"
                name="mobile"
                pattern="[+-]?\d+(?:[.,]\d+)?"
                maxLength={12}
                minLength={10}
                className="form-control mt-1"
                required
                placeholder="071234567"
                {...register("mobile", {required: true, pattern:/^(0|[1-9]\d*)(\.\d+)?$/, minLength: 10, maxLength: 12})}
              />
              {errors.mobile && <p style={{color:"red"}}>Please enter valid phone number</p>}

            </div>
            <div className="form-group mt-3">
              <label className="al">New Password</label>
              <input
                type="password"
                name="password"
                className="form-control mt-1"
                required
                placeholder="Enter New Password"
                {...register("password", {min:8})}
              />
              {errors.password && <p style={{color:"red"}}>{errors.password?.message}</p>}
            </div>
            <div className="form-group mt-3">
              <label className="al">Confirm Password</label>
              <input
                type="password"
                name="confirmPwd"
                className="form-control mt-1"
                required
                placeholder="Enter New Password Again"
                {...register("confirmPwd")}
              />
              {errors.confirmPwd && <p style={{color:"red"}}>{errors.confirmPwd?.message}</p>}
            </div>
            <div className="d-grid gap-2 mt-3">
                {error && <FormAlert message={error}/>}
              {!loading ?<button type="submit" className="btn btn-danger">
                Register
              </button>:
              <LoadingButton/>}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
