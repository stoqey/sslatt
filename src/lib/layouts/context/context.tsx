import React from 'react';

import type { LayoutState } from './layout.reducer';
import { initialState as initialReducerState } from './layout.reducer';
import { LayoutStorage } from './storage';

export function createCtxWithReducer<StateType, ActionType>(
  reducer: React.Reducer<StateType, ActionType>,
  initialState: StateType,
) {
  const defaultDispatch: React.Dispatch<ActionType> = () => initialState;
  const stateCtx = React.createContext(initialState);
  const dispatchCtx = React.createContext(defaultDispatch);

  function useStateCtx<K extends keyof StateType>(property: K[]) {
    const state = React.useContext(stateCtx);
    if (state === undefined) {
      throw new Error('useLayoutTheme must be used within a LayoutProvider');
    }
    return property.map((pro) => state[pro]); // multiple state
  }

  function useDispatchCtx() {
    const context = React.useContext(dispatchCtx);
    if (context === undefined) {
      throw new Error('useLayoutTheme must be used within a LayoutProvider');
    }
    return context;
  }

  function Provider({
    children,
    initState,
  }: React.PropsWithChildren<{}> & { initState: StateType }) {
    const [state, dispatch] = React.useReducer<
      React.Reducer<StateType, ActionType>
    >(reducer, initState);

    React.useEffect(() => {
      const storageState = LayoutStorage<StateType>();
      storageState.set(state);
    }, [state]);

    return (
      <dispatchCtx.Provider value={dispatch}>
        <stateCtx.Provider value={state}>{children}</stateCtx.Provider>
      </dispatchCtx.Provider>
    );
  }
  // return [ctx, Provider] as const;
  return [useStateCtx, useDispatchCtx, Provider] as const;
}

export const useInitialLayoutState = () => {
  const storageState = LayoutStorage<LayoutState>();
  const [initState, setInitState] = React.useState<LayoutState>(null);

  React.useEffect(() => {
    (async () => {
      const initStateFromStorage = await storageState.get();
      if (initStateFromStorage && initStateFromStorage.theme) {
        setInitState({ ...initialReducerState, ...initStateFromStorage });
      } else {
        setInitState(initialReducerState);
      }
    })();
  }, []);

  return initState;
};

// create context with no upfront defaultValue
// without having to do undefined check all the time
export function createCtx<A>() {
  const ctx = React.createContext<A | undefined>(undefined);
  function useCtx() {
    const c = React.useContext(ctx);
    if (!c) throw new Error('useCtx must be inside a Provider with a value');
    return c;
  }
  return [useCtx, ctx.Provider] as const; // make TypeScript infer a tuple, not an array of union types
}
