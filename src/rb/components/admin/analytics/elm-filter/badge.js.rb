export default class CBadge
  def initialize(parent)
    @parent = parent

    @elm_badge = @parent.query_selector('#eaasFilterBadge')
    update_active(nil)
  end

  def update_active(date)
    is_active = date ? true : false
    Bootstrap.change_visible_element(@elm_badge, is_active)
  end
end