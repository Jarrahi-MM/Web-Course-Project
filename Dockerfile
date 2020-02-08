FROM python:latest

COPY Back_Django /Back_Django

WORKDIR /Back_Django

RUN pip3 install -r ./requirements.tKxt

EXPOSE 8000

CMD [ "python3", "./manage.py", "runserver", "0.0.0.0:8000"]