FROM        --platform=$TARGETOS/$TARGETARCH nikolaik/python-nodejs:python3.12-nodejs21-slim

LABEL       author="Lorenzo0111" maintainer="hello@lorenzo0111.me"

RUN         apt update \
    && apt -y install git gcc g++ ca-certificates dnsutils curl iproute2 ffmpeg procps tini \
    && useradd -m -d /home/container container

USER        container
ENV         USER=container HOME=/home/container
WORKDIR     /home/container

STOPSIGNAL SIGINT

COPY        --chown=container:container ./entrypoint.sh /entrypoint.sh
COPY        --chown=container:container ./runner.js /runner.js
RUN         chmod +x /entrypoint.sh
ENTRYPOINT    ["/usr/bin/tini", "-g", "--"]
CMD         ["/entrypoint.sh"]
