import React, { useEffect } from "react";
import { useState } from "react";
import { setCookie, getCookie } from "cookies-next";
import axios from "axios";

function Checkprice({ close }) {
  const [company, setCompany] = useState("");
  const [model, setModel] = useState(null);
  const [allcomp, setAllComp] = useState([]);
  const [allmodels, setAllmodels] = useState([])

  useEffect(() => {
    axios
      .get("https://exchange123.herokuapp.com/user/getproduct/allcomp", {
        headers: {
          "Content-Type": "application/json",
          "x-user-token": getCookie("user-token"),
        },
      })
      .then((res) => {
        setAllComp(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [allcomp,model,allcomp,allmodels]);

  const getModels=(value) => {
    setCompany(value);
    setModel(null);
    
    axios
      .get("https://exchange123.herokuapp.com/user/getproduct/models?cname="+value, {
        headers: {
          "Content-Type": "application/json",
          "x-user-token": getCookie("user-token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setAllmodels(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const getPrice=(value)=>{
    axios
      .get(`https://exchange123.herokuapp.com/user/getproduct/models?cname=${company}&model=${value}`, {
        headers: {
          "Content-Type": "application/json",
          "x-user-token": getCookie("user-token"),
        },
      })
      .then((res) => {
        setModel(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
            <h3 className="text-xl font-semibold text-white">Checkprice</h3>
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
            <div>
              
              <div className="mb-3 mt-3 ">
                <select
                  onChange={(e) => getModels(e.target.value)}
                  className="form-select appearance-none
                                block
                                w-full
                                px-3
                                py-1.5
                                text-base
                                font-normal
                                text-gray-700
                                bg-white bg-clip-padding bg-no-repeat
                                border border-solid border-gray-300
                                rounded
                                transition
                                ease-in-out
                                m-0
                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  aria-label="Default select example"
                >
                  <option selected disabled>
                    Select company
                  </option>
                  {allcomp.map((v, i) => {
                    return (
                      <option key={v._id} value={v.name}>
                        {v.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="mb-3  ">
                <select
                  onChange={(e) => getPrice(e.target.value)}
                  className="form-select appearance-none
                                block
                                w-full
                                px-3
                                py-1.5
                                text-base
                                font-normal
                                text-gray-700
                                bg-white bg-clip-padding bg-no-repeat
                                border border-solid border-gray-300
                                rounded
                                transition
                                ease-in-out
                                m-0
                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  aria-label="Default select example"
                >
                  <option selected >
                    Select modal
                  </option>
                  {allmodels.map((v, i) => {
                    return (
                      <option key={v._id} value={v.name}>
                        {v.name}
                      </option>
                    );
                  })}
                </select>
              </div>

            {model&&<div className="text-white font-semibold uppercase">{model?.fixedp?<div>
                <h1>Fixed price = {model?.rates[0]}</h1>
            </div>:<div>
                <h1>No damage = {model?.rates[0]}</h1>
                <h1>Only body damage = {model?.rates[1]}</h1>
                <h1>Screen damage = {model?.rates[2]}</h1>
            </div>}</div>}
              <div className="mb-3 invisible">hii</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkprice;
