package backen.repository;

import backen.entity.SecurityServiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 * @author 刘智扬
 */
@Repository
public interface SecurityServiceRepository extends JpaRepository<SecurityServiceEntity,Long> {
}
