RSpec.describe "search feature", type: :feature do
  it "is possible to find photos" do
    visit("http://localhost:8000/")
    wait_for_dom

    fill_in(id: "search-input", with: "girl")
    click_on(id: "search-button")
    wait_for_dom

    first(".search-result")
    results = all(".search-result img")
    expect(results).not_to be_empty
    results.each do |result|
      expect(result.src).to eq("https://static.pexels.com/photos/445109/pexels-photo-445109.jpeg")
    end
  end
end  
