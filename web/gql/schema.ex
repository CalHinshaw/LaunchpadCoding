defmodule Launchpad.Schema do
  use Absinthe.Schema
  import_types Launchpad.Schema.Types

  query do
    field :users, list_of(:user) do
      resolve &Launchpad.Resolver.User.all/2
    end
  end
end
