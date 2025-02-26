export default class ImageCompressor {
  constructor(maxWidth, maxHeight, quality) {
    this._maxWidth = maxWidth || 1_920;
    this._maxHeight = maxHeight || 1_080;
    this._quality = quality || 0.8
  };

  compressImage(file, callback) {
    let reader = new FileReader;

    reader.onload = (e) => {
      let img = new Image;

      img.onload = () => {
        let [width, height] = this._resizeImage(img);
        return this._createCompressedImage(img, width, height, callback)
      };

      return img.src = e.target.result
    };

    return reader.readAsDataURL(file)
  };

  _resizeImage(img) {
    let width = img.width;
    let height = img.height;

    if (width > this._maxWidth || height > this._maxHeight) {
      let ratio = Math.min(
        this._maxWidth / width,
        this._maxHeight / height
      );

      width = width * ratio;
      height = height * ratio
    };

    return [width, height]
  };

  _createCompressedImage(img, width, height, callback) {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);
    let mime = "image/jpeg";
    let base64Image = canvas.toDataURL(mime, this._quality);
    if (callback) return callback(...[base64Image, mime])
  }
};

window.ImageCompressor = ImageCompressor