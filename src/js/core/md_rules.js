export default class MDRules {
  static imgLoader(state, silent) {
    let pos = state.pos;
    let src = state.src;
    let match = src.slice(pos).match(/^img\[(\d+)\]/m);
    if (!match) return false;
    if (silent) return false;
    let token = state.push("img_loader", "", 0);
    token.attrs = {fileId: match[1]};
    state.pos += match[0].length;
    return true
  };

  static register(md) {
    md.inline.ruler.before("text", "img_loader", MDRules.imgLoader);

    return md.renderer.rules.img_loader = (tokens, idx, options, env, selfObj) => {
      let token = tokens[idx];
      let fileId = token.attrs.fileId;
      return `${`<div class='card border-0 bg-transparent'>\n        <elm-img-loader rounded file-id='${fileId}'></elm-img-loader>\n      </div>`}`
    }
  }
};

window.MDRules = MDRules