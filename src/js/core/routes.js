import routesObj from "../../json/routes.json";
window.ROUTES_JSON = routesObj;
import errorHTML from "../../html/error.html?raw";
import nointernetHTML from "../../html/nointernet.html?raw";
import articlesHTML from "../../html/articles.html?raw";
import articleHTML from "../../html/article.html?raw";
import adminSigninHTML from "../../html/admin/signin.html?raw";
import adminHTML from "../../html/admin.html?raw";
import unsubscribeHTML from "../../html/unsubscribe.html?raw";

window.PAGES = {
  error: errorHTML,
  nointernet: nointernetHTML,
  articles: articlesHTML,
  article: articleHTML,
  "admin/signin": adminSigninHTML,
  admin: adminHTML,
  unsubscribe: unsubscribeHTML
};

class Routes {
  static priorityPages(priority=1) {
    return ROUTES_JSON.pages.filter(o => o.priority === priority)
  }
};

window.Routes = Routes