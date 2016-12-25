defmodule Launchpad.Schema.Types do
  use Absinthe.Schema.Notation

  object :user do
    field :id, :id
    field :email, :string
    field :is_admin, :boolean
  end

  object :skill do
    field :id, :id
    field :name, :string
    field :description, :string

    field :next_skills, list_of(:skill) do
      resolve &Launchpad.Resolvers.Skill.next_skills/3
    end

    field :prev_skills, list_of(:skill) do
      resolve &Launchpad.Resolvers.Skill.prev_skills/3
    end
  end

  object :skill_arrow do
    field :id, :id

    field :next_skill, :skill do
      resolve &Launchpad.Resolvers.SkillArrow.next_skill/3
    end

    field :prev_skill, :skill do
      resolve &Launchpad.Resolvers.SkillArrow.prev_skill/3
    end
  end
end
