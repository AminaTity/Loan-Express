import Logo from "./logo";
import Link from "./link";
import Dropdown from "./dropdown";

const optionsInscription = [
    {value: 'Investisseur', text: 'Inscription Investisseur', link: "/auth/signup"},
    {value: 'Emprunteur', text: 'Inscription Emprunteur', link: "/auth/signup"},
]

export default function Header() {
    return (
        <div className="w-full p-5 bg-black text-white flex justify-between">
            <Logo color="text-white"/>
            <div className="flex gap-10 items-center">
                <Link title="Accueil" btnVariant="btn-no-fill-no-stroke" href="/"/>
                <Link title="Faire un prêt" btnVariant="btn-no-fill-no-stroke" href="/loan/lend"/>
                <Link title="Emprunter" btnVariant="btn-no-fill-no-stroke" href="/loan/borrow"/>
            </div>
            <div className="flex gap-4 items-center">
                <Link title="Se connecter" btnVariant="btn-no-fill" href="/auth/login"/>

                <Dropdown options={optionsInscription}/>
            </div>
        </div>
    );
}
