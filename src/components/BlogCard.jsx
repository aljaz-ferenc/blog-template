import React from "react";
import { Link } from "react-router-dom";

export default function BlogCard({title, description, slug, image, date}) {

  return (
    <div className="blog-card">
      <div className="blog-card__image">
        <img src={image} alt="" />
      </div>
      <div className="blog-card__text">
        <h2>{title}</h2>
        <p>
          {description}
        </p>
        <Link className="blog-card__link" to={`${slug}`}>Read More...</Link>
      </div>
    </div>
  );
}
