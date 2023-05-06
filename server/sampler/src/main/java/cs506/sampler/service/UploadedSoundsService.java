package cs506.sampler.service;

import cs506.sampler.entity.UploadedSoundsEntity;
import cs506.sampler.repository.UploadedSoundsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UploadedSoundsService {
    @Autowired
    private UploadedSoundsRepository uploadedSoundsRepository;

    public List<UploadedSoundsEntity> fetchAllRecords() {
        return uploadedSoundsRepository.findAll();
    }
}
