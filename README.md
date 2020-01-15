## Leitner: a flashcard app

Create flashcards for self-studying. Demo at https://leitner-app.herokuapp.com/ (email tqsxu@edu.uwaterloo.ca for demo credentials)

### Local build

1. Install Ruby version 2.6.5 and Rails 6

2. Install bundler

3. Install Postgresql locally

4. Modify configuration as needed

- Database
  
  You may want to change the name of the PG instance referenced in `config/database.yml` to match that of your local PG instances
- Authentication
  
  Basic auth uses environment configs and the `dotenv` gem to define credentials. You may change the dev environment config `.env.development` as desired for your local build.

4. Bundle and serve

```
bundle exec rails db:create db:setup
bundle && bundle exec rails s
```

### Features to add

- Scheduled refreshing of cards priorities in some interval
