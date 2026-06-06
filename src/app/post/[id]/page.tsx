import { db } from '@/db';
import { posts } from '@/db/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';

// Notice: Types for params must reflect that it returns a Promise
async function DetailPost({
    params,
}: {
    params: Promise<{
        id: string;
    }>;
}) {
    // 1. Await the params promise to safely extract the dynamic id
    const { id } = await params;

    // 2. Safely parse the string id into an integer for Drizzle
    const post = await db
        .select()
        .from(posts)
        .where(eq(posts.id, Number.parseInt(id)))
        .then((res) => res[0]);

    // Safety fallback: Show a message if the post id wasn't found in Neon
    if (!post) {
        return (
            <div className="p-5">
                <p className="text-red-500 font-bold">Post not found.</p>
                <Link href="/" className="text-blue-500 underline">&larr; Back to home</Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-5 max-w-2xl">
            <Link href="/" className="text-blue-500 hover:underline">
                &larr; Back To All Posts
            </Link>
            
            <article className="mt-4">
                <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
                <p className='text-gray-400 text-sm mb-4'>
                    Published on {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <p className='text-gray-700 whitespace-pre-wrap'>{post.content}</p>
            </article>

            <div className="mt-6 flex gap-4 border-t pt-4">
                <Link href={`/edit/${post.id}`} className="text-green-700 hover:underline font-medium"> 
                    Edit
                </Link>
                <Link href={`/delete/${post.id}`} className="text-red-700 hover:underline font-medium"> 
                    Delete
                </Link>
            </div>
        </div>
    );
}

export default DetailPost;