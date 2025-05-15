import React, { useEffect, useState } from 'react';
import './NationalTheaterHome.css';

const NationalTheaterHome = () => {
  const [backgroundImages] = useState([
    '/images/#movie #movienight #night #aesthetic.jfif',
    '/images/333624-1920x1200-desktop-hd-les-miserables-background.jpg',
    '/images/2081380-1980x1114-desktop-hd-mary-poppins-returns-2018-movie-wallpaper-image.jpg',
    '/images/333574-1920x1200-desktop-hd-les-miserables-background.jpg',
    '/images/33111-3200x2128-desktop-hd-la-la-land-background.jpg',
  ]);
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 5000); // تغيير الصورة كل 5 ثواني

    return () => clearInterval(interval);
  }, [backgroundImages]);

  return (
    <div className="national-theater-home">
      <div
        className="background-container"
        style={{ 
          backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
          opacity: 1
        }}
      >
        <div className="background-overlay"></div>
      </div>
      
      <div className="content-overlay">
        <header>
          <h1 className="title">Movie Night</h1>
          <p className="subtitle">
            When the lights go out and the first scene rolls in… movie night turns an ordinary evening into an unforgettable adventure!
          </p>
        </header>
        
        {/* تمت إزالة الأزرار وإضافة عنصر جمالي بدلاً منها */}
        <div className="movie-quote">
          <p>"Cinema is the most beautiful fraud in the world"</p>
          <p className="quote-author">- Jean-Luc Godard</p>
        </div>
      </div>
      
      <div className="image-indicators">
        {backgroundImages.map((_, index) => (
          <div 
            key={index}
            className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default NationalTheaterHome;