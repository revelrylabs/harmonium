defmodule Harmonium.MixProject do
  use Mix.Project

  @version "2.0.0-alpha.1"
  @source_url "https://github.com/revelrylabs/harmonium"

  def project do
    [
      app: :harmonium,
      version: @version,
      elixir: "~> 1.14",
      deps: deps(),
      package: package(),
      name: "Harmonium",
      description: "CSS design system for Phoenix and LiveView. Design tokens, layout primitives, and component styles — zero JavaScript required.",
      source_url: @source_url,
      docs: docs()
    ]
  end

  def application do
    []
  end

  defp deps do
    [
      {:phoenix_live_view, "~> 0.20 or ~> 1.0", optional: true},
      {:ex_doc, "~> 0.34", only: :dev, runtime: false}
    ]
  end

  defp package do
    [
      maintainers: ["Revelry Labs"],
      licenses: ["MIT"],
      links: %{
        "GitHub" => @source_url,
        "npm (React)" => "https://www.npmjs.com/package/harmonium",
        "Storybook" => "https://revelrylabs.github.io/harmonium"
      },
      files: ~w(lib priv/static mix.exs README.md LICENSE)
    ]
  end

  defp docs do
    [
      main: "Harmonium",
      extras: ["README.md"]
    ]
  end
end
