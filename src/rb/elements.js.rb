
import './packages/template-rjs-0.1.1/elements'
import './packages/bef-client-rjs-0.1.1/elements'

import 'ElmAdminImages', './elements/admin/elm_images'
window.custom_elements.define('elm-admin-images', ElmAdminImages)

import 'ElmAdminImagesModal', './elements/admin/elm_images_modal'
window.custom_elements.define('elm-admin-images-modal', ElmAdminImagesModal)

import 'ElmImgLoader', './elements/elm_img_loader'
window.custom_elements.define('elm-img-loader', ElmImgLoader)
