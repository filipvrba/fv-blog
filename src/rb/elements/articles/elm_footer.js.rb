export default class ElmArticlesFooter < HTMLElement
  def initialize
    super
    
    init_elm()

    window.articles_footer_go_up = go_up
    window.articles_footer_go_article = go_article
  end

  def connected_callback()
  end

  def disconnected_callback()
  end

  def go_up()
    window.scroll_to({ top: 0, behavior: "smooth" })
  end

  def go_article(article_id = 28)
    URLParams.set('aid', article_id)  # 28 is index for arctile page
    location.hash = '#article'
    Events.emit('#app', 'reloadRoute')
  end

  def init_elm()
    template = """
<footer class='text-body-secondary mt-auto' data-bs-theme='dark'>
  <div class='text-bg-dark py-4'>
    <div class='container d-flex justify-content-between align-items-center'>
      <p class='mb-0'>&copy; 2025 Filip Vrba - Blog | Všechna práva vyhrazena</p>
      <button class='btn btn-outline-light rounded-pill px-3' onclick='articlesFooterGoUp()'>
        <i class='bi bi-caret-up-fill'></i> Nahoru
      </button>
    </div>
  </div>
</footer>
    """

    self.innerHTML = template
  end
end