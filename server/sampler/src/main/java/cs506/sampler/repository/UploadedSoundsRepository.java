package cs506.sampler.repository;

import cs506.sampler.entity.UploadedSoundsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UploadedSoundsRepository extends JpaRepository<UploadedSoundsEntity, Integer> {
    @Query("SELECT u FROM UploadedSoundsEntity u WHERE u.sound_name = :sound_name")
    List<UploadedSoundsEntity> findBySoundName(@Param("sound_name") String sound_name);

    @Query("SELECT p FROM PreBuiltSoundsEntity p WHERE p.sound_genre = :sound_genre")
    List<UploadedSoundsEntity> findBySoundGenre(@Param("sound_genre") String sound_genre);
}
