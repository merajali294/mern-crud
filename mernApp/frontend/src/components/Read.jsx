import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Read = () => {
  const [apiData, setApiData] = useState("");

  let navTo = useNavigate();

  const getData = async () => {
    let res = await fetch("http://localhost:5000/");
    let getRes = await res.json();
    console.log("getRes", getRes);
    setApiData(getRes);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleEdit = (id) => {
    navTo(`/${id}`);
  };

  return (
    <div className="container my-2">
      <h2 className="text-center">All entries</h2>
      <div className="row">
        {apiData &&
          apiData.map((item) => {
            return (
              <div key={item._id} className="col-3">
                <div className="card" style={{ width: "18rem" }}>
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.age}</p>
                    <p className="card-text">{item.email}</p>
                    <span className="card-link">
                      <button onClick={() => handleEdit(item._id)}>Edit</button>
                    </span>
                    <span className="card-link">
                      <button>Delete</button>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Read;
