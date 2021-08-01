export default function Sidebar({ setDarkTheme, darkTheme }) {
  function ChangeTheme() {
    setDarkTheme((prevState) => !prevState);
  }
  console.log(darkTheme);

  return (
    <aside className="sidebar">
      <div className="sidebar__logo">
        <img src="/images/logo.svg" alt="Logo" />
      </div>

      <div className="sidebar__profile">
        <img
          onClick={() => ChangeTheme()}
          className="sidebar__profile__theme"
          src={`/images/icon-${darkTheme ? "sun" : "moon"}.svg`}
          alt="Dark Mode"
        />
        <img
          className="sidebar__profile__avatar"
          src="/images/image-avatar.jpg"
          alt="Avatar"
        />
      </div>
    </aside>
  );
}
