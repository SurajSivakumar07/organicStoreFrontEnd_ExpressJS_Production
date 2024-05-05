import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { displayFruitsAction } from "../../Redux/actions/action";
import axios from "axios";

export default function DisplayFruits() {
  const { search } = useContext(UserContext);
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const [fruits, setFruits] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://orgranicstorebackendexpressproduction.onrender.com/"
        );
        const data = response.data;
        dispatch(displayFruitsAction(data));
        setFruits(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <div class="loader"></div>
      ) : (
        <div className="display-main">
          <h1 id="displayTitle">Best Selling Fruits!</h1>
          <div className="displayFruits">
            {fruits
              .filter((item) => {
                if (search === "") return true;
                return item.fruitsName
                  .toLowerCase()
                  .includes(search.toLowerCase());
              })
              .map((fruit) => (
                <div
                  className="displayImageWrap"
                  key={fruit.id}
                  onClick={() =>
                    navigation(`/fruits/${fruit.fruitsName.toLowerCase()}`)
                  }
                >
                  <img src={fruit.image} alt={fruit.name} />
                  <div className="dipslay-image-text">
                    <h1>{fruit.fruitsName}</h1>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}
