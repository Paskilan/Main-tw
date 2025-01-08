# Contribution Guide

Please take a moment to read through the following guidelines to ensure your contributions are aligned with our project’s conventions and structure. 



- [Contribution Guide](#contribution-guide)
  - [Technologies and libraries used in this version](#technologies-and-libraries-used-in-this-version)
    - [1. React](#1-react)
    - [2. Vite](#2-vite)
    - [3. TypeScript](#3-typescript)
    - [4. Tailwind CSS](#4-tailwind-css)
    - [5. ShadCN](#5-shadcn)
    - [6. Embla Carousel Autoplay](#6-embla-carousel-autoplay)
    - [7. Magic UI](#7-magic-ui)
  - [Cloning the Repository \& Creating a Feature or Fix](#cloning-the-repository--creating-a-feature-or-fix)
  - [Styles and Naming Conventions](#styles-and-naming-conventions)
    - [File Naming Conventions](#file-naming-conventions)
      - [`/assets`](#assets)
      - [`/components`](#components)
      - [`/hooks`](#hooks)
      - [`/lib`](#lib)
      - [`/pages`](#pages)
      - [`/sample_data`](#sample_data)
    - [Component Function Naming](#component-function-naming)
  - [Pushing changes in repo](#pushing-changes-in-repo)
    - [Creating a commit message](#creating-a-commit-message)
  - [Creating a Pull Request](#creating-a-pull-request)
    - [Pull Request Template](#pull-request-template)
- [Pull Request](#pull-request)
  - [Changes Made](#changes-made)
  - [Additional Notes (Optional)](#additional-notes-optional)
  - [Screenshots (Optional)](#screenshots-optional)
  

## Technologies and libraries used in this version
Please don't hesitate to use any good libraries that can improve the efficiency and quality of the project. Always ensure they align with the project's goals and guidelines.

### 1. React
- A JavaScript library for building user interfaces, primarily used for dynamic rendering and component-based development.

### 2. Vite
- We use vite for the easy deployment and production ready compilation for libraries i.e Tailwind

### 3. TypeScript
- A superset of JavaScript that adds static types and type checking.
- Why Typescript? We use **TypeScript** because it provides better compatibility with the libraries and tools used in this project. Unlike vanilla JavaScript, **TypeScript** is essential for working with the **ShadCN** command-line tools, which do not fully support plain JavaScript. 

### 4. Tailwind CSS
> [!TIP] 
> When adding many classes please consider moving it in `App.css` and creating a class alias with tailwind components e.g (`<ALIAS_CLASS> : {@apply <TAILWIND CLASSES>;}`)

> [!NOTE]
> When working with Tailwind classes, if the classes affect the general application (e.g., generic fonts or body resets), use `Index.css`. Remember that `Index.css` is system-wide and also where Tailwind and ShadCN components drop their UI styles. For localized styles, use `App.css` instead.

- A utility-first CSS framework that allows for rapid UI development. We use it extensively to style components in a highly customizable and responsive way.

### 5. ShadCN
- A set of UI components that are used as the primary workhorse for building out UI elements in the project. These components are integrated into the application for consistent design patterns [Website](https://ui.shadcn.com/docs).

### 6. Embla Carousel Autoplay
- Used for adding an **autoplay** feature to carousels, particularly with the ShadCN carousel components. It ensures smooth transitions and automatic scrolling for a better user experience. This was used on the `components/layouts/home/feature-view` under the `<Carousel>` props

```
plugins={[
  Autoplay({
      delay: 2000,
  }),
]}
```

### 7. Magic UI
- Magic UI is a extension pre-built components of shadCN ui used for creating animation display and complex visual design. We used the `Marquee` components to create a movable display, this is stored along with shadCN pre-built components inside `/components/ui/*` folder  [Magic UI Website](https://magicui.design/docs/components/marquee). 


  
## Cloning the Repository & Creating a Feature or Fix
To start contributing, you will need to clone the repository and create a new branch for your feature or bug fix:

```bash
# Clone the repository
git clone <repository-url>

# Navigate into the project directory
cd <project-name>

# Create a new branch for your feature or fix
git checkout -b Feature/<feature-or-fix-name>
```

## Styles and Naming Conventions

### File Naming Conventions

```
├── assets
├── components
│   ├── commons
│   ├── layouts
│   │   ├── home
│   │   ├── login
│   │   ├── register
│   │   └── settings
│   └── ui
├── hooks
├── lib
├── pages
└── sample_data
    ├── features
    ├── sample_header
    └── sample_orgs
```

#### `/assets`
- Contains static asset files such as images, icons, or other resources frequently used in the app.

#### `/components`
- Houses reusable UI components to maintain modularity and readability.
  - **`/commons`**: Contains shared components that are generic and reusable across multiple pages or layouts.
    - **Note**: Reusable components should be placed here for better maintainability.
  - **`/layouts`**: Includes page-specific components grouped by page (e.g., `home`, `login`, `register`, `settings`).
    - **Note**: 
      - Components here should follow the kebab-case directory naming convention `<PAGE_SPECIFIC_COMPONENT>-view`.
      - incase the view component is long please consider using naming convention <snake_case>-view but retain the PascalCase of the function name inside.
      - Componets that are page-specific like buttons on user homepage should follow PascalCase format and be added here rather than in commons  

  - **`/ui`**: Reserved for components generated by **ShadCN** (e.g., buttons, modals).
    - **Important**: These are system-generated and should only be edited minimally to avoid unwanted errors.
#### `/hooks`
- Includes custom React hooks to encapsulate reusable stateful logic.
  - **Note**: Hooks auto-generated by **ShadCN** must **not** be removed or modified to prevent app-breaking issues.

#### `/lib`
- Contains utility functions or libraries used across the app, such as API calls, helper methods, or configuration files.
- Please handle with care when doing modification as this is also used by shadCN components files like (`util.ts`)

#### `/pages`
- Contains the application's page components, this is the files used in `<routes>` in `App.tsx`.
  - **Note**: Page files should use the **PascalCase** naming convention for consistency : `<RouteName>Page.tsx` .

#### `/sample_data`
- Provides mock data for local development or testing purposes.
  - **`/features`**: Mock data for feature-specific needs.
  - **`/sample_header`**: Example images or content for header sections.
  - **`/sample_orgs`**: Example data for organizations.


### Component Function Naming

On naming the functions, **PascalCase** shall be used:

```ExampleComponent1.tsx

export default function ComponentName(){
    ...
}
```

or by using `const`

```ExampleComponent1.tsx

const ComponentName = () => {
    ...
}
```


## Pushing changes in repo

### Creating a commit message

When pushing changes to the repository, follow the guidelines below to ensure clarity and consistency in your commit history:
   The commit message should follow the format:
   
   `<Type>: <Informative description of commit>`
   
* **Commit Types:**
   - **Feature**: For new features or additions (e.g., new components or views).
   - **Fix**: For bug fixes or minor improvements.
   - **Refactor**: For code restructuring or optimization without changing functionality.
   - **Docs**: For documentation changes or additions.
   - **Test**: For changes to tests or adding new tests.
   - **Chore** : For keeping up-to-date with default branch (Main) or other branch such as Development and Test
   
* **Examples of commits :**
   - **Feature**: `Feature: Implement Navbar component`
   - **Fix**: `Fix: Resolve issue with user login validation`
   - **Refactor**: `Refactor: Simplify homepage component structure`
   - **Docs**: `Docs: Update README with new API information`
   - **Test**: `Test: Add unit tests for user authentication flow`
   
1. **Branching Strategy:**
   Always create a feature branch for new work. Once the feature branch is complete and the changes are reviewed, it should be merged into the test then development branch and subsequently deployed in the main branch.

2. **Example Workflow:**
   - Create a feature branch: 
     `git checkout -b Feature/Navbar`
   - Check on `test` branch whether new changes to commit to stay updated before pushing the Feature
    `git pull origin test`  
   - After making changes and committing them, push to the remote repository:
     `git push origin Feature/Navbar`
   - Once approved, merge the feature branch into the `test` branch.
   - Once the features in the Test branch are stable, you can merge them into Development for further testing or direct deployment
   - Deploy to Main once all are cleared and stable
  

## Creating a Pull Request

When submitting a pull request, please use the following template to ensure clarity and consistency.

### Pull Request Template

```markdown
# Pull Request

## Changes Made
- <change 1>
- <change 2>
- <change 3>

## Additional Notes (Optional)
- <any additional context or notes>

## Screenshots (Optional)
- <if applicable, include before and after screenshots>

