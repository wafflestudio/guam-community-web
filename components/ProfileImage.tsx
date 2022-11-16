import React from "react";

const ProfileImage = ({ imageUrl, alt }: { imageUrl: string; alt: string }) => {
  return (
    <img
      src={imageUrl}
      onError={({ currentTarget }) => {
        currentTarget.onerror = null;
        currentTarget.src = "/default_profile_image.png";
      }}
      alt={alt}
    />
  );
};

export default ProfileImage;
