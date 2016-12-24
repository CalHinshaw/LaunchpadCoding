defmodule Launchpad.Resolvers.SkillArrow do
  alias Launchpad.Repo
  alias Launchpad.Models.SkillArrow

  def find(id, _info \\ nil) do
    {:ok, Repo.get(SkillArrow, id)}
  end

  def all(_args \\ nil, _info \\ nil) do
    {:ok, Repo.all(SkillArrow)}
  end

  def next_skill(skill, _ \\ nil, _ \\ nil) do
    s = skill
    |> Ecto.assoc(:next_skill)
    |> Repo.one

    {:ok, s}
  end

  def prev_skill(skill, _ \\ nil, _ \\ nil) do
    s =skill
    |> Ecto.assoc(:prev_skill)
    |> Repo.one

    {:ok, s}
  end

end
