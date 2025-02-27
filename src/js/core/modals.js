import CInputsConfirmModal from "../packages/bef-client-rjs-0.1.1/components/elm-confirm-modal/inputs";
import CInputsAdminImagesModal from "../components/admin/elm-images-modal/inputs";

export default class Modals {
  static confirm(options) {
    let defaultOptions = {
      title: null,
      message: null,
      fnTrue: null,
      fnFalse: null
    };

    options = Object.assign(defaultOptions, options);
    return Events.emit("#app", CInputsConfirmModal.ENVS.show, options)
  };

  static adminImages() {
    return Events.emit("#app", CInputsAdminImagesModal.ENVS.show)
  }
};

window.Modals = Modals