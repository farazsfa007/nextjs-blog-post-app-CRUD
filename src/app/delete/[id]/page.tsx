import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";

async function DeletePage({
    params
}:{
    params:Promise<{
        id:string;
    }>;
    }) {
        const {id} = await params;
        const post = await db.select().from(posts).where(eq(posts.id,Number.parseInt(id)))
        .then((res)=>res[0]);

        if (!post){
            return <div>Post Not Found</div>
        }

        const deletePost = async () => {
            "use server";
            await db.delete(posts).where(eq(posts.id,post.id))
            revalidatePath('/')
            redirect("/")
        }

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl border">
            <Link
                href={`/post/${post.id}`}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
                ← Back to Posts
            </Link>

            <div className="mt-6">
                <h1 className="text-3xl font-bold text-gray-900">
                Delete Post
                </h1>

                <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4">
                <p className="text-gray-700">
                    Are you sure you want to delete the post{" "}
                    <span className="font-semibold text-red-600">
                    {post.title}
                    </span>
                    ?
                </p>
                <p className="mt-2 text-sm text-gray-500">
                    This action cannot be undone.
                </p>
                </div>

                <form action={deletePost} className="mt-6 flex gap-3">
                <button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors"
                >
                    Delete Post
                </button>

                <Link
                    href={`/post/${post.id}`}
                    className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
                >
                    Cancel
                </Link>
                </form>
            </div>
        </div>
    )
}

export default DeletePage