import React, { useEffect, useState } from "react";
import ContentEditable from "react-contenteditable";
import { useDropzone } from "react-dropzone";

export default function AboutComponent({
  name: initialName,
  profession: initialProfession,
  avatar: initialAvatar,
  descriptions: initialDescriptions,
}) {
  const [name, setName] = useState(initialName);
  const [profession, setProfession] = useState(initialProfession);
  const [avatar, setAvatar] = useState(initialAvatar);
  const [description, setDescription] = useState(
    initialDescriptions.find((desc) => desc.key === "item 1")?.long || ""
  );
  const [isEditing, setIsEditing] = useState(
    localStorage.getItem("isEditing") === "true"
  );

  const placeholderImage =
    "https://i.pinimg.com/736x/8c/b6/8c/8cb68ce29961efecf98e5817deab584b.jpg"; // Placeholder image URL

  const handleStorageChange = () => {
    setIsEditing(localStorage.getItem("isEditing") === "true");
  };

  useEffect(() => {
    handleStorageChange();
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleImageChange = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleImageChange,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/gif": [".gif"],
      "image/bmp": [".bmp"],
      "image/webp": [".webp"],
    },
    disabled: !isEditing,
  });

  const handleContentChange = (setter) => (evt) => {
    setter(evt.target.value);
  };

  const handleImageError = () => {
    setAvatar(placeholderImage);
  };

  const editableStyle = {
    border: "1px dashed red",
  };

  return (
    <div className="font-sans antialiased text-gray-800 dark:text-gray-100">
      <section name="About" className="dark:bg-gray-900 py-16">
        <main className="max-w-4xl mx-auto p-8">
          <h1 className="text-center text-2xl font-bold mb-8 text-gray-700 dark:text-gray-100">
            ABOUT MY WORK
          </h1>

          <section className="flex justify-center items-center mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
              <div className="text-center md:text-left mb-8">
                <div className="text-4xl flex gap-2 font-bold mb-2">
                  Hello! I'm{" "}
                  <ContentEditable
                    html={name}
                    disabled={!isEditing}
                    onChange={handleContentChange(setName)}
                    style={isEditing ? editableStyle : {}}
                  />
                </div>
                <div className="text-2xl flex gap-2 text-gray-500 italic mb-4 dark:text-gray-300">
                  A{" "}
                  <ContentEditable
                    html={profession}
                    disabled={!isEditing}
                    onChange={handleContentChange(setProfession)}
                    style={isEditing ? editableStyle : {}}
                  />
                </div>
                <div className="flex justify-center md:justify-start items-center space-x-4">
                  <p className="text-gray-500 dark:text-gray-300">
                    Want To Discuss!?
                  </p>
                  <a
                    href="#"
                    className="bg-yellow-500 text-white py-2 px-4 rounded-full shadow-lg hover:bg-orange-600 transition"
                  >
                    Let's Talk
                  </a>
                </div>
              </div>

              <div className="text-center md:text-right mb-8">
                <div className="font-sans rounded-lg">
                  <div
                    {...getRootProps({
                      className:
                        "flex justify-center items-center sm:w-autolg:w-auto h-auto relative",
                    })}
                  >
                    <input {...getInputProps()} />
                    <img
                      src={avatar}
                      onError={handleImageError} // Handle image loading errors
                      className="mx-auto rounded-full border-4 border-orange-500 w-40 h-40 md:w-52 md:h-52"
                      alt="photo"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="text-center space-y-4 text-gray-600 dark:text-gray-300">
            <ContentEditable
              html={description}
              disabled={!isEditing}
              onChange={(e) => setDescription(e.target.value)}
              style={isEditing ? editableStyle : {}}
            />
          </div>
        </main>
      </section>
    </div>
  );
}
