# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Launchpad.Repo.insert!(%Launchpad.SomeModel{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias Launchpad.Repo
alias Launchpad.Models.Skill
alias Launchpad.Models.SkillArrow
alias Launchpad.Models.User

tmp = User.registration_changeset(%User{}, %{email: "admin@dev.com", password: "password", is_admin: true})
admin_user = Repo.insert!(tmp)

tmp = Skill.changeset(%Skill{}, %{name: "Hello World", description: "Write a simple program."})
hello_world_skill = Repo.insert!(tmp)

tmp = Skill.changeset(%Skill{}, %{name: "Variables", description: "Make your programs 'remeber' things."})
variables_skill = Repo.insert!(tmp)

tmp = SkillArrow.changeset(
  %SkillArrow{},
  %{
    prev_skill_id: hello_world_skill.id,
    next_skill_id: variables_skill.id
  }
)
hello_world_variable_skill_arrow = Repo.insert!(tmp)
