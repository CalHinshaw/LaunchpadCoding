defmodule Launchpad.Resolvers.User do
  def all(_args, _info) do
    {:ok, Launchpad.Repo.all(Launchpad.Models.User)}
  end
end
