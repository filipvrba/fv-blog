export default class CContents {
  get tBody() {
    return this._tBody
  };

  get elmImagePaginations() {
    return this._elmImagePaginations
  };

  constructor(parent) {
    this._parent = parent;
    this._tBody = this._parent.querySelector("#adminImagesTBody");
    this._headerSize = this._parent.querySelector("#adminImagesDropdownHeaderSize");
    this._elmImagePaginations = this._parent.querySelector("#adminImagesTablePagination");
    window.adminImagesThClick = this.thClick.bind(this)
  };

  thClick(imageId) {
    return Modals.adminImages(imageId)
  };

  templateImage(image) {
    return `${`
    <tr class='anim-table'>
      <th class='hide-on-mobile' scope='row'>${image.id}</th>
      <td class='pointer' onclick='adminImagesThClick(${image.id})'>${image.name.decodeBase64()}</td>
      <td class='hide-on-mobile'>${image.description.decodeBase64() || "---"}</td>
      <td>
        <div class='form-check form-check-reverse mx-5'>
          <input id='adminImagesCheck-${image.id}' class='form-check-input' type='checkbox'>
        </div>
      </td>
    </tr>
    `}`
  };

  updateTable(images) {
    let elements = [];

    if (images) {
      for (let image of images) {
        let template = this.templateImage(image);
        elements.push(template)
      }
    } else {
      let emptyTemaplate = `${`
      <tr>
        <td class='text-center hide-on-mobile'>---</td>
        <td class='text-center'>---</td>
        <td class='text-center hide-on-mobile'>---</td>
        <td class='text-center'>---</td>
      </tr>
      `}`;
      elements.push(emptyTemaplate)
    };

    this._headerSize.innerText = this.convertToSize(images) + " MB";
    return this._tBody.innerHTML = elements.join("")
  };

  convertToSize(images) {
    let totalParts = images.reduce(
      (acc, val) => acc + parseInt(val.total_parts),
      0
    );

    let sizeKb = totalParts * 10;
    let sizeMb = sizeKb / 1_024;
    let rounded = sizeMb.toFixed(3);
    return parseFloat(rounded)
  }
}