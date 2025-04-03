import 'CInputs', '../../../components/admin/analytics/elm-filter/inputs'
import 'CBadge', '../../../components/admin/analytics/elm-filter/badge'

export default class ElmAdminAnalyticsFilter < HTMLElement
  ENVS = {
    active: 'eaasf-active-0'
  }

  def initialize
    super

    init_elm()

    @c_inputs = CInputs.new(self)
    @c_badge  = CBadge.new(self)
  end

  def emit_state(filter_index)
    date = DateUtils.subtract_timeUTC(filter_index)
    @c_badge.update_active(date)

    Events.emit('#app', ENVS.active, date)
  end

  def init_elm()
    template = """
<div class='dropdown'>
  <button class='btn dropdown-toggle' type='button' data-bs-toggle='dropdown' aria-expanded='false'>
    Filtr
    <span id='eaasFilterBadge' class='position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle'>
      <span class='visually-hidden'>New alerts</span>
    </span>
  </button>
  <ul class='dropdown-menu'>
    <li><button class='dropdown-item active' onclick='adminAnalyticsFilterBtnClick(0)'>Žádný</button></li>
    <li><button class='dropdown-item' onclick='adminAnalyticsFilterBtnClick(1)'>Dnes</button></li>
    <li><button class='dropdown-item' onclick='adminAnalyticsFilterBtnClick(2)'>Týden</button></li>
    <li><button class='dropdown-item' onclick='adminAnalyticsFilterBtnClick(3)'>Měsíc</button></li>
  </ul>
</div>
    """

    self.innerHTML = template
  end
end