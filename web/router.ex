defmodule Launchpad.Router do
  use Launchpad.Web, :router
  use Passport

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug :current_user
  end

  pipeline :graphql do
    plug :fetch_session
    plug :current_user
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/" do
    pipe_through :graphql

    get "/graphiql", Absinthe.Plug.GraphiQL, schema: Launchpad.Schema
    post "/graphiql", Absinthe.Plug.GraphiQL, schema: Launchpad.Schema
    forward "/graphql", Absinthe.Plug, schema: Launchpad.Schema
  end

  scope "/", Launchpad do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index

    # Passport routes
    get "/login", SessionController, :new
    post "/session", SessionController, :create
    get "/logout", SessionController, :delete
    get "/join", RegistrationController, :new
    post "/register", RegistrationController, :create
    get "/passwords/new", PasswordController, :new
    post "/passwords", PasswordController, :reset
  end

  # Other scopes may use custom stacks.
  # scope "/api", Launchpad do
  #   pipe_through :api
  # end
end
