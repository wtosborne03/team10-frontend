import Navbar from "../components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-4">Welcome to Driver Rewards</h1>
        <p className="text-lg text-center text-gray-700 max-w-prose mb-8">
          Earn rewards for your safe and efficient driving.
        </p>
        <a href="/users" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          View Users
        </a>
      </main>
    </>
  );
}