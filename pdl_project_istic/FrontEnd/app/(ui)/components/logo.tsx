interface LogoProps {
    color?: string;
}

export default function Logo(props: LogoProps) {
    return (
        <div className="flex gap-2 items-center ">
            <i className="bi-credit-card text-green-500 text-2xl"></i>
            <p className={`text-lg font-bold italic ${props.color}`}>LoanExpress</p>
        </div>
    );
}