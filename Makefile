build:
	./node_modules/.bin/eth <src/index.eth >build/index.js

watch:
	./node_modules/.bin/watch "make build" src

.PHONY: build
