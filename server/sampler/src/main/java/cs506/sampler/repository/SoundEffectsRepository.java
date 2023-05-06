package cs506.sampler.repository;

import cs506.sampler.entity.SoundEffectsEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SoundEffectsRepository {
    @Query("SELECT s FROM SoundEffectsEntity s WHERE s.effect_name = :effect_name")
    List<SoundEffectsEntity> findByEffectName(@Param("effect_name") String effect_name);

    @Query("SELECT s FROM SoundEffectsEntity s WHERE s.reverb_setting = :reverb_setting")
    List<SoundEffectsEntity> findByReverbSetting(@Param("reverb_setting") String reverb_setting);
}
