package backen;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

/**
 * @author 刘智扬
 */


@SpringBootApplication
@EnableJpaRepositories(basePackages = {"backen"})
public class IoApplication extends SpringBootServletInitializer {
    public static void main(String[] args) {
        SpringApplication.run(IoApplication.class,args);
    }

}
