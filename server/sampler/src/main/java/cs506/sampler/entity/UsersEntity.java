package cs506.sampler.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "`Users`", schema = "sound_db")
public class UsersEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_ID", unique = true)
    private Integer user_ID;

    @Column(name = "username", unique = true)
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "session_ID", unique = true)
    private String session_ID;

    // Getters and Setters

    public Integer getUser_ID() {
        return user_ID;
    }

    public void setUser_ID(Integer user_ID) {
        this.user_ID = user_ID;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSession_ID() {
        return session_ID;
    }

    public void setSession_ID(String session_ID) {
        this.session_ID = session_ID;
    }

    @Override
    public String toString() {
        return "UsersEntity {" +
                "user_ID=" + user_ID +
                ", username='" + username +
                ", password=" + password +
                ", email=" + email +
                ", session_ID=" + session_ID +
                '}';
    }
}
