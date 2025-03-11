class VisitorTracker
  def self.get_id()
    visitor_id = local_storage.get_item('visitor_id')

    unless visitor_id
      visitor_id = crypto.randomUUID()
      local_storage.set_item('visitor_id', visitor_id)
    end

    return visitor_id
  end

  def self.get_device_type()
    user_agent = navigator.user_agent.downcase()
    if /mobile|android|iphone|ipad|phone/i.test(user_agent)
      return "mobile"
    elsif /tablet|ipad/i.test(user_agent)
      return "tablet"
    else
      return "desktop"
    end
  end

  def self.get_referrer()
    document.referrer || "direct"
  end

  def self.get_visitor_info()
    {
      visitor_id: VisitorTracker.get_id(),
      device_type: VisitorTracker.get_device_type(),
      referrer: VisitorTracker.get_referrer(),
    }
  end
end
window.VisitorTracker = VisitorTracker