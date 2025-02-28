export default class CContents
  def initialize(parent)
    @parent = parent
  end

  def update_container()
    @parent.c_database.get_artcile() do |article|
      unless article
        @parent.innerHTML = get_no_article()
      else
        template = """
        <header class='mx-3'>
          <div class='card border-0 mx-auto' style='max-width: 720px; max-height: 405px;'>
            <elm-img-loader rounded file-id='#{article.file_id}'></elm-img-loader>
          </div>
          <div class='text-center mt-3'>
            <h1 class='fw-bold'>#{article.title}</h1>
            <p class='h4'>Publikováno: #{article.created_at}</p>
          </div>
        </header>


<article class='container article mt-5'>
  #{article.full_text.md_to_html()}
</article>
        """

        @parent.innerHTML = template
      end
    end
  end

  def get_no_article()
    return """
<div class='container'>
  <div class='text-center'>
    <i class='bi bi-slash-circle display-1 text-danger'></i>
    <h1 class='mt-3'>Chybějící článek</h1>
    <p class='lead'>Omlouváme se, článek neexistuje nebo byl smazán.</p>
  </div>
</div>
    """
  end
end