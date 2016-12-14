defmodule Launchpad.Repo.Migrations.AddSkillsTable do
  use Ecto.Migration

  def change do
    create table(:skills) do
      add :name, :string, null: false
      add :description, :text
    end

    create table(:skill_edges) do
      add :prev_skill_id, references(:skills), null: false
      add :next_skill_id, references(:skills), null: false
    end
  end
end
