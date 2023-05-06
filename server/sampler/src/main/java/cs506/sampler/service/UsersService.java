package cs506.sampler.service;

import cs506.sampler.entity.UsersEntity;
import cs506.sampler.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;


@Service
public class UsersService {

    @Autowired
    private UsersRepository usersRepository;

    public UsersEntity fetchRecordByUsername(String username) {
        return usersRepository.findByUsername(username);
    }

    public UsersEntity fetchRecordByPassword(String password) {
        return usersRepository.findByPassword(password);
    }

    public UsersEntity fetchRecordByEmail(String email) {
        return usersRepository.findByEmail(email);
    }

    public UsersEntity fetchRecordByUsernameAndPassword(String username, String password) {
        return usersRepository.findByUsernameAndPassword(username, password);
    }

    public void register(UsersEntity user) throws DataIntegrityViolationException {
        String sessionID = hashString(user.getUsername());
        user.setSession_ID(sessionID); // Initial session ID that will be changed on login

        String hashedPassword = hashString(user.getPassword());
        user.setPassword(hashedPassword);

        usersRepository.save(user);
    }

    public String login(UsersEntity userParam) {
        UsersEntity user = usersRepository.findByUsernameAndPassword(userParam.getUsername(), hashString(userParam.getPassword()));
        if (user == null) {
            return null;
        }
        // TODO: Set a new session ID for the user and save it to the database
        return user.getSession_ID();
    }

    private String hashString(String message) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(message.getBytes("UTF-8"));
            StringBuilder hexString = new StringBuilder(2 * hash.length);
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (Exception e) {
            System.out.println("Exception thrown: " + e);
            System.out.println("Error hashing message " + message);
            return null;
        }
    }
}