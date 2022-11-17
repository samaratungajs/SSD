import React, { useEffect, useState } from "react";
import NavbarStd from "../../components/Navbars/NavbarStd";
import { deleteNote, getNotes } from "../../api/api";
import { unsuccess } from "../../components/AlerBox";
import Modal from "../../components/FormModal";
import Swal from "sweetalert2";

const WorkerMain = () => {
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [isInsert, setIsInsert] = useState(false);

  const togglePopup = (item) => {
    setItems(item?item:"")
    setIsOpen(!isOpen);
  }
  
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const res = await getNotes();
        setdata(res.data.notes);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          unsuccess(error);
        }
      }
    };
    getData();
  }, []);

  const removeNote = async (id) => {
    try {
      Swal.fire({
        title: 'Confirm?',
        text: "Do you want to remove this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirm'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteNote(id);
          Swal.fire(
            'Deleted!',
            'Your note has been deleted.',
            'success'
          )
          window.location = "/";
        }
      })

    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        unsuccess(error.response);
      }
    }
  };

  return (
    <div>
      <NavbarStd />
      <div className="container">
        <h3 className="mt-2">
          <center>
            <strong>Student's Note List</strong>
          </center>
        </h3>
        {isOpen && <Modal items={items} status={isInsert} changeIsInsert={setIsInsert} handleClose={togglePopup}
    />}
        <button onClick={()=>{togglePopup(); setIsInsert(true)}} className="btn btn-success">Add Note</button>

        <div className="mt-4">
          <table className="table table-bordered table-dark">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data && data.map((item, key) => {
                return (
                  <tr key={key}>
                    <th scope="row">{key + 1}</th>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td>
                      <button
                        className="btn btn-warning mx-2"
                        onClick={() => togglePopup(item)}
                      >
                        <i className="fa fa-pen"></i> Update
                      </button>
                      <button
                        className="btn btn-danger mx-2"
                        onClick={() => removeNote(item._id)}
                      >
                        <i className="fa fa-trash"></i> Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {loading && (
            <div className="text-center">
              <div
                className="spinner-border"
                style={{width: "3rem", height: "3rem"}}
                role="status"
              >
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkerMain;
