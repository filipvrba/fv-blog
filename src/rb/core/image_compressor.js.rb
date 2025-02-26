export default class ImageCompressor
  def initialize(max_width, max_height, quality)
    @max_width  = max_width  || 1920
    @max_height = max_height || 1080 
    @quality    = quality    || 0.8
  end

  def compress_image(file, &callback)
    reader = FileReader.new
    reader.onload = lambda do |e|
      img = Image.new
      img.onload = lambda do
        width, height = _resize_image(img)
        _create_compressed_image(img, width, height, callback)
      end
      img.src = e.target.result
    end
    reader.read_as_dataURL(file)
  end

  def _resize_image(img)
    width  = img.width
    height = img.height

    if width > @max_width || height > @max_height
      ratio  = Math.min(@max_width / width, @max_height / height)
      width  = width * ratio
      height = height * ratio
    end

    return [ width, height ]
  end

  def _create_compressed_image(img, width, height, &callback)
    canvas = document.create_element('canvas')
    ctx    = canvas.get_context('2d')

    canvas.width  = width
    canvas.height = height
    ctx.draw_image(img, 0, 0, width, height)

    mime = 'image/jpeg'
    base64_image = canvas.to_dataURL(mime, @quality)
    callback(*[base64_image, mime]) if callback
  end
end
window.ImageCompressor = ImageCompressor