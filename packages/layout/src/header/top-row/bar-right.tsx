import * as React from "react";

import {useTheme} from "@focus4/styling";

import styles from "../__style__/header.css";

/** Props du HeaderBarRight. */
export interface HeaderBarRightProps {
    children?: React.ReactNode;
    theme?: {
        item?: string;
        right?: string;
    };
}

/** Barre du haut à droite, doit être affiché dans `HeaderTopRow`. */
export function HeaderBarRight({children, theme: pTheme}: HeaderBarRightProps) {
    const theme = useTheme("header", styles, pTheme);
    return <div className={theme.item({right: true})}>{children}</div>;
}
