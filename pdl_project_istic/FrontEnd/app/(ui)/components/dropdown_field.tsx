import React, { useState, useEffect } from "react";
import { playpen_sans } from "../../fonts";

interface DropdownFieldProps {
    label?: string;
    id: string;
    options: { value: string; label: string }[];
    placeholder?: string;
    value?: string;
    required?: boolean;
    disabled?: boolean;
    large ? :String;
    onChange: (value: String) => void;
}

export default function Dropdown_field({
                                           label,
                                           id,
                                           options,
                                           placeholder = "Choisissez une option",
                                           value = "",
                                           required = false,
                                           disabled = false,
                                            large="w-80",
                                           onChange,
                                       }: DropdownFieldProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string>(value || "");

    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (required && !selectedOption) {
            setHasError(true);
        } else {
            setHasError(false);
        }
    }, [selectedOption, required]);

    const handleOptionClick = (option: { value: string; label: string }) => {
        setSelectedOption(option.label);
        onChange(option.value); // Passer la valeur au parent
        setIsOpen(false); // Ferme le menu une fois l'option sélectionnée
    };

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={id} className="block text-base font-medium text-gray-700">
                {label}
            </label>
            <div className={`${large} relative `} >
                <div
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    className={`${playpen_sans.className} flex justify-between items-center h-12 px-4 rounded-md bg-[#C9E4DE]/30 text-black/30 text-sm cursor-pointer ring-1 ring-inset ring-gray-300 ${
                        disabled ? "cursor-not-allowed opacity-50" : ""
                    } ${hasError ? "ring-red-500" : ""}`}
                >
                    <span>{selectedOption || placeholder}</span>
                    <i className={`bi ${isOpen ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
                </div>

                {isOpen && (
                    <div
                        className="absolute w-full bg-white border border-gray-300 rounded-md mt-1 z-10 shadow-lg">
                        {options.map((option) => (
                            <div
                                key={option.value}
                                onClick={() => handleOptionClick(option)}
                                className="px-4 py-2 hover:bg-green-100 cursor-pointer"
                            >
                                {option.label}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {hasError && (
                <small className="text-red-500 text-sm">
                    Ce champ est obligatoire.
                </small>
            )}
        </div>
    );
}
