package com.ayoub.users.service;

import com.ayoub.users.mail.Mail;

public interface MailService {
    void sendMail(String email, Mail mail);
}
