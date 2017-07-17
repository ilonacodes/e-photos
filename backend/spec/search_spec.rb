require_relative "spec_helper"
require_relative "../lib/app"

require "rack/test"
require "json"

RSpec.describe "Search API" do
  include Rack::Test::Methods

  def app
    Sinatra::Application
  end

  it "returns 200 OK" do

    get "/search?query=girl"

    expect(last_response).to be_ok

  end

  it "returns two girl photos" do

    get "/search?query=girl"

    body = JSON.parse(last_response.body)
    expect(body).to eq({
                           "search_results" => [
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
                           ],
                       })

  end

end