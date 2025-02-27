export default class CContents {
  get tBody() {
    return this._tBody
  };

  constructor(parent) {
    this._parent = parent;
    this._tBody = this._parent.querySelector("#adminImagesTBody")
  };

  updateTable() {
    this._parent.setSpinnerVisibility(true);

    return this._parent.cDatabase.getImages((images) => {
      this._parent.setSpinnerVisibility(false);
      let elements = [];

      if (images) {
        for (let image of images) {
          let template = `${`
          <tr>
            <th scope='row'>${image.id}</th>
            <td>${image.name.decodeBase64()}</td>
            <td>${image.description.decodeBase64() || "---"}</td>
            <td>
              <div class='form-check form-check-reverse mx-5'>
                <input id='adminImagesCheck-${image.id}' class='form-check-input' type='checkbox'>
              </div>
            </td>
          </tr>
          `}`;
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