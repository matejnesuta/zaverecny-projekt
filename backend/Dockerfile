
FROM python:3
ENV PYTHONUNBUFFERED 1

RUN mkdir /backend
WORKDIR /backend
COPY requirements.txt /backend/
EXPOSE 8000
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
COPY . /backend/
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh