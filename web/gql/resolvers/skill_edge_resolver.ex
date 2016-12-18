defmodule Launchpad.Resolvers.SkillEdge do
  alias Launchpad.Repo
  alias Launchpad.Models.SkillEdge

  def find(id, _info \\ nil) do
    {:ok, Repo.get(SkillEdge, id)}
  end

  def all(_args \\ nil, _info \\ nil) do
    Repo.all(SkillEdge)
  end

end
