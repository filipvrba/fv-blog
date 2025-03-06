export default class MDRules
  def self.img_loader(state, silent)
    pos = state.pos
    src = state.src

    match = src.slice(pos).match(/^img\[(\d+)\]/)

    return false unless match
    return false if silent

    token = state.push('img_loader', '', 0)
    token.attrs = { file_id: match[1] }

    state.pos += match[0].length
    return true
  end

  def self.yt_loader(state, silent)
    pos = state.pos
    src = state.src

    match = src.slice(pos).match(/^yt\[(https:\/\/www\.youtube\.com\/embed\/[a-zA-Z0-9_-]+[^\]]*)\]/)

    return false unless match
    return false if silent

    token = state.push('yt_loader', '', 0)
    token.attrs = { uri: match[1] }

    state.pos += match[0].length
    return true
  end

  def self.register(md)
    md.inline.ruler.before('text', 'img_loader', MDRules.img_loader)
    md.renderer.rules['img_loader'] = lambda do |tokens, idx|
      token = tokens[idx]
      file_id = token.attrs.file_id
      """<div class='card anim-card border-0 bg-transparent'>
        <elm-img-loader rounded file-id='#{file_id}'></elm-img-loader>
      </div>"""
    end

    md.inline.ruler.before('text', 'yt_loader', MDRules.yt_loader)
    md.renderer.rules['yt_loader'] = lambda do |tokens, idx|
      token = tokens[idx]
      uri   = token.attrs.uri
      """
      <div class='d-flex justify-content-center mb-3'>
        <iframe width='560' height='315' src='#{uri}' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' referrerpolicy='strict-origin-when-cross-origin' allowfullscreen></iframe>
      </div>"""
    end
  end
end
window.MDRules = MDRules
