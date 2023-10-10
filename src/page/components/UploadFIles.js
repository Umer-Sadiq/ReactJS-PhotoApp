import React, { useState } from "react";
import { PhotoIcon, CloudArrowUpIcon } from "@heroicons/react/24/solid";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

export default function UploadFile() {
  const metadata = {
    customMetadata: {
      creationDate: new Date().toISOString(), // Store the creation date
      contentType: "image",
      description: "An image",
    },
  };

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (imageArray.length === 0) {
      alert("Please select at least one image to upload.");
      return;
    }

    if (fileNames.some((fileName) => fileName.trim() === "")) {
      alert("Please enter a name for all selected images.");
      return;
    }

    // Loop through the array of selected files and upload each one
    const uploadPromises = imageArray.map(async (imageFile, index) => {
      const filename = fileNames[index]; // Get the filename from state
      const storageRef = ref(storage, "/images/" + filename);
      const uploadTask = uploadBytes(storageRef, imageFile, metadata);

      // Wait for the upload to complete
      const response = await uploadTask;

      // Get the download URL for the uploaded file
      const downloadURL = await getDownloadURL(response.ref);
      return downloadURL;
    });

    try {
      const downloadURLs = await Promise.all(uploadPromises);
      console.log("Files uploaded:", downloadURLs);
      alert("Upload success!");
      window.location.reload();
      navigate("/home");
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const [imageArray, setImageArray] = useState([]);
  const [fileNames, setFileNames] = useState([]); // Store the filenames

  const resetForm = () => {
    setImageArray([]);
    setFileNames([]);
    const inputText = document.getElementById("file-uploads");
    if (inputText) {
      inputText.value = "";
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    // Update the state with the selected files
    setImageArray(selectedFiles);

    // Initialize an array to store filenames
    const selectedFileNames = selectedFiles.map(() => "");
    setFileNames(selectedFileNames);
  };

  const handleFileNameChange = (index, fileName) => {
    // Update the filename in the state
    const updatedFileNames = [...fileNames];
    updatedFileNames[index] = fileName;
    setFileNames(updatedFileNames);
  };

  return (
    <form>
      <div className="mt-2 flex items-center justify-center">
        <input
          id="file-uploads"
          name="file-uploads"
          type="file"
          accept="image/png , image/jpg , image/jpeg"
          onChange={handleFileChange}
          multiple
          className="sr-only"
        />
        <label
          htmlFor="file-uploads"
          className="relative cursor-pointer rounded-md bg-white font-semibold text-teal-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-teal-600 focus-within:ring-offset-2 hover:text-teal-500"
        >
          <PhotoIcon
            className="mx-auto h-12 w-12 text-gray-300"
            aria-hidden="true"
          />
          <span>Upload Files</span>
        </label>
      </div>

      {/* Display selected file names and input fields for custom names */}
      <div className="mt-2 text-sm leading-5 text-gray-600">
        {imageArray.length > 0 &&
          imageArray.map((_, index) => (
            <div key={index}>
              <label
                htmlFor="username"
                className="mx-2 block text-sm font-medium leading-6 text-gray-900"
              >
                {imageArray[index].name}
              </label>
              <input
                type="text"
                placeholder="image.jpg"
                value={fileNames[index]}
                className="mt-2 mx-2 rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => handleFileNameChange(index, e.target.value)}
              />
            </div>
          ))}
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
            Publish
          </button>
        </span>
      </div>
    </form>
  );
}
