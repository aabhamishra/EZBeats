package cs506.sampler.controller;

import cs506.sampler.entity.UsersEntity;
import cs506.sampler.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class LoginController {

    @Autowired
    private UsersService usersService;

    @PostMapping("/register")
    @CrossOrigin
    public ResponseEntity<String> register(@RequestBody UsersEntity user) {
        System.out.println("Creating user " + user.toString());
        if (user.getUsername() == null || user.getPassword() == null) {
            return ResponseEntity.badRequest().body("Username and password must be provided");
        }
        try {
            usersService.register(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error registering user " + user.getUsername());
        }
        return ResponseEntity.ok().body("Created user with username " + user.getUsername());
    }

    @PostMapping("/login")
    @CrossOrigin
    public ResponseEntity<String> login(@RequestBody UsersEntity user) {
        if (user.getUsername() == null || user.getPassword() == null) {
            return ResponseEntity.badRequest().body("Username and password must be provided");
        }
        System.out.println("Logging in user " + user);
        String response = usersService.login(user);

        if (response == null) {
            return ResponseEntity.notFound().build();
        }

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("Set-Cookie", "sessionID=" + response);
        return ResponseEntity.ok()
                .headers(responseHeaders)
                .body("Logged in user " + user.getUsername());
    }

}
