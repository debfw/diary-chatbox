#  JourneyPal

JourneyPal is a diary assistant that helps kids create and manage their diary entries. It features options for generating diary content, searching through entries, spell-checking, and sending entries via email. The interface is clean, with a focus on ease of use, and includes interactive prompts for writing assistance.

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Development](#development)
- [Contributing](#contributing)

## Installation

To set up the Travel Diary app on your local machine:

1. Clone the repository to your local machine.
2. Navigate to the cloned directory.
3. Create a `.env` file in the root directory and add your `OPENAI_API_KEY` and `MAILERSEND_API_KEY` to it:
4. Install the dependencies with `npm install`.
5. Start the development server with `npm run dev` which will host the app on `http://localhost:3000`.

## Features

- **Diary Board:** Document your travel experiences.
- **Feature Card:** Highlight special moments or places.
- **Search History:** Easily find past entries.
- **Spell Check:** Ensure your stories are flawless.
- **Email Integration:** Share your diaries or get notifications.
- **Real-Time Chat:** Stay connected with fellow travelers.

## Dependencies

- Next.js for server-side rendering and static site generation.
- @mui/material, @emotion/react for UI components and styling.
- dayjs for date manipulation.
- mailersend for email sending functionalities.
- And more listed in the provided `package.json`.

## Development

- Use `npm run build` to build the application for production.
- To start the production server, use `npm run start`.
- Lint your code with `npm run lint`.

## Contributing

Contributions to Travel Diary are always welcome, whether it's bug reports, feature requests, or pull requests.

Before contributing, please read our contributing guide.



