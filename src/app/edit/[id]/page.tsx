import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";

async function EditPage({
    params
}:{
    params:Promise<{
        id:string;
    }>;
}) {

    const {id} = await params;

    const post = await db
        .select()
        .from(posts)
        .where(eq(posts.id,Number.parseInt(id)))
        .then((res) => res[0]);

    if(!post){
        return <div>Post Not found</div>
    }

    async function updatePosts(formData:FormData) {
            "use server";
            const title = formData.get("title") as string;
            const content = formData.get("content") as string;
            console.log({title,content})
            
            await db
            .update(posts)
            .set({title,content})
            .where(eq(posts.id,post.id));
            revalidatePath("/");
            redirect("/");
        }


    return (
        <div>
            <Link href="/" className="text-blue-500">
                &larr; Back To All Posts
            </Link>
            <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
            <form action={updatePosts}>
                <div className="mb-4">
                    <label htmlFor="title" className="block mb-2">
                        Title
                    </label>
                    <input 
                        defaultValue={post.title} 
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
                        defaultValue={post.content} 
                    />
                </div>
                <button type="submit" className="bg-blue-300 text-white px-4 py-2 rounded hover:bg-blue-500">Update</button>
            </form>
        </div>
    )
}

export default EditPage