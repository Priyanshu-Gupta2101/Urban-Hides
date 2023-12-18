import React from "react";
import { Images1, Images2, Images3 } from "./image";
import ColumnGroup from "../components/ColumnGroup";
import "./images.css";

const ImageGrid = () => {
  return (
    <div className="container">
      <h1 className="title"> Responsive Image Grid </h1>
      <div className="photo-gallery">
        <ColumnGroup Images={Images1} />
        <ColumnGroup Images={Images2} />
        <ColumnGroup Images={Images3} />
      </div>
    </div>
  );
};

export default ImageGrid;
