import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  return (
    //<div className="bg-black text-white min-h-screen">
    //<div className="bg-black text-white min-h-screen w-screen p-0 m-0">
    <div className="bg-black text-white min-h-screen w-screen ">
      {/* Hero Section */}
      <section className="relative text-center py-20 px-6">
        <motion.div
          className="absolute inset-0 bg-hero-pattern bg-cover bg-center opacity-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2 }}
        ></motion.div>
        <motion.h1
          className="text-6xl font-extrabold tracking-wide mb-6 text-gold"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Transforming Food Donations
        </motion.h1>
        <motion.p
          className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Empowering communities to reduce food waste and support those in need with a seamless, innovative platform.
        </motion.p>
        <motion.div
          className="flex justify-center gap-6 flex-wrap"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Link to="/donor" className="border-2 border-gold text-gold px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-gold hover:text-black transition">Get Started</Link>
          <Link to="/dashboard" className="border-2 border-gray-700 text-gold px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-800 hover:text-white transition">Learn More</Link>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-16 px-8 text-center">
        <motion.h2
          className="text-4xl font-extrabold text-gold mb-4"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          Why Choose Us?
        </motion.h2>
        <motion.p
          className="text-gray-300 leading-relaxed max-w-3xl mx-auto mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          We simplify the process of donating food while fostering a community-driven ecosystem to combat hunger and reduce waste. Join us in making a meaningful difference.
        </motion.p>
      </section>

      {/* Features Section */}
      <section className="py-16 px-8">
        <h2 className="text-4xl font-extrabold text-center text-gold mb-12">Platform Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Smart Donations", desc: "AI-driven insights to maximize donation impact.", icon: "💡" },
            { title: "Real-Time Updates", desc: "Track donation status and community needs.", icon: "⏱" },
            { title: "Eco-Friendly Impact", desc: "Contribute to a greener planet.", icon: "🌍" },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-900 text-center p-6 rounded-xl border-2 border-gold shadow-lg hover:bg-gold hover:text-black transition"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
            >
              <div className="text-5xl text-gold mb-6">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-300">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gray-800 text-center">
        <motion.h2
          className="text-4xl font-extrabold text-gold mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          Ready to Make an Impact?
        </motion.h2>
        <motion.p
          className="text-lg text-gray-300 mb-8 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Join a growing network of donors and changemakers. Together, we can fight hunger and reduce waste efficiently.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
        >
          <Link to="/signup" className="border-2 border-gold text-gold px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-gold hover:text-black transition">Join Now</Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;