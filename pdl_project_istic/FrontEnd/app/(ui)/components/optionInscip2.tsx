import Field from "./field";

interface OptionInscip2Props {
    formData: any;
    setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export default function OptionInscip2({ formData, setFormData }: OptionInscip2Props) {
    return (
        <div>
            <Field
                label="Poste"
                id="poste"
                placeholder="Entrez votre poste"
                value={formData.poste}
                onChange={(e: any) =>
                    setFormData({ ...formData, poste: e.target.value })
                }
            />
        </div>
    );
}
