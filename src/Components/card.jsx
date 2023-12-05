import React from 'react';
import { Link } from 'react-router-dom';

export function Card(props) {
  return (
    <div className="card mb-3" key={props.key}>
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        {props.subtitle && (
          <h6 className="card-subtitle mb-2 text-muted">{props.subtitle}</h6>
        )}
        <p className="card-text">{props.text}</p>
        <Link to={props.link}>{props.linkText}</Link>
      </div>
    </div>
  );
}
