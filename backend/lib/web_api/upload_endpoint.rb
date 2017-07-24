class UuidGenerator
  def generate_uuid
    SecureRandom.uuid
  end
end

module UploadEndpoint
  UUID_GENERATOR = UuidGenerator.new
end

post "/files" do
  cors
  content_type :json

  status CREATED

  file_id = UploadEndpoint::UUID_GENERATOR.generate_uuid
  {file_id: file_id}.to_json

end