import React, { useContext, useEffect } from "react";
import UserContext from "../context/user/UserContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const context = useContext(UserContext);
  let navigate = useNavigate();
  const { userData, loading } = context;

  useEffect(() => {
    // Check if a user is authenticated
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {userData ? (
            <>
              <h3 className="mb-4">Profile Information</h3>
              <p>
                <b>User Id:</b> {userData._id}
              </p>
              <p>
                <b>Name:</b> {userData.name}
              </p>
              <p>
                <b>Username:</b> {userData.username}
              </p>
              <p>
                <b>Email:</b> {userData.email}
              </p>
              <p>
                <b>Phone:</b> {userData.phone}
              </p>
            </>
          ) : (
            <p>User information not available.</p>
          )}
        </>
      )}
    </>
  );
};

export default Profile;
