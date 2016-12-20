defmodule Launchpad.Schema do
  use Absinthe.Schema
  use Absinthe.Relay.Schema

  import_types Launchpad.Schema.Types

  node interface do
    resolve_type fn
      %Launchpad.Models.User{}, _ ->
        :user
      %Launchpad.Models.Skill{}, _ ->
        :skill
      %Launchpad.Models.SkillArrow{}, _ ->
        :skill_arrow
      _, _ ->
        nil
    end
  end

  query do
    node field do
      resolve fn
        %{type: :skill, id: id}, _ ->
          Launchpad.Resolvers.Skill.find(id, %{})
        %{type: :user, id: id}, _ ->
          Launchpad.Resolvers.User.find(id, %{})
        %{type: :skill_arrow, id: id}, _ ->
          Launchpad.Resolvers.SkillArrow.find(id, %{})
      end
    end

    field :viewer, :viewer do
      resolve fn(_, _) -> {:ok, %{id: 1}} end
    end
  end
end
