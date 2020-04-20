import React, { useState, useEffect } from "react";

const Profile = () => {
  const [profileInfo, setProfileInfo] = useState([]);
  const usrData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    fetch("/profile/me", {
      method: "GET",
      headers: {
        "x-auth-token": usrData.token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProfileInfo(data);
      });
  }, [setProfileInfo]);

  console.log(profileInfo);

  return (
    <div>
      <p>{profileInfo.name}</p>
      <p>{profileInfo.surname}</p>
    </div>
  );
};

export default Profile;
