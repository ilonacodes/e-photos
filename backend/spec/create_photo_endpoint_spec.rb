require_relative "spec_helper"
require_relative "../lib/app"

require "rack/test"
require "json"

RSpec.describe "Create Photo API" do
  include Rack::Test::Methods

  def app
    Sinatra::Application
  end

  after do
    photo_model = PhotoModel.last
    PhotoStorage.new.delete(photo_model.id)
  end

  it "creates a photo" do

    photo_request = {
        name: "my photo",
        tags: "selfie, photo, art",
        file_id: "27"
    }

    post "/photos", photo_request.to_json,
         {"CONTENT_TYPE" => "application/json"}

    expect(last_response.status).to eq(201)

    last_model = PhotoModel.last
    actual = JSON.parse(last_response.body)
    expect(actual).to eq({
                             "id" => last_model.id,
                             "name" => "my photo",
                             "tags" => %w(selfie photo art),
                             "src" => "http://localhost:4567/files/27"
                         })

  end

  it "stores a photo" do
    photo_request = {
        name: "my photo",
        tags: "selfie, photo, art",
        file_id: "27"
    }

    post "/photos", photo_request.to_json,
         {"CONTENT_TYPE" => "application/json"}

    last_model = PhotoModel.last

    get "/preview/#{last_model.id}"

    expect(last_response.status).to eq(200)

    actual = JSON.parse(last_response.body)
    expect(actual).to eq({
                             "id" => last_model.id,
                             "name" => "my photo",
                             "tags" => %w(selfie photo art),
                             "src" => "http://localhost:4567/files/27"
                         })
  end
end