import { Project } from "@/types";

export const PROJECTS: Project[] = [
  {
    id: 1,
    media: "/project-calculator.mov", // Video file
    mediaType: "video",
    title: "Modern Scientific Calculator",
    description:
      "A feature-rich scientific calculator built with Java in Android Studio, featuring advanced math functions and a sleek UI design.",
    details: `As part of my exploration into Android development, I created a comprehensive scientific calculator application using Java in Android Studio. This project pushed me to deeply understand UI design principles, state management, and mathematical computations on mobile platforms.

The calculator goes beyond basic arithmetic to include trigonometric functions, logarithms, exponents, and complex equation solving. I implemented a dynamic history feature that allows users to recall and reuse previous calculations, enhancing productivity for students and professionals.

One of the most challenging aspects was designing the UI to be both visually appealing and highly functional. I created a responsive layout that adapts to different screen sizes and orientations, with careful attention to touch targets and interaction feedback.

The application uses custom animations for button presses and transitions between calculation modes, creating a fluid, engaging user experience. For error handling, I implemented a robust system that prevents invalid operations and provides clear feedback when errors occur.

Performance optimization was another key focus, ensuring rapid calculations even for complex operations. The app maintains state efficiently, preserving history and settings across sessions without excessive memory usage.

This project deepened my understanding of Java programming, Android's lifecycle management, and UI/UX design principles. It also taught me valuable lessons about user testing and iterative improvement based on feedback.`,
    tech: ["Java", "Android Studio", "XML", "Material Design", "JUnit"],
    links: {
      github: "https://github.com/itsmeyessir/AndroidStudio/tree/main/SciCal",
    },
    objectPosition: "center center",
  },
  {
    id: 2,
    media: "/project-roadfie.mov",
    mediaType: "video",
    title: "Roadfie",
    description:
      "A geospatial temporal risk analysis app that provides context-aware navigation recommendations based on MMDA monitored roads data.",
    details: `Roadfie emerged from our frustration with existing navigation apps that only provide route estimates without contextual risk information. Our daily commutes through Manila's unpredictable streets inspired us to create something more helpful for commuters.

The app analyzes multiple data layers simultaneously—historical traffic patterns, road accidents, weather forecasts, flood data, social media reports, and real-time road conditions. When users input their "from-to" destinations like in Google Maps, Roadfie provides a risk score, detailed contextual information, and specific actions to take.

For example, a high-risk score during rainy season might trigger recommendations like "Take route B instead—it's 10 minutes longer but has 85% less chance of flooding" or "Leave 25 minutes earlier to avoid the predicted traffic congestion at Quezon Avenue." This context-aware approach helps commuters make better decisions.

The technical architecture uses an XGBoost model that achieved 97.94% accuracy in predicting urban mobility risks. The front end was built using React Native for cross-platform support, with Node.js powering the backend API. We integrated data from the MMDA (Metro Manila Development Authority), weather services, and crowdsourced reports to create a comprehensive risk assessment system.

User testing showed that our recommendations reduced commute disruptions significantly compared to standard navigation apps. The UI was designed to present complex risk information in an intuitive way, using color-coded routes and simple action cards rather than overwhelming users with data.

This project was acknowledged at multiple academic conferences, especially in the 8th International Conference on Machine Learning and Machine Intelligence (MLMI 2025) where it is accepted for publication. We're currently exploring more algorithms and ways for us to improve our model so that we can find and land a partnership with transportation agencies and ride-sharing companies.`,
    tech: ["Python", "XGBoost", "Clustering", "Streamlit", "GIS"],
    links: {
      github: "https://github.com/itsmeyessir/Python/tree/main/ROADFIE",
    },
    objectPosition: "center center",
  },
];
