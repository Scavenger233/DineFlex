# 🍽️ DineFlex – Restaurant Deals Booking Platform

**DineFlex** is a modern and elegant restaurant discovery and reservation web app built with **React**, **TypeScript**, and **Tailwind CSS**. It enables users to explore dining options across Ireland, check real-time availability, and book tables with **early bird** and **last-minute** discounts.

> 🔗 Live Demo (if applicable): [https://dineflex.ie](https://dineflex.ie)  
> 🛠 Backend: Planned with Spring Boot – see [API spec](#api-integration)

---

## ✨ Features

- 🔍 **Search & Filter Restaurants**  
  Filter by location, cuisine, or deal type (Early Bird / Last Minute).

- 🕰️ **Real-Time Availability Check**  
  View available slots by date with time-sensitive offer types.

- 📄 **Dynamic Restaurant Profiles**  
  Each venue features photos, descriptions, contact info, and booking times.

- 📅 **Integrated Booking Flow**  
  Seamless selection of date, time, and party size with a confirmation screen and booking code.

- ✅ **Responsive UI**  
  Mobile-friendly design using Tailwind CSS and reusable component architecture.

- ⚠️ **Client-Side Validation & Feedback**  
  Real-time form validation and toast feedback for better UX.

---

## 📸 Screenshots

| Home Page                                                                                | Availability & Booking                                                                      | Confirmation                                                                                |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| ![home](https://github.com/user-attachments/assets/33868920-a77d-4574-aad9-b15566b2f492) | ![booking](https://github.com/user-attachments/assets/20ee1d93-6016-4ff5-90b6-32a5364c8c12) | ![confirm](https://github.com/user-attachments/assets/72e30e97-de60-487b-ad4d-30d96320cee7) |

---

## 🧱 Tech Stack

| Layer             | Technology                          |
| ----------------- | ----------------------------------- |
| **Frontend**      | React, TypeScript, Vite             |
| **Styling**       | Tailwind CSS, ShadCN UI Components  |
| **Routing**       | React Router                        |
| **State & Hooks** | React Hooks, Custom Contexts        |
| **Form UX**       | React Calendar, Toast Notifications |
| **Build Tool**    | Vite                                |

---

## 🧩 Project Structure

```

src/
├── components/       # UI components (cards, selectors, inputs)
├── pages/            # Page-level views (Home, Detail, Booking)
├── services/         # API logic and fetch abstraction
├── hooks/            # Custom hooks (e.g., use-toast)
├── types/            # TypeScript API types
└── App.tsx           # Router and layout

```

---

## 🌐 API Integration

This frontend is built against the [DineFlex RESTful API](#), which supports:

- `GET /restaurants` – List all participating restaurants
- `GET /restaurants/:id` – Get restaurant details
- `GET /restaurants/:id/availability?date=YYYY-MM-DD` – Check available slots
- `POST /bookings` – Create a booking
- `GET /bookings/:id` – Retrieve a booking by ID

> Note: Backend is under development using **Spring Boot**.

---

## 🚀 Getting Started

### 1. Clone the project

```bash
git clone https://github.com/yourusername/dineflex.git
cd dineflex
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run locally

```bash
npm run dev
```

---

## 👨‍💻 Author

**Yiming Li**
Master's in Software Development @ University of Limerick
Frontend Engineer | Full-Stack Developer | Open to Work
[LinkedIn](https://www.linkedin.com/in/yimingli233/) | [GitHub](https://github.com/Scavenger233)

---

## 📄 License

This project is licensed under the MIT License.
Feel free to fork, contribute, and customize!
