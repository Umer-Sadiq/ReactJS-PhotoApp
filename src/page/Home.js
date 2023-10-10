import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { NavLink } from "react-router-dom";
import UploadFile from "./components/UploadFile";
import UploadFiles from "./components/UploadFIles";
import NavBar from "./components/NavBar";

const Home = () => {
  const navigation = [
    { id: 0, name: "Upload Manager", href: "/home", current: true },
    { id: 1, name: "File Viewer", href: "/viewall", current: false },
    { id: 2, name: "Editor", href: "/editentry", current: false },
    { id: 3, name: "Delete", href: "/deleteimage", current: false },
  ];
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [activeTab, setActiveTab] = useState("single");
  //   const user = auth.currentUser;

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
          <div className="flex space-x-4 mt-5 mx-2">
            <button
              onClick={() => setActiveTab("single")}
              className={`${
                activeTab === "single"
                  ? "bg-gray-900 text-white"
                  : "text-black-300 hover:bg-gray-700 hover:text-white"
              } rounded-md px-3 py-2 text-sm font-medium`}
            >
              Single Image
            </button>
            <button
              onClick={() => setActiveTab("multiple")}
              className={`${
                activeTab === "multiple"
                  ? "bg-gray-900 text-white"
                  : "text-black-300 hover:bg-gray-700 hover:text-white"
              } rounded-md px-3 py-2 text-sm font-medium`}
            >
              Multiple Images
            </button>
          </div>
          {activeTab === "single" && (
            <>
              <UploadFile />
            </>
          )}

          {activeTab === "multiple" && (
            <>
              <UploadFiles />
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

export default Home;
