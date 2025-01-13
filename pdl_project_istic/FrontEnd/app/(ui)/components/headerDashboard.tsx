import { HiOutlineSearch, HiOutlineHand } from "react-icons/hi";

// Définir les types de props que le composant attend
type HeaderDashboardProps = {
    userName: string;
    welcomeMessage?: string;
    description?: string;
};

export default function HeaderDashboard({
                                            userName,
                                            welcomeMessage = "Bienvenue",
                                            description = "Voici les informations clés de vos investissements",
                                        }: HeaderDashboardProps) {
    return (
        <div className="bg-gray-950 h-18 px-4 py-6 flex justify-between items-center border-gray-200 w-full">
            <div>
                {/* Bloc contenant "Bonjour" et l'icône sur la même ligne */}
                <div className="flex items-center text-white space-x-2 ">
                    <span className="text-md text-gray-100 font-bold italic">{welcomeMessage} {userName}</span>
                    <HiOutlineHand className="text-yellow-400 h-4 w-4"/>
                </div>

                {/* Texte sous le nom avec une taille plus petite */}
                <div className="text-xs text-gray-300 mt-1 italic">
                    {description}
                </div>
            </div>

            <div className="relative">
                <HiOutlineSearch fontSize={20} className="text-gray-400 absolute top-1/2 left-3 -translate-y-1/2"/>
                <input
                    type="text"
                    placeholder="Rechercher..."
                    className="text-xs focus:outline-none active:outline-none h-8 w-[24rem] border border-white rounded-lg pl-11 px-4"
                />
            </div>
        </div>
    );
}
