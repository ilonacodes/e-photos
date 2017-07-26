require_relative 'photo_model'

class PhotoStorage
  def search_by_name_or_tag(query)
    PhotoModel.where("name like concat('%',?,'%')" +
                         " or tags like concat('%',?,'%')", query, query).map do |model|
      translate_to_domain(model)
    end
  end

  def get(id)
    model = PhotoModel.find(id)
    translate_to_domain(model)
  rescue ActiveRecord::RecordNotFound
    nil
  end

  def save(photo)

    model = PhotoModel.create(
      name: photo.name,
      src: photo.src,
      tags: photo.tags.join(","),
    )

    photo.id = model.id

    photo

  end

  def delete(id)
    PhotoModel.delete(id)
  end

  def translate_to_domain(model)
    Photo.new(model.id, model.name, model.src, model.split_tags)
  end

end