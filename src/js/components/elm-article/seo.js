export default class CSeo {
  constructor(parent) {
    this._parent = parent
  };

  setTitle(articleTitle) {
    let title = `${articleTitle} | ${Language.relevant.elmRoutes.meta[0]}`;
    return document.title = title
  }
}