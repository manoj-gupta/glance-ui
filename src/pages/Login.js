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
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const classes = useStyles();

  const submit = async (event) => {
    event.preventDefault();
    console.log(email, password, redirect);

    if (email) {
      const params = JSON.stringify({
        email: email,
        password: password,
      });

      axios
        .post(props.endpoint + "/api/login", params, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .then((res) => {
          console.log("Login Success");
          setRedirect(true);
          console.log(res);
          props.setName(res.name);
        });
    }
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={submit}>
      <Grid>
        <Paper elevation={10} className={classes.paperStyle}>
          <Grid align="center">
            <Avatar className={classes.avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Sign In</h2>
          </Grid>
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
          <FormControlLabel
            control={<Checkbox name="checkedB" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            className={classes.btnStyle}
            fullWidth
          >
            Sign in
          </Button>
          <Typography>
            <Link href="tbd">Forgot password ?</Link>
          </Typography>
          <Typography>
            {" "}
            Do you have an account ?<Link href="/sign-up">Sign Up</Link>
          </Typography>
        </Paper>
      </Grid>
    </form>
  );
};

export default Login;
