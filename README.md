# 🩸 RedUnity — Blood Donation & Management System

**Live Site:** [red-unity-a9d52.web.app](https://red-unity-a9d52.web.app/)

## 📌 Project Descriptions

RedUnity is a full-stack MERN application designed to bridge the gap between blood donors and those in urgent need. It provides a seamless platform for managing donation requests, tracking donor status, and facilitating community-driven life-saving efforts. The app features a robust role-based dashboard for Admins, Volunteers, and Donors, ensuring organized management of all activities.

## 🚀 Features

- 🔐 **Role-Based Authentication** — Secure login/registration via Firebase with three distinct roles: Donor, Volunteer, and Admin.
- 🩸 **Donation Request System** — Logged-in users can create, edit, and delete blood donation requests.
- 🔍 **Advanced Donor Search** — Public search page to find donors based on blood group, district, and upazila.
- 📊 **Interactive Dashboards** — Personalized dashboards for all roles:
  - **Admin:** Complete control over users (block/unblock/promote) and all donation requests.
  - **Volunteer:** Manage donation requests and update statuses.
  - **Donor:** Track personal donation history and manage self-created requests.
- 📱 **Responsive Design** — Fully optimized for Mobile, Tablet, and Desktop using Tailwind CSS.
- 🛠 **Profile Management** — Users can update their personal information, blood group, and location details.
- ✅ **Real-time Status Updates** — Manage donation lifecycles (Pending -> In-progress -> Done/Canceled).
- ✨ **Modern UI/UX** — Clean alignment, pleasing color contrast, and smooth animations using AOS/SweetAlert.

## 🧠 Technologies Used

| Technology               | Purpose                                               |
| :----------------------- | :---------------------------------------------------- |
| **Vite + React**         | Fast frontend development and UI rendering            |
| **Node.js & Express.js** | Backend environment and RESTful API creation          |
| **MongoDB Atlas**        | Cloud Database for storing users and donation records |
| **Firebase Auth**        | Secure authentication (Email/Password)                |
| **Tailwind CSS**         | Utility-first styling for modern UI                   |
| **React Router v7**      | Advanced client-side routing and private routes       |
| **TanStack Query**       | Efficient data fetching and state synchronization     |
| **Axios**                | Handling API requests to the server                   |
| **SweetAlert2**          | Interactive and user-friendly notifications           |

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   https://github.com/itsfaisalhossen/redunity-frontend.git
   ```
1. **Navigate to the project folder**

   ```bash
   cd redunity-frontend
   ```

1. **Install dependencies**
   ```bash
   npm install
   ```
1. **Start the development server**
   ```bash
   npm run dev
   ```
