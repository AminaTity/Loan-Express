import Header from "./(ui)/components/header";
import Link from "./(ui)/components/link";
// @ts-ignore
import Image from 'next/image'
// @ts-ignore
import image from '../public/image0.png'
// @ts-ignore
import vector from '../public/vector.png'
// @ts-ignore
import vector1 from '../public/vector1.png'
// @ts-ignore
import vector2 from '../public/vector2.png'
// @ts-ignore
import card1 from '../public/card1.png'
// @ts-ignore
import card2 from '../public/card2.png'
// @ts-ignore
import card3 from '../public/card3.png'


import { inter, roboto_mono, prosto_one, dm_sans, raleway, popins, playpen_sans } from './fonts'


export default function Page() {

    return (
        <div>
            <Header />
            <div className=" flex justify-between">
                <div className="p-12 flex flex-col gap-5 items-start">
                    <p className={`${prosto_one.className} text-5xl`}>
                        PRÊT RAPIDE ET <br /> FACILE POUR VOS <br /> BESOINS FINANCIERS
                    </p>
                    <p className={`${dm_sans.className} text-lg line-clamp-2`}>
                        Tout en place pour s’implifier la vie aux étudiants. Nos services de prêt offrent une expérience
                        d’emprunt simplifiée et sans tracas.
                    </p>
                    <Link title="S'inscrire" href="/../../auth/signup" />
                </div>
                <div className="flex px-16">
                    <Image
                        src={image}
                        alt="image"
                        width={900}
                        height={700}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-10 px-10 py-8 items-center bg-[#C9E4DE]/20">
                <p className={`${raleway.className} text-4xl text-green-900 font-bold`}>
                    Nos services
                </p>
                <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col gap-4 px-3 py-7 items-center border border-green-700/30 rounded-3xl">
                        <Image
                            src={vector}
                            alt="image"
                            width={50}
                            height={40}
                        />
                        <p className={`${raleway.className} text-3xl text-green-800 font-medium`}>
                            Prêteur
                        </p>
                        <p className={`${popins.className} text-lg text-gray-400 text-center`}>
                            Vous souhaitez à la fois aider les autres et faire fructifier votre argent ? Avec
                            LoanExpress vous pouvez faire les deux.
                        </p>
                        <Link title="Faire un prêt" btnVariant="btn-no-fill-gray" href="/loan/lend" />
                    </div>
                    <div className="flex flex-col gap-2 px-3 py-7 items-center border border-green-700/30 rounded-3xl">
                        <Image
                            src={vector2}
                            alt="image"
                            width={50}
                            height={40}
                        />
                        <p className={`${raleway.className} text-3xl text-green-800 font-medium`}>
                            Emprêteur
                        </p>
                        <p className={`${popins.className} text-lg text-gray-400 text-center`}>
                            Nous savons combien il est difficile d'obtenir un prêt lorsqu'on est étudiant et sans revenu
                            fixe.
                            Chez LoanExpress, les étudiants sont notre priorité.
                        </p>
                        <Link title="Emprunter" btnVariant="btn-no-fill-gray" href="/loan/borrow" />
                    </div>
                    <div className="flex flex-col gap-4 px-3 py-7 items-center border border-green-700/30 rounded-3xl">
                        <Image
                            src={vector1}
                            alt="image"
                            width={50}
                            height={40}
                        />
                        <p className={`${raleway.className} text-3xl text-green-800 font-medium`}>
                            Remboursement
                        </p>
                        <p className={`${popins.className} text-lg text-gray-400 text-center`}>
                            Chez LoanExpress, le remboursement se fait sans pression, car notre objectif est que
                            chacun y trouve son compte
                        </p>
                        <Link title="Rembourser" btnVariant="btn-no-fill-gray" href="/../../auth/login" />
                    </div>
                </div>

            </div>
            <div className="flex flex-col gap-20 py-20 ">
                <div className="flex flex-col gap-3 items-center">
                    <p className={`${raleway.className} text-4xl text-green-900 font-bold`}> Comment nous
                        travaillons ?</p>
                    <p className={`${dm_sans.className} text-lg text-gray-700 text-center`}>
                        Il s'agit d'un processus par lequel vous pouvez obtenir un prêt pour vous-même.</p>
                </div>
                <div className="flex justify-center gap-2">
                    <Image
                        src={card1}
                        alt="image"
                        width={500}
                        height={500}
                    />
                    <div className="flex flex-col gap-3 flex-none w-1/3">
                        <p className={`${raleway.className} text-3xl text-green-900 font-bold`}> Application</p>
                        <p className={`${dm_sans.className} text-lg text-gray-700 `}>
                            L'emprunteur soumet une demande de prêt sur LoanExpress. La demande comprend des
                            informations personnelles et financières et l'objet du prêt..
                        </p>
                    </div>
                </div>
                <div className="flex justify-center gap-4 ">
                    <p className={`${raleway.className} text-7xl text-[#000000]/10 font-bold`}> 02</p>

                    <div className="flex flex-col gap-3 flex-none w-1/3">
                        <p className={`${raleway.className} text-3xl text-green-900 font-bold`}> Documentation et
                            vérifications</p>
                        <p className={`${dm_sans.className} text-lg text-gray-700 `}>
                            LoanExpress vérifie les informations fournies pour évaluer la solvabilité de l'emprunteur et
                            sa
                            capacité à rembourser le prêt.
                        </p>
                    </div>
                    <Image
                        src={card2}
                        alt="image"
                        width={500}
                        height={500}
                    />
                </div>
                <div className="flex justify-center gap-4 ">
                    <Image
                        src={card3}
                        alt="image"
                        width={500}
                        height={500}
                    />
                    <div className="flex flex-col gap-3 flex-none w-1/3">
                        <p className={`${raleway.className} text-3xl text-green-900 font-bold`}>Prêt approuvé</p>
                        <p className={`${dm_sans.className} text-lg text-gray-700 `}>
                            Si l'emprunteur répond aux critères de prêt de LoanExpress, le prêt est approuvé.
                            LoanExpress détermine le montant
                            du prêt, le taux d'intérêt, la durée de remboursement et les frais associés.
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-8 px-20 py-10 bg-[#C9E4DE]/20">
                <div className="flex justify-between">
                    <p className={`${inter.className} text-green-800 font-medium`}>©2024 Création de
                        LoanExpress</p>
                    <div className="text-black text-lg flex gap-2 items-center font-bold italic">
                        <i className="bi-credit-card text-green-500 text-2xl"></i>
                        <p>LoanExpress</p>
                    </div>
                    <Link title="S'inscrire maintenant" btnVariant="btn-less-border" href="/../../auth/signup" />
                </div>
                <div className=" flex w-full py-0.5 bg-gray-200/40"></div>
                <div className="flex justify-between px-10">
                    <div className=" flex gap-8 ">
                        <p className={`${inter.className} text-green-800 font-medium`}>Accueil</p>
                        <p className={`${inter.className} text-green-800 font-medium`}>A propos</p>
                    </div>
                    <div className=" flex gap-8">
                        <i className="bi bi-facebook"></i>
                        <i className="bi bi-linkedin"></i>
                        <i className="bi bi-youtube"></i>
                        <i className="bi bi-instagram"></i>
                    </div>
                </div>
            </div>
        </div>
    )
        ;
}