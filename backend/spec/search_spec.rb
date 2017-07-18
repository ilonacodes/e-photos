require_relative "spec_helper"
require_relative "../lib/app"

require "rack/test"
require "json"

RSpec.describe "Search API" do
  include Rack::Test::Methods

  def app
    Sinatra::Application
  end

  def search_results
    body = JSON.parse(last_response.body)
    body["search_results"].sort_by {|p| p["id"]}
  end

  it "returns 200 OK" do

    get "/search?query=girl"

    expect(last_response).to be_ok

  end

  it "returns two girl photos" do

    get "/search?query=girl"

    expect(search_results).to eq([
                              {
                                  "src" => "https://static.pexels.com/photos/445109/pexels-photo-445109.jpeg",
                                  "name" => "girl",
                                  "id" => 1,
                                  "tags" => %w(girl woman blue hat nature smoke trees hand art),
                              },
                              {
                                  "src" => "https://static.pexels.com/photos/234541/-ancient-meditation-architecture-234541.jpeg",
                                  "name" => "meditation",
                                  "id" => 5,
                                  "tags" => %w(boy meditation ancient girl),
                              },
                              {
                                  "src" => "https://static.pexels.com/photos/336540/pexels-photo-336540.jpeg",
                                  "name" => "girl",
                                  "id" => 6,
                                  "tags" => %w(girl hipster hair)
                              },
                          ])

  end

  it "returns four trip photos" do

    get "/search?query=trip"

    expect(search_results).to eq([
                              {
                                  "src" => "https://static.pexels.com/photos/410986/pexels-photo-410986.jpeg",
                                  "name" => "road",
                                  "id" => 2,
                                  "tags" => %w(road way trip)
                              },
                              {
                                  "src" => "https://static.pexels.com/photos/297755/pexels-photo-297755.jpeg",
                                  "name" => "map",
                                  "id" => 8,
                                  "tags" => %w(map plan trip)
                              },
                              {
                                  "src" => "https://static.pexels.com/photos/30855/pexels-photo-30855.jpg",
                                  "name" => "trip",
                                  "id" => 9,
                                  "tags" => %w(trip hat vacation)
                              },
                              {
                                  "src" => "https://static.pexels.com/photos/27954/pexels-photo-27954.jpg",
                                  "name" => "beach",
                                  "id" => 10,
                                  "tags" => %w(sea house resort trip)
                              },
                          ])

  end

end