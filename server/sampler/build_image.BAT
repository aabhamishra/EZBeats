@echo off
call mvn package clean -Dmaven.test.skip
call mvn package -Dmaven.test.skip
call docker build -t just737/cs506-digital-sampler .
call docker push just737/cs506-digital-sampler
