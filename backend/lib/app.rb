require "sinatra"
require "json"
require "securerandom"
require "fileutils"

# common web
require_relative "./web_api/cors"
require_relative "./web_api/utils"
require_relative "./web_api/photo_view"

# common domain/db
require_relative "photos_fixture"
require_relative "./db/photo_storage"
require_relative "./domain/photo"

# search endpoint
require_relative "./domain/search_service"
require_relative "./web_api/search_endpoint"

# preview endpoint
require_relative "./domain/preview_service"
require_relative "./domain/photo_not_found_exception"
require_relative "./web_api/preview_endpoint"

# upload endpoint
require_relative "./db/file_storage"
require_relative "./domain/uuid_generator"
require_relative "./domain/photo_file"
require_relative "./domain/upload_service"
require_relative "./web_api/upload_endpoint"