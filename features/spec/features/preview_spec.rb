require_relative "../spec_helper"

RSpec.describe "preview feature", type: :feature do
  it "is possible to preview a photo" do
    visit("http://localhost:8000/#/preview/6")
    wait_for_dom

    preview_photo = first(".preview img")

    actual = preview_photo['src']
    expected = "https://static.pexels.com/photos/336540/pexels-photo-336540.jpeg"
    expect(actual).to eq(expected)
  end

  it "is possible to open preview from search" do
    visit("http://localhost:8000/")
    wait_for_dom

    fill_in(id: "search-input", with: "girl")
    click_on(id: "search-button")
    wait_for_dom

    first(".search-result .search-result-link").click
    wait_for_dom

    preview_photo = first(".preview img")

    actual = preview_photo['src']
    expected = "https://static.pexels.com/photos/445109/pexels-photo-445109.jpeg"
    expect(actual).to eq(expected)
  end
end