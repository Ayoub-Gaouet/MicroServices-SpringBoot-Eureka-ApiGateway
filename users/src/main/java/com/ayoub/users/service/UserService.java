package com.ayoub.users.service;

import com.ayoub.users.entities.Role;
import com.ayoub.users.entities.User;
import java.util.List;

public interface UserService {
    User saveUser(User user);
    User findUserById(Long id);
    User findUserByUsername (String username);
    List<User> findAllUsers();
    void deleteUser(long id);
    Role addRole(Role role);
    User addRoleToUser(long id, Role r);
    List<Role> findAllRoles();
    Role findRoleById(Long id);
    User removeRoleFromUser(long id, Role r);
    User activateUser(String username, String code);
    void sendPasswordResetConfirmationCode(String email);
    boolean checkRestConfirlationCode(String email, String code);
    User resetPassword(String email, String password);
}