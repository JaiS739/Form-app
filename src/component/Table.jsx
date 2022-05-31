import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import style from "./App.module.css";

const Table = ({ onDelete, ignored, handleSubmit }) => {
  const [lists, setLists] = useState([]);
  const [filterbyvalue, setFilterbyvalue] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalCount, setTotalCount] = useState(0);

  let getData = async () => {
    let r = await axios.get(
      `http://localhost:8073/data?_page=${page}&_limit=${limit}`
    );
    let data = await r.data;
    console.log(r);
    setLists(data);
    setTotalCount(Number(r.headers["x-total-count"]));
  };

  useEffect(() => {
    getData();
  }, [handleSubmit, onDelete, page, limit]);

  // ==================================================filter work:================

  console.log(lists);
  // filter work:
  let filtersby = {
    1: "low-salary",
    2: "high-salary",
    3: "Alpha wise",
    4: "Reverse Alpha wise",
  };

  let updateFilter = (key) => {
    switch (key) {
      case "1": {
        setFilterbyvalue(1);
        lists.sort((a, b) => a.salary - b.salary);
        setLists([...lists]);
        break;
      }
      case "2": {
        setFilterbyvalue(2);
        lists.sort((a, b) => b.salary - a.salary);
        setLists([...lists]);
        break;
      }
      case "3": {
        setFilterbyvalue(3);
        lists.sort((a, b) => a.name.charCodeAt() - b.name.charCodeAt());
        setLists([...lists]);
        break;
      }
      case "4": {
        setFilterbyvalue(3);
        lists.sort((a, b) => b.name.charCodeAt() - a.name.charCodeAt());
        setLists([...lists]);
        break;
      }
    }
  };

  return (
    <div>
      Table
      <div className={style.flexy}>
        {Object.entries(filtersby).map(([key, value]) => (
          <div key={key} onClick={() => updateFilter(key)}>
            {value}
          </div>
        ))}
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>S.no</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Salary</th>
              <th>Gender</th>
              <th>Marrital status</th>
            </tr>
          </thead>
          <tbody className={style.lineCrossed}>
            {lists.map((e, index) => (
              <tr key={e.id}>
                <td>{index + 1}</td>
                <td>{e.name}</td>
                <td>{e.mobile}</td>
                <td>{e.salary}</td>
                <td>{e.gender}</td>
                <td>{e.isMarried ? "Yes" : "No"}</td>
                <td>
                  <button onClick={() => onDelete(e.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <label htmlFor="">Number of Items per page: </label>
        <button
          disabled={page <= 1}
          onClick={() => {
            setPage(page - 1);
          }}
        >
          {"<"}
        </button>
        <select
          onChange={(e) => setLimit(Number(e.target.value))}
          name=""
          id=""
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
        <button
          disabled={totalCount <= page * limit}
          onClick={() => {
            setPage(page + 1);
          }}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Table;
