"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GalleryImage } from "@/types";
import { getCategoryImage, getEnterpriseImage } from "@/lib/images";

interface GalleryCarouselProps {
  images: GalleryImage[];
}

export function GalleryCarousel({ images }: GalleryCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (images.length === 0) {
    return (
      <div className="flex h-96 items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-800">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  return (
    <>
      {/* Main Carousel */}
      <div className="relative overflow-hidden rounded-lg">
        <div className="relative h-96 w-full bg-gray-200 dark:bg-gray-800">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={images[currentIndex].url}
              alt={images[currentIndex].alt}
              className="h-full w-full cursor-pointer object-cover"
              onClick={() => setIsLightboxOpen(true)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>

          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur hover:bg-white dark:bg-gray-900/80 dark:hover:bg-gray-900"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur hover:bg-white dark:bg-gray-900/80 dark:hover:bg-gray-900"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}

          {/* Counter */}
          <div className="absolute bottom-4 right-4 rounded-full bg-black/50 px-3 py-1 text-sm text-white backdrop-blur">
            {currentIndex + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="mt-4 flex gap-2 overflow-x-auto">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                  index === currentIndex
                    ? "border-blue-500"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="h-20 w-20 object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setIsLightboxOpen(false)}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsLightboxOpen(false)}
              className="absolute right-4 top-4 text-white hover:bg-white/20"
            >
              <X className="h-6 w-6" />
            </Button>

            <motion.img
              src={images[currentIndex].url}
              alt={images[currentIndex].alt}
              className="max-h-full max-w-full object-contain"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
            />

            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
