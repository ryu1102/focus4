import i18next from "i18next";
import * as React from "react";

import {CSSToStrings, getIcon, themr} from "@focus4/styling";
import {FontIcon, tooltipFactory} from "@focus4/toolbox";
const TooltipIcon = tooltipFactory()(FontIcon);

import labelStyles, {LabelCss} from "./__style__/label.css";
export {labelStyles};
export type LabelStyle = CSSToStrings<LabelCss>;
const Theme = themr("label", labelStyles);

/** Props du Label. */
export interface LabelProps {
    /** Commentaire, affiché sur la tooltip */
    comment?: React.ReactNode;
    /** Pour l'icône de la tooltip. Par défaut : "focus". */
    i18nPrefix?: string;
    /** Libellé. */
    label?: string;
    /** Nom du champ associé */
    name?: string;
    /** Au click sur la tooltip. */
    onTooltipClick?: () => void;
    /** Affiche la tooltip. */
    showTooltip?: boolean;
    /** Style inline. */
    style?: React.CSSProperties;
    /** CSS. */
    theme?: LabelStyle;
}

export function Label({
    comment,
    i18nPrefix = "focus",
    label,
    name,
    onTooltipClick,
    showTooltip,
    style,
    theme: pTheme
}: LabelProps) {
    return (
        <Theme theme={pTheme}>
            {theme => (
                <div className={theme.label()} style={style}>
                    <label htmlFor={name}>{(label && i18next.t(label)) || ""}</label>
                    {comment && showTooltip ? (
                        <TooltipIcon
                            className={theme.icon({clickable: !!onTooltipClick})}
                            tooltipHideOnClick={!onTooltipClick}
                            onClick={onTooltipClick}
                            tooltip={typeof comment === "string" ? i18next.t(comment) : comment}
                            value={getIcon(`${i18nPrefix}.icons.label.tooltip`)}
                        />
                    ) : null}
                </div>
            )}
        </Theme>
    );
}
