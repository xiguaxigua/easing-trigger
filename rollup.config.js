// import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "./index.ts",
  plugins: [
    resolve(),
    typescript({ lib: ["es5", "es6", "dom"], target: "es5" }),
  ],
  output: [
    {
      format: "umd",
      file: "lib/index.umd.js",
      name: "EasingTrigger",
    },
    {
      format: "cjs",
      file: "lib/index.common.js",
    },
    {
      format: "esm",
      file: "lib/index.esm.js",
    },
  ],
};
