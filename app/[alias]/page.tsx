import clientPromise from "@/lib/mongo";
import { redirect } from "next/navigation";

export default async function RedirectPage({ 
    params 
}: { 
    params: Promise<{ alias: string }> 
}) {
    const { alias } = await params;  // ✅ await params first
    
    const client = await clientPromise;
    const db = client.db("url-shortener");

    const entry = await db.collection("urls").findOne({ alias });

    if (!entry) {
        return <h1>Alias not found</h1>;
    }

    redirect(entry.url);
}
