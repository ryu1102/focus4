import * as React from "react";

import {CSSProp, useTheme} from "@focus4/styling";

import {layoutCss, LayoutCss} from "./layout";

export function Content(props: {children?: React.ReactNode; theme?: CSSProp<LayoutCss>}) {
    const theme = useTheme("layout", layoutCss, props.theme);
    return <div className={theme.content()}>{props.children}</div>;
}
