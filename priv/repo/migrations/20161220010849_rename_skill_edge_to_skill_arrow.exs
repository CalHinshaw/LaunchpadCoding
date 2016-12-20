defmodule Launchpad.Repo.Migrations.RenameSkillEdgeToSkillArrow do
  use Ecto.Migration

  def change do
    rename table(:skill_edges), to: table(:skill_arrows)
  end
end
