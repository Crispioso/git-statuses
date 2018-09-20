start:
	make build-view
	make build-server
	make start-server

build-server:
	cd server; npm install; npm run build

start-server:
	cd server; npm start

build-view:
	cd view; npm install; npm run build

#debug:

#test:

.PHONY: start
