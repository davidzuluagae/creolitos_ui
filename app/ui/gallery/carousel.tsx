"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const galleryImages = [
  "IMG_5776.jpg"
]; // add all your filenames in /public/gallery

export default function GalleryCarousel() {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="rounded-2xl shadow-lg"
      >
        {galleryImages.map((filename, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={`/gallery/${filename}`}
              alt={`Gallery image ${idx + 1}`}
              className="w-full h-64 object-cover rounded-xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
