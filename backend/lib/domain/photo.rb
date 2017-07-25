class Photo
  attr_reader :id, :name, :src, :tags
  attr_writer :id

  def initialize(id, name, src, tags)
    @id = id
    @name = name
    @tags = tags
    @src = src
  end
end
