'use client'

import {raleway, playpen_sans, dm_sans} from '@/app/fonts'

import Header from "../../../components/header";
import Field from "../../../components/field";
import imageconnection from "../../../../../public/imageconnection.png";
import Image from "next/image";
import {useState} from "react";
import {defineRole, loginUser} from "@/lib/api";
import Utils from "@/app/(ui)/components/utils";
import EmailInput from "@/app/(ui)/components/emailInput";

export default function Page() {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role:"AUTRE",
    });

    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");

        console.log(formData);

        if (!Utils.isEmailValid(formData.email)) {
            setErrorMessage("Veuillez entrer une adresse email valide.");
            return;
        }

        try {
            setIsLoading(true);
            alert("Attention ! Si c'est votre première connection avec ce Rôle, il vous sera attibué automatiquement !");
            const response = await loginUser(formData.email, formData.password);
            console.log(response);
            if (response) {
                alert("Connection réussie !");
                //localStorage.setItem("authToken", response.token);
                localStorage.setItem("userInfo", JSON.stringify(response)); // Stocke les infos utilisateur
                
                const roleResponse = await defineRole(formData.role, response.tokens.access);
                console.log(roleResponse);
                if (roleResponse.role == "AUTRE"){
                    window.location.href = "/dashboard/administrateur";
                }
                if (roleResponse.role == "EMPRUNTEUR"){
                    window.location.href = "/dashboard/emprunteur";
                }
                if (roleResponse.role == "INVESTISSEUR"){
                    window.location.href = "/dashboard/investisseurs";
                }

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
            <div className="flex items-center py-7 gap-6  justify-around">
                <div className="flex flex-col gap-7 text-center">
                    <p className={`${raleway.className} text-3xl font-bold 
                    text-[#112B38]`}>Connectez-vous</p>

                    <div className="flex flex-col items-center w-96 gap-6">
                        <Image
                            className="w-full"
                            src={imageconnection}
                            alt="image"
                        />

                        <p className={`${playpen_sans.className} text-xl text-green-950`}>
                            LoanExpress - Votre partenaire financier de confiance pour les prêts. Approbations rapides,
                            taux
                            compétitifs et solutions personnalisées pour répondre à vos besoins uniques. Postulez en
                            ligne
                            dès aujourd'hui !</p>
                    </div>


                </div>
                <div className="flex flex-col gap-10  drop-shadow-lg">

                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6 ">

                            <div className=" flex flex-col gap-2">
                                <label htmlFor="email" className="text-base  text-green-950">
                                    Email
                                </label>
                                <EmailInput
                                    required={true}
                                    value={formData.email}
                                    placeholder="Ex: test@gmail.com"
                                    disabled={isLoading}
                                    onChange={(event) =>
                                        setFormData({
                                            ...formData,
                                            email: event.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="flex gap-7">
                                <Field
                                    label="Mot de passe"
                                    id="password"
                                    type="password"
                                    placeholder="********"
                                    value={formData.password}
                                    required={true}
                                    disabled={isLoading}
                                    onChange={(e: any) =>
                                        setFormData({...formData, password: e.target.value})
                                    }
                                />
                            </div>


                            <div className="flex flex-col gap-2">
                                <p className={`${dm_sans.className} block text-base font-medium text-gray-700`}>
                                    Se connecter en tant que :
                                </p>
                                <div className="flex gap-10 items-center">
                                    <div className="flex gap-3 items-center">
                                        <p className={`${dm_sans.className} text-base text-green-950`}>Emprunteur</p>
                                        <input
                                            type="checkbox"
                                            checked={formData.role === "EMPRUNTEUR"}
                                            onChange={() =>
                                                setFormData({...formData, role: "EMPRUNTEUR"})
                                            }
                                        />
                                    </div>
                                    <div className="flex gap-3 items-center">
                                        <p className={`${dm_sans.className} text-base text-green-950`}>Investisseur</p>
                                        <input
                                            type="checkbox"
                                            checked={formData.role === "INVESTISSEUR"}
                                            onChange={() =>
                                                setFormData({...formData, role: "INVESTISSEUR"})
                                            }
                                        />
                                    </div>
                                </div>
                            </div>


                            <button
                                type="submit"
                                className="btn btn-less-border"
                                disabled={isLoading}
                            >
                                {isLoading ? "Chargement..." : "Se connecter"}
                            </button>
                        </div>
                    </form>
                </div>

            </div>

        </div>
    )
        ;
}
