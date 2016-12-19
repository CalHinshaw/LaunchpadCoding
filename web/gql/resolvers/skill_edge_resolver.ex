defmodule Launchpad.Resolvers.SkillEdge do
  alias Launchpad.Repo
  alias Launchpad.Models.SkillEdge

  def find(id, _info \\ nil) do
    {:ok, Repo.get(SkillEdge, id)}
  end

  def all(_args \\ nil, _info \\ nil) do
    Repo.all(SkillEdge)
  end

  def next_skill(skill, _ \\ nil, _ \\ nil) do
    skill
    |> Ecto.assoc(:next_skill)
    |> Repo.one
  end

  def prev_skill(skill, _ \\ nil, _ \\ nil) do
    skill
    |> Ecto.assoc(:prev_skill)
    |> Repo.one
  end

end
