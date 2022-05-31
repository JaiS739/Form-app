import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState, useReducer } from "react";

const TablePractice = ({ onDelete, ignored }) => {
  const [setList, setSetList] = useState([]);
  const [filterby, setFilterby] = useState("");

  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(5);
  const [totalCount, setTotalCount] = useState(0);

  let getData = async () => {
    let r = await axios.get(
      `http://localhost:8073/data?_page=${page}&_limit=${pageLimit}`
    );
    let data = await r.data;
    setSetList(data);
    console.log(r);
    setTotalCount(Number(r.headers["x-total-count"]));
  };

  useEffect(() => {
    getData();
  }, [ignored, page, pageLimit]);

  // ==============================filter=============================

  let filterValues = {
    1: "low salary",
    2: "hight salary",
  };

  console.log(setList);
  let filterList = (keyValue) => {
    switch (keyValue) {
      case "1": {
        setFilterby(1);
        setList.sort((a, b) => a.salary - b.salary);
        setSetList([...setList]);
        break;
      }
      case "2": {
        setFilterby(2);
        setList.sort((a, b) => b.salary - a.salary);
        setSetList([...setList]);
        break;
      }
    }
  };

  return (
    <div>
      <div>
        {Object.entries(filterValues).map(([key, value]) => (
          <div key={key} onClick={() => filterList(key)}>
            {value}
          </div>
        ))}
      </div>

      <div>
        <table>
          <thead>
            <tr>
              <th>S.no.</th>
              <th>Name</th>
              <th>Salary</th>
              <th>Marital status</th>
            </tr>
          </thead>
          <tbody>
            {setList.map((e, index) => (
              <tr key={e.id}>
                <td>{index + 1}</td>
                <td>{e.username}</td>
                <td>{e.salary}</td>
                <td>{e.isMarried ? "Yes" : "No"}</td>
                <td>
                  <button onClick={() => onDelete(e.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        disabled={page <= 1}
        onClick={() => {
          setPage(page - 1);
        }}
      >
        {"<"}
      </button>
      <select
        name=""
        id=""
        onChange={(e) => {
          setPageLimit(Number(e.target.value));
        }}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
      </select>
      <button
        disabled={totalCount <= page * pageLimit}
        onClick={() => {
          setPage(page + 1);
        }}
      >
        {">"}
      </button>
    </div>
  );
};

export default TablePractice;
