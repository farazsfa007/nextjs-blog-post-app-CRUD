import { db } from "@/db";
import { posts } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import Link from "next/link"
function CreatePage() {
    async function createPost(formData:FormData) {
        "use server";
        const title = formData.get("title") as string;
        const content = formData.get("content") as string;
        console.log({title,content})
        
        await db.insert(posts).values({title,content})
        revalidatePath("/");
        redirect("/")
    }

    return (
        <div>
            <Link href="/" className="text-blue-500">
                &larr; Back To All Posts
            </Link>
            <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
            <form action={createPost}>
                <div className="mb-4">
                    <label htmlFor="title" className="block mb-2">
                        Title
                    </label>
                    <input 
                        type="text" 
                        required 
                        name="title"
                        id="title" 
                        className="w-full p-2 border rounded hover:border-blue-300"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="title" className="block mb-2">
                        Content
                    </label>
                    <textarea 
                        name="content" 
                        id="content" 
                        rows={5} 
                        required 
                        className="w-full border p-3 rounded" 
                    />
                </div>
                <button type="submit" className="bg-blue-300 text-white px-4 py-2 rounded hover:bg-blue-500">Submit</button>
            </form>
        </div>
    )
}

export default CreatePage