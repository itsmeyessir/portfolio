"use client";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft } from "react-icons/fa";
import React from "react";

export default function ResumeClient() {
  // Add status state
  const [status, setStatus] = React.useState<'active' | 'away' | 'busy' | 'offline'>('active');
  const statusColors = {
    active: 'bg-green-500',
    away: 'bg-yellow-400',
    busy: 'bg-red-500',
    offline: 'bg-neutral-500',
  };
  const statusLabels = {
    active: 'Available',
    away: 'Away',
    busy: 'Busy',
    offline: 'Offline',
  };

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key="resume-main"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col items-center px-4 pt-32 pb-16"
      >
        {/* Back Button */}
        <a
          href="/"
          className="absolute left-6 top-8 z-20 p-1 text-white hover:scale-110 transition"
          style={{ background: 'none', border: 'none', boxShadow: 'none' }}
          aria-label="Back to Home"
        >
          <FaChevronLeft size={22} />
        </a>
        <div className="flex flex-col items-center mb-12">
          <div className="relative mb-4">
            <img
              src="/profile.jpg"
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-neutral-800 shadow-lg shadow-black/40"
            />
            <span
              className={`absolute bottom-2 right-2 rounded-full w-4 h-4 border-2 border-neutral-950 shadow-md ${statusColors[status]}`}
              title={statusLabels[status]}
            />
          </div>
          {/* status selector for demo purposes */}
          {/* <div className="flex gap-2 mb-2">
            {Object.keys(statusColors).map((key) => (
              <button
                key={key}
                className={`w-4 h-4 rounded-full border-2 border-neutral-700 ${statusColors[key as keyof typeof statusColors]}`}
                onClick={() => setStatus(key as typeof status)}
                title={statusLabels[key as keyof typeof statusLabels]}
              />
            ))}
          </div> */}
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-1">
            Robbie Espaldon
          </h1>
          <p className="text-neutral-400 text-lg mb-2">
            B.S. Computer Science (Machine Learning)
          </p>
        </div>
        <div className="w-full max-w-3xl bg-neutral-900/80 rounded-2xl shadow-xl shadow-black/30 p-8 backdrop-blur-md border border-neutral-800 space-y-10">
          {/* Education Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="i-lucide-graduation-cap text-primary" /> Education
            </h2>
            <div className="space-y-4">
              <div className="bg-neutral-800/70 rounded-xl p-5 shadow-md border border-neutral-700 hover:scale-[1.015] transition-transform duration-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="font-semibold text-lg text-white">
                      Moonwalk National High School
                    </div>
                    <div className="text-neutral-400">
                      Junior High School (STE) to Senior High School (STEM)
                    </div>
                  </div>
                  <div className="text-neutral-400 mt-2 md:mt-0 md:text-right">
                    Moonwalk, Parañaque
                    <br />
                    2015 – 2021
                  </div>
                </div>
              </div>
              <div className="bg-neutral-800/70 rounded-xl p-5 shadow-md border border-neutral-700 hover:scale-[1.015] transition-transform duration-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="font-semibold text-lg text-white">
                      National University - Manila
                    </div>
                    <div className="text-neutral-400">
                      Bachelor of Science in Computer Science
                      <br />
                      Specialization in Machine Learning
                    </div>
                  </div>
                  <div className="text-neutral-400 mt-2 md:mt-0 md:text-right">
                    Sampaloc, Manila
                    <br />
                    2022 – Present
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Experience & Leadership Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="i-lucide-briefcase text-primary" /> Experience &
              Leadership
            </h2>
            <div className="space-y-5">
              {/* Undergraduate Research Assistant */}
              <div className="bg-neutral-800/70 rounded-xl p-5 shadow-md border border-neutral-700 hover:scale-[1.015] transition-transform duration-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="font-semibold text-lg text-white">
                      Undergraduate Research Assistant
                    </div>
                    <div className="text-neutral-400">
                      National University - Manila
                    </div>
                  </div>
                  <div className="text-neutral-400 mt-2 md:mt-0 md:text-right">
                    2024 – Present
                    <br />
                    Sampaloc, Manila
                  </div>
                </div>
                <ul className="list-disc list-outside text-neutral-300 mt-2 text-sm space-y-1 pl-5"> {/* Changed to list-outside, added pl-5 */}
                <li>
                    Developed a Geospatial Temporal Risk Analysis Model used for
                    predicting road incident scores in MMDA monitored roads.
                </li>
                <li>Research paper accepted in the ISCAIE2025 Conference</li> {/* Removed pl-1 here */}
                </ul>
              </div>
              {/* Internal Vice President */}
              <div className="bg-neutral-800/70 rounded-xl p-5 shadow-md border border-neutral-700 hover:scale-[1.015] transition-transform duration-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="font-semibold text-lg text-white">
                      Internal Vice President
                    </div>
                    <div className="text-neutral-400">
                      NU Axios: DOST Scholars’ Association
                    </div>
                  </div>
                  <div className="text-neutral-400 mt-2 md:mt-0 md:text-right">
                    2024 – Present
                    <br />
                    Sampaloc, Manila
                  </div>
                </div>
                <ul className="list-disc list-inside text-neutral-300 mt-2 text-sm space-y-1">
                  <li>
                    Led strategic initiatives to enhance member engagement and
                    organizational growth
                  </li>
                  <li>
                    Streamlined operations by developing and implementing internal
                    policies and procedures
                  </li>
                  <li>
                    Coordinated major events, including workshops and seminars,
                    attracting over 100 participants
                  </li>
                </ul>
              </div>
              {/* Vice Marketing Officer */}
              <div className="bg-neutral-800/70 rounded-xl p-5 shadow-md border border-neutral-700 hover:scale-[1.015] transition-transform duration-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="font-semibold text-lg text-white">
                      Vice Marketing Officer
                    </div>
                    <div className="text-neutral-400">
                      AWS Learning Club - Legarda
                    </div>
                  </div>
                  <div className="text-neutral-400 mt-2 md:mt-0 md:text-right">
                    2024 – Present
                    <br />
                    Sampaloc, Manila
                  </div>
                </div>
                <ul className="list-disc list-outside text-neutral-300 mt-2 text-sm space-y-1 pl-5"> {/* Changed to list-outside, added pl-5 */}
                  <li>
                    Leveraged social media and digital marketing tools to promote
                    club activities and engage potential members
                  </li>
                  <li>
                    Created promotional materials and successfully increased event
                    attendance and participant satisfaction
                  </li>
                  <li>
                    Collaborated with other organizations to co-host events,
                    expanding the club’s reach
                  </li>
                </ul>
              </div>
              {/* DOST Scholar */}
              <div className="bg-neutral-800/70 rounded-xl p-5 shadow-md border border-neutral-700 hover:scale-[1.015] transition-transform duration-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="font-semibold text-lg text-white">
                      DOST Scholar
                    </div>
                    <div className="text-neutral-400">
                      National University - Manila
                    </div>
                  </div>
                  <div className="text-neutral-400 mt-2 md:mt-0 md:text-right">
                    2022 – Present
                    <br />
                    Sampaloc, Manila
                  </div>
                </div>
                <ul className="list-disc list-outside text-neutral-300 mt-2 text-sm space-y-1 pl-5"> {/* Changed to list-outside, added pl-5 */}
                  <li>
                    Maintained a high academic standing, consistently achieving top
                    grades in a rigorous and fast-paced curriculum
                  </li>
                  <li>
                    Recognized for academic achievements with scholarships and
                    awards, demonstrating commitment to excellence
                  </li>
                  <li>
                    Mentored junior scholars and organized study groups to foster
                    collaborative learning
                  </li>
                </ul>
              </div>
              {/* Competitive Programmer */}
              <div className="bg-neutral-800/70 rounded-xl p-5 shadow-md border border-neutral-700 hover:scale-[1.015] transition-transform duration-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="font-semibold text-lg text-white">
                      Competitive Programmer
                    </div>
                    <div className="text-neutral-400">
                      National University - Manila
                    </div>
                  </div>
                  <div className="text-neutral-400 mt-2 md:mt-0 md:text-right">
                    2022 – Present
                    <br />
                    Sampaloc, Manila
                  </div>
                </div>
                <ul className="list-disc list-outside text-neutral-300 mt-2 text-sm space-y-1 pl-5"> {/* Changed to list-outside, added pl-5 */}
                  <li>
                    Secured 3rd place in the “Beyond the Grid: Meralco Idol
                    Hackathon 2024” with “GridGuard,” an AI-driven power grid
                    monitoring system
                  </li>
                  <li>
                    Participated in numerous hackathons, delivering innovative
                    solutions and earning recognition
                  </li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Projects Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="i-lucide-layers text-primary" /> Projects
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {/* Each project as a card */}
              {[
                {
                  icon: 'i-lucide-bot',
                  title: 'Discord Sneaker Bot',
                  desc: 'Created a Discord bot using a custom web scraping API to fetch sneaker details from the GOAT website',
                },
                {
                  icon: 'i-lucide-line-chart',
                  title: 'Sneaker Price Predictor',
                  desc: 'Built a predictive model using the 2019 StockX dataset to forecast sneaker prices',
                },
                {
                  icon: 'i-lucide-calculator',
                  title: 'Android Calculator App',
                  desc: 'Developed an Android app with basic, scientific, and graphing calculator modes that is similar to Desmos',
                },
                {
                  icon: 'i-lucide-pen-tool',
                  title: 'Signature Forgery Detection',
                  desc: 'Developed a signature forgery detection system using YOLOv8, YOLOv5, and a custom CNN',
                },
                {
                  icon: 'i-lucide-factory',
                  title: 'Manufacturing Management System',
                  desc: 'Developed a manufacturing management system for modular phone production using MERN stack and Google Maps API to provide real-time tracking of inventory, production, and shipments to optimize logistics',
                },
                {
                  icon: 'i-lucide-map-pin',
                  title: 'Geospatial Temporal Risk Analysis Model',
                  desc: 'Developed a Geospatial Temporal Risk Analysis Model that can be used for predicting road incident scores to avoid traffic or related incidents',
                },
                {
                  icon: 'i-lucide-terminal',
                  title: 'Terminal Chatbot',
                  desc: 'Created a terminal-based chatbot using LangChain and OllamaLLM for interactive conversations',
                },
                {
                  icon: 'i-lucide-shield-check',
                  title: 'GridGuard (AI Power Grid Monitoring)',
                  desc: 'Created GridGuard, an AI-driven power grid monitoring system',
                },
              ].map((proj) => (
                <div
                  key={proj.title}
                  className="group bg-neutral-800/70 rounded-xl p-5 shadow-md border border-neutral-700 hover:border-primary hover:shadow-primary/30 transition-all duration-200 flex flex-col gap-1 cursor-pointer items-start text-left"
                >
                  <div className="flex items-center gap-2 w-full">
                    <span className={`${proj.icon} text-primary text-xl`} />
                    <div className="flex flex-col">
                      <span className="font-semibold text-white text-base leading-tight">{proj.title}</span>
                      <p className="text-neutral-300 text-sm leading-snug mt-1">{proj.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Technical Skills Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="i-lucide-cpu text-primary" /> Technical Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="ml-2 md:ml-3">
                <h3 className="text-lg font-semibold text-neutral-100 mb-2">
                  Languages
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {[
                    "Java",
                    "Python",
                    "SQL (MySQL)",
                    "JavaScript",
                    "HTML/CSS",
                    "Kotlin",
                  ].map((skill) => (
                    <li
                      key={skill}
                      className="bg-neutral-800/70 rounded px-3 py-1 text-sm border border-neutral-700 hover:border-primary hover:bg-neutral-700 hover:text-white transition-colors duration-200 cursor-pointer text-neutral-200"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
                <h3 className="text-lg font-semibold text-neutral-100 mt-4 mb-2">
                  Frameworks
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {[
                    "React",
                    "Next.js",
                    "Flask",
                    "Node.js",
                    "Express.js",
                    "JUnit",
                    "Material-UI",
                    "FastAPI",
                    "Django",
                    "Streamlit",
                  ].map((skill) => (
                    <li
                      key={skill}
                      className="bg-neutral-800/70 rounded px-3 py-1 text-sm border border-neutral-700 hover:border-primary hover:bg-neutral-700 hover:text-white transition-colors duration-200 cursor-pointer text-neutral-200"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="ml-2 md:ml-2">
                <h3 className="text-lg font-semibold text-neutral-100 mb-2">
                  Developer Tools
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {[
                    "Git",
                    "Docker",
                    "TravisCI",
                    "Google Cloud Platform",
                    "VS Code",
                    "Android Studio",
                    "PyCharm",
                    "MongoDB (NoSQL)",
                  ].map((skill) => (
                    <li
                      key={skill}
                      className="bg-neutral-800/70 rounded px-3 py-1 text-sm border border-neutral-700 hover:border-primary hover:bg-neutral-700 hover:text-white transition-colors duration-200 cursor-pointer text-neutral-200"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
                <h3 className="text-lg font-semibold text-neutral-100 mt-4 mb-2">
                  Libraries
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {[
                    "pandas",
                    "NumPy",
                    "Matplotlib",
                    "LangChain",
                    "OllamaLLM",
                    "PyTorch",
                    "YOLO",
                  ].map((skill) => (
                    <li
                      key={skill}
                      className="bg-neutral-800/70 rounded px-3 py-1 text-sm border border-neutral-700 hover:border-primary hover:bg-neutral-700 hover:text-white transition-colors duration-200 cursor-pointer text-neutral-200"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.section>
        </div>
      </motion.main>
    </AnimatePresence>
  );
}
