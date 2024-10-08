DOCKER_COMPOSE_DEV=docker-compose -p stripe_payment_pg -f ./docker-compose.development.yaml
DOCKER_COMPOSE_TEST=docker-compose -p stripe_payment_pg -f ./docker-compose.test.yaml 

db-start:
	$(DOCKER_COMPOSE_DEV) up -d

db-generate-migrations:
	./node_modules/.bin/drizzle-kit generate:pg

db-migrate:
	npm run db:migrate

db-stop:
	$(DOCKER_COMPOSE_DEV) down

test-infra-start:
	$(DOCKER_COMPOSE_TEST) up -d
	./bin/wait-for-it.sh -h localhost -p 15432 -t 60
	npm run db:migrate:test

test-infra-stop:
	$(DOCKER_COMPOSE_TEST) down

test: 
	$(MAKE) test-infra-start
	npm run test
	$(MAKE) test-infra-stop

test-watch: 
	$(MAKE) test-infra-start
	npm run test:watch
	$(MAKE) test-infra-stop

init:
	docker volume create payment-pgdata
	docker volume create payment-test-pgdata
	npm install

start: 
	$(MAKE) db-start || true
	npm run dev

sql:
	docker exec -it payment-db psql postgres://dev:dev@localhost:5432/payment_db