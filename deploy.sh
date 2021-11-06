#/bin/bash
echo "*** REMOVIENDO CONTENEDOR E IMAGEN ***"
docker rm -f  gt-umg-web
docker rmi -f gt-umg-web:latest
echo "*** CONSTRUYENDO CONTENEDOR ***"
docker build -t gt-umg-web:latest .
echo "*** LEVANTANDO CONTENEDOR ***"
docker run -it --name gt-umg-web --network gt-umg-network -p 80:80 -d gt-umg-web:latest
echo "*** VISUALIZANDO LOG ***"
docker logs -f --tail 999 gt-umg-web