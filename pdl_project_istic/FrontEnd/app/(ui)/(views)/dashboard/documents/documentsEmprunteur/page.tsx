"use client";

import Sidebar from "../../../../components/sidebar";
import Document from "../../../../components/document";
import { HiOutlineViewGrid, HiOutlineHome, HiOutlineCube, HiOutlineDocument } from "react-icons/hi";


export default function page() {
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
        <div className="flex h-screen">
            {/* Sidebar avec interactivité (Client Component) */}
            <div className="w-60 bg-teal-950">
                <Sidebar
                    links={sidebarLinks}
                    userName="Alexandre Tahi"
                    onLogout={handleLogout} // Passer le gestionnaire de déconnexion
                />
            </div>

      <div className="flex-1 overflow-auto h-[110vh]">
        <Document />
      </div>
            </div>
  )
}