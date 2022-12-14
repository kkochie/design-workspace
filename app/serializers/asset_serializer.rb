class AssetSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :title, :source, :description, :tags, :image_data, :image_url, :projects
  
  has_many :projects

  def image_data
    rails_blob_path(object.image_data, only_path: true) if object.image_data.attached?
  end
end
