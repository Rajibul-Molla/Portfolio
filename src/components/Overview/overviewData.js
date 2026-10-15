import cityImg from "../../assets/overview-city.jpg";
import portraitImg from "../../assets/overview-potrait.jpg";

export const overviewData = {
  badge: "Open to new opportunities",
  name: "Rajibul Molla",
  role: "Full-stack software engineer",
  heading: "I build the whole feature, database to browser.",
  paragraphs: [
    "I'm a full-stack software engineer working with the MERN stack. I take a feature from the schema and API through to the screen a person actually uses.",
    "[Add one line about what you are building or learning right now.]",
  ],
  buttons: {
    primary: "Download resume",
    secondary: "Contact me",
    resumeUrl: "/assets/Rajibul_Molla_2026.pdf",
  },
  stats: [
    { label: "Projects", value: 20, suffix: "+" },
    { label: "Projects", value: 20, suffix: "+" },
    { label: "Projects", value: 20, suffix: "+" },
    { label: "Projects", value: 20, suffix: "+" },
  ],
  info: [
    { label: "Works with", value: "React, Node.js, Express, MongoDB" },
    { label: "Open to", value: "Full-time roles and freelance projects" },
    { label: "Languages", value: "[Languages you speak]" },
  ],
  location: {
    label: "Based in",
    value: "Kolkata, West Bengal",
  },
  images: {
    city: cityImg,
    portrait: portraitImg,
  },
  showCityImageInLocationCard: false,
};
