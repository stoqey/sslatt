import { createCtxWithReducer } from './context';
import layoutReducer, { initialState } from './layout.reducer';

const [useLayoutState, useLayoutDispatch, LayoutProvider] =
  createCtxWithReducer(layoutReducer, initialState);

export { LayoutProvider, useLayoutDispatch, useLayoutState };
