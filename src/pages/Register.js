import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

const Register = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

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
    return <Redirect to="/login" />;
  }

  return (
    <form onSubmit={submit}>
      <h1 className="h3 mb-3 fw-normal">Please register</h1>

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
      </button>
    </form>
  );
};

export default Register;
