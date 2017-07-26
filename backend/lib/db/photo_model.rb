class PhotoModel < ActiveRecord::Base
  self.table_name = 'photos'

  def split_tags
    tags.split(",").map(&:strip)
  end
end
