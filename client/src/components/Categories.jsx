import React from "react";
import { Link } from "react-router-dom";
import { categories } from "../data";

const Categories = () => {
  return (
    <div className="categories flex flex-col items-center text-center gap-8 my-12">
      <h1 className="text-4xl font-extrabold">Explore top level categories</h1>
      <p className="text-2xl tracking-tight text-gray-800 ">
        {" "}
        Rental homes are typically categorized into apartments, houses, condos,
        and townhomes. Each offers distinct advantages in terms of space,
        privacy, cost, and amenities. These categories help renters find
        suitable options based on their lifestyle preferences, location needs,
        and budget.{" "}
      </p>

      <div className="categories-list flex flex-wrap items-center justify-center gap-4">
     

        {categories?.slice(1, 7).map((category, index) => (
          <Link to={`/properties/category/${category.label}`} key={index}>
            <div
              className="category rounded-lg overflow-hidden h-[500px] w-[500px] relative flex justify-center items-center"
              key={index}
            >
              <img
                className="h-full w-full object-center object-cover absolute"
                src={category.img}
                alt={category.label}
              />
              <div className="overlay relative flex justify-center items-center w-full h-full rounded-lg bg-black/70 hover:h-[85%] hover:w-[85%] transition-all duration-300 ease-in-out">
                <div className="category-text flex flex-col items-center gap-3">
                  <div className="text-5xl font-mono text-white tracking-tight">
                    {" "}
                    {category.icon}{" "}
                  </div>
                  <p className="text-4xl font-mono text-white tracking-tight">
                    {category.label}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
