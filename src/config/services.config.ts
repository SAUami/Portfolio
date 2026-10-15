import { ServiceItem } from '../types';

export const servicesData: ServiceItem[] = [
  {
    id: "business-website",
    title: "Business Website Development",
    shortDescription:
      "Modern, fast-loading, responsive websites tailored to communicate your brand story, build trust, and generate qualified client enquiries.",
    fullDescription:
      "Designed specifically for growing companies, local enterprises, and service professionals who need an authentic online presence that converts visitors into conversations.",
    deliverables: [
      "Custom responsive design & branding",
      "Mobile-first performance & SEO foundation",
      "Contact & lead enquiry workflows",
      "Fast hosting & domain configuration"
    ],
    icon: "Briefcase",
    badge: "Core Service"
  },
  {
    id: "school-website",
    title: "School Website Development",
    shortDescription:
      "Structured, accessible web portals for educational institutions, academies, and training centers to connect with parents, students, and staff.",
    fullDescription:
      "Clean information architecture facilitating easy access to academic calendars, admissions notices, faculty profiles, and departmental announcements.",
    deliverables: [
      "Admissions & prospectus enquiry forms",
      "Notice board & circular distribution hub",
      "Mobile-friendly navigation for parents",
      "Accessible typography & WCAG contrast compliance"
    ],
    icon: "GraduationCap",
    badge: "Specialized"
  },
  {
    id: "ecommerce-website",
    title: "E-commerce Website Development",
    shortDescription:
      "Custom product catalogues, shopping carts, and streamlined checkout experiences that make buying online intuitive and dependable.",
    fullDescription:
      "From boutique brands to specialized merchandise stores, providing structured inventory presentation, category browsing, and secure client-side state handling.",
    deliverables: [
      "Dynamic catalog & category filtering",
      "Interactive cart & wishlist interfaces",
      "Checkout workflow & order summaries",
      "Payment gateway integration readiness"
    ],
    icon: "ShoppingCart",
    badge: "Interactive"
  },
  {
    id: "custom-web-apps",
    title: "Custom Web Applications",
    shortDescription:
      "Tailor-made web applications designed around your exact operational workflows, internal dashboards, and customer self-service portals.",
    fullDescription:
      "Robust single-page applications engineered with React, TypeScript, and structured state management for high interactivity and reliable data processing.",
    deliverables: [
      "Role-based views & workflows",
      "Real-time validation & rich user feedback",
      "Modular, maintainable component hierarchy",
      "State management & responsive UI layouts"
    ],
    icon: "Layers",
    badge: "Full-Stack"
  },
  {
    id: "frontend-development",
    title: "Frontend Development",
    shortDescription:
      "Pixel-crisp, high-performance user interfaces built with React, TypeScript, Tailwind CSS, and polished motion design.",
    fullDescription:
      "Translating design concepts or wireframes into clean, accessible, and responsive codebases that feel snappy on both mobile phones and 4K displays.",
    deliverables: [
      "Semantic HTML5 & accessible components",
      "Tailwind CSS custom styling & design tokens",
      "Framer Motion micro-interactions",
      "Cross-browser testing & mobile tuning"
    ],
    icon: "Code2"
  },
  {
    id: "backend-api-integration",
    title: "Backend and API Integration",
    shortDescription:
      "Secure Node.js and Express REST APIs with rigorous input validation, database persistence, and third-party integrations.",
    fullDescription:
      "Developing organized backend services to process web submissions, connect to databases like MongoDB, and interface with external mailers or notification services.",
    deliverables: [
      "Express REST API architecture",
      "Zod data validation & rate limiting",
      "MongoDB database integration & schemas",
      "Configurable email & webhook adapters"
    ],
    icon: "Server"
  },
  {
    id: "website-maintenance",
    title: "Website Maintenance and Support",
    shortDescription:
      "Proactive technical maintenance, dependency updates, security checks, and content updates to keep your web assets running smoothly.",
    fullDescription:
      "Ensuring your digital investments stay secure, compatible with evolving web standards, and performant over time.",
    deliverables: [
      "Regular dependency & package updates",
      "Form & link health monitoring",
      "Content updates & layout refinements",
      "Direct developer communication & bug fixes"
    ],
    icon: "Wrench"
  }
];
