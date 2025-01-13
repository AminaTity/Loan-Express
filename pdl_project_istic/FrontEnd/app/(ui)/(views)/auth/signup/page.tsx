'use client'

import { useState } from "react";
import Header from "../../../components/header";
import Field from "../../../components/field";
import Link from "../../../components/link";
import imageInscrip from "../../../../../public/imageInscrip.png";
import Image from "next/image";
import { registerUser } from "@/lib/api";
import Utils from "../../../components/utils";
import OptionInscip1 from "../../../components/optionInscip1"; // Importer OptionInscip1
import OptionInscip2 from "../../../components/optionInscip2";
import EmailInput from "@/app/(ui)/components/emailInput";
import { dm_sans, raleway } from '@/app/fonts';
import Dropdown_field from "@/app/(ui)/components/dropdown_field";
import { useRouter } from "next/router";



export default function Page() {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        adresse: "",
        niveau: "",
        numero_identification: "",
        profil: "",
        parcours: "",
        formation: "",
        poste: "null",
    });

    const [errorMessage, setErrorMessage] = useState("");
    //const router = useRouter(); // Le router pour la redirection des pages !

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");

        //console.log(formData);
        //console.log('Données envoyées :', JSON.stringify(formData));
        //console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);

        // Validation de l'email
        if (!Utils.isEmailValid(formData.email)) {
            setErrorMessage("Veuillez entrer une adresse email valide.");
            return;
        }

        try {
            setIsLoading(true);
            const response = await registerUser(formData);
            console.log(response);
            if (response) {
                alert("Inscription réussie !");
                window.location.href = "/auth/login";
                //router.push("/login");
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
            <Header />
            <div className="flex flex-col items-center py-7 gap-6">
                <div className="flex flex-col gap-2 text-center">
                    <p className={`${dm_sans.className} text-3xl font-bold text-[#112B38]`}>
                        S'inscrire sur LoanExpress
                    </p>
                    <p className={`${raleway.className} text-base font-medium italic text-green-950`}>
                        Simplifiez vos démarches et trouvez le financement qui vous correspond
                    </p>
                </div>

                <div className="flex gap-10">
                    <div className="flex flex-col gap-6">
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-2">
                                    <p className={`${dm_sans.className} text-xl font-bold text-green-950`}>
                                        Informations personnelles
                                    </p>
                                    <div className="flex gap-7">
                                        <Field
                                            label="Nom "
                                            id="userName"
                                            placeholder="Entrez votre nom"
                                            value={formData.username}
                                            required={true}
                                            disabled={isLoading}
                                            onChange={(e: any) =>
                                                setFormData({...formData, username: e.target.value})
                                            }
                                        />
                                    </div>

                                    <div className="flex gap-7">
                                        <Field
                                            label="Adresse"
                                            id="adresse"
                                            placeholder="Entrez votre adresse"
                                            value={formData.adresse}
                                            required={true}
                                            disabled={isLoading}
                                            onChange={(e: any) =>
                                                setFormData({...formData, adresse: e.target.value})
                                            }
                                        />
                                    </div>

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


                                </div>

                                <div className="flex flex-col gap-2">
                                    <p className={`${dm_sans.className} text-xl font-bold text-green-950`}>
                                        Informations professionnelles
                                    </p>
                                    <div className="flex gap-7">
                                        <Field
                                            label="Numéro d'identification"
                                            id="numero_identification"
                                            placeholder="Entrez votre numéro d'identification"
                                            value={formData.numero_identification}
                                            required={true}
                                            disabled={isLoading}
                                            onChange={(e: any) =>
                                                setFormData({...formData, numero_identification: e.target.value})
                                            }
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <p className={`${dm_sans.className} text-xl font-bold text-green-950`}>
                                            Profil
                                        </p>
                                        <div className="flex gap-10 items-center">
                                            <div className="flex gap-3 items-center">
                                                <p className={`${dm_sans.className} text-green-950`}>Étudiant</p>
                                                <input
                                                    type="checkbox"
                                                    checked={formData.profil === "ETUDIANT"}
                                                    onChange={() =>
                                                        setFormData({...formData, profil: "ETUDIANT"})
                                                    }
                                                />
                                            </div>
                                            <div className="flex gap-3 items-center">
                                                <p className={`${dm_sans.className} text-green-950`}>Personnel</p>
                                                <input
                                                    type="checkbox"
                                                    checked={formData.profil === "Personnel"}
                                                    onChange={() =>
                                                        setFormData({...formData, profil: "Personnel"})
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <hr className="my-6"/>

                                    {formData.profil === "ETUDIANT" && (
                                        <OptionInscip1 formData={formData} setFormData={setFormData}/>
                                    )}
                                    {formData.profil === "Personnel" && (
                                        <OptionInscip2 formData={formData} setFormData={setFormData}/>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-less-border"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Chargement..." : "S'inscrire"}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="flex items-center">
                        <Image src={imageInscrip} alt="Inscription" width={500} height={100}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
