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
  {
    id: 3,
    media: "/project-domfie.mp4",
    mediaType: "video",
    title: "Domfie",
    description:
      "An autonomous web scraper that heals its own broken CSS selectors using a fine-tuned multimodal LLM and DOM-aware RAG.",
    details: `Domfie solves the classic "Brittle Scraper" problem — when a website changes its HTML structure (renames a CSS class, restructures the DOM), traditional scrapers break silently. Domfie detects this and autonomously generates new selectors using a specialized LLM.

The system implements a full end-to-end pipeline. First, a synthetic training dataset of ~610 pairs was harvested across 4 distinct website architectures — static grids, data tables, AJAX-loaded content, and complex nested divs. The specialized model Qwen2.5-Coder-1.5B-Instruct was fine-tuned using QLoRA 4-bit quantization via Unsloth on a single T4 GPU, achieving a training loss drop from 1.89 to 0.29.

The architecture uses a three-tier extraction strategy I call the "Self-Healing Agent Loop." The Fast Path checks a cached selector and returns data instantly. If the selector is broken, the Healing Path kicks in — a RAG pipeline vectorizes raw HTML chunks using BAAI/bge-small embeddings via LlamaIndex, then feeds only the relevant DOM context to the fine-tuned model to generate a new CSS selector. If that also fails, the Fallback Path extracts text directly via the LLM.

A critical design insight was indexing raw HTML chunks instead of stripped Markdown — standard RAG pipelines strip HTML tags, which destroys the structural cues the model needs to generate accurate selectors. This HTML-aware approach proved essential.

For deployment, the ~3GB FP16 model was compressed into a ~1GB Q4_K_M GGUF binary via llama.cpp, capable of running locally on a MacBook via Ollama with an 8K context window. A Streamlit UI provides the interface, and the system automatically switches from lightweight requests to undetected-chromedriver with stealth mode when it detects anti-bot sites like StockX, Nike, or Shopify.

The project is fully documented across 7 engineering phases, from data engineering through deployment. It is MIT-licensed and serves as a proof of concept for autonomous, self-healing web scraping on consumer hardware.`,
    tech: ["Python", "Qwen2.5-Coder", "Unsloth", "LlamaIndex", "Ollama", "Crawl4AI", "Streamlit"],
    links: {
      github: "https://github.com/itsmeyessir/Domfie",
    },
    objectPosition: "center top",
  },
  {
    id: 4,
    media: "/project-scamfie.mp4",
    mediaType: "video",
    title: "Scamfie",
    description:
      "AI-powered scam detection for Facebook Marketplace and Carousell — a Chrome extension that analyzes listings in real time and delivers a forensic risk verdict.",
    details: `Scamfie is a Chrome extension that brings AI-powered scam detection to Philippine e-commerce. When a user visits a Facebook Marketplace or Carousell listing and clicks "Analyze Page," the extension scrapes rich listing and seller data, sends it to a local Express backend, and returns a forensic risk verdict: SAFE, CAUTION, HIGH RISK, or CRITICAL.

The extension injects a script into the active tab that extracts item title, price, description, photo count, seller join date, active listing count, follower count, and rating count. For Carousell, it goes further by fetching the seller's profile page and parsing the embedded __NEXT_DATA__ JSON — the React SSR state — to extract verified seller statistics that aren't visible in the DOM.

The backend forwards the structured data to Groq's API using llama-3.1-8b-instant with temperature 0 for deterministic output. The system prompt encodes a strict forensic rule hierarchy: Power Seller Override (high ratings/followers = SAFE), Garage Sale Defense (many active listings = SAFE), Hacked Account Trap (old dormant account + one high-value item = HIGH RISK), Too Good To Be True (price < 60% of market value = HIGH RISK), and Lazy Scammer Signal (high-value item with one photo = HIGH RISK).

The extension UI renders a four-segment animated progress bar with the verdict mapped to fixed visual scores, a prediction card, market price verification with Google search link, recommended action steps, and key findings. Post-processing sanity checks on the server override any AI age misclassifications.

The most technically challenging aspect was Carousell scraping without an API. Since Carousell doesn't expose a public API, the scraper parses __NEXT_DATA__ JSON embedded in the HTML and regex-matches for listingCount, followersCount, reviewCount, and dateJoined, with fallbacks to DOMParser and meta tags.

Scamfie is v1.0.0 MVP status, GPLv3 licensed, and designed with a local-only architecture to keep API keys on the user's machine.`,
    tech: ["JavaScript", "Chrome Extensions (MV3)", "Node.js", "Express", "Groq API", "LLM"],
    links: {
      github: "https://github.com/itsmeyessir/Scamfie",
    },
    objectPosition: "center center",
  },
];
