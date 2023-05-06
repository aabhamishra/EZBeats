package cs506.sampler.service;

import cs506.sampler.entity.SoundEffectsEntity;
import cs506.sampler.repository.SoundEffectsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SoundEffectsService{

    @Autowired
    private SoundEffectsRepository soundEffectsRepository;

    public List<SoundEffectsEntity> fetchRecordByName(String effect_name) {
        return soundEffectsRepository.findByEffectName(effect_name);
    }

    public List<SoundEffectsEntity> fetchRecordBySetting(String reverb_setting) {
        return soundEffectsRepository.findByReverbSetting(reverb_setting);
    }
}