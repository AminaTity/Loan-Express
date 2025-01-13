"use client";

import React, { useRef, useState } from "react";

export default function Document() {
    const documents = [
        { label: "Pièce d'identité" },
        { label: "Certificat de scolarité / de profession" },
        { label: "RIB" },
        { label: "Contrat de bail" },
        { label: "Justificatif de ressources" },
    ];

    const fileInputRefs = useRef([]);
    const [selectedFiles, setSelectedFiles] = useState(Array(documents.length).fill(null));
    const [alertMessage, setAlertMessage] = useState("");

    const handleFileSelection = (index) => {
        if (fileInputRefs.current[index]) {
            fileInputRefs.current[index].click();
        } else {
            console.error(`Reference for index ${index} is undefined.`);
        }
    };

    const handleFileChange = (event, index) => {
        const file = event.target.files[0];
        if (file) {
            const updatedFiles = [...selectedFiles];
            updatedFiles[index] = file.name;
            setSelectedFiles(updatedFiles);
        }
    };

    const handleFileRemove = (index) => {
        const updatedFiles = [...selectedFiles];
        updatedFiles[index] = null;
        setSelectedFiles(updatedFiles);
        setAlertMessage(`Fichier pour ${documents[index].label} supprimé.`);
        setTimeout(() => setAlertMessage(""), 3000);
    };

    return (
        <div className="bg-gray-950 h-[110vh] p-8 w-full max-w mx-auto">
            <h2 className="text-white text-2xl font-semibold">Documents</h2>
            {alertMessage && (
                <div className="bg-yellow-200 text-yellow-800 p-2 rounded mb-4">
                    {alertMessage}
                </div>
            )}
            <p className="text-gray-400 mb-6 mt-3 italic">
                Mettez à jour votre page pour nous aider à mieux étudier votre profil
            </p>
            <div className="space-y-4">
                {documents.map((doc, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between bg-gray-950 border-t-2 border-gray-500 p-4"
                    >
                        <div className="flex items-center gap-3">
                            <div className="text-green-500 text-xl">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                            </div>
                            <span className="text-white">{doc.label}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <button onClick={() => handleFileRemove(index)} className="text-green-500">
                                Supprimer
                            </button>
                            <button
                                onClick={() => handleFileSelection(index)}
                                className="bg-green-500 text-white px-4 py-2 rounded"
                            >
                                Choisir un fichier
                            </button>
                            <input
                                type="file"
                                accept=".pdf, .jpg, .jpeg, .png"
                                ref={(el) => {
                                    if (el) fileInputRefs.current[index] = el;
                                }}
                                style={{ display: "none" }}
                                onChange={(e) => handleFileChange(e, index)}
                            />
                        </div>
                        {selectedFiles[index] && (
                            <p className="text-gray-400 mt-2 text-sm">
                                Fichier sélectionné : {selectedFiles[index]}
                            </p>
                        )}
                    </div>
                ))}
            </div>
            <div className="justify-end items-end ml-96 mt-4">
                <button className="bg-green-500 h-10 text-white px-4 mt-3 rounded">
                    Soumettre les documents
                </button>
            </div>
        </div>
    );
}
