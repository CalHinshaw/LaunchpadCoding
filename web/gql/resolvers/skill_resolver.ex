defmodule Launchpad.Resolvers.Skill do
  alias Launchpad.Repo
  alias Launchpad.Models.Skill

  def find(id, _info \\ nil) do
    {:ok, Repo.get(Skill, id)}
  end

  def all(_args \\ nil, _info \\ nil) do
    Repo.all(Skill)
  end

  def next_skills(skill, _ \\ nil, _ \\ nil) do
    skill
    |> Ecto.assoc(:next_skills)
    |> Repo.all
  end

  def prev_skills(skill, _ \\ nil, _ \\ nil) do
    skill
    |> Ecto.assoc(:prev_skills)
    |> Repo.all
  end
end
