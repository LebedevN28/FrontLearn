import React, { use } from 'react';
import { store } from '../../store/store';
import { refreshThunk } from '../../../4_features/auth/model/authThunks';
import { getAllNotesThunk } from '../../../5_entities/note/model/noteThunks';

type InitProviderProps = {
  children: React.JSX.Element;
};

const initNotes = store.dispatch(getAllNotesThunk());
const initAuth = store.dispatch(refreshThunk());
const initPromise = Promise.allSettled([initNotes, initAuth]);

export default function InitProvider({ children }: InitProviderProps): React.JSX.Element {
  use(initPromise);
  return children;
}
