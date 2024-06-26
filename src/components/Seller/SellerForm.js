import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import axios from "axios";
import "./seller.css";

export default function SellerForm() {
  const [name, setName] = React.useState();
  const [type, setType] = React.useState();
  const [img, setImg] = React.useState();
  const [price, setPrice] = React.useState();

  const formHandler = async (e) => {
    e.preventDefault();

    try {
      const respose = await axios.post(
        "https://orgranicstorebackendexpressproduction.onrender.com/seller",
        {
          id: 1,
          sellingType: type,
          name: name,
          img: img,
          price: parseInt(price),
        }
      );

      alert(respose.status + "Submitted");
    } catch (err) {
      alert(err);
    }
  };

  const style = {
    height: "100vh",
  };
  return (
    <div className="from-dealer-wrap">
      <form onSubmit={formHandler}>
        <React.Fragment>
          <Typography variant="h6" gutterBottom>
            Selling Page
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="firstName"
                name="firstName"
                label="First name"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                onChange={(e) => setType(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="address1"
                name="address1"
                label="Fruite Name / Vegetable Name"
                fullWidth
                autoComplete="shipping address-line1"
                variant="standard"
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="address2"
                name="address2"
                label="Image"
                fullWidth
                autoComplete="shipping address-line2"
                variant="standard"
                onChange={(e) => setImg(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="city"
                name="city"
                label="Price"
                fullWidth
                autoComplete="shipping address-level2"
                variant="standard"
                onChange={(e) => setPrice(e.target.value)}
              />
            </Grid>
          </Grid>
        </React.Fragment>
        <input type="submit" />
      </form>
    </div>
  );
}
