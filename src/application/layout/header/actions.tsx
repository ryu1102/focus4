import {observer} from "mobx-react";
import * as React from "react";
import {Button} from "react-toolbox/lib/button";
import Tooltip from "react-toolbox/lib/tooltip";

import {ButtonMenu, getIcon, MenuItem} from "../../../components";

import {applicationStore} from "../../store";

const TooltipButton = Tooltip(Button);

/** Barre d'actions du header. */
export const HeaderActions = observer<{className: string, i18nPrefix?: string}>(
    ({className: cName, i18nPrefix = "focus"}) => {
        const {actions} = applicationStore;
        return (
            <div className={cName}>
                {actions.primary.map((action, i) => {
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
                {actions.secondary && actions.secondary.length > 0 ?
                    <ButtonMenu
                        button={{
                            floating: true,
                            icon: getIcon(`${i18nPrefix}.icons.headerActions.secondary`)
                        }}
                    >
                        {actions.secondary.map((action, i) => <MenuItem key={`${i}`} {...action} icon={getIcon(action.icon, action.iconCustom || false)}  />)}
                    </ButtonMenu>
                : null}
            </div>
        );
    }
);
