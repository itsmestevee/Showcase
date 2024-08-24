import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContentEditable from "react-contenteditable";
import { toast } from "react-toastify";
import CardBlog from "./CardBlog";

function BlogSection({ blogs }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(
    localStorage.getItem("isEditing") === "true"
  );

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

  const handleSaveBlog = (blog) => {
    if (blog.id) {
      dispatch(deleteBlog(blog.id)).then(() => {
        dispatch(createBlog(blog));
      });
    } else {
      dispatch(createBlog(blog));
    }
    toast.success("Blog saved successfully!");
  };

  return (
    <section
      className="py-10 md:py-20 font-sans section flex flex-col gap-6 sm:gap-10 bg-[#F7F7F7] dark:bg-gray-900 section"
      name="blog"
    >
      <div className="flex flex-col justify-center items-center gap-2 md:gap-6 px-4 text-center">
        <p className="text-base md:text-lg dark:text-gray-100">
          Check out my latest blogs
        </p>
        <h2 className="text-3xl md:text-5xl font-bold">
          <span className="dark:text-gray-100">My</span>{" "}
          <span className="text-primary-developer-template">Blog</span>
        </h2>
        <div className="w-20 md:w-32 h-1 bg-primary rounded-md"></div>
      </div>
      <div className="flex flex-wrap gap-6 sm:gap-10 justify-center px-4">
        {blogs.map((blog, index) => (
          <CardBlog
            key={index}
            id={blog.id}
            img={
              blog.image[0] ||
              "https://i.pinimg.com/736x/79/08/3a/79083abd0bde44c79191d1612cdbc9eb.jpg"
            }
            title={blog.title}
            desc={blog.description}
            isEditable={isEditing}
            onSave={handleSaveBlog}
          />
        ))}
      </div>
    </section>
  );
}

export default BlogSection;
