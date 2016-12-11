defmodule Launchpad.Schema.Types do
  use Absinthe.Schema.Notation

  object :user do
    field :id, :id
    field :email, :string
    field :is_admin, :boolean
  end
end
