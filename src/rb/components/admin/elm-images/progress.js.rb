export default class CProgress
  def initialize(parent)
    @parent = parent

    @elm_progress     = @parent.query_selector('#adminImagesProgress')
    @elm_progress_bar = @elm_progress.query_selector('div')

    @timeout_id = nil

    _set_visibility(false)
  end

  def disconnected_callback()
    clear_timeout(@timeout_id) if @timeout_id
  end

  def save_file(message)
    case message.token
    when :t_pre_file
      @parent.set_spinner_visibility(true)
    when :t_file
      _set_visibility(true)
      _set_progressbar_width(0)
    when :t_segment
      percentage = (1 / message.part_count) * 100
      value_now = @elm_progress.get_attribute('aria-valuenow').to_f + percentage
      _set_progressbar_width(value_now)
    when :t_segments
      @timeout_id = set_timeout(lambda do
        _set_visibility(false)
        @parent.set_spinner_visibility(false)
      end, 1_000)
      @parent.c_contents.update_table()
    when :t_no_file, :t_no_file_id
      _set_visibility(false)
      @parent.set_spinner_visibility(false)
    end
  end

  def _set_visibility(is_visible)
    Bootstrap.change_visible_element(@elm_progress, is_visible)
  end

  def _set_progressbar_width(percentage)
    @elm_progress.set_attribute('aria-valuenow', percentage)
    @elm_progress_bar.style.width = "#{percentage}%"
  end
end