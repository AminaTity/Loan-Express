"use client";

import HeaderDashboard from "../../../components/headerDashboard";
import Sidebar from "../../../components/sidebar";
import PopularStats from "../../../components/popularStats";
import { HiOutlineViewGrid, HiOutlineHome, HiOutlineCube, HiOutlineDocument } from "react-icons/hi";

export default function Page() {
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
        console.log("Déconnexion...");
    };

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
                        userName="Alexandre Tahi"
                        welcomeMessage="Bonjour"
                        description="Voici les informations clés de vos investissements."
                    />
                </div>

                {/* Content: PopularStats */}
                <div className="flex-1 bg-green-800 overflow-hidden flex p-4">
                    <PopularStats className="w-full h-full" />
                </div>
            </div>
    </div>


    );
}
