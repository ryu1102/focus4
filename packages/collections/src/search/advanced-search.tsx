import {observable} from "mobx";
import {observer} from "mobx-react";
import * as React from "react";

import {GroupResult, SearchStore} from "@focus4/stores";
import {CSSProp, ScrollableContext, themr, ToBem} from "@focus4/styling";
import {ChipTheme} from "@focus4/toolbox";

import {
    ActionBar,
    ActionBarCss,
    DetailProps,
    DragLayerCss,
    EmptyProps,
    LineCss,
    LineProps,
    ListCss,
    ListWrapper,
    LoadingProps,
    OperationListItem
} from "../list";
import {ChipType} from "./chip";
import {FacetBox, FacetBoxCss, FacetProps} from "./facet-box";
import {GroupCss, Results} from "./results";
import {Summary, SummaryCss} from "./summary";

import advancedSearchCss, {AdvancedSearchCss} from "./__style__/advanced-search.css";
export {advancedSearchCss, AdvancedSearchCss};
const Theme = themr("advancedSearch", advancedSearchCss);

/** Props de l'AdvancedSearch. */
export interface AdvancedSearchProps<T> {
    /** CSS de l'ActionBar. */
    actionBarTheme?: CSSProp<ActionBarCss>;
    /** Handler au clic sur le bouton "Ajouter". */
    addItemHandler?: () => void;
    /** Précise si chaque élément peut ouvrir le détail ou non. Par défaut () => true. */
    canOpenDetail?: (data: T) => boolean;
    /** Permet de supprimer le tri. Par défaut : true */
    canRemoveSort?: boolean;
    /**
     * Affiche le résultat (si non vide) de cette fonction à la place de la valeur ou de son libellé existant dans les chips.
     * @param type Le type du chip affiché (`filter` ou `facet`)
     * @param code Le code du champ affiché (filtre : `field.$field.label`, facet : `facetOutput.code`)
     * @param value La valeur du champ affiché (filtre: `field.value`, facet : `facetItem.code`)
     * @returns Le libellé à utiliser, ou `undefined` s'il faut garder le libellé existant.
     */
    chipKeyResolver?: (type: "filter" | "facet", code: string, value: string) => Promise<string | undefined>;
    /**
     * Passe le style retourné par cette fonction aux chips.
     * @param type Le type du chip affiché (`filter`, `facet`, `sort` ou `group`)
     * @param code Le code du champ affiché (filtre : `field.$field.label`, facet : `facetOutput.code`, sort : `store.sortBy`, group : `store.groupingKey`)
     * @param value La valeur du champ affiché (filtre: `field.value`, facet : `facetItem.code`, inexistant pour sort en group)
     * @returns L'objet de theme, qui sera fusionné avec le theme existant.
     */
    chipThemer?: (type: ChipType, code: string, value?: string) => ChipTheme;
    /** Composant personnalisés pour affichage d'une facette en particulier. */
    customFacetComponents?: {[facet: string]: React.ElementType<FacetProps>};
    /** Composant de détail, à afficher dans un "accordéon" au clic sur un objet. */
    DetailComponent?: React.ComponentType<DetailProps<T>>;
    /** Nombre d'éléments à partir du quel on n'affiche plus d'animation de drag and drop sur les lignes. */
    disableDragAnimThreshold?: number;
    /** Type de l'item de liste pour le drag and drop. Par défaut : "item". */
    dragItemType?: string;
    /** CSS du DragLayer. */
    dragLayerTheme?: CSSProp<DragLayerCss>;
    /** Component à afficher lorsque la liste est vide. */
    EmptyComponent?: React.ComponentType<EmptyProps<T>>;
    /** Emplacement de la FacetBox. Par défaut : "left" */
    facetBoxPosition?: "action-bar" | "left" | "sticky" | "none";
    /** CSS de la FacetBox (si position = "left") */
    facetBoxTheme?: CSSProp<FacetBoxCss>;
    /**
     * Si renseigné, affiche les facettes dans des sections nommées.
     * Il est possible d'avoir une section qui contient toutes les facettes non renseignées en ne renseignant pas la liste `facets`.
     */
    facetSections?: {name: string; facets?: string[]}[];
    /** Si renseignée, seules les facettes de cette liste pourront être sélectionnées comme groupingKey. */
    groupableFacets?: string[];
    /** Header de groupe personnalisé. */
    GroupHeader?: React.ComponentType<{group: GroupResult<T>}>;
    /** Actions de groupe par scope. */
    groupOperationList?: (group: GroupResult<T>) => OperationListItem<T[]>[];
    /** Nombre d'éléments affichés par page de groupe. Par défaut : 5. */
    groupPageSize?: number;
    /** Nombre de groupes affichés par page de liste de groupe (pagination locale, indépendante de la recherche). Par défaut: 10. */
    groupPageListSize?: number;
    /** (Scroll infini, affichage en groupe) Index du groupe, en partant du bas de la liste de groupe affichée, qui charge la page suivante dès qu'il est visible. Par défaut : 2. */
    groupPageItemIndex?: number;
    /** CSS des groupes. */
    groupTheme?: CSSProp<GroupCss>;
    /** Active le drag and drop. */
    hasDragAndDrop?: boolean;
    /** Affiche le bouton de groupe dans l'ActionBar. */
    hasGrouping?: boolean;
    /** Affiche la barre de recherche dans l'ActionBar. */
    hasSearchBar?: boolean;
    /** Autorise la sélection. */
    hasSelection?: boolean;
    /** Masque les critères de recherche dans le Summary. */
    hideSummaryCriteria?: boolean;
    /** Masque les facettes dans le Summary. */
    hideSummaryFacets?: boolean;
    /** Masque le groupe dans le Summary. */
    hideSummaryGroup?: boolean;
    /** Masque la requête dans le Summary. */
    hideSummaryQuery?: boolean;
    /** Masque le nombre de résultats dans le Summary. */
    hideSummaryResults?: boolean;
    /** Masque le tri dans le Summary. */
    hideSummarySort?: boolean;
    /** Préfixe i18n pour les libellés. Par défaut : "focus". */
    i18nPrefix?: string;
    /** Fonction pour déterminer la key à utiliser pour chaque élément de la liste. */
    itemKey: (item: T, idx: number) => string | number | undefined;
    /** Chargement manuel (à la place du scroll infini). */
    isManualFetch?: boolean;
    /** Composant de ligne. */
    LineComponent?: React.ComponentType<LineProps<T>>;
    /** La liste des actions sur chaque élément de la liste. */
    lineOperationList?: (data: T) => OperationListItem<T>[];
    /** CSS des lignes. */
    lineTheme?: CSSProp<LineCss>;
    /** Nombre d'éléments affichés par page de liste (pagination locale, indépendante de la recherche). */
    listPageSize?: number;
    /** CSS de la liste. */
    listTheme?: CSSProp<ListCss>;
    /** Composant à afficher pendant le chargement. */
    LoadingComponent?: React.ComponentType<LoadingProps<T>>;
    /** Mode des listes dans le wrapper. Par défaut : "list". */
    mode?: "list" | "mosaic";
    /** Composants de mosaïque. */
    MosaicComponent?: React.ComponentType<LineProps<T>>;
    /** Largeur des mosaïques. Par défaut : 200. */
    mosaicWidth?: number;
    /** Hauteur des mosaïques. Par défaut : 200. */
    mosaicHeight?: number;
    /** Nombre de valeurs de facettes affichées. Par défaut : 6 */
    nbDefaultDataListFacet?: number;
    /** La liste des actions globales.  */
    operationList?: OperationListItem<T[]>[];
    /** Liste des colonnes sur lesquels on peut trier. */
    orderableColumnList?: {key: string; label: string; order: boolean}[];
    /** (Scroll infini) Index de l'item, en partant du bas de la liste affichée, qui charge la page suivante dès qu'il est visible. Par défaut : 5. */
    pageItemIndex?: number;
    /** Placeholder pour la barre de recherche de l'ActionBar. */
    searchBarPlaceholder?: string;
    /** Lance la recherche à la construction du composant. Par défaut: true. */
    searchOnMount?: boolean;
    /** Affiche les facettes qui n'ont qu'une seule valeur. */
    showSingleValuedFacets?: boolean;
    /** Store associé. */
    store: SearchStore<T>;
    /** CSS du Summary. */
    summaryTheme?: CSSProp<SummaryCss>;
    /** CSS. */
    theme?: CSSProp<AdvancedSearchCss>;
    /** Utilise des ActionBar comme header de groupe, qui remplacent l'ActionBar générale. */
    useGroupActionBars?: boolean;
}

/** Composant tout intégré pour une recherche avancée, avec ActionBar, FacetBox, Summary, ListWrapper et Results. */
@observer
export class AdvancedSearch<T> extends React.Component<AdvancedSearchProps<T>> {
    static contextType = ScrollableContext;
    context!: React.ContextType<typeof ScrollableContext>;
    @observable.ref rootNode?: HTMLDivElement;

    componentWillMount() {
        const {searchOnMount = true, store} = this.props;
        if (searchOnMount) {
            store.search();
        }
    }

    protected renderFacetBox(theme: ToBem<AdvancedSearchCss>) {
        const {
            chipKeyResolver,
            chipThemer,
            customFacetComponents,
            facetBoxPosition = "left",
            facetBoxTheme,
            facetSections,
            i18nPrefix,
            nbDefaultDataListFacet,
            showSingleValuedFacets,
            store
        } = this.props;

        const facetBox = (
            <div className={theme.facetContainer()} key="facet-box">
                <FacetBox
                    chipKeyResolver={chipKeyResolver}
                    chipThemer={chipThemer}
                    customFacetComponents={customFacetComponents}
                    i18nPrefix={i18nPrefix}
                    nbDefaultDataList={nbDefaultDataListFacet}
                    sections={facetSections}
                    showSingleValuedFacets={showSingleValuedFacets}
                    store={store}
                    theme={facetBoxTheme}
                />
            </div>
        );

        if (facetBoxPosition === "left") {
            return facetBox;
        } else if (facetBoxPosition === "sticky") {
            return this.context.portal(facetBox, this.rootNode);
        } else {
            return null;
        }
    }

    protected renderListSummary() {
        const {
            canRemoveSort,
            chipKeyResolver,
            chipThemer,
            hideSummaryCriteria,
            hideSummaryFacets,
            hideSummaryGroup,
            hideSummaryQuery,
            hideSummaryResults,
            hideSummarySort,
            i18nPrefix,
            orderableColumnList,
            store,
            summaryTheme
        } = this.props;
        return (
            <Summary
                canRemoveSort={canRemoveSort}
                chipKeyResolver={chipKeyResolver}
                chipThemer={chipThemer}
                i18nPrefix={i18nPrefix}
                hideCriteria={hideSummaryCriteria}
                hideFacets={hideSummaryFacets}
                hideGroup={hideSummaryGroup}
                hideQuery={hideSummaryQuery}
                hideResults={hideSummaryResults}
                hideSort={hideSummarySort}
                orderableColumnList={orderableColumnList}
                store={store}
                theme={summaryTheme}
            />
        );
    }

    protected renderActionBar() {
        const {
            actionBarTheme,
            chipKeyResolver,
            chipThemer,
            facetBoxPosition = "left",
            groupableFacets,
            hasGrouping,
            hasSearchBar,
            hasSelection,
            i18nPrefix,
            operationList,
            orderableColumnList,
            nbDefaultDataListFacet,
            showSingleValuedFacets,
            searchBarPlaceholder,
            store,
            useGroupActionBars
        } = this.props;

        if (store.groups.length && useGroupActionBars) {
            return null;
        }

        return (
            <ActionBar
                chipKeyResolver={chipKeyResolver}
                chipThemer={chipThemer}
                groupableFacets={groupableFacets}
                hasFacetBox={facetBoxPosition === "action-bar"}
                hasGrouping={hasGrouping}
                hasSearchBar={hasSearchBar}
                hasSelection={hasSelection}
                i18nPrefix={i18nPrefix}
                nbDefaultDataListFacet={nbDefaultDataListFacet}
                operationList={operationList}
                orderableColumnList={orderableColumnList}
                searchBarPlaceholder={searchBarPlaceholder}
                showSingleValuedFacets={showSingleValuedFacets}
                store={store}
                theme={actionBarTheme}
            />
        );
    }

    protected renderResults() {
        const {
            groupTheme,
            GroupHeader,
            listTheme,
            lineTheme,
            groupOperationList,
            groupPageSize,
            groupPageListSize,
            groupPageItemIndex,
            hasSelection,
            disableDragAnimThreshold,
            i18nPrefix,
            isManualFetch,
            itemKey,
            LineComponent,
            lineOperationList,
            listPageSize,
            MosaicComponent,
            pageItemIndex,
            store,
            EmptyComponent,
            DetailComponent,
            LoadingComponent,
            canOpenDetail,
            hasDragAndDrop,
            dragItemType,
            dragLayerTheme,
            useGroupActionBars
        } = this.props;
        return (
            <Results
                canOpenDetail={canOpenDetail}
                DetailComponent={DetailComponent}
                disableDragAnimThreshold={disableDragAnimThreshold}
                dragItemType={dragItemType}
                dragLayerTheme={dragLayerTheme}
                EmptyComponent={EmptyComponent}
                GroupHeader={GroupHeader}
                groupOperationList={groupOperationList}
                groupPageSize={groupPageSize}
                groupPageListSize={groupPageListSize}
                groupPageItemIndex={groupPageItemIndex}
                groupTheme={groupTheme}
                hasDragAndDrop={hasDragAndDrop}
                hasSelection={!!hasSelection}
                i18nPrefix={i18nPrefix}
                isManualFetch={isManualFetch}
                itemKey={itemKey}
                LineComponent={LineComponent}
                lineOperationList={lineOperationList}
                lineTheme={lineTheme}
                listPageSize={listPageSize}
                listTheme={listTheme}
                LoadingComponent={LoadingComponent}
                MosaicComponent={MosaicComponent}
                pageItemIndex={pageItemIndex}
                store={store}
                useGroupActionBars={useGroupActionBars}
            />
        );
    }

    setRef = (node: HTMLDivElement) => (this.rootNode = node);

    render() {
        const {
            addItemHandler,
            facetBoxPosition = "left",
            i18nPrefix,
            LineComponent,
            MosaicComponent,
            mode,
            mosaicHeight,
            mosaicWidth
        } = this.props;
        return (
            <Theme theme={this.props.theme}>
                {theme => (
                    <div ref={this.setRef}>
                        {this.renderFacetBox(theme)}
                        <div
                            className={theme.resultContainer({
                                withFacetBox: facetBoxPosition === "sticky" || facetBoxPosition === "left"
                            })}
                        >
                            <ListWrapper
                                addItemHandler={addItemHandler}
                                canChangeMode={!!(LineComponent && MosaicComponent)}
                                i18nPrefix={i18nPrefix}
                                mode={mode || (MosaicComponent && !LineComponent) ? "mosaic" : "list"}
                                mosaicHeight={mosaicHeight}
                                mosaicWidth={mosaicWidth}
                            >
                                {this.renderListSummary()}
                                {this.renderActionBar()}
                                {this.renderResults()}
                            </ListWrapper>
                        </div>
                    </div>
                )}
            </Theme>
        );
    }
}

/**
 * Crée un composant de recherche avancée.
 * @param props Les props de l'AdvancedSearch.
 */
export function advancedSearchFor<T>(props: AdvancedSearchProps<T>) {
    return <AdvancedSearch {...props} />;
}
