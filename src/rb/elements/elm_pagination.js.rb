export default class ElmPagination < HTMLElement
  ENVS = {
    init:  'eptn-init-0',
    click: 'eptn-click-1'
  }

  def initialize
    super

    @h_init_elm = lambda do |e|
      @container_length = e.detail.value
      @container_index  = Math.min(URLParams.get_index('asid'), @container_length - 1)

      init_elm()
      update_dial()
    end

    @is_center        = self.get_attribute('centered') == '' || false
    @container_length = nil
    @container_index  = nil

    window.pagination_btn_next_click     = btn_next_click
    window.pagination_btn_previous_click = btn_previous_click
  end

  def connected_callback()
    Events.connect('#app', ENVS.init, @h_init_elm)
  end

  def disconnected_callback()
    Events.disconnect('#app', ENVS.init, @h_init_elm)
  end

  def btn_next_click()
    if (@container_index + 1) >= @container_length
      return
    end

    @container_index += 1

    update_dial()
  end

  def btn_previous_click()
    if (@container_index - 1) <= -1
      return
    end

    @container_index -= 1

    update_dial()
  end

  def emit_click()
    Events.emit('#app', ENVS.click, @container_index)
    URLParams.set('asid', @container_index)
  end

  def init_elm()
    template = """
<nav class='d-flex align-items-center #{'justify-content-center' if @is_center} #{'d-none' if @container_length <= 1} mt-2'>
  <button class='btn btn-outline-secondary rounded-pill' onclick='paginationBtnPreviousClick()'>Novější</button>
  <span id='paginationDial' class='mx-3'></span>
  <button class='btn btn-outline-secondary rounded-pill' onclick='paginationBtnNextClick()'>Starší</button>
</nav>
    """
    
    self.innerHTML = template
  end

  def update_dial()
    self.query_selector('#paginationDial').inner_text =
      "#{@container_index + 1} / #{@container_length}"

    emit_click()
    window.articles_footer_go_up()
  end
end