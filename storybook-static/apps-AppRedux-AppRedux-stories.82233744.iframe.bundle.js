'use strict'
;(self.webpackChunktodo_react = self.webpackChunktodo_react || []).push([
  [683],
  {
    './src/apps/AppRedux/AppRedux.stories.tsx': function (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          AppReduxBase: function () {
            return AppReduxBase
          },
          __namedExportsOrder: function () {
            return __namedExportsOrder
          },
          default: function () {
            return AppRedux_stories
          },
        })
      var objectSpread2 = __webpack_require__(
          './node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread2.js'
        ),
        react = __webpack_require__('./node_modules/react/index.js'),
        es = __webpack_require__('./node_modules/react-redux/es/index.js'),
        AddItemForm = __webpack_require__('./src/components/AddItemForm/AddItemForm.tsx'),
        EditableSpan = __webpack_require__('./src/components/EditableSpan/EditableSpan.tsx'),
        IconButton = __webpack_require__('./node_modules/@mui/material/IconButton/IconButton.js'),
        List = __webpack_require__('./node_modules/@mui/material/List/List.js'),
        Button = __webpack_require__('./node_modules/@mui/material/Button/Button.js'),
        Box = __webpack_require__('./node_modules/@mui/system/esm/Box/Box.js'),
        Delete = __webpack_require__('./node_modules/@mui/icons-material/esm/Delete.js'),
        Task = __webpack_require__('./src/components/Task/Task.tsx'),
        jsx_runtime = __webpack_require__('./node_modules/react/jsx-runtime.js'),
        TodoList = (0, react.memo)(function (props) {
          console.log('TodoList has been called')
          var tasksForTodolist = (0, react.useMemo)(
              function () {
                return 'completed' === props.filter
                  ? props.tasks.filter(function (t) {
                      return t.isDone
                    })
                  : 'active' === props.filter
                    ? props.tasks.filter(function (t) {
                        return !t.isDone
                      })
                    : props.tasks
              },
              [props.filter, props.tasks]
            ),
            removeTodolistHandler = (0, react.useCallback)(
              function () {
                return props.removeTodolist(props.todoListId)
              },
              [props.removeTodolist, props.todoListId]
            ),
            addTasks = (0, react.useCallback)(
              function (input) {
                props.addTask(input, props.todoListId)
              },
              [props.addTask, props.todoListId]
            ),
            EditableSpanTitleHandler = (0, react.useCallback)(
              function (title) {
                props.changeEditableSpanTitle(title, props.todoListId)
              },
              [props.changeEditableSpanTitle, props.todoListId]
            )
          return (0, jsx_runtime.jsxs)('div', {
            children: [
              (0, jsx_runtime.jsxs)(Box.Z, {
                component: 'div',
                sx: {
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                },
                children: [
                  (0, jsx_runtime.jsx)(EditableSpan.m, {
                    value: props.title,
                    onChange: EditableSpanTitleHandler,
                  }),
                  (0, jsx_runtime.jsx)(IconButton.Z, {
                    'aria-label': 'delete',
                    onClick: removeTodolistHandler,
                    size: 'small',
                    children: (0, jsx_runtime.jsx)(Delete.Z, {}),
                  }),
                ],
              }),
              (0, jsx_runtime.jsx)(AddItemForm.B, { addTask: addTasks }),
              (0, jsx_runtime.jsx)(List.Z, {
                children: (function mappedTasks() {
                  return tasksForTodolist.map(function (task) {
                    return (0, jsx_runtime.jsx)(
                      Task.s,
                      {
                        task: task,
                        todoListId: props.todoListId,
                        removeTask: props.removeTask,
                        changeStatus: props.changeStatus,
                        changeEditableSpan: props.changeEditableSpan,
                      },
                      task.id
                    )
                  })
                })(),
              }),
              (0, jsx_runtime.jsxs)('div', {
                children: [
                  (0, jsx_runtime.jsx)(Button.Z, {
                    size: 'small',
                    variant: 'all' === props.filter ? 'contained' : 'text',
                    children: 'All',
                    onClick: function onClick() {
                      props.changeFilterHandler('all', props.todoListId)
                    },
                    className: 'button',
                  }),
                  (0, jsx_runtime.jsx)(Button.Z, {
                    size: 'small',
                    color: 'primary',
                    variant: 'active' === props.filter ? 'contained' : 'text',
                    children: 'Active',
                    onClick: function onClick() {
                      props.changeFilterHandler('active', props.todoListId)
                    },
                    className: 'button',
                  }),
                  (0, jsx_runtime.jsx)(Button.Z, {
                    size: 'small',
                    color: 'secondary',
                    variant: 'completed' === props.filter ? 'contained' : 'text',
                    children: 'Completed',
                    onClick: function onClick() {
                      props.changeFilterHandler('completed', props.todoListId)
                    },
                    className: 'button',
                  }),
                ],
              }),
            ],
          })
        }),
        TodoList_TodoList = TodoList
      try {
        ;(TodoList.displayName = 'TodoList'),
          (TodoList.__docgenInfo = {
            description: '',
            displayName: 'TodoList',
            props: {
              title: {
                defaultValue: null,
                description: '',
                name: 'title',
                required: !0,
                type: { name: 'string' },
              },
              tasks: {
                defaultValue: null,
                description: '',
                name: 'tasks',
                required: !0,
                type: { name: 'Task[]' },
              },
              todoListId: {
                defaultValue: null,
                description: '',
                name: 'todoListId',
                required: !0,
                type: { name: 'string' },
              },
              filter: {
                defaultValue: null,
                description: '',
                name: 'filter',
                required: !0,
                type: {
                  name: 'enum',
                  value: [{ value: '"all"' }, { value: '"completed"' }, { value: '"active"' }],
                },
              },
              removeTask: {
                defaultValue: null,
                description: '',
                name: 'removeTask',
                required: !0,
                type: { name: '(id: string, togoListId: string) => void' },
              },
              addTask: {
                defaultValue: null,
                description: '',
                name: 'addTask',
                required: !0,
                type: { name: '(inputValue: string, togoListId: string) => void' },
              },
              changeStatus: {
                defaultValue: null,
                description: '',
                name: 'changeStatus',
                required: !0,
                type: { name: '(togoListId: string, taskId: string, isDone: boolean) => void' },
              },
              changeFilterHandler: {
                defaultValue: null,
                description: '',
                name: 'changeFilterHandler',
                required: !0,
                type: { name: '(value: FilterValues, id: string) => void' },
              },
              removeTodolist: {
                defaultValue: null,
                description: '',
                name: 'removeTodolist',
                required: !0,
                type: { name: '(togoListId: string) => void' },
              },
              changeEditableSpan: {
                defaultValue: null,
                description: '',
                name: 'changeEditableSpan',
                required: !0,
                type: { name: '(id: string, input: string, togoListId: string) => void' },
              },
              changeEditableSpanTitle: {
                defaultValue: null,
                description: '',
                name: 'changeEditableSpanTitle',
                required: !0,
                type: { name: '(input: string, togoListId: string) => void' },
              },
            },
          }),
          'undefined' != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES['src/components/TodoList/TodoList.tsx#TodoList'] = {
              docgenInfo: TodoList.__docgenInfo,
              name: 'TodoList',
              path: 'src/components/TodoList/TodoList.tsx#TodoList',
            })
      } catch (__react_docgen_typescript_loader_error) {}
      try {
        ;(TodoList.displayName = 'TodoList'),
          (TodoList.__docgenInfo = {
            description: '',
            displayName: 'TodoList',
            props: {
              title: {
                defaultValue: null,
                description: '',
                name: 'title',
                required: !0,
                type: { name: 'string' },
              },
              tasks: {
                defaultValue: null,
                description: '',
                name: 'tasks',
                required: !0,
                type: { name: 'Task[]' },
              },
              todoListId: {
                defaultValue: null,
                description: '',
                name: 'todoListId',
                required: !0,
                type: { name: 'string' },
              },
              filter: {
                defaultValue: null,
                description: '',
                name: 'filter',
                required: !0,
                type: {
                  name: 'enum',
                  value: [{ value: '"all"' }, { value: '"completed"' }, { value: '"active"' }],
                },
              },
              removeTask: {
                defaultValue: null,
                description: '',
                name: 'removeTask',
                required: !0,
                type: { name: '(id: string, togoListId: string) => void' },
              },
              addTask: {
                defaultValue: null,
                description: '',
                name: 'addTask',
                required: !0,
                type: { name: '(inputValue: string, togoListId: string) => void' },
              },
              changeStatus: {
                defaultValue: null,
                description: '',
                name: 'changeStatus',
                required: !0,
                type: { name: '(togoListId: string, taskId: string, isDone: boolean) => void' },
              },
              changeFilterHandler: {
                defaultValue: null,
                description: '',
                name: 'changeFilterHandler',
                required: !0,
                type: { name: '(value: FilterValues, id: string) => void' },
              },
              removeTodolist: {
                defaultValue: null,
                description: '',
                name: 'removeTodolist',
                required: !0,
                type: { name: '(togoListId: string) => void' },
              },
              changeEditableSpan: {
                defaultValue: null,
                description: '',
                name: 'changeEditableSpan',
                required: !0,
                type: { name: '(id: string, input: string, togoListId: string) => void' },
              },
              changeEditableSpanTitle: {
                defaultValue: null,
                description: '',
                name: 'changeEditableSpanTitle',
                required: !0,
                type: { name: '(input: string, togoListId: string) => void' },
              },
            },
          }),
          'undefined' != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES['src/components/TodoList/TodoList.tsx#TodoList'] = {
              docgenInfo: TodoList.__docgenInfo,
              name: 'TodoList',
              path: 'src/components/TodoList/TodoList.tsx#TodoList',
            })
      } catch (__react_docgen_typescript_loader_error) {}
      var Grid = __webpack_require__('./node_modules/@mui/material/Grid/Grid.js'),
        Paper = __webpack_require__('./node_modules/@mui/material/Paper/Paper.js'),
        AppBar = __webpack_require__('./node_modules/@mui/material/AppBar/AppBar.js'),
        Toolbar = __webpack_require__('./node_modules/@mui/material/Toolbar/Toolbar.js'),
        Typography = __webpack_require__('./node_modules/@mui/material/Typography/Typography.js'),
        Container = __webpack_require__('./node_modules/@mui/material/Container/Container.js'),
        Menu = __webpack_require__('./node_modules/@mui/icons-material/esm/Menu.js'),
        defineProperty = __webpack_require__(
          './node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/defineProperty.js'
        ),
        toConsumableArray = __webpack_require__(
          './node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js'
        ),
        v1 = __webpack_require__('./node_modules/uuid/dist/esm-browser/v1.js'),
        initialStateTasks = { count: [] },
        todolists_reducer = __webpack_require__('./src/state/todoList-reducers/todolists-reducer.ts')
      function AppRedux() {
        console.log('AppRedux has been called')
        var dispatch = (0, es.I0)(),
          todolists = (0, es.v9)(function (state) {
            return state.todolist
          }),
          tasks = (0, es.v9)(function (tasks) {
            return tasks.tasks
          }),
          removeTask = (0, react.useCallback)(
            function (id, todoListId) {
              var action = (function removeTaskAC(id, togoListId) {
                return { type: 'REMOVE-TASK', id: id, togoListId: togoListId }
              })(id, todoListId)
              dispatch(action)
            },
            [dispatch]
          ),
          addTask = (0, react.useCallback)(
            function (inputValue, todoListId) {
              var action = (function addTaskAC(inputValue, togoListId) {
                return { type: 'ADD-TASK', inputValue: inputValue, togoListId: togoListId }
              })(inputValue, todoListId)
              dispatch(action)
            },
            [dispatch]
          ),
          changeStatus = (0, react.useCallback)(
            function (todoListId, id, isDone) {
              var action = (function changeTaskStatusAC(togoListId, id, isDone) {
                return {
                  type: 'CHANGE-TASK-STATUS',
                  id: id,
                  togoListId: togoListId,
                  isDone: isDone,
                }
              })(todoListId, id, isDone)
              dispatch(action)
            },
            [dispatch]
          ),
          changeEditableSpan = (0, react.useCallback)(
            function (id, input, todoListId) {
              var action = (function changeTaskTitleAC(id, input, togoListId) {
                return { type: 'CHANGE-TASK-TITLE', id: id, input: input, togoListId: togoListId }
              })(id, input, todoListId)
              dispatch(action)
            },
            [dispatch]
          ),
          changeFilterHandler = (0, react.useCallback)(
            function (value, todoListId) {
              var action = (0, todolists_reducer.pf)(value, todoListId)
              dispatch(action)
            },
            [dispatch]
          ),
          removeTodolist = (0, react.useCallback)(function (todoListId) {
            var action = (0, todolists_reducer.iG)(todoListId)
            dispatch(action)
          }, []),
          addTodoList = (0, react.useCallback)(
            function (input) {
              var action = (0, todolists_reducer.rO)(input)
              dispatch(action)
            },
            [dispatch]
          ),
          changeEditableSpanTitle = (0, react.useCallback)(
            function (title, todoListId) {
              var action = (0, todolists_reducer.PD)(title, todoListId)
              dispatch(action)
            },
            [dispatch]
          )
        return (0, jsx_runtime.jsxs)('div', {
          className: 'App',
          children: [
            (0, jsx_runtime.jsx)(AppBar.Z, {
              position: 'static',
              children: (0, jsx_runtime.jsxs)(Toolbar.Z, {
                variant: 'dense',
                children: [
                  (0, jsx_runtime.jsx)(IconButton.Z, {
                    edge: 'start',
                    color: 'inherit',
                    'aria-label': 'menu',
                    sx: { mr: 2 },
                    children: (0, jsx_runtime.jsx)(Menu.Z, {}),
                  }),
                  (0, jsx_runtime.jsx)(Typography.Z, {
                    variant: 'h6',
                    color: 'inherit',
                    component: 'div',
                    children: 'Menu',
                  }),
                ],
              }),
            }),
            (0, jsx_runtime.jsxs)(Container.Z, {
              children: [
                (0, jsx_runtime.jsx)(Container.Z, {
                  maxWidth: 'sm',
                  children: (0, jsx_runtime.jsx)('div', {
                    className: 'container',
                    children: (0, jsx_runtime.jsx)(AddItemForm.B, { addTask: addTodoList }),
                  }),
                }),
                (0, jsx_runtime.jsx)(Grid.ZP, {
                  container: !0,
                  spacing: 7,
                  className: 'grid',
                  children: (function mappedList() {
                    return todolists.map(function (l) {
                      var tasksForTodolist = tasks[l.id]
                      return (0, jsx_runtime.jsx)(
                        Grid.ZP,
                        {
                          item: !0,
                          children: (0, jsx_runtime.jsx)(Paper.Z, {
                            sx: { padding: '20px' },
                            elevation: 3,
                            children: (0, jsx_runtime.jsx)(TodoList_TodoList, {
                              tasks: tasksForTodolist,
                              title: l.title,
                              todoListId: l.id,
                              filter: l.filter,
                              removeTask: removeTask,
                              addTask: addTask,
                              changeStatus: changeStatus,
                              changeFilterHandler: changeFilterHandler,
                              removeTodolist: removeTodolist,
                              changeEditableSpan: changeEditableSpan,
                              changeEditableSpanTitle: changeEditableSpanTitle,
                            }),
                          }),
                        },
                        l.id
                      )
                    })
                  })(),
                }),
              ],
            }),
          ],
        })
      }
      AppRedux.displayName = 'AppRedux'
      var _tasks,
        _AppReduxBase$paramet,
        _AppReduxBase$paramet2,
        _AppReduxBase$paramet3,
        AppRedux_AppRedux = AppRedux,
        redux = __webpack_require__('./node_modules/redux/es/redux.js'),
        rootReducer = (0, redux.UY)({
          todolist: todolists_reducer.pY,
          tasks: function tasksReducer() {
            var state = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : initialStateTasks,
              action = arguments.length > 1 ? arguments[1] : void 0
            switch (action.type) {
              case 'REMOVE-TASK':
                var filteredTasks = state[action.togoListId].filter(function (t) {
                  return t.id !== action.id
                })
                return (state[action.togoListId] = filteredTasks), (0, objectSpread2.Z)({}, state)
              case 'ADD-TASK':
                var newTask = { id: (0, v1.Z)(), title: action.inputValue, isDone: !1 }
                return (0, objectSpread2.Z)(
                  (0, objectSpread2.Z)({}, state),
                  {},
                  (0, defineProperty.Z)(
                    {},
                    action.togoListId,
                    [newTask].concat((0, toConsumableArray.Z)(state[action.togoListId]))
                  )
                )
              case 'CHANGE-TASK-TITLE':
                return (0, objectSpread2.Z)(
                  (0, objectSpread2.Z)({}, state),
                  {},
                  (0, defineProperty.Z)(
                    {},
                    action.togoListId,
                    state[action.togoListId].map(function (t) {
                      return t.id === action.id
                        ? (0, objectSpread2.Z)((0, objectSpread2.Z)({}, t), {}, { title: action.input })
                        : t
                    })
                  )
                )
              case 'CHANGE-TASK-STATUS':
                return (0, objectSpread2.Z)(
                  (0, objectSpread2.Z)({}, state),
                  {},
                  (0, defineProperty.Z)(
                    {},
                    action.togoListId,
                    state[action.togoListId].map(function (t) {
                      return t.id === action.id
                        ? (0, objectSpread2.Z)((0, objectSpread2.Z)({}, t), {}, { isDone: action.isDone })
                        : t
                    })
                  )
                )
              case 'ADD-TODOLIST':
                return (0, objectSpread2.Z)(
                  (0, objectSpread2.Z)({}, state),
                  {},
                  (0, defineProperty.Z)({}, action.todoListId, [])
                )
              case 'REMOVE-TODOLIST':
                var copyState = (0, objectSpread2.Z)({}, state)
                return delete copyState[action.id], copyState
              default:
                return state
            }
          },
        }),
        initialGlobalState = {
          todolist: [
            { id: 'todoListId1', title: 'What to learn', filter: 'all' },
            { id: 'todoListId2', title: 'What to buy', filter: 'all' },
          ],
          tasks:
            ((_tasks = {}),
            (0, defineProperty.Z)(_tasks, 'todoListId1', [
              { id: (0, v1.Z)(), title: 'HTML&CSS', isDone: !0 },
              { id: (0, v1.Z)(), title: 'JS', isDone: !0 },
              { id: (0, v1.Z)(), title: 'ReactJS', isDone: !1 },
              { id: (0, v1.Z)(), title: 'Redax', isDone: !1 },
            ]),
            (0, defineProperty.Z)(_tasks, 'todoListId2', [
              { id: (0, v1.Z)(), title: 'Milk', isDone: !0 },
              { id: (0, v1.Z)(), title: 'Juice', isDone: !0 },
              { id: (0, v1.Z)(), title: 'Meat', isDone: !1 },
              { id: (0, v1.Z)(), title: 'Bread', isDone: !1 },
            ]),
            _tasks),
        },
        storyBookStore = (0, redux.MT)(rootReducer, initialGlobalState),
        ReduxStoreProviderDecorator = function ReduxStoreProviderDecorator(story) {
          return (0, jsx_runtime.jsx)(es.zt, { store: storyBookStore, children: story() })
        }
      ReduxStoreProviderDecorator.displayName = 'ReduxStoreProviderDecorator'
      try {
        ;(ReduxStoreProviderDecorator.displayName = 'ReduxStoreProviderDecorator'),
          (ReduxStoreProviderDecorator.__docgenInfo = {
            description: '',
            displayName: 'ReduxStoreProviderDecorator',
            props: {},
          }),
          'undefined' != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES['src/stories/ReduxStoreProviderDecorator.tsx#ReduxStoreProviderDecorator'] = {
              docgenInfo: ReduxStoreProviderDecorator.__docgenInfo,
              name: 'ReduxStoreProviderDecorator',
              path: 'src/stories/ReduxStoreProviderDecorator.tsx#ReduxStoreProviderDecorator',
            })
      } catch (__react_docgen_typescript_loader_error) {}
      try {
        ;(ReduxStoreProviderDecorator.displayName = 'ReduxStoreProviderDecorator'),
          (ReduxStoreProviderDecorator.__docgenInfo = {
            description: '',
            displayName: 'ReduxStoreProviderDecorator',
            props: {},
          }),
          'undefined' != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES['src/stories/ReduxStoreProviderDecorator.tsx#ReduxStoreProviderDecorator'] = {
              docgenInfo: ReduxStoreProviderDecorator.__docgenInfo,
              name: 'ReduxStoreProviderDecorator',
              path: 'src/stories/ReduxStoreProviderDecorator.tsx#ReduxStoreProviderDecorator',
            })
      } catch (__react_docgen_typescript_loader_error) {}
      var AppRedux_stories = {
          parameters: {
            storySource: {
              source:
                'import React from \'react\';\nimport AppRedux from "./AppRedux";\nimport { ReduxStoreProviderDecorator } from "../../stories/ReduxStoreProviderDecorator";\nexport default {\n  title: "AppReduxBase",\n  component: AppRedux,\n  decorators: [ReduxStoreProviderDecorator]\n};\n\n// const onChange = action("onChanges")\n\nexport const AppReduxBase = () => {\n  return <AppRedux />;\n};\nAppReduxBase.parameters = {\n  ...AppReduxBase.parameters,\n  docs: {\n    ...AppReduxBase.parameters?.docs,\n    source: {\n      originalSource: "() => {\\n  return <AppRedux />;\\n}",\n      ...AppReduxBase.parameters?.docs?.source\n    }\n  }\n};',
              locationsMap: {
                'app-redux-base': {
                  startLoc: { col: 28, line: 12 },
                  endLoc: { col: 1, line: 14 },
                  startBody: { col: 28, line: 12 },
                  endBody: { col: 1, line: 14 },
                },
              },
            },
          },
          title: 'AppReduxBase',
          component: AppRedux_AppRedux,
          decorators: [ReduxStoreProviderDecorator],
        },
        AppReduxBase = function AppReduxBase() {
          return (0, jsx_runtime.jsx)(AppRedux_AppRedux, {})
        }
      ;(AppReduxBase.displayName = 'AppReduxBase'),
        (AppReduxBase.parameters = (0, objectSpread2.Z)(
          (0, objectSpread2.Z)({}, AppReduxBase.parameters),
          {},
          {
            docs: (0, objectSpread2.Z)(
              (0, objectSpread2.Z)(
                {},
                null === (_AppReduxBase$paramet = AppReduxBase.parameters) || void 0 === _AppReduxBase$paramet
                  ? void 0
                  : _AppReduxBase$paramet.docs
              ),
              {},
              {
                source: (0, objectSpread2.Z)(
                  { originalSource: '() => {\n  return <AppRedux />;\n}' },
                  null === (_AppReduxBase$paramet2 = AppReduxBase.parameters) ||
                    void 0 === _AppReduxBase$paramet2 ||
                    null === (_AppReduxBase$paramet3 = _AppReduxBase$paramet2.docs) ||
                    void 0 === _AppReduxBase$paramet3
                    ? void 0
                    : _AppReduxBase$paramet3.source
                ),
              }
            ),
          }
        ))
      var __namedExportsOrder = ['AppReduxBase']
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
              ;/[a-zа-яё]/i.test(taskName) ? (addTask(taskName), setInputValue('')) : setError('Required')
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
        _mui_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__('./node_modules/@mui/material/Box/Box.js'),
        react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__('./node_modules/react/index.js'),
        react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__('./node_modules/react/jsx-runtime.js'),
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
            ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Z, {
                value: input,
                onChange: function onChangeTitleHandler(e) {
                  setInput(e.currentTarget.value)
                },
                onBlur: function activateViewMode() {
                  setEditMode(!1), onChange(input)
                },
                onKeyDown: function onKeyDownHandler(e) {
                  'Enter' === e.key && (setInput(e.currentTarget.value), setEditMode(!1), onChange(input))
                },
                autoFocus: !0,
                variant: 'standard',
              })
            : (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_mui_material__WEBPACK_IMPORTED_MODULE_4__.Z, {
                component: 'span',
                onDoubleClick: function activateEditMode() {
                  setEditMode(!0), setInput(value)
                },
                children: value,
              })
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
            (STORYBOOK_REACT_CLASSES['src/components/EditableSpan/EditableSpan.tsx#EditableSpan'] = {
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
            (STORYBOOK_REACT_CLASSES['src/components/EditableSpan/EditableSpan.tsx#EditableSpan'] = {
              docgenInfo: EditableSpan.__docgenInfo,
              name: 'EditableSpan',
              path: 'src/components/EditableSpan/EditableSpan.tsx#EditableSpan',
            })
      } catch (__react_docgen_typescript_loader_error) {}
    },
    './src/components/Task/Task.tsx': function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.d(__webpack_exports__, {
        s: function () {
          return Task
        },
      })
      var react = __webpack_require__('./node_modules/react/index.js'),
        ListItem = __webpack_require__('./node_modules/@mui/material/ListItem/ListItem.js'),
        Checkbox = __webpack_require__('./node_modules/@mui/material/Checkbox/Checkbox.js'),
        IconButton = __webpack_require__('./node_modules/@mui/material/IconButton/IconButton.js'),
        BookmarkBorder = __webpack_require__('./node_modules/@mui/icons-material/BookmarkBorder.js'),
        Bookmark = __webpack_require__('./node_modules/@mui/icons-material/Bookmark.js'),
        Delete = __webpack_require__('./node_modules/@mui/icons-material/Delete.js'),
        EditableSpan = __webpack_require__('./src/components/EditableSpan/EditableSpan.tsx'),
        TodoList_module_done = 'TodoList_done__K7PV0',
        TodoList_module_list = 'TodoList_list__aQpmq',
        jsx_runtime = __webpack_require__('./node_modules/react/jsx-runtime.js'),
        Task = (0, react.memo)(function (props) {
          console.log('Task')
          var EditableSpanHandler = (0, react.useCallback)(
            function (input) {
              props.changeEditableSpan(props.task.id, input, props.todoListId)
            },
            [props.task.id, props.todoListId]
          )
          return (0, jsx_runtime.jsxs)(ListItem.ZP, {
            sx: { justifyContent: 'space-between' },
            className: ''.concat(TodoList_module_list, ' ').concat(props.task.isDone ? TodoList_module_done : ''),
            children: [
              (0, jsx_runtime.jsx)(Checkbox.Z, {
                checked: props.task.isDone,
                onChange: function onChangeHandler(e) {
                  return props.changeStatus(props.todoListId, props.task.id, e.currentTarget.checked)
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
        ;(Task.displayName = 'Task'),
          (Task.__docgenInfo = {
            description: '',
            displayName: 'Task',
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
            (STORYBOOK_REACT_CLASSES['src/components/Task/Task.tsx#Task'] = {
              docgenInfo: Task.__docgenInfo,
              name: 'Task',
              path: 'src/components/Task/Task.tsx#Task',
            })
      } catch (__react_docgen_typescript_loader_error) {}
      try {
        ;(Task.displayName = 'Task'),
          (Task.__docgenInfo = {
            description: '',
            displayName: 'Task',
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
            (STORYBOOK_REACT_CLASSES['src/components/Task/Task.tsx#Task'] = {
              docgenInfo: Task.__docgenInfo,
              name: 'Task',
              path: 'src/components/Task/Task.tsx#Task',
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
        uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__('./node_modules/uuid/dist/esm-browser/v1.js'),
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
