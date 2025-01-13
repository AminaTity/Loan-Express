"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Menu } from "@headlessui/react";
import classNames from "classnames";
import { FcBullish } from "react-icons/fc";
import { VscAccount, VscChevronDown } from "react-icons/vsc";
import { HiOutlineLogout } from "react-icons/hi";


    

// Définir les propriétés du composant
type SidebarProps = {
    links?: {
        key: string;
        label: string;
        path: string;
        icon: JSX.Element;
    }[];
    bottomLinks?: {
        key: string;
        label: string;
        path: string;
        icon: JSX.Element;
    }[];
    userName: string;
    onLogout?: () => void;
};

export default function Sidebar({
                                    links,
                                    bottomLinks = [],
                                    userName,
                                    onLogout,
                                }: SidebarProps): JSX.Element {
    const router = useRouter();
    const pathname = usePathname();

    const linkClasses =
        "flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base";

    const SidebarLink = ({ item }: { item: typeof links[0] }) => {
        const isActive = pathname === item.path;
        return (
            <Link
                href={item.path}
                className={classNames(
                    isActive ? "bg-neutral-700 text-white" : "text-neutral-400",
                    linkClasses
                )}
            >
                <span className="text-xl">{item.icon}</span>
                {item.label}
            </Link>
        );
    };

    const [userInfo, setUserInfo] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Pour récupérer le nom de l'utilisateur connecté et le passé à l'API
    useEffect(() => {
            setIsLoading(true);
            const storedUserInfo = localStorage.getItem("userInfo");
            if (storedUserInfo) {
                setUserInfo(JSON.parse(storedUserInfo)); // Parse les infos de l'utilisateur
            }
            setIsLoading(false); // Arrête l'état de chargement
        }, []);

        if (isLoading) {
            return <div>Chargement...</div>; // Affiche un état de chargement
        }
    
        if (!userInfo) {
            return <div>Erreur : Informations utilisateur introuvables.</div>; // Gère l'absence d'utilisateur
        }

    return (
        <div className="h-screen bg-teal-950 p-3 flex flex-col text-white">
            <div className="flex items-center gap-2 px-1 py-3">
                <FcBullish fontSize={24} />
                <span className="text-neutral-100 text-lg">LoanExpress</span>
            </div>
            <div className="flex-1 py-8 flex flex-col gap-0.5">
                {links.map((item) => (
                    <SidebarLink key={item.key} item={item} />
                ))}
            </div>
            <div className="flex flex-col gap-1 mt-2 pt-2 pb-10 border-t border-neutral-700">
                {bottomLinks.map((item) => (
                    <SidebarLink key={item.key} item={item} />
                ))}
                <Menu as="div" className="relative">
                    <div>
                        <Menu.Button className="ml-2 flex flex-row items-center gap-4 rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-400">
                            <VscAccount className="h-7 w-7 rounded-full bg-gray-500" />
                            <span className="text-sm text-neutral-100">{userInfo.username}</span>
                            <VscChevronDown className="ml-4" />
                        </Menu.Button>
                        <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-sm shadow-md p-1 bg-green-950 ring-black ring-1 ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                                {({ active }) => (
                                    <div
                                        className={classNames(
                                            "text-neutral-100 text-xs cursor-pointer",
                                            linkClasses
                                        )}
                                        onClick={onLogout}
                                    >
                    <span className="text-xl">
                      <HiOutlineLogout />
                    </span>
                                        Se déconnecter
                                    </div>
                                )}
                            </Menu.Item>
                        </Menu.Items>
                    </div>
                </Menu>
            </div>
        </div>
    );
}
