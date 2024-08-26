import React, {useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Home = () => {

const [inputUsers ,setInputUsers]=useState({
  name:"",
  email:"",
  password:"",
})

const handleChange=(event)=>{
 setInputUsers({
  ...inputUsers,[event.target.name]:event.target.value,
 })
}

const handleSubmit=async(event)=>{
  event.preventDefault();
  const res=await axios.post("http://127.0.0.1:7000/create",inputUsers)
  init();
}

const handleDelete =async(id)=>{
  const res=await axios.delete(`http://127.0.0.1:7000/del/${id}`)
  if(res.status===200){
    init()
  }
}
// To fetch all users
const [userData,setUserData]=useState([])

const init=async()=>{
 const res=await axios.get("http://127.0.0.1:7000/fetchallusers")
 setUserData(res.data)
}
useEffect(()=>{
  init();
})
  return (
    <div className="w-2/3 mx-auto mt-5">
      {/* creating form */}
      <form onSubmit={handleSubmit}>
        <h1>Create User</h1>
        <div className="">
          <label className=" text-sm text-gray-500 ">Name</label>
          <input
            type="text"
            name="name"
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
            placeholder="Enter name"
            required
            value={inputUsers.name}
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
            value={inputUsers.email}
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
            value={inputUsers.password}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-center my-4">
          <button type="submit" className="px-4 py-2 bg-yellow-400 rounded-sm">
            Add User
          </button>
        </div>
      </form>
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
       {userData.map((item,i)=>{
        return(
                <tr>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >{i+1}</th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >{item?.name}</th>
                <td className="px-6 py-4">{item?.email} </td>
                <td className="px-6 py-4"> {item?.password}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-x-4 justify-center">
                    <NavLink
                      // to={`/readuser/${item._id}`}
                      to={"/readusers/"+item._id}
                      className="font-medium text-green-600 dark:text-blue-500 hover:underline"
                    >
                      Read
                    </NavLink>
                    <NavLink
                      to={"/updateusers/"+item._id}
                      className="font-medium text-yellow-400 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </NavLink>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="font-medium text-red-500  hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
        )
       })}
      </tbody>
      </table>

    </div>
    </div>
  );
};

export default Home;
