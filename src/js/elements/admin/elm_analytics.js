import CDatabase from "../../components/admin/elm-analytics/database";
import CContents from "../../components/admin/elm-analytics/contents";

export default class ElmAdminAnalytics extends HTMLElement {
  constructor() {
    super();
    this.initElm();
    this._cDatabase = new CDatabase(this);
    this._cContents = new CContents(this)
  };

  connectedCallback() {
    this._cDatabase.getCountArticles(articles => (
      this._cContents.udpateTbodyArticles(articles)
    ));

    this._cDatabase.getCountReferrer(refferer => (
      this._cContents.udpateTbodyReferrer(refferer)
    ));

    return this._cDatabase.getCountDevices(devices => (
      this._cContents.udpateTbodyDevices(devices)
    ))
  };

  disconnectedCallback() {
    return null
  };

  initElm() {
    let template = `${`
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
    `}`;
    return this.innerHTML = template
  }
}