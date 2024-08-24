import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DeveloperTemplate from "./pages/template/developerTemplate.jsx";
import BusinessTemplate from "./pages/template/businessTemplate.jsx";
import MarketingTemplate from "./pages/template/MarketingTemplate.jsx";
import PhotographyTemplate from "./pages/template/photographyTemplate.jsx";
import Register from "./pages/auth/Register.jsx";
import LoginSection from "./components/Login/LoginSection.jsx";
import HomepageComponent from "./components/photography/Homepage.jsx";
import AboutComponent from "./components/photography/About.jsx";
import ProjectComponent from "./components/photography/Project.jsx";
import BlogComponent from "./components/photography/Blog.jsx";
import ContactUsComponent from "./components/photography/ContactUs.jsx";
// import ReadMoreComponent from "./components/photography/ReadMore.jsx";

import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import PageNotFound from "./pages/auth/PageNotFound.jsx";

import MarketingAbout from "./pages/template/MarketingAbout.jsx";
import OtpVerification from "./components/OTP/OtpScreen.jsx";
import MarketingContact from "./pages/template/MarketingContact.jsx";
import MarketingService from "./pages/template/MarketingService.jsx";
import MarketingBlog from "./pages/template/MarketingBlog.jsx";
import AuthGuard from "./pages/auth/AuthGuard.jsx";
import OtpGuard from "./pages/auth/OtpGuard.jsx";
// import Profile from "./pages/profile/profile.jsx";
import BlogDetail from "./components/developercomponent/BlogDetail";
import TemplateList from "./components/dashboardTemplate/TemplateList.jsx";
import TemplateSelection from "./components/templateSeclection/TemplateSelection.jsx";
import ReadMoreComponent from "./components/photography/ReadMore.jsx";
import EditProfile from "./components/profile/EditProfile.jsx";
import MainLayout from "./components/dashboard/MainLayout.jsx";
import HomeDashboard from "./components/dashboard/HomeDashboard.jsx";
import SlideUpPreview, {
  BusinessSlideReview,
  DeveloperSlideReview,
  MarketingSlideReview,
  PhotographySlideReview,
} from "./components/dashboard/SlideUpPreview.jsx";
import { HelmetProvider } from "react-helmet-async";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/developer",
    element: <DeveloperTemplate />,
  },
  {
    path: "/developer/blog/:id",
    element: <BlogDetail />,
  },
  {
    path: "/detail",
    element: <BlogDetail />,
  },
  {
    path: "/business",
    element: <BusinessTemplate />,
  },
  {
    path: "/marketing",
    element: <MarketingTemplate />,
  },
  {
    path: "/marketing-about",
    element: <MarketingAbout />,
  },
  {
    path: "/marketing-contact",
    element: <MarketingContact />,
  },
  {
    path: "/marketing-service",
    element: <MarketingService />,
  },
  {
    path: "/marketing-blog",
    element: <MarketingBlog />,
  },
  {
    path: "/photography",
    element: <PhotographyTemplate />,
  },
  {
    path: "/photography/about",
    element: <AboutComponent />,
  },
  {
    path: "/photography/project",
    element: <ProjectComponent />,
  },
  {
    path: "/photography/blog",
    element: <BlogComponent />,
  },
  {
    path: "/photography/contact",
    element: <ContactUsComponent />,
  },
  {
    path: "/photography/blog/readmore",
    element: <ReadMoreComponent />,
  },
  {
    path: "/dashboard",
    element: <AuthGuard component={<MainLayout />} />,
    children: [
      {
        index: true,
        element: <HomeDashboard />,
      },
      {
        path: "profile",
        element: <EditProfile />,
      },
      {
        path: "template",
        element: <TemplateList />,
      },
      {
        path: "preview/:id",
        element: <SlideUpPreview />,
      },
      {
        path: "developer",
        element: <DeveloperSlideReview />,
      },
      {
        path: "business",
        element: <BusinessSlideReview />,
      },
      {
        path: "marketing",
        element: <MarketingSlideReview />,
      },
      {
        path: "photography",
        element: <PhotographySlideReview />,
      },
    ],
  },
  {
    path: "preview/:id",
    element: <SlideUpPreview />,
  },
  {
    path: "/login",
    element: <LoginSection />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/pagenotfound",
    element: <PageNotFound />,
  },
  {
    path: "/register/verify",
    element: <OtpGuard component={<OtpVerification />} />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
