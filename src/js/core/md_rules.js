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

  static ytLoader(state, silent) {
    let pos = state.pos;
    let src = state.src;
    let match = src.slice(pos).match(/^yt\[(https:\/\/www\.youtube\.com\/embed\/[a-zA-Z0-9_-]+[^\]]*)\]/m);
    if (!match) return false;
    if (silent) return false;
    let token = state.push("yt_loader", "", 0);
    token.attrs = {uri: match[1]};
    state.pos += match[0].length;
    return true
  };

  static register(md) {
    md.inline.ruler.before("text", "img_loader", MDRules.imgLoader);

    md.renderer.rules.img_loader = (tokens, idx) => {
      let token = tokens[idx];
      let fileId = token.attrs.fileId;
      return `${`<div class='card anim-card border-0 bg-transparent'>\n        <elm-img-loader rounded file-id='${fileId}'></elm-img-loader>\n      </div>`}`
    };

    md.inline.ruler.before("text", "yt_loader", MDRules.ytLoader);

    return md.renderer.rules.yt_loader = (tokens, idx) => {
      let token = tokens[idx];
      let uri = token.attrs.uri;
      return `${`\n      <div class='d-flex justify-content-center mb-3'>\n        <iframe class='rounded-3' width='560' height='315' src='${uri}' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' referrerpolicy='strict-origin-when-cross-origin' allowfullscreen></iframe>\n      </div>`}`
    }
  }
};

window.MDRules = MDRules