"use client";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult("");
    setCopied(false); // Reset copied state
    
    const res = await fetch("/api/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // Add this
      body: JSON.stringify({ url, alias }),
    });
    
    const data = await res.json();
    
    if (!res.ok) {
      setResult(data.error);
      return;
    }
    
    setResult(data.shortUrl);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2s
  };

  return (
    <main className="flex flex-col items-center p-10">
      <h1 className="text-3xl font-bold mb-4">URL Shortener</h1>
      
      <form className="flex flex-col gap-4 w-80" onSubmit={handleSubmit}>
        <input
          className="border p-2 rounded"
          placeholder="Long URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <input
          className="border p-2 rounded"
          placeholder="Alias"
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
          required
        />
        <button 
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Shorten
        </button>
      </form>
      
      {result && (
        <div className="mt-4 text-center">
          {result.startsWith("http") ? (
            <div className="flex flex-col gap-2">
              <a 
                href={result} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {result}
              </a>
              <button
                onClick={handleCopy}
                className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600"
              >
                {copied ? "Copied!" : "Copy URL"}
              </button>
            </div>
          ) : (
            <span className="text-red-500">{result}</span>
          )}
        </div>
      )}
    </main>
  );
}
