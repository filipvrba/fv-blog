export default class CContents {
  constructor(parent) {
    this._parent = parent;
    this._referrerTbody = this._parent.querySelector("#analyticsReferrerTBody");
    this._devicesTbody = this._parent.querySelector("#analyticsDevicesTBody");
    this._elmTime = this._parent.querySelector("#analyticsTime")
  };

  emptyTr() {
    return `${`
    <tr>
      <td class='text-center'>---</td>
      <td class='text-center'>---</td>
    </tr>
    `}`
  };

  updateTime() {
    let timeString = (new Date).toLocaleTimeString(
      "en-US",
      {hour: "numeric", minute: "numeric", second: "numeric", hour12: true}
    );

    return this._elmTime.innerText = timeString
  };

  udpateTbodyReferrer(referrer) {
    let elements = [];

    if (referrer) {
      for (let ref of referrer) {
        let template = `${`
        <tr>
          <td class='text-truncate' style='max-width: 200px;' title='${ref.referrer}'>${ref.referrer}</td>
          <td class='text-end px-4'>${ref.count}</td>
        </tr>
        `}`;
        elements.push(template)
      }
    } else {
      elements.push(this.emptyTr())
    };

    return this._referrerTbody.innerHTML = elements.join("")
  };

  udpateTbodyDevices(devices) {
    let elements = [];

    if (devices) {
      for (let device of devices) {
        let template = `${`
        <tr>
          <td>${device.type}</td>
          <td class='text-end px-4'>${device.count}</td>
        </tr>
        `}`;
        elements.push(template)
      }
    } else {
      elements.push(this.emptyTr())
    };

    return this._devicesTbody.innerHTML = elements.join("")
  }
}