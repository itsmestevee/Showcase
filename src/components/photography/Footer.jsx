// import React from "react"
// import { FaFacebook } from "react-icons/fa";
// import { FaTwitter } from "react-icons/fa";
// import { IoMdMail } from "react-icons/io";
// import { FaYoutube } from "react-icons/fa";
// export default function FooterComponent(){
//     return(
//       <div className="font-sans antialiased text-gray-800 ">
//         <footer className="bg-yellow-600 text-white p-20 mt-0 dark:bg-gray-800  ">
//           <div className="max-w-4xl mx-auto flex justify-between items-center">
//           <p className="text-sm">© 2024 Lift Media. All rights reserved.</p>
//           <div className=" flex space-x-4 ">
//             <a href="#" className="hover:text-gray-300"><i className="fa-brands fa-facebook"></i><FaFacebook className='w-[30px]'/></a>
//             <a href="#" className="hover:text-gray-300"><i className="fab fa-twitter"></i><FaTwitter /></a>
//             <a href="#" className="hover:text-gray-300"><i className="fab fa-envelope"></i><IoMdMail /></a>
//             <a href="#" className="hover:text-gray-300"><i className="fab fa-youtube"></i><FaYoutube /></a>
//           </div>
//           </div>
//         </footer>
//       </div>

//     );
// }
import React, { useEffect, useState } from "react";
import { FaEdit, FaFacebookSquare , FaFacebookF, FaYoutube,FaInstagramSquare,FaPinterestSquare   } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { FaGithub } from 'react-icons/fa';

export default function FooterComponent({
  socialMediaLinks: initialSocialMediaLinks,
  collectData
}) {
  const [socialMediaLinks, setSocialMediaLinks] = useState(
    initialSocialMediaLinks
  );
  const [editingLinkIndex, setEditingLinkIndex] = useState(null);

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

  const handleLinkChange = (index, evt) => {
    const newLinks = [...socialMediaLinks];
    newLinks[index].url = evt.target.value;
    setSocialMediaLinks(newLinks);
  };

  // Function to collect data from this component
  const getData = () => ({
    heroImage,
    name,
    profession,
    bio,
    socialMediaLinks,
  });

  // Pass this function to the parent
  useEffect(() => {
    if (collectData) {
      collectData(getData);
    }
  }, [collectData, getData]);

  return (
    <div className="font-sans antialiased text-gray-800">
      <footer className="bg-yellow-600 text-white p-6 sm:p-10 md:p-20 mt-0 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto flex flex-col items-center md:flex-row md:justify-between">
          <p className="text-sm mb-4 md:mb-0">
            © 2024 Lift Media. All rights reserved.
          </p>
          <div className="flex space-x-4">
            {/* <a href="#" className="hover:text-gray-300">
              <FaFacebook className="w-6 h-6 sm:w-8 sm:h-8" />
            </a>
            <a href="#" className="hover:text-gray-300">
              <FaTwitter className="w-6 h-6 sm:w-8 sm:h-8" />
            </a>
            <a href="#" className="hover:text-gray-300">
              <IoMdMail className="w-6 h-6 sm:w-8 sm:h-8" />
            </a>
            <a href="#" className="hover:text-gray-300">
              <FaYoutube className="w-6 h-6 sm:w-8 sm:h-8" />
            </a> */}
            {socialMediaLinks.map((link, index) => (
                <div key={index} className="flex items-center relative">
                  {link.type === "pinterest" && (
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaPinterestSquare className="w-6 h-6" />
                    </a>
                  )}
                  {link.type === "facebook" && (
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaFacebookSquare className="w-6 h-6" />
                    </a>
                  )}
                  {link.type === "instagram" && (
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaInstagramSquare className="w-6 h-6" />
                    </a>
                  )}
                  {link.type === "x" && (
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaSquareXTwitter className="w-6 h-6" />
                    </a>
                  )}
                  {isEditing && (
                    <FaEdit
                      className="w-4 h-4 ml-2 cursor-pointer"
                      onClick={() => setEditingLinkIndex(index)}
                    />
                  )}
                  {editingLinkIndex === index && isEditing && (
                    <input
                      type="text"
                      value={link.url}
                      onChange={(evt) => handleLinkChange(index, evt)}
                      onBlur={() => setEditingLinkIndex(null)}
                      className="absolute left-0 top-8 p-1 border rounded text-gray-700"
                      style={{ zIndex: 10 }}
                    />
                  )}
                </div>
              ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
