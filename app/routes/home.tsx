import type { Route } from "./+types/home";
import Navbar from "../components/navbar";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Home - Driver Rewards" },
    { name: "description", content: "Driver Rewards Homepage" },
  ];
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-4">Welcome to Driver Rewards</h1>
        <p className="text-lg text-center text-gray-700 max-w-prose">
          Earn rewards for your safe and efficient driving.
        </p>
      </main>
    </>
  );
}
