import React from "react";
import AppContainer from "./components/AppContainer";
import ThemeProvider from "./app/config/ThemeProvider";
export default function App() {
  return (
    <ThemeProvider>
      <AppContainer />
    </ThemeProvider>
  );
}
