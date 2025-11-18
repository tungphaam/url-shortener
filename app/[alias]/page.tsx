import clientPromise from "@/lib/mongo";
import { redirect, notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ alias: string }>;
}

export default async function RedirectPage({ params }: PageProps) {
    const { alias } = await params;
    
    const client = await clientPromise;
    const db = client.db("url-shortener");
    const entry = await db.collection("urls").findOne({ alias });
    
    if (!entry) {
        notFound(); // ✅ Use notFound() instead of returning JSX
    }
    
    redirect(entry.url);
}
