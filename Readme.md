# 🎬 Cinemaddict  [![Build status][travis-image]][travis-url]

A single-page movie tracking application built using vanilla JavaScript and following the MVP (Model–View–Presenter) architecture pattern.

This project was developed as part of the HTML Academy JS2 course and demonstrates clean separation of logic and presentation, dynamic DOM manipulation, and modular JS practices.

---

## 🔍 Features

- Component-based architecture using **MVP pattern**
- Dynamic rendering of movie cards and details
- Sorting and filtering logic for movie lists
- Manual state and DOM updates without frameworks
- Built and served using **Webpack**
- Linting with ESLint and HTML Academy standards

---

## 📦 Stack

- **JavaScript (ES6+)**
- **Webpack**
- **ESLint**
- HTML, CSS (based on provided mockups)

---

## 🚀 Getting Started

```bash
npm install
```

Run development server (for Node 17+ compatibility):
```bash
NODE_OPTIONS=--openssl-legacy-provider npm start 
```

Build the production version:
```bash
npm run build
```

## 📁 Project Structure
bash
Copy
Edit
src/
├── components/        # Reusable UI components (views)
├── controllers/       # Presenters managing logic and UI
├── models/            # Application data models
├── utils/             # Helper functions
├── main.js            # App entry point
webpack.config.js      # Webpack config
.eslintrc.yml          # ESLint configuration

## 🧠 What I Learned
Designing UI logic using MVP without libraries or frameworks

Managing application state and user interaction manually

Working with modular JavaScript, separating concerns

Setting up a full build system with Webpack

Applying linting and code quality tools in a real project

## 🛠️ Possible Improvements
Refactor repeated logic into smaller utilities

Migrate to a framework (React/Vue) for maintainability

## 📌 Status
🟢 Complete (educational project)
This project is no longer actively developed but remains a good example of structured vanilla JS architecture.
