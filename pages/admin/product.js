import { useEffect, useState } from "react";
import axios from "axios";
import { getCookie, deleteCookie } from "cookies-next";
import Addcomp from "../components/addComp";

function Product() {
  const [company, setCompany] = useState("");
  const [allcomp, setAllComp] = useState([]);
  const [comp, setComp] = useState("");
  const [model, setModel] = useState("");
  const [fixedp, setFixedP] = useState(false);
  const [price1, setPrice1] = useState("");
  const [price2, setPrice2] = useState("");
  const [price3, setPrice3] = useState("");
  const [allmodels, setAllmodels] = useState([]);

  useEffect(() => {
    getCookie("admin-token")&&axios
      .get("https://exchange123.herokuapp.com/admin/product/allcomp", {
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": getCookie("admin-token"),
        },
      })
      .then((res) => {
        setAllComp(res.data);
      })
      .catch((err) => {
        window.alert("something went wrong");
        console.log(err);
      });
  }, [allcomp]);

  useEffect(() => {
    getCookie("admin-token")&&axios
      .get("https://exchange123.herokuapp.com/admin/product/models", {
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": getCookie("admin-token"),
        },
      })
      .then((res) => {
        setAllmodels(res.data);
      })
      .catch((err) => {
        console.log(err);
        window.alert("something went wrong");
      });
  }, [allmodels]);

  const addCompany = (e) => {
    e.preventDefault();
    const data = { name: company };
    axios
      .post("https://exchange123.herokuapp.com/admin/product/addcompany", data, {
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": getCookie("admin-token"),
        },
      })
      .then((res) => {
        setCompany("");
      })
      .catch((err) => {
        window.alert("something went wrong");
      });
  };

  const addModel = (e) => {
    e.preventDefault();
    let data = {};
    if (!fixedp) {
      data = {
        name: model,
        company: comp.name,
        fixedp: fixedp,
        rates: [price1, price2, price3],
      };
    } else {
      data = {
        name: model,
        company: comp.name,
        fixedp: fixedp,
        rates: [price1],
      };
    }
    axios
      .post("https://exchange123.herokuapp.com/admin/product/addmodel/" + comp._id, data, {
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": getCookie("admin-token"),
        },
      })
      .then((res) => {
        setPrice1("");
        setPrice2("");
        setPrice3("");
        setModel("");
      });
  };

  return (
    <div className="mt-5">
      <div className="flex flex-col gap-3 justify-evenly items-center md:items-start md:flex-row">
        <Addcomp
          setCompany={setCompany}
          addCompany={addCompany}
          company={company}
        />

        <div className="w-full max-w-xs">
          <form
            className="bg-blue-300 shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={addModel}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Add model name
              </label>
              <div className="mb-3 mt-3 ">
                <select
                  onChange={(e) => {
                    setComp(JSON.parse(e.target.value));
                  }}
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
                      <option key={v._id} value={JSON.stringify(v)}>
                        {v.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                ></label>
                <input
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Enter model name"
                ></input>
              </div>

              <label
                htmlFor="default-toggle"
                className="inline-flex relative items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  value=""
                  id="default-toggle"
                  className="sr-only peer"
                  onChange={() => setFixedP(!fixedp)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Fixed price
                </span>
              </label>

              {fixedp ? (
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  ></label>
                  <input
                    value={price1}
                    onChange={(e) => setPrice1(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Enter fixed price"
                  ></input>
                </div>
              ) : (
                <div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="username"
                    ></label>
                    <input
                      value={price1}
                      onChange={(e) => setPrice1(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="text"
                      placeholder="Enter price no damage"
                    ></input>
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="username"
                    ></label>
                    <input
                      value={price2}
                      onChange={(e) => setPrice2(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="text"
                      placeholder="Enter price of only body damage"
                    ></input>
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="username"
                    ></label>
                    <input
                      value={price3}
                      onChange={(e) => setPrice3(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="text"
                      placeholder="Enter price of screen damage"
                    ></input>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={addModel}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="overflow-x-auto relative  m-5 rounded-md">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-blue-400 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                index
              </th>
              <th scope="col" className="py-3 px-6">
                model name
              </th>
              <th scope="col" className="py-3 px-6">
                company name
              </th>
              <th scope="col" className="py-3 px-6">
                fixed price
              </th>
              <th scope="col" className="py-3 px-6">
                no damage price
              </th>
              <th scope="col" className="py-3 px-6">
                body damage price
              </th>
              <th scope="col" className="py-3 px-6">
                screen damage price
              </th>
            </tr>
          </thead>
          <tbody>
            {allmodels.map((v, i) => {
              return (
                <tr key={v._id} className="bg-blue-100 border-b dark:bg-gray-900 dark:border-gray-700">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {i + 1}
                  </th>
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {v.name}
                  </th>
                  <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {v.company}
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {v.fixedp?v.rates[0]:"NA"}
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {v.fixedp?"NA":v.rates[0]}
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {v.fixedp?"NA":v.rates[1]}
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {v.fixedp?"NA":v.rates[2]}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Product;
