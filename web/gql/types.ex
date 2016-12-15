defmodule Launchpad.Schema.Types do
  use Absinthe.Schema.Notation

  object :user do
    field :id, :id
    field :email, :string
    field :is_admin, :boolean
  end

  object :skill do
    field :name, :string
    field :description, :string

    field :next_skills, list_of(:skill) do
      resolve &Launchpad.Resolver.Skill.next_skills/3
    end
    field :prev_skills, list_of(:skill)
  end
end
