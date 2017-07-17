require "sinatra"
require "json"

get "/search" do
  content_type :json
  {
      search_results: [
          {
              src: "https://static.pexels.com/photos/445109/pexels-photo-445109.jpeg",
              name: "girl",
              id: 1,
              tags: %w(girl woman blue hat nature smoke trees hand art),
          },
          {
              src: "https://static.pexels.com/photos/234541/-ancient-meditation-architecture-234541.jpeg",
              name: "meditation",
              id: 5,
              tags: %w(boy meditation ancient girl),
          },
          {
              src: "https://static.pexels.com/photos/336540/pexels-photo-336540.jpeg",
              name: "girl",
              id: 6,
              tags: %w(girl hipster hair)
          },
      ],
  }.to_json
end