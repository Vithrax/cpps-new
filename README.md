<p align="center">
<img src="https://img.shields.io/github/contributors/Vithrax/cpps-new" alt="GitHub contributors" />
<img src="https://img.shields.io/github/discussions/Vithrax/cpps-new" alt="GitHub discussions" />
<img src="https://img.shields.io/github/issues/Vithrax/cpps-new" alt="GitHub issues" />
<img src="https://img.shields.io/github/issues-pr/Vithrax/cpps-new" alt="GitHub pull request" />
</p>

<p></p>
<p></p>

## 🔍 Table of Contents

- [🔍 Table of Contents](#-table-of-contents)
- [💻 Stack](#-stack)
- [📝 Project Summary](#-project-summary)
- [⚙️ Setting Up](#️-setting-up)
  - [DATABASE_URL](#database_url)
  - [NEXTAUTH_SECRET](#nextauth_secret)
  - [NEXTAUTH_URL](#nextauth_url)
  - [GOOGLE_CLIENT_ID](#google_client_id)
  - [GOOGLE_CLIENT_SECRET](#google_client_secret)
  - [UPLOADTHING_SECRET](#uploadthing_secret)
  - [UPLOADTHING_APP_ID](#uploadthing_app_id)
- [🚀 Run Locally](#-run-locally)
- [🙌 Contributors](#-contributors)

## 💻 Stack

- [next-auth](https://github.com/nextauthjs/next-auth): Authentication library for Next.js projects.
- [react-query](https://react-query.tanstack.com/): Data fetching and state management library for React.
- [react-table](https://react-table.tanstack.com/): Table component library for React.
- [tailwindcss](https://tailwindcss.com/): CSS framework for styling the project.
- [axios](https://axios-http.com/): HTTP client for making API requests.
- [react-hook-form](https://react-hook-form.com/): Library for building forms in React.
- [prisma](https://www.prisma.io/): Database toolkit for TypeScript and Node.js.
- [typescript](https://www.typescriptlang.org/): Typed superset of JavaScript for static type checking.

## 📝 Project Summary

- [**src/app**](src/app): Main application directory containing various subdirectories for different features and functionalities.
- [**src/app/api**](src/app/api): Directory for API-related functionality, including authentication, cases, companies, orders, proposals, uploads, and users.
- [**src/app/admin**](src/app/admin): Directory for administrative functionalities, such as managing companies, proposal options, and users.
- [**src/app/cases**](src/app/cases): Directory for managing cases, including creating, viewing, and replying to cases.
- [**src/app/orders**](src/app/orders): Directory for managing orders, including creating, viewing, and updating orders.
- [**src/app/proposals**](src/app/proposals): Directory for managing proposals, including creating, viewing, and updating proposals.
- [**src/components**](src/components): Directory for reusable UI components used throughout the application.
- [**src/hooks**](src/hooks): Directory for custom React hooks used in the application.
- [**src/lib**](src/lib): Directory for utility functions and libraries used across the project.
- [**src/styles**](src/styles): Directory for global styles and CSS files used in the application.

## ⚙️ Setting Up

#### DATABASE_URL

- Obtain the database URL from your database provider.
- Make sure the database is properly set up and accessible.
- Retrieve the connection details, including the host, port, username, and password.
- Format the URL in the appropriate database connection format.
- Replace the [DATABASE_URL] placeholder with the generated URL.

#### NEXTAUTH_SECRET

- Generate a random string of characters to use as the secret.
- Use a secure random generator or a password manager to create the string.
- Ensure the secret is long and complex enough to provide sufficient security.
- Replace the [NEXTAUTH_SECRET] placeholder with the generated secret.

#### NEXTAUTH_URL

- Specify the URL of your application where NextAuth.js will be used.
- Use the full URL including the protocol (e.g., https://example.com).
- Make sure the URL is accessible and properly configured.
- Replace the [NEXTAUTH_URL] placeholder with the actual URL.

#### GOOGLE_CLIENT_ID

- Go to the Google Cloud Console (https://console.cloud.google.com).
- Create a new project or select an existing one.
- Navigate to the "Credentials" section.
- Create a new OAuth 2.0 client ID.
- Copy the generated client ID and replace the [GOOGLE_CLIENT_ID] placeholder.

#### GOOGLE_CLIENT_SECRET

- Follow the steps mentioned above to navigate to the "Credentials" section.
- Create a new OAuth 2.0 client ID.
- Copy the generated client secret and replace the [GOOGLE_CLIENT_SECRET] placeholder.

#### UPLOADTHING_SECRET

- Generate a random string of characters to use as the secret.
- Use a secure random generator or a password manager to create the string.
- Ensure the secret is long and complex enough to provide sufficient security.
- Replace the [UPLOADTHING_SECRET] placeholder with the generated secret.

#### UPLOADTHING_APP_ID

- Obtain the App ID from the UploadThing service provider.
- Sign up or log in to the UploadThing platform.
- Navigate to the settings or account section to locate the App ID.
- Copy the App ID and replace the [UPLOADTHING_APP_ID] placeholder.

## 🚀 Run Locally

1.Clone the cpps-new repository:

```sh
git clone https://github.com/Vithrax/cpps-new
```

2.Install the dependencies with one of the package managers listed below:

```bash
pnpm install
bun install
npm install
yarn install
```

3.Start the development mode:

```bash
pnpm dev
bun dev
npm run dev
yarn dev
```

## 🙌 Contributors

<table style="border:1px solid #404040;text-align:center;width:100%">
<tr><td style="width:14.29%;border:1px solid #404040;">
        <a href="https://github.com/Vithrax" spellcheck="false">
          <img src="https://avatars.githubusercontent.com/u/69089182?v=4?s=100" width="100px;" alt="Vithrax"/>
          <br />
          <b>Vithrax</b>
        </a>
        <br />
        <a href="https://github.com/Vithrax/cpps-new/commits?author=Vithrax" title="Contributions" spellcheck="false">
          30 contributions
        </a>
      </td></table>
