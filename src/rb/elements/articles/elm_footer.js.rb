export default class ElmArticlesFooter < HTMLElement
  def initialize
    super
    
    init_elm()

    window.articles_footer_go_up = go_up
  end

  def connected_callback()
  end

  def disconnected_callback()
  end

  def go_up()
    window.scroll_to({ top: 0, behavior: "smooth" })
  end

  def init_elm()
    template = """
<footer class='text-body-secondary mt-auto' data-bs-theme='dark'>
  <div class='text-bg-dark py-4'>
    <div class='container d-flex justify-content-between align-items-center'>
      <p class='mb-0'>&copy; 2025 Filip Vrba - Blog | Všechna práva vyhrazena</p>
      <button class='btn btn-outline-light rounded-pill px-3' onclick='articlesFooterGoUp()'>
        <i class='bi bi-arrow-up-circle'></i> Posunout nahoru
      </button>
    </div>
  </div>
</footer>
    """

    self.innerHTML = template
  end
end