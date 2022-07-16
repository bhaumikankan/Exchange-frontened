import React, { useState } from "react";

function UserLogin({ close,email,password,setEmail,setPassword,login,register }) {
  const[rtype,setRtype]=useState(false);
  return (
    <div
      id="defaultModal"
      tabIndex="-1"
      className=" overflow-y-auto overflow-x-hidden absolute flex items-center justify-center top-0 right-0 left-0 z-50 w-full inset-0 h-modal h-full bg-gray-700 bg-opacity-50  "
      aria-modal="true"
      role="dialog"
    >
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto ">
        <div className="relative bg-white rounded-lg shadow-lg bg-gradient-to-r from-slate-500 via-slate-500 to-slate-600 dark:bg-gray-700 ">
          <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
            <h3 className="text-xl font-semibold text-white">
              {
                rtype?<div>Register</div>:<div>Login</div>
              }
            </h3>
            <button
              type="button"
              onClick={() => close(false)}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="defaultModal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="px-3 ">
            <div className="mb-3 ">
              <label
                htmlFor="exampleFormControlInput1"
                className="form-label inline-block font-semibold mb-2 text-white"
              >
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="
                        form-control
                        block
                        w-full
                        p-3
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                    "
                id="exampleFormControlInput1"
                placeholder="Email"
              />
            </div>
            <div className="mb-3 ">
              <label
                htmlFor="exampleFormControlInput1"
                className="form-label inline-block mb-2 text-white font-semibold"
              >
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="
                        form-control
                        block
                        w-full
                        p-3
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                    "
                id="exampleFormControlInput1"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 m-2 rounded-b py-2 ">
            {rtype?<button
            onClick={register}
              data-modal-toggle="defaultModal"
              type="button"
              className="text-white  bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full p-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Register
            </button>:
            <button
            onClick={login}
            data-modal-toggle="defaultModal"
            type="button"
            className="text-white  bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full p-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login
          </button>
            }
            {rtype?<button
              onClick={()=>setRtype(false)}
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium w-full p-3 hover:text-gray-900 focus:z-10"
            >
              Already have an account
            </button>:<button
              onClick={()=>setRtype(true)}
              type="button"
              className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium w-full p-3 hover:text-gray-900 focus:z-10"
            >
              Dont have any account
            </button>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
