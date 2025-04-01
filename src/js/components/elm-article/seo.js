export default class CSeo {
  constructor(parent) {
    this._parent = parent;
    this._ogTitle = document.querySelector("meta[property=\"og:title\"]");
    this._twitterTitle = document.querySelector("meta[name=\"twitter:title\"]");
    this._ogDescription = document.querySelector("meta[property=\"og:description\"]");
    this._twitterDescription = document.querySelector("meta[name=\"twitter:description\"]");
    this._ogImage = document.querySelector("meta[property=\"og:image\"]");
    this._twitterImage = document.querySelector("meta[name=\"twitter:image\"]");
    this._ogUrl = document.querySelector("meta[property=\"og:url\"]");
    this._twitterUrl = document.querySelector("meta[name=\"twitter:url\"]")
  };

  setTitle(title) {
    document.title = title;
    this._ogTitle.setAttribute("content", title);
    return this._twitterTitle.setAttribute("content", title)
  };

  setImage(imageId) {
    let imgUrl = `${CSeo.URL}/api/image/${imageId}`;
    this._ogImage.setAttribute("content", imgUrl);
    return this._twitterImage.setAttribute("content", imgUrl)
  };

  setUrl() {
    let url = `${CSeo.URL}aid=${this._parent.articleId}#article`;
    this._ogUrl.setAttribute("content", url);
    return this._twitterUrl.setAttribute("content", url)
  };

  setDescription(description) {
    this._ogDescription.setAttribute("content", description);
    return this._twitterDescription.setAttribute("content", description)
  }
};

CSeo.URL = "https://filipvrba-blog.vercel.app"