export default class CContents {
  constructor(parent) {
    this._parent = parent;
    this._modalBody = this._parent.querySelector("#adminImagesModalBody");
    this._modalBodyTwo = this._parent.querySelector("#adminImagesModalBodyTwo");
    this._modalFooter = this._parent.querySelector("#adminImagesModalFooter");
    this._modalLabel = this._parent.querySelector("#adminImagesModalLabel")
  };

  switchContent(fileId) {
    let isTwo = Number.isFinite(fileId);

    if (isTwo) {
      this._modalLabel.innerText = "Obrázek";
      this._modalBodyTwo.innerHTML = `<elm-img-loader file-id='${fileId}'></elm-img-loader>`
    } else {
      this._modalLabel.innerText = "Nahrání obrázku";
      this._modalBodyTwo.innerHTML = "";
      this._parent.cInputs.inputsClean()
    };

    Bootstrap.changeVisibleElement(this._modalFooter, !isTwo);
    Bootstrap.changeVisibleElement(this._modalBody, !isTwo);
    return Bootstrap.changeVisibleElement(this._modalBodyTwo, isTwo)
  }
}