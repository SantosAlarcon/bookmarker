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

- **mock** - Used to store JSON data and will be removed when the database implementation is completed
- **pages** - Pages Router
- **public** - Static content like images and stuff
- **src** - Most of the code is stored here, with the components, store, utilities and types
- **tests** - Unit and E2E testing

<br>

# Internationalization support

This project has **internationalization support**, so the app will be translated to your language.

The current available languages are: **English**, **Spanish** and **Catalanian**. Any other language that is not available in this list leads to the **404 page**.

If you want to contribute with more languages, submit a **Pull Request** with the language folder with its json namespaces.

## ️⚠️ Warning

This project is in WIP, but you can log in and log out without problem. What you can't do at the moment is managing the bookmarks until I implemented the database operations.
