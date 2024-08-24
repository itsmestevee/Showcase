import React, { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "../../redux/store";
import DeveloperTemplate from "../../pages/template/developerTemplate";
import PhotographyTemplate from "../../pages/template/photographyTemplate";
import MarketingTemplate from "../../pages/template/MarketingTemplate";
import BusinessTemplate from "../../pages/template/businessTemplate";

const getTemplateComponent = (templateType, templateId) => {
  switch (templateType) {
    case "developer":
      return <DeveloperTemplate templateId={templateId} />;
    case "photography":
      return <PhotographyTemplate templateId={templateId} />;
    case "marketing":
      return <MarketingTemplate templateId={templateId} />;
    case "business":
      return <BusinessTemplate templateId={templateId} />;
    default:
      return <DeveloperTemplate templateId={templateId} />; // Default template
  }
};

const IframeWrapper = ({ templateType, templateId }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const doc = iframeRef.current.contentDocument;

    if (!doc) return;

    // Write the initial HTML structure
    doc.open();
    doc.write(`
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap" rel="stylesheet">
          <link href="/css/index.css" rel="stylesheet"> <!-- Include your Tailwind compiled CSS -->
          <style>
            /* Hide scrollbar for Chrome, Safari and Opera */
            *::-webkit-scrollbar {
              display: none;
            }
            /* Hide scrollbar for IE, Edge and Firefox */
            * {
              -ms-overflow-style: none;  /* IE and Edge */
              scrollbar-width: none;  /* Firefox */
            }
          </style>
          <title>Showcase</title>
        </head>
        <body>
          <div id="root"></div>
        </body>
      </html>
    `);
    doc.close();

    // Render the React component within the iframe
    const root = createRoot(doc.getElementById('root'));
    root.render(
      <Provider store={store}>
        <Router>
          {getTemplateComponent(templateType, templateId)}
        </Router>
      </Provider>
    );
  }, [templateType, templateId]);

  return (
    <iframe
      ref={iframeRef}
      style={{ width: "100%", height: "100%", border: "none" }}
    />
  );
};

export default IframeWrapper;
