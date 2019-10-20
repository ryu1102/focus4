import {motion} from "framer-motion";
import * as React from "react";

import {ScrollableContext, springTransition, useTheme} from "@focus4/styling";

import headerStyles from "./__style__/header.css";
export {headerStyles};
export type HeaderStyle = Partial<typeof headerStyles>;

/** Props du conteneur de header. */
export interface HeaderScrollingProps {
    /** Précise si le header peut se déployer ou non. */
    canDeploy?: boolean;
    /** Children. */
    children?: React.ReactNode;
    /** Classes CSS. */
    theme?: {
        deployed?: string;
        scrolling?: string;
        undeployed?: string;
        sticky?: string;
    };
}

/** Conteneur du header, gérant en particulier le dépliement et le repliement. */
export function HeaderScrolling({canDeploy, children, theme: pTheme}: HeaderScrollingProps) {
    const context = React.useContext(ScrollableContext);
    const theme = useTheme("header", headerStyles, pTheme);
    const ref = React.useRef<HTMLElement>(null);

    React.useLayoutEffect(() => context.registerHeader(motion.div, ref.current!, canDeploy), [canDeploy]);

    React.useLayoutEffect(
        () =>
            context.setHeaderProps({
                className: `${theme.scrolling} ${theme.sticky}`,
                children,
                initial: "hidden",
                animate: "visible",
                exit: "hidden",
                transition: springTransition,
                variants: {visible: {y: "0%"}, hidden: {y: "-105%"}}
            }),
        [children]
    );

    return (
        <header className={`${theme.scrolling} ${canDeploy ? theme.deployed : theme.undeployed}`} ref={ref}>
            {children}
        </header>
    );
}
