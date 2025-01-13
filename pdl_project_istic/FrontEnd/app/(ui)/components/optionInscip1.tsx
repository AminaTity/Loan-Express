import Field from "./field";
import Dropdown_field from "./dropdown_field";

interface OptionInscip1Props {
    formData: any;
    setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export default function OptionInscip1({ formData, setFormData }: OptionInscip1Props) {
    return (
        <div>
            <Dropdown_field
                label="Parcours"
                id="parcours"
                options={[
                    {value: 'CLASSIQUE', label: 'Classique'},
                    {value: 'ALTERNANCE', label: 'Alternance'},
                ]}
                value={formData.parcours}
                onChange={(value: string) =>
                    setFormData({...formData, parcours: value})
                }
            />
            <Dropdown_field
                label="Formation"
                id="formation"
                options={[
                    {value: 'informatique', label: 'Informatique'},
                    {value: 'biologie', label: 'Biologie'},
                ]}
                value={formData.formation}
                onChange={(value: string) =>
                    setFormData({...formData, formation: value})
                }
            />

                <Dropdown_field
                    label="Niveau"
                    id="niveau"
                    required={true}
                    options={[
                        {value: 'Licence 1', label: 'licence 1'},
                        {value: 'Licence 2', label: 'licence 2'},
                        {value: 'Licence 3', label: 'licence 3'},
                        {value: 'Master 1', label: 'master 1'},
                        {value: 'Master 2', label: 'master 2'},
                        {value: 'AUTRE', label: 'autre'},
                    ]}
                    value={formData.niveau}
                    onChange={(value: string) =>
                        setFormData({...formData, niveau: value})
                    }
                />
            </div>
            );
            }
