require "sinatra"
require "json"

require_relative "photos_fixture"
require_relative "./db/photo_storage"
require_relative "./domain/photo"
require_relative "./domain/search_service"
require_relative "./web_api/photo_view"
require_relative "./web_api/search_endpoint"

require_relative "./domain/preview_service"
require_relative "./domain/photo_not_found_exception"
require_relative "./web_api/preview_endpoint"
