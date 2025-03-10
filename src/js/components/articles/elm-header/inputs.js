export default class CInputs {
  constructor() {
    window.articleHeaderLogoBtnClick = this.logoBtnClick.bind(this)
  };

  logoBtnClick() {
    URLParams.remove("aid");
    URLParams.remove("preview");
    return URLParams.remove("sc-index")
  }
}