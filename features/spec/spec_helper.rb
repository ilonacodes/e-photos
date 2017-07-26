require "capybara/rspec"

Capybara.configure do |config|
  config.default_driver = :selenium
  config.default_max_wait_time = 15
  config.wait_on_first_by_default = true
  config.ignore_hidden_elements = false
end

module WaitForDom
  def wait_for_dom
    uuid = SecureRandom.uuid
    page.find("body")
    script = <<-EOS
      setTimeout(function() {
        var div = document.createElement("div");
        div.id = "wait-for-dom-#{uuid}";
        document.body.appendChild(div);
      }, 0);
    EOS
    page.evaluate_script(script)
    page.find("#wait-for-dom-#{uuid}", visible: false)
  end
end

RSpec.configure do |config|
  config.expect_with :rspec do |expectations|
    expectations.include_chain_clauses_in_custom_matcher_descriptions = true
  end

  config.mock_with :rspec do |mocks|
    mocks.verify_partial_doubles = true
  end

  config.shared_context_metadata_behavior = :apply_to_host_groups

  config.filter_run_when_matching :focus

  config.example_status_persistence_file_path = "spec/examples.txt"

  config.disable_monkey_patching!

  config.warnings = true

  if config.files_to_run.one?
    config.default_formatter = "doc"
  end

  config.profile_examples = 10

  config.order = :random

  Kernel.srand config.seed

  config.include WaitForDom, type: :feature
end
