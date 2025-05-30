export default class CContents
  def initialize(parent)
    @parent = parent

    @referrer_tbody = @parent.query_selector('#analyticsReferrerTBody')
    @devices_tbody  = @parent.query_selector('#analyticsDevicesTBody')
    @elm_time       = @parent.query_selector('#analyticsTime')
  end

  def empty_tr()
    """
    <tr>
      <td class='text-center'>---</td>
      <td class='text-center'>---</td>
    </tr>
    """
  end

  def update_time()
    time_string = Date.new.to_locale_time_string('en-US',
      { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })
    @elm_time.inner_text = time_string
  end

  def udpate_tbody_referrer(referrer)
    elements = []
    
    if referrer
      referrer.each do |ref|
        template = """
        <tr>
          <td class='text-truncate' style='max-width: 200px;' title='#{ref.referrer}'>#{ref.referrer}</td>
          <td class='text-end px-4'>#{ref.count}</td>
        </tr>
        """
        elements.push(template)
      end
    else
      elements.push(empty_tr())
    end

    @referrer_tbody.innerHTML = elements.join('')
  end

  def udpate_tbody_devices(devices)
    elements = []
    
    if devices
      devices.each do |device|
        template = """
        <tr>
          <td>#{device.type}</td>
          <td class='text-end px-4'>#{device.count}</td>
        </tr>
        """
        elements.push(template)
      end
    else
      elements.push(empty_tr())
    end

    @devices_tbody.innerHTML = elements.join('')
  end
end