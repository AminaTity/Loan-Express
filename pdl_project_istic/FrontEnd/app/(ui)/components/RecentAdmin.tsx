"use client";

import { HiOutlineSearch } from "react-icons/hi";
import { useState, useEffect } from "react";
import Dropdown_field from "@/app/(ui)/components/dropdown_field";

interface RecentAdminProps {
    showSearch: boolean; // Prop obligatoire
    limit?: number;      // Prop optionnelle
}


/* { id: "1", name: "Jean Dupont", date: "10/01/2025", amount: "20 000€", status: "En attente" },
{ id: "2", name: "Marie Curie", date: "12/01/2025", amount: "15 000€", status: "Approuvé" },
{ id: "3", name: "Albert Einstein", date: "15/01/2025", amount: "50 000€", status: "Refusé" },


{ id: "4", name: "Isaac Newton", date: "11/01/2025", amount: "10 000€", status: "En attente" },
{ id: "5", name: "Ada Lovelace", date: "13/01/2025", amount: "30 000€", status: "Approuvé" },
{ id: "6", name: "Alan Turing", date: "16/01/2025", amount: "25 000€", status: "Refusé" },
 */

export default function RecentAdmin({ limit, showSearch = true }: RecentAdminProps) {

    const [loan, setLoans] = useState([]); // État pour les prêts
    const [investment, setInvestments] = useState([]); // État pour les investissements
    const [isLoading, setIsLoading] = useState(false);
    const [usersData, setUsersData] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const storedUserInfo = localStorage.getItem("userInfo");
                if (!storedUserInfo) {
                    throw new Error("Utilisateur non connecté");
                }

                const userInfo = JSON.parse(storedUserInfo);
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/admin/user/investments-loans/`, {
                    headers: {
                        "Authorization": `Bearer ${userInfo.tokens.access}`,
                    },
                });
                
                const data = await response.json();
                setUsersData(data);
            } catch (error) {
                setErrorMessage("Une erreur est survenue lors de la récupération des données.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    


    const loans = usersData
    .flatMap((user: any) => user.loans.map((loan: any) => ({
        ...loan,
        username: user.user.username,
    })));

    const investments = usersData
    .flatMap((user: any) => user.investments.map((investment: any) => ({
        ...investment,
        username: user.user.username,
    })));


    const handleStatusChange = (type: "loan" | "investment", id: string, newStatus: string) => {
        if (type === "loan") {
            setLoans((prevLoans) =>
                prevLoans.map((loan) =>
                    loan.id === id ? { ...loan, status: newStatus } : loan
                )
            );
        } else if (type === "investment") {
            setInvestments((prevInvestments) =>
                prevInvestments.map((investment) =>
                    investment.id === id ? { ...investment, status: newStatus } : investment
                )
            );
        }
    };

    return (
        <div className="flex flex-col gap-6 w-full">
            {/* Demandes de prêt */}
            <div className="flex flex-col gap-6 px-6 py-4 rounded-xl bg-teal-950 w-full">
                <div className="flex flex-row justify-between">
                    <strong className="text-gray-100 font-semibold">Demandes de prêt</strong>
                    {showSearch && (
                        <div className="relative">
                            <HiOutlineSearch fontSize={20} className="text-gray-400 absolute top-1/2 left-3 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Rechercher..."
                                className="text-xs text-white focus:outline-none h-8 w-[18rem] border border-green-200 rounded-full bg-green-200 border-opacity-10 bg-opacity-10 pl-11 px-4"
                            />
                        </div>
                    )}
                </div>

                <table className="text-gray-400 w-full border-teal-950 border-separate border-spacing-y-3">
                    <thead className="bg-teal-950 font-light">
                    <tr>
                        <td className="border-0 font-semibold w-1/12">#</td>
                        <td className="border-0 font-semibold w-1/5">Nom</td>
                        <td className="border-0 font-semibold w-1/5">Montants</td>
                        <td className="border-0 font-semibold w-1/6">Date</td>
                        <td className="border-0 font-semibold w-1/5">Statut</td>
                        <td className="border-0 font-semibold w-1/8"></td>

                    </tr>
                    </thead>
                    <tbody>
                    {loans.map((loan, index) => (
                        <tr key={loan.id}>
                            <td className="px-2 py-2 border-0 w-1/12">{index + 1}</td>
                            <td className="px-2 py-2 border-0 w-2/12">{loan.username}</td>
                            <td className="px-2 py-2 border-0 w-2/12">{loan.amount} €</td>
                            <td className="px-2 py-2 border-0 w-2/12">{new Date(loan.created_at).toLocaleDateString()}</td>
                            <td className="px-2 py-2 border-0 w-2/12">
                                <Dropdown_field
                                    id="status"
                                    placeholder="status"
                                    large="w-40"
                                    options={[
                                        { value: "pending", label: "En attente" },
                                        { value: "approved", label: "Approuvé" },
                                        { value: "rejected", label: "Refusé" },
                                    ]}
                                    value={loan.status}
                                    onChange={(value: string) => handleStatusChange(loan, loan.id, value)}
                                />
                            </td>

                            <td className="px-2 py-2 border-0 w-1/2">
                                    <button
                                        type="submit"
                                        className="btn text-white text-lg hover:bg-white/40 bg-green-800"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "Chargement..." : "Valider"}
                                    </button>


                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Demandes d'investissement */}
            <div className="flex flex-col gap-6 px-6 py-4 rounded-xl bg-teal-950 w-full">
                <div className="flex flex-row justify-between">
                    <strong className="text-gray-100 font-semibold">Demandes d'investissement</strong>
                    {showSearch && (
                        <div className="relative">
                            <HiOutlineSearch fontSize={20}
                                             className="text-gray-400 absolute top-1/2 left-3 -translate-y-1/2"/>
                            <input
                                type="text"
                                placeholder="Rechercher..."
                                className="text-xs text-white focus:outline-none h-8 w-[18rem] border border-green-200 rounded-full bg-green-200 border-opacity-10 bg-opacity-10 pl-11 px-4"
                            />
                        </div>
                    )}
                </div>

                <table className="text-gray-400 w-full border-teal-950 border-separate border-spacing-y-3">
                    <thead className="bg-teal-950 font-light">
                    <tr>
                        <td className="border-0 font-semibold w-1/12">#</td>
                        <td className="border-0 font-semibold w-1/5">Nom</td>
                        <td className="border-0 font-semibold w-1/5">Montants</td>
                        <td className="border-0 font-semibold w-1/6">Date</td>
                        <td className="border-0 font-semibold w-1/5">Statut</td>
                        <td className="border-0 font-semibold w-1/8"></td>

                    </tr>
                    </thead>
                    <tbody>
                        {investments.map((investment, index) => (
                            <tr key={investment.id}>
                                <td className="px-2 py-2 border-0 w-1/12">{index + 1}</td>
                                <td className="px-2 py-2 border-0 w-2/12">{investment.username}</td>
                                <td className="px-2 py-2 border-0 w-2/12">{investment.amount} €</td>
                                <td className="px-2 py-2 border-0 w-2/12">{new Date(investment.created_at).toLocaleDateString()}</td>
                                <td className="px-2 py-2 border-0 w-2/12">
                                    <Dropdown_field
                                        id="status"
                                        placeholder="status"
                                        large="w-40"
                                        options={[
                                            { value: "pending", label: "En attente" },
                                            { value: "approved", label: "Approuvé" },
                                            { value: "rejected", label: "Refusé" },
                                        ]}
                                        value={investment.status}
                                        onChange={(value: string) => handleStatusChange(investment, investment.id, value)}
                                    />
                                </td>
                                <td className="px-2 py-2 border-0 w-1/2">
                                    <button
                                        type="submit"
                                        className="btn text-white text-lg hover:bg-white/40 bg-green-800"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "Chargement..." : "Valider"}
                                    </button>


                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
}
