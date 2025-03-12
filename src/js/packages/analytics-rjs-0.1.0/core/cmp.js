class CMP {
  static setAllConsent() {
    return localStorage.setItem(CMP.CONSENT, "all")
  };

  static getConsent() {
    return localStorage.getItem(CMP.CONSENT)
  }
};

CMP.CONSENT = "cmpConsent";
window.CMP = CMP