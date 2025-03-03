export default class CContents
  def initialize(parent)
    @parent = parent

    @container = @parent.query_selector('#articlesContainer')
  end

  def update_container()
    @parent.c_database.get_all_articles() do |articles|
      elements = []

      if articles
        articles.each do |article|
          template = """
<div class='col-md-6 col-lg-4 mb-4'>
  <div class='card shadow-sm h-100'>
    <div class='card-img-top'>
      <div class='card border-0'>
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
                #{article.updated_at}
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
end