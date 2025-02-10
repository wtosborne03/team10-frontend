import type { Route } from "./+types/about";
import Navbar from "../components/navbar";
import { data } from "react-router";
import { useState, useEffect } from 'react';
export function meta({ }: Route.MetaArgs) {
    return [
        { title: "About - Driver Rewards" },
        { name: "description", content: "Learn more about the Driver Rewards program" },
    ];
}

const API_URL= 'http://localhost:3001/api';

const fetchAboutInfo = async () => {
    const response = await fetch(`${API_URL}/about`);
    const data = await response.json();
    return data;
};

export default function About() {
    const [aboutInfo, setAboutInfo] = useState(null); 
    const [loading, setLoading] = useState(true); 
    useEffect(() => {
        const getData = async () => {
            const data = await fetchAboutInfo();
            setAboutInfo(data[0]);  
            setLoading(false);  
        };

        getData();
    }, []); 

    if (loading) {
        return <p>...</p>;
    }

    return (
        <>
            <Navbar />
            <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
                <h1 className="text-4xl font-bold text-center text-blue-600 mb-4">About Driver Rewards</h1>
                <p className="text-lg text-center text-gray-700 max-w-prose">
                    Team Number : {aboutInfo.teamNumber || 'NA'} <br />
                    Team Name :   {aboutInfo.teamName} <br />
                    Chosen Technology:  {aboutInfo.chosenTech} <br />
                    Sprint Number: {aboutInfo.sprintNumber}


                </p>
            </main>
        </>
    );
}

