'use client'

import {inter, roboto_mono, prosto_one, dm_sans, raleway, popins, playpen_sans} from './../../../../fonts'

import Header from "../../../components/header";
import Field from "../../../components/field";
import Dropdown_field from "../../../components/dropdown_field";

import imageloan from "../../../../../public/imageloan.png";
import Image from "next/image";

import {useState, useEffect} from "react";
import {createEmprunt} from "@/lib/api";

export default function Page() {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        amount: "", //montant
        category: "", //categorie pret
        purpose: "", //but du pret

    });

    const [userInfo, setUserInfo] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    // Pour récupérer le token de l'utilisateur connecté et le passé à l'API
    useEffect(() => {
            setIsLoading(true);
            const storedUserInfo = localStorage.getItem("userInfo");
            if (storedUserInfo) {
                setUserInfo(JSON.parse(storedUserInfo)); // Parse les infos de l'utilisateur
            }
            setIsLoading(false); // Arrête l'état de chargement
        }, []);

    // Pour soumettre le formulaire après remplissage des champs requis !
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");

        console.log(formData);
        console.log(userInfo.tokens.access);


        try {
            setIsLoading(true);
            const response = await createEmprunt(formData, userInfo.tokens.access);
            //console.log(response);
            if (response) {
                alert("Votre demande est bien enregistrer !");
                window.location.href = "/loan/historiquesPrets";
            } else {
                setErrorMessage("Une erreur s'est produite. Veuillez réessayer.");
            }
        } catch (error: any) {
            setErrorMessage(error.message || "Une erreur s'est produite.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Header/>
            <div className="flex justify-center gap-7 py-14">
                <div className="flex flex-col gap-8 ">
                    <div className="flex flex-col gap-2">
                        <p className={`${popins.className} text-4xl font-bold 
                    text-[#112B38]`}>Emprunter</p>
                        <p className={`${popins.className} text-sm font-medium italic text-green-950`}>Remplissez ce
                            formulaire
                            pour
                            emprunter</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6 ">

                            <Dropdown_field
                                label="Catégorie de l'emprunt"
                                id="catEmprunt"
                                required={true}
                                disabled={isLoading}
                                options={[
                                    { value: 'short_term', label: 'Prêt à Court terme' },
                                    { value: 'long_term', label: 'Prêt à Long terme' },
                                ]}
                                value={formData.category}
                                onChange={(value: string) =>
                                    setFormData({ ...formData, category: value })
                                }
                            />

                            <Field
                                label="Montant de l'emprunt "
                                id="montantEmprunt"
                                placeholder="Entrez le montant"
                                type="number"
                                value={formData.amount}
                                required={true}
                                disabled={isLoading}
                                onChange={(e: any) =>
                                    setFormData({...formData, amount: e.target.value})
                                }
                            />

                            <Field
                                label="But de l'emprunt"
                                id="butEmprunt"
                                placeholder="Quel est l'objectif de l'emprunt"
                                type="text"
                                height="pt-6 pb-20"
                                value={formData.purpose}
                                required={true}
                                disabled={isLoading}
                                onChange={(e: any) =>
                                    setFormData({...formData, purpose: e.target.value})
                                }
                            />

                            <button
                                type="submit"
                                className="btn btn-less-border"
                                disabled={isLoading}
                            >
                                {isLoading ? "Chargement..." : "Emprunter"}
                            </button>
                        </div>

                    </form>
            </div>
            <Image
                    src={imageloan}
                    alt="image"
                    width={500}
                    height={300}
                />
            </div>
        </div>
    );
            }
