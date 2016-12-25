defmodule Launchpad.Schema do
  use Absinthe.Schema
  alias Launchpad.Resolvers

  import_types Launchpad.Schema.Types


  query do
    field :skills, list_of(:skill) do
      resolve &Resolvers.Skill.all/2
    end

    field :skill, :skill do
      arg :skill_id, type: :id
      resolve &Resolvers.Skill.find/2
    end

    field :skill_arrows, list_of(:skill_arrow) do
      resolve &Resolvers.SkillArrow.all/2
    end

    field :users, list_of(:user) do
      resolve &Resolvers.User.all/2
    end
  end
end
