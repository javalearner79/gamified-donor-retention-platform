import React from "react";
import { Link } from 'react-router-dom';

function NotFound() {
  return <section className="page-section page-placeholder"><p className="eyebrow">404</p><h1>That page is not here.</h1><p className="lead">Let’s bring you back to the platform.</p><Link className="button button-primary" to="/">Go home</Link></section>;
}

export default NotFound;
