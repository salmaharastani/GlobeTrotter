# 🌍 GlobeTrotter

GlobeTrotter is a travel application built with React, TypeScript and Vite. It allows users to explore countries around the world, discover information about destinations and save their favorite countries.

**Public application:** https://globe-trotter-sandy.vercel.app


## Features

* Browse countries with flags, names, regions and capitals.
* Search for countries by name.
* Filter countries by region.
* Sort countries by name or population.
* Navigate between pages of country results.
* Open a detailed page for each country.
* View country information, including population, languages and currencies.
* View current weather information for a destination.
* Read introductory information about countries from Wikipedia.
* View country images when available.
* Add and remove favorite countries.
* Save favorites in localStorage so they remain available after reloading the page.
* Compare two countries side by side.
* Switch between dark and light mode.
* Share and revisit country lists using URL parameters.
* Navigate between the country list, country details, favorites and comparison pages.
* Display an error page for unknown routes.

## Technologies

* React
* TypeScript
* Vite
* React Router
* TanStack Query
* CSS
* REST APIs
* localStorage

### Framework Choice

I chose React because it makes it easier to build a user interface using reusable components. I used TypeScript to make the code more structured and help detect errors. I chose Vite because it provides a simple and fast development environment.

## APIs

GlobeTrotter uses external APIs to retrieve country information, weather data and introductory information.

* **Country information:** countries.dev
* **Weather information:** Open-Meteo
* **Country introductions and images:** Wikipedia and Wikimedia Commons

## Getting Started

### Requirements

* Node.js
* npm
* Git

### Installation

Clone the repository:

```bash
git clone https://github.com/salmaharastani/GlobeTrotter.git
cd GlobeTrotter
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown in the terminal.

### Production Build

To check and build the application, run:

```bash
npm run build
```

## Favorites

Users can add countries to their favorites and remove them later. Favorites are stored in localStorage and remain available after the page is reloaded.

## Country Comparison

Users can select two different countries and compare their information side by side. The application displays a message if the same country is selected twice.

## URL Parameters

Search terms, selected regions, pagination and sorting are managed through URL parameters. This allows users to revisit or share a country list with the same view settings.

## AI Usage and Reflection

AI assistance was used during development to explain code, troubleshoot problems, improve documentation and understand Git and GitHub workflows. The application was tested during development, and the code and final implementation decisions were reviewed as part of the project work.

Through this project, I practised building a web application with React, TypeScript and external APIs. I also gained experience with routing, URL parameters, localStorage, data fetching, debugging, Git branches and pull requests.

One important part of the project was learning how different features work together, including country search, filtering, pagination, favorites and country comparison. The project also helped me understand the importance of testing the application and documenting its functionality.

### Reflection

The project went well, and I successfully implemented features such as country search, filtering, sorting, favorites and country comparison. The most challenging part was making the different features work together and fixing navigation problems when deploying the application. Next time, I would plan the structure more carefully and test each feature earlier in the development process. I also gained experience with React, TypeScript, APIs, Git branches and pull requests.

## Deployment

The application is deployed using Vercel. 

**Public URL:** https://globe-trotter-sandy.vercel.app

