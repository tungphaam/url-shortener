import clientPromise from "@/lib/mongo";
import { NextResponse } from "next/server";

function isValidURL(url: string) {
    try {
        const parsed = new URL(url);
        // only allow http and https protocols
        return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
        return false;
    }
}

export async function POST(req: Request) {
    const { url, alias } = await req.json();

    // empty alias check
    if (!alias || alias.trim === "") {
        return NextResponse.json({ error: "Alias cannot be empty" }, { status: 400 });
    }

    if (!isValidURL(url)) {
        return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("url-shortener");

    // duplicate check
    const exists = await db.collection("urls").findOne({ alias });
    if (exists) {
        return NextResponse.json({ error: "Alias already taken" }, { status: 400 });
    }

    await db.collection("urls").insertOne({ alias, url });

    // dynamically get the base URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ||
                    req.headers.get('origin') ||
                    'http://localhost:3000';

    return NextResponse.json({
        success: true,
        shortUrl: `${baseUrl}/${alias}`,
    });
}
