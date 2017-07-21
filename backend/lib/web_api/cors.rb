def cors
  headers['Access-Control-Allow-Origin'] = "http://localhost:8000"
  headers['Access-Control-Allow-Methods'] = "GET, POST, PUT, DELETE, OPTIONS"
  headers['Access-Control-Allow-Headers'] = "accept, authorization, origin"
end

options "/*" do
  cors
end