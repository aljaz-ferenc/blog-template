import React, { useEffect, useState } from "react";
import sanityClient from "../sanityClient";
import BlogCard from "../components/BlogCard";
import { useLoaderData } from "react-router";
import { Link } from "react-router-dom";

export default function Posts() {
  const posts = useLoaderData();
console.log(posts);
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

export async function postsLoader() {
  return sanityClient.fetch(`*[_type == "post"] | order(_createdAt desc){
    title, 
    slug, 
    description, 
    mainImage{
      asset ->{
        _id, url
      },
      "name": author-> name,
      "authorImage": author->image
    },
    publishedAt
  }`);
}
