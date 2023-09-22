import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";

const UserState = (props) => {
  const host = "http://localhost:5000";

  // Define state to store user information
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user information
  const fetchUserInformation = async () => {
    try {
      const response = await fetch(`${host}/api/auth/getusers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        // Handle error responses here if needed
      }
    } catch (error) {
      // Handle network or other errors here
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  // Fetch user information when the component mounts
  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchUserInformation();
    }
  }, []);

  return (
    <UserContext.Provider value={{ userData, loading }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
