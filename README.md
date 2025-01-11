# Food Donation and Request System

![Project Image](https://via.placeholder.com/800x300)  <!-- Replace with your actual project image URL -->

## Project Overview

This is a full-stack web application built to facilitate food donation and requests. The app allows users to post food they want to donate, as well as request food. Users can sign in via Firebase Authentication, and their data is stored in Firestore. The application is designed with an easy-to-use interface, utilizing modern web technologies to provide a seamless experience.

### Features:
- **User Authentication** using Firebase Auth 🛂
- **Post a Food Request** 🍽️: Users can request food with details like quantity, food type, pickup location, and instructions.
- **Post Food Donation** 🍔: Users can donate food with details like the name of the food, quantity, and pickup location.
- **Real-Time Updates** 📡: The app uses Socket.IO to provide real-time updates for food donations and requests.
- **Dashboard** 📊: A dedicated page for users to view their donation history and requests.
- **Profile Management** 👤: Users can manage their profile and view their posted content.

---

## Tech Stack 🚀

The following technologies were used to build this project:

- **Frontend**:
  - ![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black): For building the user interface.
  - ![Vite](https://img.shields.io/badge/Vite-4E8DFF?style=flat-square&logo=vite&logoColor=white): A fast build tool for modern web projects.
  - ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwind-css&logoColor=white): For utility-first CSS styling, making the UI highly customizable.
  - ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white): For type-safe development, enhancing the maintainability and scalability of the code.
  - ![Socket.IO](https://img.shields.io/badge/Socket.IO-000000?style=flat-square&logo=socket.io&logoColor=white): For real-time communication between users (for updates on donations and requests).
  - ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=react-router&logoColor=white): For managing routing in the app.

- **Backend**:
  - ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white): Server-side runtime environment.
  - ![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white): Web framework for Node.js to handle routing and HTTP requests.
  - ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black): Firebase for authentication and Firestore database.
    - ![Firebase Auth](https://img.shields.io/badge/Firebase_Auth-FFCA28?style=flat-square&logo=firebase&logoColor=black): For handling user authentication and authorization.
    - ![Firestore](https://img.shields.io/badge/Firestore-FFCA28?style=flat-square&logo=firebase&logoColor=black): A NoSQL database for storing user data and posts.
  - ![Socket.IO](https://img.shields.io/badge/Socket.IO-000000?style=flat-square&logo=socket.io&logoColor=white): For implementing real-time bidirectional communication.

---

---

## Installation 🛠️

To run this project locally, follow the steps below:

### Prerequisites 🖥️

- Node.js installed on your machine.
- Firebase account (for Firebase Authentication and Firestore setup).
- A modern browser (Chrome, Firefox, etc.).

### Steps 🔄

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/food-donation-app.git


