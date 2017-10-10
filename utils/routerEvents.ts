import Router from 'next/router';
import EventEmitter from './EventEmitter'

const routerEvents = new EventEmitter();

export enum RouterState {
    LOADING,
    COMPLETE,
    ERROR,
}

let currentState = RouterState.COMPLETE

function bindState(name: string, newState: RouterState) {
    Router[name] = () => {
        currentState = newState
        routerEvents.emit(name)
        routerEvents.emit('stateChange', currentState)
    }
}

bindState('onRouteChangeStart', RouterState.LOADING)
bindState('onRouteChangeComplete', RouterState.COMPLETE)
bindState('onRouteChangeError', RouterState.ERROR)

export const getState = (): RouterState => currentState


export default routerEvents