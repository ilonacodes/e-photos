require_relative "spec_helper"
require_relative "../lib/app"

require "rack/test"
require "json"

RSpec.describe "Preview API" do
  include Rack::Test::Methods

  def app
    Sinatra::Application
  end

  it "returns 200 OK" do
    get "/preview/3"

    expect(last_response).to be_ok

  end

  it "returns one photo with that id" do
    get "/preview/3"

    body = JSON.parse(last_response.body)

    expect(body).to eq({
                                    "src" => "https://static.pexels.com/photos/115057/pexels-photo-115057.jpeg",
                                    "name" => "graffiti",
                                    "id" => 3,
                                    "tags" => %w(graffiti science art)
                                })
  end

  it "returns bad request when id is not integer" do
    get "/preview/3.0"

    expect(last_response).to be_bad_request
  end

  it "returns not found when there is no photo" do
    get "/preview/103"

    expect(last_response).to be_not_found
  end
end