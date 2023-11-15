package com.ayoub.users.restControllers;
import com.ayoub.users.entities.Role;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.ayoub.users.entities.User;
import com.ayoub.users.service.UserService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class UserRestController {
    @Autowired
    UserService userService;
    @RequestMapping(path = "all", method = RequestMethod.GET)
    public List<User> getAllUsers() {
        return userService.findAllUsers();
    }
    @RequestMapping(path = "add", method = RequestMethod.POST)
    public User saveUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @RequestMapping(path="deleteuser/{id}",method=RequestMethod.DELETE)
    public void deleteUserById(@PathVariable long id) {
        userService.deleteUser(id);
    }

    @RequestMapping(path="addRole/{id}",method=RequestMethod.POST)
    public User addRoleToUser(@PathVariable long id,@RequestBody Role r) {
        return userService.addRoleToUser(id, r);
    }

    @RequestMapping(path="user/{id}",method=RequestMethod.GET)
    public User findUserById(@PathVariable Long id) {
        return userService.findUserById(id);
    }

    @RequestMapping(path="allRoles",method=RequestMethod.GET)
    public List<Role> getAllRoles() {
        return userService.findAllRoles();
    }

    @RequestMapping(path="role/{id}",method=RequestMethod.GET)
    public Role findRoleById(@PathVariable Long id) {
        return userService.findRoleById(id);
    }
    @RequestMapping(path="removeRole/{id}",method=RequestMethod.POST)
    public User removeRole(@PathVariable long id,@RequestBody Role r)
    {
        return  userService.removeRoleFromUser(id,r);
    }

    @RequestMapping(path = "activateUser/{username}", method = RequestMethod.POST)
    public User activateUser(@PathVariable String username, @RequestBody Map<String, String> requestBody) {
        String code = requestBody.get("verification_code");
        System.out.println("user activated: " + code);
        return userService.activateUser(username, code);
    }

    @RequestMapping(path = "forgotPassword/{email}", method = RequestMethod.GET)
    public Map<String, String> requestPasswordResetConfirmationCode(@PathVariable String email) {
        userService.sendPasswordResetConfirmationCode(email);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Password reset confirmation code sent to your email.");
        return response;
    }


    @RequestMapping(path = "checkResetCode/{email}", method = RequestMethod.POST)
    public boolean checkResetCode(@PathVariable String email, @RequestBody Map<String, String> requestBody) {
        String code = requestBody.get("verification_code");
        return userService.checkRestConfirlationCode(email, code);
    }


    @RequestMapping(path = "resetPassword/{email}", method = RequestMethod.POST)
    public User resetPassword(@PathVariable String email, @RequestBody Map<String, String> requestBody) {
        String password = requestBody.get("password");
        return userService.resetPassword(email, password);
    }
}