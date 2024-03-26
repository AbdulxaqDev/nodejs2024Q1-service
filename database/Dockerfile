FROM postgres:alpine3.18

ARG ENV_FILE

ENV $(cat ${ENV_FILE} | xargs)

EXPOSE 5432