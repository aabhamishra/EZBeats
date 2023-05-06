package cs506.sampler.service;

import cs506.sampler.entity.UsersEntity;
import cs506.sampler.repository.UsersRepository; 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;



@Service
public class UsersService{

    @Autowired
    private UsersRepository usersRepository;

    public List<UsersEntity> fetchAllRecords(){
        return usersRepository.findAll();
    }

     public List<UsersEntity> fetchRecordByUsername(String username) {
        return usersRepository.findByUsername(sound_name);
    }

    public List<UsersEntity> fetchRecordByEmail(String email) {
        return usersRepository.findByEmail(sound_genre);
    }

    
}
