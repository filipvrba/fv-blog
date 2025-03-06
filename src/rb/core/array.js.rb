def divide_into_groups(group_size)
  objects = self
  result  = []

  (0 ... objects.length).step(group_size) do |i|
    result.push objects.slice(i, i + group_size)
    next
  end

  return result
end
Array.prototype.divide_into_groups = divide_into_groups