import {LabelProps} from "@focus4/forms";
import {Domain as TrueDomain} from "@focus4/stores";

import {DisplayProps, InputProps} from "../components";

export interface Domain<T = unknown, ICProps = InputProps, DCProps = DisplayProps, LCProps = LabelProps>
    extends TrueDomain<T, ICProps, any, any, DCProps, LCProps> {
    /** Formatteur pour l'affichage du champ en consulation. */
    displayFormatter?: (value: any) => string;

    /** Formatteur pour l'affichage du champ en édition. */
    inputFormatter?: (value: any) => string;

    /** Formatteur inverse pour convertir l'affichage du champ en la valeur (édition uniquement) */
    unformatter?: (text: string) => any;
}
