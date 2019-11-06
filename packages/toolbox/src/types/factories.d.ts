import {AppBar} from "react-toolbox/lib/app_bar";
import {AvatarProps} from "react-toolbox/lib/avatar";
import {Button, BrowseButton, IconButton, IconButtonProps, ButtonProps} from "react-toolbox/lib/button";
import {CardTitle} from "react-toolbox/lib/card";
import {Checkbox, CheckboxProps} from "react-toolbox/lib/checkbox";
import {ChipProps} from "react-toolbox/lib/chip";
import {Dropdown} from "react-toolbox/lib/dropdown";
import {FontIconProps} from "react-toolbox/lib/font_icon";
import {InputProps} from "react-toolbox/lib/input";
import {LinkProps} from "react-toolbox/lib/link";
import {
    List,
    ListCheckbox,
    ListItem,
    ListItemActions,
    ListItemContent,
    ListItemLayout,
    ListItemProps,
    ListItemContentProps,
    ListItemLayoutProps,
    ListItemActionProps,
    ListItemTextProps,
    ListItemActionsProps
} from "react-toolbox/lib/list";
import {MenuItem, MenuItemProps, Menu, MenuProps} from "react-toolbox/lib/menu";
import {Navigation} from "react-toolbox/lib/navigation";
import {ProgressBarProps} from "react-toolbox/lib/progress_bar";
import {RadioButton, RadioButtonProps, RadioGroup} from "react-toolbox/lib/radio";
import {Slider} from "react-toolbox/lib/slider";
import {Snackbar} from "react-toolbox/lib/snackbar";
import {Switch} from "react-toolbox/lib/switch";
import {Tab, Tabs, TabProps} from "react-toolbox/lib/tabs";
import {TabContentProps} from "react-toolbox/lib/tabs/TabContent";

declare module "react-toolbox/lib/app_bar/AppBar" {
    export function appBarFactory(IconButton: React.ComponentType<IconButtonProps>): typeof AppBar;
}
declare module "react-toolbox/lib/autocomplete/Autocomplete" {
    export function autocompleteFactory(
        Chip: React.ComponentType<ChipProps>,
        Input: React.ComponentType<InputProps>
    ): typeof Autocomplete;
}
declare module "react-toolbox/lib/avatar/Avatar" {
    export function avatarFactory(FontIcon: React.ComponentType<FontIconProps>): typeof Avatar;
}
declare module "react-toolbox/lib/button/Button" {
    export function buttonFactory(Ripple: any, FontIcon: React.ComponentType<FontIconProps>): typeof Button;
}
declare module "react-toolbox/lib/button/BrowseButton" {
    export function browseButtonFactory(Ripple: any, FontIcon: React.ComponentType<FontIconProps>): typeof BrowseButton;
}
declare module "react-toolbox/lib/button/IconButton" {
    export function iconButtonFactory(Ripple: any, FontIcon: React.ComponentType<FontIconProps>): typeof IconButton;
}
declare module "react-toolbox/lib/card/CardTitle" {
    export function cardTitleFactory(Avatar: React.ComponentType<AvatarProps>): typeof CardTitle;
}
declare module "react-toolbox/lib/checkbox/Checkbox" {
    export function checkboxFactory(Check: any): typeof Checkbox;
}
declare module "react-toolbox/lib/chip/Chip" {
    export function chipFactory(Avatar: React.ComponentType<AvatarProps>): typeof Chip;
}
declare module "react-toolbox/lib/dropdown/Dropdown" {
    export function dropdownFactory(Input: React.ComponentType<InputProps>): typeof Dropdown;
}
declare module "react-toolbox/lib/input/Input" {
    export function inputFactory(FontIcon: React.ComponentType<FontIconProps>): typeof Input;
}
declare module "react-toolbox/lib/list/List" {
    export function listFactory(ListItem: React.ComponentType<ListItemProps>): typeof List;
}
declare module "react-toolbox/lib/list/ListCheckbox" {
    export function listCheckboxFactory(
        Checkbox: React.ComponentType<CheckboxProps>,
        ListItemContent: React.ComponentType<ListItemContentProps>
    ): typeof ListCheckbox;
}
declare module "react-toolbox/lib/list/ListItem" {
    export function listItemFactory(
        Ripple: any,
        ListItemLayout: React.ComponentType<ListItemLayoutProps>,
        ListItemContent: React.ComponentType<ListItemContentProps>
    ): typeof ListItem;
}
declare module "react-toolbox/lib/list/ListItemActions" {
    export function listItemActionsFactory(
        ListItemAction: React.ComponentType<ListItemActionProps>
    ): typeof ListItemActions;
}
declare module "react-toolbox/lib/list/ListItemContent" {
    export function listItemContentFactory(
        ListItemText: React.ComponentType<ListItemTextProps>
    ): typeof ListItemContent;
}
declare module "react-toolbox/lib/list/ListItemLayout" {
    export function listItemLayoutFactory(
        Avatar: React.ComponentType<AvatarProps>,
        ListItemContent: React.ComponentType<ListItemContentProps>,
        ListItemActions: React.ComponentType<ListItemActionsProps>
    ): typeof ListItemLayout;
}
declare module "react-toolbox/lib/menu/MenuItem" {
    export function menuItemFactory(Ripple: any): typeof MenuItem;
}
declare module "react-toolbox/lib/menu/Menu" {
    export function menuFactory(MenuItem: React.ComponentType<MenuItemProps>): typeof Menu;
}
declare module "react-toolbox/lib/menu/IconMenu" {
    export function iconMenuFactory(
        IconButton: React.ComponentType<IconButtonProps>,
        Menu: React.ComponentType<MenuProps>
    ): typeof IconMenu;
}
declare module "react-toolbox/lib/navigation/Navigation" {
    export function navigationFactory(
        Button: React.ComponentType<ButtonProps>,
        Link: React.ComponentType<LinkProps>
    ): typeof Navigation;
}
declare module "react-toolbox/lib/radio/RadioButton" {
    export function radioButtonFactory(Radio: any): typeof RadioButton;
}
declare module "react-toolbox/lib/radio/RadioGroup" {
    export function radioGroupFactory(RadioButton: React.ComponentType<RadioButtonProps>): typeof RadioGroup;
}
declare module "react-toolbox/lib/slider/Slider" {
    export function sliderFactory(
        ProgressBar: React.ComponentType<ProgressBarProps>,
        Input: React.ComponentType<InputProps>
    ): typeof Slider;
}
declare module "react-toolbox/lib/snackbar/Snackbar" {
    export function snackbarFactory(Button: React.ComponentType<ButtonProps>): typeof Snackbar;
}
declare module "react-toolbox/lib/switch/Switch" {
    export function switchFactory(Thumb: any): typeof Switch;
}
declare module "react-toolbox/lib/tabs/Tab" {
    export function tabFactory(Ripple: any, FontIcon: React.ComponentType<FontIconProps>): typeof Tab;
}
declare module "react-toolbox/lib/tabs/Tabs" {
    export function tabsFactory(
        Tab: React.ComponentType<TabProps>,
        TabContent: React.ComponentType<TabContentProps>,
        FontIcon: React.ComponentType<FontIconProps>
    ): typeof Tabs;
}
