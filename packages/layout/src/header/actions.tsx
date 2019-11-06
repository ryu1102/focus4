import * as React from "react";
import posed from "react-pose";

import {CSSProp, defaultPose, getIcon, useTheme} from "@focus4/styling";
import {Button, ButtonMenu, ButtonProps, MenuItem, MenuItemProps, tooltipFactory, TooltipProps} from "@focus4/toolbox";
const TooltipButton = tooltipFactory()(Button);

import headerCss from "./__style__/header.css";

/** Action principale, affichée dans son propre bouton. */
export type PrimaryAction = ButtonProps &
    TooltipProps & {
        /** Icône custom (non material). */
        iconCustom?: boolean;
    };

/** Action secondaire, affichée dans un menu. */
export interface SecondaryAction extends MenuItemProps {
    /** Icône custom (non material). */
    iconCustom?: boolean;
}

/** Props des actions du header. */
export interface HeaderActionsProps {
    /** Préfixe i18n. Par défaut : "focus". */
    i18nPrefix?: string;
    /** Actions principales. */
    primary?: PrimaryAction[];
    /** Actions secondaires. */
    secondary?: SecondaryAction[];
    /** Pour personnaliser le bouton du menu des actions secondaires. */
    secondaryButton?: PrimaryAction;
    /** CSS. */
    theme?: CSSProp<{
        actions?: string;
    }>;
}

/** Barre d'actions du header. */
export function HeaderActions({
    i18nPrefix = "focus",
    primary = [],
    secondary = [],
    secondaryButton = {},
    theme: pTheme
}: HeaderActionsProps) {
    const theme = useTheme("header", headerCss, pTheme);
    return (
        <PosedDiv className={theme.actions()}>
            {primary.map((action, i) => {
                const FinalButton = action.tooltip ? TooltipButton : Button;
                return (
                    <FinalButton
                        key={`${i}`}
                        floating={true}
                        {...action}
                        icon={getIcon(action.icon, action.iconCustom || false)}
                    />
                );
            })}
            {secondary.length > 0 ? (
                <ButtonMenu
                    button={{
                        floating: true,
                        ...secondaryButton,
                        icon: secondaryButton.icon
                            ? getIcon(secondaryButton.icon, secondaryButton.iconCustom || false)
                            : getIcon(`${i18nPrefix}.icons.headerActions.secondary`)
                    }}
                    position="topRight"
                >
                    {secondary.map((action, i) => (
                        <MenuItem key={`${i}`} {...action} icon={getIcon(action.icon, action.iconCustom || false)} />
                    ))}
                </ButtonMenu>
            ) : null}
        </PosedDiv>
    );
}

const PosedDiv = posed.div({
    enter: {
        y: "0%",
        opacity: 1,
        ...defaultPose
    },
    exit: {
        y: "-50%",
        opacity: 0.3,
        ...defaultPose
    }
});
