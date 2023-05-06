package cs506.sampler.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "`PreBuiltSounds`", schema = "sound_db")
public class PreBuiltSoundsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sound_ID")
    private Integer sound_ID;

    @Column(name = "sound_name", columnDefinition = "VARCHAR(45)")
    private String sound_name;

    @Column(name = "sound_genre", columnDefinition = "VARCHAR(45)")
    private String sound_genre;

    @Lob
    @Column(name = "sound_file", columnDefinition="BLOB")
    private byte[] sound_file;

    // Getters and Setters

    public Integer getSound_ID() {
        return sound_ID;
    }

    public void setSound_ID(Integer sound_ID) {
        this.sound_ID = sound_ID;
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

    @Override
    public String toString() {
        return "PreBuiltSoundEntity {" +
                "id=" + sound_ID +
                ", name='" + sound_name + '\'' +
                ", genre=" + sound_genre +
                '}';
    }
}
