defmodule Launchpad.Schema do
  use Absinthe.Schema
  import_types Launchpad.Schema.Types

  query do
    field :users, list_of(:user) do
      resolve &Launchpad.Resolvers.User.all/2
    end

    field :skills, list_of(:skill) do
      resolve &Launchpad.Resolvers.Skill.all/2
    end
  end
end
