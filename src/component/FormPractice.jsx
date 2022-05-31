import React from "react";
import { useState, useReducer } from "react";
import TablePractice from "./TablePractice";

const FormPractice = () => {
  const [form, setForm] = useState({
    username: "",
    salary: "",
    isMarried: false,
  });
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [saveData, setSaveData] = useState([]);

  let handleChange = (e) => {
    let { name, value, type, checked } = e.target;

    if (type == "checkbox") {
      setForm({
        ...form,
        [name]: checked,
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  //   ===================submit thing============================

  let handleSubmit = async (e) => {
    e.preventDefault();

    let userData = {
      username: form.username,
      salary: form.salary,
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

    setSaveData([...saveData, data]);
    forceUpdate();

    setForm({
      username: "",
      salary: "",
      isMarried: false,
    });
  };

  //   ============================delete function =============================

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
          <label htmlFor="">Name:</label>
          <input
            onChange={handleChange}
            type="text"
            name="username"
            value={form.username}
          />
        </div>
        <div>
          <label htmlFor="">Salary:</label>
          <input
            onChange={handleChange}
            type="number"
            name="salary"
            value={form.salary}
          />
        </div>
        <div>
          <label htmlFor="">Are you married:</label>
          <input
            onChange={handleChange}
            type="checkbox"
            name="isMarried"
            checked={form.isMarried}
          />
        </div>
        <button>Submit</button>
      </form>

      <TablePractice onDelete={onDelete} ignored={ignored} />
    </div>
  );
};

export default FormPractice;
