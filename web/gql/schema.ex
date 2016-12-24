defmodule Launchpad.Schema do
  use Absinthe.Schema

  import_types Launchpad.Schema.Types


  query do
    field :skills, list_of(:skill) do
      resolve &Launchpad.Resolvers.Skill.all/2
    end

    field :skill_arrows, list_of(:skill_arrow) do
      resolve &Launchpad.Resolvers.SkillArrow.all/2
    end

    field :users, list_of(:user) do
      resolve &Launchpad.Resolvers.User.all/2
    end
  end
end
