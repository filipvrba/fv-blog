import 'ElmPagination', '../../../elements/elm_pagination'

export default class CPagination
  NUMERUS_MAXIMUS = 5

  def initialize(parent)
    @parent = parent
    @h_pagination_referrer_click = lambda {|e| pagination_referrer_click(e.detail.value)}

    @elm_referrer_pagination = @parent.query_selector('#adminAnalyticsReferrerPagination')

    @referrer_containers = nil
  end

  def connected_callback()
    Events.connect(@elm_referrer_pagination, ElmPagination::ENVS.click, @h_pagination_referrer_click)
  end

  def disconnected_callback()
    Events.disconnect(@elm_referrer_pagination, ElmPagination::ENVS.click, @h_pagination_referrer_click)
  end

  def set_referrer_containers(referrer)
    @referrer_containers = referrer ? referrer.divide_into_groups(NUMERUS_MAXIMUS) : []
    Events.emit(@elm_referrer_pagination, ElmPagination::ENVS.init, @referrer_containers.length)
  end

  def pagination_referrer_click(id_container)
    @parent.c_contents.udpate_tbody_referrer(@referrer_containers[id_container])
  end
end