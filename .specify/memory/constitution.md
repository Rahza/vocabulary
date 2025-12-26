<!--
Sync Impact Report:
- Version change: 1.1.0 → 1.2.0
- List of modified principles: None
- Added sections:
    - VII. Strict Linting & Formatting
    - VIII. Strong Typing Discipline
    - IX. Modern Coding Style
- Removed sections: None
- Templates requiring updates (✅ updated / ⚠ pending):
    - ✅ .specify/templates/plan-template.md
    - ✅ .specify/templates/tasks-template.md
- Follow-up TODOs: None
-->

# vocabulary Constitution

## Core Principles

### I. Engineering Excellence

We adhere to industry best practices to build high-quality software. Our code is clear, concise, and easy to understand. We write code for others to read and maintain.

### II. Maintainability and Extensibility

We design our systems to be maintainable and extensible. We use modular design, and follow established coding standards to ensure that new features can be added with minimal friction.

### III. User-Centric Design

The user experience is at the forefront of our design process. We build products that are intuitive, responsive, and solve real-world problems for our users.

### IV. Performance and Scalability

Our applications are designed to be performant and scalable. We proactively identify and address performance bottlenecks, and we design our architecture to handle growth.

### V. Version Control Discipline

We maintain a clean and traceable project history. Progress MUST be committed to version control using atomic, descriptive, and well-structured commit messages. Each commit should represent a single logical change.

### VI. Pragmatic Testing

We prioritize high-value testing. We MUST write essential tests that ensure core functionality and cover critical edge cases. We avoid redundant or unnecessary test cases that do not contribute to confidence or stability, focusing on maintaining a lean and effective test suite.

### VII. Strict Linting & Formatting

We enforce consistent code quality through automated tooling. ESLint MUST be used with a strict ruleset. Disabling linting rules via comments is forbidden unless documented as an absolute technical necessity.

### VIII. Strong Typing Discipline

We leverage TypeScript to ensure runtime safety and developer clarity. The use of `any` or `unknown` types is forbidden. Disabling TypeScript compiler checks or rules via comments is forbidden.

### IX. Modern Coding Style

We prefer modern, functional JavaScript/TypeScript patterns. Arrow functions MUST be used for all functional components, hooks, and utility functions to ensure consistency and conciseness.

## Governance

This constitution supersedes all other development practices and decisions. All code contributions, architectural decisions, and feature implementations MUST align with these principles. Amendments to this constitution require a documented proposal, a review process, and an approval from the project stewards.

All pull requests and code reviews must explicitly verify compliance with these principles. Any deviation or increase in complexity must be rigorously justified and documented.

**Version**: 1.2.0 | **Ratified**: 2025-12-25 | **Last Amended**: 2025-12-25
