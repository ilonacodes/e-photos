require_relative "../spec_helper"

RSpec.describe "search feature", type: :feature do
  it "is possible to find photos" do
    visit("http://localhost:8000/")
    wait_for_dom

    fill_in(id: "search-input", with: "girl")
    click_on(id: "search-button")
    wait_for_dom

    puts page.body

    first(".search-result")
    results = all(".search-result img")
    expect(results).not_to be_empty

    actual = results.map { |img| img['src'] }
    expected = %w(
      https://static.pexels.com/photos/445109/pexels-photo-445109.jpeg
      https://static.pexels.com/photos/234541/-ancient-meditation-architecture-234541.jpeg
      https://static.pexels.com/photos/336540/pexels-photo-336540.jpeg
    )
    expect(actual).to eq(expected)
  end
end
