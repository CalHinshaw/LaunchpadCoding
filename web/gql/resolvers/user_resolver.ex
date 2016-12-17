defmodule Launchpad.Resolvers.User do
  alias Launchpad.Repo
  alias Launchpad.Models.User

  def find(id, _info \\ nil) do
    user = Repo.get(User, id)
    case user do
      nil ->
        {:error, "user not found"}
      _ ->
        {:ok, user}
    end
  end

  def all(_args \\ nil, _info \\ nil) do
    Repo.all(User)
  end
end
