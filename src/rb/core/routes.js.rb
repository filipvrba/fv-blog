import 'routesObj', '../../json/routes.json'

window.ROUTES_JSON = routes_obj

import 'errorHTML', '../../html/error.html?raw'
import 'nointernetHTML', '../../html/nointernet.html?raw'
import 'introductionHTML', '../../html/introduction.html?raw'
import 'adminSigninHTML', '../../html/admin/signin.html?raw'
import 'adminHTML', '../../html/admin.html?raw'

window.PAGES = {
  error:          errorHTML,
  nointernet:     nointernetHTML,
  introduction:   introductionHTML,
  'admin/signin': adminSigninHTML,
  admin:          adminHTML,
}

class Routes
  def self.priority_pages(priority = 1)
    ROUTES_JSON.pages.select {|o| o.priority == priority}
  end
end
window.Routes = Routes