import React, { useEffect } from "react";
// @ts-ignore
import Utils from "./utils";
import { BsXCircleFill } from "react-icons/bs";
import {playpen_sans} from "@/app/fonts";

// Props definition
type ComponentProps = {
    required?: boolean;
    value: string;
    placeholder?: string;
    disabled?: boolean;
    onChange?: (event) => void;
}

// Component definition
export default function EmailInput(props: ComponentProps): JSX.Element {
    // Methods
    useEffect(() => {
        const emailInput = document.getElementById('email-input');
        if (props.value != '' && !Utils.isEmailValid(props.value)) {
            emailInput!.style.color = "red";
        } else {
            emailInput!.style.color = "black";
        }
    }, [props.value]);
    // Rendering
    return (
        <>
            <input
                required={props.required || false}
                type="email"
                name="email"
                id="email-input"
                autoComplete="email"
                disabled={props.disabled}
                value={props.value}
                onChange={props.onChange}
                className={`${playpen_sans.className}  h-10 block w-80 rounded-md border-0 px-4 text-black/70 text-sm bg-[#C9E4DE]/30 
                    placeholder:text-gray-400 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-green-200 focus:outline-none`}
                placeholder={props.placeholder}
            />
            {props.value != '' && !Utils.isEmailValid(props.value) ?
                <small className="input-error-span">
                    <BsXCircleFill />
                    Cette adresse email n'est pas valide.

                </small>
                : null
            }
        </>
    );
}
