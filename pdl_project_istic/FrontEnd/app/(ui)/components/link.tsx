interface LinkProps {
    title: string;
    href: string;
    btnVariant?: string;
}

export default function Link(props: LinkProps) {
    return (
        <a href={props.href} className={`btn ${props.btnVariant}`}>
            {props.title}
        </a>
    );
}