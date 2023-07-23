import React, { useEffect, useState } from "react";
import sanityClient from "../sanityClient";
import BlogCard from "../components/BlogCard";
import { useLoaderData } from "react-router";
import { Link } from "react-router-dom";
import { usePosts } from "../postsContext";

export default function Posts() {
  const posts = usePosts();

  return (
    <div className="posts">
      <Link className="home__btn" to='/'>Home</Link>
      <hr style={{margin: "2rem 0" }} />
      <h1 className="posts__heading">Blog Posts</h1>
      <div className="posts__cards">
        {posts &&
          posts.map((post) => (
            <BlogCard
              key={post.slug.current}
              slug={post.slug.current}
              title={post.title}
              description={post.description}
              image={post.mainImage.asset.url}
              date={post.publishedAt}
            />
          ))}
      </div>
    </div>
  );
}
