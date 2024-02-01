import { useEffect, useState } from "react";
import Link from "next/link";
import "../app/globals.css";
const HomePage: React.FC = () => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [view, setView] = useState<"grid" | "alphabetical">("grid");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setBreeds(Object.keys(data.message));
      })
      .catch((error) => {
        console.error("Error fetching breeds:", error.message);
      });
  }, []);

  const filteredBreeds = breeds.filter((breed) =>
    breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderBreeds = () => {
    if (!breeds.length) {
      return (
        <div className="text-center mb-8 bg-gray-300 rounded-lg pb-4">
          <h1 className="text-2xl font-bold mb-2">
            Sorry, something went wrong!
          </h1>
          <div className="flex justify-center">
            <img
              src="/assets/sadPuppy.png"
              alt="Sad Puppy"
              className="rounded-lg max-w-32 max-h-32"
            />
          </div>
        </div>
      );
    }
    if (filteredBreeds.length === 0) {
      return (
        <div className="text-center mb-8 bg-gray-300 rounded-lg pb-4">
          <h1 className="text-2xl font-bold mb-2">Sorry, no results found!</h1>
          <h3 className="text-lg text-black-600 mb-2 font-semibold">
            Please check the spelling or try searching for something else...
          </h3>
          <div className="flex justify-center">
            <img
              src="/assets/sadPuppy.png"
              alt="Sad Puppy"
              className="rounded-lg max-w-32 max-h-32"
            />
          </div>
        </div>
      );
    }

    if (view === "grid") {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 cursor-pointer">
          {filteredBreeds.map((breed) => (
            <Link href="/breeds/[breed]" as={`/breeds/${breed}`}>
              <div
                key={breed}
                className="flex justify-between bg-gray-100 p-4 rounded-lg transition duration-300 mx-2 gradient-hover"
              >
                <span className="text-xl font-semibold text-black-600  capitalize">
                  {breed}
                </span>

                <img
                  src="/assets/pawIcon.png"
                  alt={`${breed} icon`}
                  className="w-6 h-6"
                />
              </div>
            </Link>
          ))}
        </div>
      );
    } else if (view === "alphabetical") {
      const groupedBreeds = filteredBreeds.reduce((acc, breed) => {
        const firstLetter = breed.charAt(0).toUpperCase();
        acc[firstLetter] = acc[firstLetter] || [];
        acc[firstLetter].push(breed);
        return acc;
      }, {} as { [key: string]: string[] });

      return (
        <div className="mx-2">
          {Object.keys(groupedBreeds).map((letter) => (
            <div key={letter} className="mb-4">
              <h2 className="text-2xl font-bold mb-2 ml-2">{letter}</h2>
              {groupedBreeds[letter].map((breed) => (
                <Link href="/breeds/[breed]" as={`/breeds/${breed}`}>
                  <div
                    key={breed}
                    className="flex justify-between bg-gray-100 p-4 rounded-lg transition duration-300 mb-2 gradient-hover"
                  >
                    <span className="text-xl  font-semibold text-black-600 capitalize">
                      {breed}
                    </span>

                    <img
                      src="/assets/pawIcon.png"
                      alt={`${breed} icon`}
                      className="w-6 h-6"
                    />
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <section
        className="relative bg-cover bg-bottom mb-8"
        style={{
          backgroundImage: "url('/assets/backgroundIndex.jpg')",
          height: "60vh",
          borderBottom: "1px solid black",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12 text-white">
          <h1 className="mb-4 text-lg font-extrabold  leading-none md:text-xl lg:text-3xl">
            Connecting Dogs, Connecting Hearts
          </h1>
          <p className="mb-8 font-bold text-lg font-normal lg:text-xl  sm:text-s sm:px-16 xl:px-48">
            At Dogien, our mission is to bring joy and companionship into the
            lives of both dogs and their owners. Join us on this journey of
            love, laughter, and wagging tails.
          </p>
        </div>
        <div className="flex justify-center">
          <div className="relative flex items-center mb-4 lg:mb-0">
            <input
              type="text"
              placeholder="Search breeds..."
              className="p-2 border border-gray-300 rounded-md pr-8 h-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="absolute inset-y-0 right-0 px-3 py-2 text-gray-500 hover:text-gray-700 cursor-pointer"
                onClick={() => setSearchTerm("")}
              >
                <img
                  src="/assets/clearSearchIcon.svg"
                  alt="Clear"
                  className="w-6 h-6 text-gray-800 dark:text-white"
                />
              </button>
            )}
          </div>
        </div>
      </section>

      <div className="container mx-auto mb-10">
        <div className="flex flex-col lg:flex-row items-center justify-between mx-2">
          {filteredBreeds.length > 0 && (
            <div className="flex items-center gap-2 text-xl ml-auto mb-8">
              <button
                onClick={() => setView("grid")}
                className={`px-2 py-2 rounded-lg h-full ${
                  view === "grid" ? "bg-gray-400 text-white" : "bg-gray-100"
                } transition hover:bg-gray-500`}
              >
                <img
                  src="/assets/gridIcon.png"
                  alt="Grid View"
                  className="w-8 h-8"
                />
              </button>
              <button
                onClick={() => setView("alphabetical")}
                className={`px-2 py-2 rounded-lg h-full ${
                  view === "alphabetical"
                    ? "bg-gray-400 text-white"
                    : "bg-gray-100"
                } transition hover:bg-gray-500`}
              >
                <img
                  src="/assets/sortIcon.png"
                  alt="Alphabetical View"
                  className="w-8 h-8"
                />
              </button>
            </div>
          )}
        </div>

        {renderBreeds()}
      </div>
    </>
  );
};

export default HomePage;
