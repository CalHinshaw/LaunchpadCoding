# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :launchpad,
  ecto_repos: [Launchpad.Repo]

# Configures the endpoint
config :launchpad, Launchpad.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "NMP4GIMNyyeKrySHkzjZvJT0Z4IeDh4oWokfveXNTpwg2QpA6879wY8JkCOfrPrO",
  render_errors: [view: Launchpad.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Launchpad.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :passport,
  resource: Launchpad.Models.User,
  repo: Launchpad.Repo

config :absinthe,
  schema: Launchpad.Schema


# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
