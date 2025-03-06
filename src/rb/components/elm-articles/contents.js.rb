export default class CContents
  def initialize(parent)
    @parent = parent

    @container = @parent.query_selector('#articlesContainer')
  end

  def self.main_template()
    return """
    <div id='articlesContainer' class='container row mx-auto'>
      <div class='d-flex justify-content-center align-items-center position-fixed top-50 start-50 translate-middle' style='z-index: 999;'>
        <div class='spinner-border' style='width: 5rem; height: 5rem;' role='status'>
          <span class='visually-hidden'>Loading...</span>
        </div>
      </div>
    </div>
    """
  end

  def update_container(articles)
    elements = []

    if articles
      articles.each do |article|
        template = """
<div class='col-md-6 col-lg-4 mb-4'>
  <div class='card anim-card shadow-sm h-100'>
    <div class='card-img-top'>
      <div class='card anim-card border-0'>
        <elm-img-loader file-id='#{article.file_id}'></elm-img-loader>
      </div>
    </div>
    <div class='card-body d-flex flex-column'>
      <h5 class='card-title'>
        <i class='bi bi-journal-text'></i>
        #{article.title}
      </h5>
      <p class='card-text'>#{article.short_text}</p>

      <div class='mt-auto'>
        <div class='row g-0 align-items-center'>
          <div class='col-6'>
            <p class='card-text'>
              <small class='text-muted'>
                <i class='bi bi-tag-fill'></i>
                #{article.category}
              </small>
              <br>
              <small class='text-muted'>
                <i class='bi bi-calendar-fill'></i>
                #{article.changed_at}
              </small>
            </p>
          </div>

          <div class='col-6 text-center'>
            <a href='?aid=#{article.id}#article' class='btn btn-secondary card-text'>
              <i class='bi bi-eye'></i>
              Podívat se
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
        """
        elements.push(template)
      end
    end

    @container.innerHTML = elements.join('')
  end
end