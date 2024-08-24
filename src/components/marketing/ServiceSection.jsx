import React from 'react';
import { CardBoxComponent } from './CardBoxComponent';
import { motion } from 'framer-motion';

function ServiceSection({ services = [] }) {
  return (
    <div>
      <div>
        <br />
        <motion.div
          className='md:mx-60 sm:mx-32 mx-0 items-center flex flex-col text-center sm:text-start sm:items-start'
          id="service"
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <small className="text-md text-white"><span className="text-yellow-300">// </span>
            0 . 1 SERVICES
          </small>
          <h2 className='text-2xl w-[300px] max-w-[300px] text-white'>High-impact services to take your business to the next level</h2>
        </motion.div>
        <div className='mx-'>
          <div
            className='flex flex-wrap gap-5 xl:flex-row justify-center mt-16 xl:mx-32 lg:mx-0 md:mx-0'
          >
            {services.length > 0 ? (
              services.map((service) => (
                <CardBoxComponent
                  key={service.id}
                  image={service.image[0]?.url || ""}
                  name={service.title}
                  desc={service.description}
                  motionProps={{ delay: 1, duration: 1 }}
                />
              ))
            ) : (
              <p className="text-white">No services available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceSection;
