package backen.repository;

import backen.entity.SoftwareEntity;
import backen.entity.StudentEntity;
import backen.entity.TeacherEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author 刘智扬
 */
@Repository
public interface SoftwareRepository extends JpaRepository<SoftwareEntity,Long> {

    /**
     * 通过 id 寻找 software 的信息
     * @param id
     * @return
     */
    SoftwareEntity findById(String id);
}
