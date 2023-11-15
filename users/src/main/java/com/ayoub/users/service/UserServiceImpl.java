package com.ayoub.users.service;
import com.ayoub.users.repos.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.ayoub.users.entities.Role;
import com.ayoub.users.entities.User;
import com.ayoub.users.repos.RoleRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@Transactional
@Service
public class UserServiceImpl implements UserService{
    @Autowired
    UserRepository userRep;
    @Autowired
    RoleRepository roleRep;
    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String mailAddress;
    @Override
    public User saveUser(User user) {
        Random random = new Random();
        String verificationCode = UUID.randomUUID().toString();
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setSubject("Activation Code");
        simpleMailMessage.setText("Your activation code is: " + verificationCode);
        simpleMailMessage.setTo(user.getEmail());
        simpleMailMessage.setFrom(mailAddress);
        javaMailSender.send(simpleMailMessage);

        user.setVerificationCode(verificationCode);
        List<Role>roles=new ArrayList<>();
        Role r=roleRep.findByRole("USER");
        roles.add(r);
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        user.setRoles(roles);
        return userRep.save(user);
    }
    @Override
    public User activateUser(String username , String code)
    {
        User user=userRep.findByUsername(username);
        if(user!=null)
        {
            if(user.getEnabled()==null || user.getEnabled()==false)
            {
                if(user.getVerificationCode().equals(code)==true)
                {
                    user.setEnabled(true);
                    user.setVerificationCode(null);
                    userRep.save(user);
                    return user;
                }
                else
                {
                    System.out.println(user.getVerificationCode());
                    return null;
                }
            }
            else
            {
                return null;
            }
        }
        else
        {
            return null;
        }
    }
    @Override
    public void deleteUser(long id) {
        userRep.deleteByUserId(id);
    }

    @Override
    public User addRoleToUser(long id, Role r) {
        User usr = userRep.findUserById(id);
        List<Role> roles = usr.getRoles();
        roles.add(r);
        usr.setRoles(roles);
        return userRep.save(usr);
    }

    @Override
    public List<User> findAllUsers() {
        return userRep.findAll();
    }
    @Override
    public List<Role> findAllRoles() {
        return roleRep.findAll();
    }
    @Override
    public Role addRole(Role role) {
        return roleRep.save(role);
    }
    @Override
    public User findUserByUsername(String username) {
        return userRep.findByUsername(username);
    }
    @Override
    public User findUserById(Long id) {
        return userRep.findById(id).get();
    }
    @Override
    public Role findRoleById(Long id) {
        return roleRep.findRoleById(id);
    }
    @Override
    public User removeRoleFromUser(long id,Role r)
    {
        User user = userRep.findUserById(id);
        List<Role> listOfRoles = user.getRoles();
        listOfRoles.remove(r);
        userRep.save(user);
        return user;
    }
    @Override
    public void sendPasswordResetConfirmationCode(String email) {
        User user = userRep.findByEmail(email);
        if (user != null) {
            Random random = new Random();
            //String confirmationCode = String.format("%06d", random.nextInt(1000000));
            String confirmationCode=UUID.randomUUID().toString();
            user.setVerificationCode(confirmationCode);

            SimpleMailMessage confirmationMail = new SimpleMailMessage();
            confirmationMail.setSubject("Password Reset Confirmation Code");
            confirmationMail.setText("Your password reset confirmation code is: " + confirmationCode);
            confirmationMail.setTo(email);
            confirmationMail.setFrom(mailAddress);
            javaMailSender.send(confirmationMail);
        }
    }
    @Override
    public boolean checkRestConfirlationCode(String email, String code) {
        User user = userRep.findByEmail(email);
        if (user != null) {
            if (user.getVerificationCode().equals(code)) {
                return true;
            }
        }
        return false;
    }
    // rest password method
    @Override
    public User resetPassword(String email, String password) {
        User user = userRep.findByEmail(email);
        if (user != null) {
            user.setPassword(bCryptPasswordEncoder.encode(password));
            user.setVerificationCode(null);
            return userRep.save(user);
        }
        return null;
    }


}