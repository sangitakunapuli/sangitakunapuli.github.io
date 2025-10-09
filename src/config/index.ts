import type { SiteConfig, SiteContent } from "../types";

export const SITE_CONFIG: SiteConfig = {
  title: "Sangita Kunapuli — Fullstack Software Developer",
  author: "Sangita Kunapuli",
  description:
    "Recent Computer Science Master’s graduate from UCSB, based in the Bay Area, California. I am passionate about designing intuitive user interfaces, web application development, and writing quality code with impact.",
  lang: "en",
  siteLogo: "/sangita-small.png",
  navLinks: [
    { text: "Experience", href: "#experience" },
    { text: "Projects", href: "#projects" },
    { text: "About", href: "#about" },
  ],
  socialLinks: [
    // { text: "Twitter", href: "https://github.com/immois/astro-zen" },
    { text: "Linkedin", href: "https://www.linkedin.com/in/sangita-kunapuli" },
    { text: "Github", href: "https://github.com/sangitakunapuli" },
    // { text: "Youtube", href: "https://github.com/immois/astro-zen" },
    // { text: "Dribbble", href: "https://github.com/immois/astro-zen" },
  ],
  socialImage: "/zen-og.png",
  canonicalURL: "https://astro-zen.vercel.app",
};

export const SITE_CONTENT: SiteContent = {
  hero: {
    name: "Sangita Kunapuli",
    specialty: "Fullstack Software Developer",
    summary:
      "Recent Computer Science Master’s graduate from UCSB, based in the Bay Area. I am passionate about designing intuitive user experiences and writing quality code with impact.",
    email: "sangita.kunapuli@gmail.com",
  },
  experience: [
    {
      company: "UC Santa Barbara",
      position: "Teaching Assistant",
      startDate: "Sept 2023",
      endDate: "Jun 2025",
      summary: [
        "Lead course 3x/week for software engineering legacy project class of 96 students and mentor student teams on large scale legacy applications in Java/Spring Boot + React, over 6 quarters of the course.",
        "Address debugging queries, grade programming assignments, and conduct code reviews of novel feature implementations to support students’ understanding of software development and Git.",
      ],
    },
    {
      company: "UC Santa Barbara",
      position: "Software Engineering Researcher",
      startDate: "Jan 2025",
      endDate: "Mar 2025",
      summary: [
        "Analyze Git commit data across course iterations with Python to understand and improve student usage of Agile methodologies, doubling productivity and influencing software best practices in project codebases.",
        "Maintain 4 Java/Spring Boot + React repositories with Github Actions, software design documentation, backlogs, and code reviews, reinforcing collaboration and code quality in legacy applications.",
      ],
    },
    {
      company: "Dropbox",
      position: "Software Engineering Intern",
      startDate: "Jun 2023",
      endDate: "Sept 2023",
      summary: [
        "Build and optimize full-stack File Requests feature using Python + React/Typescript, enabling scalable, cross platform file upload with email attachments.",
        "Improve collaboration workflows for 5+ enterprise teams and thousands of users, shipping and strengthening production infrastructure and responding to user needs ",
      ]
    },
    {
      company: "UC Santa Barbara",
      position: "Software Engineering Intern",
      startDate: "Jun 2022",
      endDate: "Aug 2022",
      summary: [
        "Develop REST API services powering full-stack React web application used by 150+ students, simulating limitations on environmental resources in the real world",
        "Integrate automated testing and CI/CD pipelines within 3 repositories, ensuring 100% test coverage and accelerating developer iteration cycles"
      ]
    },
  ],
  projects: [
    {
      name: "Object Recall in Augmented Reality",
      summary: "AR immersive office environment with Magic Leap 2 and HCI user study.",
      linkPreview: "https://drive.google.com/file/d/1qwpZ-z9rEcfSOM2G_ys58X_cIebZGzy8/view?usp=sharing",
      linkSource: "https://docs.google.com/presentation/d/1B73JFsf327HzVg8z8oTNjK_hPh6CZ30vhWkEZlTZoP0/edit?usp=sharing",
      image: "/ar2.png",
      tags: ["Unity", "C#", "R", "Research"]
    },
    {
      name: "Spatially AwARe",
      summary: "Mobile AR navigation app to improve spatial awareness through gamified interface.",
      linkPreview: "https://drive.google.com/file/d/1ylTdzUv62f8m_ZzC89Sn-OuPXL3AIh30/view?usp=sharing",
      linkSource: "https://github.com/sangitakunapuli/spatially-AwaRe",
      image: "/maps.png",
      tags: ["React Native", "Xcode", "ARKit"]
    },
    {
      name: "Chess AI Mate",
      summary: "Figma high fidelity design of explainable AI tool to learn chess.",
      linkPreview: "https://www.figma.com/proto/n1GVOzkXtv2iV8L56KLoGv/chess-interface?node-id=0-1&t=2SIECbkvKlt2DRFD-1",
      linkSource: "https://drive.google.com/file/d/1xzOGJ6CjSwZSIfwVpr04w0T9-wescvS1/view?usp=sharing",
      image: "/chess.png",
      tags: ["Figma", "UI/UX", "AI"]
    },
    {
      name: "ChatGPT as a Code Repair Tool",
      summary: "Quantitative experiment with prompt engineering on GPT model to determine code-repair ability.",
      linkPreview: "https://drive.google.com/file/d/15Ry-5Umb5gq0kb2YdpH3HGYLcSmxsziC/view?usp=sharing",
      linkSource: "https://github.com/ameymwalimbe/cs272-APR",
      image: "/code.png",
      tags: ["Python", "AI", "C++", "Research"]
    },
    {
      name: "Gaucho Grub",
      summary: "UI/UX design of mobile app to interact with UCSB dining hall info.",
      linkPreview: "https://www.figma.com/proto/OB7QuJL8qnJUvQpn2eDbSa/Team-21---Pixel-Pioneers?node-id=0-1&t=cdTiC7tCgWZwOGms-1",
      linkSource: "https://drive.google.com/file/d/19jRyI1B1vUF_USt7Dt-7IDM7QjSdO6gZ/view?usp=sharing",
      image: "/dining.png",
      tags: ["Figma", "UI/UX", "Mobile"]
    },
    {
      name: "Fridge Master",
      summary: "Mobile app developed with Flutter to track groceries and suggest recipes.",
      linkPreview: "https://drive.google.com/file/d/1bLL_aGjefe5MkkaYNFMjcmwD38M0_bDs/view?usp=sharing",
      // linkSource: "https://github.com/ucsb-cs184-f23/pj-flutter-03",
      image: "/fridge.png",
      tags: ["Flutter", "UI/UX", "Mobile"]
    },
    {
      name: "Where's the Bear?",
      summary: "Machine learning classification project to build cloud computing filtration pipeline for camera traps & scientists.",
      linkPreview: "https://drive.google.com/file/d/1KyYiaW_nu47r1A-fL41Spc-N4OlgkTix/view?usp=sharing",
      linkSource: "https://drive.google.com/file/d/1KyYiaW_nu47r1A-fL41Spc-N4OlgkTix/view?usp=sharing",
      image: "/camera.png",
      tags: ["Python", "Tensorflow", "PostgreSQL"]
    },
  ],
  about: {
    description: `
    Hi there, I’m Sangita! I just completed my Master's in Computer Science at the University of California, Santa Barbara. I am an aspiring software engineer with a passion for building web applications and designing intuitive user experiences.

    With experience in developing for applications of AR and industry/research experience in software engineering, I always enjoy tackling complex problems to improve user experiences and leverage human-AI interaction.
    
    When I’m not coding or designing, you can find me at the gym, trying out a new recipe I found on Instagram, or bullet journaling!
    `,
    image: "/sangita-big.png",
  },
};

// #5755ff
