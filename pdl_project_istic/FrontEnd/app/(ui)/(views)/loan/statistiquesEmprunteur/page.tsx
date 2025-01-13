"use client";

import HeaderDashboard from "../../../components/headerDashboard";
import Sidebar from "../../../components/sidebar";
import {
    HiOutlineViewGrid,
    HiOutlineHome,
    HiOutlineCube,
    HiOutlineDocument,
} from "react-icons/hi";
import PopularStatsEmprunteur from "@/app/(ui)/components/popularStatsEmprunteur";

export default function Page() {
    const sidebarLinks = [
        {
            key: 'Dashboard',
            label: 'Tableau Bord',
            path: '/dashboard/emprunteur',
            icon: <HiOutlineViewGrid />
        },
        {
            key: 'Home',
            label: 'Home',
            path: '/',
            icon: <HiOutlineHome />
        },
        {
            key: 'HistoriquePrets',
            label: 'Historique de prêts',
            path: '/loan/historiquesPrets',
            icon: <HiOutlineCube />
        },
        {
            key: 'documents',
            label: 'Documents',
            path: '/dashboard/documents/documentsEmprunteur',
            icon: <HiOutlineDocument />
        },
    ];

    const handleLogout = () => {
        // Logique de déconnexion
        console.log("Déconnexion...");
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className="w-60 min-h-screen flex-shrink-0 bg-teal-950">
                <Sidebar
                    links={sidebarLinks}
                    userName="Alexandre Tahi"
                    onLogout={handleLogout}
                />
            </div>

            {/* Conteneur principal */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <div>
                    <HeaderDashboard
                        userName="Alexandre Tahi"
                        welcomeMessage="Bonjour"
                        description="Voici les informations clés de vos emprunts ."
                    />
                </div>


                {/* Content: PopularStats */}
                <div className="flex-1 bg-green-800 overflow-hidden flex p-4">
                    <PopularStatsEmprunteur className="w-full h-full"/>
                </div>
            </div>
        </div>


    );
}
