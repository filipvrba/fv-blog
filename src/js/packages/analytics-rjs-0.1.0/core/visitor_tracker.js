class VisitorTracker {
  static getId() {
    let visitorId = localStorage.getItem("visitor_id");

    if (!visitorId) {
      visitorId = crypto.randomUUID();
      localStorage.setItem("visitor_id", visitorId)
    };

    return visitorId
  };

  static getDeviceType() {
    let userAgent = navigator.userAgent.toLowerCase();

    if (/mobile|android|iphone|ipad|phone/i.test(userAgent)) {
      return "mobile"
    } else if (/tablet|ipad/i.test(userAgent)) {
      return "tablet"
    } else {
      return "desktop"
    }
  };

  static getReferrer() {
    let referrer = document.referrer || null;
    if (!referrer) return "direct";
    let referrerUrl = new URL(referrer);
    return referrerUrl.host
  };

  static getVisitorInfo() {
    return {
      visitorId: VisitorTracker.getId(),
      deviceType: VisitorTracker.getDeviceType(),
      referrer: VisitorTracker.getReferrer()
    }
  }
};

window.VisitorTracker = VisitorTracker