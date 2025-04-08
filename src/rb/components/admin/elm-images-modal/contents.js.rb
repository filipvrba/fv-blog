export default class CContents
  def initialize(parent)
    @parent = parent

    @modal_body     = @parent.query_selector('#adminImagesModalBody')
    @modal_body_two = @parent.query_selector('#adminImagesModalBodyTwo')
    @modal_footer   = @parent.query_selector('#adminImagesModalFooter')
    @modal_label    = @parent.query_selector('#adminImagesModalLabel')
  end

  def switch_content(file_id)
    is_two = Number.isFinite(file_id)

    if is_two
      @modal_label.inner_text = "Obrázek"
      @modal_body_two.innerHTML = "<elm-img-loader class='d-flex justify-content-center' file-id='#{file_id}'></elm-img-loader>"
    else
      @modal_label.inner_text = "Nahrání obrázku"
      @modal_body_two.innerHTML = ''
      @parent.c_inputs.inputs_clean()
    end

    Bootstrap.change_visible_element(@modal_footer, !is_two)
    Bootstrap.change_visible_element(@modal_body, !is_two)
    Bootstrap.change_visible_element(@modal_body_two, is_two)
  end
end