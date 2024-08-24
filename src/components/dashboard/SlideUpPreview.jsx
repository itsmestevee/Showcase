import React, {useState } from "react";
import { motion } from "framer-motion";
import ResponsivePreview from "../responsive/ResponsivePreview";
import IframeWrapper from "../responsive/IframeWrapper";
import { useLocation } from "react-router-dom";

const SlideUpPreview = () => {
  const [device, setDevice] = useState("desktop");
  const location = useLocation();

  const getTemplateFromPath = (path) => {
    switch (path) {
      case "/dashboard/developer":
        return "developer";
      case "/dashboard/photography":
        return "photography";
      case "/dashboard/marketing":
        return "marketing";
      case "/dashboard/business":
        return "business";
      default:
        return "developer";
    }
  };

  const template = getTemplateFromPath(location.pathname);

  return (
    <ResponsivePreview device={device} setDevice={setDevice} >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 50 }}
        style={{ height: "100vh", width: "100%" }}
      >
        <IframeWrapper templateType={template} />
      </motion.div>
    </ResponsivePreview>
  );
};

export const MarketingSlideReview = () =>{
  const [device, setDevice] = useState("desktop");
  return(
    <ResponsivePreview device={device} setDevice={setDevice}>
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 50 }}
        style={{ height: "100vh", width: "100%" }}
      >
        <IframeWrapper templateType="marketing"/>
      </motion.div>
    </ResponsivePreview>
  )
}
export const DeveloperSlideReview = () =>{
  const [device, setDevice] = useState("desktop");
  return(
    <ResponsivePreview device={device} setDevice={setDevice}>
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 50 }}
        style={{ height: "100vh", width: "100%" }}
      >
        <IframeWrapper templateType="developer"/>
      </motion.div>
    </ResponsivePreview>
  )
}
export const BusinessSlideReview = () =>{
  const [device, setDevice] = useState("desktop");
  return(
    <ResponsivePreview device={device} setDevice={setDevice}>
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 50 }}
        style={{ height: "100vh", width: "100%" }}
      >
        <IframeWrapper templateType="business"/>
      </motion.div>
    </ResponsivePreview>
  )
}
export const PhotographySlideReview = () =>{
  const [device, setDevice] = useState("desktop");
  return(
    <ResponsivePreview device={device} setDevice={setDevice}>
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 50 }}
        style={{ height: "100vh", width: "100%" }}
      >
        <IframeWrapper templateType="photography"/>
      </motion.div>
    </ResponsivePreview>
  )
}

export default SlideUpPreview;
