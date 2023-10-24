"use client";
import { categories } from "../../../db/categories.js";
import Image from "next/image";

import "../home.css";

const CategoriesList = () => {
  return (
    <div className="min-w-full border-2" style={{ marginTop: "50px" }}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((c) => {
          return (
            <div key={c.id} className="category justify-self-center p-0">
              <img src={c.image} alt="" className="img-fluid m-0" />
              <h4 className={`text-center`}>{c.name}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoriesList;
