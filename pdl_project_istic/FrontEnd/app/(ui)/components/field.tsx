import React, { useState, useEffect } from "react";
// @ts-ignore
import Utils from "utils";
// @ts-ignore
import { dm_sans, raleway, playpen_sans } from '../../fonts';


type ComponentProps = {
    height?: string | undefined;
    label: string;
    id: string;
    value: string;
    placeholder?: string;
    type?: string;
    disabled?: boolean;
    required?: boolean;
    onChange?: (event) => void;
}

export default function Field(props: ComponentProps): JSX.Element {
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (props.required && !props.value) {
            setHasError(true);
        } else {
            setHasError(false);
        }
    }, [props.value, props.required]);

    return (
        <div className="flex flex-col gap-3">
            <label htmlFor={props.label}
                   className={`${dm_sans.className} block text-base font-medium text-gray-700`}>
                {props.label}
            </label>
            <div className="relative rounded-md">
                <input
                    required={props.required || false}
                    value={props.value}
                    type={props.type || "text"}
                    id={props.id}
                    disabled={props.disabled}
                    onChange={props.onChange}
                    className={`${playpen_sans.className} ${props.height} h-10 block w-80 rounded-md border-0 px-4 text-black/70 text-sm bg-[#C9E4DE]/30 
                    placeholder:text-gray-400 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-green-200 focus:outline-none`}
                    placeholder={props.placeholder} // Consigne alignée en haut
                />
            </div>
        </div>
    );


}
