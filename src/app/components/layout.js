"use client";
import React from "react";
import Sidebar from "./sidebar";
import '../styling/global.css'

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Sidebar />
      <main className="content">{children}</main>
    </div>
  );
};

export default Layout;
