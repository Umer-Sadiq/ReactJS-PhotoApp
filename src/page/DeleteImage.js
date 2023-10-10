import React, { useEffect, useState } from "react";
import { auth, storage } from "../firebase";
import { ref, deleteObject } from "firebase/storage";
import { NavLink } from "react-router-dom";
import NavBar from "./components/NavBar";
import { TrashIcon } from "@heroicons/react/24/outline";

const DeleteImage = () => {
  const navigation = [
    { id: 0, name: "Upload Manager", href: "/home", current: false },
    { id: 1, name: "File Viewer", href: "/viewall", current: false },
    { id: 2, name: "Editor", href: "/editentry", current: false },
    { id: 3, name: "Delete", href: "/deleteimage", current: true },
  ];
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  const [filename, setFilename] = useState("");

  const resetForm = () => {
    setFilename("");
    const inputText = document.getElementById("file-name");
    if (inputText) {
      inputText.value = "";
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!filename) {
      alert("Please add filename to delete.");
      return;
    }
    const fileRef = ref(storage, "/images/" + filename);
    // Delete the file
    deleteObject(fileRef)
      .then(() => {
        // File deleted successfully
        alert("File: " + filename + " deleted.");
        console.log(filename);
        window.location.reload();
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        // const errorCode = error.code;
        const errorMessage = error.message;
        // console.log(errorCode, errorMessage);
        errorMessage.includes("does not exist")
          ? alert("File: " + filename + " does not exist")
          : alert(errorMessage);
        // if (errorMessage.includes("does not exist")) {
        //   alert("File does not exist");
        // }
      });
  };

  return (
    <>
      {isAuthenticated === null ? (
        <div></div>
      ) : isAuthenticated ? (
        <div>
          <NavBar navigation={navigation} />
          <form>
            <div className="mx-5 space-y-6">
              <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-5 col-span-full">
                  <label
                    htmlFor="file-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    File Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="file-name"
                      id="file-name"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="abc.png"
                      onChange={(e) => setFilename(e.target.value)}
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
                  <TrashIcon
                    className="-ml-0.5 mr-1.5 h-5 w-5 text-white"
                    aria-hidden="true"
                  />
                  Delete Image
                </button>
              </span>
            </div>
          </form>
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

export default DeleteImage;
