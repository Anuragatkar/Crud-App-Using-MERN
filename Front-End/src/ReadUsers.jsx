import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ReadUsers = () => {
  const { id } = useParams();

  // To fetch single users
  const [singleUser, setSingleUser] = useState({});
  useEffect(() => {
    const init = async () => {
      const res = await axios.get( `http://127.0.0.1:7000/fetchsingleuser/${id}`);
      setSingleUser(res.data);
    };
    init();
  }, []);
  return (
    <div className="w-2/3 mx-auto mt-5">
      <div className="relative overflow-x-auto shadow-md">
        <table className="w-full text-lg text-center text-gray-500 ">
          <thead className="text-[17px] text-gray-700 uppercase bg-gray-500">
            <tr>
              <th scope="col" className="px-6 py-3">
                SN.
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Password
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                1
              </th>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {singleUser.name}
              </th>
              <td className="px-6 py-4"> {singleUser.email}</td>
              <td className="px-6 py-4"> {singleUser.password}</td>
              <td className="px-6 py-4"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReadUsers;
