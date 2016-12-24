defmodule Launchpad.Resolvers.Skill do
  alias Launchpad.Repo
  alias Launchpad.Models.Skill

  def find(id, _info) do
    {:ok, Repo.get(Skill, id)}
  end

  def all(_args, _info) do
    {:ok, Repo.all(Skill)}
  end

  def next_skills(skill, _, _) do
    skills = skill
    |> Ecto.assoc(:next_skills)
    |> Repo.all

    {:ok, skills}
  end

  def prev_skills(skill, _, _) do
    skills = skill
    |> Ecto.assoc(:prev_skills)
    |> Repo.all

    {:ok, skills}
  end
end
