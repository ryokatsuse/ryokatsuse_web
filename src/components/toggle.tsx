import { ThemeToggler } from 'gatsby-plugin-dark-mode'


const Toggle : React.FC<Props> = () => {

  return (
    <>
      <ThemeToggler>
        {({ theme, toggleTheme }) => (
          <label>
            <input
              className="toggle"
              type="checkbox"
              onChange={e => toggleTheme(e.target.checked ? 'dark' : 'light')}
              checked={theme === 'dark'}
            />{' '}
            <span className="toggle__fa"></span>
          </label>
        )}
      </ThemeToggler>
    </>
  );
};
export default Toggle

