// import React from "react"
// export default function ProjectComponent() {
//     return(
//       <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('https://i.pinimg.com/originals/d8/37/40/d83740b7b6cf9fb1166e3c25eb1cced4.jpg')` }}>
//         <section name="Project">
//           <div className="bg-white bg-opacity-60 min-h-screen flex flex-col items-center py-20">
//           <div className="text-center mb-8">
//             <h1 className="text-3xl font-bold text-red-500">Projects</h1>
//           </div>
//           <div class="container mx-auto p-4">
//              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
//     <div class="grid gap-4">
//       <div class="relative overflow-hidden rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
//         <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg" alt=""/>
//       </div>
//       <div class="relative overflow-hidden rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
//         <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg" alt=""/>
//       </div>
//       <div class="relative overflow-hidden rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
//         <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg" alt=""/>
//       </div>
//     </div>
//     <div class="grid gap-4">
//       <div class="relative overflow-hidden rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
//         <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg" alt=""/>
//       </div>
//       <div class="relative overflow-hidden rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
//         <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg" alt=""/>
//       </div>
//       <div class="relative overflow-hidden rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
//         <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg" alt=""/>
//       </div>
//     </div>
//     <div class="grid gap-4">
//       <div class="relative overflow-hidden rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
//         <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg" alt=""/>
//       </div>
//       <div class="relative overflow-hidden rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
//         <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg" alt=""/>
//       </div>
//       <div class="relative overflow-hidden rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
//         <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg" alt=""/>
//       </div>
//     </div>
//     <div class="grid gap-4">
//       <div class="relative overflow-hidden rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
//         <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg" alt=""/>
//       </div>
//       <div class="relative overflow-hidden rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
//         <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg" alt=""/>
//       </div>
//       <div class="relative overflow-hidden rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
//         <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg" alt=""/>
//       </div>
//     </div>
//              </div>
//         </div>
//         </div>
//         </section>

//        </div>

//     );
// }
import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { createProject } from "../../redux/feature/websitetemplate/ProjectSlice"; // Adjust the path

export default function ProjectComponent({ projects }) {
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditing, setIsEditing] = useState(
    localStorage.getItem("isEditing") === "true"
  );
  const [projectImages, setProjectImages] = useState(
    projects.map((project) => project.project_image)
  );
  const [imageFiles, setImageFiles] = useState(
    Array(projects.length).fill(null)
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsEditing(localStorage.getItem("isEditing") === "true");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleImageClick = (imageSrc) => {
    if (!isEditing) {
      setSelectedImage(imageSrc);
    }
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleImageChange = (index) => (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedImages = projectImages.map((img, i) =>
          i === index ? reader.result : img
        );
        const updatedFiles = imageFiles.map((file, i) =>
          i === index ? acceptedFiles[0] : file
        );
        setProjectImages(updatedImages);
        setImageFiles(updatedFiles);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProject = async (index) => {
    const file = imageFiles[index];
    let uploadedImageUrl = projectImages[index];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const uploadResponse = await fetch(
          `${import.meta.env.VITE_BASE_URL}upload/`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${getAccessToken()}`,
            },
            body: formData,
          }
        );
        const data = await uploadResponse.json();
        uploadedImageUrl = data.url; // Assuming the API returns the image URL in `data.url`
      } catch (error) {
        console.error("Image upload failed:", error);
        return; // Exit early if the upload fails
      }
    }

    const projectData = {
      project_title: `Project ${index + 1}`,
      project_description: `Description for Project ${index + 1}`,
      link_to_project: `https://example.com/project${index + 1}`,
      project_image: uploadedImageUrl,
    };

    console.log("Saving project data:", projectData);
    dispatch(createProject(projectData));
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://i.pinimg.com/originals/d8/37/40/d83740b7b6cf9fb1166e3c25eb1cced4.jpg')`,
      }}
    >
      <section name="Project">
        <div className="bg-white bg-opacity-60 dark:bg-black dark:bg-opacity-80 min-h-screen flex flex-col items-center py-20">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-red-500 dark:text-red-400">
              Projects
            </h1>
          </div>
          <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {projectImages.map((image, index) => {
                const { getRootProps, getInputProps, open } = useDropzone({
                  onDrop: handleImageChange(index),
                  accept: {
                    "image/jpeg": [".jpg", ".jpeg"],
                    "image/png": [".png"],
                    "image/gif": [".gif"],
                    "image/bmp": [".bmp"],
                    "image/webp": [".webp"],
                  },
                  noClick: true,
                  disabled: !isEditing,
                });

                return (
                  <div
                    key={index}
                    className="relative overflow-hidden rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
                    {...getRootProps({
                      className: "cursor-pointer",
                      onClick: (event) => {
                        if (isEditing) {
                          event.stopPropagation(); // Prevents preview from opening
                          open(); // Opens file picker
                        } else {
                          handleImageClick(image);
                        }
                      },
                    })}
                  >
                    <input {...getInputProps()} />
                    <div className="relative">
                      <img
                        className="object-cover w-full h-full rounded-lg"
                        src={image}
                        alt={`Gallery Image ${index + 1}`}
                      />
                      {isEditing && (
                        <button
                          onClick={() => handleSaveProject(index)}
                          className=" top-2 right-2 bg-blue-500 text-white px-4 py-2 rounded-lg z-20"
                        >
                          Save
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {selectedImage && !isEditing && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div className="relative">
            <img
              src={selectedImage}
              alt="Selected Preview"
              className="max-w-full max-h-[80vh] rounded-lg shadow-lg"
            />
            <button
              className="absolute top-0 right-0 mt-2 mr-2 text-white bg-red-500 hover:bg-red-600 p-2 rounded-full"
              onClick={closeModal}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
