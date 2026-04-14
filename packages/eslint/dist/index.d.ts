import { Awaitable, ConfigNames, OptionsConfig, TypedFlatConfigItem, TypedFlatConfigItem as TypedFlatConfigItem$1 } from "@antfu/eslint-config";
import { IcebreakerStylelintOptions } from "@icebreakers/stylelint-config";

//#region ../../node_modules/.pnpm/@types+json-schema@7.0.15/node_modules/@types/json-schema/index.d.ts
// ==================================================================================================
// JSON Schema Draft 04
// ==================================================================================================
/**
 * @see https://tools.ietf.org/html/draft-zyp-json-schema-03#section-5.1
 */
type JSONSchema4TypeName = "string" //
| "number" | "integer" | "boolean" | "object" | "array" | "null" | "any";
/**
 * @see https://tools.ietf.org/html/draft-zyp-json-schema-04#section-3.5
 */
type JSONSchema4Type = string //
| number | boolean | JSONSchema4Object | JSONSchema4Array | null;
// Workaround for infinite type recursion
interface JSONSchema4Object {
  [key: string]: JSONSchema4Type;
}
// Workaround for infinite type recursion
// https://github.com/Microsoft/TypeScript/issues/3496#issuecomment-128553540
interface JSONSchema4Array extends Array<JSONSchema4Type> {}
/**
 * Meta schema
 *
 * Recommended values:
 * - 'http://json-schema.org/schema#'
 * - 'http://json-schema.org/hyper-schema#'
 * - 'http://json-schema.org/draft-04/schema#'
 * - 'http://json-schema.org/draft-04/hyper-schema#'
 * - 'http://json-schema.org/draft-03/schema#'
 * - 'http://json-schema.org/draft-03/hyper-schema#'
 *
 * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-5
 */
type JSONSchema4Version = string;
/**
 * JSON Schema V4
 * @see https://tools.ietf.org/html/draft-zyp-json-schema-04
 */
interface JSONSchema4 {
  id?: string | undefined;
  $ref?: string | undefined;
  $schema?: JSONSchema4Version | undefined;
  /**
   * This attribute is a string that provides a short description of the
   * instance property.
   *
   * @see https://tools.ietf.org/html/draft-zyp-json-schema-03#section-5.21
   */
  title?: string | undefined;
  /**
   * This attribute is a string that provides a full description of the of
   * purpose the instance property.
   *
   * @see https://tools.ietf.org/html/draft-zyp-json-schema-03#section-5.22
   */
  description?: string | undefined;
  default?: JSONSchema4Type | undefined;
  multipleOf?: number | undefined;
  maximum?: number | undefined;
  exclusiveMaximum?: boolean | undefined;
  minimum?: number | undefined;
  exclusiveMinimum?: boolean | undefined;
  maxLength?: number | undefined;
  minLength?: number | undefined;
  pattern?: string | undefined;
  /**
   * May only be defined when "items" is defined, and is a tuple of JSONSchemas.
   *
   * This provides a definition for additional items in an array instance
   * when tuple definitions of the items is provided.  This can be false
   * to indicate additional items in the array are not allowed, or it can
   * be a schema that defines the schema of the additional items.
   *
   * @see https://tools.ietf.org/html/draft-zyp-json-schema-03#section-5.6
   */
  additionalItems?: boolean | JSONSchema4 | undefined;
  /**
   * This attribute defines the allowed items in an instance array, and
   * MUST be a schema or an array of schemas.  The default value is an
   * empty schema which allows any value for items in the instance array.
   *
   * When this attribute value is a schema and the instance value is an
   * array, then all the items in the array MUST be valid according to the
   * schema.
   *
   * When this attribute value is an array of schemas and the instance
   * value is an array, each position in the instance array MUST conform
   * to the schema in the corresponding position for this array.  This
   * called tuple typing.  When tuple typing is used, additional items are
   * allowed, disallowed, or constrained by the "additionalItems"
   * (Section 5.6) attribute using the same rules as
   * "additionalProperties" (Section 5.4) for objects.
   *
   * @see https://tools.ietf.org/html/draft-zyp-json-schema-03#section-5.5
   */
  items?: JSONSchema4 | JSONSchema4[] | undefined;
  maxItems?: number | undefined;
  minItems?: number | undefined;
  uniqueItems?: boolean | undefined;
  maxProperties?: number | undefined;
  minProperties?: number | undefined;
  /**
   * This attribute indicates if the instance must have a value, and not
   * be undefined. This is false by default, making the instance
   * optional.
   *
   * @see https://tools.ietf.org/html/draft-zyp-json-schema-03#section-5.7
   */
  required?: boolean | string[] | undefined;
  /**
   * This attribute defines a schema for all properties that are not
   * explicitly defined in an object type definition. If specified, the
   * value MUST be a schema or a boolean. If false is provided, no
   * additional properties are allowed beyond the properties defined in
   * the schema. The default value is an empty schema which allows any
   * value for additional properties.
   *
   * @see https://tools.ietf.org/html/draft-zyp-json-schema-03#section-5.4
   */
  additionalProperties?: boolean | JSONSchema4 | undefined;
  definitions?: {
    [k: string]: JSONSchema4;
  } | undefined;
  /**
   * This attribute is an object with property definitions that define the
   * valid values of instance object property values. When the instance
   * value is an object, the property values of the instance object MUST
   * conform to the property definitions in this object. In this object,
   * each property definition's value MUST be a schema, and the property's
   * name MUST be the name of the instance property that it defines.  The
   * instance property value MUST be valid according to the schema from
   * the property definition. Properties are considered unordered, the
   * order of the instance properties MAY be in any order.
   *
   * @see https://tools.ietf.org/html/draft-zyp-json-schema-03#section-5.2
   */
  properties?: {
    [k: string]: JSONSchema4;
  } | undefined;
  /**
   * This attribute is an object that defines the schema for a set of
   * property names of an object instance. The name of each property of
   * this attribute's object is a regular expression pattern in the ECMA
   * 262/Perl 5 format, while the value is a schema. If the pattern
   * matches the name of a property on the instance object, the value of
   * the instance's property MUST be valid against the pattern name's
   * schema value.
   *
   * @see https://tools.ietf.org/html/draft-zyp-json-schema-03#section-5.3
   */
  patternProperties?: {
    [k: string]: JSONSchema4;
  } | undefined;
  dependencies?: {
    [k: string]: JSONSchema4 | string[];
  } | undefined;
  /**
   * This provides an enumeration of all possible values that are valid
   * for the instance property. This MUST be an array, and each item in
   * the array represents a possible value for the instance value. If
   * this attribute is defined, the instance value MUST be one of the
   * values in the array in order for the schema to be valid.
   *
   * @see https://tools.ietf.org/html/draft-zyp-json-schema-03#section-5.19
   */
  enum?: JSONSchema4Type[] | undefined;
  /**
   * A single type, or a union of simple types
   */
  type?: JSONSchema4TypeName | JSONSchema4TypeName[] | undefined;
  allOf?: JSONSchema4[] | undefined;
  anyOf?: JSONSchema4[] | undefined;
  oneOf?: JSONSchema4[] | undefined;
  not?: JSONSchema4 | undefined;
  /**
   * The value of this property MUST be another schema which will provide
   * a base schema which the current schema will inherit from.  The
   * inheritance rules are such that any instance that is valid according
   * to the current schema MUST be valid according to the referenced
   * schema.  This MAY also be an array, in which case, the instance MUST
   * be valid for all the schemas in the array.  A schema that extends
   * another schema MAY define additional attributes, constrain existing
   * attributes, or add other constraints.
   *
   * Conceptually, the behavior of extends can be seen as validating an
   * instance against all constraints in the extending schema as well as
   * the extended schema(s).
   *
   * @see https://tools.ietf.org/html/draft-zyp-json-schema-03#section-5.26
   */
  extends?: string | string[] | undefined;
  /**
   * @see https://tools.ietf.org/html/draft-zyp-json-schema-04#section-5.6
   */
  [k: string]: any;
  format?: string | undefined;
}
//#endregion
//#region ../../node_modules/.pnpm/@eslint+core@1.1.1/node_modules/@eslint/core/dist/esm/types.d.ts
/**
 * Represents an error inside of a file.
 */
interface FileError$1 {
  message: string;
  line: number;
  column: number;
  endLine?: number;
  endColumn?: number;
}
/**
 * Represents a problem found in a file.
 */
interface FileProblem$1 {
  ruleId: string | null;
  message: string;
  loc: SourceLocation$3;
}
/**
 * Represents the start and end coordinates of a node inside the source.
 */
interface SourceLocation$3 {
  start: Position$2;
  end: Position$2;
}
/**
 * Represents a location coordinate inside the source. ESLint-style formats
 * have just `line` and `column` while others may have `offset` as well.
 */
interface Position$2 {
  line: number;
  column: number;
}
/**
 * Represents a range of characters in the source.
 */
type SourceRange$1 = [number, number];
/**
 * What the rule is responsible for finding:
 * - `problem` means the rule has noticed a potential error.
 * - `suggestion` means the rule suggests an alternate or better approach.
 * - `layout` means the rule is looking at spacing, indentation, etc.
 */
type RuleType$1 = "problem" | "suggestion" | "layout";
/**
 * The type of fix the rule can provide:
 * - `code` means the rule can fix syntax.
 * - `whitespace` means the rule can fix spacing and indentation.
 */
type RuleFixType$1 = "code" | "whitespace";
/**
 * An object containing visitor information for a rule. Each method is either the
 * name of a node type or a selector, or is a method that will be called at specific
 * times during the traversal.
 */
type RuleVisitor$2 = Record<string, ((...args: any[]) => void) | undefined>;
/**
 * Rule meta information used for documentation.
 */
interface RulesMetaDocs$1 {
  /**
   * A short description of the rule.
   */
  description?: string | undefined;
  /**
   * The URL to the documentation for the rule.
   */
  url?: string | undefined;
  /**
   * Indicates if the rule is generally recommended for all users.
   *
   * Note - this will always be a boolean for core rules, but may be used in any way by plugins.
   */
  recommended?: unknown;
  /**
   * Indicates if the rule is frozen (no longer accepting feature requests).
   */
  frozen?: boolean | undefined;
}
/**
 * Meta information about a rule.
 */
interface RulesMeta$1<MessageIds extends string = string, RuleOptions = unknown[], ExtRuleDocs = unknown> {
  /**
   * Properties that are used when documenting the rule.
   */
  docs?: (RulesMetaDocs$1 & ExtRuleDocs) | undefined;
  /**
   * The type of rule.
   */
  type?: RuleType$1 | undefined;
  /**
   * The schema for the rule options. Required if the rule has options.
   */
  schema?: JSONSchema4 | JSONSchema4[] | false | undefined;
  /**
   * Any default options to be recursively merged on top of any user-provided options.
   */
  defaultOptions?: RuleOptions;
  /**
   * The messages that the rule can report.
   */
  messages?: Record<MessageIds, string>;
  /**
   * Indicates whether the rule has been deprecated or provides additional metadata about the deprecation. Omit if not deprecated.
   */
  deprecated?: boolean | DeprecatedInfo$1 | undefined;
  /**
   * @deprecated Use deprecated.replacedBy instead.
   * The name of the rule(s) this rule was replaced by, if it was deprecated.
   */
  replacedBy?: readonly string[] | undefined;
  /**
   * Indicates if the rule is fixable, and if so, what type of fix it provides.
   */
  fixable?: RuleFixType$1 | undefined;
  /**
   * Indicates if the rule may provide suggestions.
   */
  hasSuggestions?: boolean | undefined;
  /**
   * The language the rule is intended to lint.
   */
  language?: string;
  /**
   * The dialects of `language` that the rule is intended to lint.
   */
  dialects?: string[];
}
/**
 * Provides additional metadata about a deprecation.
 */
interface DeprecatedInfo$1 {
  /**
   * General message presented to the user, e.g. for the key rule why the rule
   * is deprecated or for info how to replace the rule.
   */
  message?: string;
  /**
   * URL to more information about this deprecation in general.
   */
  url?: string;
  /**
   * An empty array explicitly states that there is no replacement.
   */
  replacedBy?: ReplacedByInfo$1[];
  /**
   * The package version since when the rule is deprecated (should use full
   * semver without a leading "v").
   */
  deprecatedSince?: string;
  /**
   * The estimated version when the rule is removed (probably the next major
   * version). null means the rule is "frozen" (will be available but will not
   * be changed).
   */
  availableUntil?: string | null;
}
/**
 * Provides metadata about a replacement
 */
interface ReplacedByInfo$1 {
  /**
   * General message presented to the user, e.g. how to replace the rule
   */
  message?: string;
  /**
   * URL to more information about this replacement in general
   */
  url?: string;
  /**
   * Name should be "eslint" if the replacement is an ESLint core rule. Omit
   * the property if the replacement is in the same plugin.
   */
  plugin?: ExternalSpecifier$1;
  /**
   * Name and documentation of the replacement rule
   */
  rule?: ExternalSpecifier$1;
}
/**
 * Specifies the name and url of an external resource. At least one property
 * should be set.
 */
interface ExternalSpecifier$1 {
  /**
   * Name of the referenced plugin / rule.
   */
  name?: string;
  /**
   * URL pointing to documentation for the plugin / rule.
   */
  url?: string;
}
/**
 * Generic type for `RuleContext`.
 */
interface RuleContextTypeOptions$1 {
  LangOptions: LanguageOptions$1;
  Code: SourceCode$2;
  RuleOptions: unknown[];
  Node: unknown;
  MessageIds: string;
}
/**
 * Represents the context object that is passed to a rule. This object contains
 * information about the current state of the linting process and is the rule's
 * view into the outside world.
 */
interface RuleContext$2<Options extends RuleContextTypeOptions$1 = RuleContextTypeOptions$1> {
  /**
   * The current working directory for the session.
   */
  cwd: string;
  /**
   * The filename of the file being linted.
   */
  filename: string;
  /**
   * The physical filename of the file being linted.
   */
  physicalFilename: string;
  /**
   * The source code object that the rule is running on.
   */
  sourceCode: Options["Code"];
  /**
   * Shared settings for the configuration.
   */
  settings: SettingsConfig$1;
  /**
   * The language options for the configuration.
   */
  languageOptions: Options["LangOptions"];
  /**
   * The rule ID.
   */
  id: string;
  /**
   * The rule's configured options.
   */
  options: Options["RuleOptions"];
  /**
   * The report function that the rule should use to report problems.
   * @param violation The violation to report.
   */
  report(violation: ViolationReport$1<Options["Node"], Options["MessageIds"]>): void;
}
/**
 * Manager of text edits for a rule fix.
 */
interface RuleTextEditor$1<EditableSyntaxElement = unknown> {
  /**
   * Inserts text after the specified node or token.
   * @param syntaxElement The node or token to insert after.
   * @param text The edit to insert after the node or token.
   */
  insertTextAfter(syntaxElement: EditableSyntaxElement, text: string): RuleTextEdit$1;
  /**
   * Inserts text after the specified range.
   * @param range The range to insert after.
   * @param text The edit to insert after the range.
   */
  insertTextAfterRange(range: SourceRange$1, text: string): RuleTextEdit$1;
  /**
   * Inserts text before the specified node or token.
   * @param syntaxElement A syntax element with location information to insert before.
   * @param text The edit to insert before the node or token.
   */
  insertTextBefore(syntaxElement: EditableSyntaxElement, text: string): RuleTextEdit$1;
  /**
   * Inserts text before the specified range.
   * @param range The range to insert before.
   * @param text The edit to insert before the range.
   */
  insertTextBeforeRange(range: SourceRange$1, text: string): RuleTextEdit$1;
  /**
   * Removes the specified node or token.
   * @param syntaxElement A syntax element with location information to remove.
   * @returns The edit to remove the node or token.
   */
  remove(syntaxElement: EditableSyntaxElement): RuleTextEdit$1;
  /**
   * Removes the specified range.
   * @param range The range to remove.
   * @returns The edit to remove the range.
   */
  removeRange(range: SourceRange$1): RuleTextEdit$1;
  /**
   * Replaces the specified node or token with the given text.
   * @param syntaxElement A syntax element with location information to replace.
   * @param text The text to replace the node or token with.
   * @returns The edit to replace the node or token.
   */
  replaceText(syntaxElement: EditableSyntaxElement, text: string): RuleTextEdit$1;
  /**
   * Replaces the specified range with the given text.
   * @param range The range to replace.
   * @param text The text to replace the range with.
   * @returns The edit to replace the range.
   */
  replaceTextRange(range: SourceRange$1, text: string): RuleTextEdit$1;
}
/**
 * Represents a fix for a rule violation implemented as a text edit.
 */
interface RuleTextEdit$1 {
  /**
   * The range to replace.
   */
  range: SourceRange$1;
  /**
   * The text to insert.
   */
  text: string;
}
/**
 * Fixes a violation.
 * @param fixer The text editor to apply the fix.
 * @returns The fix(es) for the violation.
 */
type RuleFixer$1 = (fixer: RuleTextEditor$1) => RuleTextEdit$1 | Iterable<RuleTextEdit$1> | null;
/**
 * Data that can be used to fill placeholders in error messages.
 */
type MessagePlaceholderData$1 = Record<string, string | number | boolean | bigint | null | undefined>;
interface ViolationReportBase$1<MessageIds extends string = string> {
  /**
   * The data to insert into the message.
   */
  data?: MessagePlaceholderData$1 | undefined;
  /**
   * The fix to be applied for the violation.
   */
  fix?: RuleFixer$1 | null | undefined;
  /**
   * An array of suggested fixes for the problem. These fixes may change the
   * behavior of the code, so they are not applied automatically.
   */
  suggest?: SuggestedEdit$1<MessageIds>[] | null | undefined;
}
type ViolationMessage$1<MessageIds extends string = string> = {
  message: string;
} | {
  messageId: MessageIds;
};
type ViolationLocation$1<Node> = {
  loc: SourceLocation$3 | Position$2;
} | {
  node: Node;
};
type ViolationReport$1<Node = unknown, MessageIds extends string = string> = ViolationReportBase$1<MessageIds> & ViolationMessage$1<MessageIds> & ViolationLocation$1<Node>;
interface SuggestedEditBase$1 {
  /**
   * The data to insert into the message.
   */
  data?: MessagePlaceholderData$1 | undefined;
  /**
   * The fix to be applied for the suggestion.
   */
  fix: RuleFixer$1;
}
type SuggestionMessage$1<MessageIds extends string = string> = {
  desc: string;
} | {
  messageId: MessageIds;
};
/**
 * A suggested edit for a rule violation.
 */
type SuggestedEdit$1<MessageIds extends string = string> = SuggestedEditBase$1 & SuggestionMessage$1<MessageIds>;
/**
 * The normalized version of a lint suggestion.
 */
interface LintSuggestion$1 {
  /** A short description. */
  desc: string;
  /** Fix result info. */
  fix: RuleTextEdit$1;
  /** Id referencing a message for the description. */
  messageId?: string | undefined;
}
/**
 * The normalized version of a lint violation message.
 */
interface LintMessage$2 {
  /** The 1-based column number. */
  column: number;
  /** The 1-based line number. */
  line: number;
  /** The 1-based column number of the end location. */
  endColumn?: number | undefined;
  /** The 1-based line number of the end location. */
  endLine?: number | undefined;
  /** The ID of the rule which makes this message. */
  ruleId: string | null;
  /** The reported message. */
  message: string;
  /** The ID of the message in the rule's meta. */
  messageId?: string | undefined;
  /** If `true` then this is a fatal error. */
  fatal?: true | undefined;
  /** The severity of this message. */
  severity: Exclude<SeverityLevel$1, 0>;
  /** Information for autofix. */
  fix?: RuleTextEdit$1 | undefined;
  /** Information for suggestions. */
  suggestions?: LintSuggestion$1[] | undefined;
}
/**
 * Generic options for the `RuleDefinition` type.
 */
interface RuleDefinitionTypeOptions$1 {
  LangOptions: LanguageOptions$1;
  Code: SourceCode$2;
  RuleOptions: unknown[];
  Visitor: RuleVisitor$2;
  Node: unknown;
  MessageIds: string;
  ExtRuleDocs: unknown;
}
/**
 * The definition of an ESLint rule.
 */
interface RuleDefinition$1<Options extends RuleDefinitionTypeOptions$1 = RuleDefinitionTypeOptions$1> {
  /**
   * The meta information for the rule.
   */
  meta?: RulesMeta$1<Options["MessageIds"], Options["RuleOptions"], Options["ExtRuleDocs"]>;
  /**
   * Creates the visitor that ESLint uses to apply the rule during traversal.
   * @param context The rule context.
   * @returns The rule visitor.
   */
  create(context: RuleContext$2<{
    LangOptions: Options["LangOptions"];
    Code: Options["Code"];
    RuleOptions: Options["RuleOptions"];
    Node: Options["Node"];
    MessageIds: Options["MessageIds"];
  }>): Options["Visitor"];
}
/**
 * The human readable severity level used in a configuration.
 */
type SeverityName$1 = "off" | "warn" | "error";
/**
 * The numeric severity level for a rule.
 *
 * - `0` means off.
 * - `1` means warn.
 * - `2` means error.
 */
type SeverityLevel$1 = 0 | 1 | 2;
/**
 * The severity of a rule in a configuration.
 */
type Severity$1 = SeverityName$1 | SeverityLevel$1;
/**
 * Represents the metadata for an object, such as a plugin or processor.
 */
interface ObjectMetaProperties$1 {
  /** @deprecated Use `meta.name` instead. */
  name?: string | undefined;
  /** @deprecated Use `meta.version` instead. */
  version?: string | undefined;
  meta?: {
    name?: string | undefined;
    version?: string | undefined;
  };
}
/**
 * Represents the configuration options for the core linter.
 */
interface LinterOptionsConfig$1 {
  /**
   * Indicates whether or not inline configuration is evaluated.
   */
  noInlineConfig?: boolean;
  /**
   * Indicates what to do when an unused disable directive is found.
   */
  reportUnusedDisableDirectives?: boolean | Severity$1;
  /**
   * A severity value indicating if and how unused inline configs should be
   * tracked and reported.
   */
  reportUnusedInlineConfigs?: Severity$1;
}
/**
 * The configuration for a rule.
 */
type RuleConfig$1<RuleOptions extends unknown[] = unknown[]> = Severity$1 | [Severity$1, ...Partial<RuleOptions>];
/**
 * A collection of rules and their configurations.
 */
interface RulesConfig$1 {
  [key: string]: RuleConfig$1;
}
/**
 * A collection of settings.
 */
interface SettingsConfig$1 {
  [key: string]: unknown;
}
/**
 * The configuration for a set of files.
 */
interface ConfigObject$1<Rules extends RulesConfig$1 = RulesConfig$1> {
  /**
   * A string to identify the configuration object. Used in error messages and
   * inspection tools.
   */
  name?: string;
  /**
   * Path to the directory where the configuration object should apply.
   * `files` and `ignores` patterns in the configuration object are
   * interpreted as relative to this path.
   */
  basePath?: string;
  /**
   * An array of glob patterns indicating the files that the configuration
   * object should apply to. If not specified, the configuration object applies
   * to all files
   */
  files?: (string | string[])[];
  /**
   * An array of glob patterns indicating the files that the configuration
   * object should not apply to. If not specified, the configuration object
   * applies to all files matched by files
   */
  ignores?: string[];
  /**
   * The name of the language used for linting. This is used to determine the
   * parser and other language-specific settings.
   * @since 9.7.0
   */
  language?: string;
  /**
   * An object containing settings related to how the language is configured for
   * linting.
   */
  languageOptions?: LanguageOptions$1;
  /**
   * An object containing settings related to the linting process
   */
  linterOptions?: LinterOptionsConfig$1;
  /**
   * Either an object containing preprocess() and postprocess() methods or a
   * string indicating the name of a processor inside of a plugin
   * (i.e., "pluginName/processorName").
   */
  processor?: string | Processor$1;
  /**
   * An object containing a name-value mapping of plugin names to plugin objects.
   * When files is specified, these plugins are only available to the matching files.
   */
  plugins?: Record<string, Plugin$3>;
  /**
   * An object containing the configured rules. When files or ignores are specified,
   * these rule configurations are only available to the matching files.
   */
  rules?: Partial<Rules>;
  /**
   * An object containing name-value pairs of information that should be
   * available to all rules.
   */
  settings?: SettingsConfig$1;
}
/** @deprecated Only supported in legacy eslintrc config format. */
type GlobalAccess$1 = boolean | "off" | "readable" | "readonly" | "writable" | "writeable";
/** @deprecated Only supported in legacy eslintrc config format. */
interface GlobalsConfig$1 {
  [name: string]: GlobalAccess$1;
}
/**
 * The ECMAScript version of the code being linted.
 * @deprecated Only supported in legacy eslintrc config format.
 */
type EcmaVersion$2 = 3 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 2015 | 2016 | 2017 | 2018 | 2019 | 2020 | 2021 | 2022 | 2023 | 2024 | 2025 | 2026 | "latest";
/**
 * The type of JavaScript source code.
 * @deprecated Only supported in legacy eslintrc config format.
 */
type JavaScriptSourceType$1 = "script" | "module" | "commonjs";
/**
 * Parser options.
 * @deprecated Only supported in legacy eslintrc config format.
 * @see [Specifying Parser Options](https://eslint.org/docs/latest/use/configure/language-options#specifying-parser-options)
 */
interface JavaScriptParserOptionsConfig$1 {
  /**
   * Allow the use of reserved words as identifiers (if `ecmaVersion` is 3).
   *
   * @default false
   */
  allowReserved?: boolean | undefined;
  /**
   * Accepts any valid ECMAScript version number or `'latest'`:
   *
   * - A version: es3, es5, es6, es7, es8, es9, es10, es11, es12, es13, es14, ..., or
   * - A year: es2015, es2016, es2017, es2018, es2019, es2020, es2021, es2022, es2023, ..., or
   * - `'latest'`
   *
   * When it's a version or a year, the value must be a number - so do not include the `es` prefix.
   *
   * Specifies the version of ECMAScript syntax you want to use. This is used by the parser to determine how to perform scope analysis, and it affects the default
   *
   * @default 5
   */
  ecmaVersion?: EcmaVersion$2 | undefined;
  /**
   * The type of JavaScript source code. Possible values are "script" for
   * traditional script files, "module" for ECMAScript modules (ESM), and
   * "commonjs" for CommonJS files.
   *
   * @default 'script'
   *
   * @see https://eslint.org/docs/latest/use/configure/language-options-deprecated#specifying-parser-options
   */
  sourceType?: JavaScriptSourceType$1 | undefined;
  /**
   * An object indicating which additional language features you'd like to use.
   *
   * @see https://eslint.org/docs/latest/use/configure/language-options-deprecated#specifying-parser-options
   */
  ecmaFeatures?: {
    globalReturn?: boolean | undefined;
    impliedStrict?: boolean | undefined;
    jsx?: boolean | undefined;
    [key: string]: any;
  } | undefined;
  [key: string]: any;
}
/** @deprecated Only supported in legacy eslintrc config format. */
interface EnvironmentConfig$1 {
  /** The definition of global variables. */
  globals?: GlobalsConfig$1 | undefined;
  /** The parser options that will be enabled under this environment. */
  parserOptions?: JavaScriptParserOptionsConfig$1 | undefined;
}
/**
 * A configuration object that may have a `rules` block.
 */
interface HasRules$1<Rules extends RulesConfig$1 = RulesConfig$1> {
  rules?: Partial<Rules> | undefined;
}
/**
 * ESLint legacy configuration.
 *
 * @see [ESLint Legacy Configuration](https://eslint.org/docs/latest/use/configure/)
 */
interface BaseConfig$1<Rules extends RulesConfig$1 = RulesConfig$1, OverrideRules extends RulesConfig$1 = Rules> extends HasRules$1<Rules> {
  $schema?: string | undefined;
  /**
   * An environment provides predefined global variables.
   *
   * @see [Environments](https://eslint.org/docs/latest/use/configure/language-options-deprecated#specifying-environments)
   */
  env?: {
    [name: string]: boolean;
  } | undefined;
  /**
   * Extending configuration files.
   *
   * @see [Extends](https://eslint.org/docs/latest/use/configure/configuration-files-deprecated#extending-configuration-files)
   */
  extends?: string | string[] | undefined;
  /**
   * Specifying globals.
   *
   * @see [Globals](https://eslint.org/docs/latest/use/configure/language-options-deprecated#specifying-globals)
   */
  globals?: GlobalsConfig$1 | undefined;
  /**
   * Disable processing of inline comments.
   *
   * @see [Disabling Inline Comments](https://eslint.org/docs/latest/use/configure/rules-deprecated#disabling-inline-comments)
   */
  noInlineConfig?: boolean | undefined;
  /**
   * Overrides can be used to use a differing configuration for matching sub-directories and files.
   *
   * @see [How do overrides work](https://eslint.org/docs/latest/use/configure/configuration-files-deprecated#how-do-overrides-work)
   */
  overrides?: ConfigOverride$1<OverrideRules>[] | undefined;
  /**
   * Parser.
   *
   * @see [Working with Custom Parsers](https://eslint.org/docs/latest/extend/custom-parsers)
   * @see [Specifying Parser](https://eslint.org/docs/latest/use/configure/parser-deprecated)
   */
  parser?: string | undefined;
  /**
   * Parser options.
   *
   * @see [Working with Custom Parsers](https://eslint.org/docs/latest/extend/custom-parsers)
   * @see [Specifying Parser Options](https://eslint.org/docs/latest/use/configure/language-options-deprecated#specifying-parser-options)
   */
  parserOptions?: JavaScriptParserOptionsConfig$1 | undefined;
  /**
   * Which third-party plugins define additional rules, environments, configs, etc. for ESLint to use.
   *
   * @see [Configuring Plugins](https://eslint.org/docs/latest/use/configure/plugins-deprecated#configure-plugins)
   */
  plugins?: string[] | undefined;
  /**
   * Specifying processor.
   *
   * @see [processor](https://eslint.org/docs/latest/use/configure/plugins-deprecated#specify-a-processor)
   */
  processor?: string | undefined;
  /**
   * Report unused eslint-disable comments as warning.
   *
   * @see [Report unused eslint-disable comments](https://eslint.org/docs/latest/use/configure/rules-deprecated#report-unused-eslint-disable-comments)
   */
  reportUnusedDisableDirectives?: boolean | undefined;
  /**
   * Settings.
   *
   * @see [Settings](https://eslint.org/docs/latest/use/configure/configuration-files-deprecated#adding-shared-settings)
   */
  settings?: SettingsConfig$1 | undefined;
}
/**
 * The overwrites that apply more differing configuration to specific files or directories.
 */
interface ConfigOverride$1<Rules extends RulesConfig$1 = RulesConfig$1> extends BaseConfig$1<Rules> {
  /**
   * The glob patterns for excluded files.
   */
  excludedFiles?: string | string[] | undefined;
  /**
   * The glob patterns for target files.
   */
  files: string | string[];
}
/**
 * ESLint legacy configuration.
 *
 * @see [ESLint Legacy Configuration](https://eslint.org/docs/latest/use/configure/)
 */
interface LegacyConfigObject$1<Rules extends RulesConfig$1 = RulesConfig$1, OverrideRules extends RulesConfig$1 = Rules> extends BaseConfig$1<Rules, OverrideRules> {
  /**
   * Tell ESLint to ignore specific files and directories.
   *
   * @see [Ignore Patterns](https://eslint.org/docs/latest/use/configure/ignore-deprecated#ignorepatterns-in-config-files)
   */
  ignorePatterns?: string | string[] | undefined;
  /**
   * @see [Using Configuration Files](https://eslint.org/docs/latest/use/configure/configuration-files-deprecated#using-configuration-files)
   */
  root?: boolean | undefined;
}
/**
 * File information passed to a processor.
 */
interface ProcessorFile$2 {
  text: string;
  filename: string;
}
/**
 * A processor is an object that can preprocess and postprocess files.
 */
interface Processor$1<T extends string | ProcessorFile$2 = string | ProcessorFile$2> extends ObjectMetaProperties$1 {
  /** If `true` then it means the processor supports autofix. */
  supportsAutofix?: boolean | undefined;
  /** The function to extract code blocks. */
  preprocess?(text: string, filename: string): T[];
  /** The function to merge messages. */
  postprocess?(messages: LintMessage$2[][], filename: string): LintMessage$2[];
}
interface Plugin$3 extends ObjectMetaProperties$1 {
  meta?: ObjectMetaProperties$1["meta"] & {
    namespace?: string | undefined;
  };
  configs?: Record<string, LegacyConfigObject$1 | ConfigObject$1 | ConfigObject$1[]> | undefined;
  environments?: Record<string, EnvironmentConfig$1> | undefined;
  languages?: Record<string, Language$1> | undefined;
  processors?: Record<string, Processor$1> | undefined;
  rules?: Record<string, RuleDefinition$1> | undefined;
}
/**
 * Generic options for the `Language` type.
 */
interface LanguageTypeOptions$1 {
  LangOptions: LanguageOptions$1;
  Code: SourceCode$2;
  RootNode: unknown;
  Node: unknown;
}
/**
 * Represents a plugin language.
 */
interface Language$1<Options extends LanguageTypeOptions$1 = {
  LangOptions: LanguageOptions$1;
  Code: SourceCode$2;
  RootNode: unknown;
  Node: unknown;
}> {
  /**
   * Indicates how ESLint should read the file.
   */
  fileType: "text";
  /**
   * First line number returned from the parser (text mode only).
   */
  lineStart: 0 | 1;
  /**
   * First column number returned from the parser (text mode only).
   */
  columnStart: 0 | 1;
  /**
   * The property to read the node type from. Used in selector querying.
   */
  nodeTypeKey: string;
  /**
   * The traversal path that tools should take when evaluating the AST
   */
  visitorKeys?: Record<string, string[]>;
  /**
   * Default language options. User-defined options are merged with this object.
   */
  defaultLanguageOptions?: LanguageOptions$1;
  /**
   * Validates languageOptions for this language.
   */
  validateLanguageOptions(languageOptions: Options["LangOptions"]): void;
  /**
   * Normalizes languageOptions for this language.
   */
  normalizeLanguageOptions?(languageOptions: Options["LangOptions"]): Options["LangOptions"];
  /**
   * Helper for esquery that allows languages to match nodes against
   * class. esquery currently has classes like `function` that will
   * match all the various function nodes. This method allows languages
   * to implement similar shorthands.
   */
  matchesSelectorClass?(className: string, node: Options["Node"], ancestry: Options["Node"][]): boolean;
  /**
   * Parses the given file input into its component parts. This file should not
   * throws errors for parsing errors but rather should return any parsing
   * errors as parse of the ParseResult object.
   */
  parse(file: File$1, context: LanguageContext$1<Options["LangOptions"]>): ParseResult$1<Options["RootNode"]>;
  /**
   * Creates SourceCode object that ESLint uses to work with a file.
   */
  createSourceCode(file: File$1, input: OkParseResult$1<Options["RootNode"]>, context: LanguageContext$1<Options["LangOptions"]>): Options["Code"];
}
/**
 * Plugin-defined options for the language.
 */
type LanguageOptions$1 = Record<string, unknown>;
/**
 * The context object that is passed to the language plugin methods.
 */
interface LanguageContext$1<LangOptions = LanguageOptions$1> {
  languageOptions: LangOptions;
}
/**
 * Represents a file read by ESLint.
 */
interface File$1 {
  /**
   * The path that ESLint uses for this file. May be a virtual path
   * if it was returned by a processor.
   */
  path: string;
  /**
   * The path to the file on disk. This always maps directly to a file
   * regardless of whether it was returned from a processor.
   */
  physicalPath: string;
  /**
   * Indicates if the original source contained a byte-order marker.
   * ESLint strips the BOM from the `body`, but this info is needed
   * to correctly apply autofixing.
   */
  bom: boolean;
  /**
   * The body of the file to parse.
   */
  body: string | Uint8Array;
}
/**
 * Represents the successful result of parsing a file.
 */
interface OkParseResult$1<RootNode = unknown> {
  /**
   * Indicates if the parse was successful. If true, the parse was successful
   * and ESLint should continue on to create a SourceCode object and run rules;
   * if false, ESLint should just report the error(s) without doing anything
   * else.
   */
  ok: true;
  /**
   * The abstract syntax tree created by the parser. (only when ok: true)
   */
  ast: RootNode;
  /**
   * Any additional data that the parser wants to provide.
   */
  [key: string]: any;
}
/**
 * Represents the unsuccessful result of parsing a file.
 */
interface NotOkParseResult$1 {
  /**
   * Indicates if the parse was successful. If true, the parse was successful
   * and ESLint should continue on to create a SourceCode object and run rules;
   * if false, ESLint should just report the error(s) without doing anything
   * else.
   */
  ok: false;
  /**
   * Any parsing errors, whether fatal or not. (only when ok: false)
   */
  errors: FileError$1[];
  /**
   * Any additional data that the parser wants to provide.
   */
  [key: string]: any;
}
type ParseResult$1<RootNode = unknown> = OkParseResult$1<RootNode> | NotOkParseResult$1;
/**
 * Represents inline configuration found in the source code.
 */
interface InlineConfigElement$1 {
  /**
   * The location of the inline config element.
   */
  loc: SourceLocation$3;
  /**
   * The interpreted configuration from the inline config element.
   */
  config: {
    rules: RulesConfig$1;
  };
}
/**
 * Generic options for the `SourceCodeBase` type.
 */
interface SourceCodeBaseTypeOptions$1 {
  LangOptions: LanguageOptions$1;
  RootNode: unknown;
  SyntaxElementWithLoc: unknown;
  ConfigNode: unknown;
}
/**
 * Represents the basic interface for a source code object.
 */
interface SourceCodeBase$1<Options extends SourceCodeBaseTypeOptions$1 = {
  LangOptions: LanguageOptions$1;
  RootNode: unknown;
  SyntaxElementWithLoc: unknown;
  ConfigNode: unknown;
}> {
  /**
   * Root of the AST.
   */
  ast: Options["RootNode"];
  /**
   * The traversal path that tools should take when evaluating the AST.
   * When present, this overrides the `visitorKeys` on the language for
   * just this source code object.
   */
  visitorKeys?: Record<string, string[]>;
  /**
   * Retrieves the equivalent of `loc` for a given node or token.
   * @param syntaxElement The node or token to get the location for.
   * @returns The location of the node or token.
   */
  getLoc(syntaxElement: Options["SyntaxElementWithLoc"]): SourceLocation$3;
  /**
   * Retrieves the equivalent of `range` for a given node or token.
   * @param syntaxElement The node or token to get the range for.
   * @returns The range of the node or token.
   */
  getRange(syntaxElement: Options["SyntaxElementWithLoc"]): SourceRange$1;
  /**
   * Traversal of AST.
   */
  traverse(): Iterable<TraversalStep$1>;
  /**
   * Applies language options passed in from the ESLint core.
   */
  applyLanguageOptions?(languageOptions: Options["LangOptions"]): void;
  /**
   * Return all of the inline areas where ESLint should be disabled/enabled
   * along with any problems found in evaluating the directives.
   */
  getDisableDirectives?(): {
    directives: Directive$2[];
    problems: FileProblem$1[];
  };
  /**
   * Returns an array of all inline configuration nodes found in the
   * source code.
   */
  getInlineConfigNodes?(): Options["ConfigNode"][];
  /**
   * Applies configuration found inside of the source code. This method is only
   * called when ESLint is running with inline configuration allowed.
   */
  applyInlineConfig?(): {
    configs: InlineConfigElement$1[];
    problems: FileProblem$1[];
  };
  /**
   * Called by ESLint core to indicate that it has finished providing
   * information. We now add in all the missing variables and ensure that
   * state-changing methods cannot be called by rules.
   * @returns {void}
   */
  finalize?(): void;
}
/**
 * Represents the source of a text file being linted.
 */
interface TextSourceCode$1<Options extends SourceCodeBaseTypeOptions$1 = {
  LangOptions: LanguageOptions$1;
  RootNode: unknown;
  SyntaxElementWithLoc: unknown;
  ConfigNode: unknown;
}> extends SourceCodeBase$1<Options> {
  /**
   * The body of the file that you'd like rule developers to access.
   */
  text: string;
}
/**
 * Represents the source of a binary file being linted.
 */
interface BinarySourceCode$1<Options extends SourceCodeBaseTypeOptions$1 = {
  LangOptions: LanguageOptions$1;
  RootNode: unknown;
  SyntaxElementWithLoc: unknown;
  ConfigNode: unknown;
}> extends SourceCodeBase$1<Options> {
  /**
   * The body of the file that you'd like rule developers to access.
   */
  body: Uint8Array;
}
type SourceCode$2<Options extends SourceCodeBaseTypeOptions$1 = {
  LangOptions: LanguageOptions$1;
  RootNode: unknown;
  SyntaxElementWithLoc: unknown;
  ConfigNode: unknown;
}> = TextSourceCode$1<Options> | BinarySourceCode$1<Options>;
/**
 * Represents a traversal step visiting the AST.
 */
interface VisitTraversalStep$1 {
  kind: 1;
  target: unknown;
  phase: 1 | 2;
  args: unknown[];
}
/**
 * Represents a traversal step calling a function.
 */
interface CallTraversalStep$1 {
  kind: 2;
  target: string;
  phase?: string;
  args: unknown[];
}
type TraversalStep$1 = VisitTraversalStep$1 | CallTraversalStep$1;
/**
 * The type of disable directive. This determines how ESLint will disable rules.
 */
type DirectiveType$1 = "disable" | "enable" | "disable-line" | "disable-next-line";
/**
 * Represents a disable directive.
 */
interface Directive$2 {
  /**
   * The type of directive.
   */
  type: DirectiveType$1;
  /**
   * The node of the directive. May be in the AST or a comment/token.
   */
  node: unknown;
  /**
   * The value of the directive.
   */
  value: string;
  /**
   * The justification for the directive.
   */
  justification?: string;
}
//#endregion
//#region ../../node_modules/.pnpm/@eslint+config-helpers@0.5.3/node_modules/@eslint/config-helpers/dist/esm/types.d.ts
/**
 * Infinite array type.
 */
type InfiniteArray<T> = T | InfiniteArray<T>[];
/**
 * A config object that may appear inside of `extends`.
 * `basePath` and nested `extends` are not allowed on extension config objects.
 */
type ExtensionConfigObject = Omit<ConfigObject$1, "basePath"> & {
  extends?: never;
};
/**
 * The type of array element in the `extends` property after flattening.
 */
type SimpleExtendsElement = string | ExtensionConfigObject;
/**
 * The type of array element in the `extends` property before flattening.
 */
type ExtendsElement = SimpleExtendsElement | InfiniteArray<ExtensionConfigObject>;
/**
 * Config with extends. Valid only inside of `defineConfig()`.
 */
interface ConfigWithExtends$1 extends ConfigObject$1 {
  extends?: ExtendsElement[];
}
//#endregion
//#region ../../node_modules/.pnpm/@eslint+config-helpers@0.5.3/node_modules/@eslint/config-helpers/dist/esm/index.d.ts
type Plugin$2 = Plugin$3;
type ConfigWithExtends = ConfigWithExtends$1;
//#endregion
//#region ../../node_modules/.pnpm/@types+estree@1.0.8/node_modules/@types/estree/index.d.ts
// This definition file follows a somewhat unusual format. ESTree allows
// runtime type checks based on the `type` parameter. In order to explain this
// to typescript we want to use discriminated union types:
// https://github.com/Microsoft/TypeScript/pull/9163
//
// For ESTree this is a bit tricky because the high level interfaces like
// Node or Function are pulling double duty. We want to pass common fields down
// to the interfaces that extend them (like Identifier or
// ArrowFunctionExpression), but you can't extend a type union or enforce
// common fields on them. So we've split the high level interfaces into two
// types, a base type which passes down inherited fields, and a type union of
// all types which extend the base type. Only the type union is exported, and
// the union is how other types refer to the collection of inheriting types.
//
// This makes the definitions file here somewhat more difficult to maintain,
// but it has the notable advantage of making ESTree much easier to use as
// an end user.
interface BaseNodeWithoutComments {
  // Every leaf interface that extends BaseNode must specify a type property.
  // The type property should be a string literal. For example, Identifier
  // has: `type: "Identifier"`
  type: string;
  loc?: SourceLocation$2 | null | undefined;
  range?: [number, number] | undefined;
}
interface BaseNode extends BaseNodeWithoutComments {
  leadingComments?: Comment[] | undefined;
  trailingComments?: Comment[] | undefined;
}
interface NodeMap {
  AssignmentProperty: AssignmentProperty;
  CatchClause: CatchClause;
  Class: Class;
  ClassBody: ClassBody;
  Expression: Expression;
  Function: Function;
  Identifier: Identifier;
  Literal: Literal;
  MethodDefinition: MethodDefinition;
  ModuleDeclaration: ModuleDeclaration;
  ModuleSpecifier: ModuleSpecifier;
  Pattern: Pattern;
  PrivateIdentifier: PrivateIdentifier;
  Program: Program;
  Property: Property;
  PropertyDefinition: PropertyDefinition;
  SpreadElement: SpreadElement;
  Statement: Statement;
  Super: Super;
  SwitchCase: SwitchCase;
  TemplateElement: TemplateElement;
  VariableDeclarator: VariableDeclarator;
}
type Node$1 = NodeMap[keyof NodeMap];
interface Comment extends BaseNodeWithoutComments {
  type: "Line" | "Block";
  value: string;
}
interface SourceLocation$2 {
  source?: string | null | undefined;
  start: Position$1;
  end: Position$1;
}
interface Position$1 {
  /** >= 1 */
  line: number;
  /** >= 0 */
  column: number;
}
interface Program extends BaseNode {
  type: "Program";
  sourceType: "script" | "module";
  body: Array<Directive$1 | Statement | ModuleDeclaration>;
  comments?: Comment[] | undefined;
}
interface Directive$1 extends BaseNode {
  type: "ExpressionStatement";
  expression: Literal;
  directive: string;
}
interface BaseFunction extends BaseNode {
  params: Pattern[];
  generator?: boolean | undefined;
  async?: boolean | undefined; // The body is either BlockStatement or Expression because arrow functions
  // can have a body that's either. FunctionDeclarations and
  // FunctionExpressions have only BlockStatement bodies.
  body: BlockStatement | Expression;
}
type Function = FunctionDeclaration | FunctionExpression | ArrowFunctionExpression;
type Statement = ExpressionStatement | BlockStatement | StaticBlock | EmptyStatement | DebuggerStatement | WithStatement | ReturnStatement | LabeledStatement | BreakStatement | ContinueStatement | IfStatement | SwitchStatement | ThrowStatement | TryStatement | WhileStatement | DoWhileStatement | ForStatement | ForInStatement | ForOfStatement | Declaration;
interface BaseStatement extends BaseNode {}
interface EmptyStatement extends BaseStatement {
  type: "EmptyStatement";
}
interface BlockStatement extends BaseStatement {
  type: "BlockStatement";
  body: Statement[];
  innerComments?: Comment[] | undefined;
}
interface StaticBlock extends Omit<BlockStatement, "type"> {
  type: "StaticBlock";
}
interface ExpressionStatement extends BaseStatement {
  type: "ExpressionStatement";
  expression: Expression;
}
interface IfStatement extends BaseStatement {
  type: "IfStatement";
  test: Expression;
  consequent: Statement;
  alternate?: Statement | null | undefined;
}
interface LabeledStatement extends BaseStatement {
  type: "LabeledStatement";
  label: Identifier;
  body: Statement;
}
interface BreakStatement extends BaseStatement {
  type: "BreakStatement";
  label?: Identifier | null | undefined;
}
interface ContinueStatement extends BaseStatement {
  type: "ContinueStatement";
  label?: Identifier | null | undefined;
}
interface WithStatement extends BaseStatement {
  type: "WithStatement";
  object: Expression;
  body: Statement;
}
interface SwitchStatement extends BaseStatement {
  type: "SwitchStatement";
  discriminant: Expression;
  cases: SwitchCase[];
}
interface ReturnStatement extends BaseStatement {
  type: "ReturnStatement";
  argument?: Expression | null | undefined;
}
interface ThrowStatement extends BaseStatement {
  type: "ThrowStatement";
  argument: Expression;
}
interface TryStatement extends BaseStatement {
  type: "TryStatement";
  block: BlockStatement;
  handler?: CatchClause | null | undefined;
  finalizer?: BlockStatement | null | undefined;
}
interface WhileStatement extends BaseStatement {
  type: "WhileStatement";
  test: Expression;
  body: Statement;
}
interface DoWhileStatement extends BaseStatement {
  type: "DoWhileStatement";
  body: Statement;
  test: Expression;
}
interface ForStatement extends BaseStatement {
  type: "ForStatement";
  init?: VariableDeclaration | Expression | null | undefined;
  test?: Expression | null | undefined;
  update?: Expression | null | undefined;
  body: Statement;
}
interface BaseForXStatement extends BaseStatement {
  left: VariableDeclaration | Pattern;
  right: Expression;
  body: Statement;
}
interface ForInStatement extends BaseForXStatement {
  type: "ForInStatement";
}
interface DebuggerStatement extends BaseStatement {
  type: "DebuggerStatement";
}
type Declaration = FunctionDeclaration | VariableDeclaration | ClassDeclaration;
interface BaseDeclaration extends BaseStatement {}
interface MaybeNamedFunctionDeclaration extends BaseFunction, BaseDeclaration {
  type: "FunctionDeclaration";
  /** It is null when a function declaration is a part of the `export default function` statement */
  id: Identifier | null;
  body: BlockStatement;
}
interface FunctionDeclaration extends MaybeNamedFunctionDeclaration {
  id: Identifier;
}
interface VariableDeclaration extends BaseDeclaration {
  type: "VariableDeclaration";
  declarations: VariableDeclarator[];
  kind: "var" | "let" | "const" | "using" | "await using";
}
interface VariableDeclarator extends BaseNode {
  type: "VariableDeclarator";
  id: Pattern;
  init?: Expression | null | undefined;
}
interface ExpressionMap {
  ArrayExpression: ArrayExpression;
  ArrowFunctionExpression: ArrowFunctionExpression;
  AssignmentExpression: AssignmentExpression;
  AwaitExpression: AwaitExpression;
  BinaryExpression: BinaryExpression;
  CallExpression: CallExpression;
  ChainExpression: ChainExpression;
  ClassExpression: ClassExpression;
  ConditionalExpression: ConditionalExpression;
  FunctionExpression: FunctionExpression;
  Identifier: Identifier;
  ImportExpression: ImportExpression;
  Literal: Literal;
  LogicalExpression: LogicalExpression;
  MemberExpression: MemberExpression;
  MetaProperty: MetaProperty;
  NewExpression: NewExpression;
  ObjectExpression: ObjectExpression;
  SequenceExpression: SequenceExpression;
  TaggedTemplateExpression: TaggedTemplateExpression;
  TemplateLiteral: TemplateLiteral;
  ThisExpression: ThisExpression;
  UnaryExpression: UnaryExpression;
  UpdateExpression: UpdateExpression;
  YieldExpression: YieldExpression;
}
type Expression = ExpressionMap[keyof ExpressionMap];
interface BaseExpression extends BaseNode {}
type ChainElement = SimpleCallExpression | MemberExpression;
interface ChainExpression extends BaseExpression {
  type: "ChainExpression";
  expression: ChainElement;
}
interface ThisExpression extends BaseExpression {
  type: "ThisExpression";
}
interface ArrayExpression extends BaseExpression {
  type: "ArrayExpression";
  elements: Array<Expression | SpreadElement | null>;
}
interface ObjectExpression extends BaseExpression {
  type: "ObjectExpression";
  properties: Array<Property | SpreadElement>;
}
interface PrivateIdentifier extends BaseNode {
  type: "PrivateIdentifier";
  name: string;
}
interface Property extends BaseNode {
  type: "Property";
  key: Expression | PrivateIdentifier;
  value: Expression | Pattern; // Could be an AssignmentProperty
  kind: "init" | "get" | "set";
  method: boolean;
  shorthand: boolean;
  computed: boolean;
}
interface PropertyDefinition extends BaseNode {
  type: "PropertyDefinition";
  key: Expression | PrivateIdentifier;
  value?: Expression | null | undefined;
  computed: boolean;
  static: boolean;
}
interface FunctionExpression extends BaseFunction, BaseExpression {
  id?: Identifier | null | undefined;
  type: "FunctionExpression";
  body: BlockStatement;
}
interface SequenceExpression extends BaseExpression {
  type: "SequenceExpression";
  expressions: Expression[];
}
interface UnaryExpression extends BaseExpression {
  type: "UnaryExpression";
  operator: UnaryOperator;
  prefix: true;
  argument: Expression;
}
interface BinaryExpression extends BaseExpression {
  type: "BinaryExpression";
  operator: BinaryOperator;
  left: Expression | PrivateIdentifier;
  right: Expression;
}
interface AssignmentExpression extends BaseExpression {
  type: "AssignmentExpression";
  operator: AssignmentOperator;
  left: Pattern | MemberExpression;
  right: Expression;
}
interface UpdateExpression extends BaseExpression {
  type: "UpdateExpression";
  operator: UpdateOperator;
  argument: Expression;
  prefix: boolean;
}
interface LogicalExpression extends BaseExpression {
  type: "LogicalExpression";
  operator: LogicalOperator;
  left: Expression;
  right: Expression;
}
interface ConditionalExpression extends BaseExpression {
  type: "ConditionalExpression";
  test: Expression;
  alternate: Expression;
  consequent: Expression;
}
interface BaseCallExpression extends BaseExpression {
  callee: Expression | Super;
  arguments: Array<Expression | SpreadElement>;
}
type CallExpression = SimpleCallExpression | NewExpression;
interface SimpleCallExpression extends BaseCallExpression {
  type: "CallExpression";
  optional: boolean;
}
interface NewExpression extends BaseCallExpression {
  type: "NewExpression";
}
interface MemberExpression extends BaseExpression, BasePattern {
  type: "MemberExpression";
  object: Expression | Super;
  property: Expression | PrivateIdentifier;
  computed: boolean;
  optional: boolean;
}
type Pattern = Identifier | ObjectPattern | ArrayPattern | RestElement | AssignmentPattern | MemberExpression;
interface BasePattern extends BaseNode {}
interface SwitchCase extends BaseNode {
  type: "SwitchCase";
  test?: Expression | null | undefined;
  consequent: Statement[];
}
interface CatchClause extends BaseNode {
  type: "CatchClause";
  param: Pattern | null;
  body: BlockStatement;
}
interface Identifier extends BaseNode, BaseExpression, BasePattern {
  type: "Identifier";
  name: string;
}
type Literal = SimpleLiteral | RegExpLiteral | BigIntLiteral;
interface SimpleLiteral extends BaseNode, BaseExpression {
  type: "Literal";
  value: string | boolean | number | null;
  raw?: string | undefined;
}
interface RegExpLiteral extends BaseNode, BaseExpression {
  type: "Literal";
  value?: RegExp | null | undefined;
  regex: {
    pattern: string;
    flags: string;
  };
  raw?: string | undefined;
}
interface BigIntLiteral extends BaseNode, BaseExpression {
  type: "Literal";
  value?: bigint | null | undefined;
  bigint: string;
  raw?: string | undefined;
}
type UnaryOperator = "-" | "+" | "!" | "~" | "typeof" | "void" | "delete";
type BinaryOperator = "==" | "!=" | "===" | "!==" | "<" | "<=" | ">" | ">=" | "<<" | ">>" | ">>>" | "+" | "-" | "*" | "/" | "%" | "**" | "|" | "^" | "&" | "in" | "instanceof";
type LogicalOperator = "||" | "&&" | "??";
type AssignmentOperator = "=" | "+=" | "-=" | "*=" | "/=" | "%=" | "**=" | "<<=" | ">>=" | ">>>=" | "|=" | "^=" | "&=" | "||=" | "&&=" | "??=";
type UpdateOperator = "++" | "--";
interface ForOfStatement extends BaseForXStatement {
  type: "ForOfStatement";
  await: boolean;
}
interface Super extends BaseNode {
  type: "Super";
}
interface SpreadElement extends BaseNode {
  type: "SpreadElement";
  argument: Expression;
}
interface ArrowFunctionExpression extends BaseExpression, BaseFunction {
  type: "ArrowFunctionExpression";
  expression: boolean;
  body: BlockStatement | Expression;
}
interface YieldExpression extends BaseExpression {
  type: "YieldExpression";
  argument?: Expression | null | undefined;
  delegate: boolean;
}
interface TemplateLiteral extends BaseExpression {
  type: "TemplateLiteral";
  quasis: TemplateElement[];
  expressions: Expression[];
}
interface TaggedTemplateExpression extends BaseExpression {
  type: "TaggedTemplateExpression";
  tag: Expression;
  quasi: TemplateLiteral;
}
interface TemplateElement extends BaseNode {
  type: "TemplateElement";
  tail: boolean;
  value: {
    /** It is null when the template literal is tagged and the text has an invalid escape (e.g. - tag`\unicode and \u{55}`) */cooked?: string | null | undefined;
    raw: string;
  };
}
interface AssignmentProperty extends Property {
  value: Pattern;
  kind: "init";
  method: boolean; // false
}
interface ObjectPattern extends BasePattern {
  type: "ObjectPattern";
  properties: Array<AssignmentProperty | RestElement>;
}
interface ArrayPattern extends BasePattern {
  type: "ArrayPattern";
  elements: Array<Pattern | null>;
}
interface RestElement extends BasePattern {
  type: "RestElement";
  argument: Pattern;
}
interface AssignmentPattern extends BasePattern {
  type: "AssignmentPattern";
  left: Pattern;
  right: Expression;
}
type Class = ClassDeclaration | ClassExpression;
interface BaseClass extends BaseNode {
  superClass?: Expression | null | undefined;
  body: ClassBody;
}
interface ClassBody extends BaseNode {
  type: "ClassBody";
  body: Array<MethodDefinition | PropertyDefinition | StaticBlock>;
}
interface MethodDefinition extends BaseNode {
  type: "MethodDefinition";
  key: Expression | PrivateIdentifier;
  value: FunctionExpression;
  kind: "constructor" | "method" | "get" | "set";
  computed: boolean;
  static: boolean;
}
interface MaybeNamedClassDeclaration extends BaseClass, BaseDeclaration {
  type: "ClassDeclaration";
  /** It is null when a class declaration is a part of the `export default class` statement */
  id: Identifier | null;
}
interface ClassDeclaration extends MaybeNamedClassDeclaration {
  id: Identifier;
}
interface ClassExpression extends BaseClass, BaseExpression {
  type: "ClassExpression";
  id?: Identifier | null | undefined;
}
interface MetaProperty extends BaseExpression {
  type: "MetaProperty";
  meta: Identifier;
  property: Identifier;
}
type ModuleDeclaration = ImportDeclaration | ExportNamedDeclaration | ExportDefaultDeclaration | ExportAllDeclaration;
interface BaseModuleDeclaration extends BaseNode {}
type ModuleSpecifier = ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier | ExportSpecifier;
interface BaseModuleSpecifier extends BaseNode {
  local: Identifier;
}
interface ImportDeclaration extends BaseModuleDeclaration {
  type: "ImportDeclaration";
  specifiers: Array<ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier>;
  attributes: ImportAttribute[];
  source: Literal;
}
interface ImportSpecifier extends BaseModuleSpecifier {
  type: "ImportSpecifier";
  imported: Identifier | Literal;
}
interface ImportAttribute extends BaseNode {
  type: "ImportAttribute";
  key: Identifier | Literal;
  value: Literal;
}
interface ImportExpression extends BaseExpression {
  type: "ImportExpression";
  source: Expression;
  options?: Expression | null | undefined;
}
interface ImportDefaultSpecifier extends BaseModuleSpecifier {
  type: "ImportDefaultSpecifier";
}
interface ImportNamespaceSpecifier extends BaseModuleSpecifier {
  type: "ImportNamespaceSpecifier";
}
interface ExportNamedDeclaration extends BaseModuleDeclaration {
  type: "ExportNamedDeclaration";
  declaration?: Declaration | null | undefined;
  specifiers: ExportSpecifier[];
  attributes: ImportAttribute[];
  source?: Literal | null | undefined;
}
interface ExportSpecifier extends Omit<BaseModuleSpecifier, "local"> {
  type: "ExportSpecifier";
  local: Identifier | Literal;
  exported: Identifier | Literal;
}
interface ExportDefaultDeclaration extends BaseModuleDeclaration {
  type: "ExportDefaultDeclaration";
  declaration: MaybeNamedFunctionDeclaration | MaybeNamedClassDeclaration | Expression;
}
interface ExportAllDeclaration extends BaseModuleDeclaration {
  type: "ExportAllDeclaration";
  exported: Identifier | Literal | null;
  attributes: ImportAttribute[];
  source: Literal;
}
interface AwaitExpression extends BaseExpression {
  type: "AwaitExpression";
  argument: Expression;
}
//#endregion
//#region ../../node_modules/.pnpm/@eslint+core@1.2.0/node_modules/@eslint/core/dist/esm/types.d.ts
/**
 * Represents an error inside of a file.
 */
interface FileError {
  message: string;
  line: number;
  column: number;
  endLine?: number;
  endColumn?: number;
}
/**
 * Represents a problem found in a file.
 */
interface FileProblem {
  ruleId: string | null;
  message: string;
  loc: SourceLocation$1;
}
/**
 * Represents the start and end coordinates of a node inside the source.
 */
interface SourceLocation$1 {
  start: Position;
  end: Position;
}
/**
 * Represents a location coordinate inside the source. ESLint-style formats
 * have just `line` and `column` while others may have `offset` as well.
 */
interface Position {
  line: number;
  column: number;
}
/**
 * Represents a range of characters in the source.
 */
type SourceRange = [number, number];
/**
 * What the rule is responsible for finding:
 * - `problem` means the rule has noticed a potential error.
 * - `suggestion` means the rule suggests an alternate or better approach.
 * - `layout` means the rule is looking at spacing, indentation, etc.
 */
type RuleType = "problem" | "suggestion" | "layout";
/**
 * The type of fix the rule can provide:
 * - `code` means the rule can fix syntax.
 * - `whitespace` means the rule can fix spacing and indentation.
 */
type RuleFixType = "code" | "whitespace";
/**
 * An object containing visitor information for a rule. Each method is either the
 * name of a node type or a selector, or is a method that will be called at specific
 * times during the traversal.
 */
type RuleVisitor$1 = Record<string, ((...args: any[]) => void) | undefined>;
/**
 * Rule meta information used for documentation.
 */
interface RulesMetaDocs {
  /**
   * A short description of the rule.
   */
  description?: string | undefined;
  /**
   * The URL to the documentation for the rule.
   */
  url?: string | undefined;
  /**
   * Indicates if the rule is generally recommended for all users.
   *
   * Note - this will always be a boolean for core rules, but may be used in any way by plugins.
   */
  recommended?: unknown;
  /**
   * Indicates if the rule is frozen (no longer accepting feature requests).
   */
  frozen?: boolean | undefined;
  /**
   * The dialects of the languages that the rule is intended to lint.
   * @example
   * ["JavaScript", "TypeScript"]
   */
  dialects?: string[] | undefined;
}
/**
 * Meta information about a rule.
 */
interface RulesMeta<MessageIds extends string = string, RuleOptions = unknown[], ExtRuleDocs = unknown> {
  /**
   * Properties that are used when documenting the rule.
   */
  docs?: (RulesMetaDocs & ExtRuleDocs) | undefined;
  /**
   * The type of rule.
   */
  type?: RuleType | undefined;
  /**
   * The schema for the rule options. Required if the rule has options.
   */
  schema?: JSONSchema4 | JSONSchema4[] | false | undefined;
  /**
   * Any default options to be recursively merged on top of any user-provided options.
   */
  defaultOptions?: RuleOptions;
  /**
   * The messages that the rule can report.
   */
  messages?: Record<MessageIds, string>;
  /**
   * Indicates whether the rule has been deprecated or provides additional metadata about the deprecation. Omit if not deprecated.
   */
  deprecated?: boolean | DeprecatedInfo | undefined;
  /**
   * @deprecated Use deprecated.replacedBy instead.
   * The name of the rule(s) this rule was replaced by, if it was deprecated.
   */
  replacedBy?: readonly string[] | undefined;
  /**
   * Indicates if the rule is fixable, and if so, what type of fix it provides.
   */
  fixable?: RuleFixType | undefined;
  /**
   * Indicates if the rule may provide suggestions.
   */
  hasSuggestions?: boolean | undefined;
  /**
   * The language the rule is intended to lint.
   * @deprecated Use `languages` instead.
   */
  language?: string;
  /**
   * The dialects of `language` that the rule is intended to lint.
   * @deprecated Use `docs.dialects` instead.
   */
  dialects?: string[];
  /**
   * Languages supported by this rule in the format `"plugin/language"`.
   * Use `"*"` for any language or `"plugin/*"` for any language from a specific plugin.
   * @example
   * ["js/js", "markdown/gfm", "json/jsonc", "css/css"]
   */
  languages?: string[] | undefined;
}
/**
 * Provides additional metadata about a deprecation.
 */
interface DeprecatedInfo {
  /**
   * General message presented to the user, e.g. for the key rule why the rule
   * is deprecated or for info how to replace the rule.
   */
  message?: string;
  /**
   * URL to more information about this deprecation in general.
   */
  url?: string;
  /**
   * An empty array explicitly states that there is no replacement.
   */
  replacedBy?: ReplacedByInfo[];
  /**
   * The package version since when the rule is deprecated (should use full
   * semver without a leading "v").
   */
  deprecatedSince?: string;
  /**
   * The estimated version when the rule is removed (probably the next major
   * version). null means the rule is "frozen" (will be available but will not
   * be changed).
   */
  availableUntil?: string | null;
}
/**
 * Provides metadata about a replacement
 */
interface ReplacedByInfo {
  /**
   * General message presented to the user, e.g. how to replace the rule
   */
  message?: string;
  /**
   * URL to more information about this replacement in general
   */
  url?: string;
  /**
   * Name should be "eslint" if the replacement is an ESLint core rule. Omit
   * the property if the replacement is in the same plugin.
   */
  plugin?: ExternalSpecifier;
  /**
   * Name and documentation of the replacement rule
   */
  rule?: ExternalSpecifier;
}
/**
 * Specifies the name and url of an external resource. At least one property
 * should be set.
 */
interface ExternalSpecifier {
  /**
   * Name of the referenced plugin / rule.
   */
  name?: string;
  /**
   * URL pointing to documentation for the plugin / rule.
   */
  url?: string;
}
/**
 * Generic type for `RuleContext`.
 */
interface RuleContextTypeOptions {
  LangOptions: LanguageOptions;
  Code: SourceCode$1;
  RuleOptions: unknown[];
  Node: unknown;
  MessageIds: string;
}
/**
 * Represents the context object that is passed to a rule. This object contains
 * information about the current state of the linting process and is the rule's
 * view into the outside world.
 */
interface RuleContext$1<Options extends RuleContextTypeOptions = RuleContextTypeOptions> {
  /**
   * The current working directory for the session.
   */
  cwd: string;
  /**
   * The filename of the file being linted.
   */
  filename: string;
  /**
   * The physical filename of the file being linted.
   */
  physicalFilename: string;
  /**
   * The source code object that the rule is running on.
   */
  sourceCode: Options["Code"];
  /**
   * Shared settings for the configuration.
   */
  settings: SettingsConfig;
  /**
   * The language options for the configuration.
   */
  languageOptions: Options["LangOptions"];
  /**
   * The rule ID.
   */
  id: string;
  /**
   * The rule's configured options.
   */
  options: Options["RuleOptions"];
  /**
   * The report function that the rule should use to report problems.
   * @param violation The violation to report.
   */
  report(violation: ViolationReport<Options["Node"], Options["MessageIds"]>): void;
}
/**
 * Manager of text edits for a rule fix.
 */
interface RuleTextEditor<EditableSyntaxElement = unknown> {
  /**
   * Inserts text after the specified node or token.
   * @param syntaxElement The node or token to insert after.
   * @param text The edit to insert after the node or token.
   */
  insertTextAfter(syntaxElement: EditableSyntaxElement, text: string): RuleTextEdit;
  /**
   * Inserts text after the specified range.
   * @param range The range to insert after.
   * @param text The edit to insert after the range.
   */
  insertTextAfterRange(range: SourceRange, text: string): RuleTextEdit;
  /**
   * Inserts text before the specified node or token.
   * @param syntaxElement A syntax element with location information to insert before.
   * @param text The edit to insert before the node or token.
   */
  insertTextBefore(syntaxElement: EditableSyntaxElement, text: string): RuleTextEdit;
  /**
   * Inserts text before the specified range.
   * @param range The range to insert before.
   * @param text The edit to insert before the range.
   */
  insertTextBeforeRange(range: SourceRange, text: string): RuleTextEdit;
  /**
   * Removes the specified node or token.
   * @param syntaxElement A syntax element with location information to remove.
   * @returns The edit to remove the node or token.
   */
  remove(syntaxElement: EditableSyntaxElement): RuleTextEdit;
  /**
   * Removes the specified range.
   * @param range The range to remove.
   * @returns The edit to remove the range.
   */
  removeRange(range: SourceRange): RuleTextEdit;
  /**
   * Replaces the specified node or token with the given text.
   * @param syntaxElement A syntax element with location information to replace.
   * @param text The text to replace the node or token with.
   * @returns The edit to replace the node or token.
   */
  replaceText(syntaxElement: EditableSyntaxElement, text: string): RuleTextEdit;
  /**
   * Replaces the specified range with the given text.
   * @param range The range to replace.
   * @param text The text to replace the range with.
   * @returns The edit to replace the range.
   */
  replaceTextRange(range: SourceRange, text: string): RuleTextEdit;
}
/**
 * Represents a fix for a rule violation implemented as a text edit.
 */
interface RuleTextEdit {
  /**
   * The range to replace.
   */
  range: SourceRange;
  /**
   * The text to insert.
   */
  text: string;
}
/**
 * Fixes a violation.
 * @param fixer The text editor to apply the fix.
 * @returns The fix(es) for the violation.
 */
type RuleFixer = (fixer: RuleTextEditor) => RuleTextEdit | Iterable<RuleTextEdit> | null;
/**
 * Data that can be used to fill placeholders in error messages.
 */
type MessagePlaceholderData = Record<string, string | number | boolean | bigint | null | undefined>;
interface ViolationReportBase<MessageIds extends string = string> {
  /**
   * The data to insert into the message.
   */
  data?: MessagePlaceholderData | undefined;
  /**
   * The fix to be applied for the violation.
   */
  fix?: RuleFixer | null | undefined;
  /**
   * An array of suggested fixes for the problem. These fixes may change the
   * behavior of the code, so they are not applied automatically.
   */
  suggest?: SuggestedEdit<MessageIds>[] | null | undefined;
}
type ViolationMessage<MessageIds extends string = string> = {
  message: string;
} | {
  messageId: MessageIds;
};
type ViolationLocation<Node> = {
  loc: SourceLocation$1 | Position;
} | {
  node: Node;
};
type ViolationReport<Node = unknown, MessageIds extends string = string> = ViolationReportBase<MessageIds> & ViolationMessage<MessageIds> & ViolationLocation<Node>;
interface SuggestedEditBase {
  /**
   * The data to insert into the message.
   */
  data?: MessagePlaceholderData | undefined;
  /**
   * The fix to be applied for the suggestion.
   */
  fix: RuleFixer;
}
type SuggestionMessage<MessageIds extends string = string> = {
  desc: string;
} | {
  messageId: MessageIds;
};
/**
 * A suggested edit for a rule violation.
 */
type SuggestedEdit<MessageIds extends string = string> = SuggestedEditBase & SuggestionMessage<MessageIds>;
/**
 * The normalized version of a lint suggestion.
 */
interface LintSuggestion {
  /** A short description. */
  desc: string;
  /** Fix result info. */
  fix: RuleTextEdit;
  /** Id referencing a message for the description. */
  messageId?: string | undefined;
}
/**
 * The normalized version of a lint violation message.
 */
interface LintMessage$1 {
  /** The 1-based column number. */
  column: number;
  /** The 1-based line number. */
  line: number;
  /** The 1-based column number of the end location. */
  endColumn?: number | undefined;
  /** The 1-based line number of the end location. */
  endLine?: number | undefined;
  /** The ID of the rule which makes this message. */
  ruleId: string | null;
  /** The reported message. */
  message: string;
  /** The ID of the message in the rule's meta. */
  messageId?: string | undefined;
  /** If `true` then this is a fatal error. */
  fatal?: true | undefined;
  /** The severity of this message. */
  severity: Exclude<SeverityLevel, 0>;
  /** Information for autofix. */
  fix?: RuleTextEdit | undefined;
  /** Information for suggestions. */
  suggestions?: LintSuggestion[] | undefined;
}
/**
 * Generic options for the `RuleDefinition` type.
 */
interface RuleDefinitionTypeOptions {
  LangOptions: LanguageOptions;
  Code: SourceCode$1;
  RuleOptions: unknown[];
  Visitor: RuleVisitor$1;
  Node: unknown;
  MessageIds: string;
  ExtRuleDocs: unknown;
}
/**
 * The definition of an ESLint rule.
 */
interface RuleDefinition<Options extends RuleDefinitionTypeOptions = RuleDefinitionTypeOptions> {
  /**
   * The meta information for the rule.
   */
  meta?: RulesMeta<Options["MessageIds"], Options["RuleOptions"], Options["ExtRuleDocs"]>;
  /**
   * Creates the visitor that ESLint uses to apply the rule during traversal.
   * @param context The rule context.
   * @returns The rule visitor.
   */
  create(context: RuleContext$1<{
    LangOptions: Options["LangOptions"];
    Code: Options["Code"];
    RuleOptions: Options["RuleOptions"];
    Node: Options["Node"];
    MessageIds: Options["MessageIds"];
  }>): Options["Visitor"];
}
/**
 * The human readable severity level used in a configuration.
 */
type SeverityName = "off" | "warn" | "error";
/**
 * The numeric severity level for a rule.
 *
 * - `0` means off.
 * - `1` means warn.
 * - `2` means error.
 */
type SeverityLevel = 0 | 1 | 2;
/**
 * The severity of a rule in a configuration.
 */
type Severity = SeverityName | SeverityLevel;
/**
 * Represents the metadata for an object, such as a plugin or processor.
 */
interface ObjectMetaProperties {
  /** @deprecated Use `meta.name` instead. */
  name?: string | undefined;
  /** @deprecated Use `meta.version` instead. */
  version?: string | undefined;
  meta?: {
    name?: string | undefined;
    version?: string | undefined;
  };
}
/**
 * Represents the configuration options for the core linter.
 */
interface LinterOptionsConfig {
  /**
   * Indicates whether or not inline configuration is evaluated.
   */
  noInlineConfig?: boolean;
  /**
   * Indicates what to do when an unused disable directive is found.
   */
  reportUnusedDisableDirectives?: boolean | Severity;
  /**
   * A severity value indicating if and how unused inline configs should be
   * tracked and reported.
   */
  reportUnusedInlineConfigs?: Severity;
}
/**
 * The configuration for a rule.
 */
type RuleConfig<RuleOptions extends unknown[] = unknown[]> = Severity | [Severity, ...Partial<RuleOptions>];
/**
 * A collection of rules and their configurations.
 */
interface RulesConfig {
  [key: string]: RuleConfig;
}
/**
 * A collection of settings.
 */
interface SettingsConfig {
  [key: string]: unknown;
}
/**
 * The configuration for a set of files.
 */
interface ConfigObject<Rules extends RulesConfig = RulesConfig> {
  /**
   * A string to identify the configuration object. Used in error messages and
   * inspection tools.
   */
  name?: string;
  /**
   * Path to the directory where the configuration object should apply.
   * `files` and `ignores` patterns in the configuration object are
   * interpreted as relative to this path.
   */
  basePath?: string;
  /**
   * An array of glob patterns indicating the files that the configuration
   * object should apply to. If not specified, the configuration object applies
   * to all files
   */
  files?: (string | string[])[];
  /**
   * An array of glob patterns indicating the files that the configuration
   * object should not apply to. If not specified, the configuration object
   * applies to all files matched by files
   */
  ignores?: string[];
  /**
   * The name of the language used for linting. This is used to determine the
   * parser and other language-specific settings.
   * @since 9.7.0
   */
  language?: string;
  /**
   * An object containing settings related to how the language is configured for
   * linting.
   */
  languageOptions?: LanguageOptions;
  /**
   * An object containing settings related to the linting process
   */
  linterOptions?: LinterOptionsConfig;
  /**
   * Either an object containing preprocess() and postprocess() methods or a
   * string indicating the name of a processor inside of a plugin
   * (i.e., "pluginName/processorName").
   */
  processor?: string | Processor;
  /**
   * An object containing a name-value mapping of plugin names to plugin objects.
   * When files is specified, these plugins are only available to the matching files.
   */
  plugins?: Record<string, Plugin$1>;
  /**
   * An object containing the configured rules. When files or ignores are specified,
   * these rule configurations are only available to the matching files.
   */
  rules?: Partial<Rules>;
  /**
   * An object containing name-value pairs of information that should be
   * available to all rules.
   */
  settings?: SettingsConfig;
}
/** @deprecated Only supported in legacy eslintrc config format. */
type GlobalAccess = boolean | "off" | "readable" | "readonly" | "writable" | "writeable";
/** @deprecated Only supported in legacy eslintrc config format. */
interface GlobalsConfig {
  [name: string]: GlobalAccess;
}
/**
 * The ECMAScript version of the code being linted.
 * @deprecated Only supported in legacy eslintrc config format.
 */
type EcmaVersion$1 = 3 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 2015 | 2016 | 2017 | 2018 | 2019 | 2020 | 2021 | 2022 | 2023 | 2024 | 2025 | 2026 | "latest";
/**
 * The type of JavaScript source code.
 * @deprecated Only supported in legacy eslintrc config format.
 */
type JavaScriptSourceType = "script" | "module" | "commonjs";
/**
 * Parser options.
 * @deprecated Only supported in legacy eslintrc config format.
 * @see [Specifying Parser Options](https://eslint.org/docs/latest/use/configure/language-options#specifying-parser-options)
 */
interface JavaScriptParserOptionsConfig {
  /**
   * Allow the use of reserved words as identifiers (if `ecmaVersion` is 3).
   *
   * @default false
   */
  allowReserved?: boolean | undefined;
  /**
   * Accepts any valid ECMAScript version number or `'latest'`:
   *
   * - A version: es3, es5, es6, es7, es8, es9, es10, es11, es12, es13, es14, ..., or
   * - A year: es2015, es2016, es2017, es2018, es2019, es2020, es2021, es2022, es2023, ..., or
   * - `'latest'`
   *
   * When it's a version or a year, the value must be a number - so do not include the `es` prefix.
   *
   * Specifies the version of ECMAScript syntax you want to use. This is used by the parser to determine how to perform scope analysis, and it affects the default
   *
   * @default 5
   */
  ecmaVersion?: EcmaVersion$1 | undefined;
  /**
   * The type of JavaScript source code. Possible values are "script" for
   * traditional script files, "module" for ECMAScript modules (ESM), and
   * "commonjs" for CommonJS files.
   *
   * @default 'script'
   *
   * @see https://eslint.org/docs/latest/use/configure/language-options-deprecated#specifying-parser-options
   */
  sourceType?: JavaScriptSourceType | undefined;
  /**
   * An object indicating which additional language features you'd like to use.
   *
   * @see https://eslint.org/docs/latest/use/configure/language-options-deprecated#specifying-parser-options
   */
  ecmaFeatures?: {
    globalReturn?: boolean | undefined;
    impliedStrict?: boolean | undefined;
    jsx?: boolean | undefined;
    [key: string]: any;
  } | undefined;
  [key: string]: any;
}
/** @deprecated Only supported in legacy eslintrc config format. */
interface EnvironmentConfig {
  /** The definition of global variables. */
  globals?: GlobalsConfig | undefined;
  /** The parser options that will be enabled under this environment. */
  parserOptions?: JavaScriptParserOptionsConfig | undefined;
}
/**
 * A configuration object that may have a `rules` block.
 */
interface HasRules<Rules extends RulesConfig = RulesConfig> {
  rules?: Partial<Rules> | undefined;
}
/**
 * ESLint legacy configuration.
 *
 * @see [ESLint Legacy Configuration](https://eslint.org/docs/latest/use/configure/)
 */
interface BaseConfig<Rules extends RulesConfig = RulesConfig, OverrideRules extends RulesConfig = Rules> extends HasRules<Rules> {
  $schema?: string | undefined;
  /**
   * An environment provides predefined global variables.
   *
   * @see [Environments](https://eslint.org/docs/latest/use/configure/language-options-deprecated#specifying-environments)
   */
  env?: {
    [name: string]: boolean;
  } | undefined;
  /**
   * Extending configuration files.
   *
   * @see [Extends](https://eslint.org/docs/latest/use/configure/configuration-files-deprecated#extending-configuration-files)
   */
  extends?: string | string[] | undefined;
  /**
   * Specifying globals.
   *
   * @see [Globals](https://eslint.org/docs/latest/use/configure/language-options-deprecated#specifying-globals)
   */
  globals?: GlobalsConfig | undefined;
  /**
   * Disable processing of inline comments.
   *
   * @see [Disabling Inline Comments](https://eslint.org/docs/latest/use/configure/rules-deprecated#disabling-inline-comments)
   */
  noInlineConfig?: boolean | undefined;
  /**
   * Overrides can be used to use a differing configuration for matching sub-directories and files.
   *
   * @see [How do overrides work](https://eslint.org/docs/latest/use/configure/configuration-files-deprecated#how-do-overrides-work)
   */
  overrides?: ConfigOverride<OverrideRules>[] | undefined;
  /**
   * Parser.
   *
   * @see [Working with Custom Parsers](https://eslint.org/docs/latest/extend/custom-parsers)
   * @see [Specifying Parser](https://eslint.org/docs/latest/use/configure/parser-deprecated)
   */
  parser?: string | undefined;
  /**
   * Parser options.
   *
   * @see [Working with Custom Parsers](https://eslint.org/docs/latest/extend/custom-parsers)
   * @see [Specifying Parser Options](https://eslint.org/docs/latest/use/configure/language-options-deprecated#specifying-parser-options)
   */
  parserOptions?: JavaScriptParserOptionsConfig | undefined;
  /**
   * Which third-party plugins define additional rules, environments, configs, etc. for ESLint to use.
   *
   * @see [Configuring Plugins](https://eslint.org/docs/latest/use/configure/plugins-deprecated#configure-plugins)
   */
  plugins?: string[] | undefined;
  /**
   * Specifying processor.
   *
   * @see [processor](https://eslint.org/docs/latest/use/configure/plugins-deprecated#specify-a-processor)
   */
  processor?: string | undefined;
  /**
   * Report unused eslint-disable comments as warning.
   *
   * @see [Report unused eslint-disable comments](https://eslint.org/docs/latest/use/configure/rules-deprecated#report-unused-eslint-disable-comments)
   */
  reportUnusedDisableDirectives?: boolean | undefined;
  /**
   * Settings.
   *
   * @see [Settings](https://eslint.org/docs/latest/use/configure/configuration-files-deprecated#adding-shared-settings)
   */
  settings?: SettingsConfig | undefined;
}
/**
 * The overwrites that apply more differing configuration to specific files or directories.
 */
interface ConfigOverride<Rules extends RulesConfig = RulesConfig> extends BaseConfig<Rules> {
  /**
   * The glob patterns for excluded files.
   */
  excludedFiles?: string | string[] | undefined;
  /**
   * The glob patterns for target files.
   */
  files: string | string[];
}
/**
 * ESLint legacy configuration.
 *
 * @see [ESLint Legacy Configuration](https://eslint.org/docs/latest/use/configure/)
 */
interface LegacyConfigObject<Rules extends RulesConfig = RulesConfig, OverrideRules extends RulesConfig = Rules> extends BaseConfig<Rules, OverrideRules> {
  /**
   * Tell ESLint to ignore specific files and directories.
   *
   * @see [Ignore Patterns](https://eslint.org/docs/latest/use/configure/ignore-deprecated#ignorepatterns-in-config-files)
   */
  ignorePatterns?: string | string[] | undefined;
  /**
   * @see [Using Configuration Files](https://eslint.org/docs/latest/use/configure/configuration-files-deprecated#using-configuration-files)
   */
  root?: boolean | undefined;
}
/**
 * File information passed to a processor.
 */
interface ProcessorFile$1 {
  text: string;
  filename: string;
}
/**
 * A processor is an object that can preprocess and postprocess files.
 */
interface Processor<T extends string | ProcessorFile$1 = string | ProcessorFile$1> extends ObjectMetaProperties {
  /** If `true` then it means the processor supports autofix. */
  supportsAutofix?: boolean | undefined;
  /** The function to extract code blocks. */
  preprocess?(text: string, filename: string): T[];
  /** The function to merge messages. */
  postprocess?(messages: LintMessage$1[][], filename: string): LintMessage$1[];
}
interface Plugin$1 extends ObjectMetaProperties {
  meta?: ObjectMetaProperties["meta"] & {
    namespace?: string | undefined;
  };
  configs?: Record<string, LegacyConfigObject | ConfigObject | ConfigObject[]> | undefined;
  environments?: Record<string, EnvironmentConfig> | undefined;
  languages?: Record<string, Language> | undefined;
  processors?: Record<string, Processor> | undefined;
  rules?: Record<string, RuleDefinition> | undefined;
}
/**
 * Generic options for the `Language` type.
 */
interface LanguageTypeOptions {
  LangOptions: LanguageOptions;
  Code: SourceCode$1;
  RootNode: unknown;
  Node: unknown;
}
/**
 * Represents a plugin language.
 */
interface Language<Options extends LanguageTypeOptions = {
  LangOptions: LanguageOptions;
  Code: SourceCode$1;
  RootNode: unknown;
  Node: unknown;
}> {
  /**
   * Indicates how ESLint should read the file.
   */
  fileType: "text";
  /**
   * First line number returned from the parser (text mode only).
   */
  lineStart: 0 | 1;
  /**
   * First column number returned from the parser (text mode only).
   */
  columnStart: 0 | 1;
  /**
   * The property to read the node type from. Used in selector querying.
   */
  nodeTypeKey: string;
  /**
   * The traversal path that tools should take when evaluating the AST
   */
  visitorKeys?: Record<string, string[]>;
  /**
   * Default language options. User-defined options are merged with this object.
   */
  defaultLanguageOptions?: Options["LangOptions"];
  /**
   * Validates languageOptions for this language.
   */
  validateLanguageOptions(languageOptions: Options["LangOptions"]): void;
  /**
   * Normalizes languageOptions for this language.
   */
  normalizeLanguageOptions?(languageOptions: Options["LangOptions"]): Options["LangOptions"];
  /**
   * Helper for esquery that allows languages to match nodes against
   * class. esquery currently has classes like `function` that will
   * match all the various function nodes. This method allows languages
   * to implement similar shorthands.
   */
  matchesSelectorClass?(className: string, node: Options["Node"], ancestry: Options["Node"][]): boolean;
  /**
   * Parses the given file input into its component parts. This file should not
   * throws errors for parsing errors but rather should return any parsing
   * errors as parse of the ParseResult object.
   */
  parse(file: File, context: LanguageContext<Options["LangOptions"]>): ParseResult<Options["RootNode"]>;
  /**
   * Creates SourceCode object that ESLint uses to work with a file.
   */
  createSourceCode(file: File, input: OkParseResult<Options["RootNode"]>, context: LanguageContext<Options["LangOptions"]>): Options["Code"];
}
/**
 * Plugin-defined options for the language.
 */
type LanguageOptions = Record<string, unknown>;
/**
 * The context object that is passed to the language plugin methods.
 */
interface LanguageContext<LangOptions = LanguageOptions> {
  languageOptions: LangOptions;
}
/**
 * Represents a file read by ESLint.
 */
interface File {
  /**
   * The path that ESLint uses for this file. May be a virtual path
   * if it was returned by a processor.
   */
  path: string;
  /**
   * The path to the file on disk. This always maps directly to a file
   * regardless of whether it was returned from a processor.
   */
  physicalPath: string;
  /**
   * Indicates if the original source contained a byte-order marker.
   * ESLint strips the BOM from the `body`, but this info is needed
   * to correctly apply autofixing.
   */
  bom: boolean;
  /**
   * The body of the file to parse.
   */
  body: string | Uint8Array;
}
/**
 * Represents the successful result of parsing a file.
 */
interface OkParseResult<RootNode = unknown> {
  /**
   * Indicates if the parse was successful. If true, the parse was successful
   * and ESLint should continue on to create a SourceCode object and run rules;
   * if false, ESLint should just report the error(s) without doing anything
   * else.
   */
  ok: true;
  /**
   * The abstract syntax tree created by the parser. (only when ok: true)
   */
  ast: RootNode;
  /**
   * Any additional data that the parser wants to provide.
   */
  [key: string]: any;
}
/**
 * Represents the unsuccessful result of parsing a file.
 */
interface NotOkParseResult {
  /**
   * Indicates if the parse was successful. If true, the parse was successful
   * and ESLint should continue on to create a SourceCode object and run rules;
   * if false, ESLint should just report the error(s) without doing anything
   * else.
   */
  ok: false;
  /**
   * Any parsing errors, whether fatal or not. (only when ok: false)
   */
  errors: FileError[];
  /**
   * Any additional data that the parser wants to provide.
   */
  [key: string]: any;
}
type ParseResult<RootNode = unknown> = OkParseResult<RootNode> | NotOkParseResult;
/**
 * Represents inline configuration found in the source code.
 */
interface InlineConfigElement {
  /**
   * The location of the inline config element.
   */
  loc: SourceLocation$1;
  /**
   * The interpreted configuration from the inline config element.
   */
  config: {
    rules: RulesConfig;
  };
}
/**
 * Generic options for the `SourceCodeBase` type.
 */
interface SourceCodeBaseTypeOptions {
  LangOptions: LanguageOptions;
  RootNode: unknown;
  SyntaxElementWithLoc: unknown;
  ConfigNode: unknown;
}
/**
 * Represents the basic interface for a source code object.
 */
interface SourceCodeBase<Options extends SourceCodeBaseTypeOptions = {
  LangOptions: LanguageOptions;
  RootNode: unknown;
  SyntaxElementWithLoc: unknown;
  ConfigNode: unknown;
}> {
  /**
   * Root of the AST.
   */
  ast: Options["RootNode"];
  /**
   * The traversal path that tools should take when evaluating the AST.
   * When present, this overrides the `visitorKeys` on the language for
   * just this source code object.
   */
  visitorKeys?: Record<string, string[]>;
  /**
   * Retrieves the equivalent of `loc` for a given node or token.
   * @param syntaxElement The node or token to get the location for.
   * @returns The location of the node or token.
   */
  getLoc(syntaxElement: Options["SyntaxElementWithLoc"]): SourceLocation$1;
  /**
   * Retrieves the equivalent of `range` for a given node or token.
   * @param syntaxElement The node or token to get the range for.
   * @returns The range of the node or token.
   */
  getRange(syntaxElement: Options["SyntaxElementWithLoc"]): SourceRange;
  /**
   * Traversal of AST.
   */
  traverse(): Iterable<TraversalStep>;
  /**
   * Applies language options passed in from the ESLint core.
   */
  applyLanguageOptions?(languageOptions: Options["LangOptions"]): void;
  /**
   * Return all of the inline areas where ESLint should be disabled/enabled
   * along with any problems found in evaluating the directives.
   */
  getDisableDirectives?(): {
    directives: Directive[];
    problems: FileProblem[];
  };
  /**
   * Returns an array of all inline configuration nodes found in the
   * source code.
   */
  getInlineConfigNodes?(): Options["ConfigNode"][];
  /**
   * Applies configuration found inside of the source code. This method is only
   * called when ESLint is running with inline configuration allowed.
   */
  applyInlineConfig?(): {
    configs: InlineConfigElement[];
    problems: FileProblem[];
  };
  /**
   * Called by ESLint core to indicate that it has finished providing
   * information. We now add in all the missing variables and ensure that
   * state-changing methods cannot be called by rules.
   * @returns {void}
   */
  finalize?(): void;
}
/**
 * Represents the source of a text file being linted.
 */
interface TextSourceCode<Options extends SourceCodeBaseTypeOptions = {
  LangOptions: LanguageOptions;
  RootNode: unknown;
  SyntaxElementWithLoc: unknown;
  ConfigNode: unknown;
}> extends SourceCodeBase<Options> {
  /**
   * The body of the file that you'd like rule developers to access.
   */
  text: string;
}
/**
 * Represents the source of a binary file being linted.
 */
interface BinarySourceCode<Options extends SourceCodeBaseTypeOptions = {
  LangOptions: LanguageOptions;
  RootNode: unknown;
  SyntaxElementWithLoc: unknown;
  ConfigNode: unknown;
}> extends SourceCodeBase<Options> {
  /**
   * The body of the file that you'd like rule developers to access.
   */
  body: Uint8Array;
}
type SourceCode$1<Options extends SourceCodeBaseTypeOptions = {
  LangOptions: LanguageOptions;
  RootNode: unknown;
  SyntaxElementWithLoc: unknown;
  ConfigNode: unknown;
}> = TextSourceCode<Options> | BinarySourceCode<Options>;
/**
 * Represents a traversal step visiting the AST.
 */
interface VisitTraversalStep {
  kind: 1;
  target: unknown;
  phase: 1 | 2;
  args: unknown[];
}
/**
 * Represents a traversal step calling a function.
 */
interface CallTraversalStep {
  kind: 2;
  target: string;
  phase?: string;
  args: unknown[];
}
type TraversalStep = VisitTraversalStep | CallTraversalStep;
/**
 * The type of disable directive. This determines how ESLint will disable rules.
 */
type DirectiveType = "disable" | "enable" | "disable-line" | "disable-next-line";
/**
 * Represents a disable directive.
 */
interface Directive {
  /**
   * The type of directive.
   */
  type: DirectiveType;
  /**
   * The node of the directive. May be in the AST or a comment/token.
   */
  node: unknown;
  /**
   * The value of the directive.
   */
  value: string;
  /**
   * The justification for the directive.
   */
  justification?: string;
}
//#endregion
//#region ../../node_modules/.pnpm/@eslint+plugin-kit@0.7.0/node_modules/@eslint/plugin-kit/dist/esm/types.d.ts
/**
 * Adds matching `:exit` selector properties for each key of a `RuleVisitor`.
 */
type CustomRuleVisitorWithExit$1<RuleVisitorType extends RuleVisitor$1> = { [Key in keyof RuleVisitorType as Key | `${Key & string}:exit`]: RuleVisitorType[Key] };
//#endregion
//#region ../../node_modules/.pnpm/@eslint+plugin-kit@0.7.0/node_modules/@eslint/plugin-kit/dist/esm/index.d.ts
type RuleVisitor = RuleVisitor$1;
type CustomRuleVisitorWithExit<RuleVisitorType extends RuleVisitor> = CustomRuleVisitorWithExit$1<RuleVisitorType>;
//#endregion
//#region ../../node_modules/.pnpm/eslint@10.2.0_jiti@2.6.1/node_modules/eslint/lib/types/index.d.ts
//------------------------------------------------------------------------------
// Exports
//------------------------------------------------------------------------------
declare namespace AST {
  type TokenType = "Boolean" | "Null" | "Identifier" | "PrivateIdentifier" | "Keyword" | "Punctuator" | "JSXIdentifier" | "JSXText" | "Numeric" | "String" | "Template" | "RegularExpression";
  interface Token {
    type: TokenType;
    value: string;
    range: Range;
    loc: SourceLocation;
  }
  interface SourceLocation {
    start: Position$1;
    end: Position$1;
  }
  type Range = SourceRange;
  interface Program extends Program {
    comments: Comment[];
    tokens: Token[];
    loc: SourceLocation;
    range: Range;
  }
}
interface JSXIdentifier extends BaseNode {
  type: "JSXIdentifier";
  name: string;
}
declare namespace Scope {
  interface ScopeManager {
    scopes: Scope[];
    globalScope: Scope | null;
    acquire(node: Node$1, inner?: boolean): Scope | null;
    getDeclaredVariables(node: Node$1): Variable[];
    addGlobals(names: ReadonlyArray<string>): void;
  }
  interface Scope {
    type: "block" | "catch" | "class" | "class-field-initializer" | "class-static-block" | "for" | "function" | "function-expression-name" | "global" | "module" | "switch" | "with";
    isStrict: boolean;
    upper: Scope | null;
    childScopes: Scope[];
    variableScope: Scope;
    block: Node$1;
    variables: Variable[];
    set: Map<string, Variable>;
    references: Reference[];
    through: Reference[];
    functionExpressionScope: boolean;
    implicit?: {
      variables: Variable[];
      set: Map<string, Variable>;
    };
  }
  interface Variable {
    name: string;
    scope: Scope;
    identifiers: Identifier[];
    references: Reference[];
    defs: Definition[];
  }
  interface Reference {
    identifier: Identifier | JSXIdentifier;
    from: Scope;
    resolved: Variable | null;
    writeExpr?: Expression | null;
    init?: boolean;
    isWrite(): boolean;
    isRead(): boolean;
    isWriteOnly(): boolean;
    isReadOnly(): boolean;
    isReadWrite(): boolean;
  }
  type DefinitionType = {
    type: "CatchClause";
    node: CatchClause;
    parent: null;
  } | {
    type: "ClassName";
    node: ClassDeclaration | ClassExpression;
    parent: null;
  } | {
    type: "FunctionName";
    node: FunctionDeclaration | FunctionExpression;
    parent: null;
  } | {
    type: "ImplicitGlobalVariable";
    node: AssignmentExpression | ForInStatement | ForOfStatement;
    parent: null;
  } | {
    type: "ImportBinding";
    node: ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier;
    parent: ImportDeclaration;
  } | {
    type: "Parameter";
    node: FunctionDeclaration | FunctionExpression | ArrowFunctionExpression;
    parent: null;
  } | {
    type: "Variable";
    node: VariableDeclarator;
    parent: VariableDeclaration;
  };
  type Definition = DefinitionType & {
    name: Identifier;
  };
}
// #region SourceCode
declare class SourceCode implements TextSourceCode<{
  LangOptions: Linter.LanguageOptions;
  RootNode: AST.Program;
  SyntaxElementWithLoc: AST.Token | Node$1;
  ConfigNode: Comment;
}> {
  text: string;
  ast: AST.Program;
  lines: string[];
  hasBOM: boolean;
  parserServices: SourceCode.ParserServices;
  scopeManager: Scope.ScopeManager;
  visitorKeys: SourceCode.VisitorKeys;
  constructor(text: string, ast: AST.Program);
  constructor(config: SourceCode.Config);
  static splitLines(text: string): string[];
  getLoc(syntaxElement: AST.Token | Node$1): SourceLocation$2;
  getRange(syntaxElement: AST.Token | Node$1): SourceRange;
  getText(node?: Node$1, beforeCount?: number, afterCount?: number): string;
  getLines(): string[];
  getAllComments(): Comment[];
  getAncestors(node: Node$1): Node$1[];
  getDeclaredVariables(node: Node$1): Scope.Variable[];
  getNodeByRangeIndex(index: number): Node$1 | null;
  getLocFromIndex(index: number): Position$1;
  getIndexFromLoc(location: Position$1): number; // Inherited methods from TokenStore
  // ---------------------------------
  getTokenByRangeStart(offset: number, options?: {
    includeComments: false;
  }): AST.Token | null;
  getTokenByRangeStart(offset: number, options: {
    includeComments: boolean;
  }): AST.Token | Comment | null;
  getFirstToken: SourceCode.UnaryNodeCursorWithSkipOptions;
  getFirstTokens: SourceCode.UnaryNodeCursorWithCountOptions;
  getLastToken: SourceCode.UnaryNodeCursorWithSkipOptions;
  getLastTokens: SourceCode.UnaryNodeCursorWithCountOptions;
  getTokenBefore: SourceCode.UnaryCursorWithSkipOptions;
  getTokensBefore: SourceCode.UnaryCursorWithCountOptions;
  getTokenAfter: SourceCode.UnaryCursorWithSkipOptions;
  getTokensAfter: SourceCode.UnaryCursorWithCountOptions;
  getFirstTokenBetween: SourceCode.BinaryCursorWithSkipOptions;
  getFirstTokensBetween: SourceCode.BinaryCursorWithCountOptions;
  getLastTokenBetween: SourceCode.BinaryCursorWithSkipOptions;
  getLastTokensBetween: SourceCode.BinaryCursorWithCountOptions;
  getTokensBetween: SourceCode.BinaryCursorWithCountOptions;
  getTokens: ((node: Node$1, beforeCount?: number, afterCount?: number) => AST.Token[]) & SourceCode.UnaryNodeCursorWithCountOptions;
  commentsExistBetween(left: Node$1 | AST.Token | Comment, right: Node$1 | AST.Token | Comment): boolean;
  getCommentsBefore(nodeOrToken: Node$1 | AST.Token): Comment[];
  getCommentsAfter(nodeOrToken: Node$1 | AST.Token): Comment[];
  getCommentsInside(node: Node$1): Comment[];
  getScope(node: Node$1): Scope.Scope;
  isSpaceBetween(first: Node$1 | AST.Token, second: Node$1 | AST.Token): boolean;
  isGlobalReference(node: Identifier): boolean;
  markVariableAsUsed(name: string, refNode?: Node$1): boolean;
  traverse(): Iterable<TraversalStep>;
}
declare namespace SourceCode {
  interface Config {
    text: string;
    ast: AST.Program;
    hasBOM?: boolean | undefined;
    parserServices?: ParserServices | null | undefined;
    scopeManager?: Scope.ScopeManager | null | undefined;
    visitorKeys?: VisitorKeys | null | undefined;
  }
  type ParserServices = any;
  interface VisitorKeys {
    [nodeType: string]: string[];
  }
  interface UnaryNodeCursorWithSkipOptions {
    <T extends AST.Token>(node: Node$1, options: ((token: AST.Token) => token is T) | {
      filter: (token: AST.Token) => token is T;
      includeComments?: false | undefined;
      skip?: number | undefined;
    }): T | null;
    <T extends AST.Token | Comment>(node: Node$1, options: {
      filter: (tokenOrComment: AST.Token | Comment) => tokenOrComment is T;
      includeComments: boolean;
      skip?: number | undefined;
    }): T | null;
    (node: Node$1, options?: {
      filter?: ((token: AST.Token) => boolean) | undefined;
      includeComments?: false | undefined;
      skip?: number | undefined;
    } | ((token: AST.Token) => boolean) | number): AST.Token | null;
    (node: Node$1, options: {
      filter?: ((token: AST.Token | Comment) => boolean) | undefined;
      includeComments: boolean;
      skip?: number | undefined;
    }): AST.Token | Comment | null;
  }
  interface UnaryNodeCursorWithCountOptions {
    <T extends AST.Token>(node: Node$1, options: ((token: AST.Token) => token is T) | {
      filter: (token: AST.Token) => token is T;
      includeComments?: false | undefined;
      count?: number | undefined;
    }): T[];
    <T extends AST.Token | Comment>(node: Node$1, options: {
      filter: (tokenOrComment: AST.Token | Comment) => tokenOrComment is T;
      includeComments: boolean;
      count?: number | undefined;
    }): T[];
    (node: Node$1, options?: {
      filter?: ((token: AST.Token) => boolean) | undefined;
      includeComments?: false | undefined;
      count?: number | undefined;
    } | ((token: AST.Token) => boolean) | number): AST.Token[];
    (node: Node$1, options: {
      filter?: ((token: AST.Token | Comment) => boolean) | undefined;
      includeComments: boolean;
      count?: number | undefined;
    }): Array<AST.Token | Comment>;
  }
  interface UnaryCursorWithSkipOptions {
    <T extends AST.Token>(node: Node$1 | AST.Token | Comment, options: ((token: AST.Token) => token is T) | {
      filter: (token: AST.Token) => token is T;
      includeComments?: false | undefined;
      skip?: number | undefined;
    }): T | null;
    <T extends AST.Token | Comment>(node: Node$1 | AST.Token | Comment, options: {
      filter: (tokenOrComment: AST.Token | Comment) => tokenOrComment is T;
      includeComments: boolean;
      skip?: number | undefined;
    }): T | null;
    (node: Node$1 | AST.Token | Comment, options?: {
      filter?: ((token: AST.Token) => boolean) | undefined;
      includeComments?: false | undefined;
      skip?: number | undefined;
    } | ((token: AST.Token) => boolean) | number): AST.Token | null;
    (node: Node$1 | AST.Token | Comment, options: {
      filter?: ((token: AST.Token | Comment) => boolean) | undefined;
      includeComments: boolean;
      skip?: number | undefined;
    }): AST.Token | Comment | null;
  }
  interface UnaryCursorWithCountOptions {
    <T extends AST.Token>(node: Node$1 | AST.Token | Comment, options: ((token: AST.Token) => token is T) | {
      filter: (token: AST.Token) => token is T;
      includeComments?: false | undefined;
      count?: number | undefined;
    }): T[];
    <T extends AST.Token | Comment>(node: Node$1 | AST.Token | Comment, options: {
      filter: (tokenOrComment: AST.Token | Comment) => tokenOrComment is T;
      includeComments: boolean;
      count?: number | undefined;
    }): T[];
    (node: Node$1 | AST.Token | Comment, options?: {
      filter?: ((token: AST.Token) => boolean) | undefined;
      includeComments?: false | undefined;
      count?: number | undefined;
    } | ((token: AST.Token) => boolean) | number): AST.Token[];
    (node: Node$1 | AST.Token | Comment, options: {
      filter?: ((token: AST.Token | Comment) => boolean) | undefined;
      includeComments: boolean;
      count?: number | undefined;
    }): Array<AST.Token | Comment>;
  }
  interface BinaryCursorWithSkipOptions {
    <T extends AST.Token>(left: Node$1 | AST.Token | Comment, right: Node$1 | AST.Token | Comment, options: ((token: AST.Token) => token is T) | {
      filter: (token: AST.Token) => token is T;
      includeComments?: false | undefined;
      skip?: number | undefined;
    }): T | null;
    <T extends AST.Token | Comment>(left: Node$1 | AST.Token | Comment, right: Node$1 | AST.Token | Comment, options: {
      filter: (tokenOrComment: AST.Token | Comment) => tokenOrComment is T;
      includeComments: boolean;
      skip?: number | undefined;
    }): T | null;
    (left: Node$1 | AST.Token | Comment, right: Node$1 | AST.Token | Comment, options?: {
      filter?: ((token: AST.Token) => boolean) | undefined;
      includeComments?: false | undefined;
      skip?: number | undefined;
    } | ((token: AST.Token) => boolean) | number): AST.Token | null;
    (left: Node$1 | AST.Token | Comment, right: Node$1 | AST.Token | Comment, options: {
      filter?: ((token: AST.Token | Comment) => boolean) | undefined;
      includeComments: boolean;
      skip?: number | undefined;
    }): AST.Token | Comment | null;
  }
  interface BinaryCursorWithCountOptions {
    <T extends AST.Token>(left: Node$1 | AST.Token | Comment, right: Node$1 | AST.Token | Comment, options: ((token: AST.Token) => token is T) | {
      filter: (token: AST.Token) => token is T;
      includeComments?: false | undefined;
      count?: number | undefined;
    }): T[];
    <T extends AST.Token | Comment>(left: Node$1 | AST.Token | Comment, right: Node$1 | AST.Token | Comment, options: {
      filter: (tokenOrComment: AST.Token | Comment) => tokenOrComment is T;
      includeComments: boolean;
      count?: number | undefined;
    }): T[];
    (left: Node$1 | AST.Token | Comment, right: Node$1 | AST.Token | Comment, options?: {
      filter?: ((token: AST.Token) => boolean) | undefined;
      includeComments?: false | undefined;
      count?: number | undefined;
    } | ((token: AST.Token) => boolean) | number): AST.Token[];
    (left: Node$1 | AST.Token | Comment, right: Node$1 | AST.Token | Comment, options: {
      filter?: ((token: AST.Token | Comment) => boolean) | undefined;
      includeComments: boolean;
      count?: number | undefined;
    }): Array<AST.Token | Comment>;
  }
}
// #endregion
type JSSyntaxElement = {
  type: string;
  loc?: SourceLocation$2 | null | undefined;
};
declare namespace Rule {
  interface RuleModule extends RuleDefinition<{
    LangOptions: Linter.LanguageOptions;
    Code: SourceCode;
    RuleOptions: any[];
    Visitor: RuleListener;
    Node: JSSyntaxElement;
    MessageIds: string;
    ExtRuleDocs: {};
  }> {
    create(context: RuleContext): RuleListener;
  }
  type NodeTypes = Node$1["type"];
  interface NodeListener extends CustomRuleVisitorWithExit<{ [Node in Rule.Node as Node["type"]]?: ((node: Node) => void) | undefined } & {
    // A `Program` visitor's node type has no `parent` property.
    Program?: ((node: AST.Program) => void) | undefined;
  }> {}
  interface NodeParentExtension {
    parent: Node;
  }
  type Node = (AST.Program & {
    parent: null;
  }) | (Exclude<Node$1, Program> & NodeParentExtension);
  interface RuleListener extends NodeListener {
    onCodePathStart?(codePath: CodePath, node: Node): void;
    onCodePathEnd?(codePath: CodePath, node: Node): void;
    onCodePathSegmentStart?(segment: CodePathSegment, node: Node): void;
    onCodePathSegmentEnd?(segment: CodePathSegment, node: Node): void;
    onUnreachableCodePathSegmentStart?(segment: CodePathSegment, node: Node): void;
    onUnreachableCodePathSegmentEnd?(segment: CodePathSegment, node: Node): void;
    onCodePathSegmentLoop?(fromSegment: CodePathSegment, toSegment: CodePathSegment, node: Node): void;
    [key: string]: ((codePath: CodePath, node: Node) => void) | ((segment: CodePathSegment, node: Node) => void) | ((fromSegment: CodePathSegment, toSegment: CodePathSegment, node: Node) => void) | ((node: Node) => void) | NodeListener[keyof NodeListener] | undefined;
  }
  type CodePathOrigin = "program" | "function" | "class-field-initializer" | "class-static-block";
  interface CodePath {
    id: string;
    origin: CodePathOrigin;
    initialSegment: CodePathSegment;
    finalSegments: CodePathSegment[];
    returnedSegments: CodePathSegment[];
    thrownSegments: CodePathSegment[];
    upper: CodePath | null;
    childCodePaths: CodePath[];
  }
  interface CodePathSegment {
    id: string;
    nextSegments: CodePathSegment[];
    prevSegments: CodePathSegment[];
    reachable: boolean;
  }
  type RuleMetaData = RulesMeta;
  interface RuleContext extends RuleContext$1<{
    LangOptions: Linter.LanguageOptions;
    Code: SourceCode;
    RuleOptions: any[];
    Node: JSSyntaxElement;
    MessageIds: string;
  }> {}
  type ReportFixer = RuleFixer;
  /** @deprecated Use `ReportDescriptorOptions` instead. */
  type ReportDescriptorOptionsBase = Omit<ViolationReportBase, "suggest">;
  type SuggestionReportOptions = SuggestedEditBase;
  type SuggestionDescriptorMessage = SuggestionMessage;
  type SuggestionReportDescriptor = SuggestedEdit; // redundant with ReportDescriptorOptionsBase but kept for clarity
  type ReportDescriptorOptions = ViolationReportBase;
  type ReportDescriptor = ViolationReport<JSSyntaxElement>;
  type ReportDescriptorMessage = ViolationMessage;
  type ReportDescriptorLocation = ViolationLocation<JSSyntaxElement>;
  type RuleFixer = RuleTextEditor<Node$1 | AST.Token>;
  type Fix = RuleTextEdit;
}
// #region Linter
declare class Linter {
  static readonly version: string;
  version: string;
  constructor(options?: {
    cwd?: string | undefined;
    configType?: "flat";
  });
  verify(code: SourceCode | string, config: Linter.Config | Linter.Config[], filename?: string): Linter.LintMessage[];
  verify(code: SourceCode | string, config: Linter.Config | Linter.Config[], options: Linter.LintOptions): Linter.LintMessage[];
  verifyAndFix(code: string, config: Linter.Config | Linter.Config[], filename?: string): Linter.FixReport;
  verifyAndFix(code: string, config: Linter.Config | Linter.Config[], options: Linter.FixOptions): Linter.FixReport;
  getSourceCode(): SourceCode;
  getTimes(): Linter.Stats["times"];
  getFixPassCount(): Linter.Stats["fixPasses"];
}
declare namespace Linter {
  /**
   * The numeric severity level for a rule.
   *
   * - `0` means off.
   * - `1` means warn.
   * - `2` means error.
   *
   * @see [Rule Severities](https://eslint.org/docs/latest/use/configure/rules#rule-severities)
   */
  type Severity = SeverityLevel;
  /**
   * The human readable severity level for a rule.
   *
   * @see [Rule Severities](https://eslint.org/docs/latest/use/configure/rules#rule-severities)
   */
  type StringSeverity = SeverityName;
  /**
   * The numeric or human readable severity level for a rule.
   *
   * @see [Rule Severities](https://eslint.org/docs/latest/use/configure/rules#rule-severities)
   */
  type RuleSeverity = Severity;
  /**
   * An array containing the rule severity level, followed by the rule options.
   *
   * @see [Rules](https://eslint.org/docs/latest/use/configure/rules)
   */
  type RuleSeverityAndOptions<Options extends any[] = any[]> = [RuleSeverity, ...Partial<Options>];
  /**
   * The severity level for the rule or an array containing the rule severity level, followed by the rule options.
   *
   * @see [Rules](https://eslint.org/docs/latest/use/configure/rules)
   */
  type RuleEntry<Options extends any[] = any[]> = RuleConfig<Options>;
  /**
   * The rules config object is a key/value map of rule names and their severity and options.
   */
  type RulesRecord = RulesConfig;
  /**
   * A configuration object that may have a `rules` block.
   */
  type HasRules<Rules extends RulesConfig = RulesConfig> = HasRules<Rules>;
  /**
   * The ECMAScript version of the code being linted.
   */
  type EcmaVersion = EcmaVersion$1;
  /**
   * The type of JavaScript source code.
   */
  type SourceType = JavaScriptSourceType;
  /**
   * ESLint legacy configuration.
   *
   * @see [ESLint Legacy Configuration](https://eslint.org/docs/latest/use/configure/)
   */
  type BaseConfig<Rules extends RulesConfig = RulesConfig, OverrideRules extends RulesConfig = Rules> = BaseConfig<Rules, OverrideRules>;
  /**
   * The overwrites that apply more differing configuration to specific files or directories.
   */
  type ConfigOverride<Rules extends RulesConfig = RulesConfig> = ConfigOverride<Rules>;
  /**
   * ESLint legacy configuration.
   *
   * @see [ESLint Legacy Configuration](https://eslint.org/docs/latest/use/configure/)
   */
  // https://github.com/eslint/eslint/blob/v8.57.0/conf/config-schema.js
  type LegacyConfig<Rules extends RulesConfig = RulesConfig, OverrideRules extends RulesConfig = Rules> = LegacyConfigObject<Rules, OverrideRules>;
  /**
   * Parser options.
   *
   * @see [Specifying Parser Options](https://eslint.org/docs/latest/use/configure/language-options#specifying-parser-options)
   */
  interface ParserOptions {
    /**
     * Allow the use of reserved words as identifiers (if `ecmaVersion` is 3).
     *
     * @default false
     */
    allowReserved?: boolean | undefined;
    /**
     * An object indicating which additional language features you'd like to use.
     *
     * @see https://eslint.org/docs/latest/use/configure/language-options#specifying-parser-options
     */
    ecmaFeatures?: {
      /**
       * Allow `return` statements in the global scope.
       *
       * @default false
       */
      globalReturn?: boolean | undefined;
      /**
       * Enable global [strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode) (if `ecmaVersion` is 5 or greater).
       *
       * @default false
       */
      impliedStrict?: boolean | undefined;
      /**
       * Enable [JSX](https://facebook.github.io/jsx/).
       *
       * @default false
       */
      jsx?: boolean | undefined;
      [key: string]: any;
    } | undefined;
    [key: string]: any;
  }
  /**
   * Options used for linting code with `Linter#verify` and `Linter#verifyAndFix`.
   */
  interface LintOptions {
    filename?: string | undefined;
    preprocess?: ((code: string) => string[]) | undefined;
    postprocess?: ((problemLists: LintMessage[][]) => LintMessage[]) | undefined;
    filterCodeBlock?: ((filename: string, text: string) => boolean) | undefined;
    disableFixes?: boolean | undefined;
    allowInlineConfig?: boolean | undefined;
    reportUnusedDisableDirectives?: boolean | undefined;
  }
  type LintSuggestion = LintSuggestion;
  type LintMessage = LintMessage$1;
  interface LintSuppression {
    kind: string;
    justification: string;
  }
  interface SuppressedLintMessage extends LintMessage {
    /** The suppression info. */
    suppressions: LintSuppression[];
  }
  interface FixOptions extends LintOptions {
    fix?: boolean | undefined;
  }
  interface FixReport {
    fixed: boolean;
    output: string;
    messages: LintMessage[];
  } // Temporarily loosen type for just flat config files (see https://github.com/DefinitelyTyped/DefinitelyTyped/pull/68232)
  type NonESTreeParser = ESLint.ObjectMetaProperties & ({
    parse(text: string, options?: any): unknown;
  } | {
    parseForESLint(text: string, options?: any): Omit<ESLintParseResult, "ast" | "scopeManager"> & {
      ast: unknown;
      scopeManager?: unknown;
    };
  });
  type ESTreeParser = ESLint.ObjectMetaProperties & ({
    parse(text: string, options?: any): AST.Program;
  } | {
    parseForESLint(text: string, options?: any): ESLintParseResult;
  });
  type Parser = NonESTreeParser | ESTreeParser;
  interface ESLintParseResult {
    /** The AST object. */
    ast: AST.Program;
    /** The services that the parser provides. */
    services?: SourceCode.ParserServices | undefined;
    /** The scope manager of the AST. */
    scopeManager?: Scope.ScopeManager | undefined;
    /** The visitor keys of the AST. */
    visitorKeys?: SourceCode.VisitorKeys | undefined;
  }
  type ProcessorFile = ProcessorFile$1; // https://eslint.org/docs/latest/extend/plugins#processors-in-plugins
  type Processor<T extends string | ProcessorFile = string | ProcessorFile> = Processor<T>;
  type Config<Rules extends RulesConfig = RulesConfig> = ConfigObject<Rules>;
  /** @deprecated  Use `Config` instead of `FlatConfig` */
  type FlatConfig<Rules extends RulesConfig = RulesConfig> = Config<Rules>;
  type GlobalConf = GlobalAccess;
  type Globals = GlobalsConfig;
  interface LanguageOptions extends LanguageOptions {
    /**
     * The version of ECMAScript to support. May be any year (i.e., 2022) or
     * version (i.e., 5). Set to "latest" for the most recent supported version.
     * @default "latest"
     */
    ecmaVersion?: EcmaVersion | undefined;
    /**
     * The type of JavaScript source code. Possible values are "script" for
     * traditional script files, "module" for ECMAScript modules (ESM), and
     * "commonjs" for CommonJS files. (default: "module" for .js and .mjs
     * files; "commonjs" for .cjs files)
     */
    sourceType?: SourceType | undefined;
    /**
     * An object specifying additional objects that should be added to the
     * global scope during linting.
     */
    globals?: Globals | undefined;
    /**
     * An object containing a parse() or parseForESLint() method.
     * If not configured, the default ESLint parser (Espree) will be used.
     */
    parser?: Parser | undefined;
    /**
     * An object specifying additional options that are passed directly to the
     * parser() method on the parser. The available options are parser-dependent
     */
    parserOptions?: Linter.ParserOptions | undefined;
  }
  type LinterOptions = LinterOptionsConfig;
  /**
   * Performance statistics.
   */
  interface Stats {
    /**
     * The number of times ESLint has applied at least one fix after linting.
     */
    fixPasses: number;
    /**
     * The times spent on (parsing, fixing, linting) a file, where the linting refers to the timing information for each rule.
     */
    times: {
      passes: TimePass[];
    };
  }
  interface TimePass {
    /**
     * The parse object containing all parse time information.
     */
    parse: {
      total: number;
    };
    /**
     * The rules object containing all lint time information for each rule.
     */
    rules?: Record<string, {
      total: number;
    }>;
    /**
     * The fix object containing all fix time information.
     */
    fix: {
      total: number;
    };
    /**
     * The total time that is spent on (parsing, fixing, linting) a file.
     */
    total: number;
  }
}
// #endregion
// #region ESLint
declare class ESLint {
  static configType: "flat";
  static readonly version: string;
  /**
   * The default configuration that ESLint uses internally. This is provided for tooling that wants to calculate configurations using the same defaults as ESLint.
   * Keep in mind that the default configuration may change from version to version, so you shouldn't rely on any particular keys or values to be present.
   */
  static readonly defaultConfig: Linter.Config[];
  static outputFixes(results: ESLint.LintResult[]): Promise<void>;
  static getErrorResults(results: ESLint.LintResult[]): ESLint.LintResult[];
  constructor(options?: ESLint.Options);
  lintFiles(patterns: string | string[]): Promise<ESLint.LintResult[]>;
  lintText(code: string, options?: {
    filePath?: string | undefined;
    warnIgnored?: boolean | undefined;
  }): Promise<ESLint.LintResult[]>;
  getRulesMetaForResults(results: ESLint.LintResult[]): ESLint.LintResultData["rulesMeta"];
  hasFlag(flag: string): boolean;
  calculateConfigForFile(filePath: string): Promise<any>;
  findConfigFile(filePath?: string): Promise<string | undefined>;
  isPathIgnored(filePath: string): Promise<boolean>;
  loadFormatter(nameOrPath?: string): Promise<ESLint.LoadedFormatter>;
  static fromOptionsModule(optionsURL: {
    readonly href: string;
  }): Promise<ESLint>;
}
declare namespace ESLint {
  type ConfigData<Rules extends Linter.RulesRecord = RulesConfig> = Omit<Linter.LegacyConfig<Rules>, "$schema">;
  type Environment = EnvironmentConfig;
  type ObjectMetaProperties = ObjectMetaProperties;
  type Plugin = Plugin$1;
  type FixType = "directive" | "problem" | "suggestion" | "layout";
  type CacheStrategy = "content" | "metadata";
  /** The options with which to configure the ESLint instance. */
  interface Options {
    // File enumeration
    /** The value to use for the current working directory. */
    cwd?: string | undefined;
    /** If `false` then `ESLint#lintFiles()` doesn't throw even if no target files found. Defaults to `true`. */
    errorOnUnmatchedPattern?: boolean | undefined;
    /**
     * Set to false to skip glob resolution of input file paths to lint (default: true).
     * If false, each input file path is assumed to be a non-glob path to an existing file.
     */
    globInputPaths?: boolean | undefined;
    /** False disables all ignore patterns except for the default ones. */
    ignore?: boolean | undefined;
    /** Ignore file patterns to use in addition to config ignores. These patterns are relative to `cwd`. */
    ignorePatterns?: string[] | null | undefined;
    /** When set to true, missing patterns cause the linting operation to short circuit and not report any failures. */
    passOnNoPatterns?: boolean | undefined;
    /** Show warnings when the file list includes ignored files. */
    warnIgnored?: boolean | undefined; // Linting
    /** Enable or disable inline configuration comments. */
    allowInlineConfig?: boolean | undefined;
    /** Base config, extended by all configs used with this instance. */
    baseConfig?: Linter.Config | Linter.Config[] | null | undefined;
    /** Override config, overrides all configs used with this instance. */
    overrideConfig?: Linter.Config | Linter.Config[] | null | undefined;
    /**
     * Searches for default config file when falsy; doesn't do any config file lookup when `true`; considered to be a config filename when a string.
     */
    overrideConfigFile?: string | true | null | undefined;
    /** An array of plugin implementations. */
    plugins?: Record<string, Plugin> | null | undefined;
    /**
     * Default is `() => true`. A predicate function that filters rules to be run.
     * This function is called with an object containing `ruleId` and `severity`, and returns `true` if the rule should be run.
     */
    ruleFilter?: ((arg: {
      ruleId: string;
      severity: Exclude<Linter.Severity, 0>;
    }) => boolean) | undefined;
    /** True enables added statistics on lint results. */
    stats?: boolean | undefined; // Autofix
    /** Execute in autofix mode. If a function, should return a boolean. */
    fix?: boolean | ((message: Linter.LintMessage) => boolean) | undefined;
    /** Array of rule types to apply fixes for. */
    fixTypes?: FixType[] | null | undefined; // Cache-related
    /** Enable result caching. */
    cache?: boolean | undefined;
    /** The cache file to use instead of .eslintcache. */
    cacheLocation?: string | undefined;
    /** The strategy used to detect changed files. */
    cacheStrategy?: CacheStrategy | undefined;
    /** If true, apply suppressions automatically. Defaults to false. */
    applySuppressions?: boolean | undefined;
    /** Path to suppressions file. Relative to cwd. Defaults to eslint-suppressions.json in cwd. */
    suppressionsLocation?: string | undefined; // Other Options
    /** Maximum number of linting threads, "auto" to choose automatically, "off" for no multithreading. */
    concurrency?: number | "auto" | "off" | undefined;
    /** Array of feature flags to enable. */
    flags?: string[] | undefined;
  }
  /** A linting result. */
  interface LintResult {
    /** The path to the file that was linted. */
    filePath: string;
    /** All of the messages for the result. */
    messages: Linter.LintMessage[];
    /** All of the suppressed messages for the result. */
    suppressedMessages: Linter.SuppressedLintMessage[];
    /** Number of errors for the result. */
    errorCount: number;
    /** Number of fatal errors for the result. */
    fatalErrorCount: number;
    /** Number of warnings for the result. */
    warningCount: number;
    /** Number of fixable errors for the result. */
    fixableErrorCount: number;
    /** Number of fixable warnings for the result. */
    fixableWarningCount: number;
    /** The source code of the file that was linted, with as many fixes applied as possible. */
    output?: string | undefined;
    /** The source code of the file that was linted. */
    source?: string | undefined;
    /** The performance statistics collected with the `stats` flag. */
    stats?: Linter.Stats | undefined;
    /** The list of used deprecated rules. */
    usedDeprecatedRules: DeprecatedRuleUse[];
  }
  /**
   * Information provided when the maximum warning threshold is exceeded.
   */
  interface MaxWarningsExceeded {
    /**
     * Number of warnings to trigger nonzero exit code.
     */
    maxWarnings: number;
    /**
     * Number of warnings found while linting.
     */
    foundWarnings: number;
  }
  interface LintResultData extends ResultsMeta {
    cwd: string;
    rulesMeta: {
      [ruleId: string]: Rule.RuleMetaData;
    };
  }
  /**
   * Information about deprecated rules.
   */
  interface DeprecatedRuleUse {
    /**
     * The rule ID.
     */
    ruleId: string;
    /**
     * The rule IDs that replace this deprecated rule.
     */
    replacedBy: string[];
    /**
     * The raw deprecated info provided by the rule.
     * - Undefined if the rule's `meta.deprecated` property is a boolean.
     * - Unset when using the legacy eslintrc configuration.
     */
    info?: DeprecatedInfo | undefined;
  }
  /**
   * Metadata about results for formatters.
   */
  interface ResultsMeta {
    /**
     * Whether or not to use color in the formatter output.
     * - If `--color` was set, this property is `true`.
     * - If `--no-color` was set, it is `false`.
     * - If neither option was provided, the property is omitted.
     */
    color?: boolean | undefined;
    /**
     * Present if the maxWarnings threshold was exceeded.
     */
    maxWarningsExceeded?: MaxWarningsExceeded | undefined;
  }
  /** The type of an object resolved by {@link ESLint.loadFormatter}. */
  interface LoadedFormatter {
    /**
     * Used to call the underlying formatter.
     * @param results An array of lint results to format.
     * @param resultsMeta An object with optional `color` and `maxWarningsExceeded` properties that will be
     * passed to the underlying formatter function along with other properties set by ESLint.
     * This argument can be omitted if `color` and `maxWarningsExceeded` are not needed.
     * @return The formatter output.
     */
    format(results: LintResult[], resultsMeta?: ResultsMeta): string | Promise<string>;
  } // The documented type name is `LoadedFormatter`, but `Formatter` has been historically more used.
  type Formatter = LoadedFormatter;
  /**
   * The expected signature of a custom formatter.
   * @param results An array of lint results to format.
   * @param context Additional information for the formatter.
   * @return The formatter output.
   */
  type FormatterFunction = (results: LintResult[], context: LintResultData) => string | Promise<string>; // Docs reference the types by those name
  type EditInfo = Rule.Fix;
}
//#endregion
//#region ../../node_modules/.pnpm/eslint-flat-config-utils@3.1.0/node_modules/eslint-flat-config-utils/dist/index.d.mts
/**
 * The options for `renamePluginsInConfigs`
 */
interface RenamePluginsInConfigsOptions {
  /**
   * Resolve conflicts by merging plugins.
   *
   * Note there is no guarantee that the result works the same as the original configs.
   *
   * @default false
   */
  mergePlugins?: boolean;
}
/**
 * Rename plugin names a flat configs array
 *
 * @example
 * ```ts
 * import { renamePluginsInConfigs } from 'eslint-flat-config-utils'
 * import someConfigs from './some-configs'
 *
 * export default renamePluginsInConfigs(someConfigs, {
 *   '@typescript-eslint': 'ts',
 *   'import-x': 'import',
 * })
 * ```
 */
/**
 * A type that can be awaited. Promise<T> or T.
 */
type Awaitable$1<T> = T | Promise<T>;
/**
 * A type that can be an array or a single item.
 */
type Arrayable<T> = T | T[];
/**
 * Default config names map. Used for type augmentation.
 *
 * @example
 * ```ts
 * declare module 'eslint-flat-config-utils' {
 *   interface DefaultConfigNamesMap {
 *     'my-custom-config': true
 *   }
 * }
 * ```
 */
interface DefaultConfigNamesMap {}
interface Nothing {}
/**
 * type StringLiteralUnion<'foo'> = 'foo' | string
 * This has auto completion whereas `'foo' | string` doesn't
 * Adapted from https://github.com/microsoft/TypeScript/issues/29729
 */
type StringLiteralUnion<T extends U, U = string> = T | (U & Nothing);
type FilterType<T, F> = T extends F ? T : never;
type NullableObject<T> = { [K in keyof T]?: T[K] | null | undefined };
type GetRuleRecordFromConfig<T> = T extends {
  rules?: infer R;
} ? R : Linter.RulesRecord;
interface DisableFixesOptions {
  builtinRules?: Map<string, Rule.RuleModule> | (() => Awaitable$1<Map<string, Rule.RuleModule>>);
}
type PluginConflictsError<T extends Linter.Config = Linter.Config> = (pluginName: string, configs: T[]) => string;
/**
 * Awaitable array of ESLint flat configs or a composer object.
 */
type ResolvableFlatConfig<T extends object = ConfigWithExtends> = Awaitable$1<Arrayable<(T | false | undefined | null)>> | Awaitable$1<(ConfigWithExtends | false | undefined | null)[]> | Awaitable$1<(Linter.Config | false | undefined | null)[]> | FlatConfigComposer<any>;
/**
 * Create a chainable composer object that makes manipulating ESLint flat config easier.
 *
 * It extends Promise, so that you can directly await or export it to `eslint.config.mjs`
 *
 * ```ts
 * // eslint.config.mjs
 * import { composer } from 'eslint-flat-config-utils'
 *
 * export default composer(
 *   {
 *     plugins: {},
 *     rules: {},
 *   }
 *   // ...some configs, accepts same arguments as `concat`
 * )
 *   .append(
 *     // appends more configs at the end, accepts same arguments as `concat`
 *   )
 *   .prepend(
 *     // prepends more configs at the beginning, accepts same arguments as `concat`
 *   )
 *   .insertAfter(
 *     'config-name', // specify the name of the target config, or index
 *     // insert more configs after the target, accepts same arguments as `concat`
 *   )
 *   .renamePlugins({
 *     // rename plugins
 *     'old-name': 'new-name',
 *     // for example, rename `n` from `eslint-plugin-n` to more a explicit prefix `node`
 *     'n': 'node'
 *     // applies to all plugins and rules in the configs
 *   })
 *   .override(
 *     'config-name', // specify the name of the target config, or index
 *     {
 *       // merge with the target config
 *       rules: {
 *         'no-console': 'off'
 *       },
 *     }
 *   )
 *
 * // And you an directly return the composer object to `eslint.config.mjs`
 * ```
 */
/**
 * The underlying impolementation of `composer()`.
 */
declare class FlatConfigComposer<T extends object = ConfigWithExtends, ConfigNames extends string = keyof DefaultConfigNamesMap> extends Promise<Linter.Config[]> {
  private _operations;
  private _operationsOverrides;
  private _operationsResolved;
  private _renames;
  private _renamesOptions;
  private _pluginsConflictsError;
  constructor(...configs: ResolvableFlatConfig<T>[]);
  /**
   * Set plugin renames, like `n` -> `node`, `import-x` -> `import`, etc.
   *
   * This will runs after all config items are resolved. Applies to `plugins` and `rules`.
   */
  renamePlugins(renames: Record<string, string>, options?: RenamePluginsInConfigsOptions): this;
  /**
   * Append configs to the end of the current configs array.
   */
  append(...items: ResolvableFlatConfig<T>[]): this;
  /**
   * Prepend configs to the beginning of the current configs array.
   */
  prepend(...items: ResolvableFlatConfig<T>[]): this;
  /**
   * Insert configs before a specific config.
   */
  insertBefore(nameOrIndex: StringLiteralUnion<ConfigNames, string | number>, ...items: ResolvableFlatConfig<T>[]): this;
  /**
   * Insert configs after a specific config.
   */
  insertAfter(nameOrIndex: StringLiteralUnion<ConfigNames, string | number>, ...items: ResolvableFlatConfig<T>[]): this;
  /**
   * Provide overrides to a specific config.
   *
   * It will be merged with the original config, or provide a custom function to replace the config entirely.
   */
  override(nameOrIndex: StringLiteralUnion<ConfigNames, string | number>, config: T | ((config: T) => Awaitable$1<T>)): this;
  /**
   * Provide overrides to multiple configs as an object map.
   *
   * Same as calling `override` multiple times.
   */
  overrides(overrides: Partial<Record<StringLiteralUnion<ConfigNames, string | number>, T | ((config: T) => Awaitable$1<T>)>>): this;
  /**
   * Override rules and it's options in **all configs**.
   *
   * Pass `null` as the value to remove the rule.
   *
   * @example
   * ```ts
   * composer
   *   .overrideRules({
   *      'no-console': 'off',
   *      'no-unused-vars': ['error', { vars: 'all', args: 'after-used' }],
   *      // remove the rule from all configs
   *      'no-undef': null,
   *   })
   * ```
   */
  overrideRules(rules: NullableObject<GetRuleRecordFromConfig<T>>): this;
  /**
   * Remove rules from **all configs**.
   *
   * @example
   * ```ts
   * composer
   *  .removeRules(
   *    'no-console',
   *    'no-unused-vars'
   *  )
   * ```
   */
  removeRules(...rules: StringLiteralUnion<FilterType<keyof GetRuleRecordFromConfig<T>, string>, string>[]): this;
  /**
   * Remove plugins by name and all the rules referenced by them.
   *
   * @example
   * ```ts
   * composer
   *   .removePlugins(
   *     'node'
   *   )
   * ```
   *
   * The `plugins: { node }` and `rules: { 'node/xxx': 'error' }` will be removed from all configs.
   */
  removePlugins(...names: string[]): this;
  /**
   * Remove a specific config by name or index.
   */
  remove(nameOrIndex: StringLiteralUnion<ConfigNames, string | number>): this;
  /**
   * Replace a plugin with another.
   *
   * @example
   * ```ts
   * composer
   *   .replacePlugin('foo', (fooPlugin) => ({
   *     ...fooPlugin,
   *     rules: {
   *       ...fooPlugin.rules,
   *       someNewRule,
   *     },
   *   }))
   * ```
   *
   * The `plugins: { foo }` will be replaced from all configs with a new plugin that is a merge of it and the `bar` plugin
   */
  replacePlugin(name: string, replacement: Awaitable$1<Plugin$2> | ((original: Plugin$2) => Awaitable$1<Plugin$2>)): this;
  /**
   * Replace a specific config by name or index.
   *
   * The original config will be removed and replaced with the new one.
   */
  replace(nameOrIndex: StringLiteralUnion<ConfigNames, string | number>, ...items: ResolvableFlatConfig<T>[]): this;
  /**
   * Hijack into plugins to disable fixes for specific rules.
   *
   * Note this mutates the plugin object, use with caution.
   *
   * @example
   * ```ts
   * const config = await composer(...)
   *  .disableRulesFix([
   *    'unused-imports/no-unused-imports',
   *    'vitest/no-only-tests'
   *  ])
   * ```
   */
  disableRulesFix(ruleIds: string[], options?: DisableFixesOptions): this;
  /**
   * Set a custom warning message for plugins conflicts.
   *
   * The error message can be a string or a function that returns a string.
   *
   * Error message accepts template strings:
   * - `{{pluginName}}`: the name of the plugin that has conflicts
   * - `{{configName1}}`: the name of the first config that uses the plugin
   * - `{{configName2}}`: the name of the second config that uses the plugin
   * - `{{configNames}}`: a list of config names that uses the plugin
   *
   * When only one argument is provided, it will be used as the default error message.
   */
  setPluginConflictsError(warning?: string | PluginConflictsError): this;
  setPluginConflictsError(pluginName: string, warning: string | PluginConflictsError): this;
  private _verifyPluginsConflicts;
  /**
   * Hook when all configs are resolved but before returning the final configs.
   *
   * You can modify the final configs here.
   */
  onResolved(callback: (configs: T[]) => Awaitable$1<T[] | void>): this;
  /**
   * Clone the composer object.
   */
  clone(): FlatConfigComposer<T>;
  /**
   * Resolve the pipeline and return the final configs.
   *
   * This returns a promise. Calling `.then()` has the same effect.
   */
  toConfigs(): Promise<Linter.Config[]>;
  then<T>(onFulfilled: (value: Linter.Config[]) => T, onRejected?: (reason: any) => any): Promise<Awaited<T>>;
  catch(onRejected: (reason: any) => any): Promise<any>;
  finally(onFinally: () => void): Promise<Linter.Config[]>;
}
/**
 * @deprecated Renamed to `composer`.
 */
//#endregion
//#region src/types.d.ts
interface TailwindcssOption {
  /**
   * Tailwind CSS v4 entry point, e.g. `src/global.css`.
   */
  entryPoint?: string;
  /**
   * Working directory passed to eslint-plugin-better-tailwindcss.
   * Defaults to `dirname(entryPoint)` when present, otherwise `process.cwd()`.
   */
  cwd?: string;
  /**
   * Tailwind CSS v3 config file path, e.g. `tailwind.config.js`.
   */
  tailwindConfig?: string;
}
type TailwindcssConfig = boolean | TailwindcssOption;
interface UnocssOption {
  /**
   * UnoCSS config file path, e.g. `uno.config.ts`.
   * When omitted, fallback to default project-root discovery.
   */
  configPath?: string;
  /**
   * Enable UnoCSS attributify support.
   */
  attributify?: boolean;
  /**
   * Enable UnoCSS strict mode.
   */
  strict?: boolean;
}
type UnocssConfig = boolean | UnocssOption;
interface StylelintBridgeOption extends IcebreakerStylelintOptions {
  cwd?: string;
}
type StylelintBridgeConfig = boolean | StylelintBridgeOption;
type ResolvableUserConfig = TypedFlatConfigItem$1 | TypedFlatConfigItem$1[] | FlatConfigComposer<any, any> | Linter.Config[];
type BaseFormatterOptions = Exclude<OptionsConfig['formatters'], boolean | undefined>;
interface IcebreakerFormatterOptions extends Omit<BaseFormatterOptions, 'css' | 'html' | 'graphql' | 'markdown'> {
  /**
   * Enable formatting support for CSS, Less, Sass, and SCSS.
   * Icebreaker additionally supports `oxfmt`.
   */
  css?: 'prettier' | 'oxfmt' | boolean;
  /**
   * Enable formatting support for HTML.
   * Icebreaker additionally supports `oxfmt`.
   */
  html?: 'prettier' | 'oxfmt' | boolean;
  /**
   * Enable formatting support for Markdown.
   * Icebreaker additionally supports `oxfmt`.
   */
  markdown?: 'prettier' | 'dprint' | 'oxfmt' | boolean;
  /**
   * Enable formatting support for GraphQL.
   * Icebreaker additionally supports `oxfmt`.
   */
  graphql?: 'prettier' | 'oxfmt' | boolean;
  /**
   * Custom options passed to `format/oxfmt`.
   */
  oxfmtOptions?: Record<string, unknown>;
}
type UserDefinedOptions = Omit<OptionsConfig, 'formatters' | 'unocss'> & TypedFlatConfigItem$1 & {
  /**
   * Enable external formatters for non-JS file types.
   * Icebreaker additionally supports `oxfmt` for css/html/markdown/graphql.
   */
  formatters?: boolean | IcebreakerFormatterOptions;
  /**
   * Enable Mini Program support.
   * @default false
   */
  miniProgram?: boolean;
  /**
   * Enable TailwindCSS support
   * @default false
   */
  tailwindcss?: TailwindcssConfig;
  /**
   * Enable UnoCSS support.
   * @default false
   */
  unocss?: UnocssConfig;
  /**
   * Bridge Stylelint diagnostics into ESLint for style files.
   * @default false
   */
  stylelint?: StylelintBridgeConfig;
  /**
   * Enable MDX support
   * @default false
   */
  mdx?: boolean;
  /**
   * Enable A11y support
   * @default false
   */
  a11y?: boolean;
  /**
   * Enable NestJS support
   * @default false
   */
  nestjs?: boolean;
  /**
   * Enable TanStack Query support
   * @default false
   */
  query?: boolean;
  /**
   * Enable Ionic support
   * @default false
   */
  ionic?: boolean;
  /**
   * Enable Weapp support
   * @deprecated Use `miniProgram` instead.
   * @default false
   */
  weapp?: boolean;
};
type UserConfigItem = Awaitable<ResolvableUserConfig>;
//#endregion
//#region src/factory.d.ts
declare function icebreaker(options?: UserDefinedOptions, ...userConfigs: UserConfigItem[]): FlatConfigComposer<TypedFlatConfigItem, ConfigNames>;
type IcebreakerEslintConfig = ReturnType<typeof icebreaker>;
declare function icebreakerLegacy(options?: UserDefinedOptions, ...userConfigs: UserConfigItem[]): FlatConfigComposer<TypedFlatConfigItem, ConfigNames>;
type IcebreakerLegacyEslintConfig = ReturnType<typeof icebreakerLegacy>;
//#endregion
//#region src/preset.d.ts
declare function getPresets(options?: UserDefinedOptions, mode?: 'legacy'): [UserDefinedOptions, ...UserConfigItem[]];
//#endregion
export { type ConfigNames, type FlatConfigComposer, IcebreakerEslintConfig, type IcebreakerFormatterOptions, IcebreakerLegacyEslintConfig, type StylelintBridgeConfig, type StylelintBridgeOption, type TailwindcssConfig, type TailwindcssOption, type TypedFlatConfigItem, type UnocssConfig, type UnocssOption, type UserConfigItem, type UserDefinedOptions, getPresets, icebreaker, icebreakerLegacy };