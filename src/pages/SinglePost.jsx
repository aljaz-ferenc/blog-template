import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigation, useParams } from "react-router";
import sanityClient from "../sanityClient";
import SanityBlockContent from "@sanity/block-content-to-react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Link } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import BlogCard from "../components/BlogCard";
import { usePosts } from "../postsContext";

const dateFormatter = Intl.DateTimeFormat("en-GB", { dateStyle: "full" });

export default function SinglePost() {
  const postData = useLoaderData()[0]
  const posts = usePosts();
  const [iframe, setIframe] = useState(null)
  
  useEffect(() => {
    postData.body.forEach(obj => {
      if(obj._type === 'iframe'){
        console.log(obj)
        setIframe(obj.iframe)
      }
    })
  }, [])

  const serializers = {
    types: {
      code: (props) => (
        <div className="my-2">
          <SyntaxHighlighter language="javascript" style={a11yDark}>
            {props.node.code}
          </SyntaxHighlighter>
        </div>
      ),
    },
  };

  return (
    <div className="post">
      <ProgressBar />
      <Link className="home__btn" to="/" style={{ marginRight: "1rem" }}>
        Home
      </Link>
      <Link className="home__btn" to="/posts">
        All posts
      </Link>
      <hr style={{ margin: "2rem 0" }} />
      
        <div className="post__content">
          <p className="post__author">
            Written by: {postData.author} on{" "}
            {dateFormatter.format(new Date(postData.publishedAt))}
          </p>
          <h1>{postData.title}</h1>
          <div>
            <SanityBlockContent
              serializers={serializers}
              blocks={postData.body}
              projectId="08u4o3l9"
              dataset="production"
            ></SanityBlockContent>
          </div>
          {iframe && <iframe src={iframe} frameborder="0" width="100%" height='800'></iframe>}
        </div>
      
      {/* <div className="post__footer">
      <hr />
        <h3>See other posts</h3>
        {posts.length > 0 && <div className="post__footer--posts">
          <BlogCard
            key={posts[0].slug.current}
            slug={posts[0].slug.current}
            title={posts[0].title}
            description={posts[0].description}
            image={posts[0].mainImage.asset.url}
            date={posts[0].publishedAt}
          />
          <BlogCard
            key={posts[1].slug.current}
            slug={posts[1].slug.current}
            title={posts[1].title}
            description={posts[1].description}
            image={posts[1].mainImage.asset.url}
            date={posts[1].publishedAt}
          />
        </div>}
      </div> */}
    </div>
  );
}

export async function loader({params}) {
  const post = await sanityClient.fetch(
    `*[slug.current == "${params.post}"]{
  title,
  _id,
  body,
  publishedAt,
  "author": author -> name
}`
  );
  window.scrollTo({ top: 0 });
  return post
}
