class PhotoView
  def render(photo)
    {
        id: photo.id,
        name: photo.name,
        src: photo.src,
        tags: photo.tags
    }
  end
end