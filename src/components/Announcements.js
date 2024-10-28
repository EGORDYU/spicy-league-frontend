import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Announcements = () => {
  const announcements = [
    "Announcement 1/2: New season draft begins September 6th!",
    "Announcement 2/2: Join our Discord for updates! https://discord.gg/s6Hrh6uf",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
  };

  const createAnnouncement = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex).map((part, index) => {
      if (part.match(urlRegex)) {
        return <a key={index} href={part} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">{part}</a>;
      }
      return part;
    });

    return <div>{parts}</div>;
  };

  return (
    <div className="container mx-auto py-8">
      <Slider {...settings}>
        {announcements.map((announcement, index) => (
          <div key={index} className="p-4">
            <div className="bg-gray-700 text-white p-4 rounded-lg shadow-md text-center">
              {createAnnouncement(announcement)}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Announcements;
