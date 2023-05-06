package cs506.sampler;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class SamplerApplication {

	public static void main(String[] args) {
		SpringApplication.run(SamplerApplication.class, args);
	}
}
