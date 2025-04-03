import CInputsConfirmModal from "../packages/bef-client-rjs-0.1.1/components/elm-confirm-modal/inputs";
import CInputsAlertModal from "../packages/bef-client-rjs-0.1.1/components/elm-alert-modal/inputs";
import CInputsAdminImagesModal from "../components/admin/elm-images-modal/inputs";
import ElmAdminAnalyticsCharBarModal from "../components/admin/analytics/elm-char-bar-modal/inputs";

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

  static alert(options) {
    let defaultOptions = {title: null, message: null, fnTrue: null};
    options = Object.assign(defaultOptions, options);
    return Events.emit("#app", CInputsAlertModal.ENVS.show, options)
  };

  static adminImages(fileId) {
    return Events.emit("#app", CInputsAdminImagesModal.ENVS.show, fileId)
  };

  static charBarModal(options) {
    return Events.emit(
      "#app",
      ElmAdminAnalyticsCharBarModal.ENVS.show,
      options
    )
  }
};

window.Modals = Modals