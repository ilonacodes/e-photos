class Config
  def initialize
    root = File.expand_path '../..', __FILE__
    @config = YAML.load(File.read(File.join(root, 'config/app.yml')))[ENV['ENV']]
  end

  def api_url
    @config['api_url']
  end

  def frontend_origin
    @config['frontend_origin']
  end
end

CONFIG = Config.new