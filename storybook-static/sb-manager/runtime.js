import {
  Addon_TypesEnum,
  CHANNEL_CREATED,
  Provider,
  TELEMETRY_ERROR,
  UncaughtManagerError,
  addons,
  createBrowserChannel,
  dist_exports as dist_exports2,
  dist_exports2 as dist_exports3,
  dist_exports3 as dist_exports4,
  dist_exports4 as dist_exports5,
  dist_exports5 as dist_exports7,
  mockChannel,
  renderStorybookUI,
} from './chunk-45GKKSU6.js'
import './chunk-O2ZUMB77.js'
import { require_react_dom } from './chunk-NBCGHFLK.js'
import './chunk-QPL63VNK.js'
import { dist_exports, dist_exports2 as dist_exports6, scope } from './chunk-SPUAGIB2.js'
import { require_react } from './chunk-QMHPSTMR.js'
import './chunk-3J6GS6FI.js'
import { __toESM } from './chunk-RKFFWI2D.js'
var REACT = __toESM(require_react()),
  REACTDOM = __toESM(require_react_dom())
var values = {
  react: REACT,
  'react-dom': REACTDOM,
  '@storybook/components': dist_exports7,
  '@storybook/channels': dist_exports4,
  '@storybook/core-events': dist_exports3,
  '@storybook/router': dist_exports2,
  '@storybook/theming': dist_exports6,
  '@storybook/api': dist_exports5,
  '@storybook/manager-api': dist_exports5,
  '@storybook/addons': { addons, types: Addon_TypesEnum, mockChannel },
  '@storybook/client-logger': dist_exports,
}
var Keys = ((Keys2) => (
  (Keys2.react = '__REACT__'),
  (Keys2['react-dom'] = '__REACTDOM__'),
  (Keys2['@storybook/components'] = '__STORYBOOKCOMPONENTS__'),
  (Keys2['@storybook/channels'] = '__STORYBOOKCHANNELS__'),
  (Keys2['@storybook/core-events'] = '__STORYBOOKCOREEVENTS__'),
  (Keys2['@storybook/router'] = '__STORYBOOKROUTER__'),
  (Keys2['@storybook/theming'] = '__STORYBOOKTHEMING__'),
  (Keys2['@storybook/api'] = '__STORYBOOKAPI__'),
  (Keys2['@storybook/manager-api'] = '__STORYBOOKAPI__'),
  (Keys2['@storybook/addons'] = '__STORYBOOKADDONS__'),
  (Keys2['@storybook/client-logger'] = '__STORYBOOKCLIENTLOGGER__'),
  Keys2
))(Keys || {})
var { FEATURES, CONFIG_TYPE } = scope,
  ReactProvider = class extends Provider {
    constructor() {
      super()
      let channel = createBrowserChannel({ page: 'manager' })
      addons.setChannel(channel),
        channel.emit(CHANNEL_CREATED),
        (this.addons = addons),
        (this.channel = channel),
        (scope.__STORYBOOK_ADDONS_CHANNEL__ = channel),
        FEATURES?.storyStoreV7 &&
          CONFIG_TYPE === 'DEVELOPMENT' &&
          ((this.serverChannel = this.channel), addons.setServerChannel(this.serverChannel))
    }
    getElements(type) {
      return this.addons.getElements(type)
    }
    getConfig() {
      return this.addons.getConfig()
    }
    handleAPI(api) {
      this.addons.loadAddons(api)
    }
  }
Object.keys(Keys).forEach((key) => {
  scope[Keys[key]] = values[key]
})
function preprocessError(originalError) {
  let error = originalError
  return (
    originalError.fromStorybook || (error = new UncaughtManagerError(originalError)),
    (error.target === window || error.currentTarget === window || error.srcElement === window) &&
      ((error = new Error(originalError.message)),
      (error.name = originalError.name || error.name),
      (error.category = originalError.category)),
    error
  )
}
scope.sendTelemetryError = (error) => {
  scope.__STORYBOOK_ADDONS_CHANNEL__.emit(TELEMETRY_ERROR, preprocessError(error))
}
scope.addEventListener('error', (args) => {
  let error = args.error || args
  scope.sendTelemetryError(error)
})
scope.addEventListener('unhandledrejection', ({ reason }) => {
  scope.sendTelemetryError(reason)
})
var { document } = scope,
  rootEl = document.getElementById('root')
renderStorybookUI(rootEl, new ReactProvider())
