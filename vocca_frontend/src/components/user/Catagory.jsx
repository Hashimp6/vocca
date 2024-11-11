import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CategoryCard = ({ image, title, description, gender }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products?gender=${gender}`);
  };

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer relative overflow-hidden rounded-xl hover:shadow-xl transition-all duration-300"
    >
      <div className="relative h-96">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <p className="text-gray-200 mb-4">{description}</p>
          <div className="flex items-center text-white group-hover:text-blue-400 transition-colors">
            <span className="font-medium">Shop Now</span>
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};

const ShopByCategory = () => {
  const categories = [
    {
      title: "Men's Collection",
      description: "Discover our latest men's fashion collection",
      image: "../../../public/Mens.jpg",
      gender: "male",
    },
    {
      title: "Women's Collection",
      description: "Explore trendy women's fashion styles",
      image: "../../../public/womens.jpg",
      gender: "female",
    },
    {
      title: "Unisex Collection",
      description: "Fashion that transcends boundaries",
      image: "../../../public/unisex.jpg",
      gender: "unisex",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our diverse collection of clothing and accessories for
          everyone. Find your perfect style with our curated selections.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <CategoryCard
            key={category.gender}
            title={category.title}
            description={category.description}
            image={category.image}
            gender={category.gender}
          />
        ))}
      </div>
    </div>
  );
};

export default ShopByCategory;
