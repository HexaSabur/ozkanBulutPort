FROM nginx:alpine

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy site files
COPY index.html /usr/share/nginx/html/
COPY style.css  /usr/share/nginx/html/
COPY main.js    /usr/share/nginx/html/
COPY images/    /usr/share/nginx/html/images/

EXPOSE 80
