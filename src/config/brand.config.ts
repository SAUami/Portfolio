import { BrandConfig } from '../types';

/**
 * Central Brand Configuration
 * Updated with Saurabh Sharma's verified credentials, location (New Delhi, India - 201310),
 * role (Founder, Engineer & Entrepreneur), live project links, and founder image.
 */
export const brandConfig: BrandConfig = {
  founder: {
    name: "Saurabh Sharma",
    role: "Founder, Engineer & Entrepreneur",
    location: "New Delhi, India - 201310",
    email: "vedyxa.in@gmail.com",
    emailMailtoUrl: `mailto:vedyxa.in@gmail.com?subject=${encodeURIComponent("Project Enquiry / Collaboration with Saurabh Sharma")}&body=${encodeURIComponent("Hi Saurabh,\n\nI came across your portfolio and would love to connect with you regarding a new web project.\n\nHere are a few quick details about our requirements:\n• Organization / Company Name: \n• Service / Project Needed: \n• Estimated Timeline / Deadline: \n• Brief Project Idea / Goals: \n\nLooking forward to your thoughts and discussing next steps!\n\nWarm regards,\n[Your Name]\n[Your Phone / Contact Info]")}`,
    phoneWhatsApp: "+91 95069 86879",
    whatsAppUrl: "https://wa.me/919506986879?text=Hi%20Saurabh,%20I%20would%20like%20to%20discuss%20a%20project.",
    image: "/saurabh-sharma.jpg",
    linkedinUrl: "https://www.linkedin.com/in/saurabhsharma1385",
    instagramUrl: "https://www.instagram.com/saurabhsharma1385/",
    headline: "Turning Ideas Into Powerful Digital Experiences.",
    heroBio:
      "I'm Saurabh Sharma, a founder, engineer, and entrepreneur focused on building modern websites and web applications for businesses, educational institutions, and startups. I combine thoughtful design, practical technology, and clear communication to turn ideas into useful digital experiences.",
    aboutBioParagraphs: [
      "I'm Saurabh Sharma, a founder, engineer, and entrepreneur building useful digital products and helping businesses establish a strong, high-converting online presence. Through projects such as MedConnect and ClayVista, I explore how thoughtful interfaces and practical full-stack engineering can solve real-world problems.",
      "My approach focuses on understanding client requirements, keeping project scope transparent, building responsive experiences, and communicating clearly throughout development."
    ],
  },
  startup: {
    name: "Saurabh Sharma Studio",
    tagline: "Turning Ideas Into Powerful Digital Experiences.",
    statusNote: "Work-in-progress platforms & interactive case studies",
  },
  techStackSummary: [
    "React",
    "TypeScript",
    "Node.js",
    "Express",
    "Tailwind CSS",
    "MongoDB",
    "RESTful APIs",
    "Full-Stack Architecture"
  ],
  theme: {
    navyBg: "#070A12",
    navyCard: "#0E1524",
    electricBlue: "#3B82F6",
    subtleViolet: "#8B5CF6",
  },
};
