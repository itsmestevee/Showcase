import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const FormContact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceId = "service_2bxb027";
    const templateId = "template_jtdgdmi";
    const publicKey = "hohbRUDmaIS2E_fWI";

    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: "dom.dev",
      message: message,
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log("Email sent successfully!", response);
        toast.success("Email sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        toast.error("Failed to send email.");
      });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="font-sans sm:h-auto md:w-[50%] lg:pr-10 sm-max:w-[100%] flex flex-col justify-between py-20 gap-9 items-end"
        data-aos="flip-left"
      >
        <input
          type="text"
          className="border border-t-0 border-l-0 border-r-0 focus:outline-0 focus:outline px-2 bg-transparent dark:text-gray-100 placeholder:text-gray-400 w-full"
          placeholder="Your name"
          id="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          className="border border-t-0 border-l-0 border-r-0 focus:outline-0 focus:outline px-2 bg-transparent dark:text-gray-100 placeholder:text-gray-400 w-full"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          className="border border-t-0 border-l-0 border-r-0 focus:outline-0 focus:outline px-2 bg-transparent dark:text-gray-100 placeholder:text-gray-400 w-full"
          placeholder="Message"
          rows="4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary-hover px-16 rounded-md py-4 text-white font-sans"
        >
          Send Message
        </button>
      </form>
    </>
  );
};

export default FormContact;
