class CMP
  CONSENT = 'cmpConsent'

  def self.set_all_consent()
    local_storage.set_item(CONSENT, 'all')
  end

  def self.get_consent()
    local_storage.get_item(CONSENT)
  end
end
window.CMP = CMP