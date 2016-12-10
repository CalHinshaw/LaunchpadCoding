defmodule Launchpad.PageController do
  use Launchpad.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
