export default function NotFound() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-10">
            <h1 className="text-4xl font-bold mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-4">Alias not found</p>
            <a 
                href="/" 
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
                Create a short URL
            </a>
        </main>
    );
}
