import * as React from "react";
import {AppBar as AppBarType, appBarFactory, AppBarProps, AppBarTheme} from "react-toolbox/lib/app_bar/AppBar";
import {APP_BAR} from "react-toolbox/lib/identifiers";

import {fromBem, useTheme} from "@focus4/styling";
import rtAppBarTheme from "react-toolbox/components/app_bar/theme.css";
const appBarTheme: AppBarTheme = rtAppBarTheme;
export {appBarTheme};

import {IconButton} from "./button";

const RTAppBar = appBarFactory(IconButton);
export const AppBar = React.forwardRef<AppBarType, AppBarProps>((props, ref) => {
    const theme = useTheme(APP_BAR, appBarTheme, props.theme);
    return <RTAppBar ref={ref} {...props} theme={fromBem(theme)} />;
});

export {AppBarProps, AppBarTheme};
