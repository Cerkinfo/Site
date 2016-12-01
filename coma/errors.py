from rest_framework.exceptions import APIException

class InsufficientBalance(APIException):
    status_code = 402
    default_detail = 'Pas assez d\'argent dans votre balance, pensez à recharger.'
    default_code = 'insufficient_balance'
