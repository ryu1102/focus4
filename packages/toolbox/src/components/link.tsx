import * as React from "react";
import {LINK} from "react-toolbox/lib/identifiers";
import {Link as RTLink, LinkProps, LinkTheme} from "react-toolbox/lib/link/Link";

import {fromBem, useTheme} from "@focus4/styling";
import rtLinkTheme from "react-toolbox/components/link/theme.css";
const linkTheme: LinkTheme = rtLinkTheme;
export {linkTheme};

export const Link: React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<RTLink>> = React.forwardRef(
    (props, ref) => {
        const theme = useTheme(LINK, linkTheme, props.theme);
        return <RTLink ref={ref} {...props} theme={fromBem(theme)} />;
    }
);

export {LinkProps, LinkTheme};
