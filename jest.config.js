export default {
  preset: "ts-jest/presets/js-with-ts-esm",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^(\.{1,2}/.*)\.js: "",
  },
  transform: {
    "^.+\.tsx?: ["ts-jest", {
      useESM: true,
    }],
  },
};