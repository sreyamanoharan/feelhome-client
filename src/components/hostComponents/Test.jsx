import React, { useState } from "react";

const Test = () => {
  const [selectedImage, setSelectedImage] = useState(null);


  
  const images = [
    "https://via.placeholder.com/800", 
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/400",
    "https://via.placeholder.com/500",
    "https://via.placeholder.com/600",
    "https://via.placeholder.com/700",
  ];

  return (
    <div className="container mx-auto p-4">
      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative cursor-pointer ${
              index === 0
                ? "col-span-2 row-span-2" // First image spans 2 columns and rows
                : "col-span-1 row-span-1"
            }`}
            onClick={() => setSelectedImage(image)}
          >
            <img
              src={image}
              alt={`Gallery item ${index + 1}`}
              className="rounded-lg w-full h-full object-cover hover:opacity-80 transition duration-300"
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 text-white text-xl z-10"
            >
              &times;
            </button>
            <img
              src={selectedImage}
              alt="Selected"
              className="rounded-lg max-h-[90vh] max-w-[90vw]"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Test;
