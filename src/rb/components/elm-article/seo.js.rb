export default class CSeo
  URL = 'https://filipvrba-blog.vercel.app'

  def initialize(parent)
    @parent = parent

    @og_title            = document.query_selector('meta[property="og:title"]')
    @twitter_title       = document.query_selector('meta[name="twitter:title"]')
    @og_description      = document.query_selector('meta[property="og:description"]')
    @twitter_description = document.query_selector('meta[name="twitter:description"]')
    @og_image            = document.query_selector('meta[property="og:image"]')
    @twitter_image       = document.query_selector('meta[name="twitter:image"]')
    @og_url              = document.query_selector('meta[property="og:url"]')
    @twitter_url         = document.query_selector('meta[name="twitter:url"]')
  end

  def set_title(title)
    document.title = title

    @og_title.set_attribute('content', title)
    @twitter_title.set_attribute('content', title)
  end

  def set_image(image_id)
    img_url = "#{URL}/api/image/#{image_id}"

    @og_image.set_attribute('content', img_url)
    @twitter_image.set_attribute('content', img_url)
  end

  def set_url()
    url = "#{URL}aid=#{@parent.article_id}#article"

    @og_url.set_attribute('content', url)
    @twitter_url.set_attribute('content', url)
  end

  def set_description(description)
    @og_description.set_attribute('content', description)
    @twitter_description.set_attribute('content', description)
  end
end