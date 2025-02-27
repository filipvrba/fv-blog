export default class CInputs {
  constructor(parent) {
    this._parent = parent;

    this._hShow = () => {
      return this.show()
    };

    this._hAdminImagesModalFileNameKeypress = () => {
      return this.adminImagesModalFileNameKeypress()
    };

    this._hAdminImagesModalFileDescriptionKeypress = () => {
      return this.adminImagesModalFileDescriptionKeypress()
    };

    this._adminImagesModalFileName = this._parent.querySelector("#adminImagesModalFileName");
    this._adminImagesModalFileDescription = this._parent.querySelector("#adminImagesModalFileDescription");
    this._adminImagesModalBtnSave = this._parent.querySelector("#adminImagesModalBtnSave");
    window.adminImagesModalBtnSaveClick = this.adminImagesModalBtnSaveClick.bind(this)
  };

  connectedCallback() {
    this._adminImagesModalFileName.addEventListener(
      "keypress",
      this._hAdminImagesModalFileNameKeypress
    );

    this._adminImagesModalFileDescription.addEventListener(
      "keypress",
      this._hAdminImagesModalFileDescriptionKeypress
    );

    return Events.connect("#app", CInputs.ENVS.show, this._hShow)
  };

  disconnectedCallback() {
    this._adminImagesModalFileName.removeEventListener(
      "keypress",
      this._hAdminImagesModalFileNameKeypress
    );

    this._adminImagesModalFileDescription.removeEventListener(
      "keypress",
      this._hAdminImagesModalFileDescriptionKeypress
    );

    return Events.disconnect("#app", CInputs.ENVS.show, this._hShow)
  };

  show() {
    if (this._parent.bsModalImages._isShown) return;
    this.inputsClean();
    return this._parent.bsModalImages.show()
  };

  adminImagesModalBtnSaveClick() {
    let isAdminImagesModalFileName = this.haveAdminImagesModalFileName();
    let isAdminImagesModalFileDescription = this.haveAdminImagesModalFileDescription();

    Bootstrap.changeValidElement(
      this._adminImagesModalFileName,
      isAdminImagesModalFileName
    );

    Bootstrap.changeValidElement(
      this._adminImagesModalFileDescription,
      isAdminImagesModalFileDescription
    );

    if (!isAdminImagesModalFileName || !isAdminImagesModalFileDescription) return;
    this._parent.bsModalImages.hide();

    return Events.emit("#app", CInputs.ENVS.save, {
      name: this._adminImagesModalFileName.value,
      description: this._adminImagesModalFileDescription.value
    })
  };

  adminImagesModalFileNameKeypress() {
    if (event.key !== "Enter") return;
    return this._adminImagesModalFileDescription.focus()
  };

  adminImagesModalFileDescriptionKeypress() {
    if (event.key !== "Enter") return;
    return this._adminImagesModalBtnSave.click()
  };

  haveAdminImagesModalFileName() {
    return this._adminImagesModalFileName.value.length >= 0
  };

  haveAdminImagesModalFileDescription() {
    return this._adminImagesModalFileDescription.value.length > 0
  };

  inputsClean() {
    this._adminImagesModalFileName.value = "";
    this._adminImagesModalFileDescription.value = "";
    Bootstrap.changeValidElement(this._adminImagesModalFileName, true);

    return Bootstrap.changeValidElement(
      this._adminImagesModalFileDescription,
      true
    )
  }
};

CInputs.ENVS = {show: "eism-show-0", save: "eism-save-1"}