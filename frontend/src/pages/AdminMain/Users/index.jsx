import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { unsuccess } from "../../../components/AlerBox";
import "../styles.css";
import { getUser } from "../../../api/api";
import ProfileModal from "../../../components/ProfileModal";

const Users = () => {
  const [data, setdata] = useState([]);
  const [item, setItem] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [numOfPages, setNumOfPages] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setloading] = useState(false);
  const [search, setsearch] = useState({ name: "", email: "", id: "" });

  const pages = new Array(numOfPages).fill(null).map((v, i) => i);
  
  const handleChange = ({ currentTarget: input }) => {
    setsearch({ ...search, [input.name]: input.value });
  };

  const goToPrevious = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const goToNext = () => {
    setPageNumber(Math.min(numOfPages - 1, pageNumber + 1));
  };

  useEffect(() => {
    const getData = async () => {
      setloading(true);
      try {
        let query = `?page=${pageNumber}
        ${search.email?`&email=${search.email}`:""}
        ${search.name?`&name=${search.name}`:""}
        ${search.id?`&id=${search.id}`:""}
        `
        const res = await getUser(query);
        setdata(res.data.users);
        setNumOfPages(res.data.totalPages);
        setloading(false);
      } catch (error) {
        setloading(false);
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          unsuccess(error.response.data.message);
        }
      }
    };
    getData();
  }, [pageNumber, search]);

  const togglePopup = (item) => {
    item && setItem(item);
    setIsOpen(!isOpen);
  }

  return (
    <div>
     
      <div className="search-container">
        <form className="d-flex">
        <input
            className="form-control me-2"
            type="search"
            placeholder="Search by email"
            name="email"
            value={search.email}
            onChange={handleChange}
            aria-label="Search"
          ></input>
        </form>
        <form className="d-flex">
          <input
            className="form-control me-2"
            type="search"
            name="name"
            value={search.name}
            onChange={handleChange}
            placeholder="Search by name"
            aria-label="Search"
          ></input>
        </form>
        <form className="d-flex">
          <input
            className="form-control me-2"
            name="id"
            type="search"
            value={search.id}
            onChange={handleChange}
            placeholder="Search by Id"
            aria-label="Search"
          ></input>
        </form>
      </div>
      
      <div className="card-container">
        <h3>Page of {pageNumber + 1}</h3>
        <div className="row">
          {data &&
            data.map((item, index) => {
              return (
                <div className="col-sm-3" key={index}>
                  <div className="card-group">
                    <div className="card card-style">
                      <div className="card-body">
                        <h5 className="card-title">
                          {item.firstName + " " + item.lastName}
                        </h5>
                        <hr />
                        <p className="card-text">{item.email && item.email}</p>
                        <p className="card-text">
                          {item.mobile && item.mobile}
                        </p>
                        <h6 className="card-text">
                          <strong>{item.id && item.id}</strong>
                        </h6>
                        <button className="btn btn-outline-dark" onClick={()=>togglePopup(item)}>
                          View Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          {loading && (
            <div className="text-center">
              <div
                className="spinner-border"
                style={{ width: "3rem", height: "3rem" }}
                role="status"
              >
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}
        </div>

        {/* Pagination */}

        <nav aria-label="...">
          <ul className="pagination">
            <li className="page-item">
              <Link
                className="page-link"
                onClick={goToPrevious}
                to="#"
                tabIndex="-1"
              >
                Previous
              </Link>
            </li>
            {pages.map((index) => (
              <li className={`page-item ${index===pageNumber && "active"}`} key={index}>
                <Link
                  className="page-link"
                  to="#"
                  onClick={() => setPageNumber(index)}
                >
                  {index + 1}
                </Link>
              </li>
            ))}
            <li className="page-item">
              <Link
                className="page-link"
                onClick={goToNext}
                to="#"
                tabIndex="-1"
              >
                Next
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      {isOpen && <ProfileModal  handleClose={togglePopup} item={item}
    />}
    </div>
    
  );
};

export default Users;
