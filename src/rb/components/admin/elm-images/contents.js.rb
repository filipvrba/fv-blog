export default class CContents
  attr_reader :t_body, :elm_image_paginations

  def initialize(parent)
    @parent = parent

    @t_body                = @parent.query_selector('#adminImagesTBody')
    @header_size           = @parent.query_selector('#adminImagesDropdownHeaderSize')
    @elm_image_paginations = @parent.query_selector('#adminImagesTablePagination')

    window.admin_images_th_click = th_click
  end

  def th_click(image_id)
    Modals.admin_images(image_id)
  end

  def template_image(image)
    return """
    <tr class='anim-table'>
      <th class='hide-on-mobile' scope='row'>#{image.id}</th>
      <td class='pointer' onclick='adminImagesThClick(#{image.id})'>#{image.name.decode_base64()}</td>
      <td class='hide-on-mobile'>#{image.description.decode_base64() || '---'}</td>
      <td>
        <div class='form-check form-check-reverse mx-5'>
          <input id='adminImagesCheck-#{image.id}' class='form-check-input' type='checkbox'>
        </div>
      </td>
    </tr>
    """
  end

  def update_table(images)
    elements = []

    if images
      images.each do |image|
        template = template_image(image)
        elements.push(template)
      end
    else
      empty_temaplate = """
      <tr>
        <td class='text-center hide-on-mobile'>---</td>
        <td class='text-center'>---</td>
        <td class='text-center hide-on-mobile'>---</td>
        <td class='text-center'>---</td>
      </tr>
      """
      elements.push(empty_temaplate)
    end
    
    @header_size.inner_text = convert_to_size(images) + " MB"
    @t_body.innerHTML       = elements.join('')
  end

  def convert_to_size(images)
    total_parts = images.reduce(lambda do |acc, val|
      acc + val['total_parts'].to_i
    end, 0)

    size_kb = total_parts * 10
    size_mb = size_kb / 1024
    rounded = size_mb.to_fixed(3)

    return parse_float(rounded)
  end
end