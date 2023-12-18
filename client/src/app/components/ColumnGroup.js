import React from "react";

const ColumnGroup = ({ Images }) => {
  return (
    <div className="column">
      {Images.map((image) => {
        return (
          <div className="photo">
            <img src={image.url} alt="" />
          </div>
        );
      })}
    </div>
  );
};

export default ColumnGroup;
