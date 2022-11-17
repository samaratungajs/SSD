import React, { useState } from 'react'
import { addUser } from '../../../api/api';
import { success } from '../../../components/AlerBox';
import FormAlert from '../../../components/Alert/FormAlert';
import LoadingButton from '../../../components/Button/LoadingButton';

const AddUser = () => {
    const [email, setEmail] = useState("");
    const [accountType, setAccountType] = useState("");
    const [error, setError] = useState("");
    const [loading, setloading] = useState(false);

    const handleChange = ({ currentTarget: input }) => {
        setError('');
        setEmail(input.value );
      };
    
    const handleChangeType = ({ currentTarget: input }) => {
        setError('');
        setAccountType(input.value );
     };

      const handleSubmit = async (e) => {
        const mail = {email:email, accountType:accountType}
        setError('')
        setloading(true)
        e.preventDefault();
        try {
          const res = await addUser(mail);
          success(res.data.message);
          setloading(false)
    
          setEmail("")
    
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
    <div className='d-flex justify-content-center'>
    <div className='mt-5'>
        <form className="Auth-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content form-group">
            <h3 className="Auth-form-title">Add User</h3>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={email}
                className="form-control mt-1"
                required
                placeholder="Enter email"
              />
            </div>
            <div className="form-group mt-3">
              <label>Account Type</label>
              <br/>
              <select onChange={handleChangeType}  className="form-select" aria-label="Default select example">
                <option value="worker">Worker</option>
                <option value="manager">Manager</option>
              </select>
            </div>
            <div className="d-grid gap-2 mt-3">
                {error && <FormAlert message={error}/>}
              {!loading ?<button type="submit" className="btn btn-danger">
                Add
              </button>:
              <LoadingButton/>}
            </div>
          </div>
        </form>
        </div>
      </div>
  )
}

export default AddUser