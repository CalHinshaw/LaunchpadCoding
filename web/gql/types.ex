defmodule Launchpad.Schema.Types do
  use Absinthe.Schema.Notation
  use Absinthe.Relay.Schema.Notation


  # Note, skill_edge must be above skill or it thinks all skills are skill edges
  # i think it might be a bug...
  connection node_type: :skill_edge

  node object :skill_edge do
    # field :next_skill, :skill do
    #   resolve &Launchpad.Resolvers.SkillEdge.next_skill/3
    # end

    # field :prev_skill, :skill do
    #   resolve &Launchpad.Resolvers.SkillEdge.prev_skill/3
    # end
  end

  connection node_type: :user

  node object :user do
    field :id, :id
    field :email, :string
    field :is_admin, :boolean
  end

  # connection node_type: :skill

  # node object :skill do
  #   field :name, :string
  #   field :description, :string

  #   connection field :next_skills, node_type: :skill do
  #     resolve fn pagination_args, %{source: skill} ->
  #         connection = Absinthe.Relay.Connection.from_list(
  #           Launchpad.Resolvers.Skill.next_skills(skill),
  #           pagination_args
  #         )
  #         {:ok, connection}
  #     end
  #   end

  #   connection field :prev_skills, node_type: :skill do
  #     resolve fn pagination_args, %{source: skill} ->
  #         connection = Absinthe.Relay.Connection.from_list(
  #           Launchpad.Resolvers.Skill.prev_skills(skill),
  #           pagination_args
  #         )
  #         {:ok, connection}
  #     end
  #   end
  # end


  node object :viewer do
    connection field :users, node_type: :user do
      resolve fn pagination_args, _info ->
        users = Absinthe.Relay.Connection.from_list(
          Launchpad.Resolvers.User.all(),
          pagination_args
        )
        {:ok, users}
      end
    end

    # connection field :skills, node_type: :skill do
    #   resolve fn pagination_args, _info ->
    #     skills = Absinthe.Relay.Connection.from_list(
    #       Launchpad.Resolvers.Skill.all(),
    #       pagination_args
    #     )
    #     {:ok, skills}
    #   end
    # end

    connection field :skill_edges, node_type: :skill_edge do
      resolve fn pagination_args, _info ->
        skill_edges = Absinthe.Relay.Connection.from_list(
          Launchpad.Resolvers.SkillEdge.all(),
          pagination_args
        )

        IO.puts inspect skill_edges

        {:ok, skill_edges}
      end
    end
  end
end
