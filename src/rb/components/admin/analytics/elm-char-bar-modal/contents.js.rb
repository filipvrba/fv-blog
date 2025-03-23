export default class CContents
  attr_reader :bs_modal_char_bar

  def initialize(parent)
    @parent = parent

    modal_char_bar     = @parent.query_selector('#adminAnalyticsCharBarModal')
    @bs_modal_char_bar = bootstrap.Modal.new(modal_char_bar)
    @modal_body        = @parent.query_selector('#adminAnalyticsCharBarModalBody')
    @modal_label       = @parent.query_selector('#adminAnalyticsCharBarModalLabel')
  end

  def update_label(hour)
    @modal_label.inner_text = "Články od #{hour}"
  end

  def update_body(hour)
    template = """
    <elm-admin-analytics-articles hour='#{hour}'></elm-admin-analytics-articles>
    """

    @modal_body.innerHTML = template
  end
end