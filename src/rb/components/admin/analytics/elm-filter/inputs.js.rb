export default class CInputs
  def initialize(parent)
    @parent = parent

    window.admin_analytics_filter_btn_click = btn_click
  end

  def btn_click(index)
    elm_menu = @parent.query_selector('.dropdown-menu')
    elm_menu.children.each do |child|
      if child.children.first.class_list.contains('active')
        child.children.first.class_list.remove('active')
      end
    end

    elm_li = elm_menu.children[index]
    elm_li.children.first.class_list.add('active')

    @parent.emit_state(index)
  end
end