"use client";
import React, { useState } from "react";

const ProductDimensionsInput = () => {
  const [dimensions, setDimensions] = useState({
    length: "",
    width: "",
    height: "",
  });

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setDimensions((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Submit these dimensions along with other product details
    console.log("Submitted dimensions:", dimensions);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="length">Length (cm):</label>
      <input
        type="number"
        id="length"
        name="length"
        value={dimensions.length}
        onChange={handleInputChange}
      />

      <label htmlFor="width">Width (cm):</label>
      <input
        type="number"
        id="width"
        name="width"
        value={dimensions.width}
        onChange={handleInputChange}
      />

      <label htmlFor="height">Height (cm):</label>
      <input
        type="number"
        id="height"
        name="height"
        value={dimensions.height}
        onChange={handleInputChange}
      />

      <button type="submit">Submit Dimensions</button>
    </form>
  );
};

export default ProductDimensionsInput;
