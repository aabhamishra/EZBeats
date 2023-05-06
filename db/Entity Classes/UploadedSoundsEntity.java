package cs506.sampler;
import jakarta.persistence.*;


@Entity
@Table(name = "`UploadedSounds`", schema = "sound_db")
public class UploadedSoundsEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sound_ID")
    private Integer sound_ID;

    @Column(name = "user_ID")
    private Integer user_ID;

    @Column(name = "sound_name")
    private String sound_name;

    @Column(name = "sound_genre")
    private String sound_genre;

    @Lob
    @Column(name = "sound_file", columnDefinition="LONGBLOB")
    private byte[] sound_file;

    //Getters and setters

    public Integer getSound_ID(){
        return sound_ID;
    }

    public void setSound_ID(Integer sound_ID){
        this.sound_ID = sound_ID;
    }

    public Integer getUser_ID(){
        return user_ID;
    }

    public void setUser_ID(Integer user_ID){
        this.user_ID = user_ID;
    }

    public String getSound_name() {
        return sound_name;
    }

    public void setSound_name(String sound_name) {
        this.sound_name = sound_name;
    }

    public String getSound_genre() {
        return sound_genre;
    }

    public void setSound_genre(String sound_genre) {
        this.sound_genre = sound_genre;
    }

    public byte[] getSound_file() {
        return sound_file;
    }

    public void setSound_file(byte[] sound_file) {
        this.sound_file = sound_file;
    }
    //toString method

    @Override
    public String toString() {
        return "UploadedSoundsEntity {" +
                "id= " + sound_ID +
                ", userID= " + user_ID +
                ", name= '" + sound_name + '\'' +
                ", genre= " + sound_genre +
                '}';
    }

}
