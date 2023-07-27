all: build

REPO_NAME := michaelfrancisco
TAG ?= dev
IMAGE_NAME := chat_server

build:
	docker build -t $(REPO_NAME)/$(IMAGE_NAME):$(TAG) ./packages/server

push:
	docker push $(REPO_NAME)/$(IMAGE_NAME):$(TAG)

build-and-push:
	make build TAG=$(TAG)
	make push TAG=$(TAG)

