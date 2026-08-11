import React from "react";
import { cloneElement } from 'react';

function FormField({ id, label, error, hint, children }) {
  const descriptionId = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      {cloneElement(children, { 'aria-describedby': descriptionId })}
      {hint && !error && <p id={`${id}-hint`} className="field-hint">{hint}</p>}
      {error && <p id={`${id}-error`} className="field-error" role="alert">{error}</p>}
    </div>
  );
}

export default FormField;
