search_service = SearchService.new
photo_view = PhotoView.new

get "/search" do
  cors
  content_type :json

  query = params[:query]
  results = search_service.search(query)
  rendered_results = results.map {|photo| photo_view.render(photo)}
  {search_results: rendered_results}.to_json
end