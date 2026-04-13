# Contributing to DogeEscape

First off, thanks for taking the time to contribute! 🎮

The following is a set of guidelines for contributing to DogeEscape. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to contact@galacticos.com.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps to reproduce the problem**
* **Provide specific examples**
* **Describe the behavior you observed**
* **Explain which behavior you expected to see instead**
* **Include screenshots if possible**
* **Include your browser and OS version**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a detailed description of the suggested enhancement**
* **Explain why this enhancement would be useful**
* **List some examples of how it would be used**

### Pull Requests

* Fill in the required template
* Do not include issue numbers in the PR title
* Follow the JavaScript/React style guide
* Include screenshots and animated GIFs in your pull request whenever possible
* End all files with a newline

## Development Setup

1. **Fork and clone the repo**
```bash
git clone https://github.com/yourusername/dogeescape.git
cd dogeescape
```

2. **Install dependencies**
```bash
npm install
```

3. **Create a branch**
```bash
git checkout -b feature/my-new-feature
# or
git checkout -b fix/my-bug-fix
```

4. **Make your changes**

5. **Test your changes**
```bash
npm run dev
```

6. **Commit your changes**
```bash
git add .
git commit -m "feat: add new feature" 
# or
git commit -m "fix: resolve bug"
```

7. **Push to your fork**
```bash
git push origin feature/my-new-feature
```

8. **Open a Pull Request**

## Coding Standards

### JavaScript/React

- Use ES6+ syntax
- Use functional components with hooks
- Follow Airbnb React/JSX Style Guide
- Use meaningful variable and function names
- Add comments for complex logic
- Keep components small and focused

### Example:
```javascript
// Good
const PlayerStats = ({ coins, score }) => {
  const [isVisible, setIsVisible] = useState(true);
  
  return (
    <div className="stats-panel">
      <Coin amount={coins} />
      <Score value={score} />
    </div>
  );
};

// Avoid
const ps = (props) => {
  const [v, sv] = useState(true);
  return <div>{props.c} {props.s}</div>;
};
```

### CSS/Tailwind

- Use Tailwind utility classes
- Follow mobile-first approach
- Use consistent spacing (multiples of 4px)
- Maintain Minecraft theme consistency

### File Naming

- Components: `PascalCase.jsx` (e.g., `PlayerStats.jsx`)
- Utilities: `camelCase.js` (e.g., `formatScore.js`)
- Constants: `UPPER_SNAKE_CASE.js` (e.g., `API_ENDPOINTS.js`)

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` new feature
- `fix:` bug fix
- `docs:` documentation changes
- `style:` formatting, missing semicolons, etc.
- `refactor:` code restructuring
- `test:` adding tests
- `chore:` maintenance tasks

Examples:
```
feat: add multiplayer mode
fix: resolve wallet connection issue
docs: update README with new features
style: format code with prettier
refactor: optimize leaderboard component
```

## Pull Request Process

1. Update the README.md with details of changes if needed
2. Update the documentation with any new features
3. The PR will be merged once you have the sign-off of at least one maintainer

## Testing Checklist

Before submitting a PR, ensure:

- [ ] Code builds without errors (`npm run build`)
- [ ] All existing features still work
- [ ] New features work as expected
- [ ] Code follows style guidelines
- [ ] Comments are added where necessary
- [ ] No console errors or warnings
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Web3 wallet integration still works (if applicable)

## Questions?

Feel free to reach out:
- Create an issue
- Email: contact@galaticos.com
- Discord: [Join our community](https://discord.gg/galacticos)

---

Thank you for contributing! 🚀

**Galacticos Corporation**  
