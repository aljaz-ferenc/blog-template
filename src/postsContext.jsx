import { createContext, useContext, useEffect, useState } from "react"
import sanityClient from "./sanityClient"

const PostsContext = createContext()

export default function PostsProvider({children}) {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        async function getPosts(){
            const data = await sanityClient.fetch(`*[_type == "post"] | order(_createdAt desc){
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
            return data
        }

        getPosts().then(posts => {
            setPosts(posts)
        })
    }, [])

  return (
    <PostsContext.Provider value={posts}>
        {children}
    </PostsContext.Provider>
  )
}

export const usePosts = () => {
    const context = useContext(PostsContext)
    return context
}
