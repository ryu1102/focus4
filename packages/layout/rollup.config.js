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
    input: "src/focus4.layout.tsx",
    plugins: [
        // @ts-ignore
        postcss({extract: true, modules: true, writeDefinitions: true}),
        typescript({abortOnError: false}),
        copy([
            {files: "src/header/**/*.css.d.ts", dest: "lib/header"},
            {files: "src/menu/**/*.css.d.ts", dest: "lib/menu"},
            {files: "src/presentation/**/*.css.d.ts", dest: "lib/presentation"},
            {files: "src/scrollable/**/*.css.d.ts", dest: "lib/scrollable"},
            {files: "src/utils/**/*.css.d.ts", dest: "lib/utils"}
        ]),
        abortOnError
    ],
    treeshake: {
        moduleSideEffects: ["intersection-observer"]
    },
    output: {
        format: "esm",
        file: "lib/focus4.layout.js"
    },
    external: [
        ...Object.keys(pkg.dependencies || {}),
        "framer-motion",
        "i18next",
        "lodash",
        "mobx",
        "mobx-react",
        "mobx-react-lite",
        "moment",
        "popmotion",
        "react",
        "react-dom",
        "stylefire",
        "tslib"
    ],
    onwarn
};
export default config;
