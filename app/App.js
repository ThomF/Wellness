import { ValuesController } from "./Controllers/ValuesController.js";
import { ZensController } from "./Controllers/ZensController.js";

class App {
  zensController = new ZensController()
}

window["app"] = new App();
