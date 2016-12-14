defmodule Launchpad.Skill do
  use Launchpad.Web, :model

  schema "skills" do
    field :name, :string
    field :description, :string

    has_many :prev_skill_edges, Launchpad.SkillEdge, foreign_key: "next_skill_id"
    has_many :prev_skills, through: [:prev_skill_edges, :prev_skill]
    has_many :next_skill_edges, Launchpad.SkillEdge, foreign_key: "prev_skill_id"
    has_many :next_skills, through: [:next_skill_edges, :next_skill]
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name, :description])
    |> validate_required([:name])
  end
end


defmodule Launchpad.SkillEdge do
  use Launchpad.Web, :model

  schema "skill_edges" do
    belongs_to :prev_skill, Launchpad.Skill
    belongs_to :next_skill, Launchpad.Skill
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:prev_skill_id, :next_skill_id])
    |> validate_required([:prev_skill_id, :next_skill_id])
  end
end