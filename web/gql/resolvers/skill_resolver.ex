defmodule Launchpad.Resolver.Skill do
  alias Launchpad.Repo

  def all(_args, _info) do
    {:ok, Repo.all(Launchpad.Models.Skill)}
  end

  def next_skills(skill, _, _) do
    next_skills =
      skill
      |> Ecto.assoc(:next_skills)
      |> Repo.all

    {:ok, next_skills}
  end

  def prev_skills(skill, _, _) do
    prev_skills =
      skill
      |> Ecto.assoc(:prev_skills)
      |> Repo.all

    {:ok, prev_skills}
  end
end
