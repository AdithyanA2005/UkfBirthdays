# UKF Birthdays 🎂

A Next.js application to track and display birthdays for UKF students, featuring a modern UI with dark mode support.

## Features

- 📅 View today's birthdays
- 🔮 See upcoming birthdays for the next week
- 📊 Browse all birthdays
- 🌓 Dark mode support
- 📱 Responsive design
- 🎯 Department and semester filtering
- 🎂 Age calculation and display

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Database**: MongoDB with Prisma ORM
- **Styling**: Tailwind CSS
- **Date Handling**: date-fns
- **Icons**: Lucide React

## Prerequisites

- Node.js 16.8 or later
- MongoDB instance (local or cloud)
- npm or yarn package manager

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AdithyanA2005/UkfBirthdays.git
   cd UkfBirthdays
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```env
   # MongoDB connection string
   DATABASE_URL="mongodb://username:password@host:port/database?options"
   ```

## Development

Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
