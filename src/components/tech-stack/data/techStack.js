/**
 * @typedef {Object} Layer
 * @property {string} id               - Unique identifier: "frontend" | "backend" | "data"
 * @property {string} eyebrow          - Mono label above the card title (e.g. "Browser")
 * @property {string} title            - Display-font card title (e.g. "React")
 * @property {string} subtitle         - Sub-label below card title (e.g. "Interface")
 * @property {string} panelTitle       - Heading inside the detail panel (e.g. "Frontend")
 * @property {string} [description]    - Optional paragraph shown in the detail panel
 * @property {string[]} skills         - Skill chip labels rendered in the panel
 * @property {string} [connectorLabel] - Label on the arrow connector LEADING INTO this layer
 */

/** @type {Layer[]} */
export const layers = [
  {
    id: "frontend",
    eyebrow: "Browser",
    title: "React",
    subtitle: "Interface",
    panelTitle: "Frontend",
    description:
      "Component-based interfaces with routing and state, built to work on every screen size.",
    skills: ["React", "React Router", "JavaScript", "HTML and CSS", "Tailwind CSS"],
    connectorLabel: null, // first layer has no incoming arrow
  },
  {
    id: "backend",
    eyebrow: "Server",
    title: "Node.js + Express",
    subtitle: "API layer",
    panelTitle: "Backend",
    description: "RESTful APIs with clean routing and middleware, secured with JWT authentication and structured for easy scaling.",
    skills: ["Node.js", "Express", "REST APIs", "JWT authentication"],
    connectorLabel: "request",
  },
  {
    id: "data",
    eyebrow: "Database",
    title: "MongoDB",
    subtitle: "Data",
    panelTitle: "Data",
    description: "Flexible document storage with Mongoose schemas, hosted on MongoDB Atlas for reliable cloud persistence.",
    skills: ["MongoDB", "Mongoose", "MongoDB Atlas"],
    connectorLabel: "query",
  },
];

/**
 * @typedef {Object} ExtraGroup
 * @property {string} id      - Unique key
 * @property {string} title   - Display-font heading
 * @property {string[]} items - Skill labels
 * @property {string} ghost   - Placeholder label for the ghost chip
 */

/** @type {ExtraGroup[]} */
export const extraGroups = [
  {
    id: "tools",
    title: "Tools and workflow",
    items: ["Git and GitHub", "Postman", "VS Code"],
    ghost: "[Add a skill]",
  },
  {
    id: "languages",
    title: "Languages",
    items: ["JavaScript"],
    ghost: "[Add a language]",
  },
  {
    id: "other",
    title: "Other skills",
    items: [],
    ghost: "[Add a skill]",
  },
];
