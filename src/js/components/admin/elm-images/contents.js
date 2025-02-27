export default class CContents {
  get tBody() {
    return this._tBody
  };

  constructor(parent) {
    this._parent = parent;
    this._tBody = this._parent.querySelector("#adminImagesTBody");
    window.adminImagesThClick = this.thClick.bind(this)
  };

  thClick(imageId) {
    return Modals.adminImages(imageId)
  };

  templateImage(image) {
    return `${`
    <tr>
      <th scope='row'>${image.id}</th>
      <td class='pointer' onclick='adminImagesThClick(${image.id})'>${image.name.decodeBase64()}</td>
      <td>${image.description.decodeBase64() || "---"}</td>
      <td>
        <div class='form-check form-check-reverse mx-5'>
          <input id='adminImagesCheck-${image.id}' class='form-check-input' type='checkbox'>
        </div>
      </td>
    </tr>
    `}`
  };

  updateTable() {
    this._parent.setSpinnerVisibility(true);

    return this._parent.cDatabase.getImages((images) => {
      this._parent.setSpinnerVisibility(false);
      let elements = [];

      if (images) {
        for (let image of images) {
          let template = this.templateImage(image);
          elements.push(template)
        }
      } else {
        let emptyTemaplate = `${`
        <tr>
          <td class='text-center'>---</td>
          <td class='text-center'>---</td>
          <td class='text-center'>---</td>
          <td class='text-center'>---</td>
        </tr>
        `}`;
        elements.push(emptyTemaplate)
      };

      return this._tBody.innerHTML = elements.join("")
    })
  }
}