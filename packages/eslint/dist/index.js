import { createRequire } from "node:module";
import path from "node:path";
import process from "node:process";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
//#endregion
//#region src/antfu.ts
var antfu_exports = /* @__PURE__ */ __exportAll({});
import * as import__antfu_eslint_config from "@antfu/eslint-config";
__reExport(antfu_exports, import__antfu_eslint_config);
//#endregion
//#region src/defaults.ts
const INLINE_ELEMENTS = [
	"a",
	"abbr",
	"audio",
	"b",
	"bdi",
	"bdo",
	"canvas",
	"cite",
	"code",
	"data",
	"del",
	"dfn",
	"em",
	"i",
	"iframe",
	"ins",
	"kbd",
	"label",
	"map",
	"mark",
	"noscript",
	"object",
	"output",
	"picture",
	"q",
	"ruby",
	"s",
	"samp",
	"small",
	"span",
	"strong",
	"sub",
	"sup",
	"svg",
	"time",
	"u",
	"var",
	"video"
];
const nestjsTypeScriptRules = {
	"ts/explicit-function-return-type": "off",
	"ts/explicit-module-boundary-types": "off",
	"ts/no-explicit-any": "off",
	"ts/no-parameter-properties": "off",
	"ts/no-empty-function": ["error", { allow: [
		"decoratedFunctions",
		"overrideMethods",
		"private-constructors",
		"protected-constructors"
	] }],
	"ts/no-empty-interface": "off",
	"ts/no-namespace": ["error", {
		allowDeclarations: true,
		allowDefinitionFiles: true
	}],
	"ts/ban-types": ["error", {
		extendDefaults: true,
		types: { Function: false }
	}]
};
function isMiniProgramEnabled(opts) {
	return opts?.miniProgram === true || opts?.weapp === true;
}
function getDefaultVueOptions(opts) {
	const overrides = {
		"vue/attribute-hyphenation": "off",
		"vue/v-on-event-hyphenation": "off",
		"vue/custom-event-name-casing": "off",
		"vue/no-mutating-props": "warn",
		"vue/no-useless-v-bind": ["error", {
			ignoreIncludesComment: false,
			ignoreStringEscape: true
		}],
		"vue/no-unused-refs": "warn"
	};
	if (opts?.ionic) overrides["vue/no-deprecated-slot-attribute"] = "off";
	if (isMiniProgramEnabled(opts)) overrides["vue/singleline-html-element-content-newline"] = ["warn", {
		ignoreWhenNoAttributes: true,
		ignoreWhenEmpty: true,
		ignores: ["text", ...INLINE_ELEMENTS],
		externalIgnores: []
	}];
	return { overrides };
}
function getDefaultTypescriptOptions(opts) {
	const overrides = {
		"ts/no-unused-vars": ["error", {
			args: "all",
			argsIgnorePattern: "^_",
			caughtErrors: "all",
			caughtErrorsIgnorePattern: "^_",
			destructuredArrayIgnorePattern: "^_",
			varsIgnorePattern: "^_",
			ignoreRestSiblings: true
		}],
		"ts/prefer-ts-expect-error": "off",
		"ts/ban-ts-comment": "off",
		"ts/no-use-before-define": "warn",
		"ts/no-unused-expressions": ["error", {
			allowShortCircuit: true,
			allowTernary: true
		}]
	};
	if (opts?.nestjs) Object.assign(overrides, nestjsTypeScriptRules);
	return { overrides };
}
//#endregion
//#region src/utils.ts
const require$1 = createRequire(import.meta.url);
const PACKAGE_DIR = path.dirname(fileURLToPath(import.meta.url));
function isObject(o) {
	return Object.prototype.toString.call(o) === "[object Object]";
}
function isPackageAvailable$1(name, searchPaths = [process.cwd(), PACKAGE_DIR]) {
	try {
		require$1.resolve(name, { paths: searchPaths });
		return true;
	} catch {
		const packageSegments = name.split("/");
		return searchPaths.some((searchPath) => {
			let currentDir = path.resolve(searchPath);
			while (true) {
				const packageJsonPath = path.join(currentDir, "node_modules", ...packageSegments, "package.json");
				if (fs.existsSync(packageJsonPath)) return true;
				const parentDir = path.dirname(currentDir);
				if (parentDir === currentDir) return false;
				currentDir = parentDir;
			}
		});
	}
}
function hasAllPackages(names, searchPaths) {
	return names.every((name) => isPackageAvailable$1(name, searchPaths));
}
//#endregion
//#region src/features.ts
const BETTER_TAILWIND_PACKAGES = ["eslint-plugin-better-tailwindcss"];
const TAILWIND_PACKAGES = ["eslint-plugin-tailwindcss"];
const STYLELINT_BRIDGE_PACKAGES = ["eslint-plugin-better-stylelint"];
const MDX_PACKAGES = ["eslint-plugin-mdx"];
const VUE_A11Y_PACKAGES = ["eslint-plugin-vuejs-accessibility"];
const REACT_A11Y_PACKAGES = ["eslint-plugin-jsx-a11y"];
const QUERY_PACKAGES = ["@tanstack/eslint-plugin-query"];
const BETTER_TAILWIND_FILES = ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx,vue,html,md,mdx,astro,svelte}"];
const BETTER_TAILWIND_IGNORES = [
	"**/*.json",
	"**/*.json5",
	"**/*.yaml",
	"**/*.yml",
	"**/*.{lock,lockb}",
	"**/package.json",
	"**/package-lock.json",
	"**/pnpm-lock.yaml",
	"**/yarn.lock",
	"**/bun.lock",
	"**/bun.lockb",
	"**/composer.lock",
	"**/Cargo.lock",
	"**/Gemfile.lock",
	"**/go.sum"
];
function resolveStylelintConfigLoader(moduleUrl = import.meta.url) {
	return moduleUrl.endsWith(".ts") ? new URL("./stylelint.ts", moduleUrl).href : new URL("./stylelint.js", moduleUrl).href;
}
function resolveTailwindPresets(option) {
	if (!option) return [];
	if (typeof option === "object") {
		if (!hasAllPackages(BETTER_TAILWIND_PACKAGES)) return [];
		return [(0, antfu_exports.interopDefault)(import("eslint-plugin-better-tailwindcss")).then((eslintPluginBetterTailwindcss) => {
			const cwd = option.cwd ?? (option.entryPoint ? path.dirname(option.entryPoint) : void 0) ?? process.cwd();
			const betterTailwindcssRules = {
				...eslintPluginBetterTailwindcss.configs["recommended-warn"].rules,
				...eslintPluginBetterTailwindcss.configs["recommended-error"].rules
			};
			return {
				name: "icebreaker/better-tailwindcss",
				files: BETTER_TAILWIND_FILES,
				ignores: BETTER_TAILWIND_IGNORES,
				plugins: { "better-tailwindcss": eslintPluginBetterTailwindcss },
				rules: betterTailwindcssRules,
				settings: { "better-tailwindcss": {
					cwd,
					entryPoint: option.entryPoint,
					tailwindConfig: option.tailwindConfig
				} }
			};
		})];
	}
	if (!hasAllPackages(TAILWIND_PACKAGES)) return [];
	return [(0, antfu_exports.interopDefault)(import("eslint-plugin-tailwindcss")).then((tailwind) => {
		return tailwind.configs["flat/recommended"];
	}), { rules: { "tailwindcss/no-custom-classname": "off" } }];
}
function resolveStylelintBridgeOptions(option) {
	const { cwd, ...stylelintConfigOptions } = typeof option === "object" ? option : {};
	return {
		...cwd ? { cwd } : {},
		configLoader: resolveStylelintConfigLoader(),
		configOptions: stylelintConfigOptions
	};
}
function resolveStylelintBridgePresets(option) {
	if (!option) return [];
	if (!hasAllPackages(STYLELINT_BRIDGE_PACKAGES)) return [];
	const pluginModulePromise = import("eslint-plugin-better-stylelint");
	const stylelintOptions = resolveStylelintBridgeOptions(option);
	return [
		pluginModulePromise.then((pluginModule) => {
			return {
				files: ["**/*.{css,pcss,postcss}"],
				plugins: { stylelint: pluginModule.default },
				processor: pluginModule.createStylelintProcessor(stylelintOptions)
			};
		}),
		pluginModulePromise.then((pluginModule) => {
			return {
				files: ["**/*.{scss,sass}"],
				plugins: { stylelint: pluginModule.default },
				processor: pluginModule.createStylelintProcessor(stylelintOptions)
			};
		}),
		pluginModulePromise.then((pluginModule) => {
			return {
				files: ["**/*.vue"],
				plugins: { stylelint: pluginModule.default },
				rules: { "stylelint/stylelint": ["error", stylelintOptions] }
			};
		})
	];
}
function resolveMdxPresets(isEnabled) {
	if (!isEnabled) return [];
	if (!hasAllPackages(MDX_PACKAGES)) return [];
	return [(0, antfu_exports.interopDefault)(import("eslint-plugin-mdx")).then((mdx) => {
		return [{
			...mdx.flat,
			processor: mdx.createRemarkProcessor({
				lintCodeBlocks: true,
				languageMapper: {}
			})
		}, {
			...mdx.flatCodeBlocks,
			rules: { ...mdx.flatCodeBlocks.rules }
		}];
	})];
}
function resolveAccessibilityPresets(isEnabled, vueOption, reactOption) {
	if (!isEnabled) return [];
	const presets = [];
	if (vueOption && hasAllPackages(VUE_A11Y_PACKAGES)) presets.push((0, antfu_exports.interopDefault)(import("eslint-plugin-vuejs-accessibility")).then((pluginVueA11y) => {
		return pluginVueA11y.configs["flat/recommended"];
	}));
	if (reactOption && hasAllPackages(REACT_A11Y_PACKAGES)) presets.push((0, antfu_exports.interopDefault)(import("eslint-plugin-jsx-a11y")).then((jsxA11y) => {
		return jsxA11y.flatConfigs.recommended;
	}));
	return presets;
}
function resolveNestPresets(isEnabled) {
	if (!isEnabled) return [];
	return [{
		name: "icebreaker/nestjs/rules",
		rules: nestjsTypeScriptRules
	}];
}
function resolveQueryPresets(isEnabled) {
	if (!isEnabled) return [];
	if (!hasAllPackages(QUERY_PACKAGES)) return [];
	return [(0, antfu_exports.interopDefault)(import("@tanstack/eslint-plugin-query")).then((pluginQuery) => pluginQuery.configs["flat/recommended"])];
}
//#endregion
//#region ../../node_modules/.pnpm/defu@6.1.7/node_modules/defu/dist/defu.mjs
function isPlainObject$1(value) {
	if (value === null || typeof value !== "object") return false;
	const prototype = Object.getPrototypeOf(value);
	if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) return false;
	if (Symbol.iterator in value) return false;
	if (Symbol.toStringTag in value) return Object.prototype.toString.call(value) === "[object Module]";
	return true;
}
function _defu(baseObject, defaults, namespace = ".", merger) {
	if (!isPlainObject$1(defaults)) return _defu(baseObject, {}, namespace, merger);
	const object = { ...defaults };
	for (const key of Object.keys(baseObject)) {
		if (key === "__proto__" || key === "constructor") continue;
		const value = baseObject[key];
		if (value === null || value === void 0) continue;
		if (merger && merger(object, key, value, namespace)) continue;
		if (Array.isArray(value) && Array.isArray(object[key])) object[key] = [...value, ...object[key]];
		else if (isPlainObject$1(value) && isPlainObject$1(object[key])) object[key] = _defu(value, object[key], (namespace ? `${namespace}.` : "") + key.toString(), merger);
		else object[key] = value;
	}
	return object;
}
function createDefu(merger) {
	return (...arguments_) => arguments_.reduce((p, c) => _defu(p, c, "", merger), {});
}
const defu = createDefu();
createDefu((object, key, currentValue) => {
	if (object[key] !== void 0 && typeof currentValue === "function") {
		object[key] = currentValue(object[key]);
		return true;
	}
});
createDefu((object, key, currentValue) => {
	if (Array.isArray(object[key]) && typeof currentValue === "function") {
		object[key] = currentValue(object[key]);
		return true;
	}
});
//#endregion
//#region src/options.ts
const BASE_DEFAULTS = {
	formatters: true,
	pnpm: false,
	javascript: { overrides: {
		"curly": ["error", "all"],
		"no-console": ["warn"]
	} },
	test: { overrides: { "test/prefer-lowercase-title": ["off"] } }
};
const BASE_RULES = {
	"dot-notation": "off",
	"e18e/ban-dependencies": ["warn", { allowed: ["axios", "lint-staged"] }],
	"e18e/prefer-array-to-sorted": "off",
	"pnpm/json-enforce-catalog": "off",
	"pnpm/json-prefer-workspace-settings": "off",
	"pnpm/json-valid-catalog": "off",
	"pnpm/yaml-enforce-settings": "off",
	"pnpm/yaml-no-duplicate-catalog-item": "off",
	"pnpm/yaml-no-unused-catalog-item": "off",
	"unused-imports/no-unused-vars": "off",
	"unicorn/prefer-number-properties": "warn"
};
const require = createRequire(import.meta.url);
const ANTFU_PACKAGE_DIR = path.dirname(require.resolve("@antfu/eslint-config/package.json"));
const GENERAL_EDITORCONFIG_SECTIONS = new Set([
	"*",
	"**",
	"**/*",
	"*.*",
	"**.*",
	"**/*.*"
]);
const NEWLINE_PATTERN = /\r?\n/u;
function mergeOptionWithDefaults(input, defaults, options = {}) {
	const { postProcess, useDefaultWhenUndefined = false } = options;
	if (input === true || useDefaultWhenUndefined && input === void 0) {
		postProcess?.(defaults);
		return defaults;
	}
	if (isObject(input)) {
		const merged = defu(input, defaults);
		postProcess?.(merged);
		return merged;
	}
	return input;
}
function applyVueVersionSpecificRules(option) {
	if (!option || typeof option !== "object") return;
	const overrides = option.overrides;
	if (!overrides) return;
	if (option.vueVersion === 2) {
		Object.assign(overrides, {
			"vue/no-v-for-template-key-on-child": "off",
			"vue/no-v-for-template-key": "error",
			"vue/no-deprecated-v-bind-sync": "off"
		});
		return;
	}
	Object.assign(overrides, {
		"vue/no-v-for-template-key-on-child": "error",
		"vue/no-v-for-template-key": "off"
	});
}
function isPackageAvailable(name, paths) {
	try {
		require.resolve(name, paths ? { paths } : void 0);
		return true;
	} catch {
		return false;
	}
}
function getDefaultFormatterOptions(cwd = process.cwd()) {
	const hasXmlPlugin = isPackageAvailable("@prettier/plugin-xml", [ANTFU_PACKAGE_DIR]);
	const hasSlidev = isPackageAvailable("@slidev/cli", [cwd]);
	return {
		astro: isPackageAvailable("prettier-plugin-astro", [ANTFU_PACKAGE_DIR]),
		css: true,
		graphql: true,
		html: true,
		markdown: true,
		slidev: hasSlidev,
		svg: hasXmlPlugin,
		xml: hasXmlPlugin
	};
}
function normalizeEditorConfigEndOfLine(value) {
	switch (value.trim().toLowerCase()) {
		case "cr":
		case "crlf":
		case "lf": return value.trim().toLowerCase();
		default: return;
	}
}
function isGeneralEditorConfigSection(section) {
	return GENERAL_EDITORCONFIG_SECTIONS.has(section.trim());
}
function parseEditorConfig(filePath) {
	const lines = fs.readFileSync(filePath, "utf8").split(NEWLINE_PATTERN);
	let currentSection;
	let endOfLine;
	let isRoot = false;
	for (const rawLine of lines) {
		const line = rawLine.trim();
		if (!line || line.startsWith("#") || line.startsWith(";")) continue;
		if (line.startsWith("[") && line.endsWith("]")) {
			currentSection = line.slice(1, -1).trim();
			continue;
		}
		const separatorIndex = line.indexOf("=");
		if (separatorIndex === -1) continue;
		const key = line.slice(0, separatorIndex).trim().toLowerCase();
		const value = line.slice(separatorIndex + 1).trim();
		if (!currentSection && key === "root") {
			isRoot = value.toLowerCase() === "true";
			continue;
		}
		if (key !== "end_of_line") continue;
		const normalized = normalizeEditorConfigEndOfLine(value);
		if (!normalized) continue;
		if (!currentSection || isGeneralEditorConfigSection(currentSection)) endOfLine = normalized;
	}
	return endOfLine ? {
		endOfLine,
		isRoot
	} : { isRoot };
}
function inferPrettierEndOfLineFromEditorConfig(cwd = process.cwd()) {
	const configs = [];
	let currentDir = path.resolve(cwd);
	while (true) {
		const editorConfigPath = path.join(currentDir, ".editorconfig");
		if (fs.existsSync(editorConfigPath)) {
			configs.push(editorConfigPath);
			if (parseEditorConfig(editorConfigPath).isRoot) break;
		}
		const parentDir = path.dirname(currentDir);
		if (parentDir === currentDir) break;
		currentDir = parentDir;
	}
	let endOfLine;
	for (const filePath of configs.reverse()) {
		const parsed = parseEditorConfig(filePath);
		if (parsed.endOfLine) endOfLine = parsed.endOfLine;
	}
	return endOfLine;
}
function resolveFormattersOption(input, cwd = process.cwd()) {
	if (input === false) return false;
	const defaults = getDefaultFormatterOptions(cwd);
	const inferredEndOfLine = inferPrettierEndOfLineFromEditorConfig(cwd);
	const defaultsWithFormattingEngines = inferredEndOfLine ? defu({
		oxfmtOptions: { endOfLine: inferredEndOfLine },
		prettierOptions: { endOfLine: inferredEndOfLine }
	}, defaults) : defaults;
	if (input === void 0) return defaultsWithFormattingEngines;
	if (input === true) return defaultsWithFormattingEngines;
	if (isObject(input)) return defu(input, defaultsWithFormattingEngines);
	return defaultsWithFormattingEngines;
}
function resolveUserOptions(options) {
	const resolved = defu({}, options ?? {}, BASE_DEFAULTS);
	if (isMiniProgramEnabled(options)) {
		resolved.miniProgram = true;
		delete resolved.weapp;
	}
	const resolvedVue = mergeOptionWithDefaults(resolved.vue, getDefaultVueOptions(options), { postProcess: applyVueVersionSpecificRules });
	if (resolvedVue === void 0) delete resolved.vue;
	else resolved.vue = resolvedVue;
	const resolvedTypescript = mergeOptionWithDefaults(resolved.typescript, getDefaultTypescriptOptions(options), { useDefaultWhenUndefined: true });
	if (resolvedTypescript === void 0) delete resolved.typescript;
	else resolved.typescript = resolvedTypescript;
	resolved.formatters = resolveFormattersOption(options?.formatters);
	return resolved;
}
function createBaseRuleSet(isLegacy) {
	if (!isLegacy) return BASE_RULES;
	return {
		...BASE_RULES,
		"perfectionist/sort-imports": "off"
	};
}
//#endregion
//#region src/preset.ts
const MINI_PROGRAM_IGNORES = [
	"dist/**",
	".weapp-vite/**",
	"miniprogram_npm/**",
	"node_modules/**",
	"project.config.json",
	"project.private.config.json"
];
const MINI_PROGRAM_GLOBALS = {
	wx: "readonly",
	Page: "readonly",
	App: "readonly",
	Component: "readonly",
	getApp: "readonly",
	getCurrentPages: "readonly",
	requirePlugin: "readonly",
	WechatMiniprogram: "readonly"
};
function getPresets(options, mode) {
	const resolved = resolveUserOptions(options);
	const presets = [
		...resolved.miniProgram ? [{ ignores: [...MINI_PROGRAM_IGNORES] }, {
			files: ["**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx,vue}"],
			languageOptions: { globals: MINI_PROGRAM_GLOBALS }
		}] : [],
		{ rules: createBaseRuleSet(mode === "legacy") },
		{
			files: ["**/*.{css,scss,sass,less,pcss,postcss,json,jsonc,json5}"],
			rules: { "style/eol-last": "off" }
		}
	];
	presets.push(...resolveStylelintBridgePresets(resolved.stylelint), ...resolveTailwindPresets(resolved.tailwindcss), ...resolveMdxPresets(resolved.mdx), ...resolveNestPresets(resolved.nestjs), ...resolveQueryPresets(resolved.query), ...resolveAccessibilityPresets(resolved.a11y, resolved.vue, resolved.react));
	return [resolved, ...presets];
}
//#endregion
//#region src/polyfills.ts
function createObjectGroupBy() {
	return function groupBy(items, callback) {
		const groups = {};
		let index = 0;
		for (const item of items) {
			const key = callback(item, index++);
			groups[key] ??= [];
			groups[key].push(item);
		}
		return groups;
	};
}
function ensureObjectGroupBy() {
	if (typeof Object.groupBy === "function") return;
	Object.defineProperty(Object, "groupBy", {
		value: createObjectGroupBy(),
		configurable: true,
		writable: true
	});
}
ensureObjectGroupBy();
//#endregion
//#region src/factory.ts
const OPTIONAL_ANTFU_FEATURE_PACKAGES = {
	react: [
		"@eslint-react/eslint-plugin",
		"eslint-plugin-react-hooks",
		"eslint-plugin-react-refresh"
	],
	nextjs: ["@next/eslint-plugin-next"],
	unocss: ["@unocss/eslint-plugin"]
};
function isPlainObject(value) {
	return value !== null && Object.prototype.toString.call(value) === "[object Object]";
}
function cloneUserDefinedOptions(options) {
	const { settings, ...restOptions } = options;
	if (settings === void 0) return { ...restOptions };
	return {
		...restOptions,
		settings
	};
}
function getSettingsRecord(settings) {
	return isPlainObject(settings) ? settings : {};
}
function removeNamespacedSetting(options, namespace) {
	if (!isPlainObject(options.settings)) return options;
	const settings = getSettingsRecord(options.settings);
	if (!(namespace in settings)) return options;
	const { [namespace]: _unusedNamespace, ...restSettings } = settings;
	const { settings: _settings, ...restOptions } = options;
	if (Object.keys(restSettings).length === 0) return { ...restOptions };
	return {
		...restOptions,
		settings: restSettings
	};
}
function normalizeOptionalAntfuFeatures(options) {
	const normalized = cloneUserDefinedOptions(options);
	if (normalized.react && !hasAllPackages([...OPTIONAL_ANTFU_FEATURE_PACKAGES.react])) normalized.react = false;
	if (normalized.nextjs && !hasAllPackages([...OPTIONAL_ANTFU_FEATURE_PACKAGES.nextjs])) normalized.nextjs = false;
	if (normalized.unocss && !hasAllPackages([...OPTIONAL_ANTFU_FEATURE_PACKAGES.unocss])) {
		normalized.unocss = false;
		return removeNamespacedSetting(normalized, "unocss");
	}
	return normalized;
}
function mergeNamespacedSetting(options, namespace, value) {
	const currentSettings = getSettingsRecord(options.settings);
	const currentNamespaceSettings = isPlainObject(currentSettings[namespace]) ? currentSettings[namespace] : {};
	return {
		...options,
		settings: {
			...currentSettings,
			[namespace]: {
				...currentNamespaceSettings,
				...value
			}
		}
	};
}
function normalizeUnoCssOptions(options) {
	if (!options.unocss || typeof options.unocss !== "object") return options;
	const { configPath, ...unocssOptions } = options.unocss;
	const { settings, ...restOptions } = options;
	const normalized = settings === void 0 ? {
		...restOptions,
		unocss: unocssOptions
	} : {
		...restOptions,
		settings,
		unocss: unocssOptions
	};
	if (!configPath) return normalized;
	return mergeNamespacedSetting(normalized, "unocss", { configPath });
}
function hasGlobalIgnoreShape(config) {
	const keys = Object.keys(config).filter((key) => key !== "name");
	return keys.length === 1 && keys[0] === "ignores";
}
function liftConfigIgnores(config) {
	if (!("ignores" in config) || config.ignores == null || hasGlobalIgnoreShape(config) || "files" in config) return config;
	const { ignores, name, ...rest } = config;
	return [{
		...name ? { name: `${name}/ignores` } : {},
		ignores
	}, {
		...name ? { name } : {},
		...rest
	}];
}
function normalizeResolvedUserConfig(userConfig) {
	if (Array.isArray(userConfig)) return userConfig.flatMap((config) => liftConfigIgnores(config));
	return liftConfigIgnores(userConfig);
}
function isComposer(value) {
	return !!value && typeof value === "object" && "toConfigs" in value && typeof value.toConfigs === "function";
}
function normalizeUserConfig(userConfig) {
	if (typeof userConfig?.then === "function") return Promise.resolve(userConfig).then((resolved) => {
		return isComposer(resolved) ? resolved : normalizeResolvedUserConfig(resolved);
	});
	const resolvedUserConfig = userConfig;
	return isComposer(resolvedUserConfig) ? resolvedUserConfig : normalizeResolvedUserConfig(resolvedUserConfig);
}
function isFormatterOptionsObject(value) {
	return !!value && typeof value === "object" && !Array.isArray(value);
}
function toOxfmtRuleEntry(options) {
	return ["error", { ...options ?? {} }];
}
function normalizePrettierFormatterForAntfu(formatter) {
	return formatter === "oxfmt" ? true : formatter;
}
function normalizeMarkdownFormatterForAntfu(formatter) {
	return formatter === "oxfmt" ? true : formatter;
}
function toAntfuOptions(options) {
	const { formatters, ...restOptions } = options;
	if (!isFormatterOptionsObject(formatters)) return restOptions;
	const { oxfmtOptions: _oxfmtOptions, css, html, markdown, graphql, ...restFormatters } = formatters;
	return {
		...restOptions,
		formatters: {
			...restFormatters,
			...css === void 0 ? {} : { css: normalizePrettierFormatterForAntfu(css) },
			...html === void 0 ? {} : { html: normalizePrettierFormatterForAntfu(html) },
			...markdown === void 0 ? {} : { markdown: normalizeMarkdownFormatterForAntfu(markdown) },
			...graphql === void 0 ? {} : { graphql: normalizePrettierFormatterForAntfu(graphql) }
		}
	};
}
function applyOxfmtFormatterOverrides(composer, formatters) {
	if (!isFormatterOptionsObject(formatters)) return composer;
	if (formatters.markdown === "oxfmt" && formatters.slidev) throw new Error("`formatters.markdown: \"oxfmt\"` cannot be combined with `formatters.slidev`.");
	const oxfmtOptions = formatters.oxfmtOptions;
	let nextComposer = composer;
	if (formatters.css === "oxfmt") for (const name of [
		"antfu/formatter/css",
		"antfu/formatter/scss",
		"antfu/formatter/less"
	]) nextComposer = nextComposer.override(name, { rules: {
		"format/oxfmt": toOxfmtRuleEntry(oxfmtOptions),
		"format/prettier": "off"
	} });
	if (formatters.html === "oxfmt") nextComposer = nextComposer.override("antfu/formatter/html", { rules: {
		"format/oxfmt": toOxfmtRuleEntry(oxfmtOptions),
		"format/prettier": "off"
	} });
	if (formatters.markdown === "oxfmt") nextComposer = nextComposer.override("antfu/formatter/markdown", { rules: {
		"format/oxfmt": toOxfmtRuleEntry(oxfmtOptions),
		"format/prettier": "off",
		"format/dprint": "off"
	} });
	if (formatters.graphql === "oxfmt") nextComposer = nextComposer.override("antfu/formatter/graphql", { rules: {
		"format/oxfmt": toOxfmtRuleEntry(oxfmtOptions),
		"format/prettier": "off"
	} });
	return nextComposer;
}
function icebreaker(options = {}, ...userConfigs) {
	const [resolved, ...presets] = getPresets(options);
	const normalized = normalizeUnoCssOptions(normalizeOptionalAntfuFeatures(resolved));
	return applyOxfmtFormatterOverrides((0, antfu_exports.antfu)(toAntfuOptions(normalized), ...presets, ...userConfigs.map(normalizeUserConfig)), normalized.formatters);
}
function icebreakerLegacy(options = {}, ...userConfigs) {
	const [resolved, ...presets] = getPresets(options, "legacy");
	const normalized = normalizeUnoCssOptions(normalizeOptionalAntfuFeatures(resolved));
	return applyOxfmtFormatterOverrides((0, antfu_exports.antfu)(toAntfuOptions(normalized), ...presets, ...userConfigs.map(normalizeUserConfig)), normalized.formatters);
}
//#endregion
export { getPresets, icebreaker, icebreakerLegacy };
