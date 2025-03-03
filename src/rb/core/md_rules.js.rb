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

  def self.register(md)
    md.inline.ruler.before('text', 'img_loader', MDRules.img_loader)
    md.renderer.rules['img_loader'] = lambda do |tokens, idx, options, env, self_obj|
      token = tokens[idx]
      file_id = token.attrs.file_id
      """<div class='card border-0 bg-transparent'>
        <elm-img-loader rounded file-id='#{file_id}'></elm-img-loader>
      </div>"""
    end
  end
end
window.MDRules = MDRules
