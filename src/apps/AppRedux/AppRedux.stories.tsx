import React from 'react';
import AppRedux from "./AppRedux";
import { ReduxStoreProviderDecorator } from "../../stories/decorators/ReduxStoreProviderDecorator";

export default {
  title: "AppReduxBase",
  component: AppRedux,
  decorators: [ReduxStoreProviderDecorator]
}

// const onChange = action("onChanges")

export const AppReduxBase = () => {
  return (<AppRedux demo={false} />)
}