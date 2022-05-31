import React from "react";
import { useState, useReducer } from "react";
import Table from "./Table";

const Form = () => {
  const [saveValue, setSaveValue] = useState([]);

  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [form, setForm] = useState({
    username: "",
    mobile: "",
    salary: "",
    gender: "",
    isMarried: false,
  });

  let handleChange = (e) => {
    // console.log(e);
    let { value, checked, type, name } = e.target;

    if (type == "checkbox") {
      setForm({
        ...form,
        [name]: checked,
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
    console.log(checked, name);
  };

  let handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      name: form.username,
      mobile: form.mobile,
      salary: form.salary,
      gender: form.gender,
      isMarried: form.isMarried,
    };

    let result = await fetch("http://localhost:8073/data", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "content-type": "application/json",
      },
    });

    let data = await result.json();
    setSaveValue([...saveValue, data]);
    forceUpdate();

    setForm({
      username: "",
      mobile: "",
      salary: "",
      gender: "",
      isMarried: false,
    });
  };

  //   console.log(form);

  //   let delete function :-

  let onDelete = (id) => {
    fetch(`http://localhost:8073/data/${id}`, {
      method: "DELETE",
    });
    forceUpdate();
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <div>
            <label htmlFor="">Enter Name</label>
            <input
              onChange={handleChange}
              type="text"
              name="username"
              value={form.username}
            />
          </div>
          <div>
            <label htmlFor="">Enter number</label>
            <input
              onChange={handleChange}
              type="tel"
              name="mobile"
              value={form.mobile}
            />
          </div>
          <div>
            <label htmlFor="">Enter salary</label>
            <input
              onChange={handleChange}
              type="number"
              name="salary"
              value={form.salary}
            />
          </div>
          <div>
            <label htmlFor="">Gender </label>
            <select name="gender" onChange={handleChange} value={form.gender}>
              <option value="">--</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <label htmlFor="">Are you married</label>
            <input
              onChange={handleChange}
              type="checkbox"
              name="isMarried"
              checked={form.isMarried}
            />
          </div>
          <button>Submit</button>
        </div>
      </form>
      <br />
      <br />
      <Table
        onDelete={onDelete}
        forceUpdate={forceUpdate}
        // ignored={ignored}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Form;
