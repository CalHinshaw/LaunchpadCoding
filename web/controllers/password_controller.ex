defmodule Launchpad.PasswordController do
  use Launchpad.Web, :controller

  def new(conn, _) do
    conn
    |> render(:new)
  end

  def reset_password(conn, %{"user" => %{"email" => _email}}) do
    conn
    |> put_flash(:info, "Password reset doesn't work yet.")
    |> redirect(to: session_path(conn, :new))
  end
end
