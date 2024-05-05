import React, { useEffect, useState } from "react";
import Nav from "../Fruits/Nav";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setProducts } from "../../Redux/actions/action";
import Button from "@mui/material/Button";
import "./cart.css";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";

export default function Cart() {
  const [prod, setProd] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const navigation = useNavigate();
  const removeFromCart = (id) => {
    axios
      .delete(
        `https://orgranicstorebackendexpressproduction.onrender.com/cart/${id}`
      )
      .then(() => {
        setProd(prod.filter((item) => item._id !== id)); // Update state instead of reloading the page
      })
      .catch((error) => {
        console.error("Error removing item from cart:", error);
      });
  };
  const calculatePrice = (data) => {
    const totalPrice = data.reduce((acc, item) => acc + item.price, 0);
    setTotal(totalPrice);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://orgranicstorebackendexpressproduction.onrender.com/cart"
        );
        const data = response.data;
        const filteredData = data.filter(
          (item) => item.userId === localStorage.getItem("userId")
        );
        setProd(filteredData);
        dispatch(setProducts(filteredData));
        calculatePrice(filteredData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, removeFromCart]);

  return (
    <>
      {loading ? (
        <div className="loader"></div>
      ) : (
        <>
          <Nav />
          <ToastContainer />
          <div className="main-cart">
            <div className="cart-main-wrap">
              {prod.length === 0 ? (
                <div
                  id="cart-text"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 15,
                    flexDirection: "column",
                  }}
                >
                  <div
                    className="no-items"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <h1>No items in cart😕</h1>
                  </div>
                </div>
              ) : (
                <div className="cart-wrap">
                  {prod.map((item) => (
                    <div
                      className="display-sellers-wrap"
                      key={item._id}
                      id="test"
                    >
                      <img src={item.image} alt="product" />
                      <h2>Price: {item.price}/kg</h2>
                      <div className="hidden-cart">
                        <button onClick={() => removeFromCart(item._id)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {prod.length > 0 && (
              <div className="check-out">
                <h1>Total Price: {total}</h1>
                <Button
                  variant="outlined"
                  onClick={() => {
                    navigation("/checkout");
                  }}
                >
                  Check Out
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
