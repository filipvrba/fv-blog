
import './packages/template-rjs-0.1.1/elements'
import './packages/bef-client-rjs-0.1.1/elements'

import 'ElmAdminImages', './elements/admin/elm_images'
window.custom_elements.define('elm-admin-images', ElmAdminImages)

import 'ElmAdminImagesModal', './elements/admin/elm_images_modal'
window.custom_elements.define('elm-admin-images-modal', ElmAdminImagesModal)

import 'ElmImgLoader', './elements/elm_img_loader'
window.custom_elements.define('elm-img-loader', ElmImgLoader)

import 'ElmAdminArticles', './elements/admin/elm_articles'
window.custom_elements.define('elm-admin-articles', ElmAdminArticles)

import 'ElmAdminArticle', './elements/admin/elm_article'
window.custom_elements.define('elm-admin-article', ElmAdminArticle)

import 'ElmArticlesHeader', './elements/articles/elm_header'
window.custom_elements.define('elm-articles-header', ElmArticlesHeader)

import 'ElmArticlesFooter', './elements/articles/elm_footer'
window.custom_elements.define('elm-articles-footer', ElmArticlesFooter)

import 'ElmArticles', './elements/elm_articles'
window.custom_elements.define('elm-articles', ElmArticles)

import 'ElmArticle', './elements/elm_article'
window.custom_elements.define('elm-article', ElmArticle)
