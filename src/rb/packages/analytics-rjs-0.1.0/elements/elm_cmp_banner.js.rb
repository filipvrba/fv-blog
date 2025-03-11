export default class ElmCmpBanner < HTMLElement
  def initialize
    super

    @h_accept_cookies_click = lambda { accept_all_cookies() }
    @h_reject_cookies_click = lambda { reject_all_cookies() }

    @timeout_id = nil

    init_elm()
  end

  def connected_callback()
    @accept_cookies.add_event_listener('click', @h_accept_cookies_click)
    @reject_cookies.add_event_listener('click', @h_reject_cookies_click)

    show_banner()
  end

  def disconnected_callback()
    @accept_cookies.remove_event_listener('click', @h_accept_cookies_click)
    @reject_cookies.remove_event_listener('click', @h_reject_cookies_click)

    clear_timeout(@timeout_id) if @timeout_id
  end

  def language_change()
    @words = Language.relevant.cmp_banner
  end

  def show_banner()
    unless local_storage.getItem('userConsent')
      @cmp_banner.class_list.remove('d-none')

      # Animation
      @timeout_id = set_timeout(lambda do
        @cmp_banner.class_list.add('show')
      end, 500)
    end
  end

  def hide_banner()
    @cmp_banner.classList.remove('show')

    # Animation
    @timeout_id = set_timeout(lambda do
      @cmp_banner.class_list.add('d-none')
    end, 500)
  end

  def accept_all_cookies()
    local_storage.set_item('userConsent', 'all')
    manage_cookies(true)
    hide_banner()
  end

  def reject_all_cookies()
    local_storage.set_item('userConsent', 'none')
    manage_cookies(false)
    hide_banner()
  end

  def manage_cookies(allow_cookies)
    if allow_cookies
      gtag('consent', 'update', {
        'ad_storage': 'granted',
        'analytics_storage': 'granted'
      })
    else
      puts "lol"
      gtag('consent', 'update', {
        'ad_storage': 'denied',
        'analytics_storage': 'denied'
      })
    end
  end

  def init_elm()
    language_change()

    template = """
<div id='cmp-banner' class='d-none'>
  <div class='container'>
    <h5>#{@words[0]}</h5>
    <p>#{@words[1]}</p>
    <div class='cmp-options'>
      <button class='btn btn-success btn-sm' id='accept-cookies'>#{@words[2]}</button>
      <button class='btn btn-danger btn-sm' id='reject-cookies'>#{@words[3]}</button>
    </div>
  </div>
</div>
    """

    self.innerHTML = template

    @cmp_banner     = self.query_selector('#cmp-banner')
    @accept_cookies = self.query_selector('#accept-cookies')
    @reject_cookies = self.query_selector('#reject-cookies')
  end
end