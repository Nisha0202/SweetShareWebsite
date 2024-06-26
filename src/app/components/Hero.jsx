import React from 'react';

const Hero = () => {
  return (
    <section className="relative w-full h-96">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover rounded-md"
        src="https://videos.pexels.com/video-files/7525334/7525334-hd_1920_1080_25fps.mp4" 
      />
      
      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 rounded-md" />

      {/* Content */}
      <div className="relative w-full h-full flex items-center justify-center text-center text-white">
        <div>
          <h1 className="text-4xl font-bold">Welcome to SweetShare</h1>
          <p className="mt-4">Discover and share the best dessert recipes from around the world.</p>
          <button className="mt-4 bg-primary p-2 rounded-md">Explore Recipes</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
