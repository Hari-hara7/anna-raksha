import React from 'react';

const MapDisplay = () => {
  return (
    <div className="w-full h-96">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d50015.43186587847!2d74.81597480935021!3d12.875060759392591!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sMangaluru%20hotels%20andd%20retaurent%20and%20foodbanks!5e1!3m2!1sen!2sin!4v1736563205741!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        aria-hidden="false"
        tabIndex="0"
      ></iframe>
    </div>
  );
};

export default MapDisplay;
