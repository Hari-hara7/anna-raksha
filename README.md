# Food Donation and Request System

![Project Image](https://via.placeholder.com/800x300)  <!-- Replace with your actual project image URL -->

## Project Overview

This is a full-stack web application built to facilitate food donation and requests. The app allows users to post food they want to donate, as well as request food. Users can sign in via Firebase Authentication, and their data is stored in Firestore. The application is designed with an easy-to-use interface, utilizing modern web technologies to provide a seamless experience.

### Features:
- **User Authentication** using Firebase Auth
- **Post a Food Request**: Users can request food with details like quantity, food type, pickup location, and instructions.
- **Post Food Donation**: Users can donate food with details like the name of the food, quantity, and pickup location.
- **Real-Time Updates**: The app uses Socket.IO to provide real-time updates for food donations and requests.
- **Dashboard**: A dedicated page for users to view their donation history and requests.
- **Profile Management**: Users can manage their profile and view their posted content.

---

## Tech Stack

The following technologies were used to build this project:

- **Frontend**:
  - **React**: For building the user interface.
  - **Vite**: A fast build tool for modern web projects.
  - **Tailwind CSS**: For utility-first CSS styling, making the UI highly customizable.
  - **TypeScript**: For type-safe development, enhancing the maintainability and scalability of the code.
  - **Socket.IO**: For real-time communication between users (for updates on donations and requests).
  - **React Router**: For managing routing in the app.

- **Backend**:
  - **Node.js**: Server-side runtime environment.
  - **Express.js**: Web framework for Node.js to handle routing and HTTP requests.
  - **Firebase**:
    - **Firebase Auth**: For handling user authentication and authorization.
    - **Firestore**: A NoSQL database for storing user data and posts.
  - **Socket.IO**: For implementing real-time bidirectional communication.

---

## Project Structure

Here's the basic structure of the project:

