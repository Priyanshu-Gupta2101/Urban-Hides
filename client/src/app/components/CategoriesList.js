import { categories } from "../../../db/categories.js";
import "../home.css";

const CategoriesList = () => {
  return (
    <div className="min-w-full border-2" style={{ marginTop: "50px" }}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {categories.map((c) => {
          return (
            <a
              href={c.link}
              key={c.id}
              className="category border border-solid m-4 relative"
              style={{
                maxWidth: "100%", // Adjust the max width as needed
                height: "100%",
                display: "block",
                overflow: "hidden",
              }}
            >
              <img
                src={c.image}
                alt=""
                className="img-fluid m-0 object-cover w-full h-auto"
              />
              <div
                className="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  backgroundColor: "#3498db",
                  padding: "10px 20px",
                  borderRadius: "8px",
                }}
              >
                <p
                  className="text-white font-bold text-lg"
                  style={{
                    fontFamily: "Arial, sans-serif",
                    fontSize: "1.5rem",
                  }}
                >
                  {c.name}
                </p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default CategoriesList;
