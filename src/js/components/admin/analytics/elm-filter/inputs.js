export default class CInputs {
  constructor(parent) {
    this._parent = parent;
    window.adminAnalyticsFilterBtnClick = this.btnClick.bind(this)
  };

  btnClick(index) {
    let elmMenu = this._parent.querySelector(".dropdown-menu");

    for (let child of elmMenu.children) {
      if (child.children[0].classList.contains("active")) {
        child.children[0].classList.remove("active")
      }
    };

    let elmLi = elmMenu.children[index];
    elmLi.children[0].classList.add("active");
    return this._parent.emitState(index)
  }
}