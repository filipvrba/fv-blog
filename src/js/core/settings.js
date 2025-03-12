export default class Settings {
  static getCategories(userId) {
    return [
      {
        index: "articles",
        name: "Články",
        content: `<elm-admin-articles user-id='${userId}'></elm-admin-articles>`
      },

      {
        index: "images",
        name: "Obrázky",
        content: `<elm-admin-images user-id='${userId}'></elm-admin-images>`
      },

      {
        index: "analytics",
        name: "Analytika",
        content: "<elm-admin-analytics></elm-admin-analytics>"
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