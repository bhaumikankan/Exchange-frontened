import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCookie, deleteCookie } from "cookies-next";

function Userdetails() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://exchange123.herokuapp.com/admin/getuser/", {
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": getCookie("admin-token"),
        },
      })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
        window.alert("something went wrong");
      });
  }, [users]);

  return (
    <div className="overflow-x-auto relative  m-5 rounded-md">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-blue-400 dark:bg-gray-700 dark:text-gray-400">
          <tr>
          <th scope="col" className="py-3 px-6">
              index
            </th>
            <th scope="col" className="py-3 px-6">
              unique id
            </th>
            <th scope="col" className="py-3 px-6">
              Email
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((v,i) => {
            return (
              <tr key={v._id} className="bg-blue-100 border-b dark:bg-gray-900 dark:border-gray-700">
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {i+1}
                </th>
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {v._id}
                </th>
                <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">{v.email}</td>
                
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Userdetails;
