"use client";
import { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
interface RecentOrdersInvestisseursProps {
    showSearch: boolean; // Prop obligatoire
    limit?: number;      // Prop optionnelle
}

export default function RecentOrders({ limit, showSearch = true }: RecentOrdersInvestisseursProps) {

        const [invests, setInvest] = useState([]);
        const [isLoading, setIsLoading] = useState(true);
        const [errorMessage, setErrorMessage] = useState("");
    
        useEffect(() => {
            const fetchInvests = async () => {
                try {
                    setIsLoading(true);
                    const storedUserInfo = localStorage.getItem("userInfo");
                    if (!storedUserInfo) {
                        throw new Error("Utilisateur non connecté");
                    }
    
                    const userInfo = JSON.parse(storedUserInfo);
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/investList/`, {
                        headers: {
                            "Authorization": `Bearer ${userInfo.tokens.access}`,
                        },
                    });
    
                    if (!response.ok) {
                        throw new Error("Erreur lors de la récupération des emprunts");
                    }
    
                    const data = await response.json();
                    setInvest(data); // Stocker les emprunts
                } catch (error: any) {
                    console.error("Erreur:", error.message);
                    setErrorMessage(error.message);
                } finally {
                    setIsLoading(false);
                }
            };
    
            fetchInvests();
        }, []);
    
        if (isLoading) {
            return <div>Chargement de vis données...</div>;
        }
    
        if (errorMessage) {
            return <div className="text-red-500">{errorMessage}/Votre session à expirer. Veuillez vous reconnecter !</div>;
        }
    
        // Limiter le nombre d'éléments affichés si la prop "limit" est définie
        //const displayedOrders = limit ? recentOrderData.slice(0, limit) : recentOrderData;
        const displayedInvests = limit ? invests.slice(0, limit) : invests;

    return (
        <div className="flex flex-col gap-6 px-6 py-4 rounded-xl bg-teal-950 w-full">
            <div className="flex flex-row justify-between">
                <strong className="text-gray-100 font-semibold">Investissements</strong>
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
                        <td className="border-0 font-semibold">N°#</td>
                        <td className="border-0 font-semibold">Catégorie</td>
                        <td className="border-0 font-semibold">Montants</td>
                        <td className="border-0 font-semibold">Échéances</td>
                        <td className="border-0 font-semibold">Intérêts perçu</td>
                        <td className="border-0 font-semibold">Statuts</td>
                    </tr>
                    </thead>
                    <tbody>
                    {displayedInvests.map((invests: any, index: number) => (
                        <tr key={invests.id}>
                            <td className="px-2 py-2 border-0 w-1/12">{index + 1}</td>
                            <td className="px-2 py-2 border-0 w-2/12">{invests.category}</td>
                            <td className="px-2 py-2 border-0 w-2/12">{invests.amount}</td>
                            <td className="px-2 py-2 border-0 w-2/12">{invests.repayment_deadline}</td>
                            <td className="px-6 py-2 border-0 w-2/12">{invests.interest_rate} %</td>
                            <td className="px-2 bg-green-200 bg-opacity-10 text-green-500 text-center py-2 border-0 rounded-3xl w-2/12">
                                {invests.status}
                            </td>
                            
                        </tr>
                    ))}
                    </tbody>
            </table>

        </div>
    );
}
