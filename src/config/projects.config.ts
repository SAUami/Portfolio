import { ProjectCaseStudy } from '../types';

export const projectsData: ProjectCaseStudy[] = [
  {
    id: "medconnect",
    slug: "medconnect",
    title: "MedConnect",
    category: "Healthcare Platform",
    tagline: "Connecting patients with healthcare professionals through clear digital touchpoints.",
    description:
      "MedConnect is a healthcare platform project designed to improve the digital experience of connecting patients with healthcare professionals.",
    liveUrl: "https://med-connect-chi.vercel.app/",
    workInProgress: true,
    liveStatusNotice: "Work in Progress — Live Prototype Under Active Development",
    problemStatement: [
      "Patients frequently face fragmented experiences when searching for specialist medical practitioners, verifying credentials, and managing medical documentation.",
      "Traditional healthcare workflows often rely on physical paperwork or disjointed messaging channels that lead to mismanaged records and patient confusion.",
      "Doctors need an organized, legible digital workflow to review consultation notes and generate standardized digital prescriptions without administrative friction."
    ],
    objectives: [
      "Design an intuitive multi-role user flow distinguishing patient exploration from practitioner workflows.",
      "Implement a structured doctor search and filtering system based on specialization, consultation modes, and availability.",
      "Engineer a digital prescription viewer with dynamic PDF generation for download and offline printing.",
      "Ensure high contrast, clean typography, and accessible navigation for patients of varying digital literacy."
    ],
    features: [
      {
        title: "Doctor Discovery & Filtering",
        description:
          "Specialty-based search, location/mode filters (teleconsultation vs clinic visit), and credential summaries.",
        status: "implemented"
      },
      {
        title: "Patient & Doctor User Journeys",
        description:
          "Dedicated role views providing distinct navigation paths for booking consultations versus managing clinical appointments.",
        status: "implemented"
      },
      {
        title: "Digital Prescription Creation & Viewing",
        description:
          "Standardized digital prescription viewer displaying medication dosages, frequency instructions, and doctor remarks.",
        status: "implemented"
      },
      {
        title: "Prescription PDF Export",
        description:
          "Browser-side PDF formatting pipeline allowing patients to download or print high-fidelity prescription documents.",
        status: "implemented"
      },
      {
        title: "Real-time Teleconsultation Room",
        description:
          "Architectural prototype for peer-to-peer encrypted video consultations and in-session notes sharing.",
        status: "prototype"
      },
      {
        title: "Automated Follow-up Reminders",
        description:
          "Scheduled notification pipeline intended for SMS and email prescription renewal and appointment reminders.",
        status: "intended"
      }
    ],
    techStack: [
      { name: "React 18", role: "Frontend UI component framework" },
      { name: "TypeScript", role: "Strict type safety for patient and medical state models" },
      { name: "Tailwind CSS", role: "High-contrast, accessible healthcare UI styling" },
      { name: "Lucide React", role: "Clean, consistent medical and UI iconography" },
      { name: "Node.js & Express", role: "Backend REST endpoints for appointment data" },
      { name: "PDF Rendering Engine", role: "Client/Server prescription document generation" }
    ],
    challengesAndLearnings: [
      {
        challenge: "Designing for High-Stress Patient Contexts",
        solution: "Simplified color palettes to calming dark navy and clean electric accents, strictly avoiding overwhelming medical jargon in primary search interfaces.",
        takeaway: "Clarity and legible hierarchy are paramount in health-tech. Every additional form input increases cognitive load for unwell visitors."
      },
      {
        challenge: "Standardizing Digital Prescription Layouts",
        solution: "Created a structured schema for dosage schedules, medication strength, and frequency to render consistent tabular views in both screen view and print format.",
        takeaway: "Decoupling medical data representation from layout rendering ensures document consistency across desktop monitors, mobile screens, and PDF prints."
      },
      {
        challenge: "Clear Role-Based Access Scoping",
        solution: "Established clear navigational boundaries so patients can easily track consultations while practitioners retain dedicated patient queues.",
        takeaway: "Multi-persona platforms require dedicated user journeys mapped before writing component code."
      }
    ],
    disclaimer:
      "Important Note: MedConnect is an engineering platform created to demonstrate technical proficiency in web applications, complex medical forms, and digital prescription workflows. It is deployed live on Vercel for evaluation.",
    ctaText: "Planning a healthcare platform or custom workflow web application? Let's discuss your project."
  },
  {
    id: "clayvista",
    slug: "clayvista",
    title: "ClayVista",
    category: "Ceramics & Tableware E-commerce",
    tagline: "An elegant, tactile online shopping experience for artisanal ceramics and tableware.",
    description:
      "ClayVista is an e-commerce project concept for presenting porcelain, ceramic crockery, tableware, and kitchen products through an elegant online shopping experience.",
    liveUrl: "https://clayvista.onrender.com/",
    workInProgress: true,
    liveStatusNotice: "Work in Progress — Live Prototype Under Active Development",
    problemStatement: [
      "Artisanal tableware and handcrafted ceramic collections often suffer from generic e-commerce templates that fail to convey material texture, dimensions, and craft.",
      "Shoppers need straightforward ways to explore collections by category (dining, serveware, drinkware) while keeping track of curated items easily.",
      "E-commerce stores often experience high abandonment rates caused by sluggish cart drawers, clunky mobile navigation, and opaque checkout summaries."
    ],
    objectives: [
      "Develop a curated product catalog with instant category filtering and responsive grid layouts.",
      "Build a stateful shopping cart drawer with real-time quantity adjustments, price calculations, and local persistence.",
      "Create a client-side wishlist system allowing users to bookmark artisanal pieces.",
      "Design a multi-step checkout interface demonstrating clean form validation and transparent order reviews."
    ],
    features: [
      {
        title: "Artisanal Product Catalogue",
        description:
          "Filterable catalog organized by tableware categories (Plates, Bowls, Cups, Serveware, Sets) with price and texture filters.",
        status: "implemented"
      },
      {
        title: "Product Detail & Specification Modal",
        description:
          "Detailed views highlighting clay type, glaze finish, dimensions, care instructions, and high-resolution imagery.",
        status: "implemented"
      },
      {
        title: "Stateful Shopping Cart Drawer",
        description:
          "Slide-over cart with instant quantity controls, item removals, dynamic subtotal calculations, and free-shipping threshold indicators.",
        status: "implemented"
      },
      {
        title: "Persistent Client Wishlist",
        description:
          "One-tap bookmarking to save favorite tableware items across sessions using browser local storage.",
        status: "implemented"
      },
      {
        title: "Streamlined Checkout Interface",
        description:
          "Accessible multi-step checkout interface demonstrating shipping collection, payment selector, and order summary breakdown.",
        status: "prototype"
      },
      {
        title: "Responsive Touch Browsing",
        description:
          "Optimized touch interactions, swipeable product cards, and responsive thumb-friendly layout across all screen sizes.",
        status: "implemented"
      }
    ],
    techStack: [
      { name: "React 18", role: "Component-driven interactive shopping interface" },
      { name: "TypeScript", role: "Type definitions for catalog products, cart items, and customer orders" },
      { name: "Tailwind CSS", role: "Custom warm dark theme with high-contrast text and subtle accents" },
      { name: "Framer Motion", role: "Smooth cart drawer slide-outs and category transition animations" },
      { name: "Local Storage API", role: "Client-side persistence for cart and wishlist state" },
      { name: "Lucide Icons", role: "Minimalist, accessible shopping and filter iconography" }
    ],
    challengesAndLearnings: [
      {
        challenge: "Balancing High-Resolution Visuals with Snappy Performance",
        solution: "Implemented disciplined responsive image sizing, modern CSS aspect-ratio placeholders, and lazy loading to prevent layout shifts during catalog browsing.",
        takeaway: "For luxury and handcrafted goods, visual fidelity is critical, but load speed directly determines whether visitors stay on the page."
      },
      {
        challenge: "Managing Synchronous Cart State Without Unnecessary Re-renders",
        solution: "Designed a lightweight React Context with custom hooks for cart operations (add, remove, quantity update, clear), keeping state updates localized and predictable.",
        takeaway: "Clean state architecture eliminates cart synchronization glitches and ensures an effortless checkout handoff."
      },
      {
        challenge: "Clear Differentiation of Working Features vs Prototype Checkout",
        solution: "Clearly annotated the final checkout steps as prototype UI to set honest expectations while demonstrating complete user flow proficiency.",
        takeaway: "Honesty in case studies builds stronger client credibility than pretending a prototype is an operational enterprise gateway."
      }
    ],
    disclaimer:
      "Important Note: ClayVista is an e-commerce application deployed live on Render to showcase custom catalog architecture, cart state management, and user experience design for boutique products.",
    ctaText: "Looking to build a custom e-commerce or product showcase website for your brand? Let's discuss your project."
  }
];
