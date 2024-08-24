import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsFillCameraFill } from "react-icons/bs";
import { useDropzone } from "react-dropzone";
import {
  fetchProfile,
  updateProfile,
} from "../../redux/feature/user/UserSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAccessToken } from "../../lib/secureLocalStorage";
import { Card, List, Avatar } from "flowbite-react";
import { MdModeEditOutline } from "react-icons/md";
import AOS from "aos";
import Skeleton from "react-loading-skeleton";

const validationSchema = Yup.object({
  first_name: Yup.string()
    .required("First Name is required")
    .matches(/^[^\d]/, "First Name cannot start with a number"),
  last_name: Yup.string()
    .required("Last Name is required")
    .matches(/^[^\d]/, "Last Name cannot start with a number"),
});

function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile, status, error } = useSelector((state) => state.user);
  const [avatar, setAvatar] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setAvatar(profile.avatar);
    }
  }, [profile]);

  const validateFile = (file) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxSize = 2 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG, PNG, and GIF allowed.");
      return false;
    }

    if (file.size > maxSize) {
      toast.error("File size exceeds 2MB limit.");
      return false;
    }

    return true;
  };

  const uploadFile = async (file) => {
    if (!file) {
      toast.error("Select a file to upload.");
      return;
    }

    if (!validateFile(file)) return;

    setIsUploading(true);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getAccessToken()}`);

    const formdata = new FormData();
    formdata.append("file", file, file.name);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}upload/`,
        requestOptions
      );
      if (!response.ok) {
        throw new Error("File upload failed");
      }
      const result = await response.json();
      setAvatar(result.url);
    } catch (error) {
      toast.error(`Upload error: ${error.toString()}`);
    } finally {
      setIsUploading(false);
    }
  };

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles[0]) {
      const file = acceptedFiles[0];
      uploadFile(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".png", ".gif"] },
  });

  const handleSave = async (values, { setSubmitting }) => {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }
    if (avatar) {
      formData.append("avatar", avatar);
    }

    try {
      await dispatch(updateProfile(formData)).unwrap();
      toast.success("Profile updated!");
      dispatch(fetchProfile());
    } catch (err) {
      toast.error(`Update failed: ${err}`);
    } finally {
      setSubmitting(false);
    }
  };
  const [isLoading, setIsLoading] = useState(true);

  const handleGetStartClick = () => {
    const isLoggedIn = !!getAccessToken();
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/register");
    }
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });

    // Simulate a loading state
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const socialMediaLinks = [
    {
      name: "Facebook",
      url: profile?.facebook,
      placeholder:
        "https://i.pinimg.com/564x/70/da/29/70da29e0cd3e98f2ba4bb67bd0bde726.jpg",
    },
    {
      name: "Twitter",
      url: profile?.twitter,
      placeholder:
        "https://i.pinimg.com/236x/cc/31/6f/cc316f97197528e5e26e613a93ab16a4.jpg",
    },
    {
      name: "Instagram",
      url: profile?.instagram,
      placeholder:
        "https://i.pinimg.com/564x/f4/1e/2d/f41e2dab621c1ee5253cef74e3642fcf.jpg",
    },
    {
      name: "LinkedIn",
      url: profile?.linkedin,
      placeholder:
        "https://i.pinimg.com/236x/8a/15/b6/8a15b646a6856d20854c2ac22623d971.jpg",
    },
  ];

  return (
    <div className="w-full flex flex-col lg:flex-row justify-center gap-8 items-start h-auto  ">
      <div className="w-full lg:w-1/3 md:max-w-full sm:max-w-full  ">
      {
        isLoading ? (
          <div className="dark:bg-gray-900 bg-white rounded-md">
          <div className="flex flex-col gap-2 justify-center items-center p-20 rounded-md">
            <Skeleton circle width={100} height={100}/>
            <Skeleton width={100} height={20}/>
            <Skeleton width={200} height={10}/>
          </div>
          </div>
        ): (
        <Card className="max-w-lg border-2  sm:max-w-full">
          <div className="flex justify-end px-4 pt-4 text-2xl">
            <MdModeEditOutline className="text-gray-600 dark:text-gray-400" />
          </div>
          <div className="flex flex-col items-center pb-10">
            <div className="relative group" {...getRootProps()}>
              <input {...getInputProps()} />
              {isUploading ? (
                <div className="w-32 h-32 rounded-full bg-gray-300 dark:bg-gray-600 flex justify-center items-center">
                  Uploading...
                </div>
              ) : isDragActive ? (
                <div className="w-32 h-32 rounded-full bg-gray-300 dark:bg-gray-600 flex justify-center items-center">
                  <p className="text-gray-600 dark:text-gray-400">
                    Drop image here...
                  </p>
                </div>
              ) : (
                <img
                  className="w-32 h-32 rounded-full object-cover"
                  src={
                    avatar ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  }
                  alt="Profile"
                />
              )}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                <BsFillCameraFill className="text-white" />
              </div>
            </div>
            <h2 className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
              {profile ? profile.username : "Loading..."}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {profile ? profile.email : "Loading..."}
            </p>
          </div>
        </Card>
          )
        }
        {
          isLoading ? (
            <div className="bg-white dark:bg-gray-900 p-5 mt-10 rounded-md h-[400px] mx-10 sm:mx-0">
            <Skeleton width={200} height={20}/>
            </div>
          ):(
        <List
          unstyled
          className="max-w-lg h-[415px] divide-y px-4 pt-4 mt-7 drop-shadow-md sm:max-w-full dark:bg-gray-800 bg-white rounded-lg border-2 dark:border-gray-700 sm-max:w-full"
        >
          <List.Item className="pb-3 sm:pb-4">
            <div className="flex items-center justify-between space-x-4 rtl:space-x-reverse">
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                Social Media Links
              </div>
            </div>
          </List.Item>
          {socialMediaLinks.map(
            (platform, index) =>
              platform.url && (
                <List.Item className="pb-3 sm:pb-4" key={index}>
                  <div className="flex items-center justify-between mt-5 space-x-4 rtl:space-x-reverse">
                    <Avatar
                      img={`${platform.placeholder}`}
                      alt={`${platform.name} image`}
                      rounded
                      size="sm"
                    />
                    <a href={platform.url}>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        {platform.name}
                      </div>
                    </a>
                  </div>
                </List.Item>
              )
          )}
        </List>
         )
        }
      </div>

      {
        isLoading ? (
          <div className="flex flex-col gap-5 bg-white dark:bg-gray-900 p-4 rounded-md lg:w-8/12 w-[100%]">
          <Skeleton width={200} height={40}/>
          <div className="flex flex-col sm:flex-row gap-10 xl:w-12/12 sm:w-full">
          <div className="flex flex-col gap-5 w-full sm:w-[50%]">
            <div>
            <Skeleton width={100} height={20}/>
            <Skeleton height={40}/>
            </div>
            <div>
            <Skeleton width={100} height={20}/>
            <Skeleton height={40}/>
            </div>
            <div>
            <Skeleton width={100} height={20}/>
            <Skeleton height={40}/>
            </div>
          </div>
          <div className="flex flex-col gap-5 w-full sm:w-[50%]">
            <div>
            <Skeleton width={100} height={20}/>
            <Skeleton height={40}/>
            </div>
            <div>
            <Skeleton width={100} height={20}/>
            <Skeleton height={40}/>
            </div>
            <div>
            <Skeleton width={100} height={20}/>
            <Skeleton height={40}/>
            </div>
          </div>
          </div>
          <div>
            <Skeleton height={20} width={100}/>
            <Skeleton height={40} className="w-full"/>
          </div>
          <div>
            <Skeleton height={20} width={100}/>
            <Skeleton height={60} className="w-full"/>
          </div>
          <div className="flex flex-col sm:flex-row gap-10 xl:w-12/12 sm:w-full">
          <div className="flex flex-col gap-5 sm:w-[50%] w-full">
            <div>
            <Skeleton width={100} height={20}/>
            <Skeleton height={40}/>
            </div>
            <div>
            <Skeleton width={100} height={20}/>
            <Skeleton height={40}/>
            </div>
          </div>
          <div className="flex flex-col gap-5 w-full sm:w-[50%]">
            <div>
            <Skeleton width={100} height={20}/>
            <Skeleton height={40}/>
            </div>
            <div>
            <Skeleton width={100} height={20}/>
            <Skeleton height={40}/>
            </div>
          </div>
          </div>
          <div className="flex flex-row justify-end gap-5">
            <Skeleton width={100} height={40}/>
            <Skeleton width={100} height={40} className="bg-primary"/>
          </div>
          </div>
        ):(
      <div className="w-full lg:w-2/3 bg-white dark:bg-gray-800 border-2 dark:border-gray-700 shadow-md rounded-lg p-6">
        {status === "loading" && ""}
        {status === "failed" && <p className="text-red-500">{error}</p>}
        {status === "succeeded" && profile && (
          <Formik
            initialValues={{
              first_name: profile.first_name || "",
              last_name: profile.last_name || "",
              gender: profile.gender || "",
              phone_number: profile.phone_number || "",
              dob: profile.dob || "",
              username: profile.username || "",
              address: profile.address || "",
              bio: profile.bio || "",
              facebook: profile.facebook || "",
              twitter: profile.twitter || "",
              instagram: profile.instagram || "",
              linkedin: profile.linkedin || "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSave}
          >
            {({ setFieldValue }) => (
              <Form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                    General Info
                  </h2>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                    First Name
                  </label>
                  <Field
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    className="mt-1 block w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="first_name"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Last Name
                  </label>
                  <Field
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    className="mt-1 block w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="last_name"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Gender
                  </label>
                  <Field
                    as="select"
                    name="gender"
                    className="block w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </Field>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Contact Number
                  </label>
                  <Field
                    type="text"
                    name="phone_number"
                    placeholder="Your Contact Number"
                    className="mt-1 block w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Date of Birth
                  </label>
                  <Field
                    type="date"
                    name="dob"
                    placeholder="Your Date of Birth"
                    className="date-input mt-1 block w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Username
                  </label>
                  <Field
                    type="text"
                    name="username"
                    placeholder="Your Username"
                    className="mt-1 block w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Address
                  </label>
                  <Field
                    type="text"
                    name="address"
                    placeholder="Your Address"
                    className="mt-1 block w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Bio
                  </label>
                  <Field
                    as="textarea"
                    name="bio"
                    placeholder="Write something about yourself"
                    className="mt-1 block w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                {socialMediaLinks.map((platform, index) => (
                  <div className="col-span-1 md:col-span-1" key={index}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                      {platform.name}
                    </label>
                    <Field
                      type="url"
                      name={platform.name.toLowerCase()}
                      placeholder={platform.placeholder}
                      className="mt-1 block w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                ))}
                <div className="col-span-1 md:col-span-2 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => navigate("/dashboard")}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-md shadow-sm hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Save
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}
        <ToastContainer />
      </div>
      )
    }
    </div>
  );
}

export default EditProfile;
