class Photo
  attr_reader :id, :name, :src, :tags

  def initialize(id, name, src, tags)
    @id = id
    @name = name
    @tags = tags
    @src = src
  end
end
