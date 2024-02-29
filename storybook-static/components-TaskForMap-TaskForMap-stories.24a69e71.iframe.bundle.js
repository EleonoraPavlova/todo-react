'use strict'
;(self.webpackChunktodo_react = self.webpackChunktodo_react || []).push([
  [646],
  {
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
    './src/components/TaskForMap/TaskForMap.stories.tsx': function (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          TaskForMapBase: function () {
            return TaskForMapBase
          },
          __namedExportsOrder: function () {
            return __namedExportsOrder
          },
        })
      var _tasks,
        _TaskForMapBase$param,
        _TaskForMapBase$param2,
        _TaskForMapBase$param3,
        _Users_Eleonora_Desktop_education_I_todo_react_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_8__ =
          __webpack_require__(
            './node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread2.js'
          ),
        _Users_Eleonora_Desktop_education_I_todo_react_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(
            './node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/defineProperty.js'
          ),
        _TaskForMap__WEBPACK_IMPORTED_MODULE_1__ =
          (__webpack_require__('./node_modules/react/index.js'),
          __webpack_require__('./src/components/TaskForMap/TaskForMap.tsx')),
        _storybook_addon_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './node_modules/@storybook/addon-actions/dist/index.mjs'
        ),
        uuid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
          './node_modules/uuid/dist/esm-browser/v1.js'
        ),
        _state_todoList_reducers_todolists_reducer__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__('./src/state/todoList-reducers/todolists-reducer.ts'),
        _mui_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
          './node_modules/@mui/material/Box/Box.js'
        ),
        react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          './node_modules/react/jsx-runtime.js'
        )
      __webpack_exports__.default = {
        parameters: {
          storySource: {
            source:
              'import React from \'react\';\nimport { TaskForMap } from "./TaskForMap";\nimport { action } from "@storybook/addon-actions";\nimport { v1 } from "uuid";\nimport { todoListId1, todoListId2 } from "../../state/todoList-reducers/todolists-reducer";\nimport { Box } from "@mui/material";\nexport default {\n  title: "AddItemForm",\n  component: TaskForMap\n};\nconst removeTask = action("removeTask"); // обязательно для тестирования приходящих колбеков\n//покажет содержимое строки\n\nconst changeStatus = action("changeStatus"); // обязательно для тестирования приходящих колбеков\n//покажет содержимое строки\n\nconst changeEditableSpan = action("changeEditableSpan"); // обязательно для тестирования приходящих колбеков\n//покажет содержимое строки\n\nconst tasks = {\n  [todoListId1]: [\n  //id этот передала пропсами id={l.id}  в  TodoList\n  {\n    id: v1(),\n    title: "HTML&CSS",\n    isDone: true\n  }, {\n    id: v1(),\n    title: "JS",\n    isDone: true\n  }, {\n    id: v1(),\n    title: "ReactJS",\n    isDone: false\n  }, {\n    id: v1(),\n    title: "Redax",\n    isDone: false\n  }],\n  [todoListId2]: [{\n    id: v1(),\n    title: "Milk",\n    isDone: true\n  }, {\n    id: v1(),\n    title: "Juice",\n    isDone: true\n  }, {\n    id: v1(),\n    title: "Meat",\n    isDone: false\n  }, {\n    id: v1(),\n    title: "Bread",\n    isDone: false\n  }]\n};\nexport const TaskForMapBase = () => {\n  return <Box sx={{\n    width: "200px"\n  }}>\n    <TaskForMap task={tasks[todoListId2][1]} todoListId={"todoListId"} removeTask={removeTask} changeStatus={changeStatus} changeEditableSpan={changeEditableSpan} />\n  </Box>;\n};\nTaskForMapBase.parameters = {\n  ...TaskForMapBase.parameters,\n  docs: {\n    ...TaskForMapBase.parameters?.docs,\n    source: {\n      originalSource: "() => {\\n  return <Box sx={{\\n    width: \\"200px\\"\\n  }}>\\n    <TaskForMap task={tasks[todoListId2][1]} todoListId={\\"todoListId\\"} removeTask={removeTask} changeStatus={changeStatus} changeEditableSpan={changeEditableSpan} />\\n  </Box>;\\n}",\n      ...TaskForMapBase.parameters?.docs?.source\n    }\n  }\n};',
            locationsMap: {
              'task-for-map-base': {
                startLoc: { col: 30, line: 58 },
                endLoc: { col: 1, line: 64 },
                startBody: { col: 30, line: 58 },
                endBody: { col: 1, line: 64 },
              },
            },
          },
        },
        title: 'AddItemForm',
        component: _TaskForMap__WEBPACK_IMPORTED_MODULE_1__.s,
      }
      var removeTask = (0, _storybook_addon_actions__WEBPACK_IMPORTED_MODULE_2__.aD)('removeTask'),
        changeStatus = (0, _storybook_addon_actions__WEBPACK_IMPORTED_MODULE_2__.aD)(
          'changeStatus'
        ),
        changeEditableSpan = (0, _storybook_addon_actions__WEBPACK_IMPORTED_MODULE_2__.aD)(
          'changeEditableSpan'
        ),
        tasks =
          ((_tasks = {}),
          (0,
          _Users_Eleonora_Desktop_education_I_todo_react_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_5__.Z)(
            _tasks,
            _state_todoList_reducers_todolists_reducer__WEBPACK_IMPORTED_MODULE_3__.OF,
            [
              { id: (0, uuid__WEBPACK_IMPORTED_MODULE_6__.Z)(), title: 'HTML&CSS', isDone: !0 },
              { id: (0, uuid__WEBPACK_IMPORTED_MODULE_6__.Z)(), title: 'JS', isDone: !0 },
              { id: (0, uuid__WEBPACK_IMPORTED_MODULE_6__.Z)(), title: 'ReactJS', isDone: !1 },
              { id: (0, uuid__WEBPACK_IMPORTED_MODULE_6__.Z)(), title: 'Redax', isDone: !1 },
            ]
          ),
          (0,
          _Users_Eleonora_Desktop_education_I_todo_react_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_5__.Z)(
            _tasks,
            _state_todoList_reducers_todolists_reducer__WEBPACK_IMPORTED_MODULE_3__.ZZ,
            [
              { id: (0, uuid__WEBPACK_IMPORTED_MODULE_6__.Z)(), title: 'Milk', isDone: !0 },
              { id: (0, uuid__WEBPACK_IMPORTED_MODULE_6__.Z)(), title: 'Juice', isDone: !0 },
              { id: (0, uuid__WEBPACK_IMPORTED_MODULE_6__.Z)(), title: 'Meat', isDone: !1 },
              { id: (0, uuid__WEBPACK_IMPORTED_MODULE_6__.Z)(), title: 'Bread', isDone: !1 },
            ]
          ),
          _tasks),
        TaskForMapBase = function TaskForMapBase() {
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(
            _mui_material__WEBPACK_IMPORTED_MODULE_7__.Z,
            {
              sx: { width: '200px' },
              children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(
                _TaskForMap__WEBPACK_IMPORTED_MODULE_1__.s,
                {
                  task: tasks[
                    _state_todoList_reducers_todolists_reducer__WEBPACK_IMPORTED_MODULE_3__.ZZ
                  ][1],
                  todoListId: 'todoListId',
                  removeTask: removeTask,
                  changeStatus: changeStatus,
                  changeEditableSpan: changeEditableSpan,
                }
              ),
            }
          )
        }
      ;(TaskForMapBase.displayName = 'TaskForMapBase'),
        (TaskForMapBase.parameters = (0,
        _Users_Eleonora_Desktop_education_I_todo_react_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_8__.Z)(
          (0,
          _Users_Eleonora_Desktop_education_I_todo_react_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_8__.Z)(
            {},
            TaskForMapBase.parameters
          ),
          {},
          {
            docs: (0,
            _Users_Eleonora_Desktop_education_I_todo_react_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_8__.Z)(
              (0,
              _Users_Eleonora_Desktop_education_I_todo_react_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_8__.Z)(
                {},
                null === (_TaskForMapBase$param = TaskForMapBase.parameters) ||
                  void 0 === _TaskForMapBase$param
                  ? void 0
                  : _TaskForMapBase$param.docs
              ),
              {},
              {
                source: (0,
                _Users_Eleonora_Desktop_education_I_todo_react_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_8__.Z)(
                  {
                    originalSource:
                      '() => {\n  return <Box sx={{\n    width: "200px"\n  }}>\n    <TaskForMap task={tasks[todoListId2][1]} todoListId={"todoListId"} removeTask={removeTask} changeStatus={changeStatus} changeEditableSpan={changeEditableSpan} />\n  </Box>;\n}',
                  },
                  null === (_TaskForMapBase$param2 = TaskForMapBase.parameters) ||
                    void 0 === _TaskForMapBase$param2 ||
                    null === (_TaskForMapBase$param3 = _TaskForMapBase$param2.docs) ||
                    void 0 === _TaskForMapBase$param3
                    ? void 0
                    : _TaskForMapBase$param3.source
                ),
              }
            ),
          }
        ))
      var __namedExportsOrder = ['TaskForMapBase']
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
    './src/components/TaskForMap/TaskForMap.tsx': function (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, {
        s: function () {
          return TaskForMap
        },
      })
      var react = __webpack_require__('./node_modules/react/index.js'),
        ListItem = __webpack_require__('./node_modules/@mui/material/ListItem/ListItem.js'),
        Checkbox = __webpack_require__('./node_modules/@mui/material/Checkbox/Checkbox.js'),
        IconButton = __webpack_require__('./node_modules/@mui/material/IconButton/IconButton.js'),
        BookmarkBorder = __webpack_require__(
          './node_modules/@mui/icons-material/BookmarkBorder.js'
        ),
        Bookmark = __webpack_require__('./node_modules/@mui/icons-material/Bookmark.js'),
        Delete = __webpack_require__('./node_modules/@mui/icons-material/Delete.js'),
        EditableSpan = __webpack_require__('./src/components/EditableSpan/EditableSpan.tsx'),
        TodoList_module_done = 'TodoList_done__K7PV0',
        TodoList_module_list = 'TodoList_list__aQpmq',
        jsx_runtime = __webpack_require__('./node_modules/react/jsx-runtime.js'),
        TaskForMap = (0, react.memo)(function (props) {
          console.log('TaskForMap')
          var EditableSpanHandler = (0, react.useCallback)(
            function (input) {
              props.changeEditableSpan(props.task.id, input, props.todoListId)
            },
            [props.task.id, props.todoListId]
          )
          return (0, jsx_runtime.jsxs)(ListItem.ZP, {
            sx: { justifyContent: 'space-between' },
            className: ''
              .concat(TodoList_module_list, ' ')
              .concat(props.task.isDone ? TodoList_module_done : ''),
            children: [
              (0, jsx_runtime.jsx)(Checkbox.Z, {
                checked: props.task.isDone,
                onChange: function onChangeHandler(e) {
                  return props.changeStatus(
                    props.todoListId,
                    props.task.id,
                    e.currentTarget.checked
                  )
                },
                icon: (0, jsx_runtime.jsx)(BookmarkBorder.Z, {}),
                checkedIcon: (0, jsx_runtime.jsx)(Bookmark.Z, {}),
                color: 'success',
              }),
              (0, jsx_runtime.jsx)(EditableSpan.m, {
                value: props.task.title,
                onChange: EditableSpanHandler,
              }),
              (0, jsx_runtime.jsx)(IconButton.Z, {
                'aria-label': 'delete',
                onClick: function onRemoveHandler() {
                  return props.removeTask(props.task.id, props.todoListId)
                },
                size: 'small',
                children: (0, jsx_runtime.jsx)(Delete.Z, { fontSize: 'inherit' }),
              }),
            ],
          })
        })
      try {
        ;(TaskForMap.displayName = 'TaskForMap'),
          (TaskForMap.__docgenInfo = {
            description: '',
            displayName: 'TaskForMap',
            props: {
              task: {
                defaultValue: null,
                description: '',
                name: 'task',
                required: !0,
                type: { name: 'Task' },
              },
              todoListId: {
                defaultValue: null,
                description: '',
                name: 'todoListId',
                required: !0,
                type: { name: 'string' },
              },
              removeTask: {
                defaultValue: null,
                description: '',
                name: 'removeTask',
                required: !0,
                type: { name: '(taskId: string, todoListId: string) => void' },
              },
              changeStatus: {
                defaultValue: null,
                description: '',
                name: 'changeStatus',
                required: !0,
                type: { name: '(todoListId: string, taskId: string, isDone: boolean) => void' },
              },
              changeEditableSpan: {
                defaultValue: null,
                description: '',
                name: 'changeEditableSpan',
                required: !0,
                type: { name: '(taskId: string, title: string, todoListId: string) => void' },
              },
            },
          }),
          'undefined' != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES['src/components/TaskForMap/TaskForMap.tsx#TaskForMap'] = {
              docgenInfo: TaskForMap.__docgenInfo,
              name: 'TaskForMap',
              path: 'src/components/TaskForMap/TaskForMap.tsx#TaskForMap',
            })
      } catch (__react_docgen_typescript_loader_error) {}
      try {
        ;(TaskForMap.displayName = 'TaskForMap'),
          (TaskForMap.__docgenInfo = {
            description: '',
            displayName: 'TaskForMap',
            props: {
              task: {
                defaultValue: null,
                description: '',
                name: 'task',
                required: !0,
                type: { name: 'Task' },
              },
              todoListId: {
                defaultValue: null,
                description: '',
                name: 'todoListId',
                required: !0,
                type: { name: 'string' },
              },
              removeTask: {
                defaultValue: null,
                description: '',
                name: 'removeTask',
                required: !0,
                type: { name: '(taskId: string, todoListId: string) => void' },
              },
              changeStatus: {
                defaultValue: null,
                description: '',
                name: 'changeStatus',
                required: !0,
                type: { name: '(todoListId: string, taskId: string, isDone: boolean) => void' },
              },
              changeEditableSpan: {
                defaultValue: null,
                description: '',
                name: 'changeEditableSpan',
                required: !0,
                type: { name: '(taskId: string, title: string, todoListId: string) => void' },
              },
            },
          }),
          'undefined' != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES['src/components/TaskForMap/TaskForMap.tsx#TaskForMap'] = {
              docgenInfo: TaskForMap.__docgenInfo,
              name: 'TaskForMap',
              path: 'src/components/TaskForMap/TaskForMap.tsx#TaskForMap',
            })
      } catch (__react_docgen_typescript_loader_error) {}
    },
    './src/state/todoList-reducers/todolists-reducer.ts': function (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, {
        OF: function () {
          return todoListId1
        },
        PD: function () {
          return changeTitleTodolistAC
        },
        ZZ: function () {
          return todoListId2
        },
        iG: function () {
          return removeTodolistAC
        },
        pY: function () {
          return todolistsReducer
        },
        pf: function () {
          return changeFilterTodolistAC
        },
        rO: function () {
          return addTodolistAC
        },
      })
      var _Users_Eleonora_Desktop_education_I_todo_react_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            './node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread2.js'
          ),
        _Users_Eleonora_Desktop_education_I_todo_react_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            './node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js'
          ),
        uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/uuid/dist/esm-browser/v1.js'
        ),
        todoListId1 = (0, uuid__WEBPACK_IMPORTED_MODULE_0__.Z)(),
        todoListId2 = (0, uuid__WEBPACK_IMPORTED_MODULE_0__.Z)(),
        initialState = [],
        todolistsReducer = function todolistsReducer() {
          var state = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : initialState,
            action = arguments.length > 1 ? arguments[1] : void 0
          switch (action.type) {
            case 'REMOVE-TODOLIST':
              return state.filter(function (t) {
                return t.id !== action.id
              })
            case 'ADD-TODOLIST':
              return [{ id: action.todoListId, title: action.title, filter: 'all' }].concat(
                (0,
                _Users_Eleonora_Desktop_education_I_todo_react_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_1__.Z)(
                  state
                )
              )
            case 'CHANGE-TODOLIST-TITLE':
              return state.map(function (t) {
                return t.id === action.id
                  ? (0,
                    _Users_Eleonora_Desktop_education_I_todo_react_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_2__.Z)(
                      (0,
                      _Users_Eleonora_Desktop_education_I_todo_react_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_2__.Z)(
                        {},
                        t
                      ),
                      {},
                      { title: action.title }
                    )
                  : t
              })
            case 'CHANGE-TODOLIST-FILTER':
              return state.map(function (t) {
                return t.id === action.id
                  ? (0,
                    _Users_Eleonora_Desktop_education_I_todo_react_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_2__.Z)(
                      (0,
                      _Users_Eleonora_Desktop_education_I_todo_react_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_2__.Z)(
                        {},
                        t
                      ),
                      {},
                      { filter: action.filter }
                    )
                  : t
              })
            default:
              return state
          }
        },
        removeTodolistAC = function removeTodolistAC(todoListId) {
          return { type: 'REMOVE-TODOLIST', id: todoListId }
        },
        addTodolistAC = function addTodolistAC(title) {
          return {
            type: 'ADD-TODOLIST',
            title: title,
            todoListId: (0, uuid__WEBPACK_IMPORTED_MODULE_0__.Z)(),
          }
        },
        changeTitleTodolistAC = function changeTitleTodolistAC(title, id) {
          return { type: 'CHANGE-TODOLIST-TITLE', id: id, title: title }
        },
        changeFilterTodolistAC = function changeFilterTodolistAC(filter, id) {
          return { type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter }
        }
    },
  },
])
