import { ValuesController } from "./Controllers/ValuesController.js";
import { ZensController } from "./Controllers/ZensController.js";
import { HomepageController } from "./Controllers/HomepageController.js";
import { WeathersController } from "./Controllers/WeathersController.js";

class App {
  zensController = new ZensController()

  homepageController = new HomepageController()

  weathersController = new WeathersController()
}

window["app"] = new App();
