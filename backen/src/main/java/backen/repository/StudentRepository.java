package backen.repository;

import backen.entity.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author 刘智扬
 */

@Repository
public interface StudentRepository extends JpaRepository<StudentEntity,Long> {

    /**
     * 通过 id 寻找 student 的信息
     * @param id
     * @return
     */
    StudentEntity findById(String id);

}

