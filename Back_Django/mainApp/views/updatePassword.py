import random
import smtplib

from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView


def MailPassword(newPass, email):
    gmail_user = 'webbbbsuttt@gmail.com'
    gmail_password = '123456mM'

    sent_from = gmail_user
    to = [email]
    subject = 'Password Reset'
    body = 'your pass changed to :' + newPass

    email_text = """\
    From: %s
    To: %s
    Subject: %s

    %s
    """ % (sent_from, ", ".join(to), subject, body)

    server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
    server.ehlo()
    server.login(gmail_user, gmail_password)
    server.sendmail(sent_from, to, email_text)
    server.close()

    print('Email sent!')


class UpdatePassword(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    @staticmethod
    def get(request):
        generator = random.SystemRandom()
        new_pass = 'RsddRgw' + str(generator.randrange(1000001, 9999999)) + 'w%gTeg'
        try:
            MailPassword(new_pass, request.user.email)
            request.user.set_password(new_pass)
            request.user.save()
        except:
            return Response('not reset', status=status.HTTP_400_BAD_REQUEST)

        return Response('reset', status=status.HTTP_200_OK)

    @staticmethod
    def put(request):
        new_pass = request.data['newPass']
        try:
            MailPassword(new_pass, request.user.email)
            request.user.set_password(new_pass)
            request.user.save()
        except:
            return Response('not reset', status=status.HTTP_400_BAD_REQUEST)

        return Response('reset', status=status.HTTP_200_OK)
