export default class CInputs
  def initialize()
    window.article_header_logo_btn_click = logo_btn_click
  end

  def logo_btn_click()
    URLParams.remove('aid')
    URLParams.remove('preview')
    URLParams.remove('sc-index')
  end
end