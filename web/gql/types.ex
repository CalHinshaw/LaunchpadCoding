defmodule Launchpad.Schema.Types do
  use Absinthe.Schema.Notation
  use Absinthe.Relay.Schema.Notation

  connection node_type: :user

  node object :user do
    field :id, :id
    field :email, :string
    field :is_admin, :boolean
  end

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

    connection field :prev_skills, node_type: :skill do
      resolve fn pagination_args, %{source: skill} ->
          connection = Absinthe.Relay.Connection.from_list(
            Launchpad.Resolvers.Skill.prev_skills(skill),
            pagination_args
          )
          {:ok, connection}
      end
    end
  end


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

    connection field :skills, node_type: :skill do
      resolve fn pagination_args, _info ->
        skills = Absinthe.Relay.Connection.from_list(
          Launchpad.Resolvers.Skill.all(),
          pagination_args
        )
        {:ok, skills}
      end
    end
  end
end
