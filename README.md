# 🌍 GlobeTrotter

GlobeTrotter is a travel application built with React, TypeScript and Vite. It allows users to explore countries around the world and discover useful information about each destination.

## Features

* Browse countries with flags, names, regions and capitals.
* Search for countries by name.
* Filter countries by region.
* Navigate between pages of country results.
* Open a detailed page for each country.
* View country information such as population, languages and currencies.
* View current weather information for a destination.
* Read introductory information about countries from Wikipedia.
* Add and remove favorite countries.
* Save favorites in localStorage so they remain available after reloading the page.
* Share and revisit filtered country lists through URL parameters.
* Navigate between the country list, country details and favorites pages.

## Technologies

* React
* TypeScript
* Vite
* React Router
* TanStack Query
* CSS
* REST APIs
* localStorage

## APIs

GlobeTrotter uses external APIs to retrieve country information, weather data and Wikipedia content.

* Countries: countries.dev
* Weather: Open-Meteo
* Country introductions and images: Wikipedia and Wikimedia Commons

## Getting Started

### Requirements

* Node.js
* npm

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

Users can add countries to their favorites and remove them later. Favorites are saved in localStorage and remain available after the page is reloaded.

## AI Usage and Reflection

AI assistance was used during development to help explain code, troubleshoot problems, improve documentation and understand Git and GitHub workflows. The application was tested during development, and the code and final decisions were reviewed as part of the project work.

This project helped me practise React, TypeScript, working with APIs, managing URL parameters, storing data in localStorage and using Git branches and pull requests. I also gained experience with debugging and documenting a web application.
