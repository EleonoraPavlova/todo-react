'use strict'
;(self.webpackChunktodo_react = self.webpackChunktodo_react || []).push([
  [298],
  {
    './node_modules/@mui/material/Box/Box.js': function (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      var _mui_system__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/@mui/system/esm/createBox.js'
        ),
        _className__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './node_modules/@mui/utils/esm/ClassNameGenerator/ClassNameGenerator.js'
        ),
        _styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/@mui/material/styles/createTheme.js'
        ),
        _styles_identifier__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './node_modules/@mui/material/styles/identifier.js'
        )
      const defaultTheme = (0, _styles__WEBPACK_IMPORTED_MODULE_0__.Z)(),
        Box = (0, _mui_system__WEBPACK_IMPORTED_MODULE_1__.Z)({
          themeId: _styles_identifier__WEBPACK_IMPORTED_MODULE_2__.Z,
          defaultTheme: defaultTheme,
          defaultClassName: 'MuiBox-root',
          generateClassName: _className__WEBPACK_IMPORTED_MODULE_3__.Z.generate,
        })
      __webpack_exports__.Z = Box
    },
    './node_modules/@mui/system/esm/createBox.js': function (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, {
        Z: function () {
          return createBox
        },
      })
      var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
          './node_modules/@mui/system/node_modules/@babel/runtime/helpers/esm/extends.js'
        ),
        _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(
            './node_modules/@mui/system/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js'
          ),
        react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__('./node_modules/react/index.js'),
        clsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        ),
        _mui_styled_engine__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './node_modules/@mui/styled-engine/index.js'
        ),
        _styleFunctionSx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './node_modules/@mui/system/esm/styleFunctionSx/styleFunctionSx.js'
        ),
        _styleFunctionSx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          './node_modules/@mui/system/esm/styleFunctionSx/extendSxProp.js'
        ),
        _useTheme__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          './node_modules/@mui/system/esm/useTheme.js'
        ),
        react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/react/jsx-runtime.js'
        )
      const _excluded = ['className', 'component']
      function createBox(options = {}) {
        const {
            themeId: themeId,
            defaultTheme: defaultTheme,
            defaultClassName: defaultClassName = 'MuiBox-root',
            generateClassName: generateClassName,
          } = options,
          BoxRoot = (0, _mui_styled_engine__WEBPACK_IMPORTED_MODULE_2__.ZP)('div', {
            shouldForwardProp: (prop) => 'theme' !== prop && 'sx' !== prop && 'as' !== prop,
          })(_styleFunctionSx__WEBPACK_IMPORTED_MODULE_3__.Z)
        return react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function Box(inProps, ref) {
          const theme = (0, _useTheme__WEBPACK_IMPORTED_MODULE_4__.Z)(defaultTheme),
            _extendSxProp = (0, _styleFunctionSx__WEBPACK_IMPORTED_MODULE_5__.Z)(inProps),
            { className: className, component: component = 'div' } = _extendSxProp,
            other = (0,
            _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_6__.Z)(
              _extendSxProp,
              _excluded
            )
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(
            BoxRoot,
            (0, _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_7__.Z)(
              {
                as: component,
                ref: ref,
                className: (0, clsx__WEBPACK_IMPORTED_MODULE_8__.Z)(
                  className,
                  generateClassName ? generateClassName(defaultClassName) : defaultClassName
                ),
                theme: (themeId && theme[themeId]) || theme,
              },
              other
            )
          )
        })
      }
    },
    './node_modules/@mui/system/esm/styleFunctionSx/extendSxProp.js': function (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, {
        Z: function () {
          return extendSxProp
        },
      })
      var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './node_modules/@mui/system/node_modules/@babel/runtime/helpers/esm/extends.js'
        ),
        _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            './node_modules/@mui/system/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js'
          ),
        _mui_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './node_modules/@mui/utils/esm/deepmerge.js'
        ),
        _defaultSxConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/@mui/system/esm/styleFunctionSx/defaultSxConfig.js'
        )
      const _excluded = ['sx'],
        splitProps = (props) => {
          var _props$theme$unstable, _props$theme
          const result = { systemProps: {}, otherProps: {} },
            config =
              null !=
              (_props$theme$unstable =
                null == props || null == (_props$theme = props.theme)
                  ? void 0
                  : _props$theme.unstable_sxConfig)
                ? _props$theme$unstable
                : _defaultSxConfig__WEBPACK_IMPORTED_MODULE_0__.Z
          return (
            Object.keys(props).forEach((prop) => {
              config[prop]
                ? (result.systemProps[prop] = props[prop])
                : (result.otherProps[prop] = props[prop])
            }),
            result
          )
        }
      function extendSxProp(props) {
        const { sx: inSx } = props,
          other = (0,
          _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__.Z)(
            props,
            _excluded
          ),
          { systemProps: systemProps, otherProps: otherProps } = splitProps(other)
        let finalSx
        return (
          (finalSx = Array.isArray(inSx)
            ? [systemProps, ...inSx]
            : 'function' == typeof inSx
              ? (...args) => {
                  const result = inSx(...args)
                  return (0, _mui_utils__WEBPACK_IMPORTED_MODULE_2__.P)(result)
                    ? (0, _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__.Z)(
                        {},
                        systemProps,
                        result
                      )
                    : systemProps
                }
              : (0, _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__.Z)(
                  {},
                  systemProps,
                  inSx
                )),
          (0, _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__.Z)({}, otherProps, {
            sx: finalSx,
          })
        )
      }
    },
    './node_modules/@storybook/addon-actions/dist/index.mjs': function (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, {
        aD: function () {
          return chunk_AY7I2SME.aD
        },
      })
      var chunk_AY7I2SME = __webpack_require__(
        './node_modules/@storybook/addon-actions/dist/chunk-AY7I2SME.mjs'
      )
    },
    './src/components/EditableSpan/EditableSpan.stories.tsx': function (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          EditableSpanBase: function () {
            return EditableSpanBase
          },
          __namedExportsOrder: function () {
            return __namedExportsOrder
          },
        })
      var _EditableSpanBase$par,
        _EditableSpanBase$par2,
        _EditableSpanBase$par3,
        _Users_Eleonora_Desktop_education_I_todo_react_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(
            './node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread2.js'
          ),
        _storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__ =
          (__webpack_require__('./node_modules/react/index.js'),
          __webpack_require__('./node_modules/@storybook/addon-actions/dist/index.mjs')),
        _EditableSpan__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './src/components/EditableSpan/EditableSpan.tsx'
        ),
        react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './node_modules/react/jsx-runtime.js'
        )
      __webpack_exports__.default = {
        parameters: {
          storySource: {
            source:
              'import React from \'react\';\nimport { action } from "@storybook/addon-actions";\nimport { EditableSpan } from "./EditableSpan";\nexport default {\n  title: "EditableSpan",\n  component: EditableSpan\n};\nconst onChange = action("onChanges");\nexport const EditableSpanBase = () => {\n  return <EditableSpan value={"Title"} onChange={onChange} />;\n};\nEditableSpanBase.parameters = {\n  ...EditableSpanBase.parameters,\n  docs: {\n    ...EditableSpanBase.parameters?.docs,\n    source: {\n      originalSource: "() => {\\n  return <EditableSpan value={\\"Title\\"} onChange={onChange} />;\\n}",\n      ...EditableSpanBase.parameters?.docs?.source\n    }\n  }\n};',
            locationsMap: {
              'editable-span-base': {
                startLoc: { col: 32, line: 9 },
                endLoc: { col: 1, line: 11 },
                startBody: { col: 32, line: 9 },
                endBody: { col: 1, line: 11 },
              },
            },
          },
        },
        title: 'EditableSpan',
        component: _EditableSpan__WEBPACK_IMPORTED_MODULE_2__.m,
      }
      var onChange = (0, _storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.aD)('onChanges'),
        EditableSpanBase = function EditableSpanBase() {
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(
            _EditableSpan__WEBPACK_IMPORTED_MODULE_2__.m,
            { value: 'Title', onChange: onChange }
          )
        }
      ;(EditableSpanBase.displayName = 'EditableSpanBase'),
        (EditableSpanBase.parameters = (0,
        _Users_Eleonora_Desktop_education_I_todo_react_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__.Z)(
          (0,
          _Users_Eleonora_Desktop_education_I_todo_react_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__.Z)(
            {},
            EditableSpanBase.parameters
          ),
          {},
          {
            docs: (0,
            _Users_Eleonora_Desktop_education_I_todo_react_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__.Z)(
              (0,
              _Users_Eleonora_Desktop_education_I_todo_react_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__.Z)(
                {},
                null === (_EditableSpanBase$par = EditableSpanBase.parameters) ||
                  void 0 === _EditableSpanBase$par
                  ? void 0
                  : _EditableSpanBase$par.docs
              ),
              {},
              {
                source: (0,
                _Users_Eleonora_Desktop_education_I_todo_react_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__.Z)(
                  {
                    originalSource:
                      '() => {\n  return <EditableSpan value={"Title"} onChange={onChange} />;\n}',
                  },
                  null === (_EditableSpanBase$par2 = EditableSpanBase.parameters) ||
                    void 0 === _EditableSpanBase$par2 ||
                    null === (_EditableSpanBase$par3 = _EditableSpanBase$par2.docs) ||
                    void 0 === _EditableSpanBase$par3
                    ? void 0
                    : _EditableSpanBase$par3.source
                ),
              }
            ),
          }
        ))
      var __namedExportsOrder = ['EditableSpanBase']
    },
    './src/components/EditableSpan/EditableSpan.tsx': function (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, {
        m: function () {
          return EditableSpan
        },
      })
      var _Users_Eleonora_Desktop_education_I_todo_react_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            './node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray.js'
          ),
        _mui_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './node_modules/@mui/material/TextField/TextField.js'
        ),
        _mui_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          './node_modules/@mui/material/Box/Box.js'
        ),
        react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__('./node_modules/react/index.js'),
        react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/react/jsx-runtime.js'
        ),
        EditableSpan = (0, react__WEBPACK_IMPORTED_MODULE_0__.memo)(function (_ref) {
          var value = _ref.value,
            onChange = _ref.onChange
          console.log('EditableSpan')
          var _useState = (0, react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),
            _useState2 = (0,
            _Users_Eleonora_Desktop_education_I_todo_react_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_2__.Z)(
              _useState,
              2
            ),
            editMode = _useState2[0],
            setEditMode = _useState2[1],
            _useState3 = (0, react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
            _useState4 = (0,
            _Users_Eleonora_Desktop_education_I_todo_react_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_2__.Z)(
              _useState3,
              2
            ),
            input = _useState4[0],
            setInput = _useState4[1]
          return editMode
            ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(
                _mui_material__WEBPACK_IMPORTED_MODULE_3__.Z,
                {
                  value: input,
                  onChange: function onChangeTitleHandler(e) {
                    setInput(e.currentTarget.value)
                  },
                  onBlur: function activateViewMode() {
                    setEditMode(!1), onChange(input)
                  },
                  onKeyDown: function onKeyDownHandler(e) {
                    'Enter' === e.key &&
                      (setInput(e.currentTarget.value), setEditMode(!1), onChange(input))
                  },
                  autoFocus: !0,
                  variant: 'standard',
                }
              )
            : (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(
                _mui_material__WEBPACK_IMPORTED_MODULE_4__.Z,
                {
                  component: 'span',
                  onDoubleClick: function activateEditMode() {
                    setEditMode(!0), setInput(value)
                  },
                  children: value,
                }
              )
        })
      try {
        ;(EditableSpan.displayName = 'EditableSpan'),
          (EditableSpan.__docgenInfo = {
            description: '',
            displayName: 'EditableSpan',
            props: {
              value: {
                defaultValue: null,
                description: '',
                name: 'value',
                required: !0,
                type: { name: 'string' },
              },
              onChange: {
                defaultValue: null,
                description: '',
                name: 'onChange',
                required: !0,
                type: { name: '(input: string) => void' },
              },
            },
          }),
          'undefined' != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES['src/components/EditableSpan/EditableSpan.tsx#EditableSpan'] =
              {
                docgenInfo: EditableSpan.__docgenInfo,
                name: 'EditableSpan',
                path: 'src/components/EditableSpan/EditableSpan.tsx#EditableSpan',
              })
      } catch (__react_docgen_typescript_loader_error) {}
      try {
        ;(EditableSpan.displayName = 'EditableSpan'),
          (EditableSpan.__docgenInfo = {
            description: '',
            displayName: 'EditableSpan',
            props: {
              value: {
                defaultValue: null,
                description: '',
                name: 'value',
                required: !0,
                type: { name: 'string' },
              },
              onChange: {
                defaultValue: null,
                description: '',
                name: 'onChange',
                required: !0,
                type: { name: '(input: string) => void' },
              },
            },
          }),
          'undefined' != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES['src/components/EditableSpan/EditableSpan.tsx#EditableSpan'] =
              {
                docgenInfo: EditableSpan.__docgenInfo,
                name: 'EditableSpan',
                path: 'src/components/EditableSpan/EditableSpan.tsx#EditableSpan',
              })
      } catch (__react_docgen_typescript_loader_error) {}
    },
  },
])
