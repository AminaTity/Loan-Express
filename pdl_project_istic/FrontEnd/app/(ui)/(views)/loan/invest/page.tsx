'use client'

import { popins} from '@/app/fonts'
import Header from "../../../components/header";
import Field from "../../../components/field";
import Dropdown_field from "../../../components/dropdown_field";
import Link from "../../../components/link";
// @ts-ignore
import imageloan from "../../../../../public/imageloan.png";
// @ts-ignore
import Image from "next/image";

import {useState, useEffect} from "react";
import {createInvest} from "@/lib/api";
export default function Page() {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        amount: "",
        category: "",

    });

    const [errorMessage, setErrorMessage] = useState("");
    const [userInfo, setUserInfo] = useState(null);
    
    // Pour récupérer le token de l'utilisateur connecté et le passé à l'API
    useEffect(() => {
            setIsLoading(true);
            const storedUserInfo = localStorage.getItem("userInfo");
            if (storedUserInfo) {
                setUserInfo(JSON.parse(storedUserInfo)); // Parse les infos de l'utilisateur
            }
            setIsLoading(false); // Arrête l'état de chargement
        }, []);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");

        console.log(formData);

        try {
            setIsLoading(true);
            const response = await createInvest(formData, userInfo.tokens.access);

            if (response) {
                alert("Votre demande d'investissement à bien été enregistrer !");
                window.location.href = "/dashboard/investisseurs";
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
            <div className="flex justify-center gap-7 ">
                <div className="flex flex-col gap-8 py-20">
                    <div className="flex flex-col gap-2">
                        <p className={`${popins.className} text-4xl font-bold 
                    text-[#112B38]`}>Investir</p>
                        <p className={`${popins.className} text-sm font-medium italic text-green-950`}>Remplissez le
                            formulaire de demander d'investissement !</p>
                    </div>
                    <form onSubmit={handleSubmit}>

                        <div className="flex flex-col gap-8 ">
                            <Field
                                label="Montant à investir"
                                id="mntInvestir"
                                placeholder="Entrez le montant"
                                type="number"
                                value={formData.amount}
                                required={true}
                                disabled={isLoading}
                                onChange={(e: any) =>
                                    setFormData({...formData,amount: e.target.value})
                                }
                            />

                            <Dropdown_field
                                label="catégorie de l'investissement"
                                id="catInvestir"
                                required={true}
                                disabled={isLoading}
                                options={[
                                    { value: 'short_term', label: 'Investir à Court terme' },
                                    { value: 'long_term', label: 'Investir à Long terme' },
                                ]}
                                value={formData.category}
                                onChange={(value: string) =>
                                    setFormData({ ...formData, category: value })
                                }
                            />


                            <button
                                type="submit"
                                className="btn btn-less-border"
                                disabled={isLoading}
                            >
                                {isLoading ? "Chargement..." : "Investir"}
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
