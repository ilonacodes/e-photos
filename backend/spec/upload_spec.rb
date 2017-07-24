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

UploadEndpoint::UUID_GENERATOR = MockUuidGenerator.new

RSpec.describe "Upload File API" do
  include Rack::Test::Methods

  def app
    Sinatra::Application
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

end