import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

function Logout(props) {
  const submit = async () => {
    axios
      .post(props.endpoint + "/api/logout", "", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log("Logout Success");
        console.log(res);
        props.setName("");
        return <Redirect to="/login" />;
      });
  };

  return (
    <form onSubmit={submit}>
      <h1 className="h3 mb-3 fw-normal">Confirm Sign Out</h1>
      <button className="w-100 btn btn-lg btn-primary" type="submit">
        Sign Out
      </button>
    </form>
  );
}

export default Logout;
