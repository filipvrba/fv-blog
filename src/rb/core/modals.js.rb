import 'CInputsConfirmModal',     '../packages/bef-client-rjs-0.1.1/components/elm-confirm-modal/inputs'
import 'CInputsAdminImagesModal', '../components/admin/elm-images-modal/inputs'
import 'ElmAdminAnalyticsCharBarModal', '../components/admin/analytics/elm-char-bar-modal/inputs'

export default class Modals
  def self.confirm(options)
    default_options = {
      title: nil,
      message: nil,
      fn_true: nil,
      fn_false: nil
    }
    options = Object.assign(default_options, options)

    Events.emit('#app', CInputsConfirmModal::ENVS.show, options)
  end

  def self.admin_images(file_id)
    Events.emit('#app', CInputsAdminImagesModal::ENVS.show, file_id)
  end

  def self.char_bar_modal(hour)
    Events.emit('#app', ElmAdminAnalyticsCharBarModal::ENVS.show, hour)
  end
end
window.Modals = Modals