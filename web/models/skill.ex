defmodule Launchpad.Models.Skill do
  use Launchpad.Web, :model
  alias Launchpad.Models.SkillEdge

  schema "skills" do
    field :name, :string
    field :description, :string

    has_many :prev_skill_edges, SkillEdge, foreign_key: :next_skill_id
    has_many :prev_skills, through: [:prev_skill_edges, :prev_skill]
    has_many :next_skill_edges, SkillEdge, foreign_key: :prev_skill_id
    has_many :next_skills, through: [:next_skill_edges, :next_skill]
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name, :description])
    |> validate_required([:name])
  end
end
