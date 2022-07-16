import React from 'react'

function Addcomp({company,addCompany,setCompany}) {
  return (
    <div className="w-full max-w-xs">
          <form className="bg-blue-300 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Add company name
              </label>
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Company"
              ></input>
            </div>

            <div className="flex items-center justify-between">
              <button
              onClick={addCompany}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Add
              </button>
            </div>
          </form>
        </div>
  )
}

export default Addcomp