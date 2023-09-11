#!/bin/bash

# Define o valor de AuthUser e AuthPass no ssmtp.conf com base nas variáveis de ambiente fornecidas
echo "AuthUser=$EMAIL_USER" >> /etc/ssmtp/ssmtp.conf
echo "AuthPass=$EMAIL_PASS" >> /etc/ssmtp/ssmtp.conf

# Executa o comando original de inicialização do Jenkins
exec "$@"