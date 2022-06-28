import React from 'react';
import HomeScreen from "./screens/home.screen";
import {AuthProvider} from "./contexts/auth.context";
import {EntriesProvider} from "./contexts/entries.context";
import { RootSiblingParent } from 'react-native-root-siblings'

const App = () => {
  return (
    <RootSiblingParent>
      <AuthProvider>
        <EntriesProvider>
          <HomeScreen />
        </EntriesProvider>
      </AuthProvider>
    </RootSiblingParent>
  )
}

export default App
