import React from "react";
import "./Home.css";
import headerImage from "../../headerImage.jpg";
// import {useA}

import { useUser } from "../useUser";
export const Home = () => {
  const user = useUser();
  return (
    <>
      <div class="hero is-fullheight is-primary has-background">
        {/* <img
          alt="Fill Murray"
          className="hero-background is-transparent"
          src={headerImage}
        /> */}
        <div className="hero-body">
          <div
            className="container  justify-content-center "
            style={{ marginTop: "230px" }}
          >
            <div className="row">
              <div className="col-md">
                <div className=" text-center  justify-content-center">
                  {/* <h1 className="title ">
                    {user && user ? `Welcome, ${user.name} ` : "projectZero"}
                  </h1>
                  <h3 className="subtitle lead"> </h3>
                  {user && user
                    ? "-projectZero Team"
                    : "Exploring MERN stack..."} */}
                  Home page content
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
