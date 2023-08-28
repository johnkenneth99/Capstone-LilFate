import React from "react";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="w-full min-h-screen bg-white">
      <Navbar />
      <section className="m-10">{children}</section>
    </div>
  );
}
