"use client";

import HeaderDashboard from "../../../components/headerDashboard";
import Sidebar from "../../../components/sidebar";
import RecentOrders from "../../../components/recentOrders";
import PopularStats from "../../../components/popularStats";
import { HiOutlineViewGrid, HiOutlineHome, HiOutlineCube, HiOutlineDocument } from "react-icons/hi";

import {ReactNode, useEffect, useState} from "react";
import Link from "../../../components/link";
import {TbReceiptEuro} from "react-icons/tb";
import {IoScanCircle} from "react-icons/io5";




export default function Page() {
    const BoxWrapper = ({ children, className }) => {
        return (
            <div className={`p-4 rounded-lg ${className}`}>
                {children}
            </div>
        );
    };

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
                    userName={userInfo.username}
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

                {/* Contenu */}
                <div className="flex flex-col gap-4 bg-gray-950 p-4 h-full">
                    <div className="flex flex-col w-full h-[170px] ml-2 mr-2 gap-6">
                        {/* Bouton "Investir" aligné à droite */}
                        <div className="flex justify-end ">
                            <Link title="Investir" btnVariant="btn btn-less-border2" href="../../../loan/invest"/>

                        </div>

                        {/* Grille principale */}
                        <div className="flex  justify-between ">

                            <div className="flex gap-16 ">
                                {/* Total investissement */}
                                <BoxWrapper className="flex-1 flex flex-row bg-teal-950">
                                    <div
                                        className="rounded-full h-10 w-10 flex items-center justify-center bg-green-800">
                                        <TbReceiptEuro className="text-2xl text-white"/>
                                    </div>
                                    <div className="pl-5">
                                        <span className="text-sm text-gray-200 font-light">Total investissement</span>
                                        <div className="items-center bg-teal-950">
                                            <strong className="text-lg text-gray-100 align-middle font-semibold">0£</strong>
                                            <span className="text-xs text-green-500 px-10 align-top">+25%</span>
                                        </div>
                                    </div>
                                </BoxWrapper>
                                {/* Reçus d'investissements */}
                                <div className="flex ">
                                    <BoxWrapper className="flex-1 flex flex-row bg-teal-950 py-4 px-8 rounded-lg">
                                        <div
                                            className="rounded-full h-10 w-10 flex items-center justify-center bg-green-800">
                                            <IoScanCircle className="text-2xl text-white"/>
                                        </div>
                                        <div className="pl-4 py-3">
                                            <span
                                                className="text-sm text-gray-200 font-light">Reçus d'investissements</span>
                                        </div>
                                    </BoxWrapper>
                                </div>
                            </div>
                            {/* Mon solde */}
                            <div className="w-64">
                                <BoxWrapper className="flex-1 flex flex-row bg-teal-950 py-4 px-8 rounded-lg">
                                    <div>
                                        <span
                                            className="text-xl text-gray-100 font-semibold justify-center">Mon solde</span>
                                        <div className="items-center gap-10">
                                            <strong className="text-lg text-green-500 font-semibold px-3">0£</strong>
                                        </div>
                                    </div>
                                </BoxWrapper>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row gap-4 w-full mb-4">
                        <RecentOrders limit={5} showSearch={true} />
                        <PopularStats />
                    </div>
                </div>
            </div>
        </div>
    );
}
