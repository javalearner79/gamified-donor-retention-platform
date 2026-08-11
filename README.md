# Gamified Donor Retention & Smart Cooldown Re-engagement

A full-stack MERN web application designed to improve blood donor retention through
gamification, donation tracking, donor insights, and smart cooldown-based
re-engagement.

## Overview

Donor retention is a major challenge for blood donation organizations. Donors
may become inactive after donating because they are not eligible to donate again
immediately or simply lose engagement over time.

This platform helps NGOs and donor communities:

- Register and manage donors
- Track donation history
- Monitor donor eligibility and cooldown periods
- Provide donor engagement insights
- Encourage repeat donations through gamification
- Identify donors who are ready for re-engagement

## Key Features

### Donor Management
- Donor registration
- Donor profile management
- Blood group and contact information
- Donation history

### Smart Cooldown
- Tracks the time since the previous donation
- Identifies donor eligibility
- Prevents premature re-engagement
- Supports timely donor outreach

### Gamification
- Donation milestones
- Donor achievements
- Engagement-oriented progress tracking

### Dashboards
- Donor dashboard
- Donation history
- NGO dashboard
- Donor and donation statistics

### Backend API
- REST APIs for donors and donations
- Health-check endpoint
- MongoDB data persistence
- Request validation and error handling

## Tech Stack

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

## Project Structure

```text
gamified-donor-retention-platform/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   ├── index.html
│   └── package.json
│
├── .gitignore
├── package.json
└── README.md
