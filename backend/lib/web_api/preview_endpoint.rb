preview_service = PreviewService.new
photo_view = PhotoView.new

get "/preview/:id" do
  content_type :json

  begin
    id = Integer(params[:id])
  rescue ArgumentError
    status 400
    return
  end

  begin
    photo = preview_service.preview(id)
  rescue PhotoNotFoundException
    status 404
    return
  end

  result = photo_view.render(photo)
  result.to_json
end

