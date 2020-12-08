import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Page404() {
  return (
    <div>
      <Navbar isLoggedIn={false} />
      <div className="container">
        <h1>Page not found.</h1>
      </div>
      <Footer />
    </div>
  );
}
