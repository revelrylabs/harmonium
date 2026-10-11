defmodule HarmoniumTest do
  use ExUnit.Case, async: true
  doctest Harmonium

  test "ships the same harmonium.css the npm package builds" do
    css = File.read!(Harmonium.css_path())
    assert css =~ "--harmonium-color-brand-primary"
    assert css =~ ".hm-button"
  end
end
