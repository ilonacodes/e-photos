require_relative "spec_helper"
require_relative "../lib/app"

require "rack/test"
require "json"

class MockUuidGenerator
  MOCK_UUID = SecureRandom.uuid

  def generate_uuid
    MOCK_UUID
  end
end

UploadService::UUID_GENERATOR = MockUuidGenerator.new

RSpec.describe "Upload File API" do
  include Rack::Test::Methods

  def app
    Sinatra::Application
  end

  after do
    FileUtils.rm("./uploads/#{MockUuidGenerator::MOCK_UUID}")
  end

  it "upload file responds with 201 Created" do

    file = Rack::Test::UploadedFile.new(
        'spec/files/file.txt',
        'image/png'
    )

    post "/files", file: file

    expect(last_response).to be_created

  end

  it "upload file returns file_id" do
    file = Rack::Test::UploadedFile.new(
        'spec/files/file.txt',
        'image/png'
    )

    post "/files", file: file

    actual = JSON.parse(last_response.body)

    expect(actual).to eq({
                             "file_id" => MockUuidGenerator::MOCK_UUID
                         })
  end

  it "downloads file after uploading" do
    file = Rack::Test::UploadedFile.new(
        'spec/files/file.txt',
        'image/png'
    )

    post "/files", file: file

    file_id = JSON.parse(last_response.body)["file_id"]

    get "/files/#{file_id}"

    expect(last_response.status).to eq(200)
    expect(last_response.body).to eq("I am a PNG file!")
  end

end