import React from 'react';
import { Link } from 'react-router-dom';


function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">Donor relationships, made lasting</p>
          <h1>Every donation can begin a stronger connection.</h1>
          <p className="lead">Kindred helps nonprofit teams recognize momentum, respect donor cooldowns, and reconnect at the moment care can make the greatest difference.</p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/register">Register a donor</Link>
            <Link className="button button-secondary" to="/donor-dashboard">Explore dashboard</Link>
          </div>
        </div>
        <div className="impact-panel" aria-label="Platform focus areas">
          <span className="panel-label">The retention loop</span>
          <strong>Recognize</strong><span>Thoughtful milestones that make generosity visible.</span>
          <strong>Respect</strong><span>Cooldown-aware outreach that gives donors room.</span>
          <strong>Reconnect</strong><span>Timely, relevant invitations to return.</span>
        </div>
      </section>
      <section className="principles" aria-label="Platform principles">
        <article><h2>Human timing</h2><p>Engagement is paced around people, not pressure.</p></article>
        <article><h2>Clear progress</h2><p>Donors and teams share a simple view of impact.</p></article>
        <article><h2>Built for trust</h2><p>Every touchpoint is designed to earn the next one.</p></article>
      </section>
    </>
  );
}

export default Home;
