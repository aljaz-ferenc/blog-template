import React, { useEffect, useState } from 'react'
import { useLoaderData, useParams } from 'react-router'
import sanityClient from '../sanityClient'
import SanityBlockContent from '@sanity/block-content-to-react'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Link } from 'react-router-dom';

const dateFormatter = Intl.DateTimeFormat('en-GB', { dateStyle: 'full'})

export default function SinglePost() {
  const {post} = useParams()
  const [postData, setPostData] = useState(null)

  const serializers = {
    types: {
        code: (props) => (
            <div className='my-2'>
                <SyntaxHighlighter language="javascript" style={a11yDark}>
                    {props.node.code}
                </SyntaxHighlighter>
            </div>
        ),
    },
}

useEffect(() => {
  sanityClient.fetch(`*[slug.current == "${post}"]{
    title,
    _id,
    body,
    publishedAt,
    "author": author -> name
  }`)
  .then(data => setPostData(data[0]))
}, [])

  return (
    <div className='post'>
      <Link className="home__btn" to='/' style={{marginRight: "1rem"}}>Home</Link>
      <Link className="home__btn" to='/posts'>All posts</Link>
      <hr style={{margin: "2rem 0" }} />
      {postData && 
      <div className="post__content">
          <p className='post__author'>Written by: {postData.author} on {dateFormatter.format(new Date(postData.publishedAt))}</p>
      <h1>{postData.title}</h1>
        <div>
          <SanityBlockContent serializers={serializers} blocks={postData.body} projectId="08u4o3l9" dataset="production"></SanityBlockContent>
        </div>
      </div>}
    </div>
  )
}



