import "./packages/template-rjs-0.1.1/elements";
import "./packages/bef-client-rjs-0.1.1/elements";
import ElmAdminImages from "./elements/admin/elm_images";
window.customElements.define("elm-admin-images", ElmAdminImages);
import ElmAdminImagesModal from "./elements/admin/elm_images_modal";

window.customElements.define(
  "elm-admin-images-modal",
  ElmAdminImagesModal
);

import ElmImgLoader from "./elements/elm_img_loader";
window.customElements.define("elm-img-loader", ElmImgLoader)