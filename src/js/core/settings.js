export default class Settings {
  static getCategories(userId) {
    return [
      {
        index: "images",
        name: "Obrázky",
        content: `<elm-admin-images user-id='${userId}'></elm-admin-images>`
      },

      {
        index: "profile",
        name: "Profil",
        content: `<elm-profile-editing user-id='${userId}'></elm-profile-editing>`
      }
    ]
  }
};

window.Settings = Settings