import React, { useEffect, useState } from "react";
import { auth, storage } from "../firebase";
import { ref, listAll, getDownloadURL, getMetadata } from "firebase/storage";
import { NavLink } from "react-router-dom";
import NavBar from "./components/NavBar";

const ViewAll = () => {
  const navigation = [
    { id: 0, name: "Upload Manager", href: "/home", current: false },
    { id: 1, name: "File Viewer", href: "/viewall", current: true },
    { id: 2, name: "Editor", href: "/editentry", current: false },
    { id: 3, name: "Delete", href: "/deleteimage", current: false },
  ];

  const [isAuthenticated, setIsAuthenticated] = useState(null);
  //   const user = auth.currentUser;

  const [imageList, setImageList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const listRef = ref(storage, "/images/");

    // Find all the prefixes and items.
    listAll(listRef)
      .then((res) => {
        const urlsWithDates = [];

        Promise.all(
          res.items.map((itemRef) => {
            // Get the download URL and metadata
            return Promise.all([getDownloadURL(itemRef), getMetadata(itemRef)])
              .then(([url, metadata]) => {
                urlsWithDates.push({
                  url,
                  creationDate: new Date(metadata.updated).toLocaleString(),
                  fileName: metadata.name,
                  description: metadata.customMetadata.description,
                });
              })
              .catch((error) => {
                // Handle errors
              });
          })
        )
          .then(() => {
            setImageList(urlsWithDates);
            setLoading(false);
          })
          .catch((error) => {
            // Handle errors
            console.error("Error fetching image URLs:", error);
            setLoading(false);
          });
      })
      .catch((error) => {
        // Handle errors
        console.error("Error listing images:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      {isAuthenticated === null ? (
        <div></div>
      ) : isAuthenticated ? (
        <div>
          <NavBar navigation={navigation} />
          <header className="bg-white shadow">
            <div className="mx-0 max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                All Images
              </h1>
            </div>
          </header>
          {loading ? (
            <li className="mx-10 flex justify-between gap-x-6 py-5">
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    Loading...
                  </p>
                </div>
              </div>
            </li>
          ) : (
            <ul className="mx-10 divide-y divide-gray-100">
              {imageList
                .sort(
                  (a, b) => new Date(b.creationDate) - new Date(a.creationDate)
                ) // Sort by creation date
                .map((imageData, index) => (
                  <li className="flex justify-between gap-x-6 py-5">
                    <div className="flex min-w-0 gap-x-4">
                      <img
                        key={index}
                        width="60px"
                        height="60px"
                        src={imageData.url}
                        alt={`icon-${index}`}
                      />
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {imageData.fileName}
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm leading-6 text-gray-900">
                        Last Updated: {imageData.creationDate}
                      </p>
                      <p className="text-sm leading-6 text-gray-900">
                        Description: {imageData.description}
                      </p>
                    </div>
                  </li>
                ))}
            </ul>
          )}
        </div>
      ) : (
        <div>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-1xl font-bold leading-9 tracking-tight text-gray-900">
              You are not authorized to access this page.
            </h2>
            <h2 className="text-center text-1xl font-bold leading-9 tracking-tight text-gray-900">
              <NavLink
                to="/"
                className="font-semibold leading-6 text-teal-600 hover:text-teal-500"
              >
                Sign In
              </NavLink>
            </h2>
          </div>
        </div>
      )}
    </>
  );
};
export default ViewAll;
