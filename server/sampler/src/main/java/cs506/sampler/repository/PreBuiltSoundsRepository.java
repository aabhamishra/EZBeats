package cs506.sampler.repository;

import cs506.sampler.entity.PreBuiltSoundsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PreBuiltSoundsRepository extends JpaRepository<PreBuiltSoundsEntity, Integer> {
    @Query("SELECT p FROM PreBuiltSoundsEntity p WHERE p.sound_name = :sound_name")
    List<PreBuiltSoundsEntity> findBySoundName(@Param("sound_name") String sound_name);

    @Query("SELECT p FROM PreBuiltSoundsEntity p WHERE p.sound_genre = :sound_genre")
    List<PreBuiltSoundsEntity> findBySoundGenre(@Param("sound_genre") String sound_genre);

    @Query("SELECT p FROM PreBuiltSoundsEntity p WHERE p.sound_name = :sound_name AND p.sound_genre = :sound_genre")
    List<PreBuiltSoundsEntity> findBySoundNameAndSoundGenre(String sound_name, String sound_genre);
}
