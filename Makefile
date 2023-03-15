build:
	docker-compose build

dev:
	docker-compose up

stop:
	docker-compose stop

implode:
	docker-compose down -v

logs:
	docker-compose logs -f

start:
	docker-compose -f docker-compose.prod.yml up

.PHONY: build dev stop implode logs start
