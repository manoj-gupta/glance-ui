import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { useStyles } from "../styles";

import {
  Avatar,
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

const Register = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const classes = useStyles();

  const submit = async (event) => {
    event.preventDefault();
    console.log(name, email, password, redirect);

    if (name) {
      const params = JSON.stringify({
        name: name,
        email: email,
        password: password,
      });
      axios
        .post(props.endpoint + "/api/register", params, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setRedirect(true);
          console.log(res);
        });
    }
  };

  if (redirect) {
    return <Redirect to="/sign-in" />;
  }

  return (
    <form onSubmit={submit}>
      <Grid>
        <Paper elevation={10} className={classes.paperStyle}>
          <Grid align="center">
            <Avatar className={classes.avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Sign Up</h2>
          </Grid>
          <TextField
            label="Name"
            placeholder="Enter Name"
            fullWidth
            required
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            placeholder="Enter Email"
            fullWidth
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            placeholder="Enter Password"
            type="password"
            fullWidth
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <FormControlLabel
            control={<Checkbox name="checkedB" color="primary" />}
            label="I want to receive inspiration, marketing promotions and updates via email."
          /> */}
          <Button
            type="submit"
            color="primary"
            variant="contained"
            className={classes.btnStyle}
            fullWidth
          >
            Sign Up
          </Button>
          <Typography>
            {" "}
            Already have an account? <Link href="/sign-in">Sign in</Link>
          </Typography>
        </Paper>
      </Grid>

      {/* <h1 className="h3 mb-3 fw-normal">Please register</h1>

      <input
        className="form-control"
        placeholder="Name"
        required
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        className="form-control"
        placeholder="Email address"
        required
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="form-control"
        placeholder="Password"
        required
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="w-100 btn btn-lg btn-primary" type="submit">
        Submit
      </button> */}
    </form>
  );
};

export default Register;
