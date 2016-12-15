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
