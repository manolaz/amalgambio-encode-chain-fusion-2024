import React, { useState } from 'react';
import { ethers } from 'ethers';

// Replace with your actual contract address and ABI
const CONTRACT_ADDRESS = "0xYourParticleNetworkAddress"; // Contract address on Particle Network
const CONTRACT_ABI = [/* Your AppointmentContract ABI */];

interface AppointmentData {
    patient: string;
    doctor: string;
    appointmentTime: number; // Timestamp (e.g., in seconds since epoch) 
    isCompleted: boolean;
}

const Home = () => {
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [appointmentTime, setAppointmentTime] = useState(new Date().getTime() / 1000); // Current timestamp in seconds
    const [appointments, setAppointments] = useState<AppointmentData[]>([]);

    // Initialize Particle Network provider and contract instance
    const provider = new ethers.providers.StaticJsonProvider('https://rpc.particle.network/');
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

    const handleDoctorSelect = (doctor: string) => {
        setSelectedDoctor(doctor);
    };

    const handleSubmit = async () => {
        try {
            // Get the connected account (using Particle's SDK for this step)
            const signer = await provider.getSigner();
            const transactionResponse = await contract.connect(signer).bookAppointment(selectedDoctor, appointmentTime); // Use your actual doctor address

            console.log('Transaction hash:', transactionResponse.hash);
            // Handle successful booking
        } catch (error) {
            console.error("Error booking appointment:", error);
        }
    };

    const fetchAppointments = async () => {
        try {
            const allAppointments = await contract.getAppointments(); // Replace with your getAppointment function from the smart contract ABI

            const parsedAppointments: AppointmentData[] = [];
            for (const appointment of allAppointments) {
                parsedAppointments.push({
                    patient: appointment.patient,
                    doctor: appointment.doctor,
                    appointmentTime: appointment.appointmentTime.toString(), // Convert to readable format
                    isCompleted: appointment.isCompleted
                });
            }

            setAppointments(parsedAppointments);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    // ... other logic for displaying doctor list, form inputs, etc.



    return (
        <div>
            {/* Display doctor list */}
            {/* Appointment form to set time */}
            <button onClick={handleSubmit}>Book Appointment</button>
            {/* Display fetched appointments */}
        </div>
    );
};

export default Home;

