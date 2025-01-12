import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';


const Home: React.FC = () => {
  const [language, setLanguage] = useState('en');

  const translations = {
    en: {
      heroTitle: "Transforming Food Donations",
      heroDescription: "Empowering communities to reduce food waste and support those in need with a seamless, innovative platform.",
      getStarted: "Get Started",
      learnMore: "Learn More",
      aboutTitle: "Why Choose Us?",
      aboutDescription: "We simplify the process of donating food while fostering a community-driven ecosystem to combat hunger and reduce waste. Join us in making a meaningful difference.",
      platformTitle: "Platform Highlights",
      smartDonations: "Smart Donations",
      smartDesc: "AI-driven insights to maximize donation impact.",
      realTimeUpdates: "Real-Time Updates",
      realTimeDesc: "Track donation status and community needs.",
      ecoImpact: "Eco-Friendly Impact",
      ecoDesc: "Contribute to a greener planet.",
      callToAction: "Ready to Make an Impact?",
      ctaDescription: "Join a growing network of donors and changemakers. Together, we can fight hunger and reduce waste efficiently.",
      joinNow: "Join Now"
    },
    te: {
      heroTitle: "భోజన విరాళాలను మార్చడం",
      heroDescription: "కమ్యూనిటీలను ఆహారం వ్యర్థత తగ్గించేందుకు మరియు అవసరమున్న వారికి సహాయం అందించేందుకు ఒక సజావుగా, క్రియేటివైన ప్లాట్‌ఫారమ్.",
      getStarted: "ప్రారంభించండి",
      learnMore: "మరింత తెలుసుకోండి",
      aboutTitle: "మాకు ఎందుకు ఎంచుకోవాలి?",
      aboutDescription: "భోజన విరాళాలను ఇవ్వడం ప్రక్రియను సరళతరం చేస్తూ, దానికోసం సమాజాన్ని అభివృద్ధి చేస్తోంది.",
      platformTitle: "ప్లాట్‌ఫారమ్ హైలైట్‌లు",
      smartDonations: "స్మార్ట్ విరాళాలు",
      smartDesc: "ఐఎఐ ఆధారిత విశ్లేషణలు విరాళ ప్రభావాన్ని పెంచుతాయి.",
      realTimeUpdates: "ప్రస్తుతం సమయపు నవీకరణలు",
      realTimeDesc: "విరాళ స్థితిని మరియు కమ్యూనిటీ అవసరాలను ట్రాక్ చేయండి.",
      ecoImpact: "పర్యావరణ అనుకూల ప్రభావం",
      ecoDesc: "హరిత గ్రహానికి సహాయం చేయండి.",
      callToAction: "ప్రభావాన్ని కలిగి ఉండడానికి సిద్ధంగా ఉన్నారా?",
      ctaDescription: "విరాళదాతలు మరియు మార్పు తీసుకొచ్చే వారి పెరుగుతున్న నెట్‌వర్క్‌లో చేరండి.",
      joinNow: "ఇప్పుడు చేరండి"
    },
    hi: {
      heroTitle: "खाद्य दान में बदलाव",
      heroDescription: "समुदायों को खाद्य अपव्यय को कम करने और जरूरतमंदों का समर्थन करने के लिए एक सहज, नवाचारी मंच के साथ सशक्त बनाना।",
      getStarted: "शुरू करें",
      learnMore: "अधिक जानें",
      aboutTitle: "हमें क्यों चुनें?",
      aboutDescription: "हम खाद्य दान की प्रक्रिया को सरल बनाते हैं और भूख से लड़ने और अपव्यय को कम करने के लिए एक समुदाय-प्रेरित पारिस्थितिकी तंत्र को बढ़ावा देते हैं। हमारे साथ जुड़ें और एक सार्थक बदलाव लाएं।",
      platformTitle: "प्लेटफ़ार्म की विशेषताएँ",
      smartDonations: "स्मार्ट दान",
      smartDesc: "दान के प्रभाव को अधिकतम करने के लिए एआई-आधारित अंतर्दृष्टि।",
      realTimeUpdates: "रियल-टाइम अपडेट्स",
      realTimeDesc: "दान की स्थिति और समुदाय की आवश्यकताओं को ट्रैक करें।",
      ecoImpact: "पर्यावरणीय प्रभाव",
      ecoDesc: "एक हरित ग्रह में योगदान करें।",
      callToAction: "प्रभाव डालने के लिए तैयार हैं?",
      ctaDescription: "दानकर्ताओं और परिवर्तनकर्मियों के बढ़ते नेटवर्क में शामिल हों। साथ में हम भूख से लड़ सकते हैं और अपव्यय को प्रभावी रूप से कम कर सकते हैं।",
      joinNow: "अब जुड़ें"
    },
    kn: {
      heroTitle: "ಆಹಾರ ದಾನದಲ್ಲಿ ಬದಲಾವಣೆ",
      heroDescription: "ಸಮುದಾಯಗಳನ್ನು ಆಹಾರ ವ್ಯರ್ಥತೆಯನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಮತ್ತು ಅಗತ್ಯವಿರುವವರಿಗೆ ಸಹಾಯ ಮಾಡುವುದಕ್ಕಾಗಿ ಸರಳ, ನವೀನ ವೇದಿಕೆ ಮೂಲಕ ಶಕ್ತಿಗೊಳಿಸುವುದು.",
      getStarted: "ಪ್ರಾರಂಭಿಸಿ",
      learnMore: "ಹೆಚ್ಚು ತಿಳಿದುಕೊಳ್ಳಿ",
      aboutTitle: "ನಾವು ಏಕೆ ಆಯ್ಕೆಮಾಡಬೇಕು?",
      aboutDescription: "ನಾವು ಆಹಾರ ದಾನದ ಪ್ರಕ್ರಿಯೆಯನ್ನು ಸರಳಗೊಳಿಸುತ್ತೇವೆ ಮತ್ತು ಹಸಿವಿನಿಂದ ಹೋರಾಡಲು ಮತ್ತು ವ್ಯರ್ಥವನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಸಮುದಾಯಾಧಾರಿತ ಪರಿಸರವನ್ನು ಉತ್ತೇಜಿಸುತ್ತೇವೆ. ನಮ್ಮೊಂದಿಗೆ ಸೇರಿ ಮತ್ತು ಅರ್ಥಪೂರ್ಣ ಬದಲಾವಣೆಯನ್ನು ತರಲು ಸಹಯೋಗ ಮಾಡೋಣ.",
      platformTitle: "ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ವೈಶಿಷ್ಟ್ಯಗಳು",
      smartDonations: "ಸ್ಮಾರ್ಟ್ ದಾನಗಳು",
      smartDesc: "ದ性的 ಪರಿಣಾಮವನ್ನು ಗರಿಷ್ಠಗೊಳಿಸಲು ಎಐ ಆಧಾರಿತ ವಿಶ್ಲೇಷಣೆ.",
      realTimeUpdates: "ರಿಯಲ್-ಟೈಮ್ ಅಪ್‌ಡೇಟ್ಸ್",
      realTimeDesc: "ದಾನದ ಸ್ಥಿತಿ ಮತ್ತು ಸಮುದಾಯ ಅಗತ್ಯಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ.",
      ecoImpact: "ಪರಿಸರ ಪ್ರಭಾವ",
      ecoDesc: "ಹರಿತ ಗ್ರಹದಲ್ಲಿ ಕೊಡುಗೆ ನೀಡಿರಿ.",
      callToAction: "ಪ್ರಭಾವವನ್ನು ತರುವುದಕ್ಕೆ ಸಿದ್ಧರೇ?",
      ctaDescription: "ದಾನಕರ್ತರು ಮತ್ತು ಬದಲಾವಣೆ ಉಂಟುಮಾಡುವವರ ವೃದ್ಧಿಸುತ್ತಿರುವ ನೆಟ್‌ವರ್ಕ್‌ಗೆ ಸೇರಿ. ನಾವು ಒಟ್ಟಿಗೆ ಹಸಿವಿನಿಂದ ಹೋರಾಡಬಹುದು ಮತ್ತು ವ್ಯರ್ಥವನ್ನು ಪರಿಣಾಮಕಾರಿಯಾಗಿ ಕಡಿಮೆ ಮಾಡಬಹುದು.",
      joinNow: "ಈಗ ಸೇರಿ"
    },
  };

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Language Selector */}
      <div className="absolute top-16 right-4 z-10">
  <select
    className="bg-gray-800 text-white px-4 py-2 rounded-md"
    value={language}
    onChange={(e) => setLanguage(e.target.value)}
  >
    <option value="en">English</option>
    <option value="te">తెలుగు</option>
    <option value="hi">हिंदी</option>
    <option value="kn">ಕನ್ನಡ</option>
  </select>
</div>




        {/* Hero Section */}
        <section className="relative text-center py-20 px-6">
        <motion.div
          className="absolute inset-0 bg-hero-pattern bg-cover bg-center opacity-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2 }}
        ></motion.div>
        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-wide mb-6 text-gold"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {translations[language].heroTitle}
        </motion.h1>
        <motion.p
          className="text-sm sm:text-lg text-gray-300 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          {translations[language].heroDescription}
        </motion.p>
        <motion.div
          className="flex justify-center gap-4 flex-wrap"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Link
            to="/donor"
            className="border-2 border-gold text-gold px-4 py-2 sm:px-6 sm:py-3 rounded-full font-semibold shadow-lg hover:bg-gold hover:text-black transition"
          >
            {translations[language].getStarted}
          </Link>
          <Link
            to="/dashboard"
            className="border-2 border-gray-700 text-gold px-4 py-2 sm:px-6 sm:py-3 rounded-full font-semibold shadow-lg hover:bg-gray-800 hover:text-white transition"
          >
            {translations[language].learnMore}
          </Link>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-12 sm:py-16 px-6 sm:px-8 text-center">
        <motion.h2
          className="text-3xl sm:text-4xl font-extrabold text-gold mb-4"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          {translations[language].aboutTitle}
        </motion.h2>
        <motion.p
          className="text-sm sm:text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          {translations[language].aboutDescription}
        </motion.p>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 px-6 sm:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gold mb-8 sm:mb-12">
          {translations[language].platformTitle}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: translations[language].smartDonations, desc: translations[language].smartDesc, icon: "💡" },
            { title: translations[language].realTimeUpdates, desc: translations[language].realTimeDesc, icon: "⏱" },
            { title: translations[language].ecoImpact, desc: translations[language].ecoDesc, icon: "🌍" },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-900 text-center p-6 rounded-xl border-2 border-gold shadow-lg hover:bg-gold hover:text-black transition"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
            >
              <div className="text-4xl sm:text-5xl text-gold mb-4">{feature.icon}</div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2">{feature.title}</h3>
              <p className="text-sm sm:text-base text-gray-300">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 sm:py-20 bg-gray-800 text-center">
        <motion.h2
          className="text-3xl sm:text-4xl font-extrabold text-gold mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          {translations[language].callToAction}
        </motion.h2>
        <motion.p
          className="text-sm sm:text-lg text-gray-300 mb-6 sm:mb-8 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          {translations[language].ctaDescription}
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <Link
            to="/login"
            className="border-2 border-gold text-gold px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-gold hover:text-black transition m-0 p-0"
          >
            {translations[language].joinNow}
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
