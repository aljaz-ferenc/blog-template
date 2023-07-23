import React, { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

export default function BlogCard({title, description, slug, image, date}) {
  const location = useLocation()
  const params = useParams()

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
        <Link className="blog-card__link" to={location.pathname.startsWith('/posts') ? `/posts/${slug}` : `${slug}`}>Read More...</Link>
      </div>
    </div>
  );
}
