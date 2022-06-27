import React from 'react';
import HomeScreen from "./screens/home.screen";
import {AuthProvider} from "./contexts/auth.context";
import {EntriesProvider} from "./contexts/entries.context";

const App = () => {
  return (
      <AuthProvider>
        <EntriesProvider>
          <HomeScreen />
        </EntriesProvider>
      </AuthProvider>
  )
}

export default App
