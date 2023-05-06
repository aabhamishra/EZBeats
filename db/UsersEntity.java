package cs2.tat4_table;


@Entity
@Table(name = "`Users`", schema = "sound_db")
public class UsersEntity{
    @userID
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_ID")
    private Integer user_ID;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password; 

    @Column(name = "email")
    private String email; 

    @Column(name = "created_at")
    @JsonFormat(pattern = "yyyy-MM-dd 'T'HH:mm:ss")
    private LocalDateTime created_at;

    //Getters and setters

    public Integer getUserID(){
        return user_ID;
    }
    public void setUserId(Integer user_ID){
        this.user_ID = user_ID;
    }
    public String getUsername(){
        return username; 
    }
    public void setUsername(String username){
        this.username = username;
    }
    public String getPassword(){
        return password;
    }
    public void setPassword(String password){
        this.password = password;
    }
    public String getEmail(){
        return email;
    }
    public void setEmail(String email){
        this.email = email;
    }
    public LocalDateTime getCreatedAt(){
        return created_at;
    }
    public void setCreatedAt(){
        this.created_at = created_at;
    }

    //toString method 
    @Override
    public String toString(){
        return "UsersEntity{" + "user_ID= " + user_ID + ", username= " + username +
        ", password= " + password + ", email= " + email + ", created_at= " + created_at + "}";
    }
}
