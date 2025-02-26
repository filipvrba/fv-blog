import CryptoJS from "crypto-js";

function decodeBase64() {
  return CryptoJS.enc.Base64.parse(this).toString(CryptoJS.enc.Utf8)
};

String.prototype.decodeBase64 = decodeBase64;

function encodeBase64() {
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(this))
};

String.prototype.encodeBase64 = encodeBase64;

function encodeSha256() {
  return CryptoJS.SHA256(this).toString()
};

String.prototype.encodeSha256 = encodeSha256;

function base64Split(maxSegmentSizeKb=10) {
  let maxSegmentSize = maxSegmentSizeKb * 1_024;
  let base64String = this;
  let segments = [];
  let currentIndex = 0;

  while (currentIndex < base64String.length) {
    let segment = base64String.substring(
      currentIndex,
      currentIndex + maxSegmentSize
    );

    segments.push(segment);
    currentIndex += maxSegmentSize
  };

  return segments
};

String.prototype.base64Split = base64Split