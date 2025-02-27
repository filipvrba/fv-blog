export default class CContents
  attr_reader :t_body

  def initialize(parent)
    @parent = parent

    @t_body = @parent.query_selector('#adminImagesTBody')

    window.admin_images_th_click = th_click
  end

  def th_click(image_id)
    Modals.admin_images(image_id)
  end

  def template_image(image)
    return """
    <tr>
      <th scope='row'>#{image.id}</th>
      <td class='pointer' onclick='adminImagesThClick(#{image.id})'>#{image.name.decode_base64()}</td>
      <td>#{image.description.decode_base64() || '---'}</td>
      <td>
        <div class='form-check form-check-reverse mx-5'>
          <input id='adminImagesCheck-#{image.id}' class='form-check-input' type='checkbox'>
        </div>
      </td>
    </tr>
    """
  end

  def update_table()
    @parent.set_spinner_visibility(true)

    @parent.c_database.get_images() do |images|
      @parent.set_spinner_visibility(false)

      elements = []

      if images
        images.each do |image|
          template = template_image(image)
          elements.push(template)
        end
      else
        empty_temaplate = """
        <tr>
          <td class='text-center'>---</td>
          <td class='text-center'>---</td>
          <td class='text-center'>---</td>
          <td class='text-center'>---</td>
        </tr>
        """
        elements.push(empty_temaplate)
      end

      @t_body.innerHTML = elements.join('')
    end
  end
end