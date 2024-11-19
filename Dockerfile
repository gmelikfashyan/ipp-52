# Базовый образ Node.js
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем весь проект
COPY . .

# Выполняем build проекта
RUN npm run build

# Указываем порт для `ng serve`
EXPOSE 4200

# Запускаем Angular через ng serve
CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--port", "4200"]
