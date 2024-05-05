import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./veggies.css";
import { UserContext } from "../Context";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { displayVeggiesAction } from "../../Redux/actions/action";

export default function DisplayVeggies() {
  const { search } = useContext(UserContext);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const [veggies, setVeggies] = useState([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://orgranicstorebackendexpressproduction.onrender.com/veggie"
        );
        const data = response.data;
        dispatch(displayVeggiesAction(data));
        setVeggies(data);
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
            {veggies
              .filter((item) => {
                if (search === "") return true;
                return item.veggieName
                  .toLowerCase()
                  .includes(search.toLowerCase());
              })
              .map((fruit) => (
                <div
                  className="displayImageWrap"
                  key={fruit.id}
                  onClick={() =>
                    navigation(`/fruits/${fruit.veggieName.toLowerCase()}`)
                  }
                >
                  <img src={fruit.Image} alt={fruit.veggieName} />
                  <div className="dipslay-image-text">
                    <h1>{fruit.veggieName}</h1>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}
