export default class CInputs {
  constructor(parent) {
    this._parent = parent;

    this._hSubscribeFormEmailKeypress = () => {
      return this.subscribeFormEmailKeypress()
    };

    this._subscribeFormEmail = this._parent.querySelector("#subscribeFormEmail");
    this._subscribeFormBtn = this._parent.querySelector("#subscribeFormBtn");
    window.subscribeFormBtnClick = this.subscribeFormBtnClick.bind(this)
  };

  connectedCallback() {
    return this._subscribeFormEmail.addEventListener(
      "keypress",
      this._hSubscribeFormEmailKeypress
    )
  };

  disconnectedCallback() {
    return this._subscribeFormEmail.removeEventListener(
      "keypress",
      this._hSubscribeFormEmailKeypress
    )
  };

  subscribeFormBtnClick() {
    let isSubscribeFormEmail = this.haveSubscribeFormEmail();

    Bootstrap.changeValidElement(
      this._subscribeFormEmail,
      isSubscribeFormEmail
    );

    if (!isSubscribeFormEmail) return;
    return this._parent.btnClick(this._subscribeFormEmail.value)
  };

  subscribeFormEmailKeypress() {
    if (event.key !== "Enter") return;
    return this._subscribeFormBtn.click()
  };

  haveSubscribeFormEmail() {
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/m;
    return this._subscribeFormEmail.value.length > 0 && emailRegex.test(this._subscribeFormEmail.value)
  }
}