import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import gif from "../images/404.gif";

export default function Page404() {
  return (
    <div>
      <Navbar isLoggedIn={false} />
      <div className="container">
        <div className="m-5 p-5">
          <img src={gif} alt="404 page" className="img-fluid" />
        </div>
      </div>
      <Footer />
    </div>
  );
}
