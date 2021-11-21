import { useState } from "react";
import Input from "../../input";

export default function List({ auth, user, repos }) {
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const onSearch = (value) => {
    setSearchInput(value);
    if (searchInput !== "") {
      const filteredData = repos.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(repos);
    }
  };
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
            List repositories
          </h2>
          <div className="flex flex-1 items-center justify-center">
            <Input
              type="search"
              label="Search your repositories"
              name="search-repositories"
              placeholder="Search your repositories  🕵🏽‍♂️"
              onChange={onSearch}
              classContent="w-2/3"
            />
          </div>
        </div>

        <div className="mt-6 flex">
          {auth ? (
            <div className="flex flex-col  lg:flex-row">
              <div>
                <div key={user?.id} className="group relative">
                  <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                    <img
                      src={user?.avatar_url}
                      alt={user?.login}
                      className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <a href={user?.html_url}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {user?.name}
                        </a>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {user?.color}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      followers: {user?.followers} - following:{" "}
                      {user?.following}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center flex-row flex-wrap flex-1 w-full max-h-80 overflow-hidden overflow-y-scroll lg:justify-start">
                {searchInput.length > 1
                  ? filteredResults.map((repositories) => (
                      <div
                        key={repositories.id}
                        id={repositories.id}
                        className="group relative w-[160px] h-auto m-2"
                      >
                        <div className="w-[160px] h-[160px] bg-gray-200  rounded-md overflow-hidden group-hover:opacity-75  lg:aspect-none">
                          <img
                            src={repositories?.owner.avatar_url}
                            alt={repositories?.owner.login}
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                        <div className="mt-4 flex flex-col justify-start">
                          <div>
                            <h3 className="text-sm text-gray-700 overflow-ellipsis overflow-hidden whitespace-nowrap">
                              <a href={repositories?.url}>
                                <span
                                  aria-hidden="true"
                                  className="absolute inset-0"
                                />
                                <span className="font-bold  ">Name:</span>{" "}
                                {repositories?.name}
                              </a>
                            </h3>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            <span className="font-bold">Visibility:</span>{" "}
                            {repositories?.visibility} 🌎
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            <span className="font-bold">Language:</span>{" "}
                            {repositories?.language}
                          </p>
                        </div>
                      </div>
                    ))
                  : repos.map((repositories) => (
                      <div
                        key={repositories.id}
                        id={repositories.id}
                        className="group relative w-[160px] h-auto m-2"
                      >
                        <div className="w-[160px] h-[160px] bg-gray-200  rounded-md overflow-hidden group-hover:opacity-75  lg:aspect-none">
                          <img
                            src={repositories?.owner.avatar_url}
                            alt={repositories?.owner.login}
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                        <div className="mt-4 flex flex-col justify-start">
                          <div>
                            <h3 className="text-sm text-gray-700 overflow-ellipsis overflow-hidden whitespace-nowrap">
                              <a href={repositories?.url}>
                                <span
                                  aria-hidden="true"
                                  className="absolute inset-0"
                                />
                                <span className="font-bold  ">Name:</span>{" "}
                                {repositories?.name}
                              </a>
                            </h3>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            <span className="font-bold">Visibility:</span>{" "}
                            {repositories?.visibility} 🌎
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            <span className="font-bold">Language:</span>{" "}
                            {repositories?.language}
                          </p>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col col-span-4  items-center  ">
              <iframe
                src="https://giphy.com/embed/Tk0gIDzFz5PlHbWO4c"
                height="300"
                frameBorder="0"
                allowFullScreen
              ></iframe>
              <p> To see this section you have to login first</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
