import * as React from "react";
import {
    Autocomplete as AutocompleteType,
    autocompleteFactory,
    AutocompleteProps,
    AutocompleteTheme
} from "react-toolbox/lib/autocomplete/Autocomplete";
import {AUTOCOMPLETE} from "react-toolbox/lib/identifiers";

import {fromBem, useTheme} from "@focus4/styling";
import rtAutocompleteTheme from "react-toolbox/components/autocomplete/theme.css";
const autocompleteTheme: AutocompleteTheme = rtAutocompleteTheme;
export {autocompleteTheme};

import {Chip} from "./chip";
import {Input} from "./input";

const RTAutocomplete = autocompleteFactory(Chip, Input);
export const Autocomplete: React.ForwardRefExoticComponent<
    AutocompleteProps & React.RefAttributes<AutocompleteType>
> = React.forwardRef((props, ref) => {
    const theme = useTheme(AUTOCOMPLETE, autocompleteTheme, props.theme);
    return <RTAutocomplete ref={ref} {...props} theme={fromBem(theme)} />;
});

export {AutocompleteProps, AutocompleteTheme};
