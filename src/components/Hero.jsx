import Link from 'next/link';
import React from 'react';

const Hero = () => {
  return (
    <section className="relative w-full h-[400px]">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover rounded-md"
        src="https://videos.pexels.com/video-files/7525343/7525343-hd_1920_1080_25fps.mp4" 
      />
      
      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-55 rounded-md" />

      {/* Content */}
      <div className="relative w-full h-full flex items-center justify-center text-center text-white">
        <div>
          <h1 className="text-4xl font-bold drop-shadow-xl">Welcome to SweetShare</h1>
          <p className="my-4 drop-shadow-lg">Discover and share the best dessert recipes from around the world.</p>
          <Link href={'/recipes'} className=" bg-primary p-2 rounded-md">Explore Recipes</Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
