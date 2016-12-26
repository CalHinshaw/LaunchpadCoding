defmodule Launchpad.AppController do
  use Launchpad.Web, :controller

  def app(conn, _params) do
    render(conn, "app.html", layout: {Launchpad.LayoutView, "spa.html"})
  end
end
