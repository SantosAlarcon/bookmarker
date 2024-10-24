<div align="center">

<img alt="Bookmarker Logo" src="https://raw.githubusercontent.com/SantosAlarcon/bookmarker/86ea9cf8e397bcc1872a304b2144de7fdb014259/public/BookmarkerLogo.svg" height="128px">

<br>

**Bookmarker** is a bookmark manager that lets you manage your bookmarks and folders everywhere, whatever you are in mobile or your PC.

</div>
<br>

# Used technologies

- **NextJS** (for the frontend and backend)
- **Zustand** (global state management)
- **Supabase** (for the database and authentication)
- **Sonner** (to render good looking notifications)
- **i18next** (for the internationalization)

<br>

# Folder structure

- **app** - App Router with most of the source code (components, APIs, store, utilities...)
- **mock** - Used to store JSON data and will be removed when the database implementation is completed
- **public** - Static content like images and stuff
- **tests** - Unit and E2E testing

<br>

# Internationalization support

This project has **internationalization support**, so the app will be translated to your language.

The current available languages are: **English**, **Spanish** and **Catalanian**. Any other language that is not available in this list leads to the **404 page**.

If you want to contribute with more languages, submit a **Pull Request** with the language folder with its json namespaces.
