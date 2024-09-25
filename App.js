import { StyleSheet } from 'react-native';
import {RootNavigator} from "./src/navigation/RootNavigator";
import {Provider} from "react-redux";
import {store} from "./src/store";

export default function App() {

  return (
      <Provider store={store}>
        <RootNavigator />
      </Provider>
  );
}
