import React, { useState } from "react";

const PropertyGallery = ({ images = [] }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  const defaultImage = "https://via.placeholder.com/800x600?text=No+Image";
  const imageList = images.length > 0 ? images : [{ url: defaultImage }];

  return (
    <div className="property-gallery">
      <div className="main-image">
        <img
          src={imageList[selectedImage]?.url || defaultImage}
          alt="Property"
        />
      </div>

      {imageList.length > 1 && (
        <div className="thumbnail-list">
          {imageList.map((image, index) => (
            <div
              key={index}
              className={`thumbnail ${selectedImage === index ? "active" : ""}`}
              onClick={() => setSelectedImage(index)}
            >
              <img src={image.url} alt={`Thumbnail ${index + 1}`} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyGallery;
