import React from "react";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="w-full min-h-screen bg-white">
      <Navbar />
      <section className="m-12">{children}</section>
      {/* <div className="flex bg-slate-900 text-white p-20 justify-center items-center">Footer</div> */}
    </div>
  );
}
