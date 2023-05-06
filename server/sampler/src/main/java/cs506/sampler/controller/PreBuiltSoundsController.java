package cs506.sampler.controller;

import cs506.sampler.entity.PreBuiltSoundsEntity;
import cs506.sampler.service.PreBuiltSoundsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

/**
 * Controller class that handles HTTP requests for the pre-built sounds table of the database.
 */
@RestController
public class PreBuiltSoundsController {

    @Autowired
    private PreBuiltSoundsService preBuiltSoundsService;

    @GetMapping("/test")
    @CrossOrigin
    public String test() {
        System.out.println("Got to test()");
        return "test";
    }

    /**
     * Sends an HTTP response at the endpoint allPreBuiltSounds that contains all the sounds contained in the
     * pre-built sounds table of the database. Allows Cross-Origin requests.
     *
     * @return HTTP response
     */
    @GetMapping("/allPreBuiltSounds")
    @CrossOrigin
    public ResponseEntity<List<PreBuiltSoundsEntity>> getAllPreBuiltSounds() {
        List<PreBuiltSoundsEntity> preBuiltSoundsEntities = preBuiltSoundsService.fetchAllRecords();
        return new ResponseEntity<>(preBuiltSoundsEntities, HttpStatus.OK);
    }

    @GetMapping("/preBuiltSoundsByGenre")
    @CrossOrigin
    public ResponseEntity<List<PreBuiltSoundsEntity>> getPreBuiltSoundsByGenre(
            @RequestParam(value = "genre") String genre) {
        List<PreBuiltSoundsEntity> preBuiltSoundsEntities = preBuiltSoundsService.fetchRecordByGenre(genre);
        if (preBuiltSoundsEntities.size() == 0) {
            return ResponseEntity.notFound().build();
        } else {
            return new ResponseEntity<>(preBuiltSoundsEntities, HttpStatus.OK);
        }
    }

    @GetMapping("/preBuiltSoundInfoByName")
    @CrossOrigin
    public ResponseEntity<PreBuiltSoundsEntity> getPreBuiltSoundInfoByName(
            @RequestParam(value = "name") String name) {
        List<PreBuiltSoundsEntity> preBuiltSoundsEntities = preBuiltSoundsService.fetchRecordByName(name);
        if (preBuiltSoundsEntities.size() == 0) {
            return ResponseEntity.notFound().build();
        } else {
            return new ResponseEntity<>(preBuiltSoundsEntities.get(0), HttpStatus.OK);
        }
    }

    @GetMapping("/preBuiltSoundByName")
    @CrossOrigin
    public ResponseEntity<ByteArrayResource> getPreBuiltSoundByName(
            @RequestParam(value = "name") String name) {
        List<PreBuiltSoundsEntity> preBuiltSoundsEntities = preBuiltSoundsService.fetchRecordByName(name);
        if (preBuiltSoundsEntities.size() == 0) {
            return ResponseEntity.notFound().build();
        } else {
            ByteArrayResource resource = new ByteArrayResource(preBuiltSoundsEntities.get(0).getSound_file());
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(resource);
        }
    }

    @GetMapping("/preBuiltSoundTest")
    @CrossOrigin
    public ResponseEntity<byte[]> getPreBuiltSoundTest() {
        byte[] sound = preBuiltSoundsService.fetchRecordByName("Base_Default_1").get(0).getSound_file();
        return new ResponseEntity<>(sound, HttpStatus.OK);
    }

    @GetMapping("/preBuiltSoundTest2")
    @CrossOrigin
    public byte[] getPreBuiltSoundTest2() {
        return preBuiltSoundsService.fetchRecordByName("Base_Default_1").get(0).getSound_file();
    }

    @GetMapping("/preBuiltSoundTest3")
    @CrossOrigin
    public ResponseEntity<ArrayList<byte[]>> getPreBuiltSoundTest3() {
        List<PreBuiltSoundsEntity> sound = preBuiltSoundsService.fetchAllRecords();
        ArrayList<byte[]> soundsInBytes = new ArrayList<>();
        for (PreBuiltSoundsEntity s : sound) {
            soundsInBytes.add(s.getSound_file());
        }
        return new ResponseEntity<>(soundsInBytes, HttpStatus.OK);
    }

    @GetMapping("/preBuiltSoundTest4")
    @CrossOrigin
    public ResponseEntity<ByteArrayResource> getPreBuiltSoundTest4() {
        byte[] sound = preBuiltSoundsService.fetchRecordByName("Base_Default_1").get(0).getSound_file();

        ByteArrayResource resource = new ByteArrayResource(sound);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
    }
}
