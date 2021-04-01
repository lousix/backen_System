package backen.repository;

import backen.entity.ProjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author 刘智扬
 */
@Repository
public interface ProjectRepository extends JpaRepository<ProjectEntity,Long> {

    @Query("select p.type from ProjectEntity p group by p.type order by p.type")
    List<String> findType();

    List<ProjectEntity> findByType(String type);

    ProjectEntity findById(String id);
}
