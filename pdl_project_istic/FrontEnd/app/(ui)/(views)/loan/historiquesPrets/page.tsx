"use client";

import HeaderDashboard from "../../../components/headerDashboard";
import { useEffect, useState } from "react";
import Sidebar from "../../../components/sidebar";
import {
    HiOutlineViewGrid,
    HiOutlineHome,
    HiOutlineCube,
    HiOutlineDocument,
} from "react-icons/hi";
import RecentOrdersEmprunteur from "@/app/(ui)/components/recentOrdersEmprunteur";

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
                        userName={userInfo.username}
                        welcomeMessage="Bonjour"
                        description="Voici les informations clés de vos emprunts ."
                    />
                </div>

                {/* Content: Recent Orders */}
                <div className="flex-1 bg-gray-950 pt-4 overflow-auto border-rounded-3">
                    <div className="pt-2 pl-1 pr-4 "> {/* Réduction du padding ici */}
                        <RecentOrdersEmprunteur showSearch={false} />
                    </div>
                </div>
            </div>
        </div>
    );
}
