// Local fallback data — same shape as GET /api/profile.
// Used automatically if the backend is not running.
const profile = {
  "name": "Prithviraj Singh Chouhan",
  "title": "Python Backend Developer",
  "email": "prithvirajchouhan2003@gmail.com",
  "phone": "+91-6267174657",
  "links": {
    "linkedin": "#",
    "github": "https://github.com/Singh-prithviraj"
  },
  "summary": "Results-oriented MCA postgraduate with hands-on experience in Python, Django, REST APIs, and database-driven applications through academic and personal projects. Strong foundation in OOP, DBMS, and backend development, with proven ability to build scalable web and automation solutions. Adept at problem-solving, process optimization, and delivering clean, maintainable code in collaborative environments.",
  "skills": {
    "Programming Languages": [
      "Python",
      "SQL",
      "C++",
      "JavaScript"
    ],
    "Backend Technologies": [
      "Django",
      "Django REST Framework (DRF)"
    ],
    "Frontend": [
      "HTML5",
      "CSS3",
      "Bootstrap",
      "Jinja2"
    ],
    "Databases": [
      "MySQL",
      "SQLite",
      "PostgreSQL"
    ],
    "Development Tools": [
      "VS Code",
      "Git",
      "GitHub",
      "Docker",
      "Postman",
      "Render"
    ],
    "Core Competencies": [
      "REST API Development",
      "Authentication & Authorization",
      "Django ORM",
      "API Testing",
      "Database Design"
    ],
    "CS Fundamentals": [
      "Object-Oriented Programming",
      "Operating Systems",
      "DBMS",
      "Data Structures"
    ]
  },
  "experience": [
    {
      "role": "Python/Odoo Developer Intern",
      "company": "Mindphin Technologies, Gandhinagar",
      "period": "July 2026 \u2013 Present",
      "points": [
        "Developed and customized business modules using Python and Odoo.",
        "Worked with Odoo ORM, PostgreSQL, XML views, models, and access rights.",
        "Implemented business logic using computed fields, onchange methods, and model inheritance.",
        "Debugged and resolved issues while working on Odoo modules and functionality."
      ]
    }
  ],
  "projects": [
    {
      "name": "BikeBuddy \u2014 Electric Vehicle Management System",
      "stack": "Python, Django, Bootstrap, Authentication, ORM, SQLite",
      "link": "https://github.com/Singh-prithviraj/EVShowroom",
      "points": [
        "Developed a Django-based web application for managing EV listings, test rides, and customer bookings.",
        "Implemented user authentication with Google OAuth2 and integrated email notifications for real-time updates.",
        "Built a responsive, user-friendly interface with HTML, CSS, and Bootstrap, following Django's MVT architecture."
      ]
    },
    {
      "name": "Tweet-X \u2014 Mini Social Media Platform",
      "stack": "Django, SQLite/PostgreSQL, Bootstrap, Jinja2, Cloudinary",
      "link": "https://github.com/Singh-prithviraj/django-tweet",
      "points": [
        "Built a social media web application with user authentication and role-based access control.",
        "Implemented full CRUD functionality for tweet creation, editing, deletion, and listing.",
        "Developed likes, comments, and search using Django ORM queries.",
        "Integrated Cloudinary for cloud-based image storage and media management."
      ]
    },
    {
      "name": "Custom HTTP Server Module",
      "stack": "Python, Sockets, HTML, HTTP",
      "link": "https://github.com/Singh-prithviraj/HTTP-Server",
      "points": [
        "Built a lightweight HTTP server from scratch using Python sockets, supporting GET and POST requests.",
        "Implemented dynamic routing, custom 404 error handling, and secure backend request processing.",
        "Implemented HTTP request parsing, routing, and socket-based client-server communication."
      ]
    }
  ],
  "education": [
    {
      "degree": "Master of Computer Applications (MCA)",
      "school": "Institute of Computer Science, Vikram University, Ujjain",
      "period": "2024 \u2013 2026",
      "detail": "CGPA: 8.2 / 10",
      "coursework": "Artificial Intelligence, Software Project Management"
    },
    {
      "degree": "B.Sc. (Hons.) in Computer Science",
      "school": "Institute of Computer Science, Vikram University, Ujjain",
      "period": "2021 \u2013 2024",
      "detail": "CGPA: 7.48 / 10",
      "coursework": "Database Management Systems, Operating Systems, Data Structures"
    }
  ],
  "certifications": [
    {
      "name": "Complete 2025 Python Bootcamp",
      "issuer": "Udemy"
    },
    {
      "name": "Django Skill Up",
      "issuer": "GeeksforGeeks",
      "year": "2026"
    }
  ]
};

export default profile;
