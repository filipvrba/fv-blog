export default class CContents
  attr_reader :elm_article_paginations

  def initialize(parent)
    @parent = parent

    @artciles_tbody          = @parent.query_selector('#analyticsArtcilesTBody')
    @elm_article_paginations = @parent.query_selector('#adminAnalyticsArticlesPagination')
  end

  def empty_tr()
    """
    <tr>
      <td class='text-center'>---</td>
      <td class='text-center'>---</td>
    </tr>
    """
  end

  def udpate_tbody_articles(articles)
    elements = []

    if articles
      articles.each do |article|
        conversion_rate_title = article.conversion_rate ?
          "title='Konverzní poměr: #{article.conversion_rate}'" :
          ''
        counts = article.count ? "#{article.count} / #{article.click_count}" : article.click_count

        template = """
        <tr>
          <td class='text-truncate' style='max-width: 200px;' title='#{article.id} | #{article.title}'>#{article.title}</td>
          <td class='text-end px-4' #{conversion_rate_title}>#{counts}</td>
        </tr>
        """
        elements.push(template)
      end
    else
      elements.push(empty_tr())
    end

    @artciles_tbody.innerHTML = elements.join('')
  end
end