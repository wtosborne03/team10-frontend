import type { Route } from "./+types/about";
import Navbar from "../components/navbar";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "About - Driver Rewards" },
        { name: "description", content: "Learn more about the Driver Rewards program" },
    ];
}

export default function About() {
    return (
        <>
            <Navbar />
            <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
                <h1 className="text-4xl font-bold text-center text-blue-600 mb-4">About Driver Rewards</h1>
                <p className="text-lg text-center text-gray-700 max-w-prose">
                    The Driver Rewards program is designed to incentivize safe and efficient driving.
                    Earn points for good driving behavior and redeem them for exciting rewards.
                </p>
            </main>
        </>
    );
}
