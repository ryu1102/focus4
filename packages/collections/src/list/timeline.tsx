import {observer} from "mobx-react";
import * as React from "react";

import {EntityField, FieldEntry} from "@focus4/stores";
import {themr} from "@focus4/styling";

import {LineProps, LineWrapper} from "./line";
import {ListBase, ListBaseProps, listCss} from "./list-base";

const Theme = themr("list", listCss);

/** Props du composant de TimeLine. */
export interface TimelineProps<T> extends ListBaseProps<T> {
    /** Les données. */
    data: T[];
    /** Le sélecteur du champ contenant la date. */
    dateSelector: (data: T) => EntityField<FieldEntry<string>>;
    /** Le composant de ligne. */
    TimelineComponent: React.ComponentType<LineProps<T>>;
}

/** Composant affichant une liste sous forme de Timeline. */
@observer
export class Timeline<T> extends ListBase<T, TimelineProps<T>> {
    get data() {
        return this.props.data;
    }

    private renderLines() {
        const {lineTheme, itemKey, TimelineComponent, dateSelector, pageItemIndex = 5} = this.props;
        return this.displayedData.map((item, idx) => (
            <LineWrapper
                key={itemKey(item, idx)}
                data={item}
                dateSelector={dateSelector}
                domRef={
                    this.displayedData.length - idx === pageItemIndex ||
                    (this.displayedData.length < pageItemIndex && this.displayedData.length - 1 === idx)
                        ? this.registerSentinel
                        : undefined
                }
                LineComponent={TimelineComponent}
                theme={lineTheme}
                type="timeline"
            />
        ));
    }

    render() {
        return (
            <Theme theme={this.props.theme}>
                {theme => (
                    <ul className={theme.timeline()}>
                        {this.renderLines()}
                        {this.renderBottomRow(theme)}
                    </ul>
                )}
            </Theme>
        );
    }
}

/**
 * Crée un composant affichant une liste sous forme de Timeline.
 * @param props Les props de la timeline.
 */
export function timelineFor<T>(props: TimelineProps<T>) {
    return <Timeline {...props} />;
}
