import * as React from 'react';
import axios from 'axios';
import Link from 'next/link';
import Router from 'next/router';

import routerEvents, { RouterState, getState } from '../utils/routerEvents';

interface State {
  state: RouterState;
  loading: boolean;
}

interface Props {
  children(state: State);
}

export { RouterState };
export default class LoadingState extends React.Component<Props, State> {
  constructor() {
    super();

    const state = getState();
    const loading = state === RouterState.LOADING;
    this.state = {
      state,
      loading,
    };
  }

  stateChange = (state: RouterState) => {
    const loading = state === RouterState.LOADING;
    this.setState({ state, loading });
  };

  componentDidMount() {
    routerEvents.on('stateChange', this.stateChange);
  }

  componentWillUnmount() {
    routerEvents.off('stateChange', this.stateChange);
  }

  render() {
    return this.props.children(this.state);
  }
}
