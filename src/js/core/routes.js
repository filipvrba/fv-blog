import routesObj from "../../json/routes.json";
window.ROUTES_JSON = routesObj;
import errorHTML from "../../html/error.html?raw";
import nointernetHTML from "../../html/nointernet.html?raw";
import introductionHTML from "../../html/introduction.html?raw";
import adminSigninHTML from "../../html/admin/signin.html?raw";
import adminHTML from "../../html/admin.html?raw";

window.PAGES = {
  error: errorHTML,
  nointernet: nointernetHTML,
  introduction: introductionHTML,
  "admin/signin": adminSigninHTML,
  admin: adminHTML
};

class Routes {
  static priorityPages(priority=1) {
    return ROUTES_JSON.pages.filter(o => o.priority === priority)
  }
};

window.Routes = Routes