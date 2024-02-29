'use strict'
;(self.webpackChunktodo_react = self.webpackChunktodo_react || []).push([
  [369],
  {
    './node_modules/@mui/icons-material/AddTask.js': function (
      __unused_webpack_module,
      exports,
      __webpack_require__
    ) {
      var _interopRequireDefault = __webpack_require__(
        './node_modules/@mui/icons-material/node_modules/@babel/runtime/helpers/interopRequireDefault.js'
      )
      exports.Z = void 0
      var _createSvgIcon = _interopRequireDefault(
          __webpack_require__('./node_modules/@mui/icons-material/utils/createSvgIcon.js')
        ),
        _jsxRuntime = __webpack_require__('./node_modules/react/jsx-runtime.js'),
        _default = (0, _createSvgIcon.default)(
          (0, _jsxRuntime.jsx)('path', {
            d: 'M22 5.18 10.59 16.6l-4.24-4.24 1.41-1.41 2.83 2.83 10-10L22 5.18zM12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8c1.57 0 3.04.46 4.28 1.25l1.45-1.45C16.1 2.67 14.13 2 12 2 6.48 2 2 6.48 2 12s4.48 10 10 10c1.73 0 3.36-.44 4.78-1.22l-1.5-1.5c-1 .46-2.11.72-3.28.72zm7-5h-3v2h3v3h2v-3h3v-2h-3v-3h-2v3z',
          }),
          'AddTask'
        )
      exports.Z = _default
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
    './src/components/AddItemForm/AddItemForm.stories.tsx': function (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          AddItemFormBase: function () {
            return AddItemFormBase
          },
          __namedExportsOrder: function () {
            return __namedExportsOrder
          },
        })
      var _AddItemFormBase$para,
        _AddItemFormBase$para2,
        _AddItemFormBase$para3,
        _Users_Eleonora_Desktop_education_I_todo_react_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(
            './node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread2.js'
          ),
        _AddItemForm__WEBPACK_IMPORTED_MODULE_1__ =
          (__webpack_require__('./node_modules/react/index.js'),
          __webpack_require__('./src/components/AddItemForm/AddItemForm.tsx')),
        _storybook_addon_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './node_modules/@storybook/addon-actions/dist/index.mjs'
        ),
        react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './node_modules/react/jsx-runtime.js'
        )
      __webpack_exports__.default = {
        parameters: {
          storySource: {
            source:
              'import React from \'react\';\nimport { AddItemForm } from "./AddItemForm";\nimport { action } from "@storybook/addon-actions";\nexport default {\n  title: "AddItemForm",\n  component: AddItemForm\n};\nconst callBack = action("Button was pressed"); // обязательно для тестирования приходящих колбеков\n//покажет содержимое строки\n\nexport const AddItemFormBase = () => {\n  return <AddItemForm addTask={callBack} />;\n};\nAddItemFormBase.parameters = {\n  ...AddItemFormBase.parameters,\n  docs: {\n    ...AddItemFormBase.parameters?.docs,\n    source: {\n      originalSource: "() => {\\n  return <AddItemForm addTask={callBack} />;\\n}",\n      ...AddItemFormBase.parameters?.docs?.source\n    }\n  }\n};',
            locationsMap: {
              'add-item-form-base': {
                startLoc: { col: 31, line: 11 },
                endLoc: { col: 1, line: 13 },
                startBody: { col: 31, line: 11 },
                endBody: { col: 1, line: 13 },
              },
            },
          },
        },
        title: 'AddItemForm',
        component: _AddItemForm__WEBPACK_IMPORTED_MODULE_1__.B,
      }
      var callBack = (0, _storybook_addon_actions__WEBPACK_IMPORTED_MODULE_2__.aD)(
          'Button was pressed'
        ),
        AddItemFormBase = function AddItemFormBase() {
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(
            _AddItemForm__WEBPACK_IMPORTED_MODULE_1__.B,
            { addTask: callBack }
          )
        }
      ;(AddItemFormBase.displayName = 'AddItemFormBase'),
        (AddItemFormBase.parameters = (0,
        _Users_Eleonora_Desktop_education_I_todo_react_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__.Z)(
          (0,
          _Users_Eleonora_Desktop_education_I_todo_react_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__.Z)(
            {},
            AddItemFormBase.parameters
          ),
          {},
          {
            docs: (0,
            _Users_Eleonora_Desktop_education_I_todo_react_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__.Z)(
              (0,
              _Users_Eleonora_Desktop_education_I_todo_react_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__.Z)(
                {},
                null === (_AddItemFormBase$para = AddItemFormBase.parameters) ||
                  void 0 === _AddItemFormBase$para
                  ? void 0
                  : _AddItemFormBase$para.docs
              ),
              {},
              {
                source: (0,
                _Users_Eleonora_Desktop_education_I_todo_react_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__.Z)(
                  { originalSource: '() => {\n  return <AddItemForm addTask={callBack} />;\n}' },
                  null === (_AddItemFormBase$para2 = AddItemFormBase.parameters) ||
                    void 0 === _AddItemFormBase$para2 ||
                    null === (_AddItemFormBase$para3 = _AddItemFormBase$para2.docs) ||
                    void 0 === _AddItemFormBase$para3
                    ? void 0
                    : _AddItemFormBase$para3.source
                ),
              }
            ),
          }
        ))
      var __namedExportsOrder = ['AddItemFormBase']
    },
    './src/components/AddItemForm/AddItemForm.tsx': function (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, {
        B: function () {
          return AddItemForm
        },
      })
      var slicedToArray = __webpack_require__(
          './node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray.js'
        ),
        react = __webpack_require__('./node_modules/react/index.js'),
        TextField = __webpack_require__('./node_modules/@mui/material/TextField/TextField.js'),
        IconButton = __webpack_require__('./node_modules/@mui/material/IconButton/IconButton.js'),
        AddItemForm_module_addItemForm = 'AddItemForm_addItemForm__bETvz',
        AddTask = __webpack_require__('./node_modules/@mui/icons-material/AddTask.js'),
        jsx_runtime = __webpack_require__('./node_modules/react/jsx-runtime.js'),
        AddItemForm = (0, react.memo)(function (_ref) {
          var addTask = _ref.addTask
          console.log('AddItemForm')
          var _useState = (0, react.useState)(null),
            _useState2 = (0, slicedToArray.Z)(_useState, 2),
            error = _useState2[0],
            setError = _useState2[1],
            _useState3 = (0, react.useState)(''),
            _useState4 = (0, slicedToArray.Z)(_useState3, 2),
            inputValue = _useState4[0],
            setInputValue = _useState4[1],
            addItemHandler = function addItemHandler(taskName) {
              ;/[a-zа-яё]/i.test(taskName)
                ? (addTask(taskName), setInputValue(''))
                : setError('Required')
            }
          return (0, jsx_runtime.jsxs)('div', {
            className: AddItemForm_module_addItemForm,
            children: [
              (0, jsx_runtime.jsx)(TextField.Z, {
                type: 'text',
                label: 'Type here....',
                value: inputValue,
                onChange: function onChangeHandler(e) {
                  setInputValue(e.currentTarget.value)
                },
                onKeyDown: function onKeyDownHandler(e) {
                  null !== error && setError(null), 'Enter' === e.key && addItemHandler(inputValue)
                },
                variant: 'outlined',
                error: !!error,
                helperText: error,
                size: 'small',
              }),
              (0, jsx_runtime.jsx)(IconButton.Z, {
                onClick: function onClick() {
                  return addItemHandler(inputValue)
                },
                children: (0, jsx_runtime.jsx)(AddTask.Z, { fontSize: 'small', color: 'success' }),
              }),
            ],
          })
        })
      try {
        ;(AddItemForm.displayName = 'AddItemForm'),
          (AddItemForm.__docgenInfo = {
            description: '',
            displayName: 'AddItemForm',
            props: {
              addTask: {
                defaultValue: null,
                description: '',
                name: 'addTask',
                required: !0,
                type: { name: '(inputValue: string) => void' },
              },
            },
          }),
          'undefined' != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES['src/components/AddItemForm/AddItemForm.tsx#AddItemForm'] = {
              docgenInfo: AddItemForm.__docgenInfo,
              name: 'AddItemForm',
              path: 'src/components/AddItemForm/AddItemForm.tsx#AddItemForm',
            })
      } catch (__react_docgen_typescript_loader_error) {}
      try {
        ;(AddItemForm.displayName = 'AddItemForm'),
          (AddItemForm.__docgenInfo = {
            description: '',
            displayName: 'AddItemForm',
            props: {
              addTask: {
                defaultValue: null,
                description: '',
                name: 'addTask',
                required: !0,
                type: { name: '(inputValue: string) => void' },
              },
            },
          }),
          'undefined' != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES['src/components/AddItemForm/AddItemForm.tsx#AddItemForm'] = {
              docgenInfo: AddItemForm.__docgenInfo,
              name: 'AddItemForm',
              path: 'src/components/AddItemForm/AddItemForm.tsx#AddItemForm',
            })
      } catch (__react_docgen_typescript_loader_error) {}
    },
  },
])
