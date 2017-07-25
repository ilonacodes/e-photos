file_storage = FileStorage.new
upload_service = UploadService.new(file_storage)

post "/files" do
  cors
  content_type :json

  status CREATED

  tempfile = params[:file][:tempfile]
  photo_file = upload_service.upload(tempfile)
  {file_id: photo_file.id}.to_json

end

get "/files/:file_id" do
  cors

  file_id = params[:file_id]
  photo_file = file_storage.get(file_id)
  send_file photo_file.path
end