import { StatusBar } from "expo-status-bar";
import Router from "./src/navigation/Router.js";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import { AuthProvider } from "./src/context/AuthContext.js";

export default function App() {
  return (
    <>
      <AuthProvider>
        <AutocompleteDropdownContextProvider>
          <StatusBar barStyle="dark-content" />
          <Router />
        </AutocompleteDropdownContextProvider>
      </AuthProvider>
    </>
  );
}
