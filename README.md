# FitPlan

FitPlan is a website where you provide your workout requirements and goals, and it uses a Large Language Model (LLM) to generate a customized workout plan, which is then sent to you via email. The project uses Stripe for payments, Postmark for emails, a PostgreSQL database, and is hosted on Vercel.

## Features
- Generate personalized workout plans using LLM.
- Receive workout plans via email.
- Secure payment processing with Stripe.

## Environment Variables
To run this project, you will need to add the following environment variables to your .env file:

```env
SECRET_STRIPE_KEY
SECRET_STRIPE_WEBHOOK_KEY
SECRET_STRIPE_WORKOUT_PLAN_PRICE_ID
DATABASE_PRISMA_URL
DATABASE_URL_NON_POOLING
DATABASE_URL
DATABASE_USER
DATABASE_PASSWORD
DATABASE_HOST
DATABASE_DATABASE
PUBLIC_ENVIRONMENT
SECRET_GROQ_MODEL
SECRET_GROQ_KEY
SECRET_POSTMARK_KEY
```

## Getting Started

### Prerequisites
- Node.js
- npm
- PostgreSQL

### Installation
1. Clone the repository
   ```sh
   git clone https://github.com/yourusername/fitplan.git
   ```
2. Navigate to the project directory
   ```sh
   cd fitplan
   ```
3. Install dependencies
   ```sh
   npm install
   ```

### Running Locally
1. Set up a PostgreSQL database and migrate the schemas
   ```sh
   npm run prisma:migrate
   ```
2. Forward Stripe webhooks
   ```sh
   npm run stripe:webhooks
   ```
3. Start the development server
   ```sh
   npm run dev
   ```

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.

