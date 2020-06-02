// packages
import { CSSProperties, createContext } from 'react';

export interface IndexBarContextPayload {
  scrollTop: number;
  activeAnchorIndex: string | number;
  wrapperStyle?: CSSProperties;
  anchorStyle?: CSSProperties;
}

const IndexBarContext = createContext<IndexBarContextPayload>({
  // none anchor selected
  scrollTop: 0,
  activeAnchorIndex: '',
});

export default IndexBarContext;
