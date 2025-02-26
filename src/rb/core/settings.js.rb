export default class Settings
  def self.get_categories(user_id)
    return [
      {
        index: 'images',
        name: 'Obrázky',
        content: "<elm-admin-images user-id='#{user_id}'></elm-admin-images>"
      },
      {
        index: 'profile',
        name: 'Profil',
        content: "<elm-profile-editing user-id='#{user_id}'></elm-profile-editing>"
      }
    ]
  end
end
window.Settings = Settings