import PrimaryButton from "./ButtonPrimary";
import { delay, motion } from "framer-motion";

export function TopSection({heroImage, name, profession, biography }) {
  return (
    <div className="flex flex-col-reverse md:flex-row mt-32 mx-5 gap-5 xl:mx-60 lg:mx-32 xl:justify-center justify-between">
      <motion.section
        className="flex justify-center"
        initial={{ y: -50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <div className="flex flex-col text-center md:text-start">
          <small className="text-md">
            <span className="text-yellow-300">//</span>
            INTRODUCTION
          </small>
          <div className="lg:w-[500px] w-full">
            <h1 className="text-5xl font-semibold">
              Introduction, Hello I'm
              <span className="text-blue-500"> {name}</span> {profession}
            </h1>
          </div>
          <br />
          <div>
            <small>{biography}</small>
          </div>
          <br />
          <br />
          <a
            className="flex flex-row gap-5 justify-center md:justify-start"
            href="#service"
          >
            <PrimaryButton text="How can i help" />
          </a>
        </div>
      </motion.section>
      <section className="flex justify-center">
        <motion.img
          src={heroImage}
          alt="Marketing"
          className="w-[350px] max-w-[350px] rounded-xl"
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{
            delay: 1,
            duration: 1,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1.1 }}
        />
      </section>
    </div>
  );
}
