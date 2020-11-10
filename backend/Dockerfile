#Tento Dockerfile si vezme python 3 image, zkopíruje si requirements.txt do kontejneru a nainstaluje vše potřebné pro
#pro fungování.
FROM python:3
ENV PYTHONUNBUFFERED 1

RUN mkdir /backend
WORKDIR /backend
COPY requirements.txt /backend/
#Otevírat port možná nemusím, ale zatím jsem to netestoval.
EXPOSE 8000
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
COPY . /backend/
#Skript entrypoint.sh se pošle do kontejneru s Djangem a provádí tam migrace. Vypadá to hloupě, ale je to bugfix,
#který jsem našel na StackOverflow.
#Když jsem zkoušel provádět migrace v tomhle souboru, tak se kontejner s Djangem spouštěl dříve, než databáze a pak
#brečel, že nevidí databázi.
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh