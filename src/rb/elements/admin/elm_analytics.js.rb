import 'CDatabase', '../../components/admin/elm-analytics/database'
import 'CContents', '../../components/admin/elm-analytics/contents'

export default class ElmAdminAnalytics < HTMLElement
  def initialize
    super

    init_elm()

    @c_database = CDatabase.new(self)
    @c_contents = CContents.new(self)
  end

  def connected_callback()
    @c_database.get_count_articles() do |articles|
      @c_contents.udpate_tbody_articles(articles)
    end

    @c_database.get_count_referrer() do |refferer|
      @c_contents.udpate_tbody_referrer(refferer)
    end

    @c_database.get_count_devices() do |devices|
      @c_contents.udpate_tbody_devices(devices)
    end
  end

  def disconnected_callback()
  end

  def init_elm()
    template = """
<div class='container mt-5'>
  <h1 class='text-center'>Analýza článků</h1>

  <div class='row d-flex justify-content-center'>
    <div class='col-md-6 col-lg-4 mb-4'>
      <div class='card anim-card shadow-sm h-100 overflow-hidden'>
        <div class='card-body'>
          <table class='table'>
            <thead>
              <tr>
                <th scope='col'>Název článku</th>
                <th scope='col' class='text-end'>Zobrazení</th>
              </tr>
            </thead>
            <tbody id='analyticsArtcilesTBody'>
              <tr>
                <td class='text-center'>~~~</td>
                <td class='text-center'>~~~</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class='col-md-6 col-lg-4 mb-4'>
      <div class='card anim-card shadow-sm h-100 overflow-hidden'>
        <div class='card-body'>
          <table class='table'>
            <thead>
              <tr>
                <th scope='col'>Zdroj relace</th>
                <th scope='col' class='text-end'>Návštěvy</th>
              </tr>
            </thead>
            <tbody id='analyticsReferrerTBody'>
              <tr>
                <td class='text-center'>~~~</td>
                <td class='text-center'>~~~</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class='col-md-6 col-lg-4 mb-4'>
      <div class='card anim-card shadow-sm h-100 overflow-hidden'>
        <div class='card-body'>
          <table class='table'>
            <thead>
              <tr>
                <th scope='col'>Zdroj zařízení</th>
                <th scope='col' class='text-end'>Použití</th>
              </tr>
            </thead>
            <tbody id='analyticsDevicesTBody'>
              <tr>
                <td class='text-center'>~~~</td>
                <td class='text-center'>~~~</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>

</div>
    """

    self.innerHTML = template
  end

end