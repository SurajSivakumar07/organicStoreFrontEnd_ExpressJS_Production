import React, { useState } from "react";

import "./dynamic.css";

import Nav from "../Fruits/Nav";

import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer, toast } from "react-toastify";
import IconButton from "@mui/material/IconButton";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useEffect } from "react";
import { addTocart } from "./addtoCartBackend";
import axios from "axios";

export default function Apple() {
  const arr = window.location.href.split("/");
  const named = arr[arr.length - 1].toLowerCase();
  const [loding, setLoding] = useState(false);

  const [value, setValue] = useState([]);

  const [added, setAdded] = useState(true);

  const [sellerFount, setSellerFound] = useState(true);
  const isLoggedIn = useSelector((state) => state.isLoggedIn.isLoggedIn);
  console.log(isLoggedIn);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        "https://orgranicstorebackendexpressproduction.onrender.com/seller"
      );

      const data = response.data;

      const filteredData = data.filter((items) => {
        return named.localeCompare(items.name.toLowerCase()) === 0;
      });

      setValue(filteredData);
      setLoding(true);
    }

    fetchData();
  }, []);

  const loog = localStorage.getItem("isLoggedin");

  const [arr1, setArr1] = useState([]);

  return (
    <>
      <Nav />
      <ToastContainer />
      <div className="whole-wrap-dynamics">
        <div className="seller-display-wrap">
          {value.length > 0 ? (
            <div className="seller-display-wrap">
              {loding
                ? value.map((items) => (
                    <div
                      className="display-sellers-wrap"
                      key={items.id}
                      style={{ marginTop: 10 }}
                    >
                      <img src={items.img} alt={items.name} />
                      <h1>Seller Name:{items.sellerName}</h1>
                      <h1>Fruit Name:{items.name}</h1>
                      <h2>Price:{items.price}/kg</h2>

                      {/* </FormControl> */}
                      <div className="hidden-cart">
                        <button
                          id="add_to_cart"
                          onClick={() => {
                            if (loog === null) alert("Need to sign in");
                            else {
                              if (added === true) {
                                setArr1(JSON.stringify([...arr1, items]));

                                addTocart(items);

                                toast.success("Success Notification !", {
                                  position: toast.POSITION.TOP_RIGHT,
                                });
                              } else {
                                alert("Already added");
                              }
                            }
                          }}
                        >
                          {added ? (
                            <IconButton
                              color="primary"
                              aria-label="add to shopping cart"
                              style={{ height: 20 }}
                            >
                              <AddShoppingCartIcon />
                            </IconButton>
                          ) : (
                            <p style={{ color: "red" }}>Added!</p>
                          )}
                        </button>
                      </div>
                    </div>
                  ))
                : ""}
            </div>
          ) : (
            <p style={{ textAlign: "center", fontSize: 30 }}>
              {" "}
              <div className="loader"></div>
              {sellerFount ? (
                " finding Sellers!"
              ) : (
                <>
                  <p> Fetching Sellers !</p>
                </>
              )}
              {/*  */}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
