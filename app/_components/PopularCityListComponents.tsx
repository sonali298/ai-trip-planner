"use client";

import React from "react";
// We no longer need to import Carousel or Card from the library
// import { Carousel } from "@/components/ui/apple-cards-carousel"; 

// This component renders the visual appearance of each card
const CityCard = ({ card }: { card: any }) => {
  return (
    <div
      className="relative h-96 w-full rounded-2xl bg-cover bg-center transition-transform duration-300 hover:scale-105"
      style={{
        backgroundImage: `url(${card.src})`,
      }}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/70 to-transparent" />
      <div className="relative z-10 p-6 text-left text-white">
        <p className="text-sm font-light">{card.category}</p>
        <p className="mt-2 text-xl font-bold md:text-2xl">{card.title}</p>
      </div>
    </div>
  );
};

function PopularCityListComponents() {
  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl mx-auto px-4 text-xl md:text-5xl font-bold text-center text-neutral-800 dark:text-neutral-200 font-sans">
        Popular Destinations
      </h2>

      {/* Grid container to "scatter" the cards */}
      <div className="max-w-7xl mx-auto mt-12 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((card, index) => (
          <CityCard key={index} card={card} />
        ))}
      </div>
    </div>
  );
}

// Data array with working image URLs
const data = [
  {
    category: "Paris, France",
    title: "Explore the City of Lights",
    src: "https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?q=80&w=1974&auto=format&fit=crop",
  },
  {
    category: "New York, USA",
    title: "Experience NYC",
    src: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop",
  },
  {
    category: "Tokyo, Japan",
    title: "Discover Tokyo",
    src: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=2070&auto=format&fit=crop",
  },
  {
    category: "Rome, Italy",
    title: "Walk through History",
    src: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1996&auto=format&fit=crop",
  },
  {
    category: "Dubai, UAE",
    title: "Luxury and Innovation",
    src: "https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1974&auto=format&fit=crop",
  },
    {
    category: "Bali, Indonesia",
    title: "Tropical Paradise",
    src: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1938&auto=format&fit=crop",
  },
];

export default PopularCityListComponents;