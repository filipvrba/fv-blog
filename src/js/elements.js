import "./packages/template-rjs-0.1.1/elements";
import "./packages/bef-client-rjs-0.1.1/elements";
import "./packages/analytics-rjs-0.1.0/elements";
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
window.customElements.define("elm-article", ElmArticle);
import ElmArticlesContainer from "./elements/articles/elm_container";

window.customElements.define(
  "elm-articles-container",
  ElmArticlesContainer
);

import ElmPagination from "./elements/elm_pagination";
window.customElements.define("elm-pagination", ElmPagination);
import ElmAdminAnalytics from "./elements/admin/elm_analytics";

window.customElements.define(
  "elm-admin-analytics",
  ElmAdminAnalytics
);

import ElmAdminAnalyticsChartBar from "./elements/admin/analytics/elm_chart_bar";

window.customElements.define(
  "elm-admin-analytics-chart-bar",
  ElmAdminAnalyticsChartBar
);

import ElmAdminAnalyticsArticles from "./elements/admin/analytics/elm_articles";

window.customElements.define(
  "elm-admin-analytics-articles",
  ElmAdminAnalyticsArticles
);

import ElmAdminAnalyticsCharBarModal from "./elements/admin/analytics/elm_char_bar_modal";

window.customElements.define(
  "elm-admin-analytics-char-bar-modal",
  ElmAdminAnalyticsCharBarModal
);

import ElmSubscribeForm from "./elements/elm_subscribe_form";
window.customElements.define("elm-subscribe-form", ElmSubscribeForm)