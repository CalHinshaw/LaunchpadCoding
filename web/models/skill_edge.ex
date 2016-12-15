defmodule Launchpad.Models.SkillEdge do
  use Launchpad.Web, :model
  alias Launchpad.Models.Skill

  schema "skill_edges" do
    belongs_to :prev_skill, Skill
    belongs_to :next_skill, Skill
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:prev_skill_id, :next_skill_id])
    |> validate_required([:prev_skill_id, :next_skill_id])
  end
end
