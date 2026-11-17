<div align="center">
  <h1>🚗 AutoAdmin Dashboard</h1>
  <p>A modern, server-rendered car management system built with Express.js and Handlebars.</p>

  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/Handlebars.js-f0772b?style=for-the-badge&logo=handlebarsdotjs&logoColor=white" alt="Handlebars" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
</div>

<br />

## 🌟 Key Features

*   **Full CRUD Operations**: Create, Read, Update, and Delete vehicle records seamlessly.
*   **Server-Side Rendering (SSR)**: Dynamic HTML generation using Handlebars engine for fast load times and SEO optimization.
*   **Modern Glassmorphism UI**: Clean, light-themed interface with frosted glass effects, smooth transitions, and responsive data tables.
*   **Embedded NoSQL Database**: Utilizes NeDB for lightweight, local document storage without external dependencies.
*   **RESTful Architecture**: Strict adherence to HTTP methods (POST for mutations, GET for views) ensuring safe state management.

## 🛠 Tech Stack

*   **Backend Runtime**: Node.js
*   **Framework**: Express.js
*   **View Engine**: Handlebars (`express-handlebars`)
*   **Database**: NeDB (Persistent local datastore)
*   **Styling**: Vanilla CSS3 (Flexbox, CSS Variables, Backdrop-filter)

## 📂 Project Structure

```text
├── database/
│   └── database.db         # Auto-generated NeDB data store
├── style/
│   └── style.css           # Global UI styles & glassmorphism theme
├── views/
│   ├── layouts/
│   │   └── main.hbs        # Main HTML wrapper & navigation
│   ├── add.hbs             # Form to add new vehicles
│   ├── delete.hbs          # Bulk and single deletion interface
│   ├── edit.hbs            # Inline editing view
│   └── list.hbs            # Main data table view
├── server.js               # Express application entry point
└── package.json            # Project metadata & dependencies
