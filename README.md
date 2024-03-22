# Backpack Debuggers API

An API that serves up monsters from the Backpack Debuggers game.

## Endpoints

Monster info:

```
GET /api/v1/monsters
GET /api/v1/monsters/:dex_number
```

Monster images:

```
GET /api/v1/images/monster/:dex_number/size/:size/image.png
```

>size must be a value between 50 and 500

## Setup

You will need node.js, npm, [the imagemagick CLI](https://imagemagick.org/script/command-line-processing.php) and postgres to run this API.

Install dependencies:

```
npm install
```

Create a .env and update it with your postgres database connection details:

```
cp .env.sample .env
```

## Migrate and Seed the Database

```
npm run db:migrate
npm run db:seed
```

## Development

```
npm run dev
```
