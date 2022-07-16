import React from "react";
import { getCookie,deleteCookie } from "cookies-next";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import Adminheader from "../components/adminheader";
import Userdetails from "./userdetails";
import {useState} from "react"
import Product from "./product";

function Dashboard() {
  const router = useRouter();
  const [page,setPage]=useState(<Userdetails/>) ;

  return (
    <div>
      <Adminheader/>
      <div className="flex  justify-center items-center text-2xl uppercase divide-x">
        <h1 className="hover:text-white cursor-pointer p-1" onClick={()=>setPage(<Userdetails/>)}>User Details</h1>
        <h1 className="hover:text-white cursor-pointer p-1" onClick={()=>setPage(<Product/>)}>Product</h1>
      </div>
      <div>
      {
        page
      }
      </div>
      
    </div>
  );
}

export async function getServerSideProps(ctx) {
  if (getCookie("admin-token", ctx)) {
    const res = await axios.get("https://exchange123.herokuapp.com/admin/auth/verify", {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": getCookie("admin-token", ctx),
      },
    });
    if (res.data.islogin) {
      return {
        props: {},
      };
    } else {
      return {
        redirect: {
          permanent: false,
          destination: "/admin/",
        },
      };
    }
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/admin/",
      },
    };
  }
}

export default Dashboard;
