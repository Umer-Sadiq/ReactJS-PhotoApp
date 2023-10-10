import React, { useEffect, useState } from "react";
import { auth, storage } from "../firebase";
import {
  ref,
  listAll,
  getDownloadURL,
  getMetadata,
  updateMetadata,
} from "firebase/storage";
import { NavLink } from "react-router-dom";
import NavBar from "./components/NavBar";
import { PencilIcon } from "@heroicons/react/24/outline";

const EditEntry = () => {
  const navigation = [
    { id: 0, name: "Upload Manager", href: "/home", current: false },
    { id: 1, name: "File Viewer", href: "/viewall", current: false },
    { id: 2, name: "Editor", href: "/editentry", current: true },
    { id: 3, name: "Delete", href: "/deleteimage", current: false },
  ];

  const [isAuthenticated, setIsAuthenticated] = useState(null);
  //   const user = auth.currentUser;

  const [imageList, setImageList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filename, setFilename] = useState("");
  // const [newFilename, setNewFilename] = useState("");
  const [newDescription, setNewDescription] = useState("");
  // const [metadata, setMetadata] = useState(null);

  const resetForm = () => {
    setFilename("");
    const inputText = document.getElementById("filenames");
    const inputDesc = document.getElementById("new-name");
    if (inputText) {
      inputText.value = "Default";
    }
    if (inputDesc) {
      inputDesc.value = "";
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!filename || !newDescription) {
      alert("Please enter all fields.");
      return;
    }
    const fileRef = ref(storage, "/images/" + filename);

    // Create file metadata to update
    const newMetadata = {
      customMetadata: {
        description: newDescription,
      },
    };

    // Get metadata properties
    /*getMetadata(fileRef)
      .then((metadata) => {
        console.log(metadata);
        // setMetadata(metadata);
        // Metadata now contains the metadata for 'images/forest.jpg'
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        const errorMessage = error.message;
        errorMessage.includes("does not exist")
          ? alert("File: " + filename + " does not exist")
          : alert(errorMessage);
      });*/
    console.log(filename);

    // Update metadata properties
    updateMetadata(fileRef, newMetadata)
      .then((metadata) => {
        console.log(metadata);
        alert("File metadata updated successfully!");
        window.location.reload(false);
        // Updated metadata for 'images/forest.jpg' is returned in the Promise
      })
      .catch((error) => {
        console.log(error.message);
        // Uh-oh, an error occurred!
      });
  };

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
                  creationDate: new Date(metadata.timeCreated).toLocaleString(),
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
            <>
              <header className="bg-white shadow">
                <div className="mx-0 max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    Edit metadata for file
                  </h1>
                </div>
              </header>
              <div className="items-center mx-5 mt-5 col-span-full">
                <label
                  htmlFor="filenames"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Select image
                </label>
                <select
                  id="filenames"
                  className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  onChange={(e) => setFilename(e.target.value)}
                  defaultValue="Default"
                >
                  <option value="Default" disabled>
                    Choose a file to edit
                  </option>
                  {imageList
                    .sort(
                      (a, b) =>
                        new Date(b.creationDate) - new Date(a.creationDate)
                    ) // Sort by creation date
                    .map((imageData, index) => (
                      <option value={imageData.fileName} key={index}>
                        {imageData.fileName}
                      </option>
                    ))}
                </select>
              </div>
              <form>
                <div className="mx-5 space-y-6">
                  <div className="border-b border-gray-900/10 pb-12">
                    <div className="mt-5 col-span-full">
                      <label
                        htmlFor="new-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Description
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="new-name"
                          id="new-name"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder="This is an image"
                          onChange={(e) => setNewDescription(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mx-5 mt-2 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                  <span className="sm:block">
                    <button
                      onClick={onSubmit}
                      className="inline-flex items-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                    >
                      <PencilIcon
                        className="-ml-0.5 mr-1.5 h-5 w-5 text-white"
                        aria-hidden="true"
                      />
                      Edit
                    </button>
                  </span>
                </div>
              </form>
            </>
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
export default EditEntry;
