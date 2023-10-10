import React, { useState } from "react";
import { PhotoIcon, CloudArrowUpIcon } from "@heroicons/react/24/solid";
import { storage } from "../../firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";

export default function UploadFile() {
  const metadata = {
    customMetadata: {
      creationDate: new Date().toISOString(),
      contentType: "image",
      description: "An image",
    },
  };

  const navigate = useNavigate();

  const [filename, setFilename] = useState("");
  const [image, setImage] = useState("");
  const [imagename, setImagename] = useState("Upload a File");

  const resetForm = () => {
    setFilename("");
    setImage(null);
    setImagename("Upload a File");
    const inputText = document.getElementById("file-name");
    if (inputText) {
      inputText.value = "";
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!image || !filename) {
      alert("Please add image and a filename to upload.");
      return;
    }
    const storageRef = ref(storage, "/images/" + filename);
    // const uploadTask = uploadBytesResumable(storageRef, image, metadata);
    uploadBytes(storageRef, image, metadata).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
        alert("Upload success!");
        window.location.reload();
      });
      navigate("/home");
    });
    console.log(filename);
  };

  return (
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
                placeholder="image.jpg"
                onChange={(e) => setFilename(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Image
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-teal-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-teal-600 focus-within:ring-offset-2 hover:text-teal-500"
                    >
                      <span>{imagename}</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        accept="image/png , image/jpg , image/jpeg"
                        onChange={(e) => {
                          const selectedFile = e.target.files[0];
                          if (selectedFile) {
                            setImage(selectedFile);
                            setImagename(selectedFile.name);
                          } else {
                            setImage(null);
                            setImagename("Upload a File");
                          }
                        }}
                        className="sr-only"
                      />
                    </label>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, JPEG up to 10MB
                  </p>
                </div>
              </div>
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
            <CloudArrowUpIcon
              className="-ml-0.5 mr-1.5 h-5 w-5 text-white"
              aria-hidden="true"
            />
            Upload
          </button>
        </span>
      </div>
    </form>
  );
}
