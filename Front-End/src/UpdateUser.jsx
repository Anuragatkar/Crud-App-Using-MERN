import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdateUser = () => {
  const [updateUser, setUpdateUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { id } = useParams();
  useEffect(() => {
    const init = async () => {
      const res = await axios.get(`http://127.0.0.1:7000/fetchsingleuser/${id}`);
      setUpdateUser({
        name: res.data.name,
        email: res.data.email,
        password: res.data.password,
      });
    };
    init();
  }, []);

  const handleChange = (event) => {
    setUpdateUser({
      ...updateUser,[event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await axios.put(`http://127.0.0.1:7000/update/${id}`,updateUser);
    if (res.status === 200) {
      window.location = "/";
    }
  };

  return (
    <div className="w-2/3 mx-auto mt-5">
      <form onSubmit={handleSubmit}>
        <h1>Update User</h1>
        <div className="">
          <label className=" text-sm text-gray-500 ">Name</label>
          <input
            type="text"
            name="name"
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
            placeholder="Enter name"
            required
            value={updateUser.name}
            onChange={handleChange}
          />
        </div>
        <div className="">
          <label className=" text-sm text-gray-500 ">Email</label>
          <input
            type="text"
            name="email"
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
            placeholder="Enter email "
            required
            value={updateUser.email}
            onChange={handleChange}
          />
        </div>
        <div className="">
          <label className=" text-sm text-gray-500 ">Password</label>
          <input
            type="password"
            name="password"
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
            placeholder="Enter Password "
            required
            value={updateUser.password}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-center my-4">
          <button type="submit" className="px-4 py-2 bg-yellow-400 rounded-sm">
            Update User
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
