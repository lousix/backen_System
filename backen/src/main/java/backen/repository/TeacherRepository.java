package backen.repository;

import backen.entity.TeacherEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author 刘智扬
 */
@Repository
public interface TeacherRepository extends JpaRepository<TeacherEntity,Long> {

    /**
     * 通过id寻找 student 的信息
     * @param id
     * @return
     */
    TeacherEntity findById(String id);

}
