export default class CInputs {
  get uploadFileDetails() {
    return this._uploadFileDetails
  };

  set uploadFileDetails(uploadFileDetails) {
    this._uploadFileDetails = uploadFileDetails
  };

  get uploadFileInput() {
    return this._uploadFileInput
  };

  constructor(parent) {
    this._parent = parent;
    this._hUploadFileInputChange = e => this.uploadFileInputChange(e);
    this._uploadFileInput = this._parent.querySelector("#adminImagesUploadFileInput");
    this._uploadFileDetails = {name: null, description: null};
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

    if (!file) {
      this._uploadFileDetails = {name: null, description: null};
      return
    };

    return this._parent.imageCompressor.compressImage(
      file,

      (base64Image, mime) => {
        let base64Segments = base64Image.base64Split();

        let options = {
          name: this.uploadFileDetails.name || file.name.replace(/\..*$/m, ""),
          description: this.uploadFileDetails.description || null,
          fileType: mime,
          segments: base64Segments
        };

        return this._parent.cDatabase.saveFile(
          options,
          message => this._parent.cProgress.saveFile(message)
        )
      }
    )
  };

  dropdownBtnUploadClick() {
    return Modals.adminImages()
  };

  dropdownBtnRemoveClick() {
    let elmImages = Array.from(this._parent.cContents.tBody.querySelectorAll("[id^=\"adminImagesCheck"));

    let infoImages = elmImages.map(image => ({
      imageId: image.id.split("-")[image.id.split("-").length - 1],
      checked: image.checked
    }));

    let checkedImages = infoImages.filter(h => h.checked);
    if (checkedImages.length <= 0) return;

    let fnTrue = () => {
      let idFiles = checkedImages.map(h => parseInt(h.imageId));
      this._parent.setSpinnerVisibility(true);

      return this._parent.cDatabase.removeFiles(idFiles, (message) => {
        this._parent.setSpinnerVisibility(false);
        if (message) return this._parent.cContents.updateTable()
      })
    };

    return Modals.confirm({fnTrue})
  }
}