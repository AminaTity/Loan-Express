"use client";
import { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";

interface RecentOrdersEmprunteurProps {
    showSearch: boolean; // Prop obligatoire
    limit?: number;      // Prop optionnelle
}

export default function RecentOrdersEmprunteur({ limit, showSearch = true }: RecentOrdersEmprunteurProps) {

    const [loans, setLoans] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                setIsLoading(true);
                const storedUserInfo = localStorage.getItem("userInfo");
                if (!storedUserInfo) {
                    throw new Error("Utilisateur non connecté");
                }

                const userInfo = JSON.parse(storedUserInfo);
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/loansList/`, {
                    headers: {
                        "Authorization": `Bearer ${userInfo.tokens.access}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des emprunts");
                }

                const data = await response.json();
                setLoans(data); // Stocker les emprunts
            } catch (error: any) {
                console.error("Erreur:", error.message);
                setErrorMessage(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLoans();
    }, []);

    if (isLoading) {
        return <div>Chargement des emprunts...</div>;
    }

    if (errorMessage) {
        return <div className="text-red-500">{errorMessage}</div>;
    }

    // Limiter le nombre d'éléments affichés si la prop "limit" est définie
    //const displayedOrders = limit ? recentOrderData.slice(0, limit) : recentOrderData;
    const displayedLoans = limit ? loans.slice(0, limit) : loans;

    return (
        <div className="bg-teal-950 px-4 pt-2 ml-2 rounded-xl border border-teal-950 flex-1">
            <div className="flex flex-row justify-between">
                <strong className="text-gray-100 font-semibold">Emprunts</strong>
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

            <div className="h-full rounded-lg my-0">
                <table className="text-gray-400 w-full border-separate border-spacing-y-2">
                    <thead className=" font-light">
                    <tr>
                        <td className="border-0 font-semibold">N°#</td>
                        <td className="border-0 font-semibold">Motifs</td>
                        <td className="border-0 font-semibold">Montants</td>
                        <td className="border-0 font-semibold">Catégories</td>
                        <td className="border-0 font-semibold">Intérêts</td>
                        <td className="border-0 font-semibold">Echéances</td>
                        <td className="border-0 font-semibold">Statuts</td>
                        
                    </tr>
                    </thead>
                    <tbody>
                    {displayedLoans.map((loan: any, index: number) => (
                            <tr key={loan.id}>
                                <td className="px-2 py-2 border-0 w-1/12">{index + 1}</td>
                                <td className="px-2 py-2 border-0 w-2/12">{loan.purpose}</td>
                                <td className="px-2 py-2 border-0 w-2/12">{loan.amount}</td>
                                <td className="px-6 py-2 border-0 w-2/12">{loan.category}</td>
                                <td className="px-6 py-2 border-0 w-2/12">{loan.interest_rate} %</td>
                                <td className="px-2 py-2 border-0 w-2/12">{loan.repayment_deadline}</td>
                                <td className="px-2 bg-green-200 bg-opacity-10 text-green-500 text-center py-2 border-0 rounded-3xl w-2/12">
                                    {loan.status}
                                </td>
                                
                            </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
