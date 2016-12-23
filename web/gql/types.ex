defmodule Launchpad.Schema.Types do
  use Absinthe.Schema.Notation
  use Absinthe.Relay.Schema.Notation

  connection node_type: :skill

  node object :skill do
    field :name, :string
    field :description, :string

    connection field :next_skills, node_type: :skill do
      resolve fn pagination_args, %{source: skill} ->
        connection = Absinthe.Relay.Connection.from_list(
          Launchpad.Resolvers.Skill.next_skills(skill),
          pagination_args
        )
        {:ok, connection}
      end
    end

    connection field :prev_skill, node_type: :skill do
      resolve fn pagination_args, %{source: skill} ->
        connection = Absinthe.Relay.Connection.from_list(
          Launchpad.Resolvers.Skill.prev_skills(skill),
          pagination_args
        )
        {:ok, connection}
      end
    end
  end

  connection node_type: :skill_arrow

  node object :skill_arrow do
    field :next_skill, :skill do
      resolve &Launchpad.Resolvers.SkillArrow.next_skill/3
    end

    field :prev_skill, :skill do
      resolve &Launchpad.Resolvers.SkillArrow.prev_skill/3
    end
  end


  node object :viewer do
    connection field :skills, node_type: :skill do
      resolve fn pagination_args, _info ->
        connection = Absinthe.Relay.Connection.from_list(
          Launchpad.Resolvers.Skill.all(),
          pagination_args
        )

        {:ok, connection}
      end
    end

    connection field :skill_arrows, node_type: :skill_arrow do
      resolve fn pagination_args, _info ->
        connection = Absinthe.Relay.Connection.from_list(
          Launchpad.Resolvers.SkillArrow.all(),
          pagination_args
        )

        {:ok, connection}
      end
    end
  end
end
