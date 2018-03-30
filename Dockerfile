FROM nginx
MAINTAINER SongChunlei <songchunlei@qq.com>

RUN apt-get update && apt-get install -y sudo curl bzip2 git vim gnupg
RUN curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
RUN apt-get install -y nodejs && apt-get clean

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log
RUN ln -sf /dev/stderr /var/log/nginx/error.log

COPY ./nginx /etc/nginx

#cd到app文件夹下
WORKDIR /app

#预编译环境
COPY package.json /app/
RUN npm install

#编译代码
COPY . /app/
RUN npm run build:prod

#复制打包后的代码进入nginx
RUN cp -R /app/dist/*  /usr/share/nginx/html

# 配置环境变量
ENV HOST 0.0.0.0
ENV PORT 80

# 容器对外暴露的端口号
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
