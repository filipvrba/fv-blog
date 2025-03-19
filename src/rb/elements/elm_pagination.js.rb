export default class ElmPagination < HTMLElement
  ENVS = {
    init:  'eptn-init-0',
    click: 'eptn-click-1'
  }

  def initialize
    super

    @h_previous_click = lambda { btn_previous_click() }
    @h_next_click     = lambda { btn_next_click() }

    @h_init_elm = lambda do |e|
      @container_length = e.detail.value

      if @url_name_index
        @container_index = Math.min(URLParams.get_index(@url_name_index), @container_length - 1)
      else
        @container_index = 0
      end

      init_elm()

      @btn_previous = self.query_selector('#paginationBtnPrevious')
      @btn_next     = self.query_selector('#paginationBtnNext')

      Events.connect(@btn_previous, 'click', @h_previous_click)
      Events.connect(@btn_next, 'click', @h_next_click)

      update_dial()
    end

    @url_name_index   = self.get_attribute('name-index') || nil
    @is_center        = self.get_attribute('centered') == '' || false
    @container_length = nil
    @container_index  = nil
  end

  def connected_callback()
    Events.connect(self, ENVS.init, @h_init_elm)
  end

  def disconnected_callback()
    Events.disconnect(self, ENVS.init, @h_init_elm)

    Events.connect(@btn_previous, 'click', @h_previous_click) if @btn_previous
    Events.connect(@btn_next, 'click', @h_next_click) if @btn_next
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
    Events.emit(self, ENVS.click, @container_index)
    URLParams.set(@url_name_index, @container_index) if @url_name_index
  end

  def init_elm()
    template = """
<nav class='d-flex align-items-center #{'justify-content-center' if @is_center} #{'d-none' if @container_length <= 1} mt-2'>
  <button id='paginationBtnPrevious' class='btn btn-outline-secondary rounded-pill'>Novější</button>
  <span id='paginationDial' class='mx-3'></span>
  <button id='paginationBtnNext' class='btn btn-outline-secondary rounded-pill'>Starší</button>
</nav>
    """
    
    self.innerHTML = template
  end

  def update_dial()
    self.query_selector('#paginationDial').inner_text =
      "#{@container_index + 1} / #{@container_length}"

    emit_click()
  end
end