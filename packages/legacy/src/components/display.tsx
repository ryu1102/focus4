import {observable} from "mobx";
import {observer} from "mobx-react";
import * as React from "react";

import {DisplayCss, displayCss} from "@focus4/forms";
import {CSSProp, themr} from "@focus4/styling";

const Theme = themr("display", displayCss);

/** Props du composant d'affichage. */
export interface DisplayProps {
    /** Formatteur. */
    formatter?: (value: any) => string;
    /** Service de résolution de code. */
    keyResolver?: (key: any) => Promise<string>;
    /** Nom de la propriété de libellé, pour liste de référence. */
    labelKey?: string;
    /** CSS. */
    theme?: CSSProp<DisplayCss>;
    /** Valeur à afficher. */
    value?: any;
    /** Nom de la propriété de libellé, pour liste de référence. */
    valueKey?: string;
    /** Liste des valeurs de référence. */
    values?: {}[];
}

/** Composant d'affichage par défaut, gère la résolution de la valeur par liste de référence ou par service. */
@observer
export class Display extends React.Component<DisplayProps> {
    @observable value?: any;

    componentWillMount() {
        this.load(this.props);
    }

    componentWillReceiveProps(props: DisplayProps) {
        if (props.value !== this.props.value) {
            this.load(props);
        }
    }

    async load({value, keyResolver}: DisplayProps) {
        if (value && keyResolver) {
            this.value = (await keyResolver(value)) || value;
        } else {
            this.value = value;
        }
    }

    render() {
        const {valueKey = "code", labelKey = "label", values, value, formatter} = this.props;
        // tslint:disable-next-line:triple-equals ---> Le "==" est volontaire pour convertir un éventuel ID de type string (comme celui donné par un Select) en number.
        const ref = values && values.find(v => (v as any)[valueKey] == value);
        const displayed = (ref && (ref as any)[labelKey]) || this.value;
        return (
            <Theme theme={this.props.theme}>
                {theme => (
                    <div data-focus="display" className={theme.display()}>
                        {(formatter && formatter(displayed)) || displayed}
                    </div>
                )}
            </Theme>
        );
    }
}
