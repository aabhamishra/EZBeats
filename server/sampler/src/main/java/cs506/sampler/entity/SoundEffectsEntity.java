package cs506.sampler.entity;
import jakarta.persistence.*;


@Entity
@Table(name = "`SoundEffects`", schema = "sound_db")

public class SoundEffectsEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "effect_ID")
    private Integer effect_ID;

    @Column(name = "effect_name")
    private String effect_name;

    @Column(name = "reverb_setting")
    private String reverb_setting;

    @Lob
    @Column(name = "effect_file", columnDefinition = "LONGBLOB")
    private byte[] effect_file;

    //Getters and setters

    public Integer getEffect_ID(){
        return effect_ID;
    }

    public void setEffect_ID(Integer effect_ID){
        this.effect_ID = effect_ID;
    }

    public String getEffect_name(){
        return effect_name;
    }
    
    public void setEffect_name(String effect_name){
        this.effect_name = effect_name;
    }

    public String getReverb_Setting(){
        return reverb_setting;
    }

    public void setReverb_Setting(String reverb_setting){
        this.reverb_setting = reverb_setting;
    }

    public byte[] getEffect_file(){
        return effect_file;
    }
    
    public void setEffect_file(byte[] sound_file){
        this.effect_file = effect_file;
    }

    //toString method

    @Override
    public String toString() {
        return "SoundEffectsEntity {" +
                "id=" + effect_ID +
                ", name='" + effect_name + '\'' +
                ", setting=" + reverb_setting +
                '}';
    }




}
