'use client';

import {useState} from 'react';

interface DropdownItem {
    value: string;
    text: string;
    link: string;
}

interface DropdownProps {
    options: DropdownItem[];
}

export default function Dropdown(props: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);

    // Fonction pour basculer l'état du menu (ouvrir/fermer)
    const toggleDropdown = () => {
        setIsOpen((prevState) => !prevState);
    };

    return (
        <div className="relative inline-block">
            {/* Le bouton déroulant avec le texte "S'inscrire" */}
            <button
                onClick={toggleDropdown} // Lorsqu'on clique, on bascule l'état du dropdown
                className="py-2 px-4 rounded-full bg-green-500 text-black border border-green-500 hover:bg-green-800 hover:text-green-500 transition duration-300"
            >
                S'inscrire
            </button>

            {/* Liste déroulante positionnée à droite du bouton (alignée à droite) */}
            {isOpen && (
                <div
                    className="absolute top-full right-0 mt-4 w-64 bg-white border border-green-500 rounded-md shadow-lg z-10"
                >
                    <div className="flex flex-col">
                        {props.options.map((opt) => (
                            <a
                                key={opt.value}
                                href={opt.link}
                                className=" block px-4 py-2 text-sm text-gray-800 hover:bg-green-100 "
                            >
                                {opt.text}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
