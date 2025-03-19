export default class CProgress {
  constructor(parent) {
    this._parent = parent;
    this._elmProgress = this._parent.querySelector("#adminImagesProgress");
    this._elmProgressBar = this._elmProgress.querySelector("div");
    this._timeoutId = null;
    this._setVisibility(false)
  };

  disconnectedCallback() {
    if (this._timeoutId) return clearTimeout(this._timeoutId)
  };

  saveFile(message) {
    let percentage, valueNow;

    switch (message.token) {
    case "tPreFile":
      return this._parent.setSpinnerVisibility(true);

    case "tFile":
      this._setVisibility(true);
      this._setProgressbarWidth(0);
      break;

    case "tSegment":
      percentage = (1 / message.partCount) * 100;
      valueNow = parseFloat(this._elmProgress.getAttribute("aria-valuenow")) + percentage;
      this._setProgressbarWidth(valueNow);
      break;

    case "tSegments":

      this._timeoutId = setTimeout(
        () => {
          this._setVisibility(false);
          return this._parent.setSpinnerVisibility(false)
        },

        1_000
      );

      this._parent.updateData();
      break;

    case "tNoFile":
    case "tNoFileId":
      this._setVisibility(false);
      this._parent.setSpinnerVisibility(false)
    }
  };

  _setVisibility(isVisible) {
    return Bootstrap.changeVisibleElement(this._elmProgress, isVisible)
  };

  _setProgressbarWidth(percentage) {
    this._elmProgress.setAttribute("aria-valuenow", percentage);
    return this._elmProgressBar.style.width = `${percentage}%`
  }
}