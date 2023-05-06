package cs506.sampler.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "`Uploaded Sounds`", schema = "sound_db")
public class UploadedSoundsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sound_ID")
    private Integer sound_ID;

    @Column(name = "upload_ID")
    private Integer upload_ID;

    @Column(name = "sound_name")
    private String sound_name;

    @Column(name = "sound_genre")
    private String sound_genre;

    @Lob
    @Column(name = "sound_file", columnDefinition="BLOB")
    private byte[] sound_file;

}
