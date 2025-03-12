export default class ElmCmpBanner < HTMLElement
  def initialize
    super

    @h_accept_cookies_click = lambda { accept_all_cookies() }

    @timeout_id = nil

    init_elm()
  end

  def connected_callback()
    @accept_cookies.add_event_listener('click', @h_accept_cookies_click)

    show_banner()
  end

  def disconnected_callback()
    @accept_cookies.remove_event_listener('click', @h_accept_cookies_click)

    clear_timeout(@timeout_id) if @timeout_id
  end

  def language_change()
    @words = Language.relevant.cmp_banner
  end

  def show_banner()
    unless CMP.get_consent()
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
    CMP.set_all_consent()
    hide_banner()
  end

  def init_elm()
    language_change()

    template = """
<div id='cmp-banner' class='d-none'>
  <div class='container'>
    <h5>Základní ponaučení</h5>
    <p>Tento web používá základní analýzu dat. <strong>Používáním stránek souhlasíte s tím, že jste se seznámili s mými podmínkami.</strong> Rád bych zdůraznil, že veškeré <strong>informace na tomto blogu nesmějí být šířeny bez mého výslovného souhlasu!</strong> Prosím, respektujte autorská práva a související <a href='?aid=3#article'>podmínky</a>.</p>
    <div class='cmp-options'>
      <button class='btn btn-success btn-sm' id='accept-cookies'>Ano, rozumím</button>
    </div>
  </div>
</div>
    """

    self.innerHTML = template

    @cmp_banner     = self.query_selector('#cmp-banner')
    @accept_cookies = self.query_selector('#accept-cookies')
  end
end