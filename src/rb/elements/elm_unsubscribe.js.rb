import 'CContents', '../components/elm-unsubscribe/contents'
import 'CDatabase', '../components/elm-unsubscribe/database'

export default class ElmUnsubscribe < HTMLElement
  attr_reader :candidate_id

  def initialize
    super

    @candidate_id = URLParams.get_index('cid') || nil
    @have_params  = @candidate_id && @candidate_id != 0
    
    @c_contents = CContents.new(self)
    @c_database = CDatabase.new(self)

    init_elm()
  end

  def connected_callback()
  end

  def disconnected_callback()
  end

  def initialize_candidate(candidate)
    @c_database.remove_candidate() do
      self.innerHTML = @c_contents.get_remove_candidate(candidate)
    end
  end

  def init_elm()
    self.innerHTML = "<elm-spinner class='spinner-overlay'></elm-spinner>"

    if @have_params
      @c_database.get_candidate() do |candidate|
        if candidate
          initialize_candidate(candidate)
        else
          self.innerHTML = @c_contents.get_nocandidate()
        end
      end
    else
      self.innerHTML = @c_contents.get_noparams()
    end
  end
end