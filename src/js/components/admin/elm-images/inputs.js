export default class CInputs {
  constructor(parent) {
    this._parent = parent;
    this._hUploadFileInputChange = e => this.uploadFileInputChange(e);
    this._uploadFileInput = this._parent.querySelector("#adminImagesUploadFileInput");
    window.adminImagesDropdownBtnUploadClick = this.dropdownBtnUploadClick.bind(this);
    window.adminImagesDropdownBtnRemoveClick = this.dropdownBtnRemoveClick.bind(this)
  };

  connectedCallback() {
    return this._uploadFileInput.addEventListener(
      "change",
      this._hUploadFileInputChange
    )
  };

  disconnectedCallback() {
    return this._uploadFileInput.removeEventListener(
      "change",
      this._hUploadFileInputChange
    )
  };

  uploadFileInputChange(event) {
    let file = event.target.files[0];

    return this._parent.imageCompressor.compressImage(
      file,

      (base64Image, mime) => {
        let base64Segments = base64Image.base64Split();

        let options = {
          name: file.name.replace(/\..*$/m, ""),
          description: null,
          fileType: mime,
          segments: base64Segments
        };

        return this._parent.cDatabase.saveFile(
          options,
          message => console.log(message)
        )
      }
    )
  };

  dropdownBtnUploadClick() {
    return this._uploadFileInput.click()
  };

  dropdownBtnRemoveClick() {
    return null
  }
}