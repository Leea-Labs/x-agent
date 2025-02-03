compose = docker compose -p leea-x-agent --env-file .env -f .deploy/docker-compose.dev.yaml

start:
	${compose} up -d --remove-orphans --build
	echo "======> Cleaning up dangling images"
	docker rmi $$(docker images -f "dangling=true" -q) || true
	${compose} logs --tail 100 worker

stop:
	${compose} down --remove-orphans

drop:
	${compose} rm

shell:
	${compose} exec worker sh

ps:
	${compose} ps -a

logs:
	${compose} logs --tail 100 -f worker

%:
	@true
