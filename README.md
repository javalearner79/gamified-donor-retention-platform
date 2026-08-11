# Gamified Donor Retention & Smart Cooldown Re-engagement

A full-stack MERN web application designed to improve blood donor retention through donor engagement, eligibility tracking, donation history, gamification, and smart cooldown-based re-engagement.

## 🚀 Live Demo

**Frontend:**  
https://gamified-donor-retention-platform.vercel.app/

**Backend API:**  
https://gamified-donor-retention-platform-a.vercel.app/

**API Health Check:**  
https://gamified-donor-retention-platform-a.vercel.app/api/health

---

## 📌 Project Overview

Donor retention is a major challenge for blood donation organizations. Donors may become inactive after donating because they are unsure when they are eligible to donate again or simply lose engagement over time.

This project provides a centralized platform where:

- Donors can register and track their donation activity.
- Donation eligibility is calculated automatically.
- Donors can view their donation history.
- Gamification encourages continued participation.
- NGOs can monitor donor activity and engagement.
- Cooldown periods are used to determine when donors can be re-engaged.

---

## ✨ Key Features

### Donor Features
- Donor registration
- Blood group and contact information management
- Donation history
- Donation eligibility tracking
- Next eligible donation date
- Remaining cooldown period
- Donor engagement metrics
- Achievement/gamification support

### NGO Features
- NGO dashboard
- Donor overview
- Donation activity insights
- Donor retention information
- Engagement monitoring

### Backend Features
- RESTful API
- MongoDB database integration
- Donor management
- Donation management
- Dashboard APIs
- Health-check API
- Request validation
- Error handling
- Eligibility and cooldown calculations

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- React Router
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Deployment
- Vercel
- MongoDB Atlas

---

## 🔄 Application Flow

```text
User
  ↓
React Frontend
  ↓
Axios API Requests
  ↓
Express REST API
  ↓
Mongoose
  ↓
MongoDB Atlas
