"use client";

import HeaderDashboard from "../../../components/headerDashboard";
import Sidebar from "../../../components/sidebar";
import { HiOutlineViewGrid, HiOutlineHome} from "react-icons/hi";
import RecentAdmin from "@/app/(ui)/components/RecentAdmin";
import {TbReceiptEuro} from "react-icons/tb";
import {dm_sans} from "@/app/fonts";
import {ReactNode, useEffect, useState} from "react";


export default function Page() {

        const [isLoading, setIsLoading] = useState(true); // État de chargement
        const [userInfo, setUserInfo] = useState(null);
    
        useEffect(() => {
            const storedUserInfo = localStorage.getItem("userInfo");
            if (storedUserInfo) {
                setUserInfo(JSON.parse(storedUserInfo)); // Parse les infos de l'utilisateur
            }
            setIsLoading(false); // Arrête l'état de chargement
        }, []);

    const sidebarLinks = [
        {
            key: "Dashboard",
            label: "Tableau de bord",
            path: "/dashboard/administrateur",
            icon: <HiOutlineViewGrid />,
        },
        {
            key: "Home",
            label: "Accueil",
            path: "/",
            icon: <HiOutlineHome />,
        },

    ];

    const handleLogout = () => {
        // Logique de déconnexion
        localStorage.removeItem("userInfo"); // Supprime les informations utilisateur
        //localStorage.removeItem("authToken"); // Supprime le token d'authentification
        window.location.href = "/auth/login"; // Redirige vers la page de connexion
    };

    if (isLoading) {
        return <div>Chargement...</div>; // Affiche un état de chargement
    }

    if (!userInfo) {
        return <div>Erreur : Informations utilisateur introuvables.</div>; // Gère l'absence d'utilisateur
    }

    return (
        <div className="flex h-full">
            {/* Sidebar avec interactivité (Client Component) */}
            <div className="w-60 bg-teal-950">
                <Sidebar
                    links={sidebarLinks}
                    userName="Alexandre Tahi"
                    onLogout={handleLogout} // Passer le gestionnaire de déconnexion
                />
            </div>

            {/* Contenu principal */}
            <div className=" flex flex-col gap-6 w-full bg-gray-950">
                {/* Header */}
                    <HeaderDashboard
                        userName={userInfo.username}
                        welcomeMessage="Bonjour"
                        description="Voici toutes les demandes effectuées."
                    />

                {/* Contenu */}
                <div className="flex flex-col gap-4 p-4 ">
                        <div className="flex gap-16 ">
                            {/* Total investissement */}
                            <div className="flex gap-4 bg-teal-950 items-center p-6 rounded-2xl ">
                                <div className="rounded-full h-10 w-10 flex items-center justify-center bg-green-800">
                                    <TbReceiptEuro className="text-2xl text-white"/>
                                </div>
                                <div className="flex flex-col gap-1">

                                    <span className={`${dm_sans.className} text-base italic text-gray-200 `}>Total investissement</span>
                                    <div className="items-center bg-teal-950">
                                        <strong className="text-lg text-gray-100 align-middle font-semibold">0£</strong>
                                    </div>
                                </div>
                            </div>
                            {/* Total prêts */}
                            <div className="flex gap-4 bg-teal-950 items-center py-6 px-14 rounded-2xl ">
                                <div className="rounded-full h-10 w-10 flex items-center justify-center bg-green-800">
                                    <TbReceiptEuro className="text-2xl text-white"/>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className={`${dm_sans.className} text-base italic text-gray-200 `}>Total prêts </span>
                                        <strong className="text-lg items-center text-gray-100 align-middle font-semibold">0£</strong>
                                </div>
                            </div>

                        </div>

                    <div className="flex flex-row gap-4 w-full mb-4">
                        <RecentAdmin limit={5} showSearch={true}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
