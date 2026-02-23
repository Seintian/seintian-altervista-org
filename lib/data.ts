export const siteData = {
  personal: {
    name: "Christian Santarelli",
    role: "Software Engineer & Developer",
    bio: "I build scalable web applications, automated deployment pipelines, and clean digital architectures. Focused on performance and modular design.",
  },
  contacts: [
    { id: "email", label: "Email Me", url: "mailto:seintian@altervista.org", isPrimary: true },
    { id: "github", label: "GitHub", url: "https://github.com/Seintian", isPrimary: false },
    { id: "linkedin", label: "LinkedIn", url: "https://linkedin.com/in/christian-santarelli-4290ab19a/", isPrimary: false },
    { id: "cv", label: "Download CV", url: "/cv.pdf", isPrimary: false }
  ],
  // The Bento Box Navigation Modules
  modules: [
    { 
      id: "experience", 
      title: "Professional Experience", 
      description: "My career timeline, technical roles, and business impact.", 
      href: "#experience", 
      colSpan: "md:col-span-2", // Takes up 2 columns on desktop
      rowSpan: "md:row-span-1" 
    },
    { 
      id: "projects", 
      title: "Code & Projects", 
      description: "Software architecture, web apps, and repositories.", 
      href: "#projects", 
      colSpan: "md:col-span-1", 
      rowSpan: "md:row-span-2"  // Taller card
    },
    { 
      id: "tutorials", 
      title: "Tutorials & Insights", 
      description: "Python guides, CI/CD setups, and tech thoughts.", 
      href: "#tutorials", 
      colSpan: "md:col-span-1", 
      rowSpan: "md:row-span-1" 
    },
    { 
      id: "about", 
      title: "About Me", 
      description: "My philosophy, tools, and skills matrix.", 
      href: "#about", 
      colSpan: "md:col-span-1", 
      rowSpan: "md:row-span-1" 
    }
  ]
};
