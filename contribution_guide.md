# Contributing Guide

Thank you for your interest in contributing to the `postgres-read` MCP server! We welcome contributions from the community.

## Getting Started

Before you start, please ensure you have set up your local development environment. Detailed instructions can be found in [local_development.md](./local_development.md).

## Workflow

1.  **Fork the Repository**: Create a fork of the repository on GitHub.
2.  **Clone Your Fork**: Clone your forked repository to your local machine.
3.  **Create a Branch**: Create a new branch for your feature or bug fix.
    ```bash
    git checkout -b feature/your-feature-name
    ```
4.  **Make Changes**: Implement your changes. Please follow the existing coding style and conventions.
5.  **Test Your Changes**: Verify your changes locally.
    ```bash
    bun run test
    ```
    Ensure that the tests pass and verify that your changes didn't break existing functionality.
6.  **Commit Changes**: Commit your changes with clear and descriptive commit messages.
    ```bash
    git commit -m "feat: add descriptive message about your changes"
    ```
    We follow [Conventional Commits](https://www.conventionalcommits.org/):
    - `feat:` for new features (triggers a minor release)
    - `fix:` for bug fixes (triggers a patch release)
    - `docs:`, `chore:`, `style:`, `refactor:`, `perf:`, `test:` for other changes (no release trigger by default)

7.  **Push and Open a Pull Request**: Push your branch to your fork and open a pull request against the `main` branch of the original repository.

## Reporting Issues

If you encounter any bugs or have feature requests, please open an issue on GitHub. When reporting a bug, please include:

- A clear description of the issue.
- Steps to reproduce the issue.
- Expected behavior vs. actual behavior.
- Any relevant logs or error messages.
- Your environment details (OS, Bun version, PostgreSQL version).

## Code Style

- We use TypeScript.
- Please follow standard TypeScript best practices.
- Ensure your code is clean, readable, and well-documented.

## Code of Conduct

Please be respectful and considerate of others when contributing to this project. We aim to foster an inclusive and welcoming community.
