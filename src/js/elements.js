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
window.customElements.define("elm-img-loader", ElmImgLoader);
import ElmAdminArticles from "./elements/admin/elm_articles";
window.customElements.define("elm-admin-articles", ElmAdminArticles);
import ElmAdminArticle from "./elements/admin/elm_article";
window.customElements.define("elm-admin-article", ElmAdminArticle);
import ElmArticlesHeader from "./elements/articles/elm_header";

window.customElements.define(
  "elm-articles-header",
  ElmArticlesHeader
);

import ElmArticlesFooter from "./elements/articles/elm_footer";

window.customElements.define(
  "elm-articles-footer",
  ElmArticlesFooter
);

import ElmArticles from "./elements/elm_articles";
window.customElements.define("elm-articles", ElmArticles);
import ElmArticle from "./elements/elm_article";
window.customElements.define("elm-article", ElmArticle)