defmodule Launchpad.Resolvers.Skill do
  alias Launchpad.Repo
  alias Launchpad.Models.Skill

  def find(id, _info \\ nil) do
    {:ok, Repo.get(Skill, id)}
  end

  def all(_args \\ nil, _info \\ nil) do
    IO.puts Repo.all(Skill)
    {:ok, Repo.all(Skill)}
  end

  def next_skills(skill, _ \\ nil, _ \\ nil) do
    skills = skill
    |> Ecto.assoc(:next_skills)
    |> Repo.all

    {:ok, skills}
  end

  def prev_skills(skill, _ \\ nil, _ \\ nil) do
    skills = skill
    |> Ecto.assoc(:prev_skills)
    |> Repo.all

    {:ok, skills}
  end
end
