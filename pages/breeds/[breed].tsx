import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "../../app/globals.css";

const BreedPage: React.FC = () => {
  const router = useRouter();
  const { breed } = router.query;
  const [breedImages, setBreedImages] = useState<string[]>([]);
  const [showCarousel, setShowCarousel] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const handleBack = () => {
    router.back();
  };
  useEffect(() => {
    if (breed && typeof breed === "string") {
      fetch(`https://dog.ceo/api/breed/${breed}/images`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Failed to fetch images for ${breed}. Status: ${response.status}`
            );
          }
          return response.json();
        })
        .then((data) => setBreedImages(data.message))
        .catch((error) => {
          console.error("Error fetching images:", error.message);
          setError("Failed to fetch images. Please try again later.");
        });
    }
  }, [breed]);

  useEffect(() => {
    const carouselItems = document.querySelectorAll("[data-carousel-item]");
    const prevButton = document.querySelector("[data-carousel-prev]");
    const nextButton = document.querySelector("[data-carousel-next]");

    let currentIndex = 0;

    const showItem = (index: number) => {
      carouselItems.forEach((item, i) => {
        item.classList.toggle("active", i === index);
      });
    };

    const showNextItem = () => {
      currentIndex = (currentIndex + 1) % carouselItems.length;
      showItem(currentIndex);
    };

    const showPrevItem = () => {
      currentIndex =
        (currentIndex - 1 + carouselItems.length) % carouselItems.length;
      showItem(currentIndex);
    };

    if (nextButton && prevButton) {
      nextButton.addEventListener("click", showNextItem);
      prevButton.addEventListener("click", showPrevItem);

      showItem(currentIndex);

      return () => {
        nextButton.removeEventListener("click", showNextItem);
        prevButton.removeEventListener("click", showPrevItem);
      };
    }
  }, [breedImages, showCarousel]);

  const handleShowGridView = () => {
    setShowCarousel(false);
  };

  const handleShowCarouselView = () => {
    setShowCarousel(true);
  };

  return (
    <>
      <section
        className="relative bg-cover bg-center mb-8"
        style={{
          backgroundImage: "url('/assets/breedBackground.jpg')",
          height: "20vh",
          borderBottom: "1px solid black",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12 text-white">
          <h1 className="mb-4 text-lg font-semibold  leading-none md:text-xl lg:text-3xl capitalize">
            {breed}
          </h1>
        </div>
      </section>

      <div className="container mx-auto my-8">
        <div className="flex justify-between m-4">
          <button
            onClick={handleBack}
            className="bg-gray-100 text-white focus:outline-none px-2 py-2 rounded-lg transition hover:bg-gray-500"
          >
            <img src="/assets/arrowLeft.png" alt="Back" className="w-8 h-8" />
          </button>

          <div className="text-xl flex justify-end gap-2">
            {!error && (
              <>
                <button
                  onClick={handleShowGridView}
                  className={`px-2 py-2 rounded-lg transition ${
                    !showCarousel
                      ? "bg-gray-400 text-white hover:bg-gray-500"
                      : "bg-gray-100 text-black hover:bg-gray-500"
                  }`}
                >
                  <img
                    src="/assets/gridIcon.png"
                    alt="Grid View"
                    className="w-8 h-8"
                  />
                </button>
                <button
                  onClick={handleShowCarouselView}
                  className={`px-2 py-2 rounded-lg transition ${
                    showCarousel
                      ? "bg-gray-400 text-white hover:bg-gray-500"
                      : "bg-gray-100 text-black hover:bg-gray-500"
                  }`}
                >
                  <img
                    src="/assets/carouselIcon.png"
                    alt="Carousel View"
                    className="w-8 h-8"
                  />
                </button>
              </>
            )}
          </div>
        </div>

        {showCarousel ? (
          <div
            id="gallery"
            className="relative w-full bg-gray-400 rounded-lg py-4"
            data-carousel="slide"
          >
            <div className="relative h-96 overflow-hidden rounded-lg md:h-96">
              {breedImages &&
                breedImages.length > 0 &&
                breedImages.map((carouselImage, index) => (
                  <div
                    key={index}
                    className={`hidden duration-700 ease-in-out ${
                      index === 0 ? "active" : ""
                    }`}
                    data-carousel-item={index === 0 ? "active" : ""}
                  >
                    <img
                      src={carouselImage}
                      className="absolute block h-full w-50 object-cover -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-lg"
                      alt={`Carousel Image ${index + 1}`}
                    />
                  </div>
                ))}
            </div>

            <button
              type="button"
              className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
              data-carousel-prev
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <img
                  src="/assets/arrowLeft.png"
                  alt="Previous"
                  className="w-8 h-8"
                />
              </span>
            </button>

            <button
              type="button"
              className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
              data-carousel-next
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <img
                  src="/assets/arrowRight.png"
                  alt="Next"
                  className="w-8 h-8"
                />
              </span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-1 md:gap-4 mx-4">
            {breedImages &&
              breedImages.length > 0 &&
              breedImages.map((image, index) => (
                <div key={index} className="overflow-hidden rounded-lg h-60">
                  <img
                    src={image}
                    alt={`${breed} ${index + 1}`}
                    className="h-full w-full object-cover rounded-lg transition transform scale-100 group-hover:scale-105"
                  />
                </div>
              ))}
          </div>
        )}
      </div>
      {error && (
        <div className="text-center mb-8 bg-gray-300 rounded-lg pb-4">
          <h1 className="text-2xl font-bold mb-2">{error}</h1>
          <div className="flex justify-center">
            <img
              src="/assets/sadPuppy.png"
              alt="Sad Puppy"
              className="rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default BreedPage;
