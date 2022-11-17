import React, { useState } from "react";
import "./styles.css";
import LoadingButton from "../../components/Button/LoadingButton";
import FormAlert from "../../components/Alert/FormAlert";
import { login } from "../../api/api";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setloading] = useState(false);

  const handleChange = ({ currentTarget: input }) => {
    setError('');
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    setError('')
    setloading(true)
    e.preventDefault();
    try {
      const res = await login(data);

      localStorage.setItem("token", res.data.accessToken);

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
    <div>
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content form-group">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={data.email}
                className="form-control mt-1"
                required
                placeholder="Enter email"
              />
            </div>
            <div className="form-group mt-3">
              <label className="al">Password</label>
              <input
                type="password"
                name="password"
                className="form-control mt-1"
                onChange={handleChange}
                value={data.password}
                required
                placeholder="Enter password"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
                {error && <FormAlert message={error}/>}
              {!loading ?<button type="submit" className="btn btn-danger">
                Login
              </button>:
              <LoadingButton/>}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
