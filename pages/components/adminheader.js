import React from 'react'
import { getCookie,deleteCookie } from "cookies-next";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";

function Adminheader() {
    const router = useRouter();
  return (
    <div><div className="flex justify-between items-center md:p-5">
    <Image height={100} width={100} src={"/logo.png"} />
    <button
      type="button"
      onClick={() => {
        deleteCookie("admin-token"), router.replace('/admin');
      }}
      className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
    >
      Logout
    </button>
  </div></div>
  )
}

export default Adminheader