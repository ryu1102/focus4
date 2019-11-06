import scroll from "smoothscroll-polyfill";
scroll.polyfill();

import * as React from "react";
import posed from "react-pose";

import {CSSProp, ScrollableContext, useTheme} from "@focus4/styling";
import {Button, ButtonTheme} from "@focus4/toolbox";

import buttonBttCss, {ButtonBttCss as BTTCss} from "./__style__/button-btt.css";
export type ButtonBttCss = BTTCss & ButtonTheme;
export {buttonBttCss};

/** Props du bouton de retour en haut de page. */
export interface ButtonBackToTopProps {
    /** CSS. */
    theme?: CSSProp<ButtonBttCss>;
}

/** Bouton de retour en haut de page. */
export const ButtonBackToTop = posed(
    React.forwardRef<HTMLDivElement, ButtonBackToTopProps>(({theme: pTheme}, ref) => {
        const {backToTop, ...theme} = useTheme<ButtonBttCss>("buttonBTT", buttonBttCss, pTheme);
        const scrollable = React.useContext(ScrollableContext);

        return (
            <div className={backToTop()} ref={ref}>
                <Button
                    accent
                    onClick={() =>
                        scrollable.scrollTo({
                            top: 0
                        })
                    }
                    icon="expand_less"
                    floating
                    theme={theme}
                />
            </div>
        );
    })
)({
    enter: {scale: 1},
    exit: {scale: 0}
});
