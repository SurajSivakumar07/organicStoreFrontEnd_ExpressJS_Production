import axios from "axios";

export const addTocart = (items) => {
  axios.post(
    "https://orgranicstorebackendexpressproduction.onrender.com/cart",
    {
      userId: localStorage.getItem("userId"),
      image: items.img,
      productId: items.id,
      quantity: 1,
      price: items.price,
    }
  );
};
