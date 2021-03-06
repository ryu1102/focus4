// Définitions de styles manquants de libraries externes pour pouvoir compiler certains composants.

declare module "inputmask-core" {
    interface InputMaskSelection {
        start?: number;
        end?: number;
    }

    interface InputMaskFormatOptions {
        transform: (char: string) => string;
        validate: (char: string) => boolean;
    }

    interface InputMaskOptions {
        pattern: string;
        formatCharacters?: {[key: string]: InputMaskFormatOptions | null};
        placeholderChar?: string;
        value?: string;
        selection?: InputMaskSelection;
        isRevealingMask?: boolean;
    }

    export default class {
        emptyValue: string;
        selection: InputMaskSelection;

        constructor(options: InputMaskOptions);

        getRawValue(): string | undefined;
        getValue(): string | undefined;

        setPattern(pattern: string, options?: {selection?: InputMaskSelection; value?: string | undefined}): void;
        setSelection(selection: InputMaskSelection): void;
        setValue(value: string | undefined): void;

        backspace(): boolean;
        input(char: string): boolean;
        paste(input: string): boolean;
        redo(): boolean;
        undo(): boolean;
    }
}
