import { ValuesController } from "./Controllers/ValuesController.js";
import { ZensController } from "./Controllers/ZensController.js";
import { HomepageController } from "./Controllers/HomepageController.js";

class App {
  zensController = new ZensController()

  homepageController = new HomepageController()
}

window["app"] = new App();
