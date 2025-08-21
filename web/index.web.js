import { AppRegistry } from "react-native";
import App from "../App";
import { name as appName } from "../app.json";

// 注册 RN 应用
AppRegistry.registerComponent(appName, () => App);

// 运行在 Web DOM 上
AppRegistry.runApplication(appName, {
  rootTag: document.getElementById("root"),
});
