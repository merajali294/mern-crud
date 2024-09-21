import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  let [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
  });
  const [error, seterror] = useState("");

  let navTo = useNavigate();
  let { id } = useParams();
  console.log("id", id);

  const getData = async () => {
    let res = await fetch(`http://localhost:5000/${id}`);
    let getRes = await res.json();
    setFormData(getRes);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async () => {
    const { name, age, email } = formData;
    try {
      const postData = await fetch(`http://localhost:5000/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ name, age, email }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let res = await postData.json();
      if (res) {
        navTo("/all");
      } else {
        seterror("Some error occured, pls contact Admin");
      }
    } catch (err) {
      seterror(err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    console.log("formData", formData);
  }, [formData]);

  return (
    <div className="container my-2">
      {error && <h3>{error}</h3>}
      <h2 className="text-centersdf">Create new entry</h2>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="name"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="name"
          value={formData.name}
          name="name"
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Email address</label>
        <input
          onChange={handleChange}
          type="email"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="name@example.com"
          value={formData.email}
          name="email"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Age</label>
        <input
          onChange={handleChange}
          name="age"
          type="number"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="age"
          value={formData.age}
        />
      </div>
      <div className="mb-3">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Update;
