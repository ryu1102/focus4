// @ts-check
// @ts-ignore
import pkg from "./package.json";
import {onwarn, abortOnError} from "../../scripts/rollup";

import fs from "fs";
import glob from "glob";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss-modules";
import copy from "rollup-plugin-copy-glob";

// initialize CSS files because of a catch-22 situation: https://github.com/rollup/rollup/issues/1404
glob.sync("src/**/*.css").forEach(css => {
    // Use forEach because https://github.com/rollup/rollup/issues/1873
    const definition = `${css}.d.ts`;
    if (!fs.existsSync(definition)) fs.writeFileSync(definition, "const mod: any\nexport default mod\n");
});

/** @type {import("rollup").RollupOptions} */
const config = {
    input: "src/focus4.collections.ts",
    plugins: [
        // @ts-ignore
        postcss({extract: true, modules: true, writeDefinitions: true}),
        typescript({abortOnError: false}),
        copy([
            {files: "src/list/**/*.css.d.ts", dest: "lib/list"},
            {files: "src/search/**/*.css.d.ts", dest: "lib/search"}
        ]),
        abortOnError
    ],
    treeshake: {
        moduleSideEffects: false
    },
    output: {
        format: "esm",
        file: "lib/focus4.collections.js"
    },
    external: [
        ...Object.keys(pkg.dependencies || {}),
        "framer-motion",
        "i18next",
        "lodash",
        "mobx",
        "mobx-react",
        "mobx-react-lite",
        "react",
        "tslib"
    ],
    onwarn
};

export default config;
