package cs506.sampler.service;

import cs506.sampler.entity.PreBuiltSoundsEntity;
import cs506.sampler.repository.PreBuiltSoundsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PreBuiltSoundsService {

    @Autowired
    private PreBuiltSoundsRepository preBuiltSoundsRepository;

    public List<PreBuiltSoundsEntity> fetchAllRecords() {
        return preBuiltSoundsRepository.findAll();
    }

    public List<PreBuiltSoundsEntity> fetchRecordByName(String sound_name) {
        return preBuiltSoundsRepository.findBySoundName(sound_name);
    }

    public List<PreBuiltSoundsEntity> fetchRecordByGenre(String sound_genre) {
        return preBuiltSoundsRepository.findBySoundGenre(sound_genre);
    }

    public List<PreBuiltSoundsEntity> fetchRecordByNameAndGenre(String sound_name, String sound_genre) {
        return preBuiltSoundsRepository.findBySoundNameAndSoundGenre(sound_name, sound_genre);
    }
}
