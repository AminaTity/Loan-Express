"use client";

import HeaderDashboard from "../../../components/headerDashboard";
import Sidebar from "../../../components/sidebar";
import RecentOrders from "../../../components/recentOrders";
import { HiOutlineViewGrid, HiOutlineHome, HiOutlineCube, HiOutlineDocument } from "react-icons/hi";
import { useEffect, useState } from "react";

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
            path: "/dashboard/investisseurs",
            icon: <HiOutlineViewGrid />,
        },
        {
            key: "Home",
            label: "Accueil",
            path: "/",
            icon: <HiOutlineHome />,
        },
        {
            key: "Investissements",
            label: "Mes Investissements",
            path: "/loan/investissements",
            icon: <HiOutlineCube />,
        },
        {
            key: "Documents",
            label: "Documents",
            path: "/dashboard/documents/documentsInvestisseur",
            icon: <HiOutlineDocument />,
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
        <div className="flex h-screen">
            {/* Sidebar avec interactivité (Client Component) */}
            <div className="w-60 bg-teal-950">
                <Sidebar
                    links={sidebarLinks}
                    userName="Alexandre Tahi"
                    onLogout={handleLogout} // Passer le gestionnaire de déconnexion
                />
            </div>

            {/* Contenu principal */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="bg-gray-950">
                    <HeaderDashboard
                        userName={userInfo.username}
                        welcomeMessage="Bonjour"
                        description="Voici les informations clés de vos investissements."
                    />
                </div>

                {/* Content: Recent Orders */}
                <div className="flex-1 bg-gray-950 pt-4 overflow-auto border-rounded-3">
                    <div className="pt-2 pl-1 pr-4  rounded-2xl"> {/* Réduction du padding ici */}
                        <RecentOrders showSearch={false} />
                    </div>
                </div>
            </div>
        </div>
    );
}
