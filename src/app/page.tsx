import { db } from "@/db";
import { posts } from "@/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";

export default async function Home() {
  const allPost = await db.select().from(posts).orderBy(desc(posts.createdAt))

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">My Blog</h1>
      <Link
        href="/create"
        className="bg-blue-500 text-white px-4 py-2 mb-4 rounded inline-block"
      >
        Create New Post
      </Link>
      <div className="space-y-4">
        {allPost.map((post)=>(
          <div className="border p-4 rounded" key={post.id}>
            <Link href={`/post/${post.id}`}>
              <h2 className="text-xl font-semibold hover:text-blue-400">
                {post.title}
              </h2>
            </Link>
            <p className="text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
            <p className="mt-2">{post.content.substring(0,80)}...</p>

            <div className="mt-2">
              <Link href={`/post/${post.id}`} className="text-blue-700 mr-3"> 
                Read More
              </Link>
              <Link href={`/edit/${post.id}`} className="text-green-700 mr-3"> 
                Edit
              </Link>
              <Link href={`/delete/${post.id}`} className="text-red-700 mr-3"> 
                Delete
              </Link>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
