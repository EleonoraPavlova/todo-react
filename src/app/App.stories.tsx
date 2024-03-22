import React from 'react'
import App from './App'
import { ReduxStoreProviderDecorator } from 'stories/decorators/ReduxStoreProviderDecorator'

export default {
  title: 'AppBase',
  component: App,
  decorators: [ReduxStoreProviderDecorator],
}

// const onChange = action("onChanges")

export const AppBase = () => {
  return <App demo={false} />
}
