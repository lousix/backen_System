package backen.repository;

import backen.entity.HomeEntity;
import backen.entity.NewsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author 刘智扬
 */
@Repository
public interface HomeRepository extends JpaRepository<HomeEntity,String> {

    List<HomeEntity> findByType(String type);

}
