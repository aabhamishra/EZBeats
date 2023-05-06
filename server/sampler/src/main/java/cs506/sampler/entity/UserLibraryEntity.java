package cs506.sampler.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "`UserLibrary`", schema = "sound_db")
public class UserLibraryEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_ID")
    private Integer user_ID;

    @Column(name = "track_ID")
    private Integer track_ID;

    // Getters and setters

    public Integer getUser_ID(){
        return user_ID;
    }

    public void setUser_ID(Integer user_ID){
        this.user_ID = user_ID;
    }

    public Integer getTrack_ID(){
        return track_ID;
    }
    public void setTrack_ID(Integer track_ID){
        this.track_ID = track_ID;
    }
    //toString method

    @Override
    public String toString(){
        return "UserLibraryEntity {" +
                "id=" + user_ID +
                ", track ID='" + track_ID + 
                '}';
    }
}