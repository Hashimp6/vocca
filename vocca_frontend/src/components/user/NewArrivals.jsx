import React from "react";
import image1 from "../../assets/newarrival1.jpg";
import image2 from "../../assets/newarrival2.jpg";
import image3 from "../../assets/newarrival3.jpg";
import image4 from "../../assets/newarrival4.jpg";
const NewArrivals = () => {
  const arrivals = [
    {
      name: "Product 1",
      price: 29.99,
      imageUrl: image1,
      link: "/product1",
    },
    {
      name: "Product 2",
      price: 39.99,
      imageUrl: image2,
      link: "/product2",
    },
    {
      name: "Product 3",
      price: 49.99,
      imageUrl: image3,
      link: "/product3",
    },
    // {
    //   name: "Product 4",
    //   price: 59.99,
    //   imageUrl: image4,
    //   link: "/product4",
    // },
  ];
  return (
    <div className="container mx-auto px-4 py-8">
      <h1
        className="text-5xl font-bold m-4 text-center py-6"
        style={{ fontFamily: "MonsterOfFantasy" }}
      >
        New Arrivals
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
        {arrivals.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300"
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;
