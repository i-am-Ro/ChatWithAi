import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleSuccess } from "../utils";

function Home() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    setLoggedInUser(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");

    handleSuccess("User logged out");

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <div>
      <h1>Welcome {loggedInUser}</h1>

      <button onClick={handleLogout}>Logout</button>

      <ToastContainer />
    </div>
  );
}

export default Home;
