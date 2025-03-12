export default class CContents
  def initialize(parent)
    @parent = parent
  end

  def set_document_title(article_title)
    title = "#{article_title} | #{Language.relevant.elm_routes.meta[0]}"
    document.title = title
  end

  def update_container()
    @parent.c_database.get_artcile() do |article|
      unless article
        no_article_title = "Chybějící článek"
        set_document_title(no_article_title)

        unless @parent.is_preview
          @parent.innerHTML = get_no_article(no_article_title)
        else
          @parent.innerHTML = get_no_article_preview()
        end
      else
        set_document_title(article.title)

        fn_true = lambda do
          template = """
          <header class='row mx-3 d-flex justify-content-center'>
            <div class='card anim-card border-0 bg-transparent' style='max-width: 720px; max-height: 405px;'>
              <elm-img-loader rounded file-id='#{article.file_id}' class='d-flex justify-content-center'></elm-img-loader>
            </div>
            <div class='text-center mt-3'>
              <h1 class='fw-bold'>#{article.title.gsub(/:/, ":<br>")}</h1>
              <p class='h4'>Aktualizováno: #{article.changed_at}</p>
            </div>
          </header>
          <article class='container text-break article mt-5'>
            #{article.full_text.md_to_html()}
          </article>
          """

          @parent.innerHTML = template
        end

        if article.is_adult
          confirm_options = {
            fn_true: fn_true, fn_false: -> {location.hash = '#'},
            message: """
            <div class='container'>
              <div class='text-center'>
                <!-- Ikona pro varování -->
                <i class='bi bi-exclamation-triangle-fill display-1 text-danger'></i>
                <h3 class='mt-3'>Tento článek obsahuje citlivý obsah</h3>
                <p class='lead'>Varování: Tento článek může obsahovat témata, která nejsou vhodná pro osoby mladší 18 let, včetně násilí, drog nebo znepokojivých myšlenek.</p>
                <p>Chcete dále pokračovat?</p>
              </div>
            </div>
            """
          }
          Modals.confirm(confirm_options)
        else
          fn_true.call()
        end
      end
    end
  end

  def get_no_article(no_article_title)
    return """
<div class='container d-flex justify-content-center align-items-center'>
  <div class='text-center'>
    <i class='bi bi-slash-circle display-1 text-danger'></i>
    <h1 class='mt-3'>#{no_article_title}</h1>
    <p class='lead'>Omlouváme se, článek neexistuje nebo byl smazán.</p>
  </div>
</div>
    """
  end

  def get_no_article_preview()
    return """
<div class='container d-flex justify-content-center align-items-center'>
  <div class='text-center'>
    <i class='bi bi-slash-circle display-1 text-warning'></i>
    <h1 class='mt-3'>Náhledový režim</h1>
    <p class='lead'>Pro zobrazení skrytého článku je potřeba se přihlásit.</p>
  </div>
</div>
    """
  end
end